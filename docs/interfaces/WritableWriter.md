[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / WritableWriter

# Interface: WritableWriter

Defined in: [index.d.ts:625](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L625)

Represents an instance used to write data into a `WritableStream` instance.

## Properties

### maxSize?

> `optional` **maxSize?**: `number`

Defined in: [index.d.ts:633](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L633)

The maximum size of split data when creating a [ZipWriter](../classes/ZipWriter.md) instance or when calling [FileEntry#getData](FileEntry.md#getdata) with a generator of WritableWriter instances.

***

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:629](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L629)

The `WritableStream` instance.
