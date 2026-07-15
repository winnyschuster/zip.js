import * as zip from "../zip-lib.js";

const ENTRIES_LENGTH = 20;
const MIN_SEGMENT_SIZE = 700;
const MAX_SEGMENT_SIZE = 2100;
const SEGMENT_SIZE_STEP = 13;
const CONTENTS = new Array(ENTRIES_LENGTH).fill().map((_, indexContent) => String.fromCharCode(65 + indexContent).repeat(50 + indexContent * 7));

export { test };

async function test() {
	zip.configure({ chunkSize: 1024, useWebWorkers: false });
	for (const zip64 of [false, true]) {
		// scan zip64 coarsely, its headers only differ from the other entries by their size
		const segmentSizeStep = zip64 ? SEGMENT_SIZE_STEP * 3 : SEGMENT_SIZE_STEP;
		for (const parallel of [false, true]) {
			for (let segmentSize = MIN_SEGMENT_SIZE; segmentSize <= MAX_SEGMENT_SIZE; segmentSize += segmentSizeStep) {
				await testSegmentSize(segmentSize, parallel, zip64);
			}
		}
	}
	await zip.terminateWorkers();
}

async function testSegmentSize(segmentSize, parallel, zip64) {
	const writers = [];
	function* blobWriterGenerator() {
		while (true) {
			const writer = new zip.BlobWriter();
			writer.maxSize = segmentSize;
			writers.push(writer);
			yield writer;
		}
	}
	const zipWriter = new zip.ZipWriter(blobWriterGenerator(), { zip64 });
	if (parallel) {
		await Promise.all(CONTENTS.map((content, indexContent) => zipWriter.add("file" + indexContent + ".txt", new zip.TextReader(content), { level: 0 })));
	} else {
		for (let indexContent = 0; indexContent < CONTENTS.length; indexContent++) {
			await zipWriter.add("file" + indexContent + ".txt", new zip.TextReader(CONTENTS[indexContent]), { level: 0 });
		}
	}
	await zipWriter.close();
	const readers = await Promise.all(writers.map(async writer => new zip.BlobReader(await writer.getData())));
	const zipReader = new zip.ZipReader(new zip.SplitDataReader(readers));
	const entries = await zipReader.getEntries();
	if (entries.length != CONTENTS.length) {
		throw new Error();
	}
	for (const entry of entries) {
		const data = await entry.getData(new zip.TextWriter());
		if (data != CONTENTS[Number(entry.filename.match(/\d+/)[0])]) {
			throw new Error();
		}
	}
	await zipReader.close();
}
