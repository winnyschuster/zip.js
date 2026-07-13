[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / BlobWriter

# Class: BlobWriter

Defined in: [index.d.ts:606](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L606)

Represents a [WritableWriter](../interfaces/WritableWriter.md) instance used to retrieve the written data as a `Blob` instance.

## Implements

- [`Initializable`](../interfaces/Initializable.md)
- [`WritableWriter`](../interfaces/WritableWriter.md)

## Constructors

### Constructor

> **new BlobWriter**(`mimeString?`): `BlobWriter`

Defined in: [index.d.ts:620](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L620)

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

Defined in: [index.d.ts:610](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L610)

The `WritableStream` instance.

#### Implementation of

[`WritableWriter`](../interfaces/WritableWriter.md).[`writable`](../interfaces/WritableWriter.md#writable)

## Methods

### getData()

> **getData**(): `Promise`\<`Blob`\>

Defined in: [index.d.ts:626](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L626)

Retrieves all the written data

#### Returns

`Promise`\<`Blob`\>

A promise resolving to the written data.

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:614](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L614)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Initializable`](../interfaces/Initializable.md).[`init`](../interfaces/Initializable.md#init)
