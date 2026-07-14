[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / HttpRangeReader

# Class: HttpRangeReader

Defined in: [index.d.ts:512](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L512)

Represents a [Reader](Reader.md) instance used to fetch data from servers returning `Accept-Ranges` headers.

## Extends

- [`HttpReader`](HttpReader.md)

## Constructors

### Constructor

> **new HttpRangeReader**(`url`, `options?`): `HttpRangeReader`

Defined in: [index.d.ts:521](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L521)

Creates the HttpRangeReader instance.  It is particularly useful for reading ZIP files via HTTP.
If you just want to add content retrieved via HTTP to a ZIP file, you can simply use
`Response#body` [https://developer.mozilla.org/en-US/docs/Web/API/Response/body](https://developer.mozilla.org/en-US/docs/Web/API/Response/body) instead.

#### Parameters

##### url

`string` \| `URL`

The URL of the data.

##### options?

[`HttpRangeOptions`](../interfaces/HttpRangeOptions.md)

The options.

#### Returns

`HttpRangeReader`

#### Overrides

[`HttpReader`](HttpReader.md).[`constructor`](HttpReader.md#constructor)

## Properties

### readable

> **readable**: `ReadableStream`

Defined in: [index.d.ts:445](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L445)

The `ReadableStream` instance.

#### Inherited from

[`HttpReader`](HttpReader.md).[`readable`](HttpReader.md#readable)

***

### size

> **size**: `number`

Defined in: [index.d.ts:449](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L449)

The total size of the data in bytes.

#### Inherited from

[`HttpReader`](HttpReader.md).[`size`](HttpReader.md#size)

## Methods

### init()?

> `optional` **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:453](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L453)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`HttpReader`](HttpReader.md).[`init`](HttpReader.md#init)

***

### readUint8Array()

> **readUint8Array**(`index`, `length`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [index.d.ts:461](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L461)

Reads a chunk of data

#### Parameters

##### index

`number`

The byte index of the data to read.

##### length

`number`

The length of the data to read in bytes.

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

A promise resolving to a chunk of data. The data must be trucated to the remaining size if the requested length is larger than the remaining size.

#### Inherited from

[`HttpReader`](HttpReader.md).[`readUint8Array`](HttpReader.md#readuint8array)
