/* global Blob */

import * as zip from "../../index.js";

const TEXT_CONTENT = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.";
const FILENAME = "lorem.txt";
const BLOB = new Blob([TEXT_CONTENT], { type: zip.getMimeType(FILENAME) });

export { test };

async function test() {
	zip.configure({ chunkSize: 128, useWebWorkers: true });
	const lastModDate = new Date(2021, 0, 1, 0, 0, 2);
	const lastAccessDate = new Date(2022, 5, 15, 10, 30, 4);
	const creationDate = new Date(2020, 2, 3, 8, 45, 6);
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter);
	await zipWriter.add(FILENAME, new zip.BlobReader(BLOB), { extendedTimestamp: true, lastModDate, lastAccessDate, creationDate });
	await zipWriter.close();
	const zipReader = new zip.ZipReader(new zip.BlobReader(await blobWriter.getData()));
	const entries = await zipReader.getEntries();
	const entry = entries[0];
	const datesBeforeGetData = getTimes(entry);
	const text = await entry.getData(new zip.TextWriter());
	const datesAfterGetData = getTimes(entry);
	await zipReader.close();
	await zip.terminateWorkers();
	if (text != TEXT_CONTENT ||
		datesBeforeGetData.lastAccessDate != lastAccessDate.getTime() ||
		datesBeforeGetData.creationDate != creationDate.getTime() ||
		datesAfterGetData.lastAccessDate != lastAccessDate.getTime() ||
		datesAfterGetData.creationDate != creationDate.getTime()) {
		throw new Error();
	}
}

function getTimes(entry) {
	return {
		lastAccessDate: entry.lastAccessDate && entry.lastAccessDate.getTime(),
		creationDate: entry.creationDate && entry.creationDate.getTime()
	};
}
