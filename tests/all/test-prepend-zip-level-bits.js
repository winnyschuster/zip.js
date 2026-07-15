import * as zip from "../zip-lib.js";

export { test };

const TEXT_CONTENT = "The quick brown fox jumps over the lazy dog. ".repeat(40);

// prependZip copies existing entries into a new archive; it must preserve each entry's metadata
// verbatim. The general purpose flag's 2-bit compression-level field (Normal / Maximum / Fast /
// Super Fast) was being rebuilt through getBitFlag, which reinterprets the raw 2-bit value the
// reader decoded as a 0-9 compression level and collapses every deflated entry to "Super Fast".
// Each write level below maps to a distinct level-bit value, which must survive the round-trip.
const LEVEL_BITS = [
	{ filename: "normal.txt", level: 6, expected: 0 },
	{ filename: "maximum.txt", level: 9, expected: 1 },
	{ filename: "fast.txt", level: 4, expected: 2 },
	{ filename: "superfast.txt", level: 1, expected: 3 }
];

async function test() {
	zip.configure({ useWebWorkers: false });
	try {
		// build a source archive whose entries span all four compression-level flag values
		const sourceWriter = new zip.BlobWriter("application/zip");
		const sourceZipWriter = new zip.ZipWriter(sourceWriter);
		for (const { filename, level } of LEVEL_BITS) {
			await sourceZipWriter.add(filename, new zip.TextReader(TEXT_CONTENT), { level });
		}
		await sourceZipWriter.close();
		const sourceBlob = await sourceWriter.getData();
		// sanity check: the source really does encode the four distinct level-bit values
		await assertLevelBits(sourceBlob, "source");
		// prepend the source archive into a fresh writer, then close it
		const destWriter = new zip.BlobWriter("application/zip");
		const destZipWriter = new zip.ZipWriter(destWriter);
		await destZipWriter.prependZip(new zip.BlobReader(sourceBlob));
		await destZipWriter.close();
		const destBlob = await destWriter.getData();
		// the prepended archive must carry the same level bits and still read back correctly
		await assertLevelBits(destBlob, "prependZip");
	} finally {
		await zip.terminateWorkers();
	}
}

async function assertLevelBits(blob, label) {
	const reader = new zip.ZipReader(new zip.BlobReader(blob));
	const entries = await reader.getEntries();
	const byName = new Map(entries.map(entry => [entry.filename, entry]));
	for (const { filename, expected } of LEVEL_BITS) {
		const entry = byName.get(filename);
		if (!entry) {
			throw new Error(label + ": missing entry " + filename);
		}
		if (entry.bitFlag.level != expected) {
			throw new Error(label + ": " + filename + " level bits " + entry.bitFlag.level + ", expected " + expected);
		}
		const content = await entry.getData(new zip.TextWriter());
		if (content != TEXT_CONTENT) {
			throw new Error(label + ": " + filename + " did not round-trip");
		}
	}
	await reader.close();
}
