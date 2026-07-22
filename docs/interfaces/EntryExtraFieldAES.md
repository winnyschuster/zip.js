[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryExtraFieldAES

# Interface: EntryExtraFieldAES

Defined in: [index.d.ts:1123](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1123)

Represents the AES extra field record of an entry.

## Extends

- [`EntryExtraField`](EntryExtraField.md)

## Properties

### data

> **data**: `Uint8Array`

Defined in: [index.d.ts:1118](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1118)

The data of the extra field.

#### Inherited from

[`EntryExtraField`](EntryExtraField.md).[`data`](EntryExtraField.md#data)

***

### originalCompressionMethod?

> `optional` **originalCompressionMethod?**: `number`

Defined in: [index.d.ts:1131](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1131)

The compression method stored in the AES extra field.

***

### strength?

> `optional` **strength?**: `number`

Defined in: [index.d.ts:1127](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1127)

The encryption strength (1, 2 or 3).

***

### type

> **type**: `number`

Defined in: [index.d.ts:1114](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1114)

The type (header id) of the extra field.

#### Inherited from

[`EntryExtraField`](EntryExtraField.md).[`type`](EntryExtraField.md#type)
