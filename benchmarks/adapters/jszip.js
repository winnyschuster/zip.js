// Adapter for jszip. jszip buffers the entire archive in memory; there is no true streaming
// read/write and no disk-to-disk mode, so `disk` is intentionally unsupported.
import JSZip from "jszip";
import { readFileSync, writeFileSync } from "node:fs";

export const name = "jszip";
export const supports = { compress: true, decompress: true, disk: false };

export async function compress(files, { level = 6 } = {}) {
	const zip = new JSZip();
	for (const [entryName, data] of Object.entries(files)) {
		zip.file(entryName, data);
	}
	const out = await zip.generateAsync({
		type: "uint8array",
		compression: "DEFLATE",
		compressionOptions: { level }
	});
	return { outputSize: out.length };
}

export async function decompress(zipped) {
	const zip = await JSZip.loadAsync(zipped);
	let total = 0;
	const names = Object.keys(zip.files);
	for (const entryName of names) {
		const file = zip.files[entryName];
		if (!file.dir) {
			const data = await file.async("uint8array");
			total += data.length;
		}
	}
	return { outputSize: total };
}

// jszip cannot stream a file from disk to a zip on disk: loadAsync/generateAsync require the whole
// buffer. We still expose a disk entry so the harness can show the memory cost of that constraint.
export async function compressDisk(inputPath, outputPath, { level = 6 } = {}) {
	const data = readFileSync(inputPath); // whole file must be resident
	const zip = new JSZip();
	zip.file("data.bin", data);
	const out = await zip.generateAsync({
		type: "uint8array",
		compression: "DEFLATE",
		compressionOptions: { level }
	});
	writeFileSync(outputPath, out);
	return { outputSize: out.length };
}
