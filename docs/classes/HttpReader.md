[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / HttpReader

# Class: HttpReader

Defined in: [index.d.ts:542](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L542)

Represents a [Reader](Reader.md) instance used to fetch data from a URL.

## Extends

- [`Reader`](Reader.md)\<[`URLString`](../type-aliases/URLString.md)\>

## Extended by

- [`HttpRangeReader`](HttpRangeReader.md)

## Constructors

### Constructor

> **new HttpReader**(`url`, `options?`): `HttpReader`

Defined in: [index.d.ts:549](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L549)

Creates the HttpReader instance

#### Parameters

##### url

`string` \| `URL`

The URL of the data.

##### options?

[`HttpOptions`](../interfaces/HttpOptions.md)

The options.

#### Returns

`HttpReader`

#### Overrides

[`Reader`](Reader.md).[`constructor`](Reader.md#constructor)

## Properties

### readable

> **readable**: `ReadableStream`

Defined in: [index.d.ts:488](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L488)

The `ReadableStream` instance.

#### Inherited from

[`Reader`](Reader.md).[`readable`](Reader.md#readable)

***

### size

> **size**: `number`

Defined in: [index.d.ts:492](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L492)

The total size of the data in bytes.

#### Inherited from

[`Reader`](Reader.md).[`size`](Reader.md#size)

## Methods

### init()?

> `optional` **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:496](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L496)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Reader`](Reader.md).[`init`](Reader.md#init)

***

### readUint8Array()

> **readUint8Array**(`index`, `length`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [index.d.ts:504](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L504)

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

[`Reader`](Reader.md).[`readUint8Array`](Reader.md#readuint8array)
