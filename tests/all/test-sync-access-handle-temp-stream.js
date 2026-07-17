/* global Blob, FileSystemFileHandle, crypto */

// Exercises `createSyncAccessHandleTempStream` end-to-end against an in-memory mock of the
// FileSystemSyncAccessHandle API (no runtime in the headless matrix exposes OPFS, and the real API
// is worker-only anyway). It checks the hybrid behaviour: a small entry stays in memory while a
// large, incompressible entry spills through a sync access handle; the handle is closed and the
// temp file deleted afterwards (no leak); the archive round-trips byte-for-byte; and creating the
// helper without an injected `getDirectory` throws in contexts lacking the API.

import * as zip from "../zip-lib.js";

export { test };

async function test() {
	if (typeof FileSystemFileHandle == "undefined" || !FileSystemFileHandle.prototype.createSyncAccessHandle) {
		let unsupportedContextError;
		try {
			zip.createSyncAccessHandleTempStream();
		} catch (error) {
			unsupportedContextError = error;
		}
		if (!unsupportedContextError) {
			throw new Error("missing error when created in an unsupported context");
		}
	}

	const mockRoot = createMockSyncAccessRoot();
	const smallData = randomBytes(200);
	const largeData = randomBytes(512 * 1024);

	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter, {
		bufferedWrite: true,
		createTempStream: zip.createSyncAccessHandleTempStream({
			thresholdBytes: 64 * 1024,
			getDirectory: () => mockRoot
		})
	});
	await zipWriter.add("small.bin", new zip.BlobReader(new Blob([smallData])));
	await zipWriter.add("large.bin", new zip.BlobReader(new Blob([largeData])));
	await zipWriter.close();

	if (mockRoot.stats.filesCreated < 1) {
		throw new Error("large entry did not spill through a sync access handle");
	}
	if (mockRoot.stats.filesRemaining() != 0) {
		throw new Error("temp files leaked: " + mockRoot.stats.filesRemaining());
	}
	if (mockRoot.stats.handlesOpen != 0) {
		throw new Error("sync access handles left open: " + mockRoot.stats.handlesOpen);
	}

	const zipReader = new zip.ZipReader(new zip.BlobReader(await blobWriter.getData()));
	const entries = await zipReader.getEntries();
	const got = {};
	for (const entry of entries) {
		got[entry.filename] = new Uint8Array(await entry.getData(new zip.Uint8ArrayWriter()));
	}
	await zipReader.close();
	await zip.terminateWorkers();
	if (!bytesEqual(got["small.bin"], smallData) || !bytesEqual(got["large.bin"], largeData)) {
		throw new Error("content mismatch after sync access handle round-trip");
	}
}

function randomBytes(length) {
	const array = new Uint8Array(length);
	for (let offset = 0; offset < length; offset += 65536) {
		crypto.getRandomValues(array.subarray(offset, Math.min(offset + 65536, length)));
	}
	return array;
}

function bytesEqual(a, b) {
	if (!a || !b || a.length != b.length) {
		return false;
	}
	for (let index = 0; index < a.length; index++) {
		if (a[index] != b[index]) {
			return false;
		}
	}
	return true;
}

// Minimal in-memory implementation of the surface used by createSyncAccessHandleTempStream:
// root.getDirectoryHandle -> dir.getFileHandle -> handle.createSyncAccessHandle ->
// { write, read, flush, close }, dir.removeEntry.
function createMockSyncAccessRoot() {
	const files = new Map();
	const stats = {
		filesCreated: 0,
		handlesOpen: 0,
		filesRemaining: () => files.size
	};
	const directoryHandle = {
		async getFileHandle(name, { create } = {}) {
			if (!files.has(name)) {
				if (!create) {
					throw new Error("NotFoundError");
				}
				files.set(name, { data: new Uint8Array(0) });
				stats.filesCreated++;
			}
			const entry = files.get(name);
			return {
				name,
				async createSyncAccessHandle() {
					stats.handlesOpen++;
					return {
						write(chunk, { at }) {
							if (at + chunk.length > entry.data.length) {
								const grown = new Uint8Array(at + chunk.length);
								grown.set(entry.data);
								entry.data = grown;
							}
							entry.data.set(chunk, at);
							return chunk.length;
						},
						read(buffer, { at }) {
							const size = Math.min(buffer.length, Math.max(0, entry.data.length - at));
							buffer.set(entry.data.subarray(at, at + size));
							return size;
						},
						flush() { },
						close() {
							stats.handlesOpen--;
						}
					};
				}
			};
		},
		async removeEntry(name) {
			if (!files.has(name)) {
				throw new Error("NotFoundError");
			}
			files.delete(name);
		}
	};
	return {
		stats,
		async getDirectoryHandle() {
			return directoryHandle;
		}
	};
}
