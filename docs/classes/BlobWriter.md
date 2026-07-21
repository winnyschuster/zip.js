[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / BlobWriter

# Class: BlobWriter

Defined in: [index.d.ts:703](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L703)

Represents a [WritableWriter](../interfaces/WritableWriter.md) instance used to retrieve the written data as a `Blob` instance.

## Implements

- [`Initializable`](../interfaces/Initializable.md)
- [`WritableWriter`](../interfaces/WritableWriter.md)

## Constructors

### Constructor

> **new BlobWriter**(`mimeString?`): `BlobWriter`

Defined in: [index.d.ts:717](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L717)

Creates the BlobWriter instance

#### Parameters

##### mimeString?

`string`

The MIME type of the content.

#### Returns

`BlobWriter`

## Properties

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:707](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L707)

The `WritableStream` instance.

#### Implementation of

[`WritableWriter`](../interfaces/WritableWriter.md).[`writable`](../interfaces/WritableWriter.md#writable)

## Methods

### getData()

> **getData**(): `Promise`\<`Blob`\>

Defined in: [index.d.ts:723](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L723)

Retrieves all the written data

#### Returns

`Promise`\<`Blob`\>

A promise resolving to the written data.

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:711](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L711)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Initializable`](../interfaces/Initializable.md).[`init`](../interfaces/Initializable.md#init)
