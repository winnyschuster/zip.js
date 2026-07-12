/* global Uint8Array, atob */

import * as zip from "../../index.js";

export { test };

async function test() {
	await testChunks([[65], [66], [67]]);
	await testChunks([[1], [2, 3], [4], [5, 6, 7], [8], [9], [10, 11, 12, 13], [14]]);
	await testChunks([[42]]);
	await testChunks([[], [1], [], [2]]);
}

async function testChunks(chunks) {
	const expected = chunks.flat();
	const dataURIWriter = new zip.Data64URIWriter("application/octet-stream");
	await dataURIWriter.init();
	const writer = dataURIWriter.writable.getWriter();
	for (const chunk of chunks) {
		await writer.write(new Uint8Array(chunk));
	}
	await writer.close();
	const dataURI = await dataURIWriter.getData();
	const decoded = atob(dataURI.substring(dataURI.indexOf(",") + 1));
	if (decoded.length != expected.length || expected.some((value, indexValue) => decoded.charCodeAt(indexValue) != value)) {
		throw new Error("chunks: " + JSON.stringify(chunks) + ", decoded: " + JSON.stringify(decoded));
	}
}
