/* global URL */

import * as zip from "../zip-lib.js";
import { getConfiguration } from "../../lib/core/configuration.js";
import { CompressionStreamZlib, DecompressionStreamZlib } from "../../lib/core/streams/zlib-js/zlib-streams.min.js";

// the entry data contains matches longer than 258 bytes encoded with the length code 285, which has 16 extra
// bits in Deflate64 (instead of 0 in Deflate), cf. https://github.com/gildas-lormeau/zip.js/issues/661; the
// stream uses the code twice: once with the maximum length (65538) and once with a mid-range length (1000)
const TEXT_CONTENT = "a".repeat(1 + 65538 + 1000);
const url = new URL("./../data/long-match-deflate64.zip", import.meta.url).href;

export { test };

async function test() {
	const { workerURI, wasmURI, CompressionStreamZlib: previousCompressionStreamZlib,
		DecompressionStreamZlib: previousDecompressionStreamZlib } = getConfiguration();
	// wasm implementation (index.js flavor, the suite default)
	await testEntry();
	try {
		// JS implementation, configured like index-native.js does
		zip.configure({
			workerURI: "./core/web-worker-native.js",
			wasmURI: null,
			CompressionStreamZlib,
			DecompressionStreamZlib
		});
		await testEntry();
	} finally {
		zip.configure({
			workerURI,
			wasmURI,
			CompressionStreamZlib: previousCompressionStreamZlib,
			DecompressionStreamZlib: previousDecompressionStreamZlib
		});
	}
}

async function testEntry() {
	zip.configure({ chunkSize: 128, useWebWorkers: true });
	const zipReader = new zip.ZipReader(new zip.HttpReader(url, { preventHeadRequest: true }), { checkSignature: true });
	try {
		const entries = await zipReader.getEntries();
		const text = await entries[0].getData(new zip.TextWriter());
		if (TEXT_CONTENT != text) {
			throw new Error();
		}
	} finally {
		await zipReader.close();
		await zip.terminateWorkers();
	}
}
