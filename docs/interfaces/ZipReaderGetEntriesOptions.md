[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipReaderGetEntriesOptions

# Interface: ZipReaderGetEntriesOptions

Defined in: [index.d.ts:829](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L829)

Represents the options passed to [ZipReader#getEntries](../classes/ZipReader.md#getentries) and [ZipReader#getEntriesGenerator](../classes/ZipReader.md#getentriesgenerator).

## Extends

- [`GetEntriesOptions`](GetEntriesOptions.md).[`EntryOnprogressOptions`](EntryOnprogressOptions.md)

## Properties

### checkAmbiguity?

> `optional` **checkAmbiguity?**: `boolean`

Defined in: [index.d.ts:863](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L863)

`true` to throw an [ERR\_AMBIGUOUS\_ARCHIVE](../variables/ERR_AMBIGUOUS_ARCHIVE.md) error when the archive could be parsed differently by other
tools. This detects data before or after the zip structure (e.g. a self-extracting archive stub or a
concatenated archive), central directory records not accounted for by the end of central directory record, an
end of central directory record disagreeing with its zip64 counterpart, and duplicate filenames. When reading
the content of an entry, it also validates the local file header against the central directory record (see
[ZipReaderOptions#checkAmbiguity](ZipReaderOptions.md#checkambiguity)).

#### Default Value

```ts
false
```

#### Inherited from

[`GetEntriesOptions`](GetEntriesOptions.md).[`checkAmbiguity`](GetEntriesOptions.md#checkambiguity)

***

### commentEncoding?

> `optional` **commentEncoding?**: `string`

Defined in: [index.d.ts:844](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L844)

The encoding of the comment of the entry.

#### Inherited from

[`GetEntriesOptions`](GetEntriesOptions.md).[`commentEncoding`](GetEntriesOptions.md#commentencoding)

***

### filenameEncoding?

> `optional` **filenameEncoding?**: `string`

Defined in: [index.d.ts:840](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L840)

The encoding of the filename of the entry.

#### Inherited from

[`GetEntriesOptions`](GetEntriesOptions.md).[`filenameEncoding`](GetEntriesOptions.md#filenameencoding)

## Methods

### decodeText()?

> `optional` **decodeText**(`value`, `encoding`): `string` \| `undefined`

Defined in: [index.d.ts:852](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L852)

The function called for decoding the filename and the comment of the entry.

#### Parameters

##### value

`Uint8Array`

The raw text value.

##### encoding

`string`

The encoding of the text.

#### Returns

`string` \| `undefined`

The decoded text value or `undefined` if the raw text value should be decoded by zip.js.

#### Inherited from

[`GetEntriesOptions`](GetEntriesOptions.md).[`decodeText`](GetEntriesOptions.md#decodetext)

***

### onprogress()?

> `optional` **onprogress**(`progress`, `total`, `entry`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1735](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L1735)

The function called each time an entry is read/written.

#### Parameters

##### progress

`number`

The entry index.

##### total

`number`

The total number of entries.

##### entry

[`EntryMetaData`](EntryMetaData.md)

The entry being read/written.

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

#### Inherited from

[`EntryOnprogressOptions`](EntryOnprogressOptions.md).[`onprogress`](EntryOnprogressOptions.md#onprogress)
