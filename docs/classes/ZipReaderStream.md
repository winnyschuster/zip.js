[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipReaderStream

# Class: ZipReaderStream\<T\>

Defined in: [index.d.ts:701](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L701)

Represents an instance used to create an unzipped stream.

## Example

This example will take a zip file, decompress it and then save its files and directories to disk.
```
import {resolve} from "https://deno.land/std/path/mod.ts";
import {ensureDir, ensureFile} from "https://deno.land/std/fs/mod.ts";

for await (const entry of (await fetch(urlToZippedFile)).body.pipeThrough(new ZipReaderStream())) {
  const fullPath = resolve(destination, entry.filename);
  if (entry.directory) {
    await ensureDir(fullPath);
    continue;
  }

  await ensureFile(fullPath);
  await entry.readable?.pipeTo((await Deno.create(fullPath)).writable);
}
```

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new ZipReaderStream**\<`T`\>(`options?`): `ZipReaderStream`\<`T`\>

Defined in: [index.d.ts:707](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L707)

Creates the stream.

#### Parameters

##### options?

[`ZipReaderConstructorOptions`](../interfaces/ZipReaderConstructorOptions.md)

The options.

#### Returns

`ZipReaderStream`\<`T`\>

## Properties

### readable

> **readable**: `ReadableStream`\<`Omit`\<[`Entry`](../type-aliases/Entry.md), `"getData"`\> & `object`\>

Defined in: [index.d.ts:712](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L712)

The readable stream.

***

### writable

> **writable**: `WritableStream`\<`T`\>

Defined in: [index.d.ts:719](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L719)

The writable stream.
