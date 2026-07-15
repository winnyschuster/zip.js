[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipFileEntry

# Class: ZipFileEntry\<ReaderType, WriterType\>

Defined in: [index.d.ts:2150](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2150)

Represents a file entry in the zip (Filesystem API).

## Extends

- [`ZipEntry`](ZipEntry.md)

## Type Parameters

### ReaderType

`ReaderType`

### WriterType

`WriterType`

## Constructors

### Constructor

> **new ZipFileEntry**\<`ReaderType`, `WriterType`\>(): `ZipFileEntry`\<`ReaderType`, `WriterType`\>

#### Returns

`ZipFileEntry`\<`ReaderType`, `WriterType`\>

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`constructor`](ZipEntry.md#constructor)

## Properties

### children

> **children**: [`ZipEntry`](ZipEntry.md)[]

Defined in: [index.d.ts:2107](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2107)

The children of the entry.

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`children`](ZipEntry.md#children)

***

### data?

> `optional` **data?**: [`EntryMetaData`](../interfaces/EntryMetaData.md)

Defined in: [index.d.ts:2091](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2091)

The underlying [EntryMetaData](../interfaces/EntryMetaData.md) instance.

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`data`](ZipEntry.md#data)

***

### directory

> **directory**: `void`

Defined in: [index.d.ts:2154](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2154)

`void` for ZipFileEntry instances.

***

### id

> **id**: `number`

Defined in: [index.d.ts:2095](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2095)

The ID of the instance.

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`id`](ZipEntry.md#id)

***

### name

> **name**: `string`

Defined in: [index.d.ts:2087](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2087)

The relative filename of the entry.

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`name`](ZipEntry.md#name)

***

### parent?

> `optional` **parent?**: [`ZipEntry`](ZipEntry.md)

Defined in: [index.d.ts:2099](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2099)

The parent directory of the entry.

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`parent`](ZipEntry.md#parent)

***

### reader

> **reader**: `ReadableStream`\<`any`\> \| [`ReadableReader`](../interfaces/ReadableReader.md) \| [`Reader`](Reader.md)\<`unknown`\>[] \| [`ReadableReader`](../interfaces/ReadableReader.md)[] \| `ReadableStream`\<`any`\>[] \| [`Reader`](Reader.md)\<`ReaderType`\>

Defined in: [index.d.ts:2158](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2158)

The [Reader](Reader.md) instance used to read the content of the entry.

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:2103](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2103)

The uncompressed size of the content.

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`uncompressedSize`](ZipEntry.md#uncompressedsize)

***

### writer

> **writer**: `WritableStream`\<`any`\> \| [`WritableWriter`](../interfaces/WritableWriter.md) \| [`Writer`](Writer.md)\<`WriterType`\> \| `AsyncGenerator`\<`WritableStream`\<`any`\> \| [`WritableWriter`](../interfaces/WritableWriter.md) \| [`Writer`](Writer.md)\<`unknown`\>, `any`, `any`\>

Defined in: [index.d.ts:2168](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2168)

The [Writer](Writer.md) instance used to write the content of the entry.

## Methods

### checkPassword()

> **checkPassword**(`password`, `options?`): `Promise`\<`boolean`\>

Defined in: [index.d.ts:2135](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2135)

Tests the password on the entry and all children if any, returns `true` if the entry is not password protected

#### Parameters

##### password

`string`

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`checkPassword`](ZipEntry.md#checkpassword)

***

### clone()

> **clone**(`deepClone?`): [`ZipEntry`](ZipEntry.md)

Defined in: [index.d.ts:2113](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2113)

Clones the entry

#### Parameters

##### deepClone?

`boolean`

`true` to clone all the descendants.

#### Returns

[`ZipEntry`](ZipEntry.md)

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`clone`](ZipEntry.md#clone)

***

### getArrayBuffer()

> **getArrayBuffer**(`options?`): `Promise`\<`ArrayBuffer`\>

Defined in: [index.d.ts:2239](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2239)

Retrieves the content of the entry as an `ArrayBuffer` instance

#### Parameters

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an `ArrayBuffer` instance.

***

### getBlob()

> **getBlob**(`mimeType?`, `options?`): `Promise`\<`Blob`\>

Defined in: [index.d.ts:2188](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2188)

Retrieves the content of the entry as a `Blob` instance

#### Parameters

##### mimeType?

`string`

The MIME type of the content.

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`Blob`\>

A promise resolving to a `Blob` instance.

***

### getData()

> **getData**\<`Type`\>(`writer`, `options?`): `Promise`\<`Type`\>

Defined in: [index.d.ts:2225](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2225)

Retrieves the content of the entry via a [Writer](Writer.md) instance

#### Type Parameters

##### Type

`Type`

#### Parameters

##### writer

`WritableStream`\<`any`\> \| [`WritableWriter`](../interfaces/WritableWriter.md) \| [`Writer`](Writer.md)\<`unknown`\> \| `AsyncGenerator`\<`WritableStream`\<`any`\> \| [`WritableWriter`](../interfaces/WritableWriter.md) \| [`Writer`](Writer.md)\<`unknown`\>, `any`, `any`\>

The [Writer](Writer.md) instance.

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`Type`\>

A promise resolving to data associated to the [Writer](Writer.md) instance.

***

### getData64URI()

> **getData64URI**(`mimeType?`, `options?`): `Promise`\<`string`\>

Defined in: [index.d.ts:2196](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2196)

Retrieves the content of the entry as as a Data URI `string` encoded in Base64

#### Parameters

##### mimeType?

`string`

The MIME type of the content.

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`string`\>

A promise resolving to a Data URI `string` encoded in Base64.

***

### getFullname()

> **getFullname**(): `string`

Defined in: [index.d.ts:2117](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2117)

Returns the full filename of the entry

#### Returns

`string`

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`getFullname`](ZipEntry.md#getfullname)

***

### getRelativeName()

> **getRelativeName**(`ancestor`): `string`

Defined in: [index.d.ts:2121](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2121)

Returns the filename of the entry relative to a parent directory

#### Parameters

##### ancestor

[`ZipDirectoryEntry`](ZipDirectoryEntry.md)

#### Returns

`string`

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`getRelativeName`](ZipEntry.md#getrelativename)

***

### getText()

> **getText**(`encoding?`, `options?`): `Promise`\<`string`\>

Defined in: [index.d.ts:2180](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2180)

Retrieves the text content of the entry as a `string`

#### Parameters

##### encoding?

`string`

The encoding of the text.

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`string`\>

A promise resolving to a `string`.

***

### getUint8Array()

> **getUint8Array**(`options?`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [index.d.ts:2206](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2206)

Retrieves the content of the entry as a `Uint8Array` instance

#### Parameters

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

A promise resolving to a `Uint8Array` instance.

***

### getWritable()

> **getWritable**(`writable?`, `options?`): `Promise`\<`WritableStream`\<`any`\>\>

Defined in: [index.d.ts:2214](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2214)

Retrieves the content of the entry via a `WritableStream` instance

#### Parameters

##### writable?

`WritableStream`\<`any`\>

The `WritableStream` instance.

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`WritableStream`\<`any`\>\>

A promise resolving to the `WritableStream` instance.

***

### isDescendantOf()

> **isDescendantOf**(`ancestor`): `boolean`

Defined in: [index.d.ts:2127](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2127)

Tests if a [ZipDirectoryEntry](ZipDirectoryEntry.md) instance is an ancestor of the entry

#### Parameters

##### ancestor

[`ZipDirectoryEntry`](ZipDirectoryEntry.md)

The [ZipDirectoryEntry](ZipDirectoryEntry.md) instance.

#### Returns

`boolean`

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`isDescendantOf`](ZipEntry.md#isdescendantof)

***

### isPasswordProtected()

> **isPasswordProtected**(): `boolean`

Defined in: [index.d.ts:2131](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2131)

Tests if the entry or any of its children is password protected

#### Returns

`boolean`

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`isPasswordProtected`](ZipEntry.md#ispasswordprotected)

***

### rename()

> **rename**(`name`): `void`

Defined in: [index.d.ts:2144](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2144)

Set the name of the entry

#### Parameters

##### name

`string`

The new name of the entry.

#### Returns

`void`

#### Inherited from

[`ZipEntry`](ZipEntry.md).[`rename`](ZipEntry.md#rename)

***

### replaceBlob()

> **replaceBlob**(`blob`): `void`

Defined in: [index.d.ts:2245](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2245)

Replaces the content of the entry with a `Blob` instance

#### Parameters

##### blob

`Blob`

The `Blob` instance.

#### Returns

`void`

***

### replaceData64URI()

> **replaceData64URI**(`dataURI`): `void`

Defined in: [index.d.ts:2257](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2257)

Replaces the content of the entry with a Data URI `string` encoded in Base64

#### Parameters

##### dataURI

`string`

The Data URI `string` encoded in Base64.

#### Returns

`void`

***

### replaceReadable()

> **replaceReadable**(`readable`): `void`

Defined in: [index.d.ts:2269](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2269)

Replaces the content of the entry with a `ReadableStream` instance

#### Parameters

##### readable

`ReadableStream`

The `ReadableStream` instance.

#### Returns

`void`

***

### replaceText()

> **replaceText**(`text`): `void`

Defined in: [index.d.ts:2251](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2251)

Replaces the content of the entry with a `string`

#### Parameters

##### text

`string`

The `string`.

#### Returns

`void`

***

### replaceUint8Array()

> **replaceUint8Array**(`array`): `void`

Defined in: [index.d.ts:2263](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2263)

Replaces the content of the entry with a `Uint8Array` instance

#### Parameters

##### array

`Uint8Array`

The `Uint8Array` instance.

#### Returns

`void`
