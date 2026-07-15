import * as zip from "../zip-lib.js";

const TEXT_CONTENT = "content";
const FILENAME = "file.txt";
const MAX_32_BITS = 0xFFFFFFFF;
const CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
const ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
const EXTRAFIELD_TYPE_ZIP64 = 0x0001;

export { test };

async function test() {
	zip.configure({ chunkSize: 128, useWebWorkers: true });
	try {
		// reference archive used to measure the length of the local entry data,
		// which is also the physical offset of the central directory
		const referenceArray = await writeZip();
		const localDataLength = new DataView(referenceArray.buffer).getUint32(referenceArray.length - 22 + 16, true);
		// entry offset exactly at the 32-bit sentinel: the central directory record
		// must store the sentinel resolved by a zip64 extra field
		checkEntryOffset(await writeZip(MAX_32_BITS), localDataLength);
		// central directory offset exactly at the sentinel: the end of central directory
		// record must store the sentinel resolved by a zip64 end of central directory record
		checkDirectoryOffset(await writeZip(MAX_32_BITS - localDataLength));
	} finally {
		await zip.terminateWorkers();
	}
}

async function writeZip(offset) {
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter, { level: 0, dataDescriptor: false, extendedTimestamp: false, offset });
	await zipWriter.add(FILENAME, new zip.TextReader(TEXT_CONTENT));
	await zipWriter.close();
	return new Uint8Array(await (await blobWriter.getData()).arrayBuffer());
}

function checkEntryOffset(array, directoryOffset) {
	const view = new DataView(array.buffer);
	if (view.getUint32(directoryOffset, true) != CENTRAL_FILE_HEADER_SIGNATURE ||
		view.getUint32(directoryOffset + 42, true) != MAX_32_BITS ||
		getExtraFieldZip64Offset(array, view, directoryOffset) != BigInt(MAX_32_BITS)) {
		throw new Error();
	}
}

function checkDirectoryOffset(array) {
	const view = new DataView(array.buffer);
	const zip64EndOfDirectoryOffset = findSignature(array, view, ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
	if (view.getUint32(array.length - 22 + 16, true) != MAX_32_BITS ||
		zip64EndOfDirectoryOffset == -1 ||
		view.getBigUint64(zip64EndOfDirectoryOffset + 48, true) != BigInt(MAX_32_BITS)) {
		throw new Error();
	}
}

function getExtraFieldZip64Offset(array, view, directoryOffset) {
	const filenameLength = view.getUint16(directoryOffset + 28, true);
	let offset = directoryOffset + 46 + filenameLength;
	const offsetEnd = offset + view.getUint16(directoryOffset + 30, true);
	while (offset < offsetEnd) {
		const type = view.getUint16(offset, true);
		const size = view.getUint16(offset + 2, true);
		if (type == EXTRAFIELD_TYPE_ZIP64) {
			return view.getBigUint64(offset + 4, true);
		}
		offset += 4 + size;
	}
	return -1;
}

function findSignature(array, view, signature) {
	for (let offset = array.length - 4; offset >= 0; offset--) {
		if (view.getUint32(offset, true) == signature) {
			return offset;
		}
	}
	return -1;
}
