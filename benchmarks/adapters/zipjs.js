// Adapter for the local @zip.js/zip.js build (../../index.js).
import * as zip from "../../index.js";
import { CompressionStreamZlib, DecompressionStreamZlib } from "../../lib/core/streams/zlib-js/zlib-streams.min.js";
import { createReadStream, createWriteStream, statSync } from "node:fs";
import { Readable, Writable } from "node:stream";

export const name = "@zip.js/zip.js";
export const supports = { compress: true, decompress: true, disk: true };

// Codec backends selectable at runtime via configure():
//   cs   -> native CompressionStream (offloaded to the libuv threadpool in Node; parallelizable)
//   wasm -> the bundled WebAssembly zlib codec
//   js   -> the pure-JavaScript zlib port (CompressionStreamZlib)
function configure(mode, backend = "cs") {
	const base = { useWebWorkers: mode === "workers" };
	if (backend === "cs") {
		zip.configure({ ...base, useCompressionStream: true });
	} else if (backend === "wasm") {
		zip.configure({ ...base, useCompressionStream: false, wasmURI: undefined });
	} else if (backend === "js") {
		// NB: do NOT null wasmURI here. useCompressionStream:false makes the worker call initModule();
		// if it throws (as wasmURI:null forces) the worker falls back to the native CompressionStream,
		// so this backend would silently measure native instead of the pure-JS port. Keeping the default
		// wasmURI lets initModule succeed, and the provided CompressionStreamZlib is then actually used.
		zip.configure({ ...base, useCompressionStream: false, wasmURI: undefined, CompressionStreamZlib, DecompressionStreamZlib });
	} else {
		throw new Error("unknown backend: " + backend);
	}
}

// concurrency: "sequential" awaits each add(); "parallel" issues all add() calls at once so that
// independent codec streams run concurrently (real multi-core even without Web Workers).
export async function compress(files, { mode = "single", backend = "cs", concurrency = "sequential", level = 6 } = {}) {
	configure(mode, backend);
	const writer = new zip.Uint8ArrayWriter();
	const zipWriter = new zip.ZipWriter(writer, { level });
	const entries = Object.entries(files);
	if (concurrency === "parallel") {
		await Promise.all(entries.map(([entryName, data]) => zipWriter.add(entryName, new zip.Uint8ArrayReader(data))));
	} else {
		for (const [entryName, data] of entries) {
			await zipWriter.add(entryName, new zip.Uint8ArrayReader(data));
		}
	}
	const out = await zipWriter.close();
	await zip.terminateWorkers();
	return { outputSize: out.length };
}

export async function decompress(zipped, { mode = "single", backend = "cs" } = {}) {
	configure(mode, backend);
	const reader = new zip.ZipReader(new zip.Uint8ArrayReader(zipped));
	const entries = await reader.getEntries();
	let total = 0;
	for (const entry of entries) {
		if (!entry.directory) {
			const data = await entry.getData(new zip.Uint8ArrayWriter());
			total += data.length;
		}
	}
	await reader.close();
	await zip.terminateWorkers();
	return { outputSize: total };
}

// Disk-to-disk: stream a file from disk into a zip on disk without materializing either.
export async function compressDisk(inputPath, outputPath, { mode = "single", backend = "cs", level = 6 } = {}) {
	configure(mode, backend);
	// Bridge Node fs streams to Web Streams; neither the input nor the output is ever fully resident.
	const webReadable = Readable.toWeb(createReadStream(inputPath));
	const zipWriter = new zip.ZipWriter(Writable.toWeb(createWriteStream(outputPath)), { level });
	await zipWriter.add("data.bin", webReadable);
	await zipWriter.close();
	await zip.terminateWorkers();
	return { outputSize: statSync(outputPath).size };
}
