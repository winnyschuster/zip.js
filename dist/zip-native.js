(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zip = {}));
})(this, (function (exports) { 'use strict';

	const { Array, Object, String, Number, BigInt, Math, Date, Map, Set, Response, URL, Error, Uint8Array, Uint16Array, Uint32Array, DataView, Blob, Promise, TextEncoder, TextDecoder, document, crypto, btoa, TransformStream, ReadableStream, WritableStream, CompressionStream, DecompressionStream, navigator, Worker } = typeof globalThis !== 'undefined' ? globalThis : this || self;

	var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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

	const MAX_32_BITS = 0xffffffff;
	const MAX_16_BITS = 0xffff;
	const MAX_8_BITS = 0xff;
	const COMPRESSION_METHOD_DEFLATE = 0x08;
	const COMPRESSION_METHOD_DEFLATE_64 = 0x09;
	const COMPRESSION_METHOD_STORE = 0x00;
	const COMPRESSION_METHOD_AES = 0x63;

	const LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
	const SPLIT_ZIP_FILE_SIGNATURE = 0x08074b50;
	const DATA_DESCRIPTOR_RECORD_SIGNATURE = SPLIT_ZIP_FILE_SIGNATURE;
	const CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
	const END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
	const ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
	const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
	const CENTRAL_FILE_HEADER_LENGTH = 46;
	const END_OF_CENTRAL_DIR_LENGTH = 22;
	const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
	const ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
	const ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;

	const DATA_DESCRIPTOR_RECORD_LENGTH = 12;
	const DATA_DESCRIPTOR_RECORD_ZIP_64_LENGTH = 20;
	const DATA_DESCRIPTOR_RECORD_SIGNATURE_LENGTH = 4;

	const EXTRAFIELD_TYPE_ZIP64 = 0x0001;
	const EXTRAFIELD_TYPE_AES = 0x9901;
	const EXTRAFIELD_TYPE_NTFS = 0x000a;
	const EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
	const EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
	const EXTRAFIELD_TYPE_UNICODE_PATH = 0x7075;
	const EXTRAFIELD_TYPE_UNICODE_COMMENT = 0x6375;
	const EXTRAFIELD_TYPE_USDZ = 0x1986;
	const EXTRAFIELD_TYPE_INFOZIP = 0x7875;
	const EXTRAFIELD_TYPE_UNIX = 0x7855;

	const BITFLAG_ENCRYPTED = 0b1;
	const BITFLAG_LEVEL = 0b0110;
	const BITFLAG_LEVEL_MAX_MASK = 0b010;
	const BITFLAG_LEVEL_FAST_MASK = 0b100;
	const BITFLAG_LEVEL_SUPER_FAST_MASK = 0b110;
	const BITFLAG_DATA_DESCRIPTOR = 0b1000;
	const BITFLAG_LANG_ENCODING_FLAG = 0b100000000000;
	const FILE_ATTR_MSDOS_DIR_MASK = 0b10000;
	const FILE_ATTR_MSDOS_READONLY_MASK = 0x01;
	const FILE_ATTR_MSDOS_HIDDEN_MASK = 0x02;
	const FILE_ATTR_MSDOS_SYSTEM_MASK = 0x04;
	const FILE_ATTR_MSDOS_ARCHIVE_MASK = 0x20;
	const FILE_ATTR_UNIX_TYPE_MASK = 0o170000;
	const FILE_ATTR_UNIX_TYPE_DIR = 0o040000;
	const FILE_ATTR_UNIX_EXECUTABLE_MASK = 0o111;
	const FILE_ATTR_UNIX_DEFAULT_MASK = 0o644;
	const FILE_ATTR_UNIX_SETUID_MASK = 0o4000;
	const FILE_ATTR_UNIX_SETGID_MASK = 0o2000;
	const FILE_ATTR_UNIX_STICKY_MASK = 0o1000;

	const VERSION_DEFLATE = 0x14;
	const VERSION_ZIP64 = 0x2D;
	const VERSION_AES = 0x33;

	const DIRECTORY_SIGNATURE = "/";

	const HEADER_SIZE = 30;
	const HEADER_OFFSET_VERSION = 0;
	const HEADER_OFFSET_SIGNATURE = 10;
	const HEADER_OFFSET_COMPRESSED_SIZE = 14;
	const HEADER_OFFSET_UNCOMPRESSED_SIZE = 18;
	const LOCAL_HEADER_COMMON_OFFSET = 4;

	const MAX_DATE = new Date(2107, 11, 31);
	const MIN_DATE = new Date(1980, 0, 1);

	const UNDEFINED_VALUE = undefined;
	const INFINITY_VALUE = Infinity;
	const UNDEFINED_TYPE = "undefined";
	const FUNCTION_TYPE = "function";
	const OBJECT_TYPE = "object";

	const EMPTY_UINT8_ARRAY = new Uint8Array();

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


	const MINIMUM_CHUNK_SIZE = 64;
	let maxWorkers = 2;
	try {
		if (typeof navigator != UNDEFINED_TYPE && navigator.hardwareConcurrency) {
			maxWorkers = navigator.hardwareConcurrency;
		}
	} catch {
		// ignored
	}
	const DEFAULT_CONFIGURATION = {
		workerURI: "./core/web-worker-wasm.js",
		wasmURI: "./core/streams/zlib-wasm/zlib-streams.wasm",
		chunkSize: 64 * 1024,
		maxWorkers,
		terminateWorkerTimeout: 5000,
		workerStarvationTimeout: 5000,
		useWebWorkers: true,
		useCompressionStream: true,
		CompressionStream: typeof CompressionStream != UNDEFINED_TYPE && CompressionStream,
		DecompressionStream: typeof DecompressionStream != UNDEFINED_TYPE && DecompressionStream
	};

	const CONFIGURABLE_PROPERTY_NAMES = [
		"baseURI",
		"wasmURI",
		"workerURI",
		"chunkSize",
		"maxWorkers",
		"terminateWorkerTimeout",
		"workerStarvationTimeout",
		"useCompressionStream",
		"useWebWorkers",
		"CompressionStream",
		"DecompressionStream",
		"CompressionStreamZlib",
		"DecompressionStreamZlib"
	];

	const config = Object.assign({}, DEFAULT_CONFIGURATION);

	function getConfiguration() {
		return config;
	}

	function getChunkSize(config) {
		return Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
	}

	function configure(configuration) {
		for (const propertyName of CONFIGURABLE_PROPERTY_NAMES) {
			const propertyValue = configuration[propertyName];
			if (propertyValue !== UNDEFINED_VALUE) {
				config[propertyName] = propertyValue;
			}
		}
	}

	const t=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],r=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],n=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],e=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],q$1=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],f=new Uint8Array(288);f.fill(8,0,144),f.fill(9,144,256),f.fill(7,256,280),f.fill(8,280,288);const l=new Uint8Array(30).fill(5);function L$1(t){const r=new Uint16Array(16);for(const n of t)r[n]++;r[0]=0;const n=new Uint16Array(17);for(let t=1;15>=t;t++)n[t+1]=n[t]+r[t];const e=new Uint16Array(t.length);for(let r=0;r<t.length;r++)t[r]&&(e[n[t[r]]++]=r);return {t:r,symbols:e}}const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function i(i){i({workerURI:i=>{const U="text/javascript",W=(o=>{let i=0,U=0,W=0,c=new Uint8Array(1024),R=0,a=0;for(;!a;){a=h(1);const t=h(2);if(0==t)x();else if(1==t)G(L$1(f),L$1(l));else {if(2!=t)throw Error("invalid deflate block type");G(...d());}}return c.subarray(0,R);function F(){if(i>=o.length)throw Error("unexpected end of deflate data");return o[i++]}function h(t){for(;t>W;)U|=F()<<W,W+=8;const r=U&(1<<t)-1;return U>>>=t,W-=t,r}function x(){U=0,W=0;const t=F()|F()<<8;i+=2,v(R+t);for(let r=0;t>r;r++)c[R++]=F();}function G(q,f){let l=I(q);for(;256!=l;){if(256>l)v(R+1),c[R++]=l;else {const q=l-257,L=t[q]+h(r[q]),o=I(f),i=n[o]+h(e[o]);v(R+L);const U=R-i;for(let t=0;L>t;t++)c[R++]=c[U+t];}l=I(q);}}function d(){const t=h(5)+257,r=h(5)+1,n=h(4)+4,e=new Uint8Array(19);for(let t=0;n>t;t++)e[q$1[t]]=h(3);const f=L$1(e),l=new Uint8Array(t+r);let o=0;for(;o<l.length;){const t=I(f);if(16>t)l[o++]=t;else if(16==t){const t=l[o-1];let r=h(2)+3;for(;r--;)l[o++]=t;}else o+=17==t?h(3)+3:h(7)+11;}return [L$1(l.subarray(0,t)),L$1(l.subarray(t))]}function I(t){const{t:r,symbols:n}=t;let e=0,q=0,f=0;for(let t=1;15>=t;t++){e|=h(1);const l=r[t];if(l>e-q)return n[f+(e-q)];f+=l,q=q+l<<1,e<<=1;}throw Error("invalid huffman code")}function v(t){if(c.length<t){let r=2*c.length;for(;t>r;)r*=2;const n=new Uint8Array(r);n.set(c.subarray(0,R)),c=n;}}})((t=>{const r=(t=(t+"").replace(/[^A-Za-z0-9+/=]/g,"")).length,n=[];for(let e=0;r>e;e+=4){const r=o.indexOf(t[e])<<18|o.indexOf(t[e+1])<<12|(63&o.indexOf(t[e+2]))<<6|63&o.indexOf(t[e+3]);n.push(r>>16&255),"="!==t[e+2]&&n.push(r>>8&255),"="!==t[e+3]&&n.push(255&r);}return new Uint8Array(n)})("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"));if(i){const t=new Blob([W],{type:U});return URL.createObjectURL(t)}return "data:"+U+";base64,"+(t=>{let r="";const n=t.length;let e=0;for(;n>e+2;e+=3){const n=t[e]<<16|t[e+1]<<8|t[e+2];r+=o[n>>18&63]+o[n>>12&63]+o[n>>6&63]+o[63&n];}const q=n-e;if(1===q){const n=t[e]<<16;r+=o[n>>18&63]+o[n>>12&63]+"==";}else if(2===q){const n=t[e]<<16|t[e+1]<<8;r+=o[n>>18&63]+o[n>>12&63]+o[n>>6&63]+"=";}return r})(W)}});}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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

	// Slicing-by-8 CRC-32 (Intel / zlib). The eight 256-entry tables let the inner loop
	// consume 8 bytes per iteration with a shorter dependency chain, ~4x the byte-at-a-time
	// rate (measured ~320 -> ~1400 MB/s on 64KB chunks).
	//
	// Every table MUST stay a PACKED_SMI array: build with array literals (not `new Array(n)`,
	// which is HOLEY) and store the signed int32 XOR result (no `>>> 0`). An unsigned or holey
	// table becomes a V8 FixedDoubleArray whose every hot-loop lookup unboxes a double (~1.6x
	// slower). Signedness is irrelevant to the result — the reads mask/shift it and the final
	// `~crc` normalizes it. Do NOT reintroduce `>>> 0` here or switch to `new Array(256)`.
	const T = [[], [], [], [], [], [], [], []];
	for (let n = 0; n < 256; n++) {
		let t = n;
		for (let j = 0; j < 8; j++) {
			t = (t & 1) ? (t >>> 1) ^ 0xEDB88320 : t >>> 1;
		}
		T[0][n] = t;
	}
	for (let n = 0; n < 256; n++) {
		for (let k = 1; k < 8; k++) {
			const previous = T[k - 1][n];
			T[k][n] = (previous >>> 8) ^ T[0][previous & 0xFF];
		}
	}
	const [T0, T1, T2, T3, T4, T5, T6, T7] = T;

	class Crc32 {

		constructor(crc) {
			this.crc = crc || -1;
		}

		append(data) {
			let crc = this.crc | 0;
			const length = data.length | 0;
			let offset = 0;
			// Process 8 bytes per iteration over the typed-array body. DataView.getInt32(le)
			// reads an unaligned little-endian word as a signed int32 (no double boxing), so no
			// alignment or endianness handling is needed; data.buffer guards non-typed inputs.
			if (length >= 8 && data.buffer) {
				const view = new DataView(data.buffer, data.byteOffset, length);
				const end = length - 8;
				for (; offset <= end; offset += 8) {
					const a = crc ^ view.getInt32(offset, true);
					const b = view.getInt32(offset + 4, true);
					crc = T7[a & 0xFF] ^ T6[(a >>> 8) & 0xFF] ^ T5[(a >>> 16) & 0xFF] ^ T4[(a >>> 24) & 0xFF] ^
						T3[b & 0xFF] ^ T2[(b >>> 8) & 0xFF] ^ T1[(b >>> 16) & 0xFF] ^ T0[(b >>> 24) & 0xFF];
				}
			}
			// Remaining tail (and non-typed inputs) byte-at-a-time with the base table.
			for (; offset < length; offset++) {
				crc = (crc >>> 8) ^ T0[(crc ^ data[offset]) & 0xFF];
			}
			this.crc = crc;
		}

		get() {
			return ~this.crc;
		}
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	class Crc32Stream extends TransformStream {

		constructor() {
			// deno-lint-ignore prefer-const
			let stream;
			const crc32 = new Crc32();
			super({
				transform(chunk, controller) {
					crc32.append(chunk);
					controller.enqueue(chunk);
				},
				flush() {
					const value = new Uint8Array(4);
					const dataView = new DataView(value.buffer);
					dataView.setUint32(0, crc32.get());
					stream.value = value;
				}
			});
			stream = this;
		}
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	function encodeText(value) {
		// deno-lint-ignore valid-typeof
		if (typeof TextEncoder == UNDEFINED_TYPE) {
			value = unescape(encodeURIComponent(value));
			const result = new Uint8Array(value.length);
			for (let i = 0; i < result.length; i++) {
				result[i] = value.charCodeAt(i);
			}
			return result;
		} else {
			return new TextEncoder().encode(value);
		}
	}

	// Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js and https://github.com/bitwiseshiftleft/sjcl

	// deno-lint-ignore-file no-this-alias

	/*
	 * SJCL is open. You can use, modify and redistribute it under a BSD
	 * license or under the GNU GPL, version 2.0.
	 */

	/** @fileOverview Javascript cryptography implementation.
	 *
	 * Crush to remove comments, shorten variable names and
	 * generally reduce transmission size.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

	/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/**
	 * Arrays of bits, encoded as arrays of Numbers.
	 * @namespace
	 * @description
	 * <p>
	 * These objects are the currency accepted by SJCL's crypto functions.
	 * </p>
	 *
	 * <p>
	 * Most of our crypto primitives operate on arrays of 4-byte words internally,
	 * but many of them can take arguments that are not a multiple of 4 bytes.
	 * This library encodes arrays of bits (whose size need not be a multiple of 8
	 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
	 * array of words, 32 bits at a time.  Since the words are double-precision
	 * floating point numbers, they fit some extra data.  We use this (in a private,
	 * possibly-changing manner) to encode the number of bits actually  present
	 * in the last word of the array.
	 * </p>
	 *
	 * <p>
	 * Because bitwise ops clear this out-of-band data, these arrays can be passed
	 * to ciphers like AES which want arrays of words.
	 * </p>
	 */
	const bitArray = {
		/**
		 * Concatenate two bit arrays.
		 * @param {bitArray} a1 The first array.
		 * @param {bitArray} a2 The second array.
		 * @return {bitArray} The concatenation of a1 and a2.
		 */
		concat(a1, a2) {
			if (a1.length === 0 || a2.length === 0) {
				return a1.concat(a2);
			}

			const last = a1[a1.length - 1], shift = bitArray.getPartial(last);
			if (shift === 32) {
				return a1.concat(a2);
			} else {
				return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
			}
		},

		/**
		 * Find the length of an array of bits.
		 * @param {bitArray} a The array.
		 * @return {Number} The length of a, in bits.
		 */
		bitLength(a) {
			const l = a.length;
			if (l === 0) {
				return 0;
			}
			const x = a[l - 1];
			return (l - 1) * 32 + bitArray.getPartial(x);
		},

		/**
		 * Truncate an array.
		 * @param {bitArray} a The array.
		 * @param {Number} len The length to truncate to, in bits.
		 * @return {bitArray} A new array, truncated to len bits.
		 */
		clamp(a, len) {
			if (a.length * 32 < len) {
				return a;
			}
			a = a.slice(0, Math.ceil(len / 32));
			const l = a.length;
			len = len & 31;
			if (l > 0 && len) {
				a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> (len - 1), 1);
			}
			return a;
		},

		/**
		 * Make a partial word for a bit array.
		 * @param {Number} len The number of bits in the word.
		 * @param {Number} x The bits.
		 * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
		 * @return {Number} The partial word.
		 */
		partial(len, x, _end) {
			if (len === 32) {
				return x;
			}
			return (_end ? x | 0 : x << (32 - len)) + len * 0x10000000000;
		},

		/**
		 * Get the number of bits used by a partial word.
		 * @param {Number} x The partial word.
		 * @return {Number} The number of bits used by the partial word.
		 */
		getPartial(x) {
			return Math.round(x / 0x10000000000) || 32;
		},

		/** Shift an array right.
		 * @param {bitArray} a The array to shift.
		 * @param {Number} shift The number of bits to shift.
		 * @param {Number} [carry=0] A byte to carry in
		 * @param {bitArray} [out=[]] An array to prepend to the output.
		 * @private
		 */
		_shiftRight(a, shift, carry, out) {
			if (out === undefined) {
				out = [];
			}

			for (; shift >= 32; shift -= 32) {
				out.push(carry);
				carry = 0;
			}
			if (shift === 0) {
				return out.concat(a);
			}

			for (let i = 0; i < a.length; i++) {
				out.push(carry | a[i] >>> shift);
				carry = a[i] << (32 - shift);
			}
			const last2 = a.length ? a[a.length - 1] : 0;
			const shift2 = bitArray.getPartial(last2);
			out.push(bitArray.partial(shift + shift2 & 31, (shift + shift2 > 32) ? carry : out.pop(), 1));
			return out;
		}
	};

	/** @fileOverview Bit array codec implementations.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/**
	 * Arrays of bytes
	 * @namespace
	 */
	const codec = {
		bytes: {
			/** Convert from a bitArray to an array of bytes. */
			fromBits(arr) {
				const bl = bitArray.bitLength(arr);
				const byteLength = bl / 8;
				const out = new Uint8Array(byteLength);
				let tmp;
				for (let i = 0; i < byteLength; i++) {
					if ((i & 3) === 0) {
						tmp = arr[i / 4];
					}
					out[i] = tmp >>> 24;
					tmp <<= 8;
				}
				return out;
			},
			/** Convert from an array of bytes to a bitArray. */
			toBits(bytes) {
				const out = [];
				let i;
				let tmp = 0;
				for (i = 0; i < bytes.length; i++) {
					tmp = tmp << 8 | bytes[i];
					if ((i & 3) === 3) {
						out.push(tmp);
						tmp = 0;
					}
				}
				if (i & 3) {
					out.push(bitArray.partial(8 * (i & 3), tmp));
				}
				return out;
			}
		}
	};

	const hash = {};

	/**
	 * Context for a SHA-1 operation in progress.
	 * @constructor
	 */
	hash.sha1 = class {
		constructor(hash) {
			const sha1 = this;
			/**
			 * The hash's block size, in bits.
			 * @constant
			 */
			sha1.blockSize = 512;
			/**
			 * The SHA-1 initialization vector.
			 * @private
			 */
			sha1._init = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
			/**
			 * The SHA-1 hash key.
			 * @private
			 */
			sha1._key = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6];
			if (hash) {
				sha1._h = hash._h.slice(0);
				sha1._buffer = hash._buffer.slice(0);
				sha1._length = hash._length;
			} else {
				sha1.reset();
			}
		}

		/**
		 * Reset the hash state.
		 * @return this
		 */
		reset() {
			const sha1 = this;
			sha1._h = sha1._init.slice(0);
			sha1._buffer = [];
			sha1._length = 0;
			return sha1;
		}

		/**
		 * Input several words to the hash.
		 * @param {bitArray|String} data the data to hash.
		 * @return this
		 */
		update(data) {
			const sha1 = this;
			if (typeof data === "string") {
				data = codec.utf8String.toBits(data);
			}
			const b = sha1._buffer = bitArray.concat(sha1._buffer, data);
			const ol = sha1._length;
			const nl = sha1._length = ol + bitArray.bitLength(data);
			if (nl > 9007199254740991) {
				throw new Error("Cannot hash more than 2^53 - 1 bits");
			}
			const c = new Uint32Array(b);
			let j = 0;
			for (let i = sha1.blockSize + ol - ((sha1.blockSize + ol) & (sha1.blockSize - 1)); i <= nl;
				i += sha1.blockSize) {
				sha1._block(c.subarray(16 * j, 16 * (j + 1)));
				j += 1;
			}
			b.splice(0, 16 * j);
			return sha1;
		}

		/**
		 * Complete hashing and output the hash value.
		 * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
		 */
		finalize() {
			const sha1 = this;
			let b = sha1._buffer;
			const h = sha1._h;

			// Round out and push the buffer
			b = bitArray.concat(b, [bitArray.partial(1, 1)]);
			// Round out the buffer to a multiple of 16 words, less the 2 length words.
			for (let i = b.length + 2; i & 15; i++) {
				b.push(0);
			}

			// append the length
			b.push(Math.floor(sha1._length / 0x100000000));
			b.push(sha1._length | 0);

			while (b.length) {
				sha1._block(b.splice(0, 16));
			}

			sha1.reset();
			return h;
		}

		/**
		 * The SHA-1 logical functions f(0), f(1), ..., f(79).
		 * @private
		 */
		_f(t, b, c, d) {
			if (t <= 19) {
				return (b & c) | (~b & d);
			} else if (t <= 39) {
				return b ^ c ^ d;
			} else if (t <= 59) {
				return (b & c) | (b & d) | (c & d);
			} else if (t <= 79) {
				return b ^ c ^ d;
			}
		}

		/**
		 * Circular left-shift operator.
		 * @private
		 */
		_S(n, x) {
			return (x << n) | (x >>> 32 - n);
		}

		/**
		 * Perform one cycle of SHA-1.
		 * @param {Uint32Array|bitArray} words one block of words.
		 * @private
		 */
		_block(words) {
			const sha1 = this;
			const h = sha1._h;
			// When words is passed to _block, it has 16 elements. SHA1 _block
			// function extends words with new elements (at the end there are 80 elements). 
			// The problem is that if we use Uint32Array instead of Array, 
			// the length of Uint32Array cannot be changed. Thus, we replace words with a 
			// normal Array here.
			const w = Array(80); // do not use Uint32Array here as the instantiation is slower
			for (let j = 0; j < 16; j++) {
				w[j] = words[j];
			}

			let a = h[0];
			let b = h[1];
			let c = h[2];
			let d = h[3];
			let e = h[4];

			for (let t = 0; t <= 79; t++) {
				if (t >= 16) {
					w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
				}
				const tmp = (sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] +
					sha1._key[Math.floor(t / 20)]) | 0;
				e = d;
				d = c;
				c = sha1._S(30, b);
				b = a;
				a = tmp;
			}

			h[0] = (h[0] + a) | 0;
			h[1] = (h[1] + b) | 0;
			h[2] = (h[2] + c) | 0;
			h[3] = (h[3] + d) | 0;
			h[4] = (h[4] + e) | 0;
		}
	};

	/** @fileOverview Low-level AES implementation.
	 *
	 * This file contains a low-level implementation of AES, optimized for
	 * size and for efficiency on several browsers.  It is based on
	 * OpenSSL's aes_core.c, a public-domain implementation by Vincent
	 * Rijmen, Antoon Bosselaers and Paulo Barreto.
	 *
	 * An older version of this implementation is available in the public
	 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
	 * Stanford University 2008-2010 and BSD-licensed for liability
	 * reasons.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	const cipher = {};

	/**
	 * Schedule out an AES key for both encryption and decryption.  This
	 * is a low-level class.  Use a cipher mode to do bulk encryption.
	 *
	 * @constructor
	 * @param {Array} key The key as an array of 4, 6 or 8 words.
	 */
	cipher.aes = class {
		constructor(key) {
			/**
			 * The expanded S-box and inverse S-box tables.  These will be computed
			 * on the client so that we don't have to send them down the wire.
			 *
			 * There are two tables, _tables[0] is for encryption and
			 * _tables[1] is for decryption.
			 *
			 * The first 4 sub-tables are the expanded S-box with MixColumns.  The
			 * last (_tables[01][4]) is the S-box itself.
			 *
			 * @private
			 */
			const aes = this;
			aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];

			if (!aes._tables[0][0][0]) {
				aes._precompute();
			}

			const sbox = aes._tables[0][4];
			const decTable = aes._tables[1];
			const keyLen = key.length;

			let i, encKey, decKey, rcon = 1;

			if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
				throw new Error("invalid aes key size");
			}

			aes._key = [encKey = key.slice(0), decKey = []];

			// schedule encryption keys
			for (i = keyLen; i < 4 * keyLen + 28; i++) {
				let tmp = encKey[i - 1];

				// apply sbox
				if (i % keyLen === 0 || (keyLen === 8 && i % keyLen === 4)) {
					tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

					// shift rows and add rcon
					if (i % keyLen === 0) {
						tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
						rcon = rcon << 1 ^ (rcon >> 7) * 283;
					}
				}

				encKey[i] = encKey[i - keyLen] ^ tmp;
			}

			// schedule decryption keys
			for (let j = 0; i; j++, i--) {
				const tmp = encKey[j & 3 ? i : i - 4];
				if (i <= 4 || j < 4) {
					decKey[j] = tmp;
				} else {
					decKey[j] = decTable[0][sbox[tmp >>> 24]] ^
						decTable[1][sbox[tmp >> 16 & 255]] ^
						decTable[2][sbox[tmp >> 8 & 255]] ^
						decTable[3][sbox[tmp & 255]];
				}
			}
		}
		// public
		/* Something like this might appear here eventually
		name: "AES",
		blockSize: 4,
		keySizes: [4,6,8],
		*/

		/**
		 * Encrypt an array of 4 big-endian words.
		 * @param {Array} data The plaintext.
		 * @return {Array} The ciphertext.
		 */
		encrypt(data) {
			return this._crypt(data, 0);
		}

		/**
		 * Decrypt an array of 4 big-endian words.
		 * @param {Array} data The ciphertext.
		 * @return {Array} The plaintext.
		 */
		decrypt(data) {
			return this._crypt(data, 1);
		}

		/**
		 * Expand the S-box tables.
		 *
		 * @private
		 */
		_precompute() {
			const encTable = this._tables[0];
			const decTable = this._tables[1];
			const sbox = encTable[4];
			const sboxInv = decTable[4];
			const d = [];
			const th = [];
			let xInv, x2, x4, x8;

			// Compute double and third tables
			for (let i = 0; i < 256; i++) {
				th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
			}

			for (let x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
				// Compute sbox
				let s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
				s = s >> 8 ^ s & 255 ^ 99;
				sbox[x] = s;
				sboxInv[s] = x;

				// Compute MixColumns
				x8 = d[x4 = d[x2 = d[x]]];
				let tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
				let tEnc = d[s] * 0x101 ^ s * 0x1010100;

				for (let i = 0; i < 4; i++) {
					encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
					decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
				}
			}

			// Compactify.  Considerable speedup on Firefox.
			for (let i = 0; i < 5; i++) {
				encTable[i] = encTable[i].slice(0);
				decTable[i] = decTable[i].slice(0);
			}
		}

		/**
		 * Encryption and decryption core.
		 * @param {Array} input Four words to be encrypted or decrypted.
		 * @param dir The direction, 0 for encrypt and 1 for decrypt.
		 * @return {Array} The four encrypted or decrypted words.
		 * @private
		 */
		_crypt(input, dir) {
			if (input.length !== 4) {
				throw new Error("invalid aes block size");
			}

			const key = this._key[dir];

			const nInnerRounds = key.length / 4 - 2;
			const out = [0, 0, 0, 0];
			const table = this._tables[dir];

			// load up the tables
			const t0 = table[0];
			const t1 = table[1];
			const t2 = table[2];
			const t3 = table[3];
			const sbox = table[4];

			// state variables a,b,c,d are loaded with pre-whitened data
			let a = input[0] ^ key[0];
			let b = input[dir ? 3 : 1] ^ key[1];
			let c = input[2] ^ key[2];
			let d = input[dir ? 1 : 3] ^ key[3];
			let kIndex = 4;
			let a2, b2, c2;

			// Inner rounds.  Cribbed from OpenSSL.
			for (let i = 0; i < nInnerRounds; i++) {
				a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
				b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
				c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
				d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
				kIndex += 4;
				a = a2; b = b2; c = c2;
			}

			// Last round.
			for (let i = 0; i < 4; i++) {
				out[dir ? 3 & -i : i] =
					sbox[a >>> 24] << 24 ^
					sbox[b >> 16 & 255] << 16 ^
					sbox[c >> 8 & 255] << 8 ^
					sbox[d & 255] ^
					key[kIndex++];
				a2 = a; a = b; b = c; c = d; d = a2;
			}

			return out;
		}
	};

	/** @fileOverview CTR mode implementation.
	 *
	 * Special thanks to Roy Nicholson for pointing out a bug in our
	 * implementation.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/** Brian Gladman's CTR Mode.
	* @constructor
	* @param {Object} _prf The aes instance to generate key.
	* @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
	*/

	const mode = {};

	/**
	 * Brian Gladman's CTR Mode.
	 * @namespace
	 */
	mode.ctrGladman = class {
		constructor(prf, iv) {
			this._prf = prf;
			this._initIv = iv;
			this._iv = iv;
		}

		reset() {
			this._iv = this._initIv;
		}

		/** Input some data to calculate.
		 * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
		 */
		update(data) {
			return this.calculate(this._prf, data, this._iv);
		}

		incWord(word) {
			if (((word >> 24) & 0xff) === 0xff) { //overflow
				let b1 = (word >> 16) & 0xff;
				let b2 = (word >> 8) & 0xff;
				let b3 = word & 0xff;

				if (b1 === 0xff) { // overflow b1   
					b1 = 0;
					if (b2 === 0xff) {
						b2 = 0;
						if (b3 === 0xff) {
							b3 = 0;
						} else {
							++b3;
						}
					} else {
						++b2;
					}
				} else {
					++b1;
				}

				word = 0;
				word += (b1 << 16);
				word += (b2 << 8);
				word += b3;
			} else {
				word += (0x01 << 24);
			}
			return word;
		}

		incCounter(counter) {
			if ((counter[0] = this.incWord(counter[0])) === 0) {
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = this.incWord(counter[1]);
			}
		}

		calculate(prf, data, iv) {
			let l;
			if (!(l = data.length)) {
				return [];
			}
			const bl = bitArray.bitLength(data);
			for (let i = 0; i < l; i += 4) {
				this.incCounter(iv);
				const e = prf.encrypt(iv);
				data[i] ^= e[0];
				data[i + 1] ^= e[1];
				data[i + 2] ^= e[2];
				data[i + 3] ^= e[3];
			}
			return bitArray.clamp(data, bl);
		}
	};

	const misc = {
		importKey(password) {
			return new misc.hmacSha1(codec.bytes.toBits(password));
		},
		pbkdf2(prf, salt, count, length) {
			count = count || 10000;
			if (length < 0 || count < 0) {
				throw new Error("invalid params to pbkdf2");
			}
			const byteLength = ((length >> 5) + 1) << 2;
			let u, ui, i, j, k;
			const arrayBuffer = new ArrayBuffer(byteLength);
			const out = new DataView(arrayBuffer);
			let outLength = 0;
			const b = bitArray;
			salt = codec.bytes.toBits(salt);
			for (k = 1; outLength < (byteLength || 1); k++) {
				u = ui = prf.encrypt(b.concat(salt, [k]));
				for (i = 1; i < count; i++) {
					ui = prf.encrypt(ui);
					for (j = 0; j < ui.length; j++) {
						u[j] ^= ui[j];
					}
				}
				for (i = 0; outLength < (byteLength || 1) && i < u.length; i++) {
					out.setInt32(outLength, u[i]);
					outLength += 4;
				}
			}
			return arrayBuffer.slice(0, length / 8);
		}
	};

	/** @fileOverview HMAC implementation.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/** HMAC with the specified hash function.
	 * @constructor
	 * @param {bitArray} key the key for HMAC.
	 * @param {Object} [Hash=hash.sha1] The hash function to use.
	 */
	misc.hmacSha1 = class {

		constructor(key) {
			const hmac = this;
			const Hash = hmac._hash = hash.sha1;
			const exKey = [[], []];
			hmac._baseHash = [new Hash(), new Hash()];
			const bs = hmac._baseHash[0].blockSize / 32;

			if (key.length > bs) {
				key = new Hash().update(key).finalize();
			}

			for (let i = 0; i < bs; i++) {
				exKey[0][i] = key[i] ^ 0x36363636;
				exKey[1][i] = key[i] ^ 0x5C5C5C5C;
			}

			hmac._baseHash[0].update(exKey[0]);
			hmac._baseHash[1].update(exKey[1]);
			hmac._resultHash = new Hash(hmac._baseHash[0]);
		}
		reset() {
			const hmac = this;
			hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
			hmac._updated = false;
		}

		update(data) {
			const hmac = this;
			hmac._updated = true;
			hmac._resultHash.update(data);
		}

		digest() {
			const hmac = this;
			const w = hmac._resultHash.finalize();
			const result = new (hmac._hash)(hmac._baseHash[1]).update(w).finalize();

			hmac.reset();

			return result;
		}

		encrypt(data) {
			if (!this._updated) {
				this.update(data);
				return this.digest(data);
			} else {
				throw new Error("encrypt on already updated hmac called!");
			}
		}
	};

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	const GET_RANDOM_VALUES_SUPPORTED = typeof crypto != UNDEFINED_TYPE && typeof crypto.getRandomValues == FUNCTION_TYPE;

	const ERR_INVALID_PASSWORD = "Invalid password";
	const ERR_INVALID_SIGNATURE = "Invalid signature";
	const ERR_ABORT_CHECK_PASSWORD = "zipjs-abort-check-password";
	const ERR_UNSUPPORTED_CRYPTO_API = "Crypto API not supported";

	function getRandomValues(array) {
		if (GET_RANDOM_VALUES_SUPPORTED) {
			return crypto.getRandomValues(array);
		} else {
			throw new Error(ERR_UNSUPPORTED_CRYPTO_API);
		}
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	const BLOCK_LENGTH = 16;
	const RAW_FORMAT = "raw";
	const PBKDF2_ALGORITHM = { name: "PBKDF2" };
	const HASH_ALGORITHM = { name: "HMAC" };
	const HASH_FUNCTION = "SHA-1";
	const BASE_KEY_ALGORITHM = Object.assign({ hash: HASH_ALGORITHM }, PBKDF2_ALGORITHM);
	const DERIVED_BITS_ALGORITHM = Object.assign({ iterations: 1000, hash: { name: HASH_FUNCTION } }, PBKDF2_ALGORITHM);
	const DERIVED_BITS_USAGE = ["deriveBits"];
	const SALT_LENGTH = [8, 12, 16];
	const KEY_LENGTH = [16, 24, 32];
	const SIGNATURE_LENGTH = 10;
	const COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
	// deno-lint-ignore valid-typeof
	const CRYPTO_API_SUPPORTED = typeof crypto != UNDEFINED_TYPE;
	const subtle = CRYPTO_API_SUPPORTED && crypto.subtle;
	const SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && typeof subtle != UNDEFINED_TYPE;
	const codecBytes = codec.bytes;
	const Aes = cipher.aes;
	const CtrGladman = mode.ctrGladman;
	const HmacSha1 = misc.hmacSha1;

	let IMPORT_KEY_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof subtle.importKey == FUNCTION_TYPE;
	let DERIVE_BITS_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof subtle.deriveBits == FUNCTION_TYPE;

	class AESDecryptionStream extends TransformStream {

		constructor({ password, rawPassword, encryptionStrength, checkPasswordOnly }) {
			super({
				start() {
					initAesCrypto(this, password, rawPassword, encryptionStrength);
				},
				async transform(chunk, controller) {
					const aesCrypto = this;
					const {
						password,
						strength,
						resolveReady,
						ready
					} = aesCrypto;
					if (password) {
						await createDecryptionKeys(aesCrypto, strength, password, subarray(chunk, 0, SALT_LENGTH[strength] + 2));
						chunk = subarray(chunk, SALT_LENGTH[strength] + 2);
						if (checkPasswordOnly) {
							controller.error(new Error(ERR_ABORT_CHECK_PASSWORD));
						} else {
							resolveReady();
						}
					} else {
						await ready;
					}
					const output = new Uint8Array(chunk.length - SIGNATURE_LENGTH - ((chunk.length - SIGNATURE_LENGTH) % BLOCK_LENGTH));
					controller.enqueue(append(aesCrypto, chunk, output, 0, SIGNATURE_LENGTH, true));
				},
				async flush(controller) {
					const {
						ctr,
						hmac,
						pending,
						ready
					} = this;
					if (hmac && ctr) {
						await ready;
						const chunkToDecrypt = subarray(pending, 0, pending.length - SIGNATURE_LENGTH);
						const originalSignature = subarray(pending, pending.length - SIGNATURE_LENGTH);
						let decryptedChunkArray = EMPTY_UINT8_ARRAY;
						if (chunkToDecrypt.length) {
							const encryptedChunk = toBits(codecBytes, chunkToDecrypt);
							hmac.update(encryptedChunk);
							const decryptedChunk = ctr.update(encryptedChunk);
							decryptedChunkArray = fromBits(codecBytes, decryptedChunk);
						}
						const signature = subarray(fromBits(codecBytes, hmac.digest()), 0, SIGNATURE_LENGTH);
						let invalidSignature = pending.length < SIGNATURE_LENGTH ? 1 : 0;
						for (let indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
							invalidSignature |= signature[indexSignature] ^ originalSignature[indexSignature];
						}
						if (invalidSignature) {
							throw new Error(ERR_INVALID_SIGNATURE);
						}
						controller.enqueue(decryptedChunkArray);
					}
				}
			});
		}
	}

	class AESEncryptionStream extends TransformStream {

		constructor({ password, rawPassword, encryptionStrength }) {
			// deno-lint-ignore prefer-const
			let stream;
			super({
				start() {
					initAesCrypto(this, password, rawPassword, encryptionStrength);
				},
				async transform(chunk, controller) {
					const aesCrypto = this;
					const {
						password,
						strength,
						resolveReady,
						ready
					} = aesCrypto;
					let preamble = EMPTY_UINT8_ARRAY;
					if (password) {
						preamble = await createEncryptionKeys(aesCrypto, strength, password);
						resolveReady();
					} else {
						await ready;
					}
					const output = new Uint8Array(preamble.length + chunk.length - (chunk.length % BLOCK_LENGTH));
					output.set(preamble, 0);
					controller.enqueue(append(aesCrypto, chunk, output, preamble.length, 0));
				},
				async flush(controller) {
					const {
						ctr,
						hmac,
						pending,
						ready
					} = this;
					if (hmac && ctr) {
						await ready;
						let encryptedChunkArray = EMPTY_UINT8_ARRAY;
						if (pending.length) {
							const encryptedChunk = ctr.update(toBits(codecBytes, pending));
							hmac.update(encryptedChunk);
							encryptedChunkArray = fromBits(codecBytes, encryptedChunk);
						}
						stream.signature = fromBits(codecBytes, hmac.digest()).slice(0, SIGNATURE_LENGTH);
						controller.enqueue(concat(encryptedChunkArray, stream.signature));
					}
				}
			});
			stream = this;
		}
	}

	function initAesCrypto(aesCrypto, password, rawPassword, encryptionStrength) {
		Object.assign(aesCrypto, {
			ready: new Promise(resolve => aesCrypto.resolveReady = resolve),
			password: encodePassword(password, rawPassword),
			strength: encryptionStrength - 1,
			pending: EMPTY_UINT8_ARRAY
		});
	}

	function append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
		const {
			ctr,
			hmac,
			pending
		} = aesCrypto;
		if (pending.length) {
			input = concat(pending, input);
		}
		const inputLength = input.length - paddingEnd;
		output = expand(output, paddingStart + (inputLength - (inputLength % BLOCK_LENGTH)));
		let offset;
		for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
			const inputChunk = toBits(codecBytes, subarray(input, offset, offset + BLOCK_LENGTH));
			if (verifySignature) {
				hmac.update(inputChunk);
			}
			const outputChunk = ctr.update(inputChunk);
			if (!verifySignature) {
				hmac.update(outputChunk);
			}
			output.set(fromBits(codecBytes, outputChunk), offset + paddingStart);
		}
		aesCrypto.pending = subarray(input, offset);
		return output;
	}

	async function createDecryptionKeys(decrypt, strength, password, preamble) {
		const passwordVerificationKey = await createKeys$1(decrypt, strength, password, subarray(preamble, 0, SALT_LENGTH[strength]));
		const passwordVerification = subarray(preamble, SALT_LENGTH[strength]);
		if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
			throw new Error(ERR_INVALID_PASSWORD);
		}
	}

	async function createEncryptionKeys(encrypt, strength, password) {
		const salt = getRandomValues(new Uint8Array(SALT_LENGTH[strength]));
		const passwordVerification = await createKeys$1(encrypt, strength, password, salt);
		return concat(salt, passwordVerification);
	}

	async function createKeys$1(aesCrypto, strength, password, salt) {
		aesCrypto.password = null;
		const baseKey = await importKey(RAW_FORMAT, password, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE);
		const derivedBits = await deriveBits(Object.assign({ salt }, DERIVED_BITS_ALGORITHM), baseKey, 8 * ((KEY_LENGTH[strength] * 2) + 2));
		const compositeKey = new Uint8Array(derivedBits);
		const key = toBits(codecBytes, subarray(compositeKey, 0, KEY_LENGTH[strength]));
		const authentication = toBits(codecBytes, subarray(compositeKey, KEY_LENGTH[strength], KEY_LENGTH[strength] * 2));
		const passwordVerification = subarray(compositeKey, KEY_LENGTH[strength] * 2);
		Object.assign(aesCrypto, {
			keys: {
				key,
				authentication,
				passwordVerification
			},
			ctr: new CtrGladman(new Aes(key), Array.from(COUNTER_DEFAULT_VALUE)),
			hmac: new HmacSha1(authentication)
		});
		return passwordVerification;
	}

	async function importKey(format, password, algorithm, extractable, keyUsages) {
		if (IMPORT_KEY_SUPPORTED) {
			try {
				return await subtle.importKey(format, password, algorithm, extractable, keyUsages);
			} catch {
				IMPORT_KEY_SUPPORTED = false;
				return misc.importKey(password);
			}
		} else {
			return misc.importKey(password);
		}
	}

	async function deriveBits(algorithm, baseKey, length) {
		if (DERIVE_BITS_SUPPORTED) {
			try {
				return await subtle.deriveBits(algorithm, baseKey, length);
			} catch {
				DERIVE_BITS_SUPPORTED = false;
				return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
			}
		} else {
			return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
		}
	}

	function encodePassword(password, rawPassword) {
		if (rawPassword === UNDEFINED_VALUE) {
			return encodeText(password);
		} else {
			return rawPassword;
		}
	}

	function concat(leftArray, rightArray) {
		let array = leftArray;
		if (leftArray.length + rightArray.length) {
			array = new Uint8Array(leftArray.length + rightArray.length);
			array.set(leftArray, 0);
			array.set(rightArray, leftArray.length);
		}
		return array;
	}

	function expand(inputArray, length) {
		if (length && length > inputArray.length) {
			const array = inputArray;
			inputArray = new Uint8Array(length);
			inputArray.set(array, 0);
		}
		return inputArray;
	}

	function subarray(array, begin, end) {
		return array.subarray(begin, end);
	}

	function fromBits(codecBytes, chunk) {
		return codecBytes.fromBits(chunk);
	}
	function toBits(codecBytes, chunk) {
		return codecBytes.toBits(chunk);
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	const HEADER_LENGTH = 12;

	class ZipCryptoDecryptionStream extends TransformStream {

		constructor({ password, rawPassword, passwordVerification, checkPasswordOnly }) {
			super({
				start() {
					initZipCrypto(this, password, rawPassword, passwordVerification);
				},
				transform(chunk, controller) {
					const zipCrypto = this;
					if (zipCrypto.password || zipCrypto.rawPassword) {
						const decryptedHeader = decrypt(zipCrypto, chunk.subarray(0, HEADER_LENGTH));
						zipCrypto.password = zipCrypto.rawPassword = null;
						if ((decryptedHeader.at(-1) ^ zipCrypto.passwordVerification) != 0) {
							throw new Error(ERR_INVALID_PASSWORD);
						}
						chunk = chunk.subarray(HEADER_LENGTH);
					}
					if (checkPasswordOnly) {
						controller.error(new Error(ERR_ABORT_CHECK_PASSWORD));
					} else {
						controller.enqueue(decrypt(zipCrypto, chunk));
					}
				}
			});
		}
	}

	class ZipCryptoEncryptionStream extends TransformStream {

		constructor({ password, rawPassword, passwordVerification }) {
			super({
				start() {
					initZipCrypto(this, password, rawPassword, passwordVerification);
				},
				transform(chunk, controller) {
					const zipCrypto = this;
					let output;
					let offset;
					if (zipCrypto.password || zipCrypto.rawPassword) {
						zipCrypto.password = zipCrypto.rawPassword = null;
						const header = getRandomValues(new Uint8Array(HEADER_LENGTH));
						header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
						output = new Uint8Array(chunk.length + header.length);
						output.set(encrypt(zipCrypto, header), 0);
						offset = HEADER_LENGTH;
					} else {
						output = new Uint8Array(chunk.length);
						offset = 0;
					}
					output.set(encrypt(zipCrypto, chunk), offset);
					controller.enqueue(output);
				}
			});
		}
	}

	function initZipCrypto(zipCrypto, password, rawPassword, passwordVerification) {
		Object.assign(zipCrypto, {
			password,
			rawPassword,
			passwordVerification
		});
		createKeys(zipCrypto, password, rawPassword);
	}

	function decrypt(target, input) {
		const output = new Uint8Array(input.length);
		for (let index = 0; index < input.length; index++) {
			output[index] = getByte(target) ^ input[index];
			updateKeys(target, output[index]);
		}
		return output;
	}

	function encrypt(target, input) {
		const output = new Uint8Array(input.length);
		for (let index = 0; index < input.length; index++) {
			output[index] = getByte(target) ^ input[index];
			updateKeys(target, input[index]);
		}
		return output;
	}

	function createKeys(target, password, rawPassword) {
		const keys = [0x12345678, 0x23456789, 0x34567890];
		Object.assign(target, {
			keys,
			crcKey0: new Crc32(keys[0]),
			crcKey2: new Crc32(keys[2])
		});
		if (rawPassword) {
			for (let index = 0; index < rawPassword.length; index++) {
				updateKeys(target, rawPassword[index]);
			}
		} else {
			for (let index = 0; index < password.length; index++) {
				updateKeys(target, password.charCodeAt(index));
			}
		}
	}

	function updateKeys(target, byte) {
		let [, key1] = target.keys;
		target.crcKey0.append([byte]);
		const key0 = ~target.crcKey0.get();
		key1 = getInt32(Math.imul(getInt32(key1 + getInt8(key0)), 134775813) + 1);
		target.crcKey2.append([key1 >>> 24]);
		const key2 = ~target.crcKey2.get();
		target.keys = [key0, key1, key2];
	}

	function getByte(target) {
		const temp = target.keys[2] | 2;
		return getInt8(Math.imul(temp, (temp ^ 1)) >>> 8);
	}

	function getInt8(number) {
		return number & 0xFF;
	}

	function getInt32(number) {
		return number & 0xFFFFFFFF;
	}

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
		return pipeThroughBackpressured(readable, codecStream);
	}

	function pipeThrough(readable, transformStream) {
		return readable.pipeThrough(transformStream);
	}

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
			// ignored: the writable may already be errored/closed
		}
	}

	async function cancel(reader, error) {
		try {
			await reader.cancel(error);
		} catch {
			// ignored: the readable may already be errored/closed
		}
	}

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

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	const DEFAULT_CHUNK_SIZE$1 = 64 * 1024;
	const MESSAGE_EVENT_TYPE = "message";
	const MESSAGE_START = "start";
	const MESSAGE_PULL = "pull";
	const MESSAGE_DATA = "data";
	const MESSAGE_ACK_DATA = "ack";
	const MESSAGE_CLOSE = "close";
	const CODEC_DEFLATE = "deflate";
	const CODEC_INFLATE = "inflate";

	class CodecStream extends TransformStream {

		constructor(options, config) {
			super({});
			const codec = this;
			const { codecType } = options;
			let Stream;
			if (codecType.startsWith(CODEC_DEFLATE)) {
				Stream = DeflateStream;
			} else if (codecType.startsWith(CODEC_INFLATE)) {
				Stream = InflateStream;
			}
			codec.outputSize = 0;
			let inputSize = 0;
			const stream = new Stream(options, config);
			const readable = super.readable;
			const inputSizeStream = new TransformStream({
				transform(chunk, controller) {
					if (chunk && chunk.length) {
						inputSize += chunk.length;
						controller.enqueue(chunk);
					}
				},
				flush() {
					Object.assign(codec, {
						inputSize
					});
				}
			});
			const outputSizeStream = new TransformStream({
				transform(chunk, controller) {
					if (chunk && chunk.length) {
						controller.enqueue(chunk);
						codec.outputSize += chunk.length;
						if (options.outputSize !== UNDEFINED_VALUE && codec.outputSize > options.outputSize) {
							throw new Error(ERR_INVALID_UNCOMPRESSED_SIZE);
						}
					}
				},
				flush() {
					const { signature } = stream;
					Object.assign(codec, {
						signature,
						inputSize
					});
				}
			});
			Object.defineProperty(codec, "readable", {
				get() {
					return readable.pipeThrough(inputSizeStream).pipeThrough(stream).pipeThrough(outputSizeStream);
				}
			});
		}
	}

	class ChunkStream extends TransformStream {

		constructor(chunkSize) {
			let pendingChunk;
			if (!(chunkSize >= 1)) {
				chunkSize = DEFAULT_CHUNK_SIZE$1;
			}
			super({
				transform,
				flush(controller) {
					if (pendingChunk && pendingChunk.length) {
						controller.enqueue(pendingChunk);
					}
				}
			});

			function transform(chunk, controller) {
				if (pendingChunk) {
					const newChunk = new Uint8Array(pendingChunk.length + chunk.length);
					newChunk.set(pendingChunk);
					newChunk.set(chunk, pendingChunk.length);
					chunk = newChunk;
					pendingChunk = null;
				}
				let offset = 0;
				while (chunk.length - offset > chunkSize) {
					controller.enqueue(chunk.slice(offset, offset + chunkSize));
					offset += chunkSize;
				}
				pendingChunk = offset ? chunk.slice(offset) : chunk;
			}
		}
	}

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


	const MODULE_WORKER_OPTIONS = { type: "module" };
	const ERROR_EVENT_TYPE = "error";
	const MESSAGE_ERROR_EVENT_TYPE = "messageerror";

	let webWorkerSupported, webWorkerSource, webWorkerURI, webWorkerOptions;
	let transferStreamsSupported = true;
	try {
		transferStreamsSupported = typeof structuredClone == FUNCTION_TYPE && structuredClone(new DOMException("", "AbortError")).code !== UNDEFINED_VALUE;
	} catch {
		// ignored
	}
	let initModule = () => { };

	class CodecWorker {

		constructor(workerData, { readable, writable }, { options, config, streamOptions, useWebWorkers, transferStreams, workerURI }, onTaskFinished) {
			const { signal } = streamOptions;
			Object.assign(workerData, {
				busy: true,
				generation: (workerData.generation || 0) + 1,
				readable: readable
					.pipeThrough(new ChunkStream(getChunkSize(config)))
					.pipeThrough(new ProgressWatcherStream(streamOptions), { signal }),
				writable,
				options: Object.assign({}, options),
				workerURI,
				transferStreams,
				terminate() {
					return new Promise(resolve => {
						const { worker, busy } = workerData;
						if (worker) {
							if (busy) {
								workerData.resolveTerminated = resolve;
							} else {
								worker.terminate();
								resolve();
							}
							workerData.interface = null;
						} else {
							resolve();
						}
					});
				},
				onTaskFinished() {
					if (workerData.busy) {
						const { resolveTerminated } = workerData;
						if (resolveTerminated) {
							workerData.resolveTerminated = null;
							workerData.terminated = true;
							workerData.worker.terminate();
							resolveTerminated();
						}
						workerData.busy = false;
						onTaskFinished(workerData);
					}
				}
			});
			if (webWorkerSupported === UNDEFINED_VALUE) {
				// deno-lint-ignore valid-typeof
				webWorkerSupported = typeof Worker != UNDEFINED_TYPE;
			}
			return (useWebWorkers && webWorkerSupported ? createWebWorkerInterface : createWorkerInterface)(workerData, config);
		}
	}

	class ProgressWatcherStream extends TransformStream {

		constructor({ onstart, onprogress, size, onend }) {
			let chunkOffset = 0;
			super({
				async start() {
					if (onstart) {
						await callHandler(onstart, size);
					}
				},
				async transform(chunk, controller) {
					chunkOffset += chunk.length;
					if (onprogress) {
						await callHandler(onprogress, chunkOffset, size);
					}
					controller.enqueue(chunk);
				},
				async flush() {
					if (onend) {
						await callHandler(onend, chunkOffset);
					}
				}
			});
		}
	}

	async function callHandler(handler, ...parameters) {
		try {
			await handler(...parameters);
		} catch {
			// ignored
		}
	}

	function createWorkerInterface(workerData, config) {
		return {
			run: () => runWorker$1(workerData, config)
		};
	}

	function createWebWorkerInterface(workerData, config) {
		const { baseURI, chunkSize } = config;
		let { wasmURI } = config;

		if (!workerData.interface) {
			// deno-lint-ignore valid-typeof
			if (typeof wasmURI == FUNCTION_TYPE) {
				wasmURI = wasmURI();
			}
			let worker;
			try {
				worker = getWebWorker(workerData.workerURI, baseURI, workerData);
			} catch {
				webWorkerSupported = false;
				return createWorkerInterface(workerData, config);
			}
			Object.assign(workerData, {
				worker,
				terminated: false,
				interface: {
					run: () => runWebWorker(workerData, { chunkSize, wasmURI, baseURI })
				}
			});
		}
		return workerData.interface;
	}

	async function runWorker$1({ options, readable, writable, onTaskFinished }, config) {
		let codecStream;
		try {
			if (!options.useCompressionStream) {
				try {
					await initModule(config);
				} catch {
					const ZlibStream = options.codecType.startsWith(CODEC_DEFLATE) ?
						config.CompressionStreamZlib :
						config.DecompressionStreamZlib;
					if (!ZlibStream || ZlibStream.requiresModule) {
						options.useCompressionStream = true;
					}
				}
			}
			codecStream = new CodecStream(options, config);
			await readable.pipeThrough(codecStream).pipeTo(writable, { preventClose: true, preventAbort: true });
			const {
				signature,
				inputSize,
				outputSize
			} = codecStream;
			return {
				signature,
				inputSize,
				outputSize
			};
		} catch (error) {
			if (codecStream) {
				error.outputSize = codecStream.outputSize;
			}
			throw error;
		} finally {
			onTaskFinished();
		}
	}

	async function runWebWorker(workerData, config) {
		let resolveResult, rejectResult;
		const result = new Promise((resolve, reject) => {
			resolveResult = resolve;
			rejectResult = reject;
		});
		Object.assign(workerData, {
			reader: null,
			writer: null,
			resolveResult,
			rejectResult,
			result
		});
		const { readable, options } = workerData;
		const { writable, closed, abortPipe } = watchClosedStream(workerData.writable);
		let streamsTransferred;
		try {
			streamsTransferred = sendMessage({
				type: MESSAGE_START,
				options,
				config,
				readable,
				writable
			}, workerData);
		} catch (error) {
			abortPipe();
			try {
				await closed;
			} catch {
				// ignored
			}
			workerData.onTaskFinished();
			throw error;
		}
		if (!streamsTransferred) {
			Object.assign(workerData, {
				reader: readable.getReader(),
				writer: writable.getWriter()
			});
		}
		try {
			const resultValue = await result;
			await closeWritable();
			await closed;
			return resultValue;
		} catch (error) {
			await closeWritable();
			abortPipe();
			try {
				await closed;
			} catch {
				// ignored
			}
			throw error;
		}

		async function closeWritable() {
			if (!streamsTransferred && !writable.locked) {
				try {
					await writable.getWriter().close();
				} catch {
					// ignored
				}
			}
		}
	}

	function watchClosedStream(writableSource) {
		const abortController = new AbortController();
		const { writable, readable } = new TransformStream();
		const closed = readable.pipeTo(writableSource, { preventClose: true, preventAbort: true, signal: abortController.signal });
		closed.catch(() => { });
		return { writable, closed, abortPipe: () => abortController.abort() };
	}

	function terminateWorker$1(workerData) {
		const { worker } = workerData;
		if (worker) {
			try {
				worker.terminate();
			} catch {
				// ignored
			}
		}
		workerData.interface = null;
	}

	function getWebWorker(url, baseURI, workerData, isModuleType, useBlobURI = true) {
		let worker, resolvedURI, resolvedOptions;
		if (webWorkerURI === UNDEFINED_VALUE || webWorkerSource !== url) {
			// deno-lint-ignore valid-typeof
			const isFunctionURI = typeof url == FUNCTION_TYPE;
			if (isFunctionURI) {
				resolvedURI = url(useBlobURI);
			} else {
				resolvedURI = url;
			}
			const isDataURI = resolvedURI.startsWith("data:");
			const isBlobURI = resolvedURI.startsWith("blob:");
			if (isDataURI || isBlobURI) {
				if (isModuleType === UNDEFINED_VALUE) {
					isModuleType = false;
				}
				if (isModuleType) {
					resolvedOptions = MODULE_WORKER_OPTIONS;
				}
				try {
					worker = new Worker(resolvedURI, resolvedOptions);
				} catch (error) {
					if (isBlobURI) {
						try {
							URL.revokeObjectURL(resolvedURI);
						} catch {
							// ignored
						}
					}
					if (isFunctionURI && isBlobURI) {
						return getWebWorker(url, baseURI, workerData, isModuleType, false);
					} else if (!isModuleType) {
						return getWebWorker(url, baseURI, workerData, true, false);
					} else {
						throw error;
					}
				}
			} else {
				if (isModuleType === UNDEFINED_VALUE) {
					isModuleType = true;
				}
				if (isModuleType) {
					resolvedOptions = MODULE_WORKER_OPTIONS;
				}
				try {
					resolvedURI = new URL(resolvedURI, baseURI);
				} catch {
					// ignored
				}
				try {
					worker = new Worker(resolvedURI, resolvedOptions);
				} catch (error) {
					if (!isModuleType) {
						return getWebWorker(url, baseURI, workerData, false, useBlobURI);
					} else {
						throw error;
					}
				}
			}
			webWorkerSource = url;
			webWorkerURI = resolvedURI;
			webWorkerOptions = resolvedOptions;
		} else {
			worker = new Worker(webWorkerURI, webWorkerOptions);
		}
		worker.addEventListener(MESSAGE_EVENT_TYPE, event => onMessage(event, workerData));
		worker.addEventListener(ERROR_EVENT_TYPE, event => onWorkerError(event, workerData));
		worker.addEventListener(MESSAGE_ERROR_EVENT_TYPE, event => onWorkerError(event, workerData));
		return worker;
	}

	function onWorkerError(event, workerData) {
		if (event.preventDefault) {
			event.preventDefault();
		}
		const { rejectResult, writer, onTaskFinished } = workerData;
		terminateWorker$1(workerData);
		if (rejectResult) {
			rejectResult(event.error || new Error(event.message || ERROR_EVENT_TYPE));
			if (writer) {
				writer.releaseLock();
			}
			onTaskFinished();
		}
	}

	function sendMessage(message, { worker, writer, transferStreams }) {
		try {
			const { value, readable, writable } = message;
			const transferables = [];
			if (value) {
				message.value = value.byteOffset || value.byteLength != value.buffer.byteLength ? new Uint8Array(value) : value;
				transferables.push(message.value.buffer);
			}
			if (transferStreams && transferStreamsSupported) {
				if (readable) {
					transferables.push(readable);
				}
				if (writable) {
					transferables.push(writable);
				}
			} else {
				message.readable = message.writable = null;
			}
			if (transferables.length) {
				try {
					worker.postMessage(message, transferables);
					return true;
				} catch {
					transferStreamsSupported = false;
					message.readable = message.writable = null;
					worker.postMessage(message);
				}
			} else {
				worker.postMessage(message);
			}
		} catch (error) {
			if (writer) {
				writer.releaseLock();
			}
			throw error;
		}
	}

	async function onMessage({ data }, workerData) {
		const { type, value, messageId, result, error } = data;
		const { reader, writer, resolveResult, rejectResult, onTaskFinished, generation } = workerData;
		const stale = () => workerData.generation != generation;
		try {
			if (error) {
				const { message, stack, code, name, outputSize } = error;
				const responseError = new Error(message);
				Object.assign(responseError, { stack, code, name, outputSize });
				close(responseError);
			} else {
				if (type == MESSAGE_PULL) {
					const { value, done } = await reader.read();
					if (!stale()) {
						sendMessage({ type: MESSAGE_DATA, value, done, messageId }, workerData);
					}
				}
				if (type == MESSAGE_DATA) {
					await writer.ready;
					await writer.write(new Uint8Array(value));
					if (!stale()) {
						sendMessage({ type: MESSAGE_ACK_DATA, messageId }, workerData);
					}
				}
				if (type == MESSAGE_CLOSE) {
					close(null, result);
				}
			}
		} catch (error) {
			if (!stale()) {
				terminateWorker$1(workerData);
				close(error);
			}
		}

		function close(error, result) {
			if (stale()) {
				return;
			}
			if (error) {
				rejectResult(error);
			} else {
				resolveResult(result);
			}
			if (writer) {
				writer.releaseLock();
			}
			onTaskFinished();
		}
	}

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


	let pool = [];
	const pendingRequests = [];
	let starvationTimeout;
	let starvationDelay;

	let indexWorker = 0;

	async function runWorker(stream, workerOptions) {
		const { options, config } = workerOptions;
		const { transferStreams, useWebWorkers, useCompressionStream, compressed, signed, encrypted } = options;
		const { workerURI, maxWorkers } = config;
		workerOptions.transferStreams = transferStreams || transferStreams === UNDEFINED_VALUE;
		const streamCopy = !compressed && !signed && !encrypted && !workerOptions.transferStreams;
		workerOptions.useWebWorkers = !streamCopy && (useWebWorkers || (useWebWorkers === UNDEFINED_VALUE && config.useWebWorkers));
		workerOptions.workerURI = workerOptions.useWebWorkers && workerURI ? workerURI : UNDEFINED_VALUE;
		options.useCompressionStream = useCompressionStream || (useCompressionStream === UNDEFINED_VALUE && config.useCompressionStream);
		return (await getWorker()).run();

		// deno-lint-ignore require-await
		async function getWorker() {
			const workerData = pool.find(workerData => !workerData.busy);
			if (workerData) {
				clearTerminateTimeout(workerData);
				return new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
			} else if (pool.length < maxWorkers) {
				const workerData = { indexWorker };
				indexWorker++;
				pool.push(workerData);
				return new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
			} else {
				return new Promise(resolve => {
					pendingRequests.push({ resolve, stream, workerOptions });
					starvationDelay = config.workerStarvationTimeout;
					armStarvationTimeout();
				});
			}
		}

		function onTaskFinished(workerData) {
			clearStarvationTimeout();
			if (pendingRequests.length) {
				const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
				resolve(new CodecWorker(workerData, stream, workerOptions, onTaskFinished));
				armStarvationTimeout();
			} else if (workerData.worker) {
				clearTerminateTimeout(workerData);
				terminateWorker(workerData, workerOptions);
			} else {
				pool = pool.filter(data => data != workerData);
			}
		}
	}

	function armStarvationTimeout() {
		if (!starvationTimeout && pendingRequests.length && Number.isFinite(starvationDelay) && starvationDelay >= 0) {
			starvationTimeout = setTimeout(onWorkerStarvation, starvationDelay);
		}
	}

	function clearStarvationTimeout() {
		if (starvationTimeout) {
			clearTimeout(starvationTimeout);
			starvationTimeout = null;
		}
	}

	function onWorkerStarvation() {
		starvationTimeout = null;
		if (pendingRequests.length) {
			const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
			const inlineWorkerOptions = Object.assign({}, workerOptions, { useWebWorkers: false, workerURI: UNDEFINED_VALUE });
			resolve(new CodecWorker({}, stream, inlineWorkerOptions, onInlineTaskFinished));
			armStarvationTimeout();
		}
	}

	function onInlineTaskFinished() {
		clearStarvationTimeout();
		armStarvationTimeout();
	}

	function terminateWorker(workerData, workerOptions) {
		const { config } = workerOptions;
		const { terminateWorkerTimeout } = config;
		if (Number.isFinite(terminateWorkerTimeout) && terminateWorkerTimeout >= 0) {
			if (workerData.terminated) {
				workerData.terminated = false;
			} else {
				workerData.terminateTimeout = setTimeout(async () => {
					pool = pool.filter(data => data != workerData);
					try {
						await workerData.terminate();
					} catch {
						// ignored
					}
				}, terminateWorkerTimeout);
			}
		}
	}

	function clearTerminateTimeout(workerData) {
		const { terminateTimeout } = workerData;
		if (terminateTimeout) {
			clearTimeout(terminateTimeout);
			workerData.terminateTimeout = null;
		}
	}

	async function terminateWorkers() {
		await Promise.allSettled(pool.map(workerData => {
			clearTerminateTimeout(workerData);
			return workerData.terminate();
		}));
	}

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


	const ERR_HTTP_STATUS = "HTTP error ";
	const ERR_HTTP_RANGE = "HTTP Range not supported";
	const ERR_ITERATOR_COMPLETED_TOO_SOON = "Writer iterator completed too soon";
	const ERR_WRITER_NOT_INITIALIZED = "Writer not initialized";

	const CONTENT_TYPE_TEXT_PLAIN = "text/plain";
	const HTTP_HEADER_CONTENT_LENGTH = "Content-Length";
	const HTTP_HEADER_CONTENT_ENCODING = "Content-Encoding";
	const HTTP_HEADER_CONTENT_RANGE = "Content-Range";
	const HTTP_HEADER_ACCEPT_RANGES = "Accept-Ranges";
	const HTTP_HEADER_RANGE = "Range";
	const HTTP_HEADER_CONTENT_TYPE = "Content-Type";
	const HTTP_METHOD_HEAD = "HEAD";
	const HTTP_METHOD_GET = "GET";
	const HTTP_RANGE_UNIT = "bytes";
	const DEFAULT_CHUNK_SIZE = 64 * 1024;
	const DEFAULT_BUFFER_SIZE = 256 * 1024;

	const PROPERTY_NAME_WRITABLE = "writable";

	class Stream {

		constructor() {
			this.size = 0;
		}

		init() {
			this.initialized = true;
		}
	}

	class Reader extends Stream {

		get readable() {
			return this.createReadable();
		}

		createReadable({ offset = 0, size, diskNumberStart, chunkSize = DEFAULT_CHUNK_SIZE } = {}) {
			const reader = this;
			let chunkOffset = 0;
			return new ReadableStream({
				async pull(controller) {
					const dataSize = size === UNDEFINED_VALUE ? chunkSize : Math.min(chunkSize, size - chunkOffset);
					const data = await readUint8Array(reader, offset + chunkOffset, dataSize, diskNumberStart);
					controller.enqueue(data);
					if ((chunkOffset + chunkSize > size) || (size === UNDEFINED_VALUE && !data.length && dataSize)) {
						controller.close();
					} else {
						chunkOffset += chunkSize;
					}
				}
			});
		}
	}

	class Writer extends Stream {

		constructor() {
			super();
			const writer = this;
			const writable = new WritableStream({
				write(chunk) {
					if (!writer.initialized) {
						throw new Error(ERR_WRITER_NOT_INITIALIZED);
					}
					return writer.writeUint8Array(chunk);
				}
			});
			Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
				get() {
					return writable;
				}
			});
		}

		writeUint8Array() {
			// abstract
		}
	}

	class Data64URIReader extends Reader {

		constructor(dataURI) {
			super();
			let dataEnd = dataURI.length;
			while (dataURI.charAt(dataEnd - 1) == "=") {
				dataEnd--;
			}
			const dataStart = dataURI.indexOf(",") + 1;
			Object.assign(this, {
				dataURI,
				dataStart,
				size: Math.floor((dataEnd - dataStart) * 0.75)
			});
		}

		readUint8Array(offset, length) {
			const {
				dataStart,
				dataURI
			} = this;
			const dataArray = new Uint8Array(length);
			const start = Math.floor(offset / 3) * 4;
			const bytes = atob(dataURI.substring(start + dataStart, Math.ceil((offset + length) / 3) * 4 + dataStart));
			const delta = offset - Math.floor(start / 4) * 3;
			let effectiveLength = 0;
			for (let indexByte = delta; indexByte < delta + length && indexByte < bytes.length; indexByte++) {
				dataArray[indexByte - delta] = bytes.charCodeAt(indexByte);
				effectiveLength++;
			}
			if (effectiveLength < dataArray.length) {
				return dataArray.subarray(0, effectiveLength);
			} else {
				return dataArray;
			}
		}
	}

	class Data64URIWriter extends Writer {

		constructor(contentType) {
			super();
			Object.assign(this, {
				data: "data:" + (contentType || "") + ";base64,",
				pending: []
			});
		}

		writeUint8Array(array) {
			const writer = this;
			let indexArray;
			let dataString = writer.pending;
			const delta = writer.pending.length;
			writer.pending = "";
			for (indexArray = 0; indexArray < (Math.floor((delta + array.length) / 3) * 3) - delta; indexArray++) {
				dataString += String.fromCharCode(array[indexArray]);
			}
			for (; indexArray < array.length; indexArray++) {
				writer.pending += String.fromCharCode(array[indexArray]);
			}
			if (dataString.length > 2) {
				writer.data += btoa(dataString);
			} else {
				writer.pending = dataString + writer.pending;
			}
		}

		getData() {
			return this.data + btoa(this.pending);
		}
	}

	class BlobReader extends Reader {

		constructor(blob) {
			super();
			Object.assign(this, {
				blob,
				size: blob.size
			});
		}

		async readUint8Array(offset, length) {
			const reader = this;
			const offsetEnd = offset + length;
			const blob = offset || offsetEnd < reader.size ? reader.blob.slice(offset, offsetEnd) : reader.blob;
			let arrayBuffer = await blob.arrayBuffer();
			if (arrayBuffer.byteLength > length) {
				arrayBuffer = arrayBuffer.slice(offset, offsetEnd);
			}
			return new Uint8Array(arrayBuffer);
		}
	}

	class BlobWriter extends Stream {

		constructor(contentType) {
			super();
			const writer = this;
			const transformStream = new TransformStream();
			const headers = [];
			if (contentType) {
				headers.push([HTTP_HEADER_CONTENT_TYPE, contentType]);
			}
			Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
				get() {
					return transformStream.writable;
				}
			});
			writer.blob = new Response(transformStream.readable, { headers }).blob();
			writer.blob.catch(() => { });
		}

		getData() {
			return this.blob;
		}
	}

	class TextReader extends BlobReader {

		constructor(text) {
			super(new Blob([text], { type: CONTENT_TYPE_TEXT_PLAIN }));
		}
	}

	class TextWriter extends BlobWriter {

		constructor(encoding) {
			super(encoding);
			Object.assign(this, {
				encoding,
				utf8: !encoding || encoding.toLowerCase() == "utf-8"
			});
		}

		async getData() {
			const {
				encoding,
				utf8
			} = this;
			const blob = await super.getData();
			if (blob.text && utf8) {
				return blob.text();
			} else {
				const reader = new FileReader();
				return new Promise((resolve, reject) => {
					Object.assign(reader, {
						onload: ({ target }) => resolve(target.result),
						onerror: () => reject(reader.error)
					});
					reader.readAsText(blob, encoding);
				});
			}
		}
	}

	class FetchReader extends Reader {

		constructor(url, options) {
			super();
			createHttpReader(this, url, options);
		}

		async init() {
			await initHttpReader(this, sendFetchRequest, getFetchRequestData);
			super.init();
		}

		readUint8Array(index, length) {
			return readUint8ArrayHttpReader(this, index, length, sendFetchRequest, getFetchRequestData);
		}
	}

	class XHRReader extends Reader {

		constructor(url, options) {
			super();
			createHttpReader(this, url, options);
		}

		async init() {
			await initHttpReader(this, sendXMLHttpRequest, getXMLHttpRequestData);
			super.init();
		}

		readUint8Array(index, length) {
			return readUint8ArrayHttpReader(this, index, length, sendXMLHttpRequest, getXMLHttpRequestData);
		}
	}

	function createHttpReader(httpReader, url, options) {
		const {
			preventHeadRequest,
			useRangeHeader,
			forceRangeRequests,
			combineSizeEocd,
			fetch
		} = options;
		options = Object.assign({}, options);
		delete options.preventHeadRequest;
		delete options.useRangeHeader;
		delete options.forceRangeRequests;
		delete options.combineSizeEocd;
		delete options.useXHR;
		delete options.fetch;
		Object.assign(httpReader, {
			url,
			options,
			preventHeadRequest,
			useRangeHeader,
			forceRangeRequests,
			combineSizeEocd,
			fetch
		});
	}

	async function initHttpReader(httpReader, sendRequest, getRequestData) {
		const {
			url,
			preventHeadRequest,
			useRangeHeader,
			forceRangeRequests,
			combineSizeEocd
		} = httpReader;
		if (isHttpFamily(url) && (useRangeHeader || forceRangeRequests) && (typeof preventHeadRequest == "undefined" || preventHeadRequest)) {
			const response = await sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, combineSizeEocd ? -END_OF_CENTRAL_DIR_LENGTH : undefined));
			const acceptRanges = response.headers.get(HTTP_HEADER_ACCEPT_RANGES);
			if (!forceRangeRequests && (!acceptRanges || acceptRanges.toLowerCase() != HTTP_RANGE_UNIT)) {
				throw new Error(ERR_HTTP_RANGE);
			} else {
				if (combineSizeEocd) {
					const eocdCache = new Uint8Array(await response.arrayBuffer());
					if (response.status == 206 && eocdCache.length == END_OF_CENTRAL_DIR_LENGTH) {
						httpReader.eocdCache = eocdCache;
					}
				}
				let contentSize;
				const contentRangeHeader = response.headers.get(HTTP_HEADER_CONTENT_RANGE);
				if (contentRangeHeader) {
					const splitHeader = contentRangeHeader.trim().split(/\s*\/\s*/);
					if (splitHeader.length) {
						const headerValue = splitHeader[1];
						if (headerValue && headerValue != "*") {
							contentSize = Number(headerValue);
						}
					}
				}
				if (contentSize === UNDEFINED_VALUE) {
					await getContentLength(httpReader, sendRequest, getRequestData);
				} else {
					httpReader.size = contentSize;
				}
			}
		} else {
			await getContentLength(httpReader, sendRequest, getRequestData);
		}
	}

	async function readUint8ArrayHttpReader(httpReader, index, length, sendRequest, getRequestData) {
		const {
			useRangeHeader,
			forceRangeRequests,
			eocdCache,
			size,
			options
		} = httpReader;
		if (useRangeHeader || forceRangeRequests) {
			if (eocdCache && index == size - END_OF_CENTRAL_DIR_LENGTH && length == END_OF_CENTRAL_DIR_LENGTH) {
				return eocdCache;
			}
			if (index >= size || length === 0) {
				return EMPTY_UINT8_ARRAY;
			} else {
				if (index + length > size) {
					length = size - index;
				}
				const response = await sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, index, length));
				if (response.status != 206) {
					throw new Error(ERR_HTTP_RANGE);
				}
				const contentRangeHeader = response.headers.get(HTTP_HEADER_CONTENT_RANGE);
				if (contentRangeHeader) {
					const rangeStart = Number(contentRangeHeader.trim().split(/[\s-]+/)[1]);
					if (!Number.isNaN(rangeStart) && rangeStart != index) {
						throw new Error(ERR_HTTP_RANGE);
					}
				}
				const data = new Uint8Array(await response.arrayBuffer());
				if (data.length != length) {
					throw new Error(ERR_HTTP_RANGE);
				}
				return data;
			}
		} else {
			const { data } = httpReader;
			if (!data) {
				await getRequestData(httpReader, options);
			}
			return new Uint8Array(httpReader.data.subarray(index, index + length));
		}
	}

	function getRangeHeaders(httpReader, index = 0, length = 1) {
		return Object.assign({}, getHeaders(httpReader), { [HTTP_HEADER_RANGE]: HTTP_RANGE_UNIT + "=" + (index < 0 ? index : index + "-" + (index + length - 1)) });
	}

	function getHeaders({ options }) {
		const { headers } = options;
		if (headers) {
			if (Symbol.iterator in headers) {
				return Object.fromEntries(headers);
			} else {
				return headers;
			}
		}
	}

	async function getFetchRequestData(httpReader) {
		await getRequestData(httpReader, sendFetchRequest);
	}

	async function getXMLHttpRequestData(httpReader) {
		await getRequestData(httpReader, sendXMLHttpRequest);
	}

	async function getRequestData(httpReader, sendRequest) {
		const response = await sendRequest(HTTP_METHOD_GET, httpReader, getHeaders(httpReader));
		httpReader.data = new Uint8Array(await response.arrayBuffer());
		httpReader.size = httpReader.data.length;
	}

	async function getContentLength(httpReader, sendRequest, getRequestData) {
		if (httpReader.preventHeadRequest) {
			await getRequestData(httpReader, httpReader.options);
		} else {
			const response = await sendRequest(HTTP_METHOD_HEAD, httpReader, getHeaders(httpReader));
			const contentLength = response.headers.get(HTTP_HEADER_CONTENT_LENGTH);
			if (contentLength && !response.headers.get(HTTP_HEADER_CONTENT_ENCODING)) {
				httpReader.size = Number(contentLength);
			} else {
				await getRequestData(httpReader, httpReader.options);
			}
		}
	}

	async function sendFetchRequest(method, { fetch: fetchFunction = fetch, options, url }, headers) {
		const response = await fetchFunction(url, Object.assign({}, options, { method, headers }));
		if (response.status < 400) {
			return response;
		} else {
			throw response.status == 416 ? new Error(ERR_HTTP_RANGE) : new Error(ERR_HTTP_STATUS + (response.statusText || response.status));
		}
	}

	function sendXMLHttpRequest(method, { url }, headers) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.addEventListener("load", () => {
				if (request.status < 400) {
					const headers = [];
					request.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(header => {
						const splitHeader = header.trim().split(/\s*:\s*/);
						splitHeader[0] = splitHeader[0].trim().replace(/^[a-z]|-[a-z]/g, value => value.toUpperCase());
						headers.push(splitHeader);
					});
					resolve({
						status: request.status,
						arrayBuffer: () => request.response,
						headers: new Map(headers)
					});
				} else {
					reject(request.status == 416 ? new Error(ERR_HTTP_RANGE) : new Error(ERR_HTTP_STATUS + (request.statusText || request.status)));
				}
			}, false);
			request.addEventListener("error", event => reject(event.detail ? event.detail.error : new Error("Network error")), false);
			request.open(method, url);
			if (headers) {
				for (const entry of Object.entries(headers)) {
					request.setRequestHeader(entry[0], entry[1]);
				}
			}
			request.responseType = "arraybuffer";
			request.send();
		});
	}

	class HttpReader extends Reader {

		constructor(url, options = {}) {
			super();
			Object.assign(this, {
				url,
				reader: options.useXHR && !options.fetch ? new XHRReader(url, options) : new FetchReader(url, options)
			});
		}

		set size(value) {
			// ignored
		}

		get size() {
			return this.reader.size;
		}

		async init() {
			await this.reader.init();
			super.init();
		}

		readUint8Array(index, length) {
			return this.reader.readUint8Array(index, length);
		}
	}

	class HttpRangeReader extends HttpReader {

		constructor(url, options = {}) {
			super(url, Object.assign({}, options, { useRangeHeader: true }));
		}
	}


	class Uint8ArrayReader extends Reader {

		constructor(array) {
			super();
			array = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
			Object.assign(this, {
				array,
				size: array.length
			});
		}

		readUint8Array(index, length) {
			return this.array.slice(index, index + length);
		}
	}

	class Uint8ArrayWriter extends Writer {

		constructor(defaultBufferSize) {
			super();
			this.defaultBufferSize = defaultBufferSize || DEFAULT_BUFFER_SIZE;
		}

		init(initSize = 0) {
			Object.assign(this, {
				offset: 0,
				array: new Uint8Array(initSize > 0 ? initSize : this.defaultBufferSize)
			});
			super.init();
		}

		writeUint8Array(array) {
			const writer = this;
			const requiredLength = writer.offset + array.length;
			if (requiredLength > writer.array.length) {
				let newLength = writer.array.length ? writer.array.length * 2 : writer.defaultBufferSize;
				while (newLength < requiredLength) {
					newLength *= 2;
				}
				const previousArray = writer.array;
				writer.array = new Uint8Array(newLength);
				writer.array.set(previousArray);
			}
			writer.array.set(array, writer.offset);
			writer.offset += array.length;
		}

		getData() {
			if (this.offset === this.array.length) {
				return this.array;
			} else {
				return this.array.slice(0, this.offset);
			}
		}
	}

	class SplitDataReader extends Reader {

		constructor(readers) {
			super();
			this.readers = readers;
		}

		async init() {
			const reader = this;
			const { readers } = reader;
			reader.lastDiskNumber = 0;
			reader.lastDiskOffset = 0;
			await Promise.all(readers.map(async (diskReader, indexDiskReader) => {
				await initStream(diskReader);
				if (indexDiskReader != readers.length - 1) {
					reader.lastDiskOffset += diskReader.size;
				}
				reader.size += diskReader.size;
			}));
			super.init();
		}

		async readUint8Array(offset, length, diskNumber = 0) {
			const reader = this;
			const { readers } = this;
			let result;
			let currentDiskNumber = diskNumber;
			if (currentDiskNumber == -1) {
				currentDiskNumber = readers.length - 1;
			}
			let currentReaderOffset = offset;
			while (readers[currentDiskNumber] && currentReaderOffset >= readers[currentDiskNumber].size) {
				currentReaderOffset -= readers[currentDiskNumber].size;
				currentDiskNumber++;
			}
			const currentReader = readers[currentDiskNumber];
			if (currentReader) {
				const currentReaderSize = currentReader.size;
				if (currentReaderOffset + length <= currentReaderSize) {
					result = await readUint8Array(currentReader, currentReaderOffset, length);
				} else {
					const chunkLength = currentReaderSize - currentReaderOffset;
					result = new Uint8Array(length);
					const firstPart = await readUint8Array(currentReader, currentReaderOffset, chunkLength);
					result.set(firstPart, 0);
					const secondPart = await reader.readUint8Array(offset + chunkLength, length - chunkLength, diskNumber);
					result.set(secondPart, chunkLength);
					if (firstPart.length + secondPart.length < length) {
						result = result.subarray(0, firstPart.length + secondPart.length);
					}
				}
			} else {
				result = EMPTY_UINT8_ARRAY;
			}
			reader.lastDiskNumber = Math.max(currentDiskNumber, reader.lastDiskNumber);
			return result;
		}
	}

	class SplitDataWriter extends Stream {

		constructor(writerGenerator, maxSize = 4294967295) {
			super();
			const writer = this;
			Object.assign(writer, {
				diskNumber: 0,
				diskOffset: 0,
				size: 0,
				maxSize,
				availableSize: maxSize
			});
			let diskSourceWriter, diskWritable, diskWriter;
			const writable = new WritableStream({
				async write(chunk) {
					const { availableSize } = writer;
					if (!diskWriter) {
						const { value, done } = await writerGenerator.next();
						if (done && !value) {
							throw new Error(ERR_ITERATOR_COMPLETED_TOO_SOON);
						} else {
							diskSourceWriter = value;
							diskSourceWriter.size = 0;
							if (diskSourceWriter.maxSize) {
								writer.maxSize = diskSourceWriter.maxSize;
							}
							writer.availableSize = writer.maxSize;
							await initStream(diskSourceWriter);
							diskWritable = value.writable;
							diskWriter = diskWritable.getWriter();
						}
						await this.write(chunk);
					} else if (chunk.length >= availableSize) {
						await writeChunk(chunk.subarray(0, availableSize));
						await closeDisk();
						writer.diskOffset += diskSourceWriter.size;
						writer.diskNumber++;
						diskWriter = null;
						writer.availableSize = writer.maxSize;
						if (chunk.length > availableSize) {
							await this.write(chunk.subarray(availableSize));
						}
					} else {
						await writeChunk(chunk);
					}
				},
				async close() {
					if (diskWriter) {
						await diskWriter.ready;
						await closeDisk();
					}
				},
				async abort(reason) {
					if (diskWriter) {
						await diskWriter.abort(reason);
					}
				}
			});
			Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
				get() {
					return writable;
				}
			});

			async function writeChunk(chunk) {
				const chunkLength = chunk.length;
				if (chunkLength) {
					await diskWriter.ready;
					await diskWriter.write(chunk);
					diskSourceWriter.size += chunkLength;
					writer.availableSize -= chunkLength;
				}
			}

			async function closeDisk() {
				await diskWriter.close();
			}
		}
	}

	class GenericReader {

		constructor(reader) {
			if (Array.isArray(reader)) {
				reader = new SplitDataReader(reader);
			}
			if (reader instanceof ReadableStream) {
				reader = {
					readable: reader
				};
			}
			return reader;
		}
	}

	class GenericWriter {

		constructor(writer) {
			if (writer.writable === UNDEFINED_VALUE && typeof writer.next == FUNCTION_TYPE) {
				writer = new SplitDataWriter(writer);
			}
			if (writer instanceof WritableStream) {
				writer = {
					writable: writer
				};
			}
			if (writer.size === UNDEFINED_VALUE) {
				writer.size = 0;
			}
			if (!(writer instanceof SplitDataWriter)) {
				Object.assign(writer, {
					diskNumber: 0,
					diskOffset: 0,
					availableSize: INFINITY_VALUE,
					maxSize: INFINITY_VALUE
				});
			}
			return writer;
		}
	}

	function isHttpFamily(url) {
		const { baseURI } = getConfiguration();
		const { protocol } = new URL(url, baseURI);
		return protocol == "http:" || protocol == "https:";
	}

	async function initStream(stream, initSize) {
		if (stream.init && !stream.initialized) {
			await stream.init(initSize);
		} else {
			return Promise.resolve();
		}
	}

	function readUint8Array(reader, offset, size, diskNumber) {
		return reader.readUint8Array(offset, size, diskNumber);
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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

	/* global TextDecoder */

	const CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
	const VALID_CP437 = CP437.length == 256;

	function decodeCP437(stringValue) {
		if (VALID_CP437) {
			let result = "";
			for (let indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) {
				result += CP437[stringValue[indexCharacter]];
			}
			return result;
		} else {
			return new TextDecoder().decode(stringValue);
		}
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	function decodeText(value, encoding) {
		if (encoding && encoding.trim().toLowerCase() == "cp437") {
			return decodeCP437(value);
		} else {
			return new TextDecoder(encoding, { ignoreBOM: true }).decode(value);
		}
	}

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

	const PROPERTY_NAME_FILENAME = "filename";
	const PROPERTY_NAME_RAW_FILENAME = "rawFilename";
	const PROPERTY_NAME_COMMENT = "comment";
	const PROPERTY_NAME_RAW_COMMENT = "rawComment";
	const PROPERTY_NAME_UNCOMPRESSED_SIZE = "uncompressedSize";
	const PROPERTY_NAME_COMPRESSED_SIZE = "compressedSize";
	const PROPERTY_NAME_OFFSET = "offset";
	const PROPERTY_NAME_DISK_NUMBER_START = "diskNumberStart";
	const PROPERTY_NAME_LAST_MODIFICATION_DATE = "lastModDate";
	const PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE = "rawLastModDate";
	const PROPERTY_NAME_LAST_ACCESS_DATE = "lastAccessDate";
	const PROPERTY_NAME_RAW_LAST_ACCESS_DATE = "rawLastAccessDate";
	const PROPERTY_NAME_CREATION_DATE = "creationDate";
	const PROPERTY_NAME_RAW_CREATION_DATE = "rawCreationDate";
	const PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTES = "internalFileAttributes";
	const PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTES = "externalFileAttributes";
	const PROPERTY_NAME_MSDOS_ATTRIBUTES_RAW = "msdosAttributesRaw";
	const PROPERTY_NAME_MSDOS_ATTRIBUTES = "msdosAttributes";
	const PROPERTY_NAME_MS_DOS_COMPATIBLE = "msDosCompatible";
	const PROPERTY_NAME_ZIP64 = "zip64";
	const PROPERTY_NAME_ENCRYPTED = "encrypted";
	const PROPERTY_NAME_VERSION = "version";
	const PROPERTY_NAME_VERSION_MADE_BY = "versionMadeBy";
	const PROPERTY_NAME_ZIPCRYPTO = "zipCrypto";
	const PROPERTY_NAME_DIRECTORY = "directory";
	const PROPERTY_NAME_EXECUTABLE = "executable";
	const PROPERTY_NAME_COMPRESSION_METHOD = "compressionMethod";
	const PROPERTY_NAME_SIGNATURE = "signature";
	const PROPERTY_NAME_EXTRA_FIELD = "extraField";
	const PROPERTY_NAME_EXTRA_FIELD_INFOZIP = "extraFieldInfoZip";
	const PROPERTY_NAME_EXTRA_FIELD_UNIX = "extraFieldUnix";
	const PROPERTY_NAME_UID = "uid";
	const PROPERTY_NAME_GID = "gid";
	const PROPERTY_NAME_UNIX_MODE = "unixMode";
	const PROPERTY_NAME_SETUID = "setuid";
	const PROPERTY_NAME_SETGID = "setgid";
	const PROPERTY_NAME_STICKY = "sticky";
	const PROPERTY_NAME_BITFLAG = "bitFlag";
	const PROPERTY_NAME_FILENAME_UTF8 = "filenameUTF8";
	const PROPERTY_NAME_COMMENT_UTF8 = "commentUTF8";
	const PROPERTY_NAME_RAW_EXTRA_FIELD = "rawExtraField";
	const PROPERTY_NAME_EXTRA_FIELD_ZIP64 = "extraFieldZip64";
	const PROPERTY_NAME_EXTRA_FIELD_UNICODE_PATH = "extraFieldUnicodePath";
	const PROPERTY_NAME_EXTRA_FIELD_UNICODE_COMMENT = "extraFieldUnicodeComment";
	const PROPERTY_NAME_EXTRA_FIELD_AES = "extraFieldAES";
	const PROPERTY_NAME_EXTRA_FIELD_NTFS = "extraFieldNTFS";
	const PROPERTY_NAME_EXTRA_FIELD_EXTENDED_TIMESTAMP = "extraFieldExtendedTimestamp";

	const PROPERTY_NAMES = [
		PROPERTY_NAME_FILENAME,
		PROPERTY_NAME_RAW_FILENAME,
		PROPERTY_NAME_UNCOMPRESSED_SIZE,
		PROPERTY_NAME_COMPRESSED_SIZE,
		PROPERTY_NAME_LAST_MODIFICATION_DATE,
		PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE,
		PROPERTY_NAME_COMMENT,
		PROPERTY_NAME_RAW_COMMENT,
		PROPERTY_NAME_LAST_ACCESS_DATE,
		PROPERTY_NAME_CREATION_DATE,
		PROPERTY_NAME_RAW_CREATION_DATE,
		PROPERTY_NAME_OFFSET,
		PROPERTY_NAME_DISK_NUMBER_START,
		PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTES,
		PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTES,
		PROPERTY_NAME_MSDOS_ATTRIBUTES_RAW,
		PROPERTY_NAME_MSDOS_ATTRIBUTES,
		PROPERTY_NAME_MS_DOS_COMPATIBLE,
		PROPERTY_NAME_ZIP64,
		PROPERTY_NAME_ENCRYPTED,
		PROPERTY_NAME_VERSION,
		PROPERTY_NAME_VERSION_MADE_BY,
		PROPERTY_NAME_ZIPCRYPTO,
		PROPERTY_NAME_DIRECTORY,
		PROPERTY_NAME_EXECUTABLE,
		PROPERTY_NAME_COMPRESSION_METHOD,
		PROPERTY_NAME_SIGNATURE,
		PROPERTY_NAME_EXTRA_FIELD,
		PROPERTY_NAME_EXTRA_FIELD_UNIX,
		PROPERTY_NAME_EXTRA_FIELD_INFOZIP,
		PROPERTY_NAME_UID,
		PROPERTY_NAME_GID,
		PROPERTY_NAME_UNIX_MODE,
		PROPERTY_NAME_SETUID,
		PROPERTY_NAME_SETGID,
		PROPERTY_NAME_STICKY,
		PROPERTY_NAME_BITFLAG,
		PROPERTY_NAME_FILENAME_UTF8,
		PROPERTY_NAME_COMMENT_UTF8,
		PROPERTY_NAME_RAW_EXTRA_FIELD,
		PROPERTY_NAME_EXTRA_FIELD_ZIP64,
		PROPERTY_NAME_EXTRA_FIELD_UNICODE_PATH,
		PROPERTY_NAME_EXTRA_FIELD_UNICODE_COMMENT,
		PROPERTY_NAME_EXTRA_FIELD_AES,
		PROPERTY_NAME_EXTRA_FIELD_NTFS,
		PROPERTY_NAME_EXTRA_FIELD_EXTENDED_TIMESTAMP
	];

	class Entry {

		constructor(data) {
			PROPERTY_NAMES.forEach(name => this[name] = data[name]);
		}

	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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

	const OPTION_FILENAME_ENCODING = "filenameEncoding";
	const OPTION_COMMENT_ENCODING = "commentEncoding";
	const OPTION_DECODE_TEXT = "decodeText";
	const OPTION_EXTRACT_PREPENDED_DATA = "extractPrependedData";
	const OPTION_EXTRACT_APPENDED_DATA = "extractAppendedData";
	const OPTION_PASSWORD = "password";
	const OPTION_RAW_PASSWORD = "rawPassword";
	const OPTION_PASS_THROUGH = "passThrough";
	const OPTION_SIGNAL = "signal";
	const OPTION_CHECK_PASSWORD_ONLY = "checkPasswordOnly";
	const OPTION_CHECK_OVERLAPPING_ENTRY_ONLY = "checkOverlappingEntryOnly";
	const OPTION_CHECK_OVERLAPPING_ENTRY = "checkOverlappingEntry";
	const OPTION_CHECK_AMBIGUITY = "checkAmbiguity";
	const OPTION_CHECK_SIGNATURE = "checkSignature";
	const OPTION_USE_WEB_WORKERS = "useWebWorkers";
	const OPTION_USE_COMPRESSION_STREAM = "useCompressionStream";
	const OPTION_TRANSFER_STREAMS = "transferStreams";
	const OPTION_PREVENT_CLOSE = "preventClose";
	const OPTION_ENCRYPTION_STRENGTH = "encryptionStrength";
	const OPTION_EXTENDED_TIMESTAMP = "extendedTimestamp";
	const OPTION_KEEP_ORDER = "keepOrder";
	const OPTION_LEVEL = "level";
	const OPTION_BUFFERED_WRITE = "bufferedWrite";
	const OPTION_CREATE_TEMP_STREAM = "createTempStream";
	const OPTION_DATA_DESCRIPTOR_SIGNATURE = "dataDescriptorSignature";
	const OPTION_USE_UNICODE_FILE_NAMES = "useUnicodeFileNames";
	const OPTION_DATA_DESCRIPTOR = "dataDescriptor";
	const OPTION_SUPPORT_ZIP64_SPLIT_FILE = "supportZip64SplitFile";
	const OPTION_ENCODE_TEXT = "encodeText";
	const OPTION_OFFSET = "offset";
	const OPTION_USDZ = "usdz";
	const OPTION_UNIX_EXTRA_FIELD_TYPE = "unixExtraFieldType";
	const OPTION_STRICTNESS = "strictness";
	const OPTION_MAX_APPENDED_DATA_SIZE = "maxAppendedDataSize";
	const STRICTNESS_STRICT = "strict";
	const STRICTNESS_BALANCED = "balanced";
	const STRICTNESS_TOLERANT = "tolerant";

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


	const ERR_BAD_FORMAT = "File format is not recognized";
	const ERR_EOCDR_NOT_FOUND = "End of central directory not found";
	const ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
	const ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
	const ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
	const ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
	const ERR_ENCRYPTED = "File contains encrypted entry";
	const ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
	const ERR_UNSUPPORTED_COMPRESSION$1 = "Compression method not supported";
	const ERR_SPLIT_ZIP_FILE = "Split zip file";
	const ERR_OVERLAPPING_ENTRY = "Overlapping entry found";
	const ERR_AMBIGUOUS_ARCHIVE = "Ambiguous archive";
	const CHARSET_UTF8 = "utf-8";
	const PROPERTY_NAME_UTF8_SUFFIX = "UTF8";
	const CHARSET_CP437 = "cp437";
	const BITFLAG_AMBIGUITY_MASK = BITFLAG_ENCRYPTED | BITFLAG_DATA_DESCRIPTOR | BITFLAG_LANG_ENCODING_FLAG;
	const ZIP64_PROPERTIES = [
		[PROPERTY_NAME_UNCOMPRESSED_SIZE, MAX_32_BITS],
		[PROPERTY_NAME_COMPRESSED_SIZE, MAX_32_BITS],
		[PROPERTY_NAME_OFFSET, MAX_32_BITS],
		[PROPERTY_NAME_DISK_NUMBER_START, MAX_16_BITS]
	];
	const ZIP64_EXTRACTION = {
		[MAX_16_BITS]: {
			getValue: getUint32,
			bytes: 4
		},
		[MAX_32_BITS]: {
			getValue: getBigUint64,
			bytes: 8
		}
	};

	class ZipReader {

		constructor(reader, options = {}) {
			Object.assign(this, {
				reader: new GenericReader(reader),
				options,
				config: getConfiguration(),
				readRanges: new Map()
			});
		}

		async* getEntriesGenerator(options = {}) {
			const zipReader = this;
			let { reader } = zipReader;
			const { config } = zipReader;
			await initStream(reader);
			if (reader.size === UNDEFINED_VALUE || !reader.readUint8Array) {
				reader = new BlobReader(await new Response(reader.readable).blob());
				await initStream(reader);
			}
			if (reader.size < END_OF_CENTRAL_DIR_LENGTH) {
				throw new Error(ERR_BAD_FORMAT);
			}
			const strictness = getStrictness(getOptionValue$1(zipReader, options, OPTION_STRICTNESS), getOptionValue$1(zipReader, options, OPTION_CHECK_AMBIGUITY));
			const checkAmbiguity = strictness == STRICTNESS_STRICT;
			const rejectAmbiguousEndOfDirectory = strictness != STRICTNESS_TOLERANT;
			const maxAppendedDataSize = getMaxAppendedDataSize(getOptionValue$1(zipReader, options, OPTION_MAX_APPENDED_DATA_SIZE), strictness);
			const { endOfDirectoryInfo, endOfDirectoryReachingEndCount } = await findEndOfCentralDirectory(reader, rejectAmbiguousEndOfDirectory, maxAppendedDataSize);
			if (!endOfDirectoryInfo) {
				const signatureArray = await readUint8Array(reader, 0, 4);
				const signatureView = getDataView$1(signatureArray);
				if (getUint32(signatureView) == SPLIT_ZIP_FILE_SIGNATURE) {
					throw new Error(ERR_SPLIT_ZIP_FILE);
				} else {
					throw new Error(ERR_EOCDR_NOT_FOUND);
				}
			}
			if (rejectAmbiguousEndOfDirectory && endOfDirectoryReachingEndCount > 1) {
				throwAmbiguousArchive("multiple end of central directory records");
			}
			const endOfDirectoryView = getDataView$1(endOfDirectoryInfo);
			let directoryDataLength = getUint32(endOfDirectoryView, 12);
			let directoryDataOffset = getUint32(endOfDirectoryView, 16);
			const commentOffset = endOfDirectoryInfo.offset;
			const commentLength = getUint16(endOfDirectoryView, 20);
			const appendedDataOffset = commentOffset + END_OF_CENTRAL_DIR_LENGTH + commentLength;
			if (reader.size - appendedDataOffset > maxAppendedDataSize) {
				throwAmbiguousArchive("appended data");
			}
			let lastDiskNumber = getUint16(endOfDirectoryView, 4);
			const expectedLastDiskNumber = reader.lastDiskNumber || 0;
			let diskNumber = getUint16(endOfDirectoryView, 6);
			let filesLength = getUint16(endOfDirectoryView, 10);
			let prependedDataLength = 0;
			let startOffset;
			let zip64EndOfDirectory;
			if (directoryDataOffset == MAX_32_BITS || directoryDataLength == MAX_32_BITS || filesLength == MAX_16_BITS || diskNumber == MAX_16_BITS) {
				const endOfDirectoryLocatorArray = endOfDirectoryInfo.offset >= ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH ?
					await readUint8Array(reader, endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH) :
					EMPTY_UINT8_ARRAY;
				const endOfDirectoryLocatorView = getDataView$1(endOfDirectoryLocatorArray);
				if (endOfDirectoryLocatorArray.length == ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH &&
					getUint32(endOfDirectoryLocatorView, 0) == ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE) {
					directoryDataOffset = getBigUint64(endOfDirectoryLocatorView, 8);
					let endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH, -1);
					let endOfDirectoryView = getDataView$1(endOfDirectoryArray);
					const expectedDirectoryDataOffset = endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH - ZIP64_END_OF_CENTRAL_DIR_LENGTH - (reader.lastDiskOffset || 0);
					if ((endOfDirectoryArray.length < ZIP64_END_OF_CENTRAL_DIR_LENGTH || getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE) &&
						directoryDataOffset != expectedDirectoryDataOffset && expectedDirectoryDataOffset >= 0) {
						const originalDirectoryDataOffset = directoryDataOffset;
						directoryDataOffset = expectedDirectoryDataOffset;
						if (directoryDataOffset > originalDirectoryDataOffset) {
							prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
						}
						endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH, -1);
						endOfDirectoryView = getDataView$1(endOfDirectoryArray);
					}
					if (endOfDirectoryArray.length < ZIP64_END_OF_CENTRAL_DIR_LENGTH || getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE) {
						throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);
					}
					zip64EndOfDirectory = true;
					if (lastDiskNumber == MAX_16_BITS) {
						lastDiskNumber = getUint32(endOfDirectoryView, 16);
					} else if (checkAmbiguity && lastDiskNumber != getUint32(endOfDirectoryView, 16)) {
						throwAmbiguousArchive("mismatched zip64 end of central directory record");
					}
					if (diskNumber == MAX_16_BITS) {
						diskNumber = getUint32(endOfDirectoryView, 20);
					} else if (checkAmbiguity && diskNumber != getUint32(endOfDirectoryView, 20)) {
						throwAmbiguousArchive("mismatched zip64 end of central directory record");
					}
					if (filesLength == MAX_16_BITS) {
						filesLength = getBigUint64(endOfDirectoryView, 32);
					} else if (checkAmbiguity && filesLength != getBigUint64(endOfDirectoryView, 32)) {
						throwAmbiguousArchive("mismatched zip64 end of central directory record");
					}
					if (directoryDataLength == MAX_32_BITS) {
						directoryDataLength = getBigUint64(endOfDirectoryView, 40);
					} else if (checkAmbiguity && directoryDataLength != getBigUint64(endOfDirectoryView, 40)) {
						throwAmbiguousArchive("mismatched zip64 end of central directory record");
					}
					directoryDataOffset = getBigUint64(endOfDirectoryView, 48) + prependedDataLength;
				}
			}
			const declaredDirectoryDataLength = directoryDataLength;
			const centralDirectoryEndOffset = endOfDirectoryInfo.offset -
				(zip64EndOfDirectory ? ZIP64_END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH : 0);
			if (directoryDataOffset >= reader.size) {
				prependedDataLength = reader.size - directoryDataOffset - directoryDataLength - END_OF_CENTRAL_DIR_LENGTH;
				directoryDataOffset = reader.size - directoryDataLength - END_OF_CENTRAL_DIR_LENGTH;
			}
			if (expectedLastDiskNumber != lastDiskNumber) {
				throw new Error(ERR_SPLIT_ZIP_FILE);
			}
			if (directoryDataOffset < 0) {
				throw new Error(ERR_BAD_FORMAT);
			}
			let offset = 0;
			let directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength, diskNumber);
			let directoryView = getDataView$1(directoryArray);
			if (directoryDataLength) {
				if (directoryArray.length < 4) {
					throw new Error(ERR_BAD_FORMAT);
				}
				const expectedDirectoryDataOffset = centralDirectoryEndOffset - directoryDataLength - (reader.lastDiskOffset || 0);
				if (directoryDataOffset != expectedDirectoryDataOffset && diskNumber == lastDiskNumber) {
					const storedPointsAtDirectory = getUint32(directoryView, offset) == CENTRAL_FILE_HEADER_SIGNATURE;
					let reconcile = !storedPointsAtDirectory;
					if (!reconcile && expectedDirectoryDataOffset >= 0 && expectedDirectoryDataOffset + 4 <= reader.size) {
						const expectedSignatureArray = await readUint8Array(reader, expectedDirectoryDataOffset, 4, diskNumber);
						reconcile = getUint32(getDataView$1(expectedSignatureArray), 0) == CENTRAL_FILE_HEADER_SIGNATURE;
					}
					if (reconcile) {
						const originalDirectoryDataOffset = directoryDataOffset;
						directoryDataOffset = expectedDirectoryDataOffset;
						if (directoryDataOffset > originalDirectoryDataOffset) {
							prependedDataLength += directoryDataOffset - originalDirectoryDataOffset;
						}
						directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength, diskNumber);
						directoryView = getDataView$1(directoryArray);
					}
				}
			}
			const expectedDirectoryDataLength = centralDirectoryEndOffset - directoryDataOffset - (reader.lastDiskOffset || 0);
			if (directoryDataLength != expectedDirectoryDataLength && expectedDirectoryDataLength >= 0 && diskNumber == lastDiskNumber) {
				directoryDataLength = expectedDirectoryDataLength;
				directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength, diskNumber);
				directoryView = getDataView$1(directoryArray);
			}
			if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
				throw new Error(ERR_BAD_FORMAT);
			}
			startOffset = directoryDataOffset;
			const filenameEncoding = getOptionValue$1(zipReader, options, OPTION_FILENAME_ENCODING);
			const commentEncoding = getOptionValue$1(zipReader, options, OPTION_COMMENT_ENCODING);
			const filenames = checkAmbiguity ? new Set() : UNDEFINED_VALUE;
			let duplicateFilename;
			for (let indexFile = 0; indexFile < filesLength; indexFile++) {
				const fileEntry = new ZipEntry(reader, config, zipReader.options);
				if (offset + CENTRAL_FILE_HEADER_LENGTH > directoryArray.length || getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE) {
					throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);
				}
				readCommonHeader(fileEntry, directoryView, offset + 6);
				const languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
				const filenameOffset = offset + CENTRAL_FILE_HEADER_LENGTH;
				const extraFieldOffset = filenameOffset + fileEntry.filenameLength;
				const commentOffset = extraFieldOffset + fileEntry.extraFieldLength;
				const versionMadeBy = getUint16(directoryView, offset + 4);
				const msDosCompatible = versionMadeBy >> 8 == 0;
				const unixCompatible = versionMadeBy >> 8 == 3;
				const rawFilename = directoryArray.subarray(filenameOffset, extraFieldOffset);
				const commentLength = getUint16(directoryView, offset + 32);
				const endOffset = commentOffset + commentLength;
				const rawComment = directoryArray.subarray(commentOffset, endOffset);
				const filenameUTF8 = languageEncodingFlag;
				const commentUTF8 = languageEncodingFlag;
				const externalFileAttributes = getUint32(directoryView, offset + 38);
				const msdosAttributesRaw = externalFileAttributes & MAX_8_BITS;
				const msdosAttributes = {
					readOnly: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_READONLY_MASK),
					hidden: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_HIDDEN_MASK),
					system: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_SYSTEM_MASK),
					directory: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_DIR_MASK),
					archive: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_ARCHIVE_MASK)
				};
				const offsetFileEntry = getUint32(directoryView, offset + 42);
				const decode = getOptionValue$1(zipReader, options, OPTION_DECODE_TEXT) || decodeText;
				const rawFilenameEncoding = filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437;
				const rawCommentEncoding = commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437;
				let filename = decode(rawFilename, rawFilenameEncoding);
				if (filename === UNDEFINED_VALUE) {
					filename = decodeText(rawFilename, rawFilenameEncoding);
				}
				let comment = decode(rawComment, rawCommentEncoding);
				if (comment === UNDEFINED_VALUE) {
					comment = decodeText(rawComment, rawCommentEncoding);
				}
				Object.assign(fileEntry, {
					index: indexFile,
					versionMadeBy,
					msDosCompatible,
					compressedSize: 0,
					uncompressedSize: 0,
					commentLength,
					offset: offsetFileEntry,
					diskNumberStart: getUint16(directoryView, offset + 34),
					internalFileAttributes: getUint16(directoryView, offset + 36),
					externalFileAttributes,
					msdosAttributesRaw,
					msdosAttributes,
					rawFilename,
					filenameUTF8,
					commentUTF8,
					rawExtraField: directoryArray.subarray(extraFieldOffset, commentOffset),
					rawComment,
					filename,
					comment
				});
				readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6);
				fileEntry.offset += prependedDataLength;
				startOffset = Math.min(fileEntry.offset, startOffset);
				if (checkAmbiguity) {
					if (filenames.has(fileEntry.filename)) {
						duplicateFilename = true;
					}
					filenames.add(fileEntry.filename);
				}
				const unixExternalUpper = (fileEntry.externalFileAttributes >> 16) & MAX_16_BITS;
				if (fileEntry.unixMode === UNDEFINED_VALUE && (unixExternalUpper & (FILE_ATTR_UNIX_DEFAULT_MASK | FILE_ATTR_UNIX_EXECUTABLE_MASK | FILE_ATTR_UNIX_TYPE_DIR)) != 0) {
					fileEntry.unixMode = unixExternalUpper;
				}
				const setuid = Boolean(fileEntry.unixMode & FILE_ATTR_UNIX_SETUID_MASK);
				const setgid = Boolean(fileEntry.unixMode & FILE_ATTR_UNIX_SETGID_MASK);
				const sticky = Boolean(fileEntry.unixMode & FILE_ATTR_UNIX_STICKY_MASK);
				const executable = (fileEntry.unixMode !== UNDEFINED_VALUE)
					? ((fileEntry.unixMode & FILE_ATTR_UNIX_EXECUTABLE_MASK) != 0)
					: (unixCompatible && ((unixExternalUpper & FILE_ATTR_UNIX_EXECUTABLE_MASK) != 0));
				const modeIsDir = fileEntry.unixMode !== UNDEFINED_VALUE && ((fileEntry.unixMode & FILE_ATTR_UNIX_TYPE_MASK) == FILE_ATTR_UNIX_TYPE_DIR);
				const upperIsDir = ((unixExternalUpper & FILE_ATTR_UNIX_TYPE_MASK) == FILE_ATTR_UNIX_TYPE_DIR);
				Object.assign(fileEntry, {
					setuid,
					setgid,
					sticky,
					unixExternalUpper,
					internalFileAttribute: fileEntry.internalFileAttributes,
					externalFileAttribute: fileEntry.externalFileAttributes,
					executable,
					directory: modeIsDir || upperIsDir || (msDosCompatible && msdosAttributes.directory) || (fileEntry.filename.endsWith(DIRECTORY_SIGNATURE) && !fileEntry.uncompressedSize),
					zipCrypto: fileEntry.encrypted && !fileEntry.extraFieldAES
				});
				const entry = new Entry(fileEntry);
				entry.getData = (writer, options) => fileEntry.getData(writer, entry, zipReader.readRanges, options);
				entry.arrayBuffer = async options => {
					const writer = new TransformStream();
					const [arrayBuffer] = await Promise.all([
						new Response(writer.readable).arrayBuffer(),
						fileEntry.getData(writer, entry, zipReader.readRanges, options)]);
					return arrayBuffer;
				};
				offset = endOffset;
				const { onprogress } = options;
				if (onprogress) {
					try {
						await onprogress(indexFile + 1, filesLength, new Entry(fileEntry));
					} catch {
						// ignored
					}
				}
				yield entry;
			}
			if (checkAmbiguity && offset != declaredDirectoryDataLength) {
				throwAmbiguousArchive("trailing central directory data");
			}
			if (duplicateFilename) {
				throwAmbiguousArchive("duplicate filename");
			}
			if (checkAmbiguity && (prependedDataLength || (filesLength && startOffset > 0))) {
				throwAmbiguousArchive("prepended data");
			}
			const extractPrependedData = getOptionValue$1(zipReader, options, OPTION_EXTRACT_PREPENDED_DATA);
			const extractAppendedData = getOptionValue$1(zipReader, options, OPTION_EXTRACT_APPENDED_DATA);
			if (extractPrependedData) {
				zipReader.prependedData = startOffset > 0 ? await readUint8Array(reader, 0, startOffset) : EMPTY_UINT8_ARRAY;
			}
			zipReader.comment = commentLength ? await readUint8Array(reader, commentOffset + END_OF_CENTRAL_DIR_LENGTH, commentLength) : EMPTY_UINT8_ARRAY;
			if (extractAppendedData) {
				zipReader.appendedData = appendedDataOffset < reader.size ? await readUint8Array(reader, appendedDataOffset, reader.size - appendedDataOffset) : EMPTY_UINT8_ARRAY;
			}
			return true;
		}

		async getEntries(options = {}) {
			const entries = [];
			for await (const entry of this.getEntriesGenerator(options)) {
				entries.push(entry);
			}
			return entries;
		}

		async close() {
		}
	}

	class ZipReaderStream {

		constructor(options = {}) {
			const { readable, writable } = new TransformStream();
			const gen = new ZipReader(readable, options).getEntriesGenerator();
			this.readable = new ReadableStream({
				async pull(controller) {
					const { done, value } = await gen.next();
					if (done)
						return controller.close();
					const chunk = {
						...value,
						readable: (function () {
							const { readable, writable } = new TransformStream();
							if (value.getData) {
								getData();
								return readable;
							}

							async function getData() {
								try {
									await value.getData(writable);
								} catch (error) {
									try {
										await writable.abort(error);
									} catch {
										// ignored
									}
								}
							}
						})()
					};
					delete chunk.getData;
					controller.enqueue(chunk);
				}
			});
			this.writable = writable;
		}
	}

	class ZipEntry {

		constructor(reader, config, options) {
			Object.assign(this, {
				reader,
				config,
				options
			});
		}

		async getData(writer, fileEntry, readRanges, options = {}) {
			const zipEntry = this;
			const {
				reader,
				index,
				offset,
				diskNumberStart,
				extraFieldAES,
				extraFieldZip64,
				compressionMethod,
				config,
				bitFlag,
				signature,
				rawLastModDate,
				uncompressedSize,
				compressedSize
			} = zipEntry;
			const {
				dataDescriptor
			} = bitFlag;
			const localDirectory = fileEntry.localDirectory = {};
			const dataArray = await readUint8Array(reader, offset, HEADER_SIZE, diskNumberStart);
			const dataView = getDataView$1(dataArray);
			let password = getOptionValue$1(zipEntry, options, OPTION_PASSWORD);
			let rawPassword = getOptionValue$1(zipEntry, options, OPTION_RAW_PASSWORD);
			const passThrough = getOptionValue$1(zipEntry, options, OPTION_PASS_THROUGH);
			password = password && password.length && password;
			rawPassword = rawPassword && rawPassword.length && rawPassword;
			if (extraFieldAES) {
				if (extraFieldAES.originalCompressionMethod != COMPRESSION_METHOD_AES) {
					throw new Error(ERR_UNSUPPORTED_COMPRESSION$1);
				}
			}
			if ((compressionMethod != COMPRESSION_METHOD_STORE && compressionMethod != COMPRESSION_METHOD_DEFLATE && compressionMethod != COMPRESSION_METHOD_DEFLATE_64) && !passThrough) {
				throw new Error(ERR_UNSUPPORTED_COMPRESSION$1);
			}
			if (dataArray.length < HEADER_SIZE || getUint32(dataView, 0) != LOCAL_FILE_HEADER_SIGNATURE) {
				throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
			}
			readCommonHeader(localDirectory, dataView, 4);
			const {
				extraFieldLength,
				filenameLength
			} = localDirectory;
			const checkAmbiguity = getStrictness(getOptionValue$1(zipEntry, options, OPTION_STRICTNESS), getOptionValue$1(zipEntry, options, OPTION_CHECK_AMBIGUITY)) == STRICTNESS_STRICT;
			let rawLocalFilename = EMPTY_UINT8_ARRAY;
			if (checkAmbiguity && (filenameLength || extraFieldLength)) {
				const trailingDataArray = await readUint8Array(reader, offset + HEADER_SIZE, filenameLength + extraFieldLength, diskNumberStart);
				rawLocalFilename = trailingDataArray.subarray(0, filenameLength);
				localDirectory.rawExtraField = trailingDataArray.subarray(filenameLength);
			} else {
				localDirectory.rawExtraField = extraFieldLength ?
					await readUint8Array(reader, offset + HEADER_SIZE + filenameLength, extraFieldLength, diskNumberStart) :
					EMPTY_UINT8_ARRAY;
			}
			readCommonFooter(zipEntry, localDirectory, dataView, 4, true);
			if (checkAmbiguity) {
				checkLocalDirectory(zipEntry, localDirectory, rawLocalFilename);
			}
			const { lastAccessDate, creationDate } = localDirectory;
			if (lastAccessDate) {
				fileEntry.lastAccessDate = lastAccessDate;
			}
			if (creationDate) {
				fileEntry.creationDate = creationDate;
			}
			const encrypted = zipEntry.encrypted && localDirectory.encrypted && !passThrough;
			const zipCrypto = encrypted && !extraFieldAES;
			if (!passThrough) {
				fileEntry.zipCrypto = zipCrypto;
			}
			if (encrypted) {
				if (!zipCrypto && extraFieldAES.strength === UNDEFINED_VALUE) {
					throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
				} else if (!password && !rawPassword) {
					throw new Error(ERR_ENCRYPTED);
				}
			}
			const dataOffset = offset + HEADER_SIZE + filenameLength + extraFieldLength;
			const size = compressedSize;
			const readable = reader.createReadable({ offset: dataOffset, size, diskNumberStart, chunkSize: getChunkSize(config) });
			const signal = getOptionValue$1(zipEntry, options, OPTION_SIGNAL);
			const checkPasswordOnly = getOptionValue$1(zipEntry, options, OPTION_CHECK_PASSWORD_ONLY);
			let checkOverlappingEntry = getOptionValue$1(zipEntry, options, OPTION_CHECK_OVERLAPPING_ENTRY);
			const checkOverlappingEntryOnly = getOptionValue$1(zipEntry, options, OPTION_CHECK_OVERLAPPING_ENTRY_ONLY);
			if (checkOverlappingEntryOnly) {
				checkOverlappingEntry = true;
			}
			const { onstart, onprogress, onend } = options;
			const deflate64 = compressionMethod == COMPRESSION_METHOD_DEFLATE_64;
			let useCompressionStream = getOptionValue$1(zipEntry, options, OPTION_USE_COMPRESSION_STREAM);
			if (deflate64) {
				useCompressionStream = false;
			}
			const workerOptions = {
				options: {
					codecType: CODEC_INFLATE,
					password,
					rawPassword,
					zipCrypto,
					encryptionStrength: extraFieldAES && extraFieldAES.strength,
					signed: getOptionValue$1(zipEntry, options, OPTION_CHECK_SIGNATURE) && !passThrough,
					passwordVerification: zipCrypto && (dataDescriptor ? ((rawLastModDate >>> 8) & MAX_8_BITS) : ((signature >>> 24) & MAX_8_BITS)),
					outputSize: passThrough ? compressedSize : uncompressedSize,
					signature,
					compressed: compressionMethod != 0 && !passThrough,
					encrypted,
					useWebWorkers: getOptionValue$1(zipEntry, options, OPTION_USE_WEB_WORKERS),
					useCompressionStream,
					transferStreams: getOptionValue$1(zipEntry, options, OPTION_TRANSFER_STREAMS),
					deflate64,
					checkPasswordOnly
				},
				config,
				streamOptions: { signal, size, onstart, onprogress, onend }
			};
			if (checkOverlappingEntry) {
				await detectOverlappingEntry({
					reader,
					fileEntry,
					index,
					offset,
					diskNumberStart,
					signature,
					compressedSize,
					uncompressedSize,
					dataOffset,
					dataDescriptor: dataDescriptor || localDirectory.bitFlag.dataDescriptor,
					extraFieldZip64: extraFieldZip64 || localDirectory.extraFieldZip64,
					readRanges
				});
			}
			let writable;
			try {
				if (!checkOverlappingEntryOnly) {
					if (checkPasswordOnly) {
						writer = new WritableStream();
					}
					writer = new GenericWriter(writer);
					await initStream(writer, passThrough ? compressedSize : uncompressedSize);
					({ writable } = writer);
					const { outputSize } = await runWorker({ readable, writable }, workerOptions);
					writer.size += outputSize;
					if (outputSize != (passThrough ? compressedSize : uncompressedSize)) {
						throw new Error(ERR_INVALID_UNCOMPRESSED_SIZE);
					}
				}
			} catch (error) {
				if (error.outputSize !== UNDEFINED_VALUE) {
					writer.size += error.outputSize;
				}
				if (!checkPasswordOnly || error.message != ERR_ABORT_CHECK_PASSWORD) {
					throw error;
				}
			} finally {
				const preventClose = getOptionValue$1(zipEntry, options, OPTION_PREVENT_CLOSE);
				if (!preventClose && writable && !writable.locked) {
					await writable.getWriter().close();
				}
			}
			return checkPasswordOnly || checkOverlappingEntryOnly ? UNDEFINED_VALUE : writer.getData ? writer.getData() : writable;
		}
	}

	function readCommonHeader(directory, dataView, offset) {
		const rawBitFlag = directory.rawBitFlag = getUint16(dataView, offset + 2);
		const encrypted = (rawBitFlag & BITFLAG_ENCRYPTED) == BITFLAG_ENCRYPTED;
		const rawLastModDate = getUint32(dataView, offset + 6);
		Object.assign(directory, {
			encrypted,
			version: getUint16(dataView, offset),
			bitFlag: {
				level: (rawBitFlag & BITFLAG_LEVEL) >> 1,
				dataDescriptor: (rawBitFlag & BITFLAG_DATA_DESCRIPTOR) == BITFLAG_DATA_DESCRIPTOR,
				languageEncodingFlag: (rawBitFlag & BITFLAG_LANG_ENCODING_FLAG) == BITFLAG_LANG_ENCODING_FLAG
			},
			rawLastModDate,
			lastModDate: getDate(rawLastModDate),
			filenameLength: getUint16(dataView, offset + 22),
			extraFieldLength: getUint16(dataView, offset + 24)
		});
	}

	function readCommonFooter(fileEntry, directory, dataView, offset, localDirectory) {
		const { rawExtraField } = directory;
		const extraField = directory.extraField = new Map();
		const rawExtraFieldView = getDataView$1(new Uint8Array(rawExtraField));
		let offsetExtraField = 0;
		try {
			while (offsetExtraField < rawExtraField.length) {
				const type = getUint16(rawExtraFieldView, offsetExtraField);
				const size = getUint16(rawExtraFieldView, offsetExtraField + 2);
				extraField.set(type, {
					type,
					data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
				});
				offsetExtraField += 4 + size;
			}
		} catch {
			// ignored
		}
		const compressionMethod = getUint16(dataView, offset + 4);
		Object.assign(directory, {
			signature: getUint32(dataView, offset + HEADER_OFFSET_SIGNATURE),
			compressedSize: getUint32(dataView, offset + HEADER_OFFSET_COMPRESSED_SIZE),
			uncompressedSize: getUint32(dataView, offset + HEADER_OFFSET_UNCOMPRESSED_SIZE)
		});
		const extraFieldZip64 = extraField.get(EXTRAFIELD_TYPE_ZIP64);
		if (extraFieldZip64) {
			readExtraFieldZip64(extraFieldZip64, directory);
			directory.extraFieldZip64 = extraFieldZip64;
		}
		const extraFieldUnicodePath = extraField.get(EXTRAFIELD_TYPE_UNICODE_PATH);
		if (extraFieldUnicodePath) {
			readExtraFieldUnicode(extraFieldUnicodePath, PROPERTY_NAME_FILENAME, PROPERTY_NAME_RAW_FILENAME, directory, fileEntry);
			directory.extraFieldUnicodePath = extraFieldUnicodePath;
		}
		const extraFieldUnicodeComment = extraField.get(EXTRAFIELD_TYPE_UNICODE_COMMENT);
		if (extraFieldUnicodeComment) {
			readExtraFieldUnicode(extraFieldUnicodeComment, PROPERTY_NAME_COMMENT, PROPERTY_NAME_RAW_COMMENT, directory, fileEntry);
			directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
		}
		const extraFieldAES = extraField.get(EXTRAFIELD_TYPE_AES);
		if (extraFieldAES && extraFieldAES.data.length >= 7) {
			readExtraFieldAES(extraFieldAES, directory, compressionMethod);
			directory.extraFieldAES = extraFieldAES;
		} else {
			directory.compressionMethod = compressionMethod;
		}
		const extraFieldNTFS = extraField.get(EXTRAFIELD_TYPE_NTFS);
		if (extraFieldNTFS) {
			readExtraFieldNTFS(extraFieldNTFS, directory);
			directory.extraFieldNTFS = extraFieldNTFS;
		}
		const extraFieldUnix = extraField.get(EXTRAFIELD_TYPE_UNIX);
		if (extraFieldUnix) {
			readExtraFieldUnix(extraFieldUnix, directory, false);
			directory.extraFieldUnix = extraFieldUnix;
		} else {
			const extraFieldInfoZip = extraField.get(EXTRAFIELD_TYPE_INFOZIP);
			if (extraFieldInfoZip) {
				readExtraFieldUnix(extraFieldInfoZip, directory, true);
				directory.extraFieldInfoZip = extraFieldInfoZip;
			}
		}
		const extraFieldExtendedTimestamp = extraField.get(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
		if (extraFieldExtendedTimestamp) {
			readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory, localDirectory);
			directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
		}
		const extraFieldUSDZ = extraField.get(EXTRAFIELD_TYPE_USDZ);
		if (extraFieldUSDZ) {
			directory.extraFieldUSDZ = extraFieldUSDZ;
		}
	}

	function readExtraFieldZip64(extraFieldZip64, directory) {
		directory.zip64 = true;
		const extraFieldView = getDataView$1(extraFieldZip64.data);
		const missingProperties = ZIP64_PROPERTIES.filter(([propertyName, max]) => directory[propertyName] == max);
		const requiredLength = missingProperties.reduce((length, [, max]) => length + ZIP64_EXTRACTION[max].bytes, 0);
		if (extraFieldZip64.data.length < requiredLength) {
			throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
		}
		for (let indexMissingProperty = 0, offset = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
			const [propertyName, max] = missingProperties[indexMissingProperty];
			const extraction = ZIP64_EXTRACTION[max];
			directory[propertyName] = extraFieldZip64[propertyName] = extraction.getValue(extraFieldView, offset);
			offset += extraction.bytes;
		}
	}

	function readExtraFieldUnicode(extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
		if (extraFieldUnicode.data.length < 5) {
			extraFieldUnicode.valid = false;
			return;
		}
		const extraFieldView = getDataView$1(extraFieldUnicode.data);
		const crc32 = new Crc32();
		crc32.append(fileEntry[rawPropertyName]);
		const dataViewSignature = getDataView$1(new Uint8Array(4));
		dataViewSignature.setUint32(0, crc32.get(), true);
		const signature = getUint32(extraFieldView, 1);
		Object.assign(extraFieldUnicode, {
			version: getUint8(extraFieldView, 0),
			[propertyName]: decodeText(extraFieldUnicode.data.subarray(5)),
			valid: !fileEntry.bitFlag.languageEncodingFlag && signature == getUint32(dataViewSignature, 0)
		});
		if (extraFieldUnicode.valid) {
			directory[propertyName] = extraFieldUnicode[propertyName];
			directory[propertyName + PROPERTY_NAME_UTF8_SUFFIX] = true;
		}
	}

	function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
		const extraFieldView = getDataView$1(extraFieldAES.data);
		const strength = getUint8(extraFieldView, 4);
		Object.assign(extraFieldAES, {
			vendorVersion: getUint8(extraFieldView, 0),
			vendorId: getUint8(extraFieldView, 2),
			strength,
			originalCompressionMethod: compressionMethod,
			compressionMethod: getUint16(extraFieldView, 5)
		});
		directory.compressionMethod = extraFieldAES.compressionMethod;
	}

	function readExtraFieldNTFS(extraFieldNTFS, directory) {
		const extraFieldView = getDataView$1(extraFieldNTFS.data);
		let offsetExtraField = 4;
		let tag1Data;
		try {
			while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
				const tagValue = getUint16(extraFieldView, offsetExtraField);
				const attributeSize = getUint16(extraFieldView, offsetExtraField + 2);
				if (tagValue == EXTRAFIELD_TYPE_NTFS_TAG1) {
					tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
				}
				offsetExtraField += 4 + attributeSize;
			}
		} catch {
			// ignored
		}
		try {
			if (tag1Data && tag1Data.length == 24) {
				const tag1View = getDataView$1(tag1Data);
				const rawLastModDate = tag1View.getBigUint64(0, true);
				const rawLastAccessDate = tag1View.getBigUint64(8, true);
				const rawCreationDate = tag1View.getBigUint64(16, true);
				Object.assign(extraFieldNTFS, {
					rawLastModDate,
					rawLastAccessDate,
					rawCreationDate
				});
				const lastModDate = getDateNTFS(rawLastModDate);
				const lastAccessDate = getDateNTFS(rawLastAccessDate);
				const creationDate = getDateNTFS(rawCreationDate);
				const extraFieldData = { lastModDate, lastAccessDate, creationDate };
				Object.assign(extraFieldNTFS, extraFieldData);
				Object.assign(directory, extraFieldData);
			}
		} catch {
			// ignored
		}
	}

	function readExtraFieldUnix(extraField, directory, isInfoZip) {
		try {
			const view = getDataView$1(new Uint8Array(extraField.data));
			let uid, gid;
			if (isInfoZip) {
				let offset = 0;
				const version = getUint8(view, offset++);
				const uidSize = getUint8(view, offset++);
				uid = unpackUnixId(extraField.data.subarray(offset, offset + uidSize));
				offset += uidSize;
				const gidSize = getUint8(view, offset++);
				gid = unpackUnixId(extraField.data.subarray(offset, offset + gidSize));
				Object.assign(extraField, { version, uid, gid });
			} else if (extraField.data.length >= 4) {
				uid = getUint16(view, 0);
				gid = getUint16(view, 2);
				Object.assign(extraField, { uid, gid });
			}
			if (uid !== UNDEFINED_VALUE) {
				directory.uid = uid;
			}
			if (gid !== UNDEFINED_VALUE) {
				directory.gid = gid;
			}
		} catch {
			// ignored
		}
	}

	function unpackUnixId(bytes) {
		const buffer = new Uint8Array(4);
		buffer.set(bytes, 0);
		const view = new DataView(buffer.buffer, buffer.byteOffset, 4);
		return view.getUint32(0, true);
	}

	function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory, localDirectory) {
		if (!extraFieldExtendedTimestamp.data.length) {
			return;
		}
		const extraFieldView = getDataView$1(extraFieldExtendedTimestamp.data);
		const flags = getUint8(extraFieldView, 0);
		const timeProperties = [];
		const timeRawProperties = [];
		if (localDirectory) {
			if ((flags & 0x1) == 0x1) {
				timeProperties.push(PROPERTY_NAME_LAST_MODIFICATION_DATE);
				timeRawProperties.push(PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE);
			}
			if ((flags & 0x2) == 0x2) {
				timeProperties.push(PROPERTY_NAME_LAST_ACCESS_DATE);
				timeRawProperties.push(PROPERTY_NAME_RAW_LAST_ACCESS_DATE);
			}
			if ((flags & 0x4) == 0x4) {
				timeProperties.push(PROPERTY_NAME_CREATION_DATE);
				timeRawProperties.push(PROPERTY_NAME_RAW_CREATION_DATE);
			}
		} else if (extraFieldExtendedTimestamp.data.length >= 5) {
			timeProperties.push(PROPERTY_NAME_LAST_MODIFICATION_DATE);
			timeRawProperties.push(PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE);
		}
		let offset = 1;
		timeProperties.forEach((propertyName, indexProperty) => {
			if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
				const time = getUint32(extraFieldView, offset);
				directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = new Date((time | 0) * 1000);
				const rawPropertyName = timeRawProperties[indexProperty];
				extraFieldExtendedTimestamp[rawPropertyName] = time;
			}
			offset += 4;
		});
	}

	async function detectOverlappingEntry({
		reader,
		fileEntry,
		index,
		offset,
		diskNumberStart,
		signature,
		compressedSize,
		uncompressedSize,
		dataOffset,
		dataDescriptor,
		extraFieldZip64,
		readRanges
	}) {
		let diskOffset = 0;
		if (diskNumberStart && reader.readers) {
			for (let indexReader = 0; indexReader < Math.min(diskNumberStart, reader.readers.length); indexReader++) {
				diskOffset += reader.readers[indexReader].size;
			}
		}
		let dataDescriptorLength = 0;
		if (dataDescriptor) {
			if (extraFieldZip64) {
				dataDescriptorLength = DATA_DESCRIPTOR_RECORD_ZIP_64_LENGTH;
			} else {
				dataDescriptorLength = DATA_DESCRIPTOR_RECORD_LENGTH;
			}
		}
		if (dataDescriptorLength) {
			const dataDescriptorArray = await readUint8Array(reader, dataOffset + compressedSize, dataDescriptorLength + DATA_DESCRIPTOR_RECORD_SIGNATURE_LENGTH, diskNumberStart);
			const dataDescriptorSignature = dataDescriptorArray.length == dataDescriptorLength + DATA_DESCRIPTOR_RECORD_SIGNATURE_LENGTH &&
				getUint32(getDataView$1(dataDescriptorArray), 0) == DATA_DESCRIPTOR_RECORD_SIGNATURE;
			if (dataDescriptorSignature) {
				const readSignature = getUint32(getDataView$1(dataDescriptorArray), 4);
				let readCompressedSize;
				let readUncompressedSize;
				if (extraFieldZip64) {
					readCompressedSize = getBigUint64(getDataView$1(dataDescriptorArray), 8);
					readUncompressedSize = getBigUint64(getDataView$1(dataDescriptorArray), 16);
				} else {
					readCompressedSize = getUint32(getDataView$1(dataDescriptorArray), 8);
					readUncompressedSize = getUint32(getDataView$1(dataDescriptorArray), 12);
				}
				const matchSignature = (fileEntry.encrypted && !fileEntry.zipCrypto) || readSignature == signature;
				if (matchSignature &&
					readCompressedSize == compressedSize &&
					readUncompressedSize == uncompressedSize) {
					dataDescriptorLength += DATA_DESCRIPTOR_RECORD_SIGNATURE_LENGTH;
				}
			}
		}
		const range = {
			start: diskOffset + offset,
			end: diskOffset + dataOffset + compressedSize + dataDescriptorLength,
			fileEntry
		};
		for (const [otherIndex, otherRange] of readRanges) {
			if (otherIndex != index && range.start < otherRange.end && otherRange.start < range.end) {
				const error = new Error(ERR_OVERLAPPING_ENTRY);
				error.overlappingEntry = otherRange.fileEntry;
				throw error;
			}
		}
		readRanges.set(index, range);
	}

	function getStrictness(strictness, checkAmbiguity) {
		if (strictness === UNDEFINED_VALUE) {
			return checkAmbiguity ? STRICTNESS_STRICT : STRICTNESS_BALANCED;
		}
		return strictness;
	}

	function getMaxAppendedDataSize(maxAppendedDataSize, strictness) {
		if (maxAppendedDataSize !== UNDEFINED_VALUE) {
			return maxAppendedDataSize;
		}
		if (strictness == STRICTNESS_STRICT) {
			return 0;
		}
		if (strictness == STRICTNESS_TOLERANT) {
			return Infinity;
		}
		return MAX_16_BITS;
	}

	const MAX_END_OF_CENTRAL_DIR_PROBES = 64;

	const CENTRAL_DIRECTORY_UNREACHABLE = 0;
	const CENTRAL_DIRECTORY_PLAUSIBLE = 1;
	const CENTRAL_DIRECTORY_REACHABLE = 2;

	async function findEndOfCentralDirectory(reader, rejectAmbiguous, maxAppendedDataSize) {
		const { size } = reader;
		const anchoredLength = Math.min(size, END_OF_CENTRAL_DIR_LENGTH + MAX_16_BITS);
		const remoteProbeBudget = { count: MAX_END_OF_CENTRAL_DIR_PROBES };
		let endOfDirectoryInfo;
		let plausibleEndOfDirectoryInfo;
		let endOfDirectoryReachingEndCount = 0;
		for await (const [anchoredView, anchoredOffset, anchoredArray, indexByte, offset] of scanEndOfCentralDirectory(reader, anchoredLength)) {
			const commentLength = getUint16(anchoredView, indexByte + 20);
			if (offset + END_OF_CENTRAL_DIR_LENGTH + commentLength == size) {
				const reachability = await getCentralDirectoryReachability(reader, anchoredView, anchoredOffset, indexByte, offset, size, remoteProbeBudget);
				if (reachability == CENTRAL_DIRECTORY_REACHABLE) {
					if (!endOfDirectoryInfo) {
						endOfDirectoryInfo = getEndOfCentralDirectoryInfo(anchoredArray, indexByte, offset);
					}
					endOfDirectoryReachingEndCount++;
					if (!rejectAmbiguous || endOfDirectoryReachingEndCount > 1) {
						break;
					}
				} else if (reachability == CENTRAL_DIRECTORY_PLAUSIBLE && !plausibleEndOfDirectoryInfo) {
					plausibleEndOfDirectoryInfo = getEndOfCentralDirectoryInfo(anchoredArray, indexByte, offset);
				}
			}
		}
		if (!endOfDirectoryInfo) {
			endOfDirectoryInfo = plausibleEndOfDirectoryInfo;
		}
		if (!endOfDirectoryInfo) {
			endOfDirectoryInfo = await seekEndOfCentralDirectory(reader, maxAppendedDataSize, remoteProbeBudget);
		}
		return { endOfDirectoryInfo, endOfDirectoryReachingEndCount };
	}

	async function seekEndOfCentralDirectory(reader, maxAppendedDataSize, remoteProbeBudget) {
		const { size } = reader;
		const searchLength = Math.min(size, maxAppendedDataSize == Infinity ? size :
			END_OF_CENTRAL_DIR_LENGTH + MAX_16_BITS + maxAppendedDataSize);
		let firstSignatureInfo, plausibleInfo;
		for await (const [searchView, searchOffset, searchArray, indexByte, offset] of scanEndOfCentralDirectory(reader, searchLength)) {
			const record = getEndOfCentralDirectoryInfo(searchArray, indexByte, offset);
			if (!firstSignatureInfo) {
				firstSignatureInfo = record;
			}
			const reachability = await getCentralDirectoryReachability(reader, searchView, searchOffset, indexByte, offset, size, remoteProbeBudget);
			if (reachability == CENTRAL_DIRECTORY_REACHABLE) {
				return record;
			}
			if (reachability == CENTRAL_DIRECTORY_PLAUSIBLE && !plausibleInfo) {
				plausibleInfo = record;
			}
		}
		return plausibleInfo || firstSignatureInfo;
	}

	async function* scanEndOfCentralDirectory(reader, scanLength) {
		const scanOffset = reader.size - scanLength;
		const scanArray = await readUint8Array(reader, scanOffset, scanLength);
		const scanView = getDataView$1(scanArray);
		for (let indexByte = scanArray.length - END_OF_CENTRAL_DIR_LENGTH; indexByte >= 0; indexByte--) {
			if (getUint32(scanView, indexByte) == END_OF_CENTRAL_DIR_SIGNATURE) {
				yield [scanView, scanOffset, scanArray, indexByte, scanOffset + indexByte];
			}
		}
	}

	function getEndOfCentralDirectoryInfo(scanArray, indexByte, offset) {
		return { offset, buffer: scanArray.slice(indexByte, indexByte + END_OF_CENTRAL_DIR_LENGTH).buffer };
	}

	async function getCentralDirectoryReachability(reader, view, anchoredOffset, indexByte, offset, size, remoteProbeBudget) {
		const filesLength = getUint16(view, indexByte + 10);
		const directoryDataLength = getUint32(view, indexByte + 12);
		const directoryDataOffset = getUint32(view, indexByte + 16);
		if (filesLength == MAX_16_BITS || directoryDataLength == MAX_32_BITS || directoryDataOffset == MAX_32_BITS) {
			const locatorSignature = await readSignature(reader, view, anchoredOffset, offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, size, remoteProbeBudget);
			return locatorSignature == ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE ? CENTRAL_DIRECTORY_REACHABLE : CENTRAL_DIRECTORY_UNREACHABLE;
		}
		if (!filesLength && !directoryDataLength) {
			return CENTRAL_DIRECTORY_PLAUSIBLE;
		}
		for (const centralDirectoryOffset of [offset - directoryDataLength, directoryDataOffset]) {
			if (await readSignature(reader, view, anchoredOffset, centralDirectoryOffset, size, remoteProbeBudget) == CENTRAL_FILE_HEADER_SIGNATURE) {
				return CENTRAL_DIRECTORY_REACHABLE;
			}
		}
		return CENTRAL_DIRECTORY_UNREACHABLE;
	}

	async function readSignature(reader, view, anchoredOffset, signatureOffset, size, remoteProbeBudget) {
		if (signatureOffset < 0 || signatureOffset + 4 > size) {
			return UNDEFINED_VALUE;
		}
		if (signatureOffset >= anchoredOffset) {
			return getUint32(view, signatureOffset - anchoredOffset);
		}
		if (remoteProbeBudget.count > 0) {
			remoteProbeBudget.count--;
			const signatureArray = await readUint8Array(reader, signatureOffset, 4);
			return getUint32(getDataView$1(signatureArray), 0);
		}
		return UNDEFINED_VALUE;
	}

	function checkLocalDirectory(zipEntry, localDirectory, rawLocalFilename) {
		const { rawFilename } = zipEntry;
		if (rawLocalFilename.length != rawFilename.length ||
			rawLocalFilename.some((byteValue, indexByte) => byteValue != rawFilename[indexByte])) {
			throwAmbiguousArchive("mismatched local file header (filename)");
		}
		if ((localDirectory.rawBitFlag & BITFLAG_AMBIGUITY_MASK) != (zipEntry.rawBitFlag & BITFLAG_AMBIGUITY_MASK)) {
			throwAmbiguousArchive("mismatched local file header (general purpose bit flag)");
		}
		if (localDirectory.compressionMethod != zipEntry.compressionMethod) {
			throwAmbiguousArchive("mismatched local file header (compression method)");
		}
		if (!localDirectory.bitFlag.dataDescriptor &&
			(localDirectory.signature || localDirectory.compressedSize || localDirectory.uncompressedSize) &&
			(localDirectory.signature != zipEntry.signature ||
				localDirectory.compressedSize != zipEntry.compressedSize ||
				localDirectory.uncompressedSize != zipEntry.uncompressedSize)) {
			throwAmbiguousArchive("mismatched local file header (signature or sizes)");
		}
	}

	function throwAmbiguousArchive(reason) {
		const error = new Error(ERR_AMBIGUOUS_ARCHIVE);
		error.reason = reason;
		throw error;
	}

	function getOptionValue$1(zipReader, options, name) {
		return options[name] === UNDEFINED_VALUE ? zipReader.options[name] : options[name];
	}

	function getDate(timeRaw) {
		const date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & MAX_16_BITS;
		try {
			return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
		} catch {
			// ignored
		}
	}

	function getDateNTFS(timeRaw) {
		return new Date((Number((timeRaw / BigInt(10000)) - BigInt(11644473600000))));
	}

	function getUint8(view, offset) {
		return view.getUint8(offset);
	}

	function getUint16(view, offset) {
		return view.getUint16(offset, true);
	}

	function getUint32(view, offset) {
		return view.getUint32(offset, true);
	}

	function getBigUint64(view, offset) {
		return Number(view.getBigUint64(offset, true));
	}

	function getDataView$1(array) {
		return new DataView(array.buffer, array.byteOffset, array.byteLength);
	}

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


	const ERR_DUPLICATED_NAME = "File already exists";
	const ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
	const ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
	const ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
	const ERR_INVALID_VERSION = "Version exceeds 65535";
	const ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
	const ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
	const ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
	const ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
	const MIN_UNIX_TIME = -2147483648;
	const MAX_UNIX_TIME = 2147483647;
	const ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported (set the 'zip64' option to 'true')";
	const ERR_UNDEFINED_UNCOMPRESSED_SIZE = "Undefined uncompressed size";
	const ERR_UNDEFINED_READER = "Undefined reader";
	const ERR_ZIP_NOT_EMPTY = "Zip file not empty";
	const ERR_INVALID_UID = "Invalid uid (must be integer 0..2^32-1)";
	const ERR_INVALID_GID = "Invalid gid (must be integer 0..2^32-1)";
	const ERR_INVALID_UNIX_MODE = "Invalid UNIX mode (must be integer 0..65535)";
	const ERR_INVALID_UNIX_EXTRA_FIELD_TYPE = "Invalid unixExtraFieldType (must be 'infozip' or 'unix')";
	const ERR_INVALID_UNIX_ID_SIZE = "uid/gid must be 0..65535 for unixExtraFieldType 'unix' (use 'infozip' for larger ids)";
	const ERR_INVALID_MSDOS_ATTRIBUTES = "Invalid msdosAttributesRaw (must be integer 0..255)";
	const ERR_INVALID_MSDOS_DATA = "Invalid msdosAttributes (must be an object with boolean flags)";

	const EXTRAFIELD_DATA_AES = new Uint8Array([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);
	const INFOZIP_EXTRA_FIELD_TYPE = "infozip";
	const UNIX_EXTRA_FIELD_TYPE = "unix";

	let workers = 0;
	const pendingEntries = [];

	class ZipWriter {

		constructor(writer, options = {}) {
			writer = new GenericWriter(writer);
			const addSplitZipSignature =
				writer.availableSize !== UNDEFINED_VALUE && writer.availableSize > 0 && writer.availableSize !== INFINITY_VALUE &&
				writer.maxSize !== UNDEFINED_VALUE && writer.maxSize > 0 && writer.maxSize !== INFINITY_VALUE;
			Object.assign(this, {
				writer,
				addSplitZipSignature,
				options,
				config: getConfiguration(),
				files: new Map(),
				filenames: new Set(),
				offset: options[OPTION_OFFSET] === UNDEFINED_VALUE ? writer.size || writer.writable.size || 0 : options[OPTION_OFFSET],
				initialOffset: options[OPTION_OFFSET] === UNDEFINED_VALUE ? 0 : options[OPTION_OFFSET] - (writer.size || writer.writable.size || 0),
				pendingAddFileCalls: new Set(),
				bufferedWrites: 0,
				lastFileEntry: UNDEFINED_VALUE
			});
		}

		async prependZip(reader) {
			if (this.filenames.size) {
				throw new Error(ERR_ZIP_NOT_EMPTY);
			}
			reader = new GenericReader(reader);
			await initStream(reader);
			const zipReader = new ZipReader(reader.readable);
			const entries = await zipReader.getEntries();
			await zipReader.close();
			await initStream(this.writer);
			await reader.readable.pipeTo(this.writer.writable, { preventClose: true, preventAbort: true });
			this.writer.size = this.offset = reader.size;
			this.filenames = new Set(entries.map(entry => entry.filename));
			this.files = new Map(entries.map(entry => {
				const {
					version,
					rawLastModDate,
					lastAccessDate,
					creationDate,
					rawFilename,
					bitFlag,
					encrypted,
					uncompressedSize,
					compressedSize,
					diskOffset,
					diskNumber,
					zip64
				} = entry;
				let {
					compressionMethod,
					rawExtraFieldZip64,
					rawExtraFieldAES,
					rawExtraFieldExtendedTimestamp,
					rawExtraFieldNTFS,
					rawExtraFieldUnix,
					rawExtraField,
				} = entry;
				const { level, languageEncodingFlag, dataDescriptor } = bitFlag;
				rawExtraFieldZip64 = rawExtraFieldZip64 || EMPTY_UINT8_ARRAY;
				rawExtraFieldAES = rawExtraFieldAES || EMPTY_UINT8_ARRAY;
				rawExtraFieldExtendedTimestamp = rawExtraFieldExtendedTimestamp || EMPTY_UINT8_ARRAY;
				rawExtraFieldNTFS = rawExtraFieldNTFS || EMPTY_UINT8_ARRAY;
				rawExtraFieldUnix = rawExtraFieldUnix || EMPTY_UINT8_ARRAY;
				rawExtraField = rawExtraField || EMPTY_UINT8_ARRAY;
				if (entry.extraFieldAES) {
					compressionMethod = COMPRESSION_METHOD_AES;
				}
				const extraFieldLength = getLength(rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField);
				const zip64UncompressedSize = zip64 && uncompressedSize >= MAX_32_BITS;
				const zip64CompressedSize = zip64 && compressedSize >= MAX_32_BITS;
				const bitFlagValue = (getBitFlag(level, languageEncodingFlag, dataDescriptor, encrypted, compressionMethod) & ~BITFLAG_LEVEL) | (level << 1);
				const {
					headerArray,
					headerView
				} = getHeaderArrayData({
					version,
					bitFlag: bitFlagValue,
					compressionMethod,
					uncompressedSize,
					compressedSize,
					rawLastModDate,
					rawFilename,
					zip64CompressedSize,
					zip64UncompressedSize,
					extraFieldLength
				});
				const { signature } = entry;
				if (signature !== UNDEFINED_VALUE) {
					setUint32(headerView, HEADER_OFFSET_SIGNATURE, signature);
				}
				Object.assign(entry, {
					zip64UncompressedSize,
					zip64CompressedSize,
					zip64Offset: zip64 && this.offset - diskOffset >= MAX_32_BITS,
					zip64DiskNumberStart: zip64 && diskNumber >= MAX_16_BITS,
					rawExtraFieldZip64,
					rawExtraFieldAES,
					rawExtraFieldExtendedTimestamp,
					rawExtraFieldNTFS,
					rawExtraFieldUnix,
					rawExtraField,
					extendedTimestamp: rawExtraFieldExtendedTimestamp.length > 0 || rawExtraFieldNTFS.length > 0,
					extraFieldExtendedTimestampFlag: 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0),
					headerArray,
					headerView
				});
				return [entry.filename, entry];
			}));
		}

		async add(name = "", reader, options = {}) {
			const zipWriter = this;
			options = Object.assign({}, options);
			const {
				pendingAddFileCalls,
				config
			} = zipWriter;
			if (workers < config.maxWorkers) {
				workers++;
			} else {
				await new Promise(resolve => pendingEntries.push(resolve));
			}
			let promiseAddFile;
			let nameAdded;
			try {
				name = name.trim();
				if (getOptionValue(zipWriter, options, PROPERTY_NAME_DIRECTORY) && !name.endsWith(DIRECTORY_SIGNATURE)) {
					name += DIRECTORY_SIGNATURE;
				}
				if (zipWriter.filenames.has(name)) {
					throw new Error(ERR_DUPLICATED_NAME);
				}
				zipWriter.filenames.add(name);
				nameAdded = true;
				promiseAddFile = addFile(zipWriter, name, reader, options);
				pendingAddFileCalls.add(promiseAddFile);
				return await promiseAddFile;
			} catch (error) {
				if (nameAdded) {
					zipWriter.filenames.delete(name);
				}
				throw error;
			} finally {
				pendingAddFileCalls.delete(promiseAddFile);
				const pendingEntry = pendingEntries.shift();
				if (pendingEntry) {
					pendingEntry();
				} else {
					workers--;
				}
			}
		}

		remove(entry) {
			const { filenames, files } = this;
			if (typeof entry == "string") {
				entry = files.get(entry);
			}
			if (entry && entry.filename !== UNDEFINED_VALUE) {
				const { filename } = entry;
				if (filenames.has(filename) && files.has(filename)) {
					filenames.delete(filename);
					files.delete(filename);
					return true;
				}
			}
			return false;
		}

		async close(comment = EMPTY_UINT8_ARRAY, options = {}) {
			const zipWriter = this;
			const { pendingAddFileCalls, writer } = this;
			const { writable } = writer;
			if (getLength(comment) > MAX_16_BITS) {
				throw new Error(ERR_INVALID_COMMENT);
			}
			while (pendingAddFileCalls.size) {
				await Promise.allSettled(Array.from(pendingAddFileCalls));
			}
			await closeFile(zipWriter, comment, options);
			const preventClose = getOptionValue(zipWriter, options, OPTION_PREVENT_CLOSE);
			if (!preventClose) {
				await writable.getWriter().close();
			}
			return writer.getData ? writer.getData() : writable;
		}
	}

	class ZipWriterStream {

		constructor(options = {}) {
			const { readable, writable } = new TransformStream();
			this.readable = readable;
			this.zipWriter = new ZipWriter(writable, options);
			this.pendingAddFileCalls = new Set();
		}

		transform(path) {
			const zipWriter = this.zipWriter;
			let streamController;
			const { readable, writable } = new TransformStream({
				start(controller) {
					streamController = controller;
				},
				flush: () => void closeArchive()
			});
			watchAddFileCall(this, this.zipWriter.add(path, readable), error => streamController.error(error));
			return { readable: this.readable, writable };

			async function closeArchive() {
				try {
					await zipWriter.close();
				} catch (error) {
					try {
						await zipWriter.writer.writable.abort(error);
					} catch {
						// ignored
					}
				}
			}
		}

		writable(path) {
			let streamController;
			const { readable, writable } = new TransformStream({
				start(controller) {
					streamController = controller;
				}
			});
			watchAddFileCall(this, this.zipWriter.add(path, readable), error => streamController.error(error));
			return writable;
		}

		async close(comment = UNDEFINED_VALUE, options = {}) {
			await Promise.all(Array.from(this.pendingAddFileCalls));
			return this.zipWriter.close(comment, options);
		}
	}

	function watchAddFileCall(zipWriterStream, promiseAddFile, onerror) {
		zipWriterStream.pendingAddFileCalls.add(promiseAddFile);
		promiseAddFile.catch(error => {
			try {
				onerror(error);
			} catch {
				// ignored
			}
		});
	}

	async function addFile(zipWriter, name, reader, options) {
		const attributesInfo = resolveAttributes(zipWriter, name, options);
		({ name } = attributesInfo);
		const metadataInfo = resolveMetadata(zipWriter, name, options);
		const { comment } = metadataInfo;
		const extraField = options[PROPERTY_NAME_EXTRA_FIELD];
		zipWriter.files.set(name, UNDEFINED_VALUE);
		let fileEntry;
		try {
			const sizesInfo = await resolveSizes(zipWriter, reader, metadataInfo, options);
			({ reader } = sizesInfo);
			const { diskOffset, diskNumber } = zipWriter.writer;
			options = Object.assign({}, options, attributesInfo.resolvedOptions, metadataInfo.resolvedOptions, sizesInfo.resolvedOptions, {
				internalFileAttribute: metadataInfo.resolvedOptions.internalFileAttributes,
				externalFileAttribute: attributesInfo.resolvedOptions.externalFileAttributes,
				signature: options[PROPERTY_NAME_SIGNATURE],
				offset: zipWriter.offset - diskOffset,
				diskNumberStart: diskNumber
			});
			const headerInfo = getHeaderInfo(options);
			const dataDescriptorInfo = getDataDescriptorInfo(options);
			const metadataSize = getLength(headerInfo.localHeaderArray, dataDescriptorInfo.dataDescriptorArray);
			fileEntry = await getFileEntry(zipWriter, name, reader, { headerInfo, dataDescriptorInfo, metadataSize }, options);
		} catch (error) {
			zipWriter.files.delete(name);
			throw error;
		}
		Object.assign(fileEntry, { name, comment, extraField });
		return new Entry(fileEntry);
	}

	function resolveAttributes(zipWriter, name, options) {
		name = name.trim();
		let msDosCompatible = getOptionValue(zipWriter, options, PROPERTY_NAME_MS_DOS_COMPATIBLE);
		let versionMadeBy = getOptionValue(zipWriter, options, PROPERTY_NAME_VERSION_MADE_BY, msDosCompatible ? 20 : 768);
		const executable = getOptionValue(zipWriter, options, PROPERTY_NAME_EXECUTABLE);
		const uid = getOptionValue(zipWriter, options, PROPERTY_NAME_UID);
		const gid = getOptionValue(zipWriter, options, PROPERTY_NAME_GID);
		let unixMode = getOptionValue(zipWriter, options, PROPERTY_NAME_UNIX_MODE);
		let unixExtraFieldType = getOptionValue(zipWriter, options, OPTION_UNIX_EXTRA_FIELD_TYPE);
		let setuid = getOptionValue(zipWriter, options, PROPERTY_NAME_SETUID);
		let setgid = getOptionValue(zipWriter, options, PROPERTY_NAME_SETGID);
		let sticky = getOptionValue(zipWriter, options, PROPERTY_NAME_STICKY);
		if (uid !== UNDEFINED_VALUE && (uid < 0 || uid > MAX_32_BITS)) {
			throw new Error(ERR_INVALID_UID);
		}
		if (gid !== UNDEFINED_VALUE && (gid < 0 || gid > MAX_32_BITS)) {
			throw new Error(ERR_INVALID_GID);
		}
		if (unixMode !== UNDEFINED_VALUE && (unixMode < 0 || unixMode > MAX_16_BITS)) {
			throw new Error(ERR_INVALID_UNIX_MODE);
		}
		if (unixExtraFieldType !== UNDEFINED_VALUE && unixExtraFieldType !== INFOZIP_EXTRA_FIELD_TYPE && unixExtraFieldType !== UNIX_EXTRA_FIELD_TYPE) {
			throw new Error(ERR_INVALID_UNIX_EXTRA_FIELD_TYPE);
		}
		if (unixExtraFieldType === UNIX_EXTRA_FIELD_TYPE &&
			((uid !== UNDEFINED_VALUE && uid > MAX_16_BITS) || (gid !== UNDEFINED_VALUE && gid > MAX_16_BITS))) {
			throw new Error(ERR_INVALID_UNIX_ID_SIZE);
		}
		if (unixExtraFieldType === UNDEFINED_VALUE && (uid !== UNDEFINED_VALUE || gid !== UNDEFINED_VALUE)) {
			unixExtraFieldType = INFOZIP_EXTRA_FIELD_TYPE;
		}
		let msdosAttributesRaw = getOptionValue(zipWriter, options, PROPERTY_NAME_MSDOS_ATTRIBUTES_RAW);
		let msdosAttributes = getOptionValue(zipWriter, options, PROPERTY_NAME_MSDOS_ATTRIBUTES);
		const hasUnixMetadata = uid !== UNDEFINED_VALUE || gid !== UNDEFINED_VALUE || unixMode !== UNDEFINED_VALUE || unixExtraFieldType;
		const hasMsDosProvided = msdosAttributesRaw !== UNDEFINED_VALUE || msdosAttributes !== UNDEFINED_VALUE;
		if (hasUnixMetadata) {
			msDosCompatible = false;
			versionMadeBy = (versionMadeBy & MAX_16_BITS) | (3 << 8);
		} else if (hasMsDosProvided) {
			msDosCompatible = true;
			versionMadeBy = (versionMadeBy & MAX_8_BITS);
		}
		if (msdosAttributesRaw !== UNDEFINED_VALUE && (msdosAttributesRaw < 0 || msdosAttributesRaw > MAX_8_BITS)) {
			throw new Error(ERR_INVALID_MSDOS_ATTRIBUTES);
		}
		if (msdosAttributes && typeof msdosAttributes !== OBJECT_TYPE) {
			throw new Error(ERR_INVALID_MSDOS_DATA);
		}
		if (versionMadeBy > MAX_16_BITS) {
			throw new Error(ERR_INVALID_VERSION);
		}
		let externalFileAttributes = getOptionValue(zipWriter, options, PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTES, 0);
		if (!options[PROPERTY_NAME_DIRECTORY] && name.endsWith(DIRECTORY_SIGNATURE)) {
			options[PROPERTY_NAME_DIRECTORY] = true;
		}
		const directory = getOptionValue(zipWriter, options, PROPERTY_NAME_DIRECTORY);
		if (directory) {
			if (!name.endsWith(DIRECTORY_SIGNATURE)) {
				name += DIRECTORY_SIGNATURE;
			}
			if (externalFileAttributes === 0) {
				externalFileAttributes = FILE_ATTR_MSDOS_DIR_MASK;
				if (!msDosCompatible) {
					externalFileAttributes |= (FILE_ATTR_UNIX_TYPE_DIR | FILE_ATTR_UNIX_EXECUTABLE_MASK | FILE_ATTR_UNIX_DEFAULT_MASK) << 16;
				}
			}
		} else if (!msDosCompatible && externalFileAttributes === 0) {
			if (executable) {
				externalFileAttributes = (FILE_ATTR_UNIX_EXECUTABLE_MASK | FILE_ATTR_UNIX_DEFAULT_MASK) << 16;
			} else {
				externalFileAttributes = FILE_ATTR_UNIX_DEFAULT_MASK << 16;
			}
		}
		let unixExternalUpper;
		if (!msDosCompatible) {
			unixExternalUpper = (externalFileAttributes >> 16) & MAX_16_BITS;
			unixMode = unixMode === UNDEFINED_VALUE ? unixExternalUpper : (unixMode & MAX_16_BITS);
			if (setuid) {
				unixMode |= FILE_ATTR_UNIX_SETUID_MASK;
			} else {
				setuid = Boolean(unixMode & FILE_ATTR_UNIX_SETUID_MASK);
			}
			if (setgid) {
				unixMode |= FILE_ATTR_UNIX_SETGID_MASK;
			} else {
				setgid = Boolean(unixMode & FILE_ATTR_UNIX_SETGID_MASK);
			}
			if (sticky) {
				unixMode |= FILE_ATTR_UNIX_STICKY_MASK;
			} else {
				sticky = Boolean(unixMode & FILE_ATTR_UNIX_STICKY_MASK);
			}
			if (directory) {
				unixMode |= FILE_ATTR_UNIX_TYPE_DIR;
			}
			externalFileAttributes = ((unixMode & MAX_16_BITS) << 16) | (externalFileAttributes & MAX_8_BITS);
		}
		({ msdosAttributesRaw, msdosAttributes } = normalizeMsdosAttributes(msdosAttributesRaw, msdosAttributes));
		if (hasMsDosProvided) {
			externalFileAttributes = (externalFileAttributes & MAX_32_BITS) | (msdosAttributesRaw & MAX_8_BITS);
		}
		return {
			name,
			resolvedOptions: {
				versionMadeBy,
				msDosCompatible,
				externalFileAttributes,
				unixExternalUpper,
				uid,
				gid,
				unixMode,
				unixExtraFieldType,
				setuid,
				setgid,
				sticky,
				msdosAttributesRaw,
				msdosAttributes
			}
		};
	}

	function resolveMetadata(zipWriter, name, options) {
		const encode = getOptionValue(zipWriter, options, OPTION_ENCODE_TEXT, encodeText);
		let rawFilename = encode(name);
		if (rawFilename === UNDEFINED_VALUE) {
			rawFilename = encodeText(name);
		}
		if (getLength(rawFilename) > MAX_16_BITS) {
			throw new Error(ERR_INVALID_ENTRY_NAME);
		}
		const comment = options[PROPERTY_NAME_COMMENT] || "";
		let rawComment = encode(comment);
		if (rawComment === UNDEFINED_VALUE) {
			rawComment = encodeText(comment);
		}
		if (getLength(rawComment) > MAX_16_BITS) {
			throw new Error(ERR_INVALID_ENTRY_COMMENT);
		}
		const version = getOptionValue(zipWriter, options, PROPERTY_NAME_VERSION, VERSION_DEFLATE);
		if (version > MAX_16_BITS) {
			throw new Error(ERR_INVALID_VERSION);
		}
		const lastModDate = getOptionValue(zipWriter, options, PROPERTY_NAME_LAST_MODIFICATION_DATE, new Date());
		const lastAccessDate = getOptionValue(zipWriter, options, PROPERTY_NAME_LAST_ACCESS_DATE);
		const creationDate = getOptionValue(zipWriter, options, PROPERTY_NAME_CREATION_DATE);
		const internalFileAttributes = getOptionValue(zipWriter, options, PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTES, 0);
		const passThrough = getOptionValue(zipWriter, options, OPTION_PASS_THROUGH);
		let password, rawPassword;
		if (!passThrough) {
			password = getOptionValue(zipWriter, options, OPTION_PASSWORD);
			rawPassword = getOptionValue(zipWriter, options, OPTION_RAW_PASSWORD);
		}
		const encryptionStrength = getOptionValue(zipWriter, options, OPTION_ENCRYPTION_STRENGTH, 3);
		const zipCrypto = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIPCRYPTO);
		const extendedTimestamp = getOptionValue(zipWriter, options, OPTION_EXTENDED_TIMESTAMP, true);
		const keepOrder = getOptionValue(zipWriter, options, OPTION_KEEP_ORDER, true);
		const useWebWorkers = getOptionValue(zipWriter, options, OPTION_USE_WEB_WORKERS);
		const transferStreams = getOptionValue(zipWriter, options, OPTION_TRANSFER_STREAMS, true);
		const bufferedWrite = getOptionValue(zipWriter, options, OPTION_BUFFERED_WRITE);
		const createTempStream = getOptionValue(zipWriter, options, OPTION_CREATE_TEMP_STREAM);
		const dataDescriptorSignature = getOptionValue(zipWriter, options, OPTION_DATA_DESCRIPTOR_SIGNATURE, true);
		const signal = getOptionValue(zipWriter, options, OPTION_SIGNAL);
		const useUnicodeFileNames = getOptionValue(zipWriter, options, OPTION_USE_UNICODE_FILE_NAMES, true);
		const compressionMethod = getOptionValue(zipWriter, options, PROPERTY_NAME_COMPRESSION_METHOD);
		if (!passThrough && compressionMethod !== UNDEFINED_VALUE &&
			compressionMethod !== COMPRESSION_METHOD_STORE && compressionMethod !== COMPRESSION_METHOD_DEFLATE) {
			throw new Error(ERR_UNSUPPORTED_COMPRESSION);
		}
		let level = getOptionValue(zipWriter, options, OPTION_LEVEL);
		let useCompressionStream = getOptionValue(zipWriter, options, OPTION_USE_COMPRESSION_STREAM);
		let dataDescriptor = getOptionValue(zipWriter, options, OPTION_DATA_DESCRIPTOR);
		if (bufferedWrite && dataDescriptor === UNDEFINED_VALUE) {
			dataDescriptor = false;
		}
		if (dataDescriptor === UNDEFINED_VALUE || zipCrypto) {
			dataDescriptor = true;
		}
		if (level !== UNDEFINED_VALUE && level != 6) {
			useCompressionStream = false;
		}
		if (!useCompressionStream && (zipWriter.config.CompressionStream === UNDEFINED_VALUE && zipWriter.config.CompressionStreamZlib === UNDEFINED_VALUE)) {
			level = 0;
		}
		const zip64 = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIP64);
		if (!zipCrypto && (password !== UNDEFINED_VALUE || rawPassword !== UNDEFINED_VALUE) && !(encryptionStrength >= 1 && encryptionStrength <= 3)) {
			throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
		}
		let rawExtraField = EMPTY_UINT8_ARRAY;
		const extraField = options[PROPERTY_NAME_EXTRA_FIELD];
		if (extraField) {
			let extraFieldSize = 0;
			let offset = 0;
			extraField.forEach(data => extraFieldSize += 4 + getLength(data));
			rawExtraField = new Uint8Array(extraFieldSize);
			const rawExtraFieldView = getDataView(rawExtraField);
			extraField.forEach((data, type) => {
				if (type > MAX_16_BITS) {
					throw new Error(ERR_INVALID_EXTRAFIELD_TYPE);
				}
				if (getLength(data) > MAX_16_BITS) {
					throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
				}
				setUint16(rawExtraFieldView, offset, type);
				setUint16(rawExtraFieldView, offset + 2, getLength(data));
				arraySet(rawExtraField, data, offset + 4);
				offset += 4 + getLength(data);
			});
		}
		return {
			comment,
			resolvedOptions: {
				rawFilename,
				rawComment,
				version,
				lastModDate,
				lastAccessDate,
				creationDate,
				internalFileAttributes,
				passThrough,
				password,
				rawPassword,
				encryptionStrength,
				zipCrypto,
				extendedTimestamp,
				keepOrder,
				useWebWorkers,
				transferStreams,
				bufferedWrite,
				createTempStream,
				dataDescriptorSignature,
				signal,
				useUnicodeFileNames,
				compressionMethod,
				level,
				useCompressionStream,
				dataDescriptor,
				zip64,
				rawExtraField
			}
		};
	}

	async function resolveSizes(zipWriter, reader, { resolvedOptions: metadata }, options) {
		const { passThrough, zipCrypto, password, rawPassword, encryptionStrength } = metadata;
		let { dataDescriptor, zip64, level, compressionMethod } = metadata;
		let maximumCompressedSize = 0;
		let uncompressedSize = 0;
		if (passThrough) {
			if (!reader) {
				throw new Error(ERR_UNDEFINED_READER);
			}
			uncompressedSize = options[PROPERTY_NAME_UNCOMPRESSED_SIZE];
			if (uncompressedSize === UNDEFINED_VALUE) {
				throw new Error(ERR_UNDEFINED_UNCOMPRESSED_SIZE);
			}
		}
		const zip64Enabled = zip64 === true;
		const encrypted = getOptionValue(zipWriter, options, PROPERTY_NAME_ENCRYPTED);
		const encryptedEntry = Boolean(reader) && (Boolean((password && getLength(password)) || (rawPassword && getLength(rawPassword))) || (passThrough && encrypted));
		if (!reader) {
			level = 0;
			compressionMethod = COMPRESSION_METHOD_STORE;
		}
		const encryptionOverhead = encryptedEntry ? (zipCrypto ? 12 : 16 + encryptionStrength * 4) : 0;
		if (reader) {
			reader = new GenericReader(reader);
			await initStream(reader);
			if (!passThrough) {
				if (reader.size === UNDEFINED_VALUE) {
					dataDescriptor = true;
					if (zip64 || zip64 === UNDEFINED_VALUE) {
						zip64 = true;
						uncompressedSize = maximumCompressedSize = MAX_32_BITS + 1;
					}
				} else {
					options.uncompressedSize = uncompressedSize = reader.size;
					maximumCompressedSize = getMaximumCompressedSize(uncompressedSize) + encryptionOverhead;
				}
			} else {
				options.uncompressedSize = uncompressedSize;
				maximumCompressedSize = getMaximumCompressedSize(uncompressedSize) + encryptionOverhead;
			}
		}
		const zip64UncompressedSize = zip64Enabled || uncompressedSize >= MAX_32_BITS;
		const zip64CompressedSize = zip64Enabled || maximumCompressedSize >= MAX_32_BITS;
		if (zip64UncompressedSize || zip64CompressedSize) {
			if (zip64 === false) {
				throw new Error(ERR_UNSUPPORTED_FORMAT);
			} else {
				zip64 = true;
			}
		}
		zip64 = zip64 || false;
		return {
			reader,
			resolvedOptions: {
				dataDescriptor,
				zip64,
				zip64UncompressedSize,
				zip64CompressedSize,
				uncompressedSize,
				level,
				compressionMethod,
				encrypted: encryptedEntry
			}
		};
	}

	async function getFileEntry(zipWriter, name, reader, entryInfo, options) {
		const {
			files,
			writer
		} = zipWriter;
		const {
			keepOrder,
			dataDescriptor,
			signal
		} = options;
		const {
			headerInfo
		} = entryInfo;
		const usdz = zipWriter.options[OPTION_USDZ];
		const previousFileEntry = zipWriter.lastFileEntry;
		let fileEntry = {};
		let bufferedWrite;
		let releaseLockWriter;
		let releaseLockCurrentFileEntry;
		let writingBufferedEntryData;
		let writingEntryData;
		let writerSizeBeforeEntry;
		let flushedBufferedSize = 0;
		let fileWriter;
		files.set(name, fileEntry);
		zipWriter.lastFileEntry = fileEntry;
		try {
			let lockPreviousFileEntry;
			if (keepOrder) {
				lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
				requestLockCurrentFileEntry();
			}
			if (options.bufferedWrite || !keepOrder || zipWriter.writerLocked || zipWriter.bufferedWrites || !dataDescriptor) {
				bufferedWrite = true;
				zipWriter.bufferedWrites++;
				if (options.createTempStream) {
					fileWriter = await options.createTempStream();
				} else {
					fileWriter = new TransformStream(UNDEFINED_VALUE, UNDEFINED_VALUE, { highWaterMark: INFINITY_VALUE });
				}
				fileWriter.size = 0;
				await initStream(writer);
			} else {
				fileWriter = writer;
				await requestLockWriter();
			}
			await initStream(fileWriter);
			const { diskOffset } = writer;
			if (zipWriter.addSplitZipSignature) {
				delete zipWriter.addSplitZipSignature;
				const signatureArray = new Uint8Array(4);
				const signatureArrayView = getDataView(signatureArray);
				setUint32(signatureArrayView, 0, SPLIT_ZIP_FILE_SIGNATURE);
				await writeData(writer, signatureArray);
				zipWriter.offset += 4;
			}
			if (usdz && !bufferedWrite) {
				appendExtraFieldUSDZ(entryInfo, zipWriter.offset - diskOffset);
			}
			const { localHeaderArray } = headerInfo;
			if (!bufferedWrite) {
				await lockPreviousFileEntry;
				await skipDiskIfNeeded();
			}
			const diskNumberStart = writer.diskNumber;
			const entryOffset = getSegmentOffset(zipWriter, writer);
			fileEntry.diskNumberStart = diskNumberStart;
			if (!bufferedWrite) {
				writingEntryData = true;
				writerSizeBeforeEntry = writer.size;
				await writeData(fileWriter, localHeaderArray);
			}
			fileEntry = await createFileEntry(reader, fileWriter, fileEntry, entryInfo, zipWriter.config, options);
			if (!bufferedWrite) {
				writingEntryData = false;
			}
			files.set(name, fileEntry);
			fileEntry.filename = name;
			if (bufferedWrite) {
				await Promise.all([fileWriter.writable.getWriter().close(), lockPreviousFileEntry]);
				await requestLockWriter();
				writingBufferedEntryData = true;
				writerSizeBeforeEntry = writer.size;
				await skipDiskIfNeeded();
				fileEntry.diskNumberStart = writer.diskNumber;
				fileEntry.offset = getSegmentOffset(zipWriter, writer);
				if (usdz) {
					const previousMetadataSize = entryInfo.metadataSize;
					appendExtraFieldUSDZ(entryInfo, zipWriter.offset - writer.diskOffset);
					fileEntry.size += entryInfo.metadataSize - previousMetadataSize;
				}
				updateLocalHeader(fileEntry, headerInfo.localHeaderView, options);
				await writeData(writer, headerInfo.localHeaderArray);
				await flushBufferedData(fileWriter.readable, writer, signal, chunkLength => flushedBufferedSize += chunkLength);
				writer.size += fileWriter.size;
				writingBufferedEntryData = false;
			} else {
				fileEntry.diskNumberStart = diskNumberStart;
				fileEntry.offset = entryOffset;
			}
			zipWriter.offset += fileEntry.size;
			return fileEntry;
		} catch (error) {
			if (writingBufferedEntryData || writingEntryData) {
				zipWriter.hasCorruptedEntries = true;
				if (error) {
					try {
						error.corruptedEntry = true;
					} catch {
						// ignored
					}
				}
				zipWriter.offset += writer.size - writerSizeBeforeEntry;
				if (bufferedWrite) {
					zipWriter.offset += flushedBufferedSize;
				}
			}
			files.delete(name);
			throw error;
		} finally {
			if (bufferedWrite) {
				zipWriter.bufferedWrites--;
			}
			if (releaseLockCurrentFileEntry) {
				releaseLockCurrentFileEntry();
			}
			if (releaseLockWriter) {
				releaseLockWriter();
			}
			if (bufferedWrite && fileWriter && fileWriter.dispose) {
				try {
					await fileWriter.dispose();
				} catch {
					// ignored
				}
			}
		}

		function requestLockCurrentFileEntry() {
			fileEntry.lock = new Promise(resolve => releaseLockCurrentFileEntry = resolve);
		}

		async function requestLockWriter() {
			zipWriter.writerLocked = true;
			const { lockWriter } = zipWriter;
			zipWriter.lockWriter = new Promise(resolve => releaseLockWriter = () => {
				zipWriter.writerLocked = false;
				resolve();
			});
			await lockWriter;
		}

		async function skipDiskIfNeeded() {
			if (getLength(headerInfo.localHeaderArray) > writer.availableSize) {
				writer.availableSize = 0;
				await writeData(writer, EMPTY_UINT8_ARRAY);
			}
		}
	}

	async function createFileEntry(reader, writer, { diskNumberStart, lock }, entryInfo, config, options) {
		const {
			headerInfo,
			dataDescriptorInfo,
			metadataSize
		} = entryInfo;
		const {
			headerArray,
			headerView,
			lastModDate,
			rawLastModDate,
			encrypted,
			compressed,
			version,
			compressionMethod,
			rawExtraFieldZip64,
			localExtraFieldZip64Length,
			rawExtraFieldExtendedTimestamp,
			extraFieldExtendedTimestampFlag,
			rawExtraFieldNTFS,
			rawExtraFieldUnix,
			rawExtraFieldAES,
		} = headerInfo;
		const { dataDescriptorArray } = dataDescriptorInfo;
		const {
			rawFilename,
			lastAccessDate,
			creationDate,
			password,
			rawPassword,
			level,
			zip64,
			zip64UncompressedSize,
			zip64CompressedSize,
			zipCrypto,
			dataDescriptor,
			directory,
			executable,
			versionMadeBy,
			rawComment,
			rawExtraField,
			useWebWorkers,
			transferStreams,
			onstart,
			onprogress,
			onend,
			signal,
			encryptionStrength,
			extendedTimestamp,
			msDosCompatible,
			internalFileAttributes,
			externalFileAttributes,
			uid,
			gid,
			unixMode,
			setuid,
			setgid,
			sticky,
			unixExternalUpper,
			msdosAttributesRaw,
			msdosAttributes,
			useCompressionStream,
			passThrough
		} = options;
		const fileEntry = {
			lock,
			versionMadeBy,
			zip64,
			directory: Boolean(directory),
			executable: Boolean(executable),
			filenameUTF8: true,
			rawFilename,
			commentUTF8: true,
			rawComment,
			rawExtraFieldZip64,
			localExtraFieldZip64Length,
			rawExtraFieldExtendedTimestamp,
			rawExtraFieldNTFS,
			rawExtraFieldUnix,
			rawExtraFieldAES,
			rawExtraField,
			extendedTimestamp,
			msDosCompatible,
			internalFileAttributes,
			externalFileAttributes,
			diskNumberStart,
			uid,
			gid,
			unixMode,
			setuid,
			setgid,
			sticky,
			unixExternalUpper,
			msdosAttributesRaw,
			msdosAttributes
		};
		let {
			signature,
			uncompressedSize
		} = options;
		let compressedSize = 0;
		if (!passThrough) {
			uncompressedSize = 0;
		}
		const { writable } = writer;
		if (reader) {
			const readable = reader.createReadable ? reader.createReadable({ chunkSize: getChunkSize(config) }) : reader.readable;
			const size = reader.size;
			const workerOptions = {
				options: {
					codecType: CODEC_DEFLATE,
					level,
					rawPassword,
					password,
					encryptionStrength,
					zipCrypto: encrypted && zipCrypto,
					passwordVerification: encrypted && zipCrypto && (rawLastModDate >> 8) & MAX_8_BITS,
					signed: !passThrough,
					compressed: compressed && !passThrough,
					encrypted: encrypted && !passThrough,
					useWebWorkers,
					useCompressionStream,
					transferStreams
				},
				config,
				streamOptions: { signal, size, onstart, onprogress, onend }
			};
			try {
				const result = await runWorker({ readable, writable }, workerOptions);
				compressedSize = result.outputSize;
				writer.size += compressedSize;
				if (!passThrough) {
					uncompressedSize = result.inputSize;
					signature = result.signature;
				}
				if ((!zip64CompressedSize && compressedSize >= MAX_32_BITS) ||
					(!zip64UncompressedSize && uncompressedSize >= MAX_32_BITS)) {
					throw new Error(ERR_UNSUPPORTED_FORMAT);
				}
			} catch (error) {
				if (error.outputSize !== UNDEFINED_VALUE) {
					writer.size += error.outputSize;
				}
				throw error;
			}

		}
		setEntryInfo({
			signature,
			compressedSize,
			uncompressedSize,
			headerInfo,
			dataDescriptorInfo
		}, options);
		if (dataDescriptor) {
			await writeData(writer, dataDescriptorArray);
		}
		Object.assign(fileEntry, {
			uncompressedSize,
			compressedSize,
			lastModDate,
			rawLastModDate,
			creationDate,
			lastAccessDate,
			encrypted,
			zipCrypto,
			size: metadataSize + compressedSize,
			compressionMethod,
			version,
			headerArray,
			headerView,
			signature,
			extraFieldExtendedTimestampFlag,
			zip64UncompressedSize,
			zip64CompressedSize
		});
		return fileEntry;
	}

	function getHeaderInfo(options) {
		const {
			rawFilename,
			lastModDate,
			lastAccessDate,
			creationDate,
			level,
			zip64,
			zipCrypto,
			useUnicodeFileNames,
			dataDescriptor,
			directory,
			rawExtraField,
			encryptionStrength,
			extendedTimestamp,
			passThrough,
			encrypted,
			zip64UncompressedSize,
			zip64CompressedSize,
			uncompressedSize
		} = options;
		let { version, compressionMethod } = options;
		const compressed = !directory && (compressionMethod === UNDEFINED_VALUE
			? (level === UNDEFINED_VALUE || level > 0)
			: compressionMethod !== COMPRESSION_METHOD_STORE);
		let rawLocalExtraFieldZip64;
		const uncompressedFile = passThrough || !compressed;
		const zip64ExtraFieldComplete = zip64 && (options.bufferedWrite || !dataDescriptor || ((!zip64UncompressedSize && !zip64CompressedSize) || uncompressedFile));
		const writeLocalExtraFieldZip64 = zip64ExtraFieldComplete || (zip64 && dataDescriptor && (zip64UncompressedSize || zip64CompressedSize));
		if (zip64 && (zip64UncompressedSize || zip64CompressedSize)) {
			const length = 4 + 16;
			const extraFieldZip64 = createRecordWriter(length);
			extraFieldZip64.uint16(EXTRAFIELD_TYPE_ZIP64);
			extraFieldZip64.uint16(length - 4);
			rawLocalExtraFieldZip64 = extraFieldZip64.array;
			if (zip64ExtraFieldComplete) {
				extraFieldZip64.uint64(uncompressedSize);
				if (uncompressedFile) {
					const encryptionOverhead = encrypted ? (zipCrypto ? 12 : 16 + encryptionStrength * 4) : 0;
					extraFieldZip64.uint64(passThrough ? 0 : uncompressedSize + encryptionOverhead);
				}
			}
		} else {
			rawLocalExtraFieldZip64 = EMPTY_UINT8_ARRAY;
		}
		let rawExtraFieldAES;
		if (encrypted && !zipCrypto) {
			const extraFieldAES = createRecordWriter(getLength(EXTRAFIELD_DATA_AES) + 2);
			extraFieldAES.uint16(EXTRAFIELD_TYPE_AES);
			extraFieldAES.bytes(EXTRAFIELD_DATA_AES);
			rawExtraFieldAES = extraFieldAES.array;
			rawExtraFieldAES[8] = encryptionStrength;
		} else {
			rawExtraFieldAES = EMPTY_UINT8_ARRAY;
		}
		let rawExtraFieldNTFS;
		let rawExtraFieldExtendedTimestamp;
		let extraFieldExtendedTimestampFlag;
		if (extendedTimestamp) {
			const lastModTimeUnix = getTimeUnix(lastModDate);
			if (inUnixTimeRange(lastModTimeUnix)) {
				const extraFieldTimestampLength = 9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0);
				const extraFieldTimestamp = createRecordWriter(extraFieldTimestampLength);
				extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
				extraFieldTimestamp.uint16(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
				extraFieldTimestamp.uint16(extraFieldTimestampLength - 4);
				extraFieldTimestamp.uint8(extraFieldExtendedTimestampFlag);
				extraFieldTimestamp.uint32(lastModTimeUnix);
				if (lastAccessDate) {
					extraFieldTimestamp.uint32(clampUnixTime(getTimeUnix(lastAccessDate)));
				}
				if (creationDate) {
					extraFieldTimestamp.uint32(clampUnixTime(getTimeUnix(creationDate)));
				}
				rawExtraFieldExtendedTimestamp = extraFieldTimestamp.array;
			} else {
				rawExtraFieldExtendedTimestamp = EMPTY_UINT8_ARRAY;
			}
			try {
				const lastModTimeNTFS = getTimeNTFS(lastModDate);
				const extraFieldNTFS = createRecordWriter(36);
				extraFieldNTFS.uint16(EXTRAFIELD_TYPE_NTFS);
				extraFieldNTFS.uint16(32);
				extraFieldNTFS.skip(4);
				extraFieldNTFS.uint16(EXTRAFIELD_TYPE_NTFS_TAG1);
				extraFieldNTFS.uint16(24);
				extraFieldNTFS.uint64(lastModTimeNTFS);
				extraFieldNTFS.uint64(getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
				extraFieldNTFS.uint64(getTimeNTFS(creationDate) || lastModTimeNTFS);
				rawExtraFieldNTFS = extraFieldNTFS.array;
			} catch {
				rawExtraFieldNTFS = EMPTY_UINT8_ARRAY;
			}
		} else {
			rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = EMPTY_UINT8_ARRAY;
		}
		let rawExtraFieldUnix;
		try {
			const { uid, gid, unixExtraFieldType } = options;
			if (unixExtraFieldType == INFOZIP_EXTRA_FIELD_TYPE && (uid !== UNDEFINED_VALUE || gid !== UNDEFINED_VALUE)) {
				const uidBytes = packUnixId(uid);
				const gidBytes = packUnixId(gid);
				const payloadLength = 3 + uidBytes.length + gidBytes.length;
				const extraFieldUnix = createRecordWriter(4 + payloadLength);
				extraFieldUnix.uint16(EXTRAFIELD_TYPE_INFOZIP);
				extraFieldUnix.uint16(payloadLength);
				extraFieldUnix.uint8(1);
				extraFieldUnix.uint8(uidBytes.length);
				extraFieldUnix.bytes(uidBytes);
				extraFieldUnix.uint8(gidBytes.length);
				extraFieldUnix.bytes(gidBytes);
				rawExtraFieldUnix = extraFieldUnix.array;
			} else if (unixExtraFieldType == UNIX_EXTRA_FIELD_TYPE && (uid !== UNDEFINED_VALUE || gid !== UNDEFINED_VALUE)) {
				const extraFieldUnix = createRecordWriter(8);
				extraFieldUnix.uint16(EXTRAFIELD_TYPE_UNIX);
				extraFieldUnix.uint16(4);
				extraFieldUnix.uint16((uid === UNDEFINED_VALUE ? 0 : uid) & MAX_16_BITS);
				extraFieldUnix.uint16((gid === UNDEFINED_VALUE ? 0 : gid) & MAX_16_BITS);
				rawExtraFieldUnix = extraFieldUnix.array;
			} else {
				rawExtraFieldUnix = EMPTY_UINT8_ARRAY;
			}
		} catch {
			rawExtraFieldUnix = EMPTY_UINT8_ARRAY;
		}
		if (compressionMethod === UNDEFINED_VALUE) {
			compressionMethod = compressed ? COMPRESSION_METHOD_DEFLATE : COMPRESSION_METHOD_STORE;
		}
		if (zip64) {
			version = version > VERSION_ZIP64 ? version : VERSION_ZIP64;
		}
		if (encrypted && !zipCrypto) {
			version = version > VERSION_AES ? version : VERSION_AES;
			rawExtraFieldAES[9] = compressionMethod;
			compressionMethod = COMPRESSION_METHOD_AES;
		}
		const localExtraFieldZip64Length = writeLocalExtraFieldZip64 ? getLength(rawLocalExtraFieldZip64) : 0;
		const extraFieldLength = localExtraFieldZip64Length + getLength(rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField);
		if (extraFieldLength > MAX_16_BITS) {
			throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
		}
		const {
			headerArray,
			headerView,
			rawLastModDate
		} = getHeaderArrayData({
			version,
			bitFlag: getBitFlag(level, useUnicodeFileNames, dataDescriptor, encrypted, compressionMethod),
			compressionMethod,
			uncompressedSize,
			lastModDate: lastModDate < MIN_DATE ? MIN_DATE : lastModDate > MAX_DATE ? MAX_DATE : lastModDate,
			rawFilename,
			zip64CompressedSize,
			zip64UncompressedSize,
			extraFieldLength
		});
		const localHeader = createRecordWriter(HEADER_SIZE + getLength(rawFilename) + extraFieldLength);
		const localHeaderArray = localHeader.array;
		const localHeaderView = getDataView(localHeaderArray);
		localHeader.uint32(LOCAL_FILE_HEADER_SIGNATURE);
		localHeader.bytes(headerArray);
		localHeader.bytes(rawFilename);
		if (writeLocalExtraFieldZip64) {
			localHeader.bytes(rawLocalExtraFieldZip64);
		}
		localHeader.bytes(rawExtraFieldAES);
		localHeader.bytes(rawExtraFieldExtendedTimestamp);
		localHeader.bytes(rawExtraFieldNTFS);
		localHeader.bytes(rawExtraFieldUnix);
		localHeader.bytes(rawExtraField);
		if (dataDescriptor) {
			if (!zip64CompressedSize) {
				setUint32(localHeaderView, HEADER_OFFSET_COMPRESSED_SIZE + LOCAL_HEADER_COMMON_OFFSET, 0);
			}
			if (!zip64UncompressedSize) {
				setUint32(localHeaderView, HEADER_OFFSET_UNCOMPRESSED_SIZE + LOCAL_HEADER_COMMON_OFFSET, 0);
			}
		}
		return {
			localHeaderArray,
			localHeaderView,
			headerArray,
			headerView,
			lastModDate,
			rawLastModDate,
			encrypted,
			compressed,
			version,
			compressionMethod,
			extraFieldExtendedTimestampFlag,
			rawExtraFieldZip64: EMPTY_UINT8_ARRAY,
			localExtraFieldZip64Length,
			rawExtraFieldExtendedTimestamp,
			rawExtraFieldNTFS,
			rawExtraFieldUnix,
			rawExtraFieldAES,
			extraFieldLength
		};
	}

	function appendExtraFieldUSDZ(entryInfo, zipWriterOffset) {
		const { headerInfo } = entryInfo;
		let { localHeaderArray, extraFieldLength } = headerInfo;
		let extraBytesLength = 64 - ((zipWriterOffset + getLength(localHeaderArray)) % 64);
		if (extraBytesLength < 4) {
			extraBytesLength += 64;
		}
		const rawExtraFieldUSDZ = new Uint8Array(extraBytesLength);
		const extraFieldUSDZView = getDataView(rawExtraFieldUSDZ);
		setUint16(extraFieldUSDZView, 0, EXTRAFIELD_TYPE_USDZ);
		setUint16(extraFieldUSDZView, 2, extraBytesLength - 4);
		const previousLocalHeaderArray = localHeaderArray;
		headerInfo.localHeaderArray = localHeaderArray = new Uint8Array(getLength(previousLocalHeaderArray) + extraBytesLength);
		arraySet(localHeaderArray, previousLocalHeaderArray);
		arraySet(localHeaderArray, rawExtraFieldUSDZ, getLength(previousLocalHeaderArray));
		const localHeaderArrayView = getDataView(localHeaderArray);
		setUint16(localHeaderArrayView, 28, extraFieldLength + extraBytesLength);
		headerInfo.localHeaderView = localHeaderArrayView;
		entryInfo.metadataSize += extraBytesLength;
	}

	function packUnixId(id) {
		if (id === UNDEFINED_VALUE) {
			return EMPTY_UINT8_ARRAY;
		} else {
			const dataArray = new Uint8Array(4);
			const dataView = getDataView(dataArray);
			dataView.setUint32(0, id, true);
			let length = 4;
			while (length > 1 && dataArray[length - 1] === 0) {
				length--;
			}
			return dataArray.subarray(0, length);
		}
	}

	function normalizeMsdosAttributes(msdosAttributesRaw, msdosAttributes) {
		if (msdosAttributesRaw !== UNDEFINED_VALUE) {
			msdosAttributesRaw = msdosAttributesRaw & MAX_8_BITS;
		} else if (msdosAttributes !== UNDEFINED_VALUE) {
			const { readOnly, hidden, system, directory: msdDir, archive } = msdosAttributes;
			let raw = 0;
			if (readOnly) raw |= FILE_ATTR_MSDOS_READONLY_MASK;
			if (hidden) raw |= FILE_ATTR_MSDOS_HIDDEN_MASK;
			if (system) raw |= FILE_ATTR_MSDOS_SYSTEM_MASK;
			if (msdDir) raw |= FILE_ATTR_MSDOS_DIR_MASK;
			if (archive) raw |= FILE_ATTR_MSDOS_ARCHIVE_MASK;
			msdosAttributesRaw = raw & MAX_8_BITS;
		}
		if (msdosAttributes === UNDEFINED_VALUE) {
			msdosAttributes = {
				readOnly: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_READONLY_MASK),
				hidden: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_HIDDEN_MASK),
				system: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_SYSTEM_MASK),
				directory: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_DIR_MASK),
				archive: Boolean(msdosAttributesRaw & FILE_ATTR_MSDOS_ARCHIVE_MASK)
			};
		}
		return { msdosAttributesRaw, msdosAttributes };
	}

	function getDataDescriptorInfo({
		zip64,
		dataDescriptor,
		dataDescriptorSignature
	}) {
		let dataDescriptorArray = EMPTY_UINT8_ARRAY;
		let dataDescriptorView, dataDescriptorOffset = 0;
		let dataDescriptorLength = zip64 ? DATA_DESCRIPTOR_RECORD_ZIP_64_LENGTH : DATA_DESCRIPTOR_RECORD_LENGTH;
		if (dataDescriptorSignature) {
			dataDescriptorLength += DATA_DESCRIPTOR_RECORD_SIGNATURE_LENGTH;
		}
		if (dataDescriptor) {
			dataDescriptorArray = new Uint8Array(dataDescriptorLength);
			dataDescriptorView = getDataView(dataDescriptorArray);
			if (dataDescriptorSignature) {
				dataDescriptorOffset = DATA_DESCRIPTOR_RECORD_SIGNATURE_LENGTH;
				setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
			}
		}
		return {
			dataDescriptorArray,
			dataDescriptorView,
			dataDescriptorOffset
		};
	}

	function setEntryInfo({
		signature,
		compressedSize,
		uncompressedSize,
		headerInfo,
		dataDescriptorInfo
	}, {
		zip64,
		zipCrypto,
		dataDescriptor
	}) {
		const {
			headerView,
			encrypted
		} = headerInfo;
		const {
			dataDescriptorView,
			dataDescriptorOffset
		} = dataDescriptorInfo;
		if ((!encrypted || zipCrypto) && signature !== UNDEFINED_VALUE) {
			setUint32(headerView, HEADER_OFFSET_SIGNATURE, signature);
			if (dataDescriptor) {
				setUint32(dataDescriptorView, dataDescriptorOffset, signature);
			}
		}
		if (zip64) {
			if (dataDescriptor) {
				setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
				setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
			}
		} else {
			setUint32(headerView, HEADER_OFFSET_COMPRESSED_SIZE, compressedSize);
			setUint32(headerView, HEADER_OFFSET_UNCOMPRESSED_SIZE, uncompressedSize);
			if (dataDescriptor) {
				setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
				setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
			}
		}
	}

	function updateLocalHeader({
		rawFilename,
		encrypted,
		zip64,
		localExtraFieldZip64Length,
		signature,
		compressedSize,
		uncompressedSize,
		zip64UncompressedSize,
		zip64CompressedSize
	}, localHeaderView, { dataDescriptor }) {
		if (!dataDescriptor) {
			if (!encrypted) {
				setUint32(localHeaderView, HEADER_OFFSET_SIGNATURE + LOCAL_HEADER_COMMON_OFFSET, signature);
			}
			if (!zip64CompressedSize) {
				setUint32(localHeaderView, HEADER_OFFSET_COMPRESSED_SIZE + LOCAL_HEADER_COMMON_OFFSET, compressedSize);
			}
			if (!zip64UncompressedSize) {
				setUint32(localHeaderView, HEADER_OFFSET_UNCOMPRESSED_SIZE + LOCAL_HEADER_COMMON_OFFSET, uncompressedSize);
			}
		}
		if (zip64 && localExtraFieldZip64Length) {
			const localHeaderOffset = HEADER_SIZE + getLength(rawFilename) + 4;
			setBigUint64(localHeaderView, localHeaderOffset, BigInt(uncompressedSize));
			setBigUint64(localHeaderView, localHeaderOffset + 8, BigInt(compressedSize));
		}
	}


	async function closeFile(zipWriter, comment, options) {
		const directoryDataLength = createDirectoryRecords(zipWriter.files);
		const { cdStartDiskNumber, cdStartDiskOffset } = await writeDirectoryRecords(zipWriter, directoryDataLength, options);
		await writeEndOfDirectoryRecord(zipWriter, comment, options, { cdStartDiskNumber, cdStartDiskOffset, directoryDataLength });
	}

	function createDirectoryRecords(files) {
		let directoryDataLength = 0;
		for (const [, fileEntry] of files) {
			const {
				rawFilename,
				rawExtraFieldAES,
				rawComment,
				rawExtraFieldNTFS,
				rawExtraFieldUnix,
				rawExtraField,
				extendedTimestamp,
				extraFieldExtendedTimestampFlag,
				lastModDate,
				zip64UncompressedSize,
				zip64CompressedSize,
				uncompressedSize,
				compressedSize
			} = fileEntry;
			const zip64Offset = fileEntry.offset >= MAX_32_BITS;
			const zip64DiskNumberStart = fileEntry.diskNumberStart >= MAX_16_BITS;
			let rawExtraFieldZip64;
			if (zip64Offset || zip64DiskNumberStart || zip64UncompressedSize || zip64CompressedSize) {
				const length = 4 + (zip64UncompressedSize ? 8 : 0) + (zip64CompressedSize ? 8 : 0) + (zip64Offset ? 8 : 0) + (zip64DiskNumberStart ? 4 : 0);
				const extraFieldZip64 = createRecordWriter(length);
				extraFieldZip64.uint16(EXTRAFIELD_TYPE_ZIP64);
				extraFieldZip64.uint16(length - 4);
				if (zip64UncompressedSize) {
					extraFieldZip64.uint64(uncompressedSize);
				}
				if (zip64CompressedSize) {
					extraFieldZip64.uint64(compressedSize);
				}
				if (zip64Offset) {
					extraFieldZip64.uint64(fileEntry.offset);
				}
				if (zip64DiskNumberStart) {
					extraFieldZip64.uint32(fileEntry.diskNumberStart);
				}
				rawExtraFieldZip64 = extraFieldZip64.array;
			} else {
				rawExtraFieldZip64 = EMPTY_UINT8_ARRAY;
			}
			fileEntry.rawExtraFieldZip64 = rawExtraFieldZip64;
			fileEntry.zip64Offset = zip64Offset;
			fileEntry.zip64DiskNumberStart = zip64DiskNumberStart;
			let rawExtraFieldTimestamp;
			const lastModTimeUnix = getTimeUnix(lastModDate);
			if (extendedTimestamp && inUnixTimeRange(lastModTimeUnix)) {
				const extraFieldTimestamp = createRecordWriter(9);
				extraFieldTimestamp.uint16(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
				extraFieldTimestamp.uint16(5);
				extraFieldTimestamp.uint8(extraFieldExtendedTimestampFlag);
				extraFieldTimestamp.uint32(lastModTimeUnix);
				rawExtraFieldTimestamp = extraFieldTimestamp.array;
			} else {
				rawExtraFieldTimestamp = EMPTY_UINT8_ARRAY;
			}
			fileEntry.rawExtraFieldExtendedTimestamp = rawExtraFieldTimestamp;
			const extraFieldLength = getLength(
				rawExtraFieldZip64,
				rawExtraFieldAES,
				rawExtraFieldNTFS,
				rawExtraFieldUnix,
				rawExtraFieldTimestamp,
				rawExtraField);
			if (extraFieldLength > MAX_16_BITS) {
				throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
			}
			directoryDataLength += CENTRAL_FILE_HEADER_LENGTH + getLength(rawFilename, rawComment) + extraFieldLength;
		}
		return directoryDataLength;
	}

	async function writeDirectoryRecords(zipWriter, directoryDataLength, options) {
		const { files, writer } = zipWriter;
		const directoryArray = new Uint8Array(directoryDataLength);
		await initStream(writer);
		let offset = 0;
		let directoryDiskOffset = 0;
		let cdStartDiskNumber = writer.diskNumber;
		let cdStartDiskOffset = writer.diskOffset;
		for (const [indexFileEntry, fileEntry] of Array.from(files.values()).entries()) {
			const {
				offset: fileEntryOffset,
				rawFilename,
				rawExtraFieldZip64,
				rawExtraFieldAES,
				rawExtraFieldExtendedTimestamp,
				rawExtraFieldNTFS,
				rawExtraFieldUnix,
				rawExtraField,
				rawComment,
				versionMadeBy,
				headerArray,
				headerView,
				zip64UncompressedSize,
				zip64CompressedSize,
				zip64DiskNumberStart,
				zip64Offset,
				internalFileAttributes,
				externalFileAttributes,
				diskNumberStart,
				uncompressedSize,
				compressedSize
			} = fileEntry;
			const extraFieldLength = getLength(rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField);
			const directoryRecordLength = CENTRAL_FILE_HEADER_LENGTH + getLength(rawFilename, rawComment) + extraFieldLength;
			if (offset + directoryRecordLength - directoryDiskOffset > writer.availableSize) {
				await writeData(writer, directoryArray.slice(directoryDiskOffset, offset));
				directoryDiskOffset = offset;
				writer.availableSize = 0;
				await writeData(writer, EMPTY_UINT8_ARRAY);
			}
			if (indexFileEntry == 0) {
				cdStartDiskNumber = writer.diskNumber;
				cdStartDiskOffset = writer.diskOffset;
			}
			if (!zip64UncompressedSize) {
				setUint32(headerView, HEADER_OFFSET_UNCOMPRESSED_SIZE, uncompressedSize);
			}
			if (!zip64CompressedSize) {
				setUint32(headerView, HEADER_OFFSET_COMPRESSED_SIZE, compressedSize);
			}
			if ((zip64Offset || zip64DiskNumberStart) && fileEntry.version < VERSION_ZIP64) {
				setUint16(headerView, HEADER_OFFSET_VERSION, VERSION_ZIP64);
			}
			const directoryRecord = createRecordWriter(directoryRecordLength);
			directoryRecord.uint32(CENTRAL_FILE_HEADER_SIGNATURE);
			directoryRecord.uint16(versionMadeBy);
			directoryRecord.bytes(headerArray.subarray(0, HEADER_SIZE - 4 - 2));
			directoryRecord.uint16(extraFieldLength);
			directoryRecord.uint16(getLength(rawComment));
			directoryRecord.uint16(zip64DiskNumberStart ? MAX_16_BITS : diskNumberStart);
			directoryRecord.uint16(internalFileAttributes);
			directoryRecord.uint32(externalFileAttributes);
			directoryRecord.uint32(zip64Offset ? MAX_32_BITS : fileEntryOffset);
			directoryRecord.bytes(rawFilename);
			directoryRecord.bytes(rawExtraFieldZip64);
			directoryRecord.bytes(rawExtraFieldAES);
			directoryRecord.bytes(rawExtraFieldExtendedTimestamp);
			directoryRecord.bytes(rawExtraFieldNTFS);
			directoryRecord.bytes(rawExtraFieldUnix);
			directoryRecord.bytes(rawExtraField);
			directoryRecord.bytes(rawComment);
			arraySet(directoryArray, directoryRecord.array, offset);
			offset += directoryRecordLength;
			if (options.onprogress) {
				try {
					await options.onprogress(indexFileEntry + 1, files.size, new Entry(fileEntry));
				} catch {
					// ignored
				}
			}
		}
		await writeData(writer, directoryDiskOffset ? directoryArray.slice(directoryDiskOffset) : directoryArray);
		return { cdStartDiskNumber, cdStartDiskOffset };
	}

	async function writeEndOfDirectoryRecord(zipWriter, comment, options, cdInfo) {
		const { writer } = zipWriter;
		const { cdStartDiskNumber, cdStartDiskOffset } = cdInfo;
		let { directoryDataLength } = cdInfo;
		let filesLength = zipWriter.files.size;
		let diskNumber = cdStartDiskNumber;
		let directoryOffset = zipWriter.offset - cdStartDiskOffset - (cdStartDiskNumber ? zipWriter.initialOffset : 0);
		let lastDiskNumber = writer.diskNumber;
		if (writer.availableSize < END_OF_CENTRAL_DIR_LENGTH) {
			lastDiskNumber++;
		}
		let zip64 = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIP64);
		if (directoryOffset >= MAX_32_BITS || directoryDataLength >= MAX_32_BITS || filesLength >= MAX_16_BITS || lastDiskNumber >= MAX_16_BITS) {
			if (zip64 === false) {
				throw new Error(ERR_UNSUPPORTED_FORMAT);
			} else {
				zip64 = true;
			}
		}
		const commentLength = getLength(comment);
		if (commentLength > MAX_16_BITS) {
			throw new Error(ERR_INVALID_COMMENT);
		}
		const endOfdirectoryRecord = createRecordWriter(zip64 ? ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : END_OF_CENTRAL_DIR_LENGTH);
		if (getLength(endOfdirectoryRecord.array) + commentLength > writer.availableSize) {
			writer.availableSize = 0;
			await writeData(writer, EMPTY_UINT8_ARRAY);
		}
		lastDiskNumber = writer.diskNumber;
		if (zip64) {
			endOfdirectoryRecord.uint32(ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
			endOfdirectoryRecord.uint64(44);
			endOfdirectoryRecord.uint16(45);
			endOfdirectoryRecord.uint16(45);
			endOfdirectoryRecord.uint32(lastDiskNumber);
			endOfdirectoryRecord.uint32(diskNumber);
			endOfdirectoryRecord.uint64(filesLength);
			endOfdirectoryRecord.uint64(filesLength);
			endOfdirectoryRecord.uint64(directoryDataLength);
			endOfdirectoryRecord.uint64(directoryOffset);
			endOfdirectoryRecord.uint32(ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
			endOfdirectoryRecord.uint32(lastDiskNumber);
			endOfdirectoryRecord.uint64(BigInt(zipWriter.offset) + BigInt(directoryDataLength) - BigInt(writer.diskOffset) - BigInt(writer.diskNumber ? zipWriter.initialOffset : 0));
			endOfdirectoryRecord.uint32(lastDiskNumber + 1);
			const supportZip64SplitFile = getOptionValue(zipWriter, options, OPTION_SUPPORT_ZIP64_SPLIT_FILE, true);
			if (supportZip64SplitFile) {
				lastDiskNumber = MAX_16_BITS;
				diskNumber = MAX_16_BITS;
			}
			filesLength = MAX_16_BITS;
			directoryOffset = MAX_32_BITS;
			directoryDataLength = MAX_32_BITS;
		}
		endOfdirectoryRecord.uint32(END_OF_CENTRAL_DIR_SIGNATURE);
		endOfdirectoryRecord.uint16(lastDiskNumber);
		endOfdirectoryRecord.uint16(diskNumber);
		endOfdirectoryRecord.uint16(filesLength);
		endOfdirectoryRecord.uint16(filesLength);
		endOfdirectoryRecord.uint32(directoryDataLength);
		endOfdirectoryRecord.uint32(directoryOffset);
		endOfdirectoryRecord.uint16(commentLength);
		await writeData(writer, endOfdirectoryRecord.array);
		if (commentLength) {
			await writeData(writer, comment);
		}
	}

	function createRecordWriter(length) {
		const array = new Uint8Array(length);
		const view = getDataView(array);
		let offset = 0;
		return {
			array,
			uint8: value => { setUint8(view, offset, value); offset += 1; },
			uint16: value => { setUint16(view, offset, value); offset += 2; },
			uint32: value => { setUint32(view, offset, value); offset += 4; },
			uint64: value => { setBigUint64(view, offset, BigInt(value)); offset += 8; },
			bytes: value => { arraySet(array, value, offset); offset += getLength(value); },
			skip: count => offset += count
		};
	}

	function getSegmentOffset(zipWriter, writer) {
		return zipWriter.offset - writer.diskOffset - (writer.diskNumber ? zipWriter.initialOffset : 0);
	}

	async function writeData(writer, array) {
		const { writable } = writer;
		const streamWriter = writable.getWriter();
		try {
			await streamWriter.ready;
			writer.size += getLength(array);
			await streamWriter.write(array);
		} finally {
			streamWriter.releaseLock();
		}
	}

	async function flushBufferedData(readable, writer, signal, onChunkWritten) {
		const streamWriter = writer.writable.getWriter();
		try {
			await readable.pipeTo(new WritableStream({
				async write(chunk) {
					await streamWriter.ready;
					await streamWriter.write(chunk);
					onChunkWritten(getLength(chunk));
				}
			}), { preventClose: true, preventAbort: true, signal });
		} finally {
			streamWriter.releaseLock();
		}
	}

	function getTimeNTFS(date) {
		if (date) {
			return ((BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000));
		}
	}

	function getTimeUnix(date) {
		return Math.floor(date.getTime() / 1000);
	}

	function inUnixTimeRange(timeUnix) {
		return timeUnix >= MIN_UNIX_TIME && timeUnix <= MAX_UNIX_TIME;
	}

	function clampUnixTime(timeUnix) {
		return Math.min(MAX_UNIX_TIME, Math.max(MIN_UNIX_TIME, timeUnix));
	}

	function getOptionValue(zipWriter, options, name, defaultValue) {
		const result = options[name] === UNDEFINED_VALUE ? zipWriter.options[name] : options[name];
		return result === UNDEFINED_VALUE ? defaultValue : result;
	}

	function getMaximumCompressedSize(uncompressedSize) {
		return uncompressedSize + (5 * (Math.floor(uncompressedSize / 16383) + 1));
	}

	function setUint8(view, offset, value) {
		view.setUint8(offset, value);
	}

	function setUint16(view, offset, value) {
		view.setUint16(offset, value, true);
	}

	function setUint32(view, offset, value) {
		view.setUint32(offset, value, true);
	}

	function setBigUint64(view, offset, value) {
		view.setBigUint64(offset, value, true);
	}

	function arraySet(array, typedArray, offset) {
		array.set(typedArray, offset);
	}

	function getDataView(array) {
		return new DataView(array.buffer, array.byteOffset, array.byteLength);
	}

	function getLength(...arrayLikes) {
		let result = 0;
		arrayLikes.forEach(arrayLike => arrayLike && (result += arrayLike.length));
		return result;
	}

	function getHeaderArrayData({
		version,
		bitFlag,
		compressionMethod,
		uncompressedSize,
		compressedSize,
		lastModDate,
		rawLastModDate,
		rawFilename,
		zip64CompressedSize,
		zip64UncompressedSize,
		extraFieldLength
	}) {
		const headerRecord = createRecordWriter(HEADER_SIZE - 4);
		const headerArray = headerRecord.array;
		const headerView = getDataView(headerArray);
		headerRecord.uint16(version);
		headerRecord.uint16(bitFlag);
		headerRecord.uint16(compressionMethod);
		if (rawLastModDate === UNDEFINED_VALUE) {
			const dateArray = new Uint32Array(1);
			const dateView = getDataView(dateArray);
			setUint16(dateView, 0, (((lastModDate.getHours() << 6) | lastModDate.getMinutes()) << 5) | lastModDate.getSeconds() / 2);
			setUint16(dateView, 2, ((((lastModDate.getFullYear() - 1980) << 4) | (lastModDate.getMonth() + 1)) << 5) | lastModDate.getDate());
			rawLastModDate = dateArray[0];
		}
		headerRecord.uint32(rawLastModDate);
		headerRecord.skip(4);
		if (zip64CompressedSize || compressedSize !== UNDEFINED_VALUE) {
			headerRecord.uint32(zip64CompressedSize ? MAX_32_BITS : compressedSize);
		} else {
			headerRecord.skip(4);
		}
		if (zip64UncompressedSize || uncompressedSize !== UNDEFINED_VALUE) {
			headerRecord.uint32(zip64UncompressedSize ? MAX_32_BITS : uncompressedSize);
		} else {
			headerRecord.skip(4);
		}
		headerRecord.uint16(getLength(rawFilename));
		headerRecord.uint16(extraFieldLength);
		return {
			headerArray,
			headerView,
			rawLastModDate
		};
	}

	function getBitFlag(level, useUnicodeFileNames, dataDescriptor, encrypted, compressionMethod) {
		let bitFlag = 0;
		if (useUnicodeFileNames) {
			bitFlag = bitFlag | BITFLAG_LANG_ENCODING_FLAG;
		}
		if (dataDescriptor) {
			bitFlag = bitFlag | BITFLAG_DATA_DESCRIPTOR;
		}
		if (compressionMethod == COMPRESSION_METHOD_DEFLATE || compressionMethod == COMPRESSION_METHOD_DEFLATE_64) {
			if (level >= 0 && level <= 3) {
				bitFlag = bitFlag | BITFLAG_LEVEL_SUPER_FAST_MASK;
			}
			if (level > 3 && level <= 5) {
				bitFlag = bitFlag | BITFLAG_LEVEL_FAST_MASK;
			}
			if (level == 9) {
				bitFlag = bitFlag | BITFLAG_LEVEL_MAX_MASK;
			}
		}
		if (encrypted) {
			bitFlag = bitFlag | BITFLAG_ENCRYPTED;
		}
		return bitFlag;
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

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


	function getMimeType() {
		return "application/octet-stream";
	}

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


	const DEFAULT_THRESHOLD$2 = 1024 * 1024;
	const DEFAULT_DIRECTORY_NAME$1 = ".zip.js-temp";

	function createOPFSTempStream(options = {}) {
		const {
			thresholdBytes = DEFAULT_THRESHOLD$2,
			directoryName = DEFAULT_DIRECTORY_NAME$1,
			getDirectory = () => navigator.storage.getDirectory()
		} = options;
		let directoryHandlePromise;
		function getTempDirectory() {
			if (!directoryHandlePromise) {
				directoryHandlePromise = Promise.resolve(getDirectory())
					.then(root => root.getDirectoryHandle(directoryName, { create: true }));
			}
			return directoryHandlePromise;
		}
		return function () {
			const memoryChunks = [];
			let bufferedSize = 0;
			let spilled = false;
			let fileName, fileHandle, fileWriter, fileReader;

			async function spillToFile() {
				const directoryHandle = await getTempDirectory();
				fileName = crypto.randomUUID();
				fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
				fileWriter = (await fileHandle.createWritable()).getWriter();
				spilled = true;
				for (const chunk of memoryChunks) {
					await fileWriter.write(chunk);
				}
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


	const DEFAULT_THRESHOLD$1 = 1024 * 1024;

	function createBlobTempStream(options = {}) {
		const {
			thresholdBytes = DEFAULT_THRESHOLD$1
		} = options;
		return function () {
			const memoryChunks = [];
			let bufferedSize = 0;
			let spilled = false;
			let blobWriter, blobPromise, blobReader;

			async function spillToBlob() {
				const transformStream = new TransformStream();
				blobPromise = new Response(transformStream.readable).blob();
				blobWriter = transformStream.writable.getWriter();
				spilled = true;
				for (const chunk of memoryChunks) {
					await blobWriter.write(chunk);
				}
				memoryChunks.length = 0;
			}

			const writable = new WritableStream({
				async write(chunk) {
					if (spilled) {
						await blobWriter.write(chunk);
					} else {
						memoryChunks.push(chunk);
						bufferedSize += chunk.length;
						if (bufferedSize > thresholdBytes) {
							await spillToBlob();
						}
					}
				},
				async close() {
					if (blobWriter) {
						await blobWriter.close();
						blobWriter = null;
					}
				}
			});

			let memoryIndex = 0;
			const readable = new ReadableStream({
				async pull(controller) {
					if (spilled) {
						if (!blobReader) {
							const blob = await blobPromise;
							blobReader = blob.stream().getReader();
						}
						const { value, done } = await blobReader.read();
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
					if (blobReader) {
						await blobReader.cancel(reason);
					}
				}
			}, { highWaterMark: 0 });
			async function dispose() {
				if (blobWriter) {
					try {
						await blobWriter.abort();
					} catch {
						// ignored
					}
					blobWriter = null;
				}
				if (blobPromise) {
					blobPromise.catch(() => {
						// ignored
					});
					blobPromise = null;
				}
				memoryChunks.length = 0;
			}

			return { writable, readable, dispose };
		};
	}

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


	const DEFAULT_THRESHOLD = 1024 * 1024;
	const DEFAULT_DIRECTORY_NAME = ".zip.js-temp";
	const READ_CHUNK_SIZE = 512 * 1024;
	const ERR_UNSUPPORTED_CONTEXT = "createSyncAccessHandle is only available in dedicated workers";

	function createSyncAccessHandleTempStream(options = {}) {
		const {
			thresholdBytes = DEFAULT_THRESHOLD,
			directoryName = DEFAULT_DIRECTORY_NAME,
			getDirectory
		} = options;
		if (!getDirectory &&
			(typeof FileSystemFileHandle == "undefined" || !FileSystemFileHandle.prototype.createSyncAccessHandle)) {
			throw new Error(ERR_UNSUPPORTED_CONTEXT);
		}
		const getRootDirectory = getDirectory || (() => navigator.storage.getDirectory());
		let directoryHandlePromise;
		function getTempDirectory() {
			if (!directoryHandlePromise) {
				directoryHandlePromise = Promise.resolve(getRootDirectory())
					.then(root => root.getDirectoryHandle(directoryName, { create: true }));
			}
			return directoryHandlePromise;
		}
		return function () {
			const memoryChunks = [];
			let bufferedSize = 0;
			let spilled = false;
			let fileName, accessHandle;
			let writeOffset = 0;
			let readOffset = 0;

			async function spillToFile() {
				const directoryHandle = await getTempDirectory();
				fileName = crypto.randomUUID();
				const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
				accessHandle = await fileHandle.createSyncAccessHandle();
				spilled = true;
				for (const chunk of memoryChunks) {
					accessHandle.write(chunk, { at: writeOffset });
					writeOffset += chunk.length;
				}
				memoryChunks.length = 0;
			}

			const writable = new WritableStream({
				async write(chunk) {
					if (spilled) {
						accessHandle.write(chunk, { at: writeOffset });
						writeOffset += chunk.length;
					} else {
						memoryChunks.push(chunk);
						bufferedSize += chunk.length;
						if (bufferedSize > thresholdBytes) {
							await spillToFile();
						}
					}
				},
				close() {
					if (accessHandle) {
						accessHandle.flush();
					}
				}
			});

			let memoryIndex = 0;
			const readable = new ReadableStream({
				pull(controller) {
					if (spilled) {
						const remaining = writeOffset - readOffset;
						if (remaining <= 0) {
							controller.close();
							return;
						}
						const buffer = new Uint8Array(Math.min(READ_CHUNK_SIZE, remaining));
						const read = accessHandle.read(buffer, { at: readOffset });
						if (read) {
							readOffset += read;
							controller.enqueue(buffer.subarray(0, read));
						} else {
							controller.close();
						}
					} else if (memoryIndex < memoryChunks.length) {
						controller.enqueue(memoryChunks[memoryIndex++]);
					} else {
						controller.close();
					}
				}
			}, { highWaterMark: 0 });
			async function dispose() {
				if (accessHandle) {
					try {
						accessHandle.close();
					} catch {
						// ignored
					}
					accessHandle = null;
				}
				if (fileName) {
					try {
						const directoryHandle = await getTempDirectory();
						await directoryHandle.removeEntry(fileName);
					} catch {
						// ignored
					}
					fileName = null;
				}
				memoryChunks.length = 0;
			}

			return { writable, readable, dispose };
		};
	}

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


	try {
		configure({ baseURI: (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('zip-native.js', document.baseURI).href)) });
	} catch {
		// ignored
	}

	var{Uint8Array:x,Uint16Array:E,Int32Array:H,TransformStream:U,Math:N,Error:z,Array:v}=globalThis,Se=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Z=new x(0),je=new E(0),de=[];for(let e=0;e<6;e++)de.push(e,0==e?8:4);de.push(0,1);var Ee=[];for(let e=0;e<14;e++)Ee.push(e,0==e?4:2);var ge=new E([0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576]),Te=new E([0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0]);function M(e,t,n,r,i){if(0==i)return;let f=e instanceof x?e:new x(e.buffer,e.byteOffset,e.byteLength),_=n instanceof x?n.subarray(r,r+i):new x(n.buffer,n.byteOffset+r,i);f.set(_,t);}function Ve(e,t,n){0!=n&&(e instanceof x?e:new x(e.buffer,e.byteOffset,e.byteLength)).fill(0,t,t+n);}function Je(){return {next_in:Z,next_in_index:0,avail_in:0,total_in:0,next_out:Z,next_out_index:0,avail_out:0,total_out:0,msg:"",t:0,i:0,_:0,l:void 0}}function Qe(e,t){let n=1<<t;return {o:e,u:new x(n),h:n,v:t,k:0,m:0,p:0,I:0}}function te(e){let t=[];for(let n=0;n<e.length;n+=2){let r=e[n],i=e[n+1];for(let e=0;e<i;e++)t.push(r);}return new E(t)}var ne=class{constructor(e,t){this.L=e,this.M=t,this.Z=0;}},re=class{constructor(e,t,n,r,i){this.W=e,this.N=t,this.V=n,this.S=r,this.q=i;}};function w_(e){return J_[e<-6||e>2?9:2-e]||""}function Ae(e,t){try{e.msg=w_(t);}catch(n){e.msg="zlib error "+String(t)+" ("+n+")";}return t}function e_(e,t){let n=e>>>0,r=0;for(let e=0;e<t;e++)r=r<<1|1&n,n>>>=1;return r}function g(e,t){e.A[e.$++]=t;}function De(e,t){g(e,255&t),g(e,t>>>8&255);}function __(e,t,n){let r=255&n,i=65535&t,f=e.D+e.O;return e.A[f]=255&i,e.A[f+1]=i>>>8&255,e.A[f+2]=r,e.O+=3,i=i-1&65535,e.B[t_[r]+ie+1].T++,e.R[A_(i)].T++,e.O==e.U}function ye(e,t){let n=255&t,r=e.D+e.O;return e.A[r]=0,e.A[r+1]=0,e.A[r+2]=n,e.O+=3,e.B[n].T++,e.O==e.U}function ve(e){return e.h-ae}function A_(e){return e<256?T_[e]:T_[256+(e>>7)]}function D_(e){let t=He+7,n=1<<t,r=(1<<t)-1,i=N.floor((t+I-1)/I),f=1<<8+He;return {...Qe(e,15),o:e,P:42,F:0,H:void 0,Y:32767,X:t,J:n,K:r,C:i,j:new E(32768),G:new E(n),ee:f,A:new x(32768),te:0,ne:32768,$:0,re:0,ie:0,fe:0,_e:0,le:0,oe:-2,ae:0,ue:0,ce:0,se:0,de:0,he:0,we:0,be:0,ge:0,ve:0,ke:0,me:0,xe:0,pe:0,ye:new H(2*we+1),Ie:new x(2*we+1),Le:new E(be+1),O:0,U:0,Me:Z,D:0,ze:0,Ee:0,Ze:8,We:32768,Ne:0,Ve:0,Qe:0,B:new v(le).fill(0).map(()=>Q()),R:new v(2*me+1).fill(0).map(()=>Q()),Se:new v(2*oe+1).fill(0).map(()=>Q()),qe:g_(),Ae:g_(),$e:g_()}}function y_(e){let t=[];for(let n=0;n<e.length;n+=2){let r=e[n],i=e[n+1],f=Q();f.De=r,f.Oe=i,t.push(f);}return t}function Q(){return {T:0,De:0,Te:0,Oe:0}}function g_(){return new ne([],cn(null,Z,0,0,0))}function cn(e,t,n,r,i){return new re(e,t,n,r,i)}function Q_(){let e=new v(288).fill(0);for(let t=0;t<=143;t++)e[t]=8;for(let t=144;t<=255;t++)e[t]=9;for(let t=256;t<=279;t++)e[t]=7;for(let t=280;t<=287;t++)e[t]=8;return e}function v_(e){let{code:t,length:n}=dn(e),r=new E(2*e.length),i=0;for(let f=0;f<e.length;f++){let e=n[f]||0,_=t[f]||0;r[i++]=e?e_(_,e):0,r[i++]=e;}return new E(r)}function $_(e,t,n){let r=0;for(let n=0;n<e.length;n++){let i=t[n]?1<<t[n]:1,f=e[n]+i-1;f>r&&(r=f);}r<n&&(r=n);let i=new x(r+1);for(let n=0;n<=r;n++)for(let r=0;r<e.length;r++){let f=t[r]?1<<t[r]:1,_=e[r];if(n>=_&&n<=_+f-1){i[n]=r;break}}let f=0;for(let n=0;n<e.length-1;n++){let r=t[n]?1<<t[n]:1,i=e[n]+r-1;i>f&&(f=i);}return i[f]=e.length-1,i}function et(e,t){let n=0;for(let r=0;r<e.length;r++){let i=t[r]?1<<t[r]:1,f=e[r]+i-1;f>n&&(n=f);}let r=new x(n+1);for(let i=0;i<=n;i++)for(let n=0;n<e.length;n++){let f=t[n]?1<<t[n]:1,_=e[n];if(i>=_&&i<=_+f-1){r[i]=n;break}}return r}function _t(e){let t=new x(512),n=e.length-1;for(let r=0;r<256;r++)t[r]=r<=n?e[r]:e[n];for(let r=256;r<=n;r++){let n=r>>7;t[256+(n>255?255:n)]=e[r];}for(let e=257;e<512;e++)0==t[e]&&(t[e]=t[e-1]);return t}function dn(e){let t=N.max(...e),n=new v(t+1).fill(0);for(let t of e)t>0&&n[t]++;let r=new v(e.length).fill(0),i=new v(t+1).fill(0),f=0;for(let e=1;e<=t;e++)f=f+n[e-1]<<1,i[e]=f;for(let t=0;t<e.length;t++){let n=e[t];0!=n&&(r[t]=i[n]++);}return {code:r,length:e}}var He=8,I=3,_e=258,ae=_e+I+1,tt=4096,Ue=16,Be=_e,mn=29,ie=256,we=ie+1+mn,me=30,oe=19,le=2*we+1,be=15,nt=9,rt=255,at=32,it=4,Ie=256,n_=16,r_=17,a_=18,ot=0,I_=1,lt=2,$=-1,J_=["need dictionary","stream end","","file error","stream error","data error","insufficient memory","buffer error",""],i_=te(de),o_=te(Ee),Fe=new E(19);Fe[16]=2,Fe[17]=3,Fe[18]=7;var bn=v_(Q_()),sn=v_(new v(30).fill(5)),Ze=y_(bn),k_=y_(sn),t_=$_(Te,i_,_e),T_=_t(et(ge,o_));function Pe(e){return e%65521>>>0}function se(e,t,n){if(void 0===t||void 0===n)return 1;let r=e>>>16&65535;if(e&=65535,1==n)return (e+=t[0])>=65521&&(e-=65521),r+=e,r>=65521&&(r-=65521),(r<<16|e)>>>0;if(n<16){for(let i=0;i<n;i++)r+=e+=t[i];return e>=65521&&(e-=65521),r=Pe(r),(r<<16|e)>>>0}for(;n>=5552;){n-=5552;let i=N.floor(347);do{for(let n=0;n<16;n++)r+=e+=t[n];t=t.subarray(16);}while(--i);e=Pe(e),r=Pe(r);}if(n){for(;n>=16;){n-=16;for(let n=0;n<16;n++)r+=e+=t[n];t=t.subarray(16);}for(let i=0;i<n;i++)r+=e+=t[i];e=Pe(e),r=Pe(r);}return (r<<16|e)>>>0}var Me=[[],[],[],[],[],[],[],[]];for(let e=0;e<256;e++){let t=e;for(let e=0;e<8;e++)t=1&t?3988292384^t>>>1:t>>>1;Me[0][e]=t;}for(let e=0;e<256;e++)for(let t=1;t<8;t++){let n=Me[t-1][e];Me[t][e]=n>>>8^Me[0][255&n];}var[ft,hn,xn,pn,Sn,En,gn,Tn]=Me;function W(e=0,t,n){if(!t)return 0;void 0===n&&(n=t.length);let r=0|~e,i=0;if((n=N.min(n,t.length))>=8){let e=new DataView(t.buffer,t.byteOffset,n),f=n-8;for(;i<=f;i+=8){let t=r^e.getInt32(i,true),n=e.getInt32(i+4,true);r=Tn[255&t]^gn[t>>>8&255]^En[t>>>16&255]^Sn[t>>>24&255]^pn[255&n]^xn[n>>>8&255]^hn[n>>>16&255]^ft[n>>>24&255];}}for(;i<n;i++)r=r>>>8^ft[255&(r^t[i])];return (4294967295^r)>>>0}function ht(e){16==e.I?(De(e,e.p),e.p=0,e.I=0):e.I>=8&&(g(e,e.p),e.p>>=8,e.I-=8);}function xt(e){e.I>8?De(e,e.p):e.I>0&&g(e,e.p),e.ze=1+(e.I-1&7),e.p=0,e.I=0;}function wn(e,t,n){let r,i,f=[],_=0;for(r=1;r<=be;r++)_=_+n[r-1]<<1,f[r]=_;for(i=0;i<=t;i++){let t=e[i].Oe;0!=t&&(e[i].De=e_(f[t]++,t));}}function L(e,t,n){e.I>Ue-n?(e.p=65535&(e.p|t<<e.I),De(e,e.p),e.p=t>>Ue-e.I&65535,e.I+=n-Ue):(e.p=65535&(e.p|t<<e.I),e.I+=n);}function pt(e){for(let t=0;t<e.B.length;t++)e.B[t].T=0;for(let t=0;t<e.R.length;t++)e.R[t].T=0;for(let t=0;t<e.Se.length;t++)e.Se[t].T=0;e.B[Ie].T=1,e.ie=e.fe=0,e.O=e._e=0;}function St(e){if(e.B&&e.B.length>=le)for(let t=0;t<le;t++)e.B[t]=Q();else {e.B=[];for(let t=0;t<le;t++)e.B.push(Q());}if(e.R&&e.R.length>=2*me+1)for(let t=0;t<2*me+1;t++)e.R[t]=Q();else {e.R=[];for(let t=0;t<2*me+1;t++)e.R.push(Q());}if(e.Se&&e.Se.length>=2*oe+1)for(let t=0;t<2*oe+1;t++)e.Se[t]=Q();else {e.Se=[];for(let t=0;t<2*oe+1;t++)e.Se.push(Q());}e.qe=new ne(e.B,new re(Ze,i_,ie+1,we,be)),e.Ae=new ne(e.R,new re(k_,o_,0,me,be)),e.$e=new ne(e.Se,new re(null,Fe,0,oe,7)),e.p=0,e.I=0,e.ze=0,pt(e);}var he=1;function An(e,t,n){return n=e.ye[he],e.ye[he]=e.ye[e.Ve--],N_(e,t,he),n}function dt(e,t,n,r){return e[t].T<e[n].T||e[t].T==e[n].T&&r[t]<=r[n]}function N_(e,t,n){let r=e.ye[n],i=n<<1;for(;i<=e.Ve&&(i<e.Ve&&dt(t,e.ye[i+1],e.ye[i],e.Ie)&&i++,!dt(t,r,e.ye[i],e.Ie));)e.ye[n]=e.ye[i],n=i,i<<=1;e.ye[n]=r;}function Dn(e,t){let n,r,i,f,_,l,o=t.L,a=t.Z,u=t.M.W,c=t.M.N,s=t.M.V,d=t.M.q,h=0;for(f=0;f<=be;f++)e.Le[f]=0;for(o[e.ye[e.Qe]].Oe=0,n=e.Qe+1;n<le;n++)r=e.ye[n],f=o[o[r].Te].Oe+1,f>d&&(f=d,h++),o[r].Oe=f,!(r>a)&&(e.Le[f]++,_=0,r>=s&&(_=c[r-s]),l=o[r].T,e.ie+=l*(f+_),u&&(e.fe+=l*(u[r].Oe+_)));if(0!=h){do{for(f=d-1;0==e.Le[f];)f--;e.Le[f]--,e.Le[f+1]+=2,e.Le[d]--,h-=2;}while(h>0);for(f=d;0!=f;f--)for(r=e.Le[f];0!=r;)i=e.ye[--n],!(i>a)&&(o[i].Oe!=f&&(e.ie+=(f-o[i].Oe)*o[i].T,o[i].Oe=f),r--);}}function R_(e,t){let n,r,i,f=t.L,_=t.M.W,l=t.M.S,o=-1;for(e.Ve=0,e.Qe=le,n=0;n<l;n++)0!=f[n].T?(e.ye[++e.Ve]=o=n,e.Ie[n]=0):f[n].Oe=0;for(;e.Ve<2;)i=e.ye[++e.Ve]=o<2?++o:0,f[i].T=1,e.Ie[i]=0,e.ie--,_&&(e.fe-=_[i].Oe);for(t.Z=o,n=N.floor(e.Ve/2);n>=1;n--)N_(e,f,n);i=l;do{n=An(e,f,n),r=e.ye[he],e.ye[--e.Qe]=n,e.ye[--e.Qe]=r,f[i].T=f[n].T+f[r].T,e.Ie[i]=(e.Ie[n]>=e.Ie[r]?e.Ie[n]:e.Ie[r])+1,f[n].Te=f[r].Te=i,e.ye[he]=i++,N_(e,f,he);}while(e.Ve>=2);e.ye[--e.Qe]=e.ye[he],Dn(e,t),wn(f,t.Z,e.Le);}function mt(e,t,n){let r,i,f=-1,_=t[0].Oe,l=0,o=7,a=4;for(0==_&&(o=138,a=3),t[n+1].Oe=65535,r=0;r<=n;r++)i=_,_=t[r+1].Oe,!(++l<o&&i==_)&&(l<a?e.Se[i].T+=l:0!=i?(i!=f&&e.Se[i].T++,e.Se[n_].T++):l<=10?e.Se[r_].T++:e.Se[a_].T++,l=0,f=i,0==_?(o=138,a=3):i==_?(o=6,a=3):(o=7,a=4));}function bt(e,t,n){let r,i=-1,f=t[0].Oe,_=0,l=7,o=4;0==f&&(l=138,o=3);for(let a=0;a<=n;a++)if(r=f,f=t[a+1].Oe,!(++_<l&&r==f)){if(_<o)do{L(e,e.Se[r].De,e.Se[r].Oe);}while(0!=--_);else 0!=r?(r!=i&&(L(e,e.Se[r].De,e.Se[r].Oe),_--),L(e,e.Se[n_].De,e.Se[n_].Oe),L(e,_-3,2)):_<=10?(L(e,e.Se[r_].De,e.Se[r_].Oe),L(e,_-3,3)):(L(e,e.Se[a_].De,e.Se[a_].Oe),L(e,_-11,7));_=0,i=r,0==f?(l=138,o=3):r==f?(l=6,o=3):(l=7,o=4);}}function yn(e){let t;for(mt(e,e.B,e.qe.Z),mt(e,e.R,e.Ae.Z),R_(e,e.$e),t=oe-1;t>=3&&0==e.Se[Se[t]].Oe;t--);return e.ie+=3*(t+1)+5+5+4,t}function vn(e,t,n,r){let i;for(L(e,t-257,5),L(e,n-1,5),L(e,r-4,4),i=0;i<r;i++)L(e,e.Se[Se[i]].Oe,3);bt(e,e.B,t-1),bt(e,e.R,n-1);}function Xe(e,t,n,r,i=0){L(e,(ot<<1)+r,3),xt(e),De(e,n),De(e,~n),n&&t&&M(e.A,e.$,t,i,n),e.$+=n;}function Et(e){ht(e);}function gt(e){L(e,I_<<1,3),L(e,Ze[Ie].De,Ze[Ie].Oe),ht(e);}function st(e,t,n){let r,i,f,_,l=0;if(0!=e.O)do{r=255&e.Me[l],r+=(255&e.Me[l+1])<<8,i=e.Me[l+2],l+=3,0==r?L(e,t[i].De,t[i].Oe):(f=t_[i],L(e,t[f+ie+1].De,t[f+ie+1].Oe),_=i_[f],0!=_&&(i-=Te[f],L(e,i,_)),r--,f=A_(r),L(e,n[f].De,n[f].Oe),_=o_[f],0!=_&&(r-=ge[f],L(e,r,_)));}while(l<e.O);L(e,t[Ie].De,t[Ie].Oe);}function In(e){let t,n=4093624447;for(t=0;t<=31;t++,n>>=1)if(1&n&&0!=e.B[t].T)return 0;if(0!=e.B[9].T||0!=e.B[10].T||0!=e.B[13].T)return 1;for(t=32;t<ie;t++)if(0!=e.B[t].T)return 1;return 0}function Tt(e,t,n,r,i=0){let f,_,l=0;e.ge>0?(2==e.o.t&&(e.o.t=In(e)),R_(e,e.qe),R_(e,e.Ae),l=yn(e),f=e.ie+3+7>>3,_=e.fe+3+7>>3,(_<=f||4==e.ve)&&(f=_)):f=_=n+5,n+4<=f&&t?Xe(e,t,n,r,i):_==f?(L(e,(I_<<1)+r,3),st(e,Ze,k_)):(L(e,(lt<<1)+r,3),vn(e,e.qe.Z+1,e.Ae.Z+1,l+1),st(e,e.B,e.R)),pt(e),r&&xt(e);}function yt(){let e=Je();return e.l=D_(e),e}var We=[{Be:zt,Re:0,Ue:0,Pe:0,Fe:0},{Be:L_,Re:4,Ue:4,Pe:8,Fe:4},{Be:L_,Re:4,Ue:5,Pe:16,Fe:8},{Be:L_,Re:4,Ue:6,Pe:32,Fe:32},{Be:Re,Re:4,Ue:4,Pe:16,Fe:16},{Be:Re,Re:8,Ue:16,Pe:32,Fe:32},{Be:Re,Re:8,Ue:16,Pe:128,Fe:128},{Be:Re,Re:8,Ue:32,Pe:128,Fe:256},{Be:Re,Re:32,Ue:128,Pe:258,Fe:1024},{Be:Re,Re:32,Ue:258,Pe:258,Fe:4096}];function wt(e){return 2*e-(e>4?9:0)}function u_(e,t,n){return ((t<<e.C^n)&e.K)>>>0}function c_(e,t){e.be=u_(e,e.be,e.u[t+(I-1)]);let n=e.j[t&e.Y]=e.G[e.be];return e.G[e.be]=t,n}function vt(e){e.G[e.J-1]=0,Ve(e.G,0,(e.J-1)*e.G.BYTES_PER_ELEMENT);}function On(e){let t,n,r=e.h;for(t=e.J;t>0;)t--,n=e.G[t],e.G[t]=n>=r?n-r:0;for(t=r;t>0;)t--,n=e.j[t],e.j[t]=n>=r?n-r:0;}function O_(e,t,n,r){let i=e.avail_in;return i>r&&(i=r),0==i?0:(e.avail_in-=i,M(t,n,e.next_in,e.next_in_index,i),1==e.l.F?e.i=se(e.i,new x(t.buffer,t.byteOffset+n,i),i):2==e.l.F&&(e.i=W(e.i,new x(t.buffer,t.byteOffset+n,i),i)),e.next_in_index+=i,e.total_in+=i,i)}function d_(e){let t,n,r=e.h;do{if(n=e.We-e.ce-e.ue,0==n&&0==e.ue&&0==e.ce?n=r:-1==n&&n--,e.ue>=r+ve(e)&&(M(e.u,0,e.u,r,r-n),e.Ne-=r,e.ue-=r,e.ae-=r,e.le>e.ue&&(e.le=e.ue),On(e),n+=r),0==e.o.avail_in)break;if(t=O_(e.o,e.u,e.ue+e.ce,n),e.ce+=t,e.ce+e.le>=I){let t=e.ue-e.le;for(e.be=e.u[t],e.be=u_(e,e.be,e.u[t+1]);e.le&&(e.be=u_(e,e.be,e.u[t+I-1]),e.j[t&e.Y]=e.G[e.be],e.G[e.be]=t,t++,e.le--,!(e.ce+e.le<I)););}}while(e.ce<ae&&0!=e.o.avail_in);if(e.k<e.We){let t,n=e.ue+e.ce;e.k<n?(t=e.We-n,t>Be&&(t=Be),Ve(e.u,n,t),e.k=n+t):e.k<n+Be&&(t=n+Be-e.k,t>e.We-e.k&&(t=e.We-e.k),Ve(e.u,e.k,t),e.k+=t);}}function It(e,t,n=8,r=15,i=He,f=0){let _=1;if(!e)return  -2;if(e.msg="",-1==t&&(t=6),r<0){if(_=0,r<-15)return  -2;r=-r;}else r>15&&(_=2,r-=16);if(i<1||i>nt||8!=n||r<8||r>15||t<0||t>9||f<0||f>4||8==r&&1!=_)return  -2;8==r&&(r=9);let l=D_(e);return l?(e.l=l,l.o=e,l.P=42,l.F=_,l.H=void 0,l.v=r,l.h=1<<l.v,l.Y=l.h-1,l.X=i+7,l.J=1<<l.X,l.K=l.J-1,l.C=(l.X+I-1)/I,l.u=new x(2*l.h),l.j=new E(l.h),l.G=new E(l.J),l.k=0,l.ee=1<<i+6,l.A=new x(l.ee*it),l.ne=4*l.ee,l.u&&l.j&&l.G&&l.A?(l.Me=l.A.subarray(l.ee),l.D=l.te+l.ee,l.U=3*(l.ee-1),l.ge=t,l.ve=f,l.Ze=n,Bn(e)):(l.P=666,e.msg=w_(-4),F_(e),-4)):-4}function B_(e){if(null==e)return  true;let t=e.l;return !t||t.o!=e||42!=t.P&&57!=t.P&&69!=t.P&&73!=t.P&&91!=t.P&&103!=t.P&&113!=t.P&&666!=t.P}function Hn(e){let t;return B_(e)?-2:(e.total_in=e.total_out=0,e.msg="",e.t=2,t=e.l,t.$=0,t.re=t.te,t.F<0&&(t.F=-t.F),t.P=2==t.F?57:42,e.i=2==t.F?W(0):se(0),t.oe=-2,St(t),0)}function Un(e){e.We=2*e.h,vt(e),e.pe=We[e.ge].Ue,e.ke=We[e.ge].Re,e.me=We[e.ge].Pe,e.xe=We[e.ge].Fe,e.ue=0,e.ae=0,e.ce=0,e.le=0,e.se=e.de=I-1,e.we=0,e.be=0;}function Bn(e){let t=Hn(e);return 0==t&&Un(e.l),t}function Ye(e,t){g(e,t>>8),g(e,255&t);}function q(e){let t,n=e.l;Et(n),t=n.$,t>e.avail_out&&(t=e.avail_out),0!=t&&(M(e.next_out,e.next_out_index,n.A,n.re,t),e.next_out_index+=t,n.re+=t,e.total_out+=t,e.avail_out-=t,n.$-=t,0==n.$&&(n.re=n.te));}function ke(e,t){let n=e.l;n.H&&n.H.He&&(e.i=W(e.i,new x(n.A.buffer,n.te+t,n.$-t),n.$-t));}function kt(e,t){let n,r=e.l;if(B_(e)||t>5||t<0)return Ae(e,-2);if(!e.next_out||0!=e.avail_in&&!e.next_in||666==r.P&&4!=t)return Ae(e,-2);if(0==e.avail_out)return Ae(e,-5);if(n=r.oe,r.oe=t,0!=r.$){if(q(e),0==e.avail_out)return r.oe=$,0}else if(0==e.avail_in&&wt(t)<=wt(n)&&4!=t)return Ae(e,-5);if(666==r.P&&0!=e.avail_in)return Ae(e,-5);if(42==r.P&&0==r.F&&(r.P=113),42==r.P){let t,n=8+(r.v-8<<4)<<8;if(t=r.ve>=2||r.ge<2?0:r.ge<6?1:6==r.ge?2:3,n|=t<<6,0!=r.ue&&(n|=at),n+=31-n%31,Ye(r,n),0!=r.ue&&(Ye(r,e.i>>16),Ye(r,65535&e.i)),e.i=1,r.P=113,q(e),0!=r.$)return r.oe=$,0}if(57==r.P)if(e.i=W(0),g(r,31),g(r,139),g(r,8),r.H)g(r,(r.H.Ye?1:0)+(r.H.He?2:0)+(null==r.H.Xe?0:4)+(null==r.H.Je?0:8)+(null==r.H.Ke?0:16)),g(r,255&r.H.Ce),g(r,r.H.Ce>>>8&255),g(r,r.H.Ce>>>16&255),g(r,r.H.Ce>>>24&255),g(r,9==r.ge?2:r.ve>=2||r.ge<2?4:0),g(r,255&r.H.je),null!=r.H.Xe&&(g(r,255&r.H.Ge),g(r,r.H.Ge>>>8&255)),r.H.He&&(e.i=W(e.i,r.A,r.$)),r.Ee=0,r.P=69;else if(g(r,0),g(r,0),g(r,0),g(r,0),g(r,0),g(r,9==r.ge?2:r.ve>=2||r.ge<2?4:0),g(r,rt),r.P=113,q(e),0!=r.$)return r.oe=$,0;if(69==r.P){if(r.H&&null!=r.H.Xe){let t=r.$,n=(65535&r.H.Ge)-r.Ee;for(;r.$+n>r.ne;){let i=r.ne-r.$;if(M(r.A,r.$,r.H.Xe,r.Ee,i),r.$=r.ne,ke(e,t),r.Ee+=i,q(e),0!=r.$)return r.oe=$,0;t=0,n-=i;}M(r.A,r.$,r.H.Xe,r.Ee,n),r.$+=n,ke(e,t),r.Ee=0;}r.P=73;}if(73==r.P){if(r.H&&r.H.Je&&r.H.Je.length){let t,n=r.$;do{if(r.$==r.ne){if(ke(e,n),q(e),0!=r.$)return r.oe=$,0;n=0;}t=r.H.Je[r.Ee++],g(r,t);}while(0!=t);ke(e,n),r.Ee=0;}r.P=91;}if(91==r.P){if(r.H&&r.H.Ke&&r.H.Ke.length){let t,n=r.$;do{if(r.$==r.ne){if(ke(e,n),q(e),0!=r.$)return r.oe=$,0;n=0;}t=r.H.Ke[r.Ee++],g(r,t);}while(0!=t);ke(e,n);}r.P=103;}if(103==r.P){if(r.H&&r.H.He){if(r.$+2>r.ne&&(q(e),0!=r.$))return r.oe=$,0;g(r,255&e.i),g(r,e.i>>>8&255),e.i=W(0);}if(r.P=113,q(e),0!=r.$)return r.oe=$,0}if(0!=e.avail_in||0!=r.ce||0!=t&&666!=r.P){let n=0==r.ge?zt(r,t):2==r.ve?Zn(r,t):3==r.ve?Fn(r,t):We[r.ge].Be(r,t);if((2==n||3==n)&&(r.P=666),0==n||2==n)return 0==e.avail_out&&(r.oe=$),0;if(1==n&&(1==t?gt(r):5!=t&&(Xe(r,null,0,0),3==t&&(vt(r),0==r.ce&&(r.ue=0,r.ae=0,r.le=0))),q(e),0==e.avail_out))return r.oe=$,0}return 4!=t?0:r.F<=0?1:(2==r.F?(g(r,255&e.i),g(r,e.i>>>8&255),g(r,e.i>>>16&255),g(r,e.i>>>24&255),g(r,255&e.total_in),g(r,e.total_in>>>8&255),g(r,e.total_in>>>16&255),g(r,e.total_in>>>24&255)):(Ye(r,e.i>>>16&65535),Ye(r,65535&e.i)),q(e),r.F>0&&(r.F=-r.F),0!=r.$?0:1)}function F_(e){if(B_(e))return  -2;let t=e.l,n=t.P;return t.u=Z,t.j=je,t.G=je,t.A=Z,t.Me=Z,t.ye=new H(0),t.Ie=Z,t.Le=je,t.B.length=0,t.R.length=0,t.Se.length=0,t.H=void 0,t.te=0,t.re=0,t.D=0,113==n?-3:0}function Nt(e,t){let n,r,i=e.xe,f=e.ue,_=e.de,l=e.me,o=e.ue>ve(e)?e.ue-ve(e):0,a=e.j,u=e.Y,c=e.u[f],s=e.u[f+1],d=e.u[f+_-1],h=e.u[f+_];e.de>=e.ke&&(i>>=2),l>e.ce&&(l=e.ce);do{if(n=t,e.u[n+_]!=h||e.u[n+_-1]!=d||e.u[n]!=c||e.u[n+1]!=s)continue;let i=N.min(_e,e.ce),o=2;for(;o<i&&e.u[f+o]==e.u[n+o];)o++;if(r=o,r>_){if(e.Ne=t,_=r,r>=l)break;d=e.u[f+_-1],h=e.u[f+_];}}while((t=a[t&u])>o&&0!=--i);return _<=e.ce?_:e.ce}function Rt(e,t){Tt(e,e.u,e.ue-e.ae,t,e.ae),e.ae=e.ue,q(e.o);}function V(e,t){return Rt(e,t?1:0),0==e.o.avail_out?t?2:0:null}var At=65535;function Ne(e,t){return e<t?e:t}function zt(e,t){let n,r,i,f=Ne(e.ne-5,e.h),_=0,l=e.o.avail_in;do{if(n=At,i=e.I+42>>3,e.o.avail_out<i||(i=e.o.avail_out-i,r=e.ue-e.ae,n>r+e.o.avail_in&&(n=r+e.o.avail_in),n>i&&(n=i),n<f&&(0==n&&4!=t||0==t||n!=r+e.o.avail_in)))break;_=4==t&&n==r+e.o.avail_in?1:0,Xe(e,null,0,_),e.A[e.$-4]=n,e.A[e.$-3]=n>>8,e.A[e.$-2]=~n,e.A[e.$-1]=~n>>8,q(e.o),r&&(r>n&&(r=n),M(e.o.next_out,e.o.next_out_index,e.u,e.ae,r),e.o.next_out_index+=r,e.o.avail_out-=r,e.o.total_out+=r,e.ae+=r,n-=r),n&&(O_(e.o,e.o.next_out,e.o.next_out_index,n),e.o.next_out_index+=n,e.o.avail_out-=n,e.o.total_out+=n);}while(0==_);if(l-=e.o.avail_in,l){if(l>=e.h){e._e=2;let t=e.o.next_in_index-e.h;M(e.u,0,e.o.next_in,t,e.h),e.ue=e.h,e.le=e.ue;}else e.We-e.ue<=l&&(e.ue-=e.h,M(e.u,0,e.u,e.h,e.ue),e._e<2&&e._e++,e.le>e.ue&&(e.le=e.ue)),M(e.u,e.ue,e.o.next_in,e.o.next_in_index-l,l),e.ue+=l,e.le+=Ne(l,e.h-e.le);e.ae=e.ue;}return e.k<e.ue&&(e.k=e.ue),_?(e.ze=8,3):0!=t&&4!=t&&0==e.o.avail_in&&e.ue==e.ae?1:(i=e.We-e.ue,e.o.avail_in>i&&e.ae>=e.h&&(e.ae-=e.h,e.ue-=e.h,M(e.u,0,e.u,e.h,e.ue),e._e<2&&e._e++,i+=e.h,e.le>e.ue&&(e.le=e.ue)),i>e.o.avail_in&&(i=e.o.avail_in),i&&(O_(e.o,e.u,e.ue,i),e.ue+=i,e.le+=Ne(i,e.h-e.le)),e.k<e.ue&&(e.k=e.ue),i=e.I+42>>3,i=Ne(e.ne-i,At),f=Ne(i,e.h),r=e.ue-e.ae,(r>=f||(r||4==t)&&0!=t&&0==e.o.avail_in&&r<=i)&&(n=Ne(r,i),_=4==t&&0==e.o.avail_in&&n==r?1:0,Xe(e,e.u,n,_,e.ae),e.ae+=n,q(e.o)),_&&(e.ze=8),_?2:0)}function L_(e,t){let n,r=false;for(;;){if(e.ce<ae){if(d_(e),e.ce<ae&&0==t)return 0;if(0==e.ce)break}if(n=0,e.ce>=I&&(n=c_(e,e.ue)),0!=n&&e.ue-n<=ve(e)&&(e.se=Nt(e,n)),e.se>=I)if(e.ue,e.Ne,e.se,r=__(e,e.ue-e.Ne,e.se-I),e.ce-=e.se,e.se<=e.pe&&e.ce>=I){e.se--;do{e.ue++,n=c_(e,e.ue);}while(0!=--e.se);e.ue++;}else e.ue+=e.se,e.se=0,e.be=e.u[e.ue],e.be=u_(e,e.be,e.u[e.ue+1]);else r=ye(e,e.u[e.ue]),e.ce--,e.ue++;if(r){let t=V(e,false);if(null!=t)return t}}if(e.le=e.ue<I-1?e.ue:I-1,4==t){return V(e,true)??3}if(e.O){let t=V(e,false);if(null!=t)return t}return 1}function Re(e,t){let n,r=false;for(;;){if(e.ce<ae){if(d_(e),e.ce<ae&&0==t)return 0;if(0==e.ce)break}if(n=0,e.ce>=I&&(n=c_(e,e.ue)),e.de=e.se,e.he=e.Ne,e.se=I-1,0!=n&&e.de<e.pe&&e.ue-n<=ve(e)&&(e.se=Nt(e,n),e.se<=5&&(1==e.ve||e.se==I&&e.ue-e.Ne>tt)&&(e.se=I-1)),e.de>=I&&e.se<=e.de){let t=e.ue+e.ce-I;e.ue,e.he,e.de,r=__(e,e.ue-1-e.he,e.de-I),e.ce-=e.de-1,e.de-=2;do{++e.ue<=t&&(n=c_(e,e.ue));}while(0!=--e.de);if(e.we=0,e.se=I-1,e.ue++,r){let t=V(e,false);if(null!=t)return t}}else if(e.we){if(r=ye(e,e.u[e.ue-1]),r&&Rt(e,0),e.ue++,e.ce--,0==e.o.avail_out)return 0}else e.we=1,e.ue++,e.ce--;}if(e.we&&(r=ye(e,e.u[e.ue-1]),e.we=0),e.le=e.ue<I-1?e.ue:I-1,4==t){return V(e,true)??3}if(e.O){let t=V(e,false);if(null!=t)return t}return 1}function Fn(e,t){let n,r,i,f;for(;;){if(e.ce<=_e){if(d_(e),e.ce<=_e&&0==t)return 0;if(0==e.ce)break}if(e.se=0,e.ce>=I&&e.ue>0&&(i=e.ue-1,r=e.u[i],r==++i&&r==++i&&r==++i)){f=e.ue+_e;do{}while(r==++i&&r==++i&&r==++i&&r==++i&&r==++i&&r==++i&&r==++i&&r==++i&&i<f);e.se=_e-(f-i),e.se>e.ce&&(e.se=e.ce);}if(e.se>=I?(e.ue,e.ue,e.se,n=__(e,1,e.se-I),e.ce-=e.se,e.ue+=e.se,e.se=0):(n=ye(e,e.u[e.ue]),e.ce--,e.ue++),n){let t=V(e,false);if(null!=t)return t}}if(e.le=0,4==t){return V(e,true)??3}if(e.O){let t=V(e,false);if(null!=t)return t}return 1}function Zn(e,t){let n=false;for(;;){if(0==e.ce&&(d_(e),0==e.ce)){if(0==t)return 0;break}if(e.se=0,n=ye(e,e.u[e.ue]),e.ce--,e.ue++,n){let t=V(e,false);if(null!=t)return t}}if(e.le=0,4==t){return V(e,true)??3}if(e.O){let t=V(e,false);if(null!=t)return t}return 1}var ue=852,m_=592,b_=594,Ct=ge.map(e=>e+1),Lt=Te.subarray(0,-1).map(e=>e+3),Pn=[16,1,73,1,200,1],Mn=[144,1,72,1,78,1],Ot=Ee.map(Kt),Ht=Ee.map(qt);Ot.push(64,2),Ht.push(142,2);var Ut=de.slice(0,-2).map(Kt),Bt=de.slice(0,-2).map(qt);Ut.push(...Pn),Bt.push(...Mn);var Ft=new E([...Lt,258,0,0]),Zt=new E([...Lt,3,0,0]),Pt=te(Ut),Mt=te(Bt),Xt=new E([...Ct,0,0]),Yt=new E([...Ct,32769,49153]),Wt=te(Ot),Gt=te(Ht);function Kt(e,t){return t%2?e:e+16}function qt(e,t){return t%2?e:e+128}function Vt(e,t){let n,r=e.l,i=e.next_in_index,f=e.next_out_index,_=e.next_in,l=e.next_out,o=r.u,a=r.p>>>0,u=r.I>>>0,c=r.et,s=r.tt,d=(1<<r.nt)-1,h=(1<<r.rt)-1,w=r.h>>>0,b=r.k>>>0,g=r.m>>>0,v=r.it,k=f-(t-e.avail_out),m=f+(e.avail_out-257),x=i+(e.avail_in-5),p=0,y=0,I=0,L=0;e:do{for(;u<15;){if(!(i<_.length))break e;a+=_[i++]<<u,u+=8;}n=c[a&d];t:for(;;){if(I=n.ft,a>>>=I,u-=I,I=n._t,0==I){l[f++]=n.lt;break}if(16&I){if(p=n.lt,I&=15,I){for(;u<I;){if(!(i<_.length)){r.ot=16200;break e}a+=_[i++]<<u,u+=8;}p+=a&(1<<I)-1,a>>>=I,u-=I;}for(;u<15;){if(!(i<_.length)){r.ot=16200;break e}a+=_[i++]<<u,u+=8;}n=s[a&h];n:for(;;){if(I=n.ft,a>>>=I,u-=I,I=n._t,16&I){if(y=n.lt,I&=15,I){for(;u<I;){if(!(i<_.length)){r.ot=16200;break e}a+=_[i++]<<u,u+=8;}y+=a&(1<<I)-1,a>>>=I,u-=I;}let t=p,c=f-k;if(y>c){let n=y-c;if(n>b&&v){e.msg="invalid distance too far back",r.ot=16209;break e}if(0==g){if(L=w-n,!(n<t)){for(let e=0;e<t;++e)l[f++]=o[L++];continue e}for(let e=0;e<n;++e)l[f++]=o[L++];t-=n,L=f-y;}else if(g<n){L=w+g-n;let e=n-g;if(!(e<t)){for(let e=0;e<t;++e)l[f++]=o[L++];continue e}for(let t=0;t<e;++t)l[f++]=o[L++];if(t-=e,L=0,g<t){for(let e=0;e<g;++e)l[f++]=o[L++];t-=g,L=f-y;}}else {if(L=g-n,!(n<t)){for(let e=0;e<t;++e)l[f++]=o[L++];continue e}for(let e=0;e<n;++e)l[f++]=o[L++];t-=n,L=f-y;}for(;t>2;)l[f++]=l[L++],l[f++]=l[L++],l[f++]=l[L++],t-=3;t&&(l[f++]=l[L++],t>1&&(l[f++]=l[L++]));}else {for(L=f-y;t>2;)l[f++]=l[L++],l[f++]=l[L++],l[f++]=l[L++],t-=3;t&&(l[f++]=l[L++],t>1&&(l[f++]=l[L++]));}break}if(64&I){e.msg="invalid distance code",r.ot=16209;break e}n=s[n.lt+(a&(1<<I)-1)];continue n}break}if(64&I){if(32&I){r.ot=16191;break e}e.msg="invalid literal/length code",r.ot=16209;break e}n=c[n.lt+(a&(1<<I)-1)];continue t}}while(i<x&&f<m);let M=u>>3;i-=M,u-=M<<3,a&=(1<<u)-1,e.next_in_index=i,e.next_out_index=f,e.avail_in=i<x?x-i+5:5-(i-x),e.avail_out=f<m?m-f+257:257-(f-m),r.p=a>>>0,r.I=u>>>0;}function Z_(e,t){let n=[],r=t?ue+b_:ue+m_;return {...Qe(e,0),o:e,ot:16180,ut:false,F:0,ct:false,st:0,dt:0,ht:0,wt:0,u:Z,bt:0,gt:0,Xe:0,et:n,tt:n,nt:0,rt:0,vt:0,kt:0,xt:0,yt:0,It:n,Lt:new E(320),Mt:new E(288),zt:new v(r).fill(null).map(()=>pe()),Et:0,it:true,Zt:0,Wt:0,Nt:t}}function pe(e=0,t=0,n=0){return {_t:e,ft:t,lt:n}}function P_(e=1){return {_t:64,ft:e,lt:0}}function Jt(e=0){return {_t:96,ft:e,lt:0}}function M_(e){return (255&e)<<24|(e>>8&255)<<16|(e>>16&255)<<8|e>>24&255}var Le=15,Yn={Nt:false,Vt:Ft,Qt:Pt,St:Xt,qt:Wt,At:20,$t:257,Dt:0,Ot:m_,Tt:false,Bt:true},Wn={Nt:true,Vt:Zt,Qt:Mt,St:Yt,qt:Gt,At:19,$t:256,Dt:-1,Ot:b_,Tt:true,Bt:false};function Oe(e,t,n,r,i,f,_,l){let o,a,u,c,s,d,h,w,b,g,v,k,m,x,p,y,I,L,M,z=new E(Le+1),Z=new E(Le+1),W=l?Wn:Yn;for(o=0;o<=Le;o++)z[o]=0;for(a=0;a<n;a++)z[t[a]]++;for(s=i.Rt,c=Le;c>=1&&0==z[c];c--);if(s>c&&(s=c),0==c)return W.Bt?(p=P_(1),r.Rt[0]=p,r.Rt[1]=p,i.Rt=1,0):-1;for(u=1;u<c&&0==z[u];u++);for(s<u&&(s=u),w=1,o=1;o<=Le;o++)if(w<<=1,w-=z[o],w<0)return  -1;if(w>0&&(0==e||1!=c))return  -1;for(Z[1]=0,o=1;o<Le;o++)Z[o+1]=Z[o]+z[o];for(a=0;a<n;a++)0!=t[a]&&(f[Z[t[a]]++]=a);switch(e){case 0:I=L=f,M=W.At;break;case 1:I=W.Vt,L=W.Qt,M=W.$t;break;default:I=W.St,L=W.qt,M=W.Dt;}if(g=0,a=0,o=u,y=_.Rt,d=s,h=0,m=-1,b=1<<s,x=b-1,1==e&&(W.Tt?b>=ue:b>ue)||2==e&&(W.Tt?b>=W.Ot:b>W.Ot))return 1;for(;;){p=Gn(f,a,o,h,e,I,L,M,W.Nt),v=1<<o-h,k=1<<d,u=k;do{k-=v;let e=(g>>h)+k;r.Rt[y+e]={...p};}while(0!=k);for(v=1<<o-1;g&v;)v>>=1;if(0!=v?(g&=v-1,g+=v):g=0,a++,0==--z[o]){if(o==c)break;o=t[f[a]];}if(o>s&&(g&x)!=m){for(0==h&&(h=s),y+=1<<d,d=o-h,w=1<<d;d+h<c&&(w-=z[d+h],!(w<=0));)d++,w<<=1;if(b+=1<<d,1==e&&(W.Tt?b>=ue:b>ue)||2==e&&(W.Tt?b>=W.Ot:b>W.Ot))return 1;m=g&x,r.Rt[_.Rt+m]={_t:d,ft:s,lt:y-_.Rt};}}if(0!=g)for(p=P_(o-h);0!=g;){for(0!=h&&(g&x)!=m&&(h=0,o=s,y=_.Rt,d=s,p.ft=o),r.Rt[y+(g>>h)]={...p},v=1<<o-1;g&v;)v>>=1;0!=v?(g&=v-1,g+=v):g=0;}return _.Rt+=b,i.Rt=s,0}function Gn(e,t,n,r,i,f,_,l,o){let a;if(o?e[t]<l:e[t]+1<l)a=pe(0,n-r,e[t]);else if(o?e[t]>l:e[t]>=l)if(o&&1==i){let i=e[t]-257;a=pe(_[i],n-r,f[i]);}else {let i=o?e[t]:e[t]-l;a=pe(_[i],n-r,f[i]);}else a=Jt(n-r);return a}var Vn={Ut:true,Pt:new v(544),Ft:[],Ht:[]},Jn={Ut:true,Pt:new v(544),Ft:[],Ht:[]};function Qt(){let e=Je();return e.l=Z_(e,false),e}function Ke(e){let t;return !(e&&(t=e.l,!(!t||t.o!=e||t.Nt&&(t.ot<16191||t.ot>16209)||!t.Nt&&(t.ot<16180||t.ot>16211))))}function Qn(e){let t;return Ke(e)?-2:(t=e.l,e.total_in=e.total_out=t.wt=0,e.msg="",t.F&&(e.i=1&t.F),t.ot=t.Nt?16191:16180,t.ut=false,t.ct=false,t.st=-1,t.dt=t.Nt?65536:32768,delete t.H,t.p=0,t.I=0,t.et=t.zt,t.tt=t.zt,t.It=t.zt,t.it=true,t.Zt=-1,0)}function $n(e){let t;return Ke(e)?-2:(t=e.l,t.h=0,t.k=0,t.m=0,Qn(e))}function er(e,t){let n,r;if(Ke(e))return  -2;if(r=e.l,t<0){if(t<-16)return  -2;n=0,r.Nt=-16==t,t=-t;}else n=5+(t>>4),r.Nt=false,t<48&&(t&=15);let i=r.Nt?16:15;return t&&(t<8||t>i)?-2:(r.u.length>0&&r.v!=t&&(r.u=Z),r.F=n,r.v=t,$n(e))}function $t(e,t){let n,r;if(!e)return  -2;e.msg="";let i=-16==t;return r=Z_(e,i),e.l=r,r.o=e,r.ot=i?16191:16180,n=er(e,t),n}function _r(e){let t=e.Nt?Jn:Vn,n={Rt:0};if(t.Ut){let r,i,f;for(r=0;r<144;)e.Lt[r++]=8;for(;r<256;)e.Lt[r++]=9;for(;r<280;)e.Lt[r++]=7;for(;r<288;)e.Lt[r++]=8;for(let e=0;e<544;e++)t.Pt[e]=pe();f=t.Pt,t.Ft=f,i=9;let _={Rt:f},l={Rt:i},o={Rt:0};for(Oe(1,e.Lt,288,_,l,e.Mt,o,e.Nt),f=_.Rt,i=l.Rt,e.Et=o.Rt,r=0;r<32;)e.Lt[r++]=5;i=5;let a=o.Rt,u={Rt:f},c={Rt:i};n.Rt=a,Oe(2,e.Lt,32,u,c,e.Mt,n,e.Nt),t.Ht=f.slice(a),t.Ut=false;}e.et=t.Ft,e.nt=9,e.tt=t.Ht,e.rt=5,e.Et=n.Rt;}function tr(e,t,n){let r=e.l;if(!(r.u&&0!=r.u.length||(r.u=new x(1<<r.v),r.u)))return 1;if(0==r.h&&(r.h=1<<r.v,r.m=0,r.k=0),n>=r.h)M(r.u,0,t,t.length-r.h,r.h),r.m=0,r.k=r.h;else {let e=r.h-r.m;e>n&&(e=n),M(r.u,r.m,t,t.length-n,e),(n-=e)?(M(r.u,0,t,t.length-n,n),r.m=n,r.k=r.h):(r.m+=e,r.m==r.h&&(r.m=0),r.k<r.h&&(r.k+=e));}return 0}var x_=class extends z{constructor(){super("Need more input");}};function en(e,t){let n,r,i,f,_,l,o,a,u,c,s,d,h,w,b,g,v,k=new x(4);if(Ke(e)||!e.next_out||!e.next_in&&0!=e.avail_in)return  -2;l=0,a=0,o=0,u=0,r=Z,i=0,f=Z,_=0,n=e.l,16191==n.ot&&(n.ot=16192),L(),c=l,s=o,v=0;try{for(;;)switch(n.ot){case 16180:if(0==n.F){n.ot=16192;break}if(V(16),2&n.F&&35615==a){0==n.v&&(n.v=15),n.ht=W(0),n.ht=y(n.ht,a),E(),n.ot=16181;break}if(n.H&&(n.H.Yt=-1),!(1&n.F)||((Q(8)<<8)+(a>>8))%31){e.msg="incorrect header check",n.ot=16209;break}if(8!=Q(4)){e.msg="unknown compression method",n.ot=16209;break}if(S(4),g=Q(4)+8,0==n.v&&(n.v=g),g>15||g>n.v){e.msg="invalid window size",n.ot=16209;break}n.dt=1<<g,n.st=0,e.i=n.ht=se(0),n.ot=512&a?16189:16191,E();break;case 16181:if(V(16),n.st=a,8!=(255&n.st)){e.msg="unknown compression method",n.ot=16209;break}if(57344&n.st){e.msg="unknown header flags set",n.ot=16209;break}n.H&&(n.H.Ye=a>>8&1),512&n.st&&4&n.F&&(n.ht=y(n.ht,a)),E(),n.ot=16182;case 16182:V(32),n.H&&(n.H.Ce=a),512&n.st&&4&n.F&&(n.ht=I(n.ht,a)),E(),n.ot=16183;case 16183:V(16),n.H&&(n.H.Xt=255&a,n.H.je=a>>8),512&n.st&&4&n.F&&(n.ht=y(n.ht,a)),E(),n.ot=16184;case 16184:1024&n.st?(V(16),n.bt=a,n.H&&(n.H.Ge=a),512&n.st&&4&n.F&&(n.ht=y(n.ht,a)),E()):n.H&&(n.H.Xe=Z),n.ot=16185;case 16185:if(1024&n.st&&(d=n.bt,d>l&&(d=l),d&&(n.H&&n.H.Xe&&n.H.Jt&&(g=n.H.Ge-n.bt)<n.H.Jt&&M(n.H.Xe,g,r,i,d),512&n.st&&4&n.F&&(n.ht=W(n.ht,r.subarray(i,i+d),d)),l-=d,i+=d,n.bt-=d),n.bt))return m();n.bt=0,n.ot=16186;case 16186:if(2048&n.st){if(0==l)return m();d=0;do{g=r[i+d++],n.H&&n.H.Kt&&n.bt<n.H.Kt&&(n.H.Je[n.bt++]=g);}while(g&&d<l);if(512&n.st&&4&n.F&&(n.ht=W(n.ht,r.subarray(i,i+d),d)),l-=d,i+=d,g)return m()}else n.H&&(n.H.Je=Z);n.bt=0,n.ot=16187;case 16187:if(4096&n.st){if(0==l)return m();d=0;do{g=r[i+d++],n.H&&n.H.Ct&&n.bt<n.H.Ct&&(n.H.Ke[n.bt++]=g);}while(g&&d<l);if(512&n.st&&4&n.F&&(n.ht=W(n.ht,r.subarray(i,i+d),d)),l-=d,i+=d,g)return m()}else n.H&&(n.H.Ke=Z);n.ot=16188;case 16188:if(512&n.st){if(V(16),4&n.F&&a!=(65535&n.ht)){e.msg="header crc mismatch",n.ot=16209;break}E();}n.H&&(n.H.He=n.st>>9&1,n.H.Yt=1),e.i=n.ht=W(0),n.ot=16191;break;case 16189:V(32),e.i=n.ht=M_(a),E(),n.ot=16190;case 16190:if(!n.ct)return z(),2;e.i=n.ht=se(0),n.ot=16191;case 16191:if(5==t||6==t)return m();case 16192:if(n.ut){q(),n.ot=16206;break}switch(V(3),n.ut=!!Q(1),S(1),Q(2)){case 0:n.ot=16193;break;case 1:if(_r(n),n.ot=16199,6==t)return S(2),m();break;case 2:n.ot=16196;break;case 3:e.msg="invalid block type",n.ot=16209;}S(2);break;case 16193:if(q(),V(32),(65535&a)!=(a>>>16^65535)){e.msg="invalid stored block lengths",n.ot=16209;break}if(n.bt=65535&a,E(),n.ot=16194,6==t)return m();case 16194:n.ot=16195;case 16195:if(d=n.bt,d){if(d>l&&(d=l),d>o&&(d=o),0==d)return m();M(f,_,r,i,d),l-=d,i+=d,o-=d,_+=d,n.bt-=d;break}n.ot=16191;break;case 16196:if(V(14),n.kt=Q(5)+257,S(5),n.xt=Q(5)+1,S(5),n.vt=Q(4)+4,S(4),n.kt>286||!n.Nt&&n.xt>30){e.msg=n.Nt?"too many length":"too many length or distance symbols",n.ot=16209;break}n.yt=0,n.ot=16197;case 16197:for(;n.yt<n.vt;)V(3),n.Lt[Se[n.yt++]]=Q(3),S(3);for(;n.yt<19;)n.Lt[Se[n.yt++]]=0;n.It=n.zt,n.et=n.tt=n.It,n.nt=7;let c={Rt:n.It},k={Rt:n.nt},x={Rt:0};if(v=Oe(0,n.Lt,19,c,k,n.Mt,x,n.Nt),n.It=c.Rt,n.nt=k.Rt,v){e.msg="invalid code lengths set",n.ot=16209;break}n.yt=0,n.ot=16198;case 16198:for(;n.yt<n.kt+n.xt;){for(;w=n.et[Q(n.nt)],!(w.ft<=u);)N();if(w.lt<16)S(w.ft),n.Lt[n.yt++]=w.lt;else {if(16==w.lt){if(V(w.ft+2),S(w.ft),0==n.yt){e.msg="invalid bit length repeat",n.ot=16209;break}g=n.Lt[n.yt-1],d=3+Q(2),S(2);}else 17==w.lt?(V(w.ft+3),S(w.ft),g=0,d=3+Q(3),S(3)):(V(w.ft+7),S(w.ft),g=0,d=11+Q(7),S(7));if(n.yt+d>n.kt+n.xt){e.msg="invalid bit length repeat",n.ot=16209;break}for(;d--;)n.Lt[n.yt++]=g;}}if(16209==n.ot)break;if(0==n.Lt[256]){e.msg="invalid code -- missing end-of-block",n.ot=16209;break}n.It=n.zt,n.nt=9;let A={Rt:n.It},$={Rt:n.nt},D={Rt:0};v=Oe(1,n.Lt,n.kt,A,$,n.Mt,D,n.Nt),n.It=A.Rt,n.nt=$.Rt;let O=D.Rt;if(n.et=n.It.slice(0,O),v){e.msg="invalid literal/lengths set",n.ot=16209;break}n.rt=6;let T=n.Lt.subarray(n.kt,n.kt+n.xt),B={Rt:n.It},R={Rt:n.rt},U={Rt:O};if(v=Oe(2,T,n.xt,B,R,n.Mt,U,n.Nt),n.It=B.Rt,n.rt=R.Rt,n.tt=n.It.slice(O),v){e.msg="invalid distances set",n.ot=16209;break}if(n.ot=16199,6==t)return m();case 16199:n.ot=16200;case 16200:if(!n.Nt&&l>=6&&o>=258){z(),Vt(e,s),L(),16191==n.ot&&(n.Zt=-1);break}for(n.Zt=0;w=n.et[Q(n.nt)],!(w.ft<=u);)N();if(w._t&&!(240&w._t)){for(b=w;w=n.et[b.lt+(Q(b.ft+b._t)>>b.ft)],!(b.ft+w.ft<=u);)N();S(b.ft),n.Zt+=b.ft;}if(S(w.ft),n.Zt+=w.ft,n.bt=w.lt,0==w._t){n.ot=16205;break}if(32&w._t){n.Zt=-1,n.ot=16191;break}if(64&w._t){e.msg="invalid literal/length code",n.ot=16209;break}n.Xe=w._t&(n.Nt?31:15),n.ot=16201;case 16201:n.Xe&&(V(n.Xe),n.bt+=Q(n.Xe),S(n.Xe),n.Zt+=n.Xe),n.Wt=n.bt,n.ot=16202;case 16202:for(;w=n.tt[Q(n.rt)],!(w.ft<=u);)N();if(!(240&w._t)){for(b=w;w=n.tt[b.lt+(Q(b.ft+b._t)>>b.ft)],!(b.ft+w.ft<=u);)N();S(b.ft),n.Zt+=b.ft;}if(S(w.ft),n.Zt+=w.ft,64&w._t){e.msg="invalid distance code",n.ot=16209;break}n.gt=w.lt,n.Xe=15&w._t,n.ot=16203;case 16203:n.Xe&&(V(n.Xe),n.gt+=Q(n.Xe),S(n.Xe),n.Zt+=n.Xe),n.ot=16204;case 16204:if(0==o)return m();if(d=s-o,n.gt>d){if(d=n.gt-d,d>n.k&&n.it){e.msg="invalid distance too far back",n.ot=16209;break}d>n.m?(d-=n.m,h=n.h-d):h=n.m-d,d>n.bt&&(d=n.bt),d>o&&(d=o);for(let e=0;e<d;++e)f[_]=255&n.u[h],++_,++h;}else {h=_-n.gt,d=n.bt,d>o&&(d=o);for(let e=0;e<d;++e)f[_]=f[h],++_,++h;}d>o&&(d=o),o-=d,n.bt-=d,0==n.bt&&(n.ot=16200);break;case 16205:if(0==o)return m();f[_++]=n.bt,o--,n.ot=16200;break;case 16206:if(n.F){if(V(32),s-=o,e.total_out+=s,n.wt+=s,4&n.F&&s){let t=f.subarray(_-s,_);e.i=n.ht=p(n.ht,t,s);}if(s=o,4&n.F&&(n.st?a:M_(a)>>>0)!=n.ht){e.msg="incorrect data check",n.ot=16209;break}E();}n.ot=16207;case 16207:if(n.F&&n.st){if(V(32),4&n.F&&a!=(4294967295&n.wt)){e.msg="incorrect length check",n.ot=16209;break}E();}n.ot=16208;case 16208:return v=1,m();case 16209:return v=-3,m();case 16210:return -4;default:return -2}}catch(e){if(e instanceof x_)return m();throw e}function m(){if(z(),n.h||s!=e.avail_out&&n.ot<16209&&(n.Nt?n.ot<16208:n.ot<16206)||4!=t){let t=s-e.avail_out;if(tr(e,e.next_out.subarray(e.next_out_index-t,e.next_out_index),t))return n.ot=16210,-4}return c-=e.avail_in,s-=e.avail_out,e.total_in+=c,e.total_out+=s,n.wt+=s,4&n.F&&s&&(e.i=n.ht=p(n.ht,e.next_out.subarray(e.next_out_index-s,e.next_out_index),s)),e.t=n.I+(n.ut?64:0)+(16191==n.ot?128:0)+(16199==n.ot||16194==n.ot?256:0),(0==c&&0==s&&0==v||4==t&&0==v)&&(v=-5),v}function p(e,t,r){return n.st?W(e,t,r):se(e,t,r)}function y(e,t){return k[0]=255&t,k[1]=t>>>8&255,W(e,k,2)>>>0}function I(e,t){return k[0]=255&t,k[1]=t>>>8&255,k[2]=t>>>16&255,k[3]=t>>>24&255,W(e,k,4)>>>0}function L(){f=e.next_out,_=e.next_out_index,o=e.avail_out,r=e.next_in,i=e.next_in_index,l=e.avail_in,a=n.p,u=n.I;}function z(){e.next_out=f,e.next_out_index=_,e.avail_out=o,e.next_in=r,e.next_in_index=i,e.avail_in=l,n.p=a,n.I=u;}function E(){a=0,u=0;}function N(){if(0==l)throw new x_;l--,a+=(255&r[i])<<u,i++,a>>>=0,u+=8;}function V(e){for(;u<e;)N();}function Q(e){return a&(1<<e)-1}function S(e){a>>>=e,u-=e;}function q(){a>>>=7&u,u-=7&u;}}function _n(e){return Ke(e)?-2:0}var X_=65536,nr=32768,Y_=class{constructor(e=16,t=X_){this.jt=[],this.Gt=e;for(let n=0;n<N.min(e,4);n++)this.jt.push(new x(t));}acquire(e=X_){for(let t=this.jt.length-1;t>=0;t--){let n=this.jt[t];if(n.length>=e)return this.jt.splice(t,1),n}return new x(e)}release(e){this.jt.length<this.Gt&&this.jt.push(e);}};function tn(e){let t=new Y_(32,X_),n=null;function r(e){try{t.release(e);}catch{}}return new U({start(){},transform(i,f){if(!n){let t=e.en(),r=e.tn(t);if(0!=r&&0!=r)throw new z("init failed: "+r);n={o:t};}let _=n.o,l=0;for(;l<i.length;){let n=N.min(i.length-l,nr),o=i.subarray(l,l+n);for(_.next_in=o,_.next_in_index=0,_.avail_in=o.length;_.avail_in>0;){let n=t.acquire(),i=false;try{_.next_out=n,_.next_out_index=0,_.avail_out=n.length;let r=e.nn(_,0),l=n.length-_.avail_out;if(l>0){let e=!1,r={rn:n.subarray(0,l),release:()=>{e||(e=!0,t.release(n));}};i=!0,f.enqueue(r);}if(0!=r&&1!=r)throw new z("process error: "+r)}finally{i||r(n);}}l+=n;}},flush(i){if(!n)return;let f=n.o;for(;;){let n=t.acquire(),_=false;try{f.next_out=n,f.next_out_index=0,f.avail_out=n.length;let r=e.nn(f,4),l=n.length-f.avail_out;if(l>0){let e=!1,r={rn:n.subarray(0,l),release:()=>{e||(e=!0,t.release(n));}};_=!0,i.enqueue(r);}if(1==r)break;if(0!=r)throw new z("finalization error: "+r)}finally{_||r(n);}}let _=e.fn(f);if(0!=_&&0!=_)throw new z("end failed: "+_)}})}function nn(){return new U({start(){},transform(e,t){try{t.enqueue(e.rn.slice(0));}finally{e.release();}},flush(){}})}function rr(e="deflate",t){let n="gzip"==e?31:"deflate-raw"==e?-15:15,r=t&&"number"==typeof t.level?t.level:-1;return tn({en:()=>yt(),tn:e=>It(e,r,8,n,8,0),nn:kt,fn:F_})}function ar(e="deflate"){let t="gzip"==e?31:"deflate-raw"==e?-15:"deflate64-raw"==e?-16:15;return tn({en:()=>Qt(),tn:e=>$t(e,t),nn:en,fn:_n})}var p_=class{constructor(e="deflate",t){let n=rr(e,t);this.writable=n.writable,this.readable=n.readable.pipeThrough(nn());}},S_=class{constructor(e="deflate"){let t=ar(e);this.writable=t.writable,this.readable=t.readable.pipeThrough(nn());}};

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


	configure({
		workerURI: "./core/web-worker-native.js",
		wasmURI: null,
		CompressionStreamZlib: p_,
		DecompressionStreamZlib: S_
	});

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


	i(configure);

	exports.BlobReader = BlobReader;
	exports.BlobWriter = BlobWriter;
	exports.Data64URIReader = Data64URIReader;
	exports.Data64URIWriter = Data64URIWriter;
	exports.ERR_AMBIGUOUS_ARCHIVE = ERR_AMBIGUOUS_ARCHIVE;
	exports.ERR_BAD_FORMAT = ERR_BAD_FORMAT;
	exports.ERR_CENTRAL_DIRECTORY_NOT_FOUND = ERR_CENTRAL_DIRECTORY_NOT_FOUND;
	exports.ERR_DUPLICATED_NAME = ERR_DUPLICATED_NAME;
	exports.ERR_ENCRYPTED = ERR_ENCRYPTED;
	exports.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND;
	exports.ERR_EOCDR_NOT_FOUND = ERR_EOCDR_NOT_FOUND;
	exports.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = ERR_EXTRAFIELD_ZIP64_NOT_FOUND;
	exports.ERR_HTTP_RANGE = ERR_HTTP_RANGE;
	exports.ERR_INVALID_COMMENT = ERR_INVALID_COMMENT;
	exports.ERR_INVALID_COMPRESSED_DATA = ERR_INVALID_COMPRESSED_DATA;
	exports.ERR_INVALID_ENCRYPTION_STRENGTH = ERR_INVALID_ENCRYPTION_STRENGTH;
	exports.ERR_INVALID_ENTRY_COMMENT = ERR_INVALID_ENTRY_COMMENT;
	exports.ERR_INVALID_ENTRY_NAME = ERR_INVALID_ENTRY_NAME;
	exports.ERR_INVALID_EXTRAFIELD_DATA = ERR_INVALID_EXTRAFIELD_DATA;
	exports.ERR_INVALID_EXTRAFIELD_TYPE = ERR_INVALID_EXTRAFIELD_TYPE;
	exports.ERR_INVALID_PASSWORD = ERR_INVALID_PASSWORD;
	exports.ERR_INVALID_SIGNATURE = ERR_INVALID_SIGNATURE;
	exports.ERR_INVALID_UNCOMPRESSED_SIZE = ERR_INVALID_UNCOMPRESSED_SIZE;
	exports.ERR_INVALID_VERSION = ERR_INVALID_VERSION;
	exports.ERR_ITERATOR_COMPLETED_TOO_SOON = ERR_ITERATOR_COMPLETED_TOO_SOON;
	exports.ERR_LOCAL_FILE_HEADER_NOT_FOUND = ERR_LOCAL_FILE_HEADER_NOT_FOUND;
	exports.ERR_OVERLAPPING_ENTRY = ERR_OVERLAPPING_ENTRY;
	exports.ERR_SPLIT_ZIP_FILE = ERR_SPLIT_ZIP_FILE;
	exports.ERR_UNDEFINED_READER = ERR_UNDEFINED_READER;
	exports.ERR_UNDEFINED_UNCOMPRESSED_SIZE = ERR_UNDEFINED_UNCOMPRESSED_SIZE;
	exports.ERR_UNSUPPORTED_COMPRESSION = ERR_UNSUPPORTED_COMPRESSION$1;
	exports.ERR_UNSUPPORTED_ENCRYPTION = ERR_UNSUPPORTED_ENCRYPTION;
	exports.ERR_UNSUPPORTED_FORMAT = ERR_UNSUPPORTED_FORMAT;
	exports.ERR_WRITER_NOT_INITIALIZED = ERR_WRITER_NOT_INITIALIZED;
	exports.ERR_ZIP_NOT_EMPTY = ERR_ZIP_NOT_EMPTY;
	exports.HttpRangeReader = HttpRangeReader;
	exports.HttpReader = HttpReader;
	exports.Reader = Reader;
	exports.SplitDataReader = SplitDataReader;
	exports.SplitDataWriter = SplitDataWriter;
	exports.TextReader = TextReader;
	exports.TextWriter = TextWriter;
	exports.Uint8ArrayReader = Uint8ArrayReader;
	exports.Uint8ArrayWriter = Uint8ArrayWriter;
	exports.Writer = Writer;
	exports.ZipReader = ZipReader;
	exports.ZipReaderStream = ZipReaderStream;
	exports.ZipWriter = ZipWriter;
	exports.ZipWriterStream = ZipWriterStream;
	exports.configure = configure;
	exports.createBlobTempStream = createBlobTempStream;
	exports.createOPFSTempStream = createOPFSTempStream;
	exports.createSyncAccessHandleTempStream = createSyncAccessHandleTempStream;
	exports.getMimeType = getMimeType;
	exports.terminateWorkers = terminateWorkers;

}));
