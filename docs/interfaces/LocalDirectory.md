[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / LocalDirectory

# Interface: LocalDirectory

Defined in: [index.d.ts:1106](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1106)

Represents the local file header fields of an entry, read when getting the entry data.

## Properties

### bitFlag

> **bitFlag**: [`EntryBitFlag`](EntryBitFlag.md)

Defined in: [index.d.ts:1122](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1122)

The general purpose bit flag.

***

### compressedSize?

> `optional` **compressedSize?**: `number`

Defined in: [index.d.ts:1154](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1154)

The compressed size of the content.

***

### compressionMethod?

> `optional` **compressionMethod?**: `number`

Defined in: [index.d.ts:1162](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1162)

The compression method.

***

### encrypted

> **encrypted**: `boolean`

Defined in: [index.d.ts:1114](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1114)

`true` if the entry is encrypted.

***

### extraField?

> `optional` **extraField?**: `Map`\<`number`, [`EntryExtraField`](EntryExtraField.md)\>

Defined in: [index.d.ts:1146](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1146)

The extra field.

***

### extraFieldAES?

> `optional` **extraFieldAES?**: [`EntryExtraFieldAES`](EntryExtraFieldAES.md)

Defined in: [index.d.ts:1170](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1170)

The AES extra field.

***

### extraFieldExtendedTimestamp?

> `optional` **extraFieldExtendedTimestamp?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1186](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1186)

The extended timestamp extra field.

***

### extraFieldInfoZip?

> `optional` **extraFieldInfoZip?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1182](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1182)

The Info-ZIP Unix extra field.

***

### extraFieldLength

> **extraFieldLength**: `number`

Defined in: [index.d.ts:1138](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1138)

The length of the extra field in bytes.

***

### extraFieldNTFS?

> `optional` **extraFieldNTFS?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1174](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1174)

The NTFS extra field.

***

### extraFieldUnicodeComment?

> `optional` **extraFieldUnicodeComment?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1194](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1194)

The Unicode comment extra field.

***

### extraFieldUnicodePath?

> `optional` **extraFieldUnicodePath?**: [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

Defined in: [index.d.ts:1190](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1190)

The Unicode path extra field.

***

### extraFieldUnix?

> `optional` **extraFieldUnix?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1178](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1178)

The Unix extra field.

***

### extraFieldUSDZ?

> `optional` **extraFieldUSDZ?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1198](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1198)

The USDZ extra field.

***

### extraFieldZip64?

> `optional` **extraFieldZip64?**: [`EntryExtraField`](EntryExtraField.md)

Defined in: [index.d.ts:1166](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1166)

The Zip64 extra field.

***

### filenameLength

> **filenameLength**: `number`

Defined in: [index.d.ts:1134](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1134)

The length of the filename in bytes.

***

### lastModDate

> **lastModDate**: `Date`

Defined in: [index.d.ts:1130](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1130)

The last modification date.

***

### rawBitFlag

> **rawBitFlag**: `number`

Defined in: [index.d.ts:1118](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1118)

The general purpose bit flag (raw).

***

### rawExtraField

> **rawExtraField**: `Uint8Array`

Defined in: [index.d.ts:1142](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1142)

The extra field (raw).

***

### rawLastModDate

> **rawLastModDate**: `number`

Defined in: [index.d.ts:1126](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1126)

The last modification date (raw).

***

### signature?

> `optional` **signature?**: `number`

Defined in: [index.d.ts:1150](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1150)

The signature (CRC32 checksum) of the content.

***

### uncompressedSize?

> `optional` **uncompressedSize?**: `number`

Defined in: [index.d.ts:1158](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1158)

The uncompressed size of the content.

***

### version

> **version**: `number`

Defined in: [index.d.ts:1110](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1110)

The "Version" field.
