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
	} finally {
		await zip.terminateWorkers();
	}
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
