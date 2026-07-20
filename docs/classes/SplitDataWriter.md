[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / SplitDataWriter

# Class: SplitDataWriter

Defined in: [index.d.ts:741](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L741)

Represents a [Writer](Writer.md)  instance used to retrieve the written data from a generator of [WritableWriter](../interfaces/WritableWriter.md)  instances  (i.e. split zip files).

## Implements

- [`Initializable`](../interfaces/Initializable.md)
- [`WritableWriter`](../interfaces/WritableWriter.md)

## Constructors

### Constructor

> **new SplitDataWriter**(`writerGenerator`, `maxSize?`): `SplitDataWriter`

Defined in: [index.d.ts:772](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L772)

Creates the SplitDataWriter instance

#### Parameters

##### writerGenerator

`AsyncGenerator`\<`WritableStream`\<`any`\> \| [`WritableWriter`](../interfaces/WritableWriter.md) \| [`Writer`](Writer.md)\<`unknown`\>, `boolean`\>

A generator of Writer instances.

##### maxSize?

`number`

The maximum size of the data written into [Writer](Writer.md) instances (default: 4GB).

#### Returns

`SplitDataWriter`

## Properties

### availableSize

> **availableSize**: `number`

Defined in: [index.d.ts:761](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L761)

The number of bytes still available on the disk being written.

***

### diskNumber

> **diskNumber**: `number`

Defined in: [index.d.ts:749](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L749)

The number of the disk being written.

***

### diskOffset

> **diskOffset**: `number`

Defined in: [index.d.ts:753](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L753)

The byte offset of the disk being written.

***

### maxSize

> **maxSize**: `number`

Defined in: [index.d.ts:757](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L757)

The maximum size of each disk in bytes.

#### Implementation of

[`WritableWriter`](../interfaces/WritableWriter.md).[`maxSize`](../interfaces/WritableWriter.md#maxsize)

***

### writable

> **writable**: `WritableStream`

Defined in: [index.d.ts:745](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L745)

The `WritableStream` instance.

#### Implementation of

[`WritableWriter`](../interfaces/WritableWriter.md).[`writable`](../interfaces/WritableWriter.md#writable)

## Methods

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:765](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L765)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Initializable`](../interfaces/Initializable.md).[`init`](../interfaces/Initializable.md#init)
