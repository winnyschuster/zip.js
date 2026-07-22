[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryExtraField

# Interface: EntryExtraField

Defined in: [index.d.ts:1110](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1110)

Represents an extra field record of an entry.

## Extended by

- [`EntryExtraFieldAES`](EntryExtraFieldAES.md)
- [`EntryExtraFieldUnicode`](EntryExtraFieldUnicode.md)

## Properties

### data

> **data**: `Uint8Array`

Defined in: [index.d.ts:1118](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1118)

The data of the extra field.

***

### type

> **type**: `number`

Defined in: [index.d.ts:1114](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L1114)

The type (header id) of the extra field.
