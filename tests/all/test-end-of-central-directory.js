import * as zip from "../../index.js";

const END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;

export { test };

async function test() {
	zip.configure({ useWebWorkers: true });
	try {
		// a benign comment that happens to embed the end of central directory signature must still open:
		// the record is selected by reaching the end of the file, not by being the first signature scanned
		const comment = new Uint8Array(40);
		comment.set([0x50, 0x4b, 0x05, 0x06], 5);
		await expectFilenames(await buildZip(["a.txt"], comment), ["a.txt"]);

		// an append-remnant archive ([old zip][new zip]) has two end of central directory records but only the
		// last reaches the end of the file; it must open and expose the appended (current) directory
		const oldZip = await buildZip(["old1.txt", "old2.txt"]);
		const newZip = await buildZip(["old1.txt", "old2.txt", "added.txt"]);
		const appendRemnant = concat(oldZip, newZip);
		await expectFilenames(appendRemnant, ["old1.txt", "old2.txt", "added.txt"]);

		// a comment-cloak polyglot embeds a whole second archive inside the outer record's comment, so two
		// records reach the end of the file and each dereferences to a central directory: genuinely ambiguous
		const inner = await buildZip(["evil.sh"]);
		const cloak = await buildZip(["safe.txt"], inner);
		await expectAmbiguous(cloak, "multiple end of central directory records");
		await expectAmbiguous(cloak, "multiple end of central directory records", { checkAmbiguity: true });
		await expectAmbiguous(cloak, "multiple end of central directory records", { strictness: "strict" });
		// tolerant recovers deterministically by picking the last end-anchored record (the inner archive)
		await expectFilenames(cloak, ["evil.sh"], { strictness: "tolerant" });

		// appended data is bounded by strictness: strict rejects any, balanced tolerates up to a 16-bit
		// comment's worth, tolerant accepts any amount
		const base = await buildZip(["a.txt"]);
		const smallAppended = appendFiller(base, 64);
		const largeAppended = appendFiller(base, 70000);
		await expectAmbiguous(smallAppended, "appended data", { strictness: "strict" });
		await expectFilenames(smallAppended, ["a.txt"]);
		await expectAmbiguous(largeAppended, "appended data");
		await expectFilenames(largeAppended, ["a.txt"], { strictness: "tolerant" });
		await expectFilenames(largeAppended, ["a.txt"], { maxAppendedDataSize: 128 * 1024 });

		// a clean archive reads identically under every strictness level
		const clean = await buildZip(["x.txt", "y.txt"]);
		for (const strictness of ["strict", "balanced", "tolerant"]) {
			await expectFilenames(clean, ["x.txt", "y.txt"], { strictness });
		}

		// a comment stuffed with thousands of anchored but unreachable end of central directory records must not
		// amplify into one read per record: the reachability check is served from the tail window already in
		// memory and out-of-window probes are capped, so opening the real archive stays cheap
		const stuffed = stuffWithUnreachableRecords(await buildZip(["real.txt"], new Uint8Array(2000 * 22)), 2000);
		const countingReader = new CountingReader(stuffed);
		const stuffedZipReader = new zip.ZipReader(countingReader);
		try {
			const filenames = (await stuffedZipReader.getEntries()).map(entry => entry.filename);
			if (filenames.join(",") != "real.txt") {
				throw new Error("expected [real.txt] but read [" + filenames + "]");
			}
			if (countingReader.reads > 100) {
				throw new Error("end of central directory scan issued " + countingReader.reads + " reads (expected the amplification to be bounded)");
			}
		} finally {
			await stuffedZipReader.close();
		}
	} finally {
		await zip.terminateWorkers();
	}
}

// counts every readUint8Array call so a test can assert the reader is not driven into unbounded I/O
class CountingReader extends zip.Reader {
	constructor(array) {
		super();
		this.array = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
		this.size = this.array.length;
		this.reads = 0;
	}
	readUint8Array(index, length) {
		this.reads++;
		return this.array.slice(index, index + length);
	}
}

// overwrites the trailing comment of `array` with `count` fake end of central directory records, each one
// anchored to the end of the file (so it is a scan candidate) but pointing at an unreachable central directory
// (so it is correctly rejected). Returns the patched array.
function stuffWithUnreachableRecords(array, count) {
	const view = new DataView(array.buffer, array.byteOffset, array.byteLength);
	const size = array.length;
	const commentStart = size - count * 22;
	for (let index = 0; index < count; index++) {
		const recordOffset = commentStart + index * 22;
		view.setUint32(recordOffset, END_OF_CENTRAL_DIR_SIGNATURE, true);
		view.setUint16(recordOffset + 8, 1, true);
		view.setUint16(recordOffset + 10, 1, true);
		view.setUint32(recordOffset + 12, 1, true);
		view.setUint32(recordOffset + 16, 0xFEFEFEFE, true);
		view.setUint16(recordOffset + 20, size - recordOffset - 22, true);
	}
	return array;
}

async function buildZip(filenames, comment) {
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter, { level: 0, dataDescriptor: false, extendedTimestamp: false });
	for (const filename of filenames) {
		await zipWriter.add(filename, new zip.TextReader("content-of-" + filename));
	}
	await zipWriter.close(comment && comment.length ? comment : undefined);
	return new Uint8Array(await (await blobWriter.getData()).arrayBuffer());
}

function concat(first, second) {
	const array = new Uint8Array(first.length + second.length);
	array.set(first);
	array.set(second, first.length);
	return array;
}

function appendFiller(array, length) {
	const result = new Uint8Array(array.length + length);
	result.set(array);
	result.fill(0x5a, array.length);
	return result;
}

function countEndOfDirectorySignatures(array) {
	const view = new DataView(array.buffer);
	let count = 0;
	for (let indexByte = 0; indexByte + 4 <= array.length; indexByte++) {
		if (view.getUint32(indexByte, true) == END_OF_CENTRAL_DIR_SIGNATURE) {
			count++;
		}
	}
	return count;
}

async function expectFilenames(array, expectedFilenames, options) {
	const zipReader = new zip.ZipReader(new zip.Uint8ArrayReader(array), options);
	try {
		const entries = await zipReader.getEntries();
		const filenames = entries.map(entry => entry.filename);
		if (filenames.join(",") != expectedFilenames.join(",")) {
			throw new Error("expected [" + expectedFilenames + "] but read [" + filenames + "]");
		}
		for (let indexEntry = 0; indexEntry < entries.length; indexEntry++) {
			const data = await entries[indexEntry].getData(new zip.TextWriter());
			if (data != "content-of-" + expectedFilenames[indexEntry]) {
				throw new Error("unexpected content for " + expectedFilenames[indexEntry]);
			}
		}
	} finally {
		await zipReader.close();
	}
}

async function expectAmbiguous(array, reason, options) {
	// make sure the fixture really does contain more than one end of central directory signature
	if (countEndOfDirectorySignatures(array) < 2 && reason == "multiple end of central directory records") {
		throw new Error("fixture is not multi-record");
	}
	const zipReader = new zip.ZipReader(new zip.Uint8ArrayReader(array), options);
	try {
		await zipReader.getEntries();
		throw new Error("expected an ambiguous archive error (" + reason + ")");
	} catch (error) {
		if (error.message != zip.ERR_AMBIGUOUS_ARCHIVE || error.reason != reason) {
			throw error;
		}
	} finally {
		await zipReader.close();
	}
}
