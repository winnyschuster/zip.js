[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / TempStream

# Interface: TempStream

Defined in: [index.d.ts:333](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L333)

A `TransformStream`-like temporary buffer returned by a [ZipWriterConstructorOptions.createTempStream](ZipWriterConstructorOptions.md#createtempstream) factory.

## Properties

### dispose?

> `optional` **dispose?**: () => `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:345](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L345)

Optional cleanup, called once the entry has been processed (on success, error, or abort) to release any backing resource.

#### Returns

`void` \| `Promise`\<`void`\>

***

### readable

> **readable**: `ReadableStream`

Defined in: [index.d.ts:341](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L341)

The readable side, replayed into the final zip stream once the entry is ready.

***

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:337](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L337)

The writable side, receiving the compressed data of a buffered entry.
