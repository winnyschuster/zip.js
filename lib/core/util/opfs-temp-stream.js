/*
 Copyright (c) 2025 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global navigator, crypto, ReadableStream, WritableStream */

export {
	createOPFSTempStream
};

const DEFAULT_THRESHOLD = 1024 * 1024;
const DEFAULT_DIRECTORY_NAME = ".zip.js-temp";

// Builds a `createTempStream` factory (see `ZipWriter`'s option of the same name) that spills the
// data of a buffered entry to the Origin Private File System (OPFS) instead of keeping it in memory.
//
// It is meant for the buffered-write path (keep-order concurrent `add()`, non-seekable output, ...),
// where the compressed data of an entry has to be held until the writer is free. In memory that data
// grows with the entry size; here it is written to an OPFS file and streamed back, so peak memory
// stays bounded.
//
// It is hybrid on purpose: an entry stays fully in memory until it exceeds `thresholdBytes`, and only
// then spills to a file. Small entries never touch the disk, so a workload made of many tiny entries
// keeps the speed of the in-memory default; only genuinely large entries pay for (and benefit from)
// the file round-trip.
//
// OPFS is a browser/worker feature; there is no fallback here. Feature-detect
// `navigator.storage.getDirectory` (or inject `getDirectory`) before using it, and let the writer use
// its in-memory default elsewhere.
//
// Options:
//   thresholdBytes  spill to a file once a buffered entry exceeds this size (default 1 MiB).
//   directoryName   name of the OPFS sub-directory holding the temp files (default ".zip.js-temp").
//   getDirectory    returns (or resolves to) the root `FileSystemDirectoryHandle`. Defaults to
//                   `navigator.storage.getDirectory()`. Inject it to run inside a worker with a
//                   pre-obtained handle, or to test against a mock.
function createOPFSTempStream(options = {}) {
	const {
		thresholdBytes = DEFAULT_THRESHOLD,
		directoryName = DEFAULT_DIRECTORY_NAME,
		getDirectory = () => navigator.storage.getDirectory()
	} = options;
	// The temp directory is resolved once and shared by every entry of this factory.
	let directoryHandlePromise;
	function getTempDirectory() {
		if (!directoryHandlePromise) {
			directoryHandlePromise = Promise.resolve(getDirectory())
				.then(root => root.getDirectoryHandle(directoryName, { create: true }));
		}
		return directoryHandlePromise;
	}
	return async function () {
		const memoryChunks = [];
		let bufferedSize = 0;
		let spilled = false;
		let fileName, fileHandle, fileWriter, fileReader;

		// Move whatever is buffered in memory to a fresh OPFS file, then keep writing to that file.
		// `FileSystemWritableFileStream` is a `WritableStream`, so it is driven through the standard
		// writer API rather than its non-standard `write()`/`seek()` convenience methods.
		async function spillToFile() {
			const directoryHandle = await getTempDirectory();
			fileName = crypto.randomUUID();
			fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
			fileWriter = (await fileHandle.createWritable()).getWriter();
			spilled = true;
			for (const chunk of memoryChunks) {
				await fileWriter.write(chunk);
			}
			// Release the in-memory copy; from now on data lives in the file.
			memoryChunks.length = 0;
		}

		const writable = new WritableStream({
			async write(chunk) {
				if (spilled) {
					await fileWriter.write(chunk);
				} else {
					memoryChunks.push(chunk);
					bufferedSize += chunk.length;
					if (bufferedSize > thresholdBytes) {
						await spillToFile();
					}
				}
			},
			async close() {
				if (fileWriter) {
					await fileWriter.close();
					fileWriter = null;
				}
			}
		});

		// The writer always closes `writable` before reading `readable`, so `spilled` is final by the
		// time `pull` runs. It is read lazily here (not in `start`, which runs at construction time,
		// before anything is written and before `spilled` is known).
		let memoryIndex = 0;
		const readable = new ReadableStream({
			async pull(controller) {
				if (spilled) {
					if (!fileReader) {
						const file = await fileHandle.getFile();
						fileReader = file.stream().getReader();
					}
					const { value, done } = await fileReader.read();
					if (done) {
						controller.close();
					} else {
						controller.enqueue(value);
					}
				} else if (memoryIndex < memoryChunks.length) {
					controller.enqueue(memoryChunks[memoryIndex++]);
				} else {
					controller.close();
				}
			},
			async cancel(reason) {
				if (fileReader) {
					await fileReader.cancel(reason);
				}
			}
		}, { highWaterMark: 0 });
		// highWaterMark 0: do not pull (and possibly close on an empty buffer) until the consumer
		// actually reads, which the writer only does once the data has been fully written.

		// Called by the writer on every exit path (success, error, abort). Best-effort: it must never
		// throw. Closes any still-open file writer, then deletes the temp file.
		async function dispose() {
			if (fileWriter) {
				try {
					await fileWriter.close();
				} catch {
					// ignored
				}
				fileWriter = null;
			}
			if (fileName) {
				try {
					const directoryHandle = await getTempDirectory();
					await directoryHandle.removeEntry(fileName);
				} catch {
					// ignored
				}
				fileHandle = fileName = null;
			}
			memoryChunks.length = 0;
		}

		return { writable, readable, dispose };
	};
}
