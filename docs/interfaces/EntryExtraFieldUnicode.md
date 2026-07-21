[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryExtraFieldUnicode

# Interface: EntryExtraFieldUnicode

Defined in: [index.d.ts:1136](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1136)

Represents a Unicode path or comment extra field record of an entry.

## Extends

- [`EntryExtraField`](EntryExtraField.md)

## Properties

### data

> **data**: `Uint8Array`

Defined in: [index.d.ts:1118](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1118)

The data of the extra field.

#### Inherited from

[`EntryExtraField`](EntryExtraField.md).[`data`](EntryExtraField.md#data)

***

### type

> **type**: `number`

Defined in: [index.d.ts:1114](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1114)

The type (header id) of the extra field.

#### Inherited from

[`EntryExtraField`](EntryExtraField.md).[`type`](EntryExtraField.md#type)

***

### valid?

> `optional` **valid?**: `boolean`

Defined in: [index.d.ts:1140](https://github.com/gildas-lormeau/zip.js/blob/eb0a28ff183842af5fe9289f596749ea384004de/index.d.ts#L1140)

`true` if the extra field is consistent with the entry metadata.
