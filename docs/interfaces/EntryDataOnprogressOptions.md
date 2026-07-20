[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryDataOnprogressOptions

# Interface: EntryDataOnprogressOptions

Defined in: [index.d.ts:2075](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2075)

Represents options passed to [FileEntry#getData](FileEntry.md#getdata), [ZipWriter.add](../classes/ZipWriter.md#add) and `{@link ZipDirectory}.export*`.

## Extended by

- [`EntryGetDataOptions`](EntryGetDataOptions.md)
- [`ZipWriterAddDataOptions`](ZipWriterAddDataOptions.md)
- [`ZipDirectoryEntryExportOptions`](ZipDirectoryEntryExportOptions.md)

## Methods

### onend()?

> `optional` **onend**(`computedSize`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:2097](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2097)

The function called when ending compression/decompression.

#### Parameters

##### computedSize

`number`

The total number of bytes (computed).

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

***

### onprogress()?

> `optional` **onprogress**(`progress`, `total`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:2090](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2090)

The function called during compression/decompression.

#### Parameters

##### progress

`number`

The current progress in bytes.

##### total

`number`

The total number of bytes.

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

***

### onstart()?

> `optional` **onstart**(`total`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:2082](https://github.com/gildas-lormeau/zip.js/blob/430b26aa741652bb730a319c4680f0026111f13d/index.d.ts#L2082)

The function called when starting compression/decompression.

#### Parameters

##### total

`number`

The total number of bytes.

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.
