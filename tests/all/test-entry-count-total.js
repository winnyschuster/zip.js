import * as zip from "../zip-lib.js";

const CONTENTS = ["alpha-content", "beta-content!", "gamma-content"];

export { test };

async function test() {
	zip.configure({ useWebWorkers: true });
	try {
		const blobWriter = new zip.BlobWriter("application/zip");
		const zipWriter = new zip.ZipWriter(blobWriter, { level: 0, dataDescriptor: false });
		for (let indexContent = 0; indexContent < CONTENTS.length; indexContent++) {
			await zipWriter.add("file" + indexContent + ".txt", new zip.TextReader(CONTENTS[indexContent]));
		}
		await zipWriter.close();
		const array = new Uint8Array(await (await blobWriter.getData()).arrayBuffer());
		// the central directory record count must come from the total-entries field (offset 10),
		// not the entries-on-this-disk field (offset 8) which is smaller when the directory spans disks
		const view = new DataView(array.buffer);
		const endOfDirectoryOffset = array.length - 22;
		view.setUint16(endOfDirectoryOffset + 8, CONTENTS.length - 1, true);
		const zipReader = new zip.ZipReader(new zip.Uint8ArrayReader(array));
		try {
			const entries = await zipReader.getEntries();
			if (entries.length != CONTENTS.length) {
				throw new Error();
			}
			for (let indexEntry = 0; indexEntry < entries.length; indexEntry++) {
				const data = await entries[indexEntry].getData(new zip.TextWriter());
				if (data != CONTENTS[indexEntry]) {
					throw new Error();
				}
			}
		} finally {
			await zipReader.close();
		}
	} finally {
		await zip.terminateWorkers();
	}
}
