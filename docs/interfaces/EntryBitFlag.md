[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryBitFlag

# Interface: EntryBitFlag

Defined in: [index.d.ts:1093](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1093)

Represents the parsed general purpose bit flag of an entry.

## Properties

### dataDescriptor

> **dataDescriptor**: `boolean`

Defined in: [index.d.ts:1101](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1101)

`true` if the entry data is followed by a data descriptor.

***

### languageEncodingFlag

> **languageEncodingFlag**: `boolean`

Defined in: [index.d.ts:1105](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1105)

`true` if the filename and the comment are encoded in UTF-8 (EFS).

***

### level

> **level**: `number`

Defined in: [index.d.ts:1097](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L1097)

The compression option bits.
