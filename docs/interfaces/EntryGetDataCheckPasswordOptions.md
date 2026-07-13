[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / EntryGetDataCheckPasswordOptions

# Interface: EntryGetDataCheckPasswordOptions

Defined in: [index.d.ts:1203](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L1203)

Represents the options passed to [FileEntry#getData](FileEntry.md#getdata) and `{@link ZipFileEntry}.get*`.

## Extends

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

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`checkAmbiguity`](EntryGetDataOptions.md#checkambiguity)

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

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`checkOverlappingEntry`](EntryGetDataOptions.md#checkoverlappingentry)

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

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`checkOverlappingEntryOnly`](EntryGetDataOptions.md#checkoverlappingentryonly)

***

### checkPasswordOnly?

> `optional` **checkPasswordOnly?**: `boolean`

Defined in: [index.d.ts:886](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L886)

`true` to check only if the password is valid.

#### Default Value

```ts
false
```

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`checkPasswordOnly`](EntryGetDataOptions.md#checkpasswordonly)

***

### checkSignature?

> `optional` **checkSignature?**: `boolean`

Defined in: [index.d.ts:892](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L892)

`true` to check the signature of the entry.

#### Default Value

```ts
false
```

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`checkSignature`](EntryGetDataOptions.md#checksignature)

***

### passThrough?

> `optional` **passThrough?**: `boolean`

Defined in: [index.d.ts:917](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L917)

`true` to read the data as-is without decompressing it and without decrypting it.

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`passThrough`](EntryGetDataOptions.md#passthrough)

***

### password?

> `optional` **password?**: `string`

Defined in: [index.d.ts:913](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L913)

The password used to decrypt the content of the entry.

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`password`](EntryGetDataOptions.md#password)

***

### preventClose?

> `optional` **preventClose?**: `boolean`

Defined in: [index.d.ts:931](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L931)

`true` to prevent closing of [Writer#writable](../classes/Writer.md#writable) when calling [FileEntry#getData](FileEntry.md#getdata).

#### Default Value

```ts
false
```

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`preventClose`](EntryGetDataOptions.md#preventclose)

***

### rawPassword?

> `optional` **rawPassword?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.d.ts:921](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L921)

The password used to encrypt the content of the entry (raw).

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`rawPassword`](EntryGetDataOptions.md#rawpassword)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [index.d.ts:925](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L925)

The `AbortSignal` instance used to cancel the decompression.

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`signal`](EntryGetDataOptions.md#signal)

***

### transferStreams?

> `optional` **transferStreams?**: `boolean`

Defined in: [index.d.ts:309](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L309)

`true` to transfer stream ownership to web workers.

#### Default Value

```ts
true
```

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`transferStreams`](EntryGetDataOptions.md#transferstreams)

***

### useCompressionStream?

> `optional` **useCompressionStream?**: `boolean`

Defined in: [index.d.ts:303](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L303)

`true` to use the native API `CompressionStream`/`DecompressionStream` to compress/decompress data.

#### Default Value

```ts
true
```

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`useCompressionStream`](EntryGetDataOptions.md#usecompressionstream)

***

### useWebWorkers?

> `optional` **useWebWorkers?**: `boolean`

Defined in: [index.d.ts:297](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L297)

`true` to use web workers to compress/decompress data in non-blocking background processes.

#### Default Value

```ts
true
```

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`useWebWorkers`](EntryGetDataOptions.md#usewebworkers)

## Methods

### onend()?

> `optional` **onend**(`computedSize`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1720](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L1720)

The function called when ending compression/decompression.

#### Parameters

##### computedSize

`number`

The total number of bytes (computed).

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`onend`](EntryGetDataOptions.md#onend)

***

### onprogress()?

> `optional` **onprogress**(`progress`, `total`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1713](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L1713)

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

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`onprogress`](EntryGetDataOptions.md#onprogress)

***

### onstart()?

> `optional` **onstart**(`total`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1705](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L1705)

The function called when starting compression/decompression.

#### Parameters

##### total

`number`

The total number of bytes.

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

#### Inherited from

[`EntryGetDataOptions`](EntryGetDataOptions.md).[`onstart`](EntryGetDataOptions.md#onstart)
