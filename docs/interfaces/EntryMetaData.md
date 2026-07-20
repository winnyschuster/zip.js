[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryMetaData

# Interface: EntryMetaData

Defined in: [index.d.ts:1255](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1255)

Represents the metadata of an entry in a zip file (Core API).

## Extended by

- [`DirectoryEntry`](DirectoryEntry.md)
- [`FileEntry`](FileEntry.md)

## Properties

### bitFlag?

> `optional` **bitFlag?**: [`EntryBitFlag`](EntryBitFlag.md)

Defined in: [index.d.ts:1456](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1456)

The general purpose bit flag.

***

### comment

> **comment**: `string`

Defined in: [index.d.ts:1319](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1319)

The comment of the entry.

***

### commentUTF8

> **commentUTF8**: `boolean`

Defined in: [index.d.ts:1327](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1327)

`true` if the comment is encoded in UTF-8.

***

### compressedSize

> **compressedSize**: `number`

Defined in: [index.d.ts:1287](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1287)

The size of the compressed data in bytes.

***

### compressionMethod

> **compressionMethod**: `number`

Defined in: [index.d.ts:1448](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1448)

The compression method.

***

### creationDate?

> `optional` **creationDate?**: `Date`

Defined in: [index.d.ts:1303](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1303)

The creation date.

***

### diskNumberStart

> **diskNumberStart**: `number`

Defined in: [index.d.ts:1444](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1444)

The number of the disk where the entry data starts.

***

### encrypted

> **encrypted**: `boolean`

Defined in: [index.d.ts:1279](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1279)

`true` if the content of the entry is encrypted.

***

### executable

> **executable**: `boolean`

Defined in: [index.d.ts:1275](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1275)

`true` if the entry is an executable file

***

### ~~externalFileAttribute~~

> **externalFileAttribute**: `number`

Defined in: [index.d.ts:1440](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1440)

The external file attribute (raw).

#### Deprecated

Use [EntryMetaData#externalFileAttributes](#externalfileattributes) instead.

***

### externalFileAttributes

> **externalFileAttributes**: `number`

Defined in: [index.d.ts:1423](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1423)

The 32-bit `externalFileAttributes` field is the authoritative on-disk metadata for each entry.
- Upper 16 bits: Unix mode/type (e.g., permissions, file type)
- Low 8 bits: MS-DOS file attributes (e.g., directory, read-only)

When writing, all provided options are merged into this field. When reading, convenience fields are decoded from it.
For most use cases, prefer the high-level options and fields; only advanced users need to manipulate the raw value directly.

***

### extraField?

> `optional` **extraField?**: `Map`\<`number`, \{ `data`: `Uint8Array`; `type`: `number`; \}\>

Defined in: [index.d.ts:1335](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1335)

The extra field.

***

### extraFieldAES?

> `optional` **extraFieldAES?**: [`EntryExtraFieldAES`](EntryExtraFieldAES.md)

Defined in: [index.d.ts:1472](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1472)

The AES extra field.

***

### extraFieldExtendedTimestamp?

> `optional` **extraFieldExtendedTimestamp?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1488](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1488)

The extended timestamp extra field.

***

### extraFieldInfoZip?

> `optional` **extraFieldInfoZip?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1484](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1484)

The Info-ZIP Unix extra field.

***

### extraFieldLength?

> `optional` **extraFieldLength?**: `number`

Defined in: [index.d.ts:1464](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1464)

The length of the extra field in bytes.

***

### extraFieldNTFS?

> `optional` **extraFieldNTFS?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1476](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1476)

The NTFS extra field.

***

### extraFieldUnicodeComment?

> `optional` **extraFieldUnicodeComment?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1496](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1496)

The Unicode comment extra field.

***

### extraFieldUnicodePath?

> `optional` **extraFieldUnicodePath?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1492](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1492)

The Unicode path extra field.

***

### extraFieldUnix?

> `optional` **extraFieldUnix?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1480](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1480)

The Unix extra field.

***

### extraFieldUSDZ?

> `optional` **extraFieldUSDZ?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1500](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1500)

The USDZ extra field.

***

### extraFieldZip64?

> `optional` **extraFieldZip64?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1468](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1468)

The Zip64 extra field.

***

### filename

> **filename**: `string`

Defined in: [index.d.ts:1263](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1263)

The filename of the entry.

***

### filenameLength?

> `optional` **filenameLength?**: `number`

Defined in: [index.d.ts:1460](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1460)

The length of the filename in bytes.

***

### filenameUTF8

> **filenameUTF8**: `boolean`

Defined in: [index.d.ts:1271](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1271)

`true` if the filename is encoded in UTF-8.

***

### gid?

> `optional` **gid?**: `number`

Defined in: [index.d.ts:1394](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1394)

Unix group id when available.

***

### ~~internalFileAttribute~~

> **internalFileAttribute**: `number`

Defined in: [index.d.ts:1435](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1435)

The internal file attribute (raw).

#### Deprecated

Use [EntryMetaData#internalFileAttributes](#internalfileattributes) instead.

***

### internalFileAttributes

> **internalFileAttributes**: `number`

Defined in: [index.d.ts:1414](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1414)

The internal file attributes (raw).

***

### lastAccessDate?

> `optional` **lastAccessDate?**: `Date`

Defined in: [index.d.ts:1299](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1299)

The last access date.

***

### lastModDate

> **lastModDate**: `Date`

Defined in: [index.d.ts:1295](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1295)

The last modification date.

***

### localDirectory?

> `optional` **localDirectory?**: [`LocalDirectory`](LocalDirectory.md)

Defined in: [index.d.ts:1504](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1504)

The local file header fields, set when the entry data has been read.

***

### msdosAttributes?

> `optional` **msdosAttributes?**: `object`

Defined in: [index.d.ts:1380](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1380)

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

Defined in: [index.d.ts:1376](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1376)

The MS-DOS attributes low byte (raw).
This is the low 8 bits of [EntryMetaData#externalFileAttributes](#externalfileattributes) when present.

***

### msDosCompatible

> **msDosCompatible**: `boolean`

Defined in: [index.d.ts:1355](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1355)

`true` if `internalFileAttributes` and `externalFileAttributes` are compatible with MS-DOS format.

***

### offset

> **offset**: `number`

Defined in: [index.d.ts:1259](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1259)

The byte offset of the entry.

***

### rawBitFlag?

> `optional` **rawBitFlag?**: `number`

Defined in: [index.d.ts:1452](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1452)

The general purpose bit flag (raw).

***

### rawComment

> **rawComment**: `Uint8Array`

Defined in: [index.d.ts:1323](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1323)

The comment of the entry (raw).

***

### rawCreationDate?

> `optional` **rawCreationDate?**: `number` \| `bigint`

Defined in: [index.d.ts:1315](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1315)

The creation date (raw).

***

### rawExtraField

> **rawExtraField**: `Uint8Array`

Defined in: [index.d.ts:1339](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1339)

The extra field (raw).

***

### rawFilename

> **rawFilename**: `Uint8Array`

Defined in: [index.d.ts:1267](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1267)

The filename of the entry (raw).

***

### rawLastAccessDate?

> `optional` **rawLastAccessDate?**: `number` \| `bigint`

Defined in: [index.d.ts:1311](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1311)

The last access date (raw).

***

### rawLastModDate

> **rawLastModDate**: `number` \| `bigint`

Defined in: [index.d.ts:1307](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1307)

The last modification date (raw).

***

### setgid?

> `optional` **setgid?**: `boolean`

Defined in: [index.d.ts:1406](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1406)

`true` if the setgid bit is set on the entry.

***

### setuid?

> `optional` **setuid?**: `boolean`

Defined in: [index.d.ts:1402](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1402)

`true` if the setuid bit is set on the entry.

***

### signature

> **signature**: `number`

Defined in: [index.d.ts:1331](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1331)

The signature (CRC32 checksum) of the content.

***

### sticky?

> `optional` **sticky?**: `boolean`

Defined in: [index.d.ts:1410](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1410)

`true` if the sticky bit is set on the entry.

***

### uid?

> `optional` **uid?**: `number`

Defined in: [index.d.ts:1390](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1390)

Unix owner id when available.

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:1291](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1291)

The size of the decompressed data in bytes.

***

### unixExternalUpper?

> `optional` **unixExternalUpper?**: `number`

Defined in: [index.d.ts:1427](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1427)

The upper 16-bit portion of [EntryMetaData#externalFileAttributes](#externalfileattributes) when it represents Unix mode bits.

***

### unixMode?

> `optional` **unixMode?**: `number`

Defined in: [index.d.ts:1398](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1398)

Unix mode (st_mode) when available.

***

### version

> **version**: `number`

Defined in: [index.d.ts:1347](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1347)

The "Version" field.

***

### versionMadeBy

> **versionMadeBy**: `number`

Defined in: [index.d.ts:1351](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1351)

The "Version made by" field.

***

### zip64

> **zip64**: `boolean`

Defined in: [index.d.ts:1343](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1343)

`true` if the entry is using Zip64.

***

### zipCrypto

> **zipCrypto**: `boolean`

Defined in: [index.d.ts:1283](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1283)

`true` if the content of the entry is encrypted with the ZipCrypto algorithm.
