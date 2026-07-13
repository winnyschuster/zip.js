[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / Data64URIWriter

# Class: Data64URIWriter

Defined in: [index.d.ts:632](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L632)

Represents a [Writer](Writer.md) instance used to retrieve the written data as a Data URI `string` encoded in Base64.

## Extends

- [`Writer`](Writer.md)\<`string`\>

## Constructors

### Constructor

> **new Data64URIWriter**(`mimeString?`): `Data64URIWriter`

Defined in: [index.d.ts:638](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L638)

Creates the Data64URIWriter instance

#### Parameters

##### mimeString?

`string`

The MIME type of the content.

#### Returns

`Data64URIWriter`

#### Overrides

[`Writer`](Writer.md).[`constructor`](Writer.md#constructor)

## Properties

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:568](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L568)

The `WritableStream` instance.

#### Inherited from

[`Writer`](Writer.md).[`writable`](Writer.md#writable)

## Methods

### getData()

> **getData**(): `Promise`\<`string`\>

Defined in: [index.d.ts:588](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L588)

Retrieves all the written data

#### Returns

`Promise`\<`string`\>

A promise resolving to the written data.

#### Inherited from

[`Writer`](Writer.md).[`getData`](Writer.md#getdata)

***

### init()?

> `optional` **init**(`size?`): `Promise`\<`void`\>

Defined in: [index.d.ts:574](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L574)

Initializes the instance asynchronously

#### Parameters

##### size?

`number`

the total size of the written data in bytes.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Writer`](Writer.md).[`init`](Writer.md#init)

***

### writeUint8Array()

> **writeUint8Array**(`array`): `Promise`\<`void`\>

Defined in: [index.d.ts:582](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L582)

Appends a chunk of data

#### Parameters

##### array

`Uint8Array`

The chunk data to append.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Writer`](Writer.md).[`writeUint8Array`](Writer.md#writeuint8array)
