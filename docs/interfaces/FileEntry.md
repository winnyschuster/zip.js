[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / FileEntry

# Interface: FileEntry

Defined in: [index.d.ts:1513](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1513)

Represents the metadata of an entry in a zip file (Core API).

## Extends

- [`EntryMetaData`](EntryMetaData.md)

## Properties

### bitFlag?

> `optional` **bitFlag?**: [`EntryBitFlag`](EntryBitFlag.md)

Defined in: [index.d.ts:1456](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1456)

The general purpose bit flag.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`bitFlag`](EntryMetaData.md#bitflag)

***

### comment

> **comment**: `string`

Defined in: [index.d.ts:1319](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1319)

The comment of the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`comment`](EntryMetaData.md#comment)

***

### commentUTF8

> **commentUTF8**: `boolean`

Defined in: [index.d.ts:1327](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1327)

`true` if the comment is encoded in UTF-8.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`commentUTF8`](EntryMetaData.md#commentutf8)

***

### compressedSize

> **compressedSize**: `number`

Defined in: [index.d.ts:1287](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1287)

The size of the compressed data in bytes.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`compressedSize`](EntryMetaData.md#compressedsize)

***

### compressionMethod

> **compressionMethod**: `number`

Defined in: [index.d.ts:1448](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1448)

The compression method.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`compressionMethod`](EntryMetaData.md#compressionmethod)

***

### creationDate?

> `optional` **creationDate?**: `Date`

Defined in: [index.d.ts:1303](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1303)

The creation date.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`creationDate`](EntryMetaData.md#creationdate)

***

### directory

> **directory**: `false`

Defined in: [index.d.ts:1517](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1517)

`false` if the entry is a file.

***

### diskNumberStart

> **diskNumberStart**: `number`

Defined in: [index.d.ts:1444](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1444)

The number of the disk where the entry data starts.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`diskNumberStart`](EntryMetaData.md#disknumberstart)

***

### encrypted

> **encrypted**: `boolean`

Defined in: [index.d.ts:1279](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1279)

`true` if the content of the entry is encrypted.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`encrypted`](EntryMetaData.md#encrypted)

***

### executable

> **executable**: `boolean`

Defined in: [index.d.ts:1275](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1275)

`true` if the entry is an executable file

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`executable`](EntryMetaData.md#executable)

***

### ~~externalFileAttribute~~

> **externalFileAttribute**: `number`

Defined in: [index.d.ts:1440](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1440)

The external file attribute (raw).

#### Deprecated

Use [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) instead.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`externalFileAttribute`](EntryMetaData.md#externalfileattribute)

***

### externalFileAttributes

> **externalFileAttributes**: `number`

Defined in: [index.d.ts:1423](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1423)

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

Defined in: [index.d.ts:1335](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1335)

The extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraField`](EntryMetaData.md#extrafield)

***

### extraFieldAES?

> `optional` **extraFieldAES?**: [`EntryExtraFieldAES`](EntryExtraFieldAES.md)

Defined in: [index.d.ts:1472](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1472)

The AES extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldAES`](EntryMetaData.md#extrafieldaes)

***

### extraFieldExtendedTimestamp?

> `optional` **extraFieldExtendedTimestamp?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1488](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1488)

The extended timestamp extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldExtendedTimestamp`](EntryMetaData.md#extrafieldextendedtimestamp)

***

### extraFieldInfoZip?

> `optional` **extraFieldInfoZip?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1484](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1484)

The Info-ZIP Unix extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldInfoZip`](EntryMetaData.md#extrafieldinfozip)

***

### extraFieldLength?

> `optional` **extraFieldLength?**: `number`

Defined in: [index.d.ts:1464](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1464)

The length of the extra field in bytes.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldLength`](EntryMetaData.md#extrafieldlength)

***

### extraFieldNTFS?

> `optional` **extraFieldNTFS?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1476](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1476)

The NTFS extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldNTFS`](EntryMetaData.md#extrafieldntfs)

***

### extraFieldUnicodeComment?

> `optional` **extraFieldUnicodeComment?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1496](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1496)

The Unicode comment extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldUnicodeComment`](EntryMetaData.md#extrafieldunicodecomment)

***

### extraFieldUnicodePath?

> `optional` **extraFieldUnicodePath?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1492](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1492)

The Unicode path extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldUnicodePath`](EntryMetaData.md#extrafieldunicodepath)

***

### extraFieldUnix?

> `optional` **extraFieldUnix?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1480](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1480)

The Unix extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldUnix`](EntryMetaData.md#extrafieldunix)

***

### extraFieldUSDZ?

> `optional` **extraFieldUSDZ?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1500](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1500)

The USDZ extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldUSDZ`](EntryMetaData.md#extrafieldusdz)

***

### extraFieldZip64?

> `optional` **extraFieldZip64?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1468](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1468)

The Zip64 extra field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`extraFieldZip64`](EntryMetaData.md#extrafieldzip64)

***

### filename

> **filename**: `string`

Defined in: [index.d.ts:1263](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1263)

The filename of the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`filename`](EntryMetaData.md#filename)

***

### filenameLength?

> `optional` **filenameLength?**: `number`

Defined in: [index.d.ts:1460](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1460)

The length of the filename in bytes.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`filenameLength`](EntryMetaData.md#filenamelength)

***

### filenameUTF8

> **filenameUTF8**: `boolean`

Defined in: [index.d.ts:1271](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1271)

`true` if the filename is encoded in UTF-8.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`filenameUTF8`](EntryMetaData.md#filenameutf8)

***

### gid?

> `optional` **gid?**: `number`

Defined in: [index.d.ts:1394](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1394)

Unix group id when available.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`gid`](EntryMetaData.md#gid)

***

### ~~internalFileAttribute~~

> **internalFileAttribute**: `number`

Defined in: [index.d.ts:1435](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1435)

The internal file attribute (raw).

#### Deprecated

Use [EntryMetaData#internalFileAttributes](EntryMetaData.md#internalfileattributes) instead.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`internalFileAttribute`](EntryMetaData.md#internalfileattribute)

***

### internalFileAttributes

> **internalFileAttributes**: `number`

Defined in: [index.d.ts:1414](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1414)

The internal file attributes (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`internalFileAttributes`](EntryMetaData.md#internalfileattributes)

***

### lastAccessDate?

> `optional` **lastAccessDate?**: `Date`

Defined in: [index.d.ts:1299](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1299)

The last access date.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`lastAccessDate`](EntryMetaData.md#lastaccessdate)

***

### lastModDate

> **lastModDate**: `Date`

Defined in: [index.d.ts:1295](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1295)

The last modification date.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`lastModDate`](EntryMetaData.md#lastmoddate)

***

### localDirectory?

> `optional` **localDirectory?**: [`LocalDirectory`](LocalDirectory.md)

Defined in: [index.d.ts:1504](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1504)

The local file header fields, set when the entry data has been read.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`localDirectory`](EntryMetaData.md#localdirectory)

***

### msdosAttributes?

> `optional` **msdosAttributes?**: `object`

Defined in: [index.d.ts:1380](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1380)

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

Defined in: [index.d.ts:1376](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1376)

The MS-DOS attributes low byte (raw).
This is the low 8 bits of [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) when present.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`msdosAttributesRaw`](EntryMetaData.md#msdosattributesraw)

***

### msDosCompatible

> **msDosCompatible**: `boolean`

Defined in: [index.d.ts:1355](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1355)

`true` if `internalFileAttributes` and `externalFileAttributes` are compatible with MS-DOS format.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`msDosCompatible`](EntryMetaData.md#msdoscompatible)

***

### offset

> **offset**: `number`

Defined in: [index.d.ts:1259](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1259)

The byte offset of the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`offset`](EntryMetaData.md#offset)

***

### rawBitFlag?

> `optional` **rawBitFlag?**: `number`

Defined in: [index.d.ts:1452](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1452)

The general purpose bit flag (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawBitFlag`](EntryMetaData.md#rawbitflag)

***

### rawComment

> **rawComment**: `Uint8Array`

Defined in: [index.d.ts:1323](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1323)

The comment of the entry (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawComment`](EntryMetaData.md#rawcomment)

***

### rawCreationDate?

> `optional` **rawCreationDate?**: `number` \| `bigint`

Defined in: [index.d.ts:1315](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1315)

The creation date (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawCreationDate`](EntryMetaData.md#rawcreationdate)

***

### rawExtraField

> **rawExtraField**: `Uint8Array`

Defined in: [index.d.ts:1339](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1339)

The extra field (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawExtraField`](EntryMetaData.md#rawextrafield)

***

### rawFilename

> **rawFilename**: `Uint8Array`

Defined in: [index.d.ts:1267](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1267)

The filename of the entry (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawFilename`](EntryMetaData.md#rawfilename)

***

### rawLastAccessDate?

> `optional` **rawLastAccessDate?**: `number` \| `bigint`

Defined in: [index.d.ts:1311](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1311)

The last access date (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawLastAccessDate`](EntryMetaData.md#rawlastaccessdate)

***

### rawLastModDate

> **rawLastModDate**: `number` \| `bigint`

Defined in: [index.d.ts:1307](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1307)

The last modification date (raw).

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`rawLastModDate`](EntryMetaData.md#rawlastmoddate)

***

### setgid?

> `optional` **setgid?**: `boolean`

Defined in: [index.d.ts:1406](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1406)

`true` if the setgid bit is set on the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`setgid`](EntryMetaData.md#setgid)

***

### setuid?

> `optional` **setuid?**: `boolean`

Defined in: [index.d.ts:1402](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1402)

`true` if the setuid bit is set on the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`setuid`](EntryMetaData.md#setuid)

***

### signature

> **signature**: `number`

Defined in: [index.d.ts:1331](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1331)

The signature (CRC32 checksum) of the content.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`signature`](EntryMetaData.md#signature)

***

### sticky?

> `optional` **sticky?**: `boolean`

Defined in: [index.d.ts:1410](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1410)

`true` if the sticky bit is set on the entry.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`sticky`](EntryMetaData.md#sticky)

***

### uid?

> `optional` **uid?**: `number`

Defined in: [index.d.ts:1390](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1390)

Unix owner id when available.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`uid`](EntryMetaData.md#uid)

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [index.d.ts:1291](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1291)

The size of the decompressed data in bytes.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`uncompressedSize`](EntryMetaData.md#uncompressedsize)

***

### unixExternalUpper?

> `optional` **unixExternalUpper?**: `number`

Defined in: [index.d.ts:1427](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1427)

The upper 16-bit portion of [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) when it represents Unix mode bits.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`unixExternalUpper`](EntryMetaData.md#unixexternalupper)

***

### unixMode?

> `optional` **unixMode?**: `number`

Defined in: [index.d.ts:1398](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1398)

Unix mode (st_mode) when available.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`unixMode`](EntryMetaData.md#unixmode)

***

### version

> **version**: `number`

Defined in: [index.d.ts:1347](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1347)

The "Version" field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`version`](EntryMetaData.md#version)

***

### versionMadeBy

> **versionMadeBy**: `number`

Defined in: [index.d.ts:1351](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1351)

The "Version made by" field.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`versionMadeBy`](EntryMetaData.md#versionmadeby)

***

### zip64

> **zip64**: `boolean`

Defined in: [index.d.ts:1343](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1343)

`true` if the entry is using Zip64.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`zip64`](EntryMetaData.md#zip64)

***

### zipCrypto

> **zipCrypto**: `boolean`

Defined in: [index.d.ts:1283](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1283)

`true` if the content of the entry is encrypted with the ZipCrypto algorithm.

#### Inherited from

[`EntryMetaData`](EntryMetaData.md).[`zipCrypto`](EntryMetaData.md#zipcrypto)

## Methods

### arrayBuffer()

> **arrayBuffer**(`options?`): `Promise`\<`ArrayBuffer`\>

Defined in: [index.d.ts:1542](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1542)

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

Defined in: [index.d.ts:1525](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1525)

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
