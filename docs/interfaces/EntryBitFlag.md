[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryBitFlag

# Interface: EntryBitFlag

Defined in: [index.d.ts:1054](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1054)

Represents the parsed general purpose bit flag of an entry.

## Properties

### dataDescriptor

> **dataDescriptor**: `boolean`

Defined in: [index.d.ts:1062](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1062)

`true` if the entry data is followed by a data descriptor.

***

### languageEncodingFlag

> **languageEncodingFlag**: `boolean`

Defined in: [index.d.ts:1066](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1066)

`true` if the filename and the comment are encoded in UTF-8 (EFS).

***

### level

> **level**: `number`

Defined in: [index.d.ts:1058](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1058)

The compression option bits.
