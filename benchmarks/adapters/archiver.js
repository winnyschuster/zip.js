// Adapter for archiver. archiver is Node-only and write-only: it can create zip archives (streaming)
// but cannot read them, so `decompress` is unsupported. It streams by design, hence a disk mode.
import { ZipArchive } from "archiver";
import { createReadStream, createWriteStream, statSync } from "node:fs";
import { Writable } from "node:stream";

export const name = "archiver";
export const supports = { compress: true, decompress: false, disk: true };

// In-memory compress: append each file buffer, collect the output in a counting sink.
export function compress(files, { level = 6 } = {}) {
	return new Promise((resolve, reject) => {
		const archive = new ZipArchive({ zlib: { level } });
		let outputSize = 0;
		const sink = new Writable({
			write(chunk, _enc, cb) {
				outputSize += chunk.length;
				cb();
			}
		});
		sink.on("finish", () => resolve({ outputSize }));
		archive.on("error", reject);
		archive.pipe(sink);
		for (const [entryName, data] of Object.entries(files)) {
			archive.append(Buffer.from(data), { name: entryName });
		}
		archive.finalize();
	});
}

export async function decompress() {
	throw new Error("archiver is write-only (no decompression)");
}

// Disk-to-disk: stream the source file straight into the archive on disk.
export function compressDisk(inputPath, outputPath, { level = 6 } = {}) {
	return new Promise((resolve, reject) => {
		const archive = new ZipArchive({ zlib: { level } });
		const output = createWriteStream(outputPath);
		output.on("close", () => resolve({ outputSize: statSync(outputPath).size }));
		archive.on("error", reject);
		archive.pipe(output);
		archive.append(createReadStream(inputPath), { name: "data.bin" });
		archive.finalize();
	});
}
