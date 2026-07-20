[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / Initializable

# Interface: Initializable

Defined in: [index.d.ts:429](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L429)

Represents an instance used to read or write unknown type of data.

zip.js can handle multiple types of data thanks to a generic API. This feature is based on 2 abstract constructors: [Reader](../classes/Reader.md) and [Writer](../classes/Writer.md).
The classes inheriting from [Reader](../classes/Reader.md) help to read data from a source of data. The classes inheriting from [Writer](../classes/Writer.md) help to write data into a destination.

## Properties

### initialized?

> `optional` **initialized?**: `boolean`

Defined in: [index.d.ts:437](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L437)

`true` if the instance is initialized.

## Methods

### init()?

> `optional` **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:433](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L433)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>
