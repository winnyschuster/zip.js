import * as zip from "../../index.js";

const TEXT_CONTENT = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.";
const FILENAME = "folder/lorem.txt";

export { test };

async function test() {
	zip.configure({ chunkSize: 128, useWebWorkers: true });
	try {
		const fs = new zip.fs.FS();
		fs.addText(FILENAME, TEXT_CONTENT);
		// FS.exportZip writes to a caller-supplied writer, mirroring FS.importZip
		const blobWriter = new zip.BlobWriter("application/zip");
		await fs.exportZip(blobWriter);
		const blob = await blobWriter.getData();
		// FS.importZip reads from a caller-supplied reader
		const importedFs = new zip.fs.FS();
		await importedFs.importZip(new zip.BlobReader(blob));
		const fileEntry = importedFs.find(FILENAME);
		if (!fileEntry || await fileEntry.getText() != TEXT_CONTENT) {
			throw new Error();
		}
	} finally {
		await zip.terminateWorkers();
	}
}
