// Adapter for fflate. Uses synchronous zipSync/unzipSync (whole-buffer) for the in-memory
// workloads; the disk mode uses its streaming Zip + ZipDeflate so the comparison is fair on the
// memory axis. fflate has no encryption and no zip64 write support.
import { zipSync, unzipSync, zip as zipAsync, Zip, ZipDeflate } from "fflate";
import { createReadStream, createWriteStream } from "node:fs";

export const name = "fflate";
export const supports = { compress: true, decompress: true, disk: true };

export async function compress(files, { concurrency = "sequential", level = 6 } = {}) {
	const input = {};
	for (const [entryName, data] of Object.entries(files)) {
		input[entryName] = [data, { level }];
	}
	// fflate's async zip() spreads entries across its own worker pool; zipSync is single-threaded.
	if (concurrency === "parallel") {
		const out = await new Promise((resolve, reject) => {
			zipAsync(input, {}, (err, data) => (err ? reject(err) : resolve(data)));
		});
		return { outputSize: out.length };
	}
	const out = zipSync(input, {});
	return { outputSize: out.length };
}

export async function decompress(zipped) {
	const out = unzipSync(zipped);
	let total = 0;
	for (const entryName of Object.keys(out)) {
		total += out[entryName].length;
	}
	return { outputSize: total };
}

// Disk-to-disk with fflate's streaming Zip: deflate is applied per chunk, so only the current chunk
// needs to be resident.
export function compressDisk(inputPath, outputPath, { level = 6 } = {}) {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(outputPath);
		let outputSize = 0;
		const zip = new Zip((err, chunk, final) => {
			if (err) {
				reject(err);
				return;
			}
			outputSize += chunk.length;
			output.write(chunk);
			if (final) {
				output.end();
			}
		});
		const entry = new ZipDeflate("data.bin", { level });
		zip.add(entry);
		const input = createReadStream(inputPath);
		input.on("data", (chunk) => entry.push(chunk, false));
		input.on("end", () => {
			entry.push(new Uint8Array(0), true);
			zip.end();
		});
		input.on("error", reject);
		output.on("finish", () => resolve({ outputSize }));
		output.on("error", reject);
	});
}
