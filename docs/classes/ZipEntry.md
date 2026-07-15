[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipEntry

# Class: ZipEntry

Defined in: [index.d.ts:2083](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2083)

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

Defined in: [index.d.ts:2107](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2107)

The children of the entry.

***

### data?

> `optional` **data?**: [`EntryMetaData`](../interfaces/EntryMetaData.md)

Defined in: [index.d.ts:2091](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2091)

The underlying [EntryMetaData](../interfaces/EntryMetaData.md) instance.

***

### id

> **id**: `number`

Defined in: [index.d.ts:2095](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2095)

The ID of the instance.

***

### name

> **name**: `string`

Defined in: [index.d.ts:2087](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2087)

The relative filename of the entry.

***

### parent?

> `optional` **parent?**: `ZipEntry`

Defined in: [index.d.ts:2099](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2099)

The parent directory of the entry.

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:2103](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2103)

The uncompressed size of the content.

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

***

### clone()

> **clone**(`deepClone?`): `ZipEntry`

Defined in: [index.d.ts:2113](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2113)

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

Defined in: [index.d.ts:2117](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2117)

Returns the full filename of the entry

#### Returns

`string`

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

***

### isPasswordProtected()

> **isPasswordProtected**(): `boolean`

Defined in: [index.d.ts:2131](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L2131)

Tests if the entry or any of its children is password protected

#### Returns

`boolean`

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
