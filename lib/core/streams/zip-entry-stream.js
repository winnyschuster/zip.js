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

/* global TransformStream, ReadableStream */
// deno-lint-ignore-file no-this-alias

import { Crc32Stream } from "./crc32-stream.js";
import {
	AESEncryptionStream,
	AESDecryptionStream
} from "./aes-crypto-stream.js";
import {
	ZipCryptoEncryptionStream,
	ZipCryptoDecryptionStream
} from "./zip-crypto-stream.js";
import {
	ERR_INVALID_PASSWORD,
	ERR_INVALID_SIGNATURE,
	ERR_ABORT_CHECK_PASSWORD
} from "./common-crypto.js";

const ERR_INVALID_UNCOMPRESSED_SIZE = "Invalid uncompressed size";
const ERR_INVALID_COMPRESSED_DATA = "Invalid compressed data";
const FORMAT_DEFLATE_RAW = "deflate-raw";
const FORMAT_DEFLATE64_RAW = "deflate64-raw";
const FORMAT_GZIP = "gzip";
const GZIP_HEADER_LENGTH = 10;
const GZIP_TRAILER_LENGTH = 8;

class DeflateStream extends TransformStream {

	constructor(options, { chunkSize, CompressionStreamZlib, CompressionStream }) {
		super({});
		const { compressed, encrypted, useCompressionStream, zipCrypto, signed, level, deflate64 } = options;
		const stream = this;
		let crc32Stream, encryptionStream, gzipCrc32Stream;
		let readable = super.readable;
		// The gzip trailer carries a CRC-32 of the uncompressed data (same polynomial as zip),
		// computed in native code for free during compression. On the native CompressionStream,
		// harvest it instead of running a separate CRC pass: compress as gzip, then strip the
		// fixed 10-byte header and 8-byte trailer to recover the exact raw-deflate payload
		// (byte-identical to a deflate-raw compression) while capturing the CRC. The CRC becomes
		// available at end-of-stream, exactly like Crc32Stream, so nothing downstream (data
		// descriptor, central directory, ZipCrypto) needs it any earlier. Not applied for the
		// pure-JS/WASM ports (a separate slice-by-8 CRC pass is as fast or faster there).
		const useGzipCrc32 = signed && compressed && !deflate64 && (!encrypted || zipCrypto) &&
			Boolean(useCompressionStream && CompressionStream);
		if ((!encrypted || zipCrypto) && signed && !useGzipCrc32) {
			crc32Stream = new Crc32Stream();
			readable = pipeThrough(readable, crc32Stream);
		}
		if (compressed) {
			if (useGzipCrc32) {
				gzipCrc32Stream = new GzipToRawDeflateStream();
				readable = pipeThroughBackpressured(readable, new CompressionStream(FORMAT_GZIP));
				readable = pipeThrough(readable, gzipCrc32Stream);
			} else {
				readable = pipeThroughCommpressionStream(readable, useCompressionStream, { level, chunkSize }, CompressionStream, CompressionStreamZlib, CompressionStream);
			}
		}
		if (encrypted) {
			if (zipCrypto) {
				readable = pipeThrough(readable, new ZipCryptoEncryptionStream(options));
			} else {
				encryptionStream = new AESEncryptionStream(options);
				readable = pipeThrough(readable, encryptionStream);
			}
		}
		setReadable(stream, readable, () => {
			let signature;
			if (encrypted && !zipCrypto) {
				signature = encryptionStream.signature;
			}
			if ((!encrypted || zipCrypto) && signed) {
				signature = useGzipCrc32 ? gzipCrc32Stream.signature : new DataView(crc32Stream.value.buffer).getUint32(0);
			}
			stream.signature = signature;
		});
	}
}

// Converts a gzip stream into its raw-deflate payload while capturing the CRC-32 from the gzip
// trailer. The CompressionStream gzip header is always the fixed 10-byte form (FLG=0, no optional
// fields) per the Compression Streams spec, so it is stripped by length; the trailer is the last
// 8 bytes (CRC-32 LE, then ISIZE LE). Bounded memory: at most GZIP_TRAILER_LENGTH bytes are held
// back across chunks. The signature is read big-endian-agnostically as a number, matching the
// value Crc32Stream produces, so the writer path is unchanged.
class GzipToRawDeflateStream extends TransformStream {

	constructor() {
		// deno-lint-ignore prefer-const
		let stream;
		let headerLeft = GZIP_HEADER_LENGTH;
		let tail = new Uint8Array(0);
		super({
			transform(chunk, controller) {
				if (headerLeft) {
					const dropped = Math.min(headerLeft, chunk.length);
					headerLeft -= dropped;
					chunk = chunk.subarray(dropped);
					if (!chunk.length) {
						return;
					}
				}
				const available = tail.length + chunk.length;
				if (available <= GZIP_TRAILER_LENGTH) {
					const pending = new Uint8Array(available);
					pending.set(tail);
					pending.set(chunk, tail.length);
					tail = pending;
					return;
				}
				// Emit everything except the trailing GZIP_TRAILER_LENGTH bytes as a standalone,
				// right-sized Uint8Array. Consumers may read chunk.buffer directly (e.g. custom
				// writers), so an aliased subarray of a larger buffer would leak the held-back
				// trailer bytes. Bytes are copied exactly once, into `output` or `tail`.
				const emitLength = available - GZIP_TRAILER_LENGTH;
				const output = new Uint8Array(emitLength);
				const fromTail = Math.min(emitLength, tail.length);
				output.set(tail.subarray(0, fromTail), 0);
				if (emitLength > fromTail) {
					output.set(chunk.subarray(0, emitLength - fromTail), fromTail);
				}
				controller.enqueue(output);
				const nextTail = new Uint8Array(GZIP_TRAILER_LENGTH);
				const tailRemaining = tail.length - fromTail;
				if (tailRemaining) {
					nextTail.set(tail.subarray(fromTail), 0);
				}
				nextTail.set(chunk.subarray(emitLength - fromTail), tailRemaining);
				tail = nextTail;
			},
			flush() {
				const dataView = new DataView(tail.buffer, tail.byteOffset, tail.byteLength);
				stream.signature = dataView.getUint32(0, true);
				stream.uncompressedSize = dataView.getUint32(4, true);
			}
		});
		stream = this;
	}
}

class InflateStream extends TransformStream {

	constructor(options, { chunkSize, DecompressionStreamZlib, DecompressionStream }) {
		super({});
		const { zipCrypto, encrypted, signed, signature, compressed, useCompressionStream, deflate64 } = options;
		let crc32Stream, decryptionStream;
		let readable = super.readable;
		if (encrypted) {
			if (zipCrypto) {
				readable = pipeThrough(readable, new ZipCryptoDecryptionStream(options));
			} else {
				decryptionStream = new AESDecryptionStream(options);
				readable = pipeThrough(readable, decryptionStream);
			}
		}
		if (compressed) {
			readable = pipeThroughCommpressionStream(readable, useCompressionStream, { chunkSize, deflate64 }, DecompressionStream, DecompressionStreamZlib, DecompressionStream);
			readable = mapInflateStreamError(readable);
		}
		if ((!encrypted || zipCrypto) && signed) {
			crc32Stream = new Crc32Stream();
			readable = pipeThrough(readable, crc32Stream);
		}
		setReadable(this, readable, () => {
			if ((!encrypted || zipCrypto) && signed) {
				const dataViewSignature = new DataView(crc32Stream.value.buffer);
				if (signature != dataViewSignature.getUint32(0, false)) {
					throw new Error(ERR_INVALID_SIGNATURE);
				}
			}
		});
	}
}

export {
	DeflateStream,
	InflateStream,
	ERR_INVALID_PASSWORD,
	ERR_INVALID_SIGNATURE,
	ERR_INVALID_UNCOMPRESSED_SIZE,
	ERR_INVALID_COMPRESSED_DATA,
	ERR_ABORT_CHECK_PASSWORD
};

function setReadable(stream, readable, flush) {
	readable = pipeThrough(readable, new TransformStream({ flush }));
	Object.defineProperty(stream, "readable", {
		get() {
			return readable;
		}
	});
}

function pipeThroughCommpressionStream(readable, useCompressionStream, options, CompressionStreamNative, CompressionStreamZlib, CompressionStream) {
	const Stream = useCompressionStream && CompressionStreamNative ? CompressionStreamNative : CompressionStreamZlib || CompressionStream;
	const format = options.deflate64 ? FORMAT_DEFLATE64_RAW : FORMAT_DEFLATE_RAW;
	let codecStream;
	try {
		codecStream = new Stream(format, options);
	} catch (error) {
		if (useCompressionStream) {
			if (CompressionStreamZlib) {
				codecStream = new CompressionStreamZlib(format, options);
			} else if (CompressionStream) {
				codecStream = new CompressionStream(format, options);
			} else {
				throw error;
			}
		} else {
			throw error;
		}
	}
	// The native CompressionStream/DecompressionStream and the pure-JS zlib port do not signal
	// backpressure on their writable side (their `ready` never pends), so a plain pipeThrough drains
	// the whole source into them and peak memory grows with the entry size. Awaiting each write()
	// paces the source to the codec's consumption rate, keeping streaming memory bounded. The WASM
	// codec already backpressures, so this is a no-op cost for it.
	return pipeThroughBackpressured(readable, codecStream);
}

function pipeThrough(readable, transformStream) {
	return readable.pipeThrough(transformStream);
}

// Like readable.pipeThrough(transformStream), but drives the writable side manually and awaits each
// write() so that a codec which under-reports backpressure cannot pull the whole source into memory.
// Errors propagate in both directions: a source error aborts the codec; a downstream cancel/error
// (surfaced through the codec's writable rejecting) cancels the source.
function pipeThroughBackpressured(readable, transformStream) {
	const writer = transformStream.writable.getWriter();
	const reader = readable.getReader();
	pump();
	return transformStream.readable;

	async function pump() {
		try {
			for (; ;) {
				await writer.ready;
				const result = await reader.read();
				if (result.done) {
					await writer.close();
					break;
				}
				await writer.write(result.value);
			}
		} catch (error) {
			await abort(writer, error);
			await cancel(reader, error);
		}
	}
}

async function abort(writer, error) {
	try {
		await writer.abort(error);
	} catch {
		// the writable may already be errored/closed
	}
}

async function cancel(reader, error) {
	try {
		await reader.cancel(error);
	} catch {
		// the readable may already be errored/closed
	}
}

// DecompressionStream implementations can fail with a message-less TypeError on malformed
// input; give these errors an identifiable message (errors raised by the other stages of
// the pipeline, e.g. ERR_INVALID_PASSWORD, always carry a message and pass through as-is)
function mapInflateStreamError(readable) {
	const reader = readable.getReader();
	return new ReadableStream({
		async pull(controller) {
			let result;
			try {
				result = await reader.read();
			} catch (error) {
				if (error && error.message) {
					throw error;
				}
				const mappedError = new Error(ERR_INVALID_COMPRESSED_DATA);
				mappedError.cause = error;
				throw mappedError;
			}
			const { value, done } = result;
			if (done) {
				controller.close();
			} else {
				controller.enqueue(value);
			}
		},
		cancel(reason) {
			return reader.cancel(reason);
		}
	});
}