[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryMetaData

# Interface: EntryMetaData

Defined in: [index.d.ts:937](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L937)

Represents the metadata of an entry in a zip file (Core API).

## Extended by

- [`DirectoryEntry`](DirectoryEntry.md)
- [`FileEntry`](FileEntry.md)

## Properties

### comment

> **comment**: `string`

Defined in: [index.d.ts:1001](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1001)

The comment of the entry.

***

### commentUTF8

> **commentUTF8**: `boolean`

Defined in: [index.d.ts:1009](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1009)

`true` if the comment is encoded in UTF-8.

***

### compressedSize

> **compressedSize**: `number`

Defined in: [index.d.ts:969](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L969)

The size of the compressed data in bytes.

***

### compressionMethod

> **compressionMethod**: `number`

Defined in: [index.d.ts:1130](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1130)

The compression method.

***

### creationDate?

> `optional` **creationDate?**: `Date`

Defined in: [index.d.ts:985](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L985)

The creation date.

***

### diskNumberStart

> **diskNumberStart**: `number`

Defined in: [index.d.ts:1126](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1126)

The number of the disk where the entry data starts.

***

### encrypted

> **encrypted**: `boolean`

Defined in: [index.d.ts:961](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L961)

`true` if the content of the entry is encrypted.

***

### executable

> **executable**: `boolean`

Defined in: [index.d.ts:957](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L957)

`true` if the entry is an executable file

***

### ~~externalFileAttribute~~

> **externalFileAttribute**: `number`

Defined in: [index.d.ts:1122](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1122)

The external file attribute (raw).

#### Deprecated

Use [EntryMetaData#externalFileAttributes](#externalfileattributes) instead.

***

### externalFileAttributes

> **externalFileAttributes**: `number`

Defined in: [index.d.ts:1105](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1105)

The 32-bit `externalFileAttributes` field is the authoritative on-disk metadata for each entry.
- Upper 16 bits: Unix mode/type (e.g., permissions, file type)
- Low 8 bits: MS-DOS file attributes (e.g., directory, read-only)

When writing, all provided options are merged into this field. When reading, convenience fields are decoded from it.
For most use cases, prefer the high-level options and fields; only advanced users need to manipulate the raw value directly.

***

### extraField?

> `optional` **extraField?**: `Map`\<`number`, \{ `data`: `Uint8Array`; `type`: `number`; \}\>

Defined in: [index.d.ts:1017](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1017)

The extra field.

***

### filename

> **filename**: `string`

Defined in: [index.d.ts:945](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L945)

The filename of the entry.

***

### filenameUTF8

> **filenameUTF8**: `boolean`

Defined in: [index.d.ts:953](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L953)

`true` if the filename is encoded in UTF-8.

***

### gid?

> `optional` **gid?**: `number`

Defined in: [index.d.ts:1076](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1076)

Unix group id when available.

***

### ~~internalFileAttribute~~

> **internalFileAttribute**: `number`

Defined in: [index.d.ts:1117](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1117)

The internal file attribute (raw).

#### Deprecated

Use [EntryMetaData#internalFileAttributes](#internalfileattributes) instead.

***

### internalFileAttributes

> **internalFileAttributes**: `number`

Defined in: [index.d.ts:1096](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1096)

The internal file attributes (raw).

***

### lastAccessDate?

> `optional` **lastAccessDate?**: `Date`

Defined in: [index.d.ts:981](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L981)

The last access date.

***

### lastModDate

> **lastModDate**: `Date`

Defined in: [index.d.ts:977](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L977)

The last modification date.

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

***

### msdosAttributesRaw?

> `optional` **msdosAttributesRaw?**: `number`

Defined in: [index.d.ts:1058](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1058)

The MS-DOS attributes low byte (raw).
This is the low 8 bits of [EntryMetaData#externalFileAttributes](#externalfileattributes) when present.

***

### msDosCompatible

> **msDosCompatible**: `boolean`

Defined in: [index.d.ts:1037](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1037)

`true` if `internalFileAttributes` and `externalFileAttributes` are compatible with MS-DOS format.

***

### offset

> **offset**: `number`

Defined in: [index.d.ts:941](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L941)

The byte offset of the entry.

***

### rawComment

> **rawComment**: `Uint8Array`

Defined in: [index.d.ts:1005](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1005)

The comment of the entry (raw).

***

### rawCreationDate?

> `optional` **rawCreationDate?**: `number` \| `bigint`

Defined in: [index.d.ts:997](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L997)

The creation date (raw).

***

### rawExtraField

> **rawExtraField**: `Uint8Array`

Defined in: [index.d.ts:1021](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1021)

The extra field (raw).

***

### rawFilename

> **rawFilename**: `Uint8Array`

Defined in: [index.d.ts:949](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L949)

The filename of the entry (raw).

***

### rawLastAccessDate?

> `optional` **rawLastAccessDate?**: `number` \| `bigint`

Defined in: [index.d.ts:993](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L993)

The last access date (raw).

***

### rawLastModDate

> **rawLastModDate**: `number` \| `bigint`

Defined in: [index.d.ts:989](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L989)

The last modification date (raw).

***

### setgid?

> `optional` **setgid?**: `boolean`

Defined in: [index.d.ts:1088](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1088)

`true` if the setgid bit is set on the entry.

***

### setuid?

> `optional` **setuid?**: `boolean`

Defined in: [index.d.ts:1084](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1084)

`true` if the setuid bit is set on the entry.

***

### signature

> **signature**: `number`

Defined in: [index.d.ts:1013](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1013)

The signature (CRC32 checksum) of the content.

***

### sticky?

> `optional` **sticky?**: `boolean`

Defined in: [index.d.ts:1092](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1092)

`true` if the sticky bit is set on the entry.

***

### uid?

> `optional` **uid?**: `number`

Defined in: [index.d.ts:1072](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1072)

Unix owner id when available.

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:973](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L973)

The size of the decompressed data in bytes.

***

### unixExternalUpper?

> `optional` **unixExternalUpper?**: `number`

Defined in: [index.d.ts:1109](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1109)

The upper 16-bit portion of [EntryMetaData#externalFileAttributes](#externalfileattributes) when it represents Unix mode bits.

***

### unixMode?

> `optional` **unixMode?**: `number`

Defined in: [index.d.ts:1080](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1080)

Unix mode (st_mode) when available.

***

### version

> **version**: `number`

Defined in: [index.d.ts:1029](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1029)

The "Version" field.

***

### versionMadeBy

> **versionMadeBy**: `number`

Defined in: [index.d.ts:1033](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1033)

The "Version made by" field.

***

### zip64

> **zip64**: `boolean`

Defined in: [index.d.ts:1025](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L1025)

`true` if the entry is using Zip64.

***

### zipCrypto

> **zipCrypto**: `boolean`

Defined in: [index.d.ts:965](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L965)

`true` if the content of the entry is encrypted with the ZipCrypto algorithm.
