[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / FileEntry

# Interface: FileEntry

Defined in: [index.d.ts:1139](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1139)

Represents the metadata of an entry in a zip file (Core API).

## Extends

- [`EntryMetaData`](EntryMetaData.md)

## Properties

### comment

> **comment**: `string`

Defined in: [index.d.ts:1001](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1001)

The comment of the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`comment`](EntryMetaData.md#comment)

***

### commentUTF8

> **commentUTF8**: `boolean`

Defined in: [index.d.ts:1009](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1009)

`true` if the comment is encoded in UTF-8.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`commentUTF8`](EntryMetaData.md#commentutf8)

***

### compressedSize

> **compressedSize**: `number`

Defined in: [index.d.ts:969](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L969)

The size of the compressed data in bytes.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`compressedSize`](EntryMetaData.md#compressedsize)

***

### compressionMethod

> **compressionMethod**: `number`

Defined in: [index.d.ts:1130](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1130)

The compression method.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`compressionMethod`](EntryMetaData.md#compressionmethod)

***

### creationDate?

> `optional` **creationDate?**: `Date`

Defined in: [index.d.ts:985](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L985)

The creation date.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`creationDate`](EntryMetaData.md#creationdate)

***

### directory

> **directory**: `false`

Defined in: [index.d.ts:1143](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1143)

`false` if the entry is a file.

***

### diskNumberStart

> **diskNumberStart**: `number`

Defined in: [index.d.ts:1126](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1126)

The number of the disk where the entry data starts.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`diskNumberStart`](EntryMetaData.md#disknumberstart)

***

### encrypted

> **encrypted**: `boolean`

Defined in: [index.d.ts:961](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L961)

`true` if the content of the entry is encrypted.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`encrypted`](EntryMetaData.md#encrypted)

***

### executable

> **executable**: `boolean`

Defined in: [index.d.ts:957](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L957)

`true` if the entry is an executable file

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`executable`](EntryMetaData.md#executable)

***

### ~~externalFileAttribute~~

> **externalFileAttribute**: `number`

Defined in: [index.d.ts:1122](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1122)

The external file attribute (raw).

#### Deprecated

Use [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) instead.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`externalFileAttribute`](EntryMetaData.md#externalfileattribute)

***

### externalFileAttributes

> **externalFileAttributes**: `number`

Defined in: [index.d.ts:1105](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1105)

The 32-bit `externalFileAttributes` field is the authoritative on-disk metadata for each entry.
- Upper 16 bits: Unix mode/type (e.g., permissions, file type)
- Low 8 bits: MS-DOS file attributes (e.g., directory, read-only)

When writing, all provided options are merged into this field. When reading, convenience fields are decoded from it.
For most use cases, prefer the high-level options and fields; only advanced users need to manipulate the raw value directly.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`externalFileAttributes`](EntryMetaData.md#externalfileattributes)

***

### extraField?

> `optional` **extraField?**: `Map`\<`number`, \{ `data`: `Uint8Array`; `type`: `number`; \}\>

Defined in: [index.d.ts:1017](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1017)

The extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraField`](EntryMetaData.md#extrafield)

***

### filename

> **filename**: `string`

Defined in: [index.d.ts:945](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L945)

The filename of the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`filename`](EntryMetaData.md#filename)

***

### filenameUTF8

> **filenameUTF8**: `boolean`

Defined in: [index.d.ts:953](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L953)

`true` if the filename is encoded in UTF-8.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`filenameUTF8`](EntryMetaData.md#filenameutf8)

***

### gid?

> `optional` **gid?**: `number`

Defined in: [index.d.ts:1076](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1076)

Unix group id when available.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`gid`](EntryMetaData.md#gid)

***

### ~~internalFileAttribute~~

> **internalFileAttribute**: `number`

Defined in: [index.d.ts:1117](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1117)

The internal file attribute (raw).

#### Deprecated

Use [EntryMetaData#internalFileAttributes](EntryMetaData.md#internalfileattributes) instead.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`internalFileAttribute`](EntryMetaData.md#internalfileattribute)

***

### internalFileAttributes

> **internalFileAttributes**: `number`

Defined in: [index.d.ts:1096](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1096)

The internal file attributes (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`internalFileAttributes`](EntryMetaData.md#internalfileattributes)

***

### lastAccessDate?

> `optional` **lastAccessDate?**: `Date`

Defined in: [index.d.ts:981](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L981)

The last access date.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`lastAccessDate`](EntryMetaData.md#lastaccessdate)

***

### lastModDate

> **lastModDate**: `Date`

Defined in: [index.d.ts:977](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L977)

The last modification date.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`lastModDate`](EntryMetaData.md#lastmoddate)

***

### msdosAttributes?

> `optional` **msdosAttributes?**: `object`

Defined in: [index.d.ts:1062](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1062)

The MS-DOS attribute flags exposed as booleans.

#### archive

> **archive**: `boolean`

#### directory

> **directory**: `boolean`

#### hidden

> **hidden**: `boolean`

#### readOnly

> **readOnly**: `boolean`

#### system

> **system**: `boolean`

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`msdosAttributes`](EntryMetaData.md#msdosattributes)

***

### msdosAttributesRaw?

> `optional` **msdosAttributesRaw?**: `number`

Defined in: [index.d.ts:1058](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1058)

The MS-DOS attributes low byte (raw).
This is the low 8 bits of [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) when present.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`msdosAttributesRaw`](EntryMetaData.md#msdosattributesraw)

***

### msDosCompatible

> **msDosCompatible**: `boolean`

Defined in: [index.d.ts:1037](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1037)

`true` if `internalFileAttributes` and `externalFileAttributes` are compatible with MS-DOS format.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`msDosCompatible`](EntryMetaData.md#msdoscompatible)

***

### offset

> **offset**: `number`

Defined in: [index.d.ts:941](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L941)

The byte offset of the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`offset`](EntryMetaData.md#offset)

***

### rawComment

> **rawComment**: `Uint8Array`

Defined in: [index.d.ts:1005](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1005)

The comment of the entry (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawComment`](EntryMetaData.md#rawcomment)

***

### rawCreationDate?

> `optional` **rawCreationDate?**: `number` \| `bigint`

Defined in: [index.d.ts:997](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L997)

The creation date (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawCreationDate`](EntryMetaData.md#rawcreationdate)

***

### rawExtraField

> **rawExtraField**: `Uint8Array`

Defined in: [index.d.ts:1021](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1021)

The extra field (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawExtraField`](EntryMetaData.md#rawextrafield)

***

### rawFilename

> **rawFilename**: `Uint8Array`

Defined in: [index.d.ts:949](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L949)

The filename of the entry (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawFilename`](EntryMetaData.md#rawfilename)

***

### rawLastAccessDate?

> `optional` **rawLastAccessDate?**: `number` \| `bigint`

Defined in: [index.d.ts:993](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L993)

The last access date (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawLastAccessDate`](EntryMetaData.md#rawlastaccessdate)

***

### rawLastModDate

> **rawLastModDate**: `number` \| `bigint`

Defined in: [index.d.ts:989](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L989)

The last modification date (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawLastModDate`](EntryMetaData.md#rawlastmoddate)

***

### setgid?

> `optional` **setgid?**: `boolean`

Defined in: [index.d.ts:1088](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1088)

`true` if the setgid bit is set on the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`setgid`](EntryMetaData.md#setgid)

***

### setuid?

> `optional` **setuid?**: `boolean`

Defined in: [index.d.ts:1084](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1084)

`true` if the setuid bit is set on the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`setuid`](EntryMetaData.md#setuid)

***

### signature

> **signature**: `number`

Defined in: [index.d.ts:1013](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1013)

The signature (CRC32 checksum) of the content.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`signature`](EntryMetaData.md#signature)

***

### sticky?

> `optional` **sticky?**: `boolean`

Defined in: [index.d.ts:1092](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1092)

`true` if the sticky bit is set on the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`sticky`](EntryMetaData.md#sticky)

***

### uid?

> `optional` **uid?**: `number`

Defined in: [index.d.ts:1072](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1072)

Unix owner id when available.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`uid`](EntryMetaData.md#uid)

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:973](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L973)

The size of the decompressed data in bytes.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`uncompressedSize`](EntryMetaData.md#uncompressedsize)

***

### unixExternalUpper?

> `optional` **unixExternalUpper?**: `number`

Defined in: [index.d.ts:1109](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1109)

The upper 16-bit portion of [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) when it represents Unix mode bits.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`unixExternalUpper`](EntryMetaData.md#unixexternalupper)

***

### unixMode?

> `optional` **unixMode?**: `number`

Defined in: [index.d.ts:1080](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1080)

Unix mode (st_mode) when available.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`unixMode`](EntryMetaData.md#unixmode)

***

### version

> **version**: `number`

Defined in: [index.d.ts:1029](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1029)

The "Version" field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`version`](EntryMetaData.md#version)

***

### versionMadeBy

> **versionMadeBy**: `number`

Defined in: [index.d.ts:1033](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1033)

The "Version made by" field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`versionMadeBy`](EntryMetaData.md#versionmadeby)

***

### zip64

> **zip64**: `boolean`

Defined in: [index.d.ts:1025](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1025)

`true` if the entry is using Zip64.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`zip64`](EntryMetaData.md#zip64)

***

### zipCrypto

> **zipCrypto**: `boolean`

Defined in: [index.d.ts:965](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L965)

`true` if the content of the entry is encrypted with the ZipCrypto algorithm.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`zipCrypto`](EntryMetaData.md#zipcrypto)

## Methods

### arrayBuffer()

> **arrayBuffer**(`options?`): `Promise`\<`ArrayBuffer`\>

Defined in: [index.d.ts:1168](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1168)

Retrieves the content of the entry as an `ArrayBuffer` instance

#### Parameters

##### options?

[`EntryGetDataOptions`](EntryGetDataOptions.md)

The options.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an `ArrayBuffer` instance.

***

### getData()

> **getData**\<`Type`\>(`writer`, `options?`): `Promise`\<`Type`\>

Defined in: [index.d.ts:1151](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1151)

Returns the content of the entry

#### Type Parameters

##### Type

`Type`

#### Parameters

##### writer

`WritableStream`\<`any`\> \| [`WritableWriter`](WritableWriter.md) \| `AsyncGenerator`\<`WritableStream`\<`any`\> \| [`WritableWriter`](WritableWriter.md) \| [`Writer`](../classes/Writer.md)\<`unknown`\>, `boolean`, `any`\> \| [`Writer`](../classes/Writer.md)\<`Type`\>

The [Writer](../classes/Writer.md) instance used to write the content of the entry.

##### options?

[`EntryGetDataCheckPasswordOptions`](EntryGetDataCheckPasswordOptions.md)

The options.

#### Returns

`Promise`\<`Type`\>

A promise resolving to the type to data associated to `writer`.
