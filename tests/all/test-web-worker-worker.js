/* global self */

import * as zip from "../zip-lib.js";

zip.configure({ useWebWorkers: false });

self.onmessage = async event => {
	const { filename, textContent } = event.data;
	try {
		self.postMessage({ data: await roundTrip(filename, textContent) });
	} catch (error) {
		self.postMessage({ error: error.message });
	}
};

async function roundTrip(filename, textContent) {
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter);
	await zipWriter.add(filename, new zip.TextReader(textContent), { level: 3 });
	await zipWriter.close();
	const zipReader = new zip.ZipReader(new zip.BlobReader(await blobWriter.getData()));
	const entries = await zipReader.getEntries();
	const text = await entries[0].getData(new zip.TextWriter());
	await zipReader.close();
	return text;
}
