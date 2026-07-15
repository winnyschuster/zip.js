[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / HttpReader

# Class: HttpReader

Defined in: [index.d.ts:503](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L503)

Represents a [Reader](Reader.md) instance used to fetch data from a URL.

## Extends

- [`Reader`](Reader.md)\<[`URLString`](../type-aliases/URLString.md)\>

## Extended by

- [`HttpRangeReader`](HttpRangeReader.md)

## Constructors

### Constructor

> **new HttpReader**(`url`, `options?`): `HttpReader`

Defined in: [index.d.ts:510](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L510)

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

Defined in: [index.d.ts:449](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L449)

The `ReadableStream` instance.

#### Inherited from

[`Reader`](Reader.md).[`readable`](Reader.md#readable)

***

### size

> **size**: `number`

Defined in: [index.d.ts:453](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L453)

The total size of the data in bytes.

#### Inherited from

[`Reader`](Reader.md).[`size`](Reader.md#size)

## Methods

### init()?

> `optional` **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:457](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L457)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Reader`](Reader.md).[`init`](Reader.md#init)

***

### readUint8Array()

> **readUint8Array**(`index`, `length`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [index.d.ts:465](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L465)

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
