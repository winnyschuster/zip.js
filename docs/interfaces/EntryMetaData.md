[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryMetaData

# Interface: EntryMetaData

Defined in: [index.d.ts:1216](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1216)

Represents the metadata of an entry in a zip file (Core API).

## Extended by

- [`DirectoryEntry`](DirectoryEntry.md)
- [`FileEntry`](FileEntry.md)

## Properties

### bitFlag?

> `optional` **bitFlag?**: [`EntryBitFlag`](EntryBitFlag.md)

Defined in: [index.d.ts:1417](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1417)

The general purpose bit flag.

***

### comment

> **comment**: `string`

Defined in: [index.d.ts:1280](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1280)

The comment of the entry.

***

### commentUTF8

> **commentUTF8**: `boolean`

Defined in: [index.d.ts:1288](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1288)

`true` if the comment is encoded in UTF-8.

***

### compressedSize

> **compressedSize**: `number`

Defined in: [index.d.ts:1248](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1248)

The size of the compressed data in bytes.

***

### compressionMethod

> **compressionMethod**: `number`

Defined in: [index.d.ts:1409](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1409)

The compression method.

***

### creationDate?

> `optional` **creationDate?**: `Date`

Defined in: [index.d.ts:1264](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1264)

The creation date.

***

### diskNumberStart

> **diskNumberStart**: `number`

Defined in: [index.d.ts:1405](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1405)

The number of the disk where the entry data starts.

***

### encrypted

> **encrypted**: `boolean`

Defined in: [index.d.ts:1240](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1240)

`true` if the content of the entry is encrypted.

***

### executable

> **executable**: `boolean`

Defined in: [index.d.ts:1236](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1236)

`true` if the entry is an executable file

***

### ~~externalFileAttribute~~

> **externalFileAttribute**: `number`

Defined in: [index.d.ts:1401](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1401)

The external file attribute (raw).

#### Deprecated

Use [EntryMetaData#externalFileAttributes](#externalfileattributes) instead.

***

### externalFileAttributes

> **externalFileAttributes**: `number`

Defined in: [index.d.ts:1384](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1384)

The 32-bit `externalFileAttributes` field is the authoritative on-disk metadata for each entry.
- Upper 16 bits: Unix mode/type (e.g., permissions, file type)
- Low 8 bits: MS-DOS file attributes (e.g., directory, read-only)

When writing, all provided options are merged into this field. When reading, convenience fields are decoded from it.
For most use cases, prefer the high-level options and fields; only advanced users need to manipulate the raw value directly.

***

### extraField?

> `optional` **extraField?**: `Map`\<`number`, \{ `data`: `Uint8Array`; `type`: `number`; \}\>

Defined in: [index.d.ts:1296](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1296)

The extra field.

***

### extraFieldAES?

> `optional` **extraFieldAES?**: [`EntryExtraFieldAES`](EntryExtraFieldAES.md)

Defined in: [index.d.ts:1433](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1433)

The AES extra field.

***

### extraFieldExtendedTimestamp?

> `optional` **extraFieldExtendedTimestamp?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1449](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1449)

The extended timestamp extra field.

***

### extraFieldInfoZip?

> `optional` **extraFieldInfoZip?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1445](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1445)

The Info-ZIP Unix extra field.

***

### extraFieldLength?

> `optional` **extraFieldLength?**: `number`

Defined in: [index.d.ts:1425](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1425)

The length of the extra field in bytes.

***

### extraFieldNTFS?

> `optional` **extraFieldNTFS?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1437](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1437)

The NTFS extra field.

***

### extraFieldUnicodeComment?

> `optional` **extraFieldUnicodeComment?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1457](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1457)

The Unicode comment extra field.

***

### extraFieldUnicodePath?

> `optional` **extraFieldUnicodePath?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1453](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1453)

The Unicode path extra field.

***

### extraFieldUnix?

> `optional` **extraFieldUnix?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1441](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1441)

The Unix extra field.

***

### extraFieldUSDZ?

> `optional` **extraFieldUSDZ?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1461](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1461)

The USDZ extra field.

***

### extraFieldZip64?

> `optional` **extraFieldZip64?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1429](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1429)

The Zip64 extra field.

***

### filename

> **filename**: `string`

Defined in: [index.d.ts:1224](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1224)

The filename of the entry.

***

### filenameLength?

> `optional` **filenameLength?**: `number`

Defined in: [index.d.ts:1421](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1421)

The length of the filename in bytes.

***

### filenameUTF8

> **filenameUTF8**: `boolean`

Defined in: [index.d.ts:1232](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1232)

`true` if the filename is encoded in UTF-8.

***

### gid?

> `optional` **gid?**: `number`

Defined in: [index.d.ts:1355](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1355)

Unix group id when available.

***

### ~~internalFileAttribute~~

> **internalFileAttribute**: `number`

Defined in: [index.d.ts:1396](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1396)

The internal file attribute (raw).

#### Deprecated

Use [EntryMetaData#internalFileAttributes](#internalfileattributes) instead.

***

### internalFileAttributes

> **internalFileAttributes**: `number`

Defined in: [index.d.ts:1375](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1375)

The internal file attributes (raw).

***

### lastAccessDate?

> `optional` **lastAccessDate?**: `Date`

Defined in: [index.d.ts:1260](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1260)

The last access date.

***

### lastModDate

> **lastModDate**: `Date`

Defined in: [index.d.ts:1256](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1256)

The last modification date.

***

### localDirectory?

> `optional` **localDirectory?**: [`LocalDirectory`](LocalDirectory.md)

Defined in: [index.d.ts:1465](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1465)

The local file header fields, set when the entry data has been read.

***

### msdosAttributes?

> `optional` **msdosAttributes?**: `object`

Defined in: [index.d.ts:1341](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1341)

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

Defined in: [index.d.ts:1337](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1337)

The MS-DOS attributes low byte (raw).
This is the low 8 bits of [EntryMetaData#externalFileAttributes](#externalfileattributes) when present.

***

### msDosCompatible

> **msDosCompatible**: `boolean`

Defined in: [index.d.ts:1316](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1316)

`true` if `internalFileAttributes` and `externalFileAttributes` are compatible with MS-DOS format.

***

### offset

> **offset**: `number`

Defined in: [index.d.ts:1220](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1220)

The byte offset of the entry.

***

### rawBitFlag?

> `optional` **rawBitFlag?**: `number`

Defined in: [index.d.ts:1413](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1413)

The general purpose bit flag (raw).

***

### rawComment

> **rawComment**: `Uint8Array`

Defined in: [index.d.ts:1284](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1284)

The comment of the entry (raw).

***

### rawCreationDate?

> `optional` **rawCreationDate?**: `number` \| `bigint`

Defined in: [index.d.ts:1276](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1276)

The creation date (raw).

***

### rawExtraField

> **rawExtraField**: `Uint8Array`

Defined in: [index.d.ts:1300](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1300)

The extra field (raw).

***

### rawFilename

> **rawFilename**: `Uint8Array`

Defined in: [index.d.ts:1228](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1228)

The filename of the entry (raw).

***

### rawLastAccessDate?

> `optional` **rawLastAccessDate?**: `number` \| `bigint`

Defined in: [index.d.ts:1272](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1272)

The last access date (raw).

***

### rawLastModDate

> **rawLastModDate**: `number` \| `bigint`

Defined in: [index.d.ts:1268](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1268)

The last modification date (raw).

***

### setgid?

> `optional` **setgid?**: `boolean`

Defined in: [index.d.ts:1367](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1367)

`true` if the setgid bit is set on the entry.

***

### setuid?

> `optional` **setuid?**: `boolean`

Defined in: [index.d.ts:1363](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1363)

`true` if the setuid bit is set on the entry.

***

### signature

> **signature**: `number`

Defined in: [index.d.ts:1292](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1292)

The signature (CRC32 checksum) of the content.

***

### sticky?

> `optional` **sticky?**: `boolean`

Defined in: [index.d.ts:1371](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1371)

`true` if the sticky bit is set on the entry.

***

### uid?

> `optional` **uid?**: `number`

Defined in: [index.d.ts:1351](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1351)

Unix owner id when available.

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:1252](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1252)

The size of the decompressed data in bytes.

***

### unixExternalUpper?

> `optional` **unixExternalUpper?**: `number`

Defined in: [index.d.ts:1388](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1388)

The upper 16-bit portion of [EntryMetaData#externalFileAttributes](#externalfileattributes) when it represents Unix mode bits.

***

### unixMode?

> `optional` **unixMode?**: `number`

Defined in: [index.d.ts:1359](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1359)

Unix mode (st_mode) when available.

***

### version

> **version**: `number`

Defined in: [index.d.ts:1308](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1308)

The "Version" field.

***

### versionMadeBy

> **versionMadeBy**: `number`

Defined in: [index.d.ts:1312](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1312)

The "Version made by" field.

***

### zip64

> **zip64**: `boolean`

Defined in: [index.d.ts:1304](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1304)

`true` if the entry is using Zip64.

***

### zipCrypto

> **zipCrypto**: `boolean`

Defined in: [index.d.ts:1244](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L1244)

`true` if the content of the entry is encrypted with the ZipCrypto algorithm.
