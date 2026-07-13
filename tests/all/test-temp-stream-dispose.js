/* global Blob, TransformStream, AbortController */

// Verifies that a buffered entry's temporary stream is disposed on every exit path: after a
// successful flush AND when the entry fails. `dispose()` is the hook resource-backed temp streams
// (files, OPFS handles, ...) rely on to release their resource, since the error path otherwise
// abandons the stream without closing or cancelling it.

import * as zip from "../../index.js";

const TEXT_CONTENT = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ".repeat(64);
const BLOB = new Blob([TEXT_CONTENT], { type: "text/plain" });

export { test };

async function test() {
	await testDisposeOnSuccess();
	await testDisposeOnError();
	await zip.terminateWorkers();
}

async function testDisposeOnSuccess() {
	let disposed = 0;
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter, {
		bufferedWrite: true,
		createTempStream: () => makeDisposableTempStream(() => disposed++)
	});
	await zipWriter.add("file.txt", new zip.BlobReader(BLOB));
	await zipWriter.close();
	const zipReader = new zip.ZipReader(new zip.BlobReader(await blobWriter.getData()));
	const entries = await zipReader.getEntries();
	const text = await entries[0].getData(new zip.TextWriter());
	await zipReader.close();
	if (text != TEXT_CONTENT) {
		throw new Error("content mismatch on success path");
	}
	if (disposed != 1) {
		throw new Error("dispose() not called once on success (was " + disposed + ")");
	}
}

async function testDisposeOnError() {
	let disposed = 0;
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter, {
		bufferedWrite: true,
		createTempStream: () => makeDisposableTempStream(() => disposed++)
	});
	const controller = new AbortController();
	controller.abort();
	let rejected = false;
	try {
		await zipWriter.add("file.txt", new zip.BlobReader(BLOB), { signal: controller.signal });
	} catch {
		rejected = true;
	}
	try {
		await zipWriter.close();
	} catch {
		// the archive has a corrupted/aborted entry; ignored
	}
	if (!rejected) {
		throw new Error("aborted add() did not reject");
	}
	if (disposed != 1) {
		throw new Error("dispose() not called once on error (was " + disposed + ")");
	}
}

function makeDisposableTempStream(onDispose) {
	const { readable, writable } = new TransformStream(undefined, undefined, { highWaterMark: Infinity });
	return {
		readable,
		writable,
		dispose() {
			onDispose();
		}
	};
}
