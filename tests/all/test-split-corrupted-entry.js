import * as zip from "../../index.js";

const GOOD_CONTENT = "good-content";
const SEGMENT_SIZE = 400;

export { test };

// a reader whose data source fails partway through, to trigger the corrupted-entry recovery path
class FailingReader extends zip.Reader {

	constructor(failAfter) {
		super();
		this.failAfter = failAfter;
		this.size = 10000;
	}

	readUint8Array(offset) {
		if (offset >= this.failAfter) {
			throw new Error("simulated source failure");
		}
		return new Uint8Array(Math.min(1000, this.failAfter - offset));
	}
}

async function test() {
	zip.configure({ useWebWorkers: false });
	try {
		const writers = [];
		function* blobWriterGenerator() {
			while (true) {
				const writer = new zip.BlobWriter();
				writer.maxSize = SEGMENT_SIZE;
				writers.push(writer);
				yield writer;
			}
		}
		const zipWriter = new zip.ZipWriter(blobWriterGenerator());
		await zipWriter.add("good0.txt", new zip.TextReader(GOOD_CONTENT), { level: 0 });
		// this entry fails mid-write; the offset of the next entry must not be corrupted
		try {
			await zipWriter.add("bad.txt", new FailingReader(500), { level: 0 });
			throw new Error();
		} catch (error) {
			if (error.message != "simulated source failure") {
				throw error;
			}
		}
		await zipWriter.add("good1.txt", new zip.TextReader(GOOD_CONTENT), { level: 0 });
		await zipWriter.close();
		const readers = await Promise.all(writers.map(async writer => new zip.BlobReader(await writer.getData())));
		const zipReader = new zip.ZipReader(new zip.SplitDataReader(readers));
		try {
			const entries = await zipReader.getEntries();
			const goodEntries = entries.filter(entry => entry.filename.startsWith("good"));
			if (goodEntries.length != 2) {
				throw new Error();
			}
			for (const entry of goodEntries) {
				const data = await entry.getData(new zip.TextWriter(), { checkSignature: true });
				if (data != GOOD_CONTENT) {
					throw new Error();
				}
			}
		} finally {
			await zipReader.close();
		}
	} finally {
		zip.configure({ useWebWorkers: true });
		await zip.terminateWorkers();
	}
}
