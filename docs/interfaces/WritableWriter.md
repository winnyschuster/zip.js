[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / WritableWriter

# Interface: WritableWriter

Defined in: [index.d.ts:528](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L528)

Represents an instance used to write data into a `WritableStream` instance.

## Properties

### maxSize?

> `optional` **maxSize?**: `number`

Defined in: [index.d.ts:536](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L536)

The maximum size of split data when creating a [ZipWriter](../classes/ZipWriter.md) instance or when calling [FileEntry#getData](FileEntry.md#getdata) with a generator of WritableWriter instances.

***

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:532](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L532)

The `WritableStream` instance.
