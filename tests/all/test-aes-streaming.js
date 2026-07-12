/* global Uint8Array */

import { AESEncryptionStream, AESDecryptionStream } from "../../lib/core/streams/aes-crypto-stream.js";

const PASSWORD = "password";
const SIZE = 4096;
const FIRST_CHUNK_LENGTH = 64;
const MAX_CHUNK_LENGTH = 256;

export { test };

async function test() {
	const data = new Uint8Array(SIZE);
	for (let index = 0; index < SIZE; index++) {
		data[index] = index & 0xFF;
	}
	const ciphertext = concat(await pipeChunks(new AESEncryptionStream({ password: PASSWORD, encryptionStrength: 3 }), [data]));
	// decrypt in small chunks: the output must be streamed incrementally instead of
	// accumulating in the pending buffer until the stream is flushed
	const chunks = [ciphertext.subarray(0, FIRST_CHUNK_LENGTH)];
	for (let offset = FIRST_CHUNK_LENGTH; offset < ciphertext.length; offset += 16) {
		chunks.push(ciphertext.subarray(offset, Math.min(offset + 16, ciphertext.length)));
	}
	const decryptedChunks = (await pipeChunks(new AESDecryptionStream({ password: PASSWORD, encryptionStrength: 3 }), chunks))
		.filter(chunk => chunk.length);
	const decrypted = concat(decryptedChunks);
	if (decrypted.length != SIZE || decrypted.some((value, index) => value != data[index])) {
		throw new Error("round-trip failed");
	}
	if (decryptedChunks.some(chunk => chunk.length > MAX_CHUNK_LENGTH)) {
		throw new Error("data accumulated in the pending buffer");
	}
}

async function pipeChunks(stream, chunks) {
	const output = [];
	const readerPromise = (async () => {
		const reader = stream.readable.getReader();
		let result;
		while (!(result = await reader.read()).done) {
			output.push(result.value);
		}
	})();
	const writer = stream.writable.getWriter();
	for (const chunk of chunks) {
		await writer.write(chunk);
	}
	await writer.close();
	await readerPromise;
	return output;
}

function concat(chunks) {
	const result = new Uint8Array(chunks.reduce((length, chunk) => length + chunk.length, 0));
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}
	return result;
}
