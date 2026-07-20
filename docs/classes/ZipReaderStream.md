[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipReaderStream

# Class: ZipReaderStream\<T\>

Defined in: [index.d.ts:814](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L814)

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

Defined in: [index.d.ts:820](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L820)

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

Defined in: [index.d.ts:825](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L825)

The readable stream.

***

### writable

> **writable**: `WritableStream`\<`T`\>

Defined in: [index.d.ts:832](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L832)

The writable stream.
