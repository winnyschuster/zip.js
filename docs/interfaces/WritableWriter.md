[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / WritableWriter

# Interface: WritableWriter

Defined in: [index.d.ts:586](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L586)

Represents an instance used to write data into a `WritableStream` instance.

## Properties

### maxSize?

> `optional` **maxSize?**: `number`

Defined in: [index.d.ts:594](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L594)

The maximum size of split data when creating a [ZipWriter](../classes/ZipWriter.md) instance or when calling [FileEntry#getData](FileEntry.md#getdata) with a generator of WritableWriter instances.

***

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:590](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L590)

The `WritableStream` instance.
