[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipReaderOptions

# Interface: ZipReaderOptions

Defined in: [index.d.ts:869](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L869)

Represents options passed to the constructor of [ZipReader](../classes/ZipReader.md) and [FileEntry#getData](FileEntry.md#getdata).

## Extended by

- [`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md)
- [`EntryGetDataOptions`](EntryGetDataOptions.md)

## Properties

### checkAmbiguity?

> `optional` **checkAmbiguity?**: `boolean`

Defined in: [index.d.ts:880](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L880)

`true` to throw an [ERR\_AMBIGUOUS\_ARCHIVE](../variables/ERR_AMBIGUOUS_ARCHIVE.md) error when calling [FileEntry#getData](FileEntry.md#getdata) if the local
file header of the entry disagrees with its central directory record in a way that could make other tools
(e.g. streaming readers based on local file headers) interpret the entry differently. This detects mismatched
filenames, general purpose bit flags (encryption, data descriptor and language encoding flags), compression
methods, signatures and sizes. The extra fields are not compared because the zip specification allows them
to differ.

#### Default Value

```ts
false
```

***

### checkOverlappingEntry?

> `optional` **checkOverlappingEntry?**: `boolean`

Defined in: [index.d.ts:900](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L900)

`true` to throw an [ERR\_OVERLAPPING\_ENTRY](../variables/ERR_OVERLAPPING_ENTRY.md) error when calling [FileEntry#getData](FileEntry.md#getdata) if the entry
 overlaps with another entry on which [FileEntry#getData](FileEntry.md#getdata) has already been called (with the option
`checkOverlappingEntry` or  `checkOverlappingEntryOnly` set to `true`).

#### Default Value

```ts
false
```

***

### checkOverlappingEntryOnly?

> `optional` **checkOverlappingEntryOnly?**: `boolean`

Defined in: [index.d.ts:909](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L909)

`true` to throw an [ERR\_OVERLAPPING\_ENTRY](../variables/ERR_OVERLAPPING_ENTRY.md) error when calling [FileEntry#getData](FileEntry.md#getdata) if the entry
 overlaps with another entry on which [FileEntry#getData](FileEntry.md#getdata) has already been called (with the option
`checkOverlappingEntry` or  `checkOverlappingEntryOnly` set to `true`) without trying to read the content of the
entry.

#### Default Value

```ts
false
```

***

### checkPasswordOnly?

> `optional` **checkPasswordOnly?**: `boolean`

Defined in: [index.d.ts:886](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L886)

`true` to check only if the password is valid.

#### Default Value

```ts
false
```

***

### checkSignature?

> `optional` **checkSignature?**: `boolean`

Defined in: [index.d.ts:892](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L892)

`true` to check the signature of the entry.

#### Default Value

```ts
false
```

***

### passThrough?

> `optional` **passThrough?**: `boolean`

Defined in: [index.d.ts:917](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L917)

`true` to read the data as-is without decompressing it and without decrypting it.

***

### password?

> `optional` **password?**: `string`

Defined in: [index.d.ts:913](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L913)

The password used to decrypt the content of the entry.

***

### preventClose?

> `optional` **preventClose?**: `boolean`

Defined in: [index.d.ts:931](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L931)

`true` to prevent closing of [Writer#writable](../classes/Writer.md#writable) when calling [FileEntry#getData](FileEntry.md#getdata).

#### Default Value

```ts
false
```

***

### rawPassword?

> `optional` **rawPassword?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.d.ts:921](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L921)

The password used to encrypt the content of the entry (raw).

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [index.d.ts:925](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L925)

The `AbortSignal` instance used to cancel the decompression.
