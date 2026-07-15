[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryExtraFieldAES

# Interface: EntryExtraFieldAES

Defined in: [index.d.ts:1084](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1084)

Represents the AES extra field record of an entry.

## Extends

- [`EntryExtraField`](EntryExtraField.md)

## Properties

### data

> **data**: `Uint8Array`

Defined in: [index.d.ts:1079](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1079)

The data of the extra field.

#### Inherited from

[`EntryExtraField`](EntryExtraField.md).[`data`](EntryExtraField.md#data)

***

### originalCompressionMethod?

> `optional` **originalCompressionMethod?**: `number`

Defined in: [index.d.ts:1092](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1092)

The compression method stored in the AES extra field.

***

### strength?

> `optional` **strength?**: `number`

Defined in: [index.d.ts:1088](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1088)

The encryption strength (1, 2 or 3).

***

### type

> **type**: `number`

Defined in: [index.d.ts:1075](https://github.com/gildas-lormeau/zip.js/blob/7c729fa77258b693a14e1de637da499fa2bb1021/index.d.ts#L1075)

The type (header id) of the extra field.

#### Inherited from

[`EntryExtraField`](EntryExtraField.md).[`type`](EntryExtraField.md#type)
