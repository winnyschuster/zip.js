[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipEntry

# Class: ZipEntry

Defined in: [index.d.ts:2122](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2122)

Represents an entry in a zip file (Filesystem API).

## Extended by

- [`ZipFileEntry`](ZipFileEntry.md)
- [`ZipDirectoryEntry`](ZipDirectoryEntry.md)

## Constructors

### Constructor

> **new ZipEntry**(): `ZipEntry`

#### Returns

`ZipEntry`

## Properties

### children

> **children**: `ZipEntry`[]

Defined in: [index.d.ts:2146](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2146)

The children of the entry.

***

### data?

> `optional` **data?**: [`EntryMetaData`](../interfaces/EntryMetaData.md)

Defined in: [index.d.ts:2130](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2130)

The underlying [EntryMetaData](../interfaces/EntryMetaData.md) instance.

***

### id

> **id**: `number`

Defined in: [index.d.ts:2134](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2134)

The ID of the instance.

***

### name

> **name**: `string`

Defined in: [index.d.ts:2126](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2126)

The relative filename of the entry.

***

### parent?

> `optional` **parent?**: `ZipEntry`

Defined in: [index.d.ts:2138](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2138)

The parent directory of the entry.

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:2142](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2142)

The uncompressed size of the content.

## Methods

### checkPassword()

> **checkPassword**(`password`, `options?`): `Promise`\<`boolean`\>

Defined in: [index.d.ts:2174](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2174)

Tests the password on the entry and all children if any, returns `true` if the entry is not password protected

#### Parameters

##### password

`string`

##### options?

[`EntryGetDataOptions`](../interfaces/EntryGetDataOptions.md)

#### Returns

`Promise`\<`boolean`\>

***

### clone()

> **clone**(`deepClone?`): `ZipEntry`

Defined in: [index.d.ts:2152](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2152)

Clones the entry

#### Parameters

##### deepClone?

`boolean`

`true` to clone all the descendants.

#### Returns

`ZipEntry`

***

### getFullname()

> **getFullname**(): `string`

Defined in: [index.d.ts:2156](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2156)

Returns the full filename of the entry

#### Returns

`string`

***

### getRelativeName()

> **getRelativeName**(`ancestor`): `string`

Defined in: [index.d.ts:2160](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2160)

Returns the filename of the entry relative to a parent directory

#### Parameters

##### ancestor

[`ZipDirectoryEntry`](ZipDirectoryEntry.md)

#### Returns

`string`

***

### isDescendantOf()

> **isDescendantOf**(`ancestor`): `boolean`

Defined in: [index.d.ts:2166](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2166)

Tests if a [ZipDirectoryEntry](ZipDirectoryEntry.md) instance is an ancestor of the entry

#### Parameters

##### ancestor

[`ZipDirectoryEntry`](ZipDirectoryEntry.md)

The [ZipDirectoryEntry](ZipDirectoryEntry.md) instance.

#### Returns

`boolean`

***

### isPasswordProtected()

> **isPasswordProtected**(): `boolean`

Defined in: [index.d.ts:2170](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2170)

Tests if the entry or any of its children is password protected

#### Returns

`boolean`

***

### rename()

> **rename**(`name`): `void`

Defined in: [index.d.ts:2183](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2183)

Set the name of the entry

#### Parameters

##### name

`string`

The new name of the entry.

#### Returns

`void`
