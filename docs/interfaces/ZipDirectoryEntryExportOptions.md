[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipDirectoryEntryExportOptions

# Interface: ZipDirectoryEntryExportOptions

Defined in: [index.d.ts:2306](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L2306)

Represents the options passed to `{@link ZipDirectoryEntry}#export*()`.

## Extends

- [`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`EntryDataOnprogressOptions`](EntryDataOnprogressOptions.md)

## Properties

### bufferedWrite?

> `optional` **bufferedWrite?**: `boolean`

Defined in: [index.d.ts:1580](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1580)

`true` to write entry data in a buffer before appending it to the zip file.

`bufferedWrite` is automatically set to `true` when compressing more than one entry in parallel.

#### Default Value

```ts
false
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`bufferedWrite`](ZipWriterConstructorOptions.md#bufferedwrite)

***

### compressionMethod?

> `optional` **compressionMethod?**: `number`

Defined in: [index.d.ts:1785](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1785)

The compression method (e.g. 8 for DEFLATE, 0 for STORE).

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`compressionMethod`](ZipWriterConstructorOptions.md#compressionmethod)

***

### createTempStream?

> `optional` **createTempStream?**: () => [`TempStream`](TempStream.md) \| `Promise`\<[`TempStream`](TempStream.md)\>

Defined in: [index.d.ts:1590](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1590)

An async factory function that returns a `TransformStream`-like object (`{ writable, readable }`) used as a temporary buffer when entries are written in parallel.

When provided, this replaces the default in-memory `TransformStream` buffer, allowing data to be stored externally (e.g. filesystem, OPFS, network).
The `writable` side receives compressed entry data. The `readable` side is consumed when the entry is replayed into the final zip stream.
The optional `dispose` method is called once the entry has been processed (on success, error, or abort) so a resource-backed buffer can release its resource.

See [createOPFSTempStream](../functions/createOPFSTempStream.md) for a ready-made OPFS-backed implementation.

#### Returns

[`TempStream`](TempStream.md) \| `Promise`\<[`TempStream`](TempStream.md)\>

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`createTempStream`](ZipWriterConstructorOptions.md#createtempstream)

***

### creationDate?

> `optional` **creationDate?**: `Date`

Defined in: [index.d.ts:1641](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1641)

The creation date.

This option is ignored if the [ZipWriterConstructorOptions#extendedTimestamp](ZipWriterConstructorOptions.md#extendedtimestamp) option is set to `false`.

#### Default Value

```ts
The current date.
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`creationDate`](ZipWriterConstructorOptions.md#creationdate)

***

### dataDescriptor?

> `optional` **dataDescriptor?**: `boolean`

Defined in: [index.d.ts:1686](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1686)

`true` to add a data descriptor.

When set to `false`, the [ZipWriterConstructorOptions#bufferedWrite](ZipWriterConstructorOptions.md#bufferedwrite) option will automatically be
set to `true`. It will be automatically set to `false` when it is `undefined` and the
[ZipWriterConstructorOptions#bufferedWrite](ZipWriterConstructorOptions.md#bufferedwrite) option is set to `true`, or when the
[ZipWriterConstructorOptions#zipCrypto](ZipWriterConstructorOptions.md#zipcrypto) option is set to `true`. Otherwise, the default value is `true`.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`dataDescriptor`](ZipWriterConstructorOptions.md#datadescriptor)

***

### dataDescriptorSignature?

> `optional` **dataDescriptorSignature?**: `boolean`

Defined in: [index.d.ts:1692](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1692)

`true` to add the signature of the data descriptor.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`dataDescriptorSignature`](ZipWriterConstructorOptions.md#datadescriptorsignature)

***

### encrypted?

> `optional` **encrypted?**: `boolean`

Defined in: [index.d.ts:1777](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1777)

`true` to write encrypted data when `passThrough` is set to `true`.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`encrypted`](ZipWriterConstructorOptions.md#encrypted)

***

### encryptionStrength?

> `optional` **encryptionStrength?**: `2` \| `1` \| `3`

Defined in: [index.d.ts:1615](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1615)

The encryption strength (AES):
- 1: 128-bit encryption key
- 2: 192-bit encryption key
- 3: 256-bit encryption key

#### Default Value

```ts
3
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`encryptionStrength`](ZipWriterConstructorOptions.md#encryptionstrength)

***

### extendedTimestamp?

> `optional` **extendedTimestamp?**: `boolean`

Defined in: [index.d.ts:1649](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1649)

`true` to store extended timestamp extra fields.

When set to `false`, the maximum last modification date cannot exceed November 31, 2107 and the maximum accuracy is 2 seconds.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`extendedTimestamp`](ZipWriterConstructorOptions.md#extendedtimestamp)

***

### externalFileAttributes?

> `optional` **externalFileAttributes?**: `number`

Defined in: [index.d.ts:1704](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1704)

The external file attribute.

#### Default Value

```ts
0
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`externalFileAttributes`](ZipWriterConstructorOptions.md#externalfileattributes)

***

### gid?

> `optional` **gid?**: `number`

Defined in: [index.d.ts:1712](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1712)

The Unix group id to write in the Unix extra field or as part of the external attributes.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`gid`](ZipWriterConstructorOptions.md#gid)

***

### internalFileAttributes?

> `optional` **internalFileAttributes?**: `number`

Defined in: [index.d.ts:1742](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1742)

The internal file attribute.

#### Default Value

```ts
0
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`internalFileAttributes`](ZipWriterConstructorOptions.md#internalfileattributes)

***

### keepOrder?

> `optional` **keepOrder?**: `boolean`

Defined in: [index.d.ts:1598](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1598)

`true` to keep the order of the entry physically in the zip file.

When set to `true`, the use of web workers will be improved.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`keepOrder`](ZipWriterConstructorOptions.md#keeporder)

***

### lastAccessDate?

> `optional` **lastAccessDate?**: `Date`

Defined in: [index.d.ts:1633](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1633)

The last access date.

This option is ignored if the [ZipWriterConstructorOptions#extendedTimestamp](ZipWriterConstructorOptions.md#extendedtimestamp) option is set to `false`.

#### Default Value

```ts
The current date.
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`lastAccessDate`](ZipWriterConstructorOptions.md#lastaccessdate)

***

### lastModDate?

> `optional` **lastModDate?**: `Date`

Defined in: [index.d.ts:1625](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1625)

The last modification date.

#### Default Value

```ts
The current date.
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`lastModDate`](ZipWriterConstructorOptions.md#lastmoddate)

***

### level?

> `optional` **level?**: `number`

Defined in: [index.d.ts:1572](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1572)

The level of compression.

The minimum value is 0 and means that no compression is applied. The maximum value is 9.

#### Default Value

```ts
6
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`level`](ZipWriterConstructorOptions.md#level)

***

### mimeType?

> `optional` **mimeType?**: `string`

Defined in: [index.d.ts:2316](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L2316)

The MIME type of the exported data when relevant.

***

### msdosAttributes?

> `optional` **msdosAttributes?**: `object`

Defined in: [index.d.ts:1751](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1751)

When provided, MS-DOS attribute flags (boolean object) to write into external file attributes low byte.

#### archive?

> `optional` **archive?**: `boolean`

#### directory?

> `optional` **directory?**: `boolean`

#### hidden?

> `optional` **hidden?**: `boolean`

#### readOnly?

> `optional` **readOnly?**: `boolean`

#### system?

> `optional` **system?**: `boolean`

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`msdosAttributes`](ZipWriterConstructorOptions.md#msdosattributes)

***

### msdosAttributesRaw?

> `optional` **msdosAttributesRaw?**: `number`

Defined in: [index.d.ts:1747](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1747)

When provided, the low 8-bit MS-DOS attributes to write into external file attributes.
Must be an integer between 0 and 255.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`msdosAttributesRaw`](ZipWriterConstructorOptions.md#msdosattributesraw)

***

### msDosCompatible?

> `optional` **msDosCompatible?**: `boolean`

Defined in: [index.d.ts:1698](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1698)

`true` to write [EntryMetaData#externalFileAttributes](EntryMetaData.md#externalfileattributes) in MS-DOS format for folder entries.

#### Default Value

```ts
false
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`msDosCompatible`](ZipWriterConstructorOptions.md#msdoscompatible)

***

### offset?

> `optional` **offset?**: `number`

Defined in: [index.d.ts:1781](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1781)

The offset of the first entry in the zip file.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`offset`](ZipWriterConstructorOptions.md#offset)

***

### passThrough?

> `optional` **passThrough?**: `boolean`

Defined in: [index.d.ts:1773](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1773)

`true` to write the data as-is without compressing it and without crypting it.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`passThrough`](ZipWriterConstructorOptions.md#passthrough)

***

### password?

> `optional` **password?**: `string`

Defined in: [index.d.ts:1602](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1602)

The password used to encrypt the content of the entry.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`password`](ZipWriterConstructorOptions.md#password)

***

### preventClose?

> `optional` **preventClose?**: `boolean`

Defined in: [index.d.ts:1564](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1564)

`true` to prevent closing of [WritableWriter#writable](WritableWriter.md#writable).

#### Default Value

```ts
false
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`preventClose`](ZipWriterConstructorOptions.md#preventclose)

***

### rawPassword?

> `optional` **rawPassword?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.d.ts:1606](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1606)

The password used to encrypt the content of the entry (raw).

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`rawPassword`](ZipWriterConstructorOptions.md#rawpassword)

***

### readerOptions?

> `optional` **readerOptions?**: [`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md)

Defined in: [index.d.ts:2320](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L2320)

The options passed to the Reader instances

***

### relativePath?

> `optional` **relativePath?**: `boolean`

Defined in: [index.d.ts:2312](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L2312)

`true` to use filenames relative to the entry instead of full filenames.

***

### setgid?

> `optional` **setgid?**: `boolean`

Defined in: [index.d.ts:1724](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1724)

`true` to set the setgid bit when writing the Unix mode.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`setgid`](ZipWriterConstructorOptions.md#setgid)

***

### setuid?

> `optional` **setuid?**: `boolean`

Defined in: [index.d.ts:1720](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1720)

`true` to set the setuid bit when writing the Unix mode.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`setuid`](ZipWriterConstructorOptions.md#setuid)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [index.d.ts:1619](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1619)

The `AbortSignal` instance used to cancel the compression.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`signal`](ZipWriterConstructorOptions.md#signal)

***

### sticky?

> `optional` **sticky?**: `boolean`

Defined in: [index.d.ts:1728](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1728)

`true` to set the sticky bit when writing the Unix mode.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`sticky`](ZipWriterConstructorOptions.md#sticky)

***

### supportZip64SplitFile?

> `optional` **supportZip64SplitFile?**: `boolean`

Defined in: [index.d.ts:1763](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1763)

`false` to never write disk numbers in zip64 data.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`supportZip64SplitFile`](ZipWriterConstructorOptions.md#supportzip64splitfile)

***

### transferStreams?

> `optional` **transferStreams?**: `boolean`

Defined in: [index.d.ts:309](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L309)

`true` to transfer stream ownership to web workers.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`transferStreams`](ZipWriterConstructorOptions.md#transferstreams)

***

### uid?

> `optional` **uid?**: `number`

Defined in: [index.d.ts:1708](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1708)

The Unix owner id to write in the Unix extra field or as part of the external attributes.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`uid`](ZipWriterConstructorOptions.md#uid)

***

### unixExtraFieldType?

> `optional` **unixExtraFieldType?**: `"infozip"` \| `"unix"`

Defined in: [index.d.ts:1736](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1736)

Which Unix extra field format to write when creating entries that include Unix metadata.
- "infozip": Info-ZIP New Unix extra field (0x7875), storing variable-length uid/gid up to 32 bits.
- "unix": Info-ZIP Unix extra field type 2 (0x7855), storing fixed 2-byte uid/gid (0..65535); a
  larger uid or gid is rejected. The Unix mode is not part of this field; it is written to the
  external file attributes.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`unixExtraFieldType`](ZipWriterConstructorOptions.md#unixextrafieldtype)

***

### unixMode?

> `optional` **unixMode?**: `number`

Defined in: [index.d.ts:1716](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1716)

The Unix mode (st_mode bits) to use when writing external attributes.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`unixMode`](ZipWriterConstructorOptions.md#unixmode)

***

### usdz?

> `optional` **usdz?**: `boolean`

Defined in: [index.d.ts:1769](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1769)

`true`to produce zip files compatible with the USDZ specification.

#### Default Value

```ts
false
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`usdz`](ZipWriterConstructorOptions.md#usdz)

***

### useCompressionStream?

> `optional` **useCompressionStream?**: `boolean`

Defined in: [index.d.ts:303](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L303)

`true` to use the native API `CompressionStream`/`DecompressionStream` to compress/decompress data.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`useCompressionStream`](ZipWriterConstructorOptions.md#usecompressionstream)

***

### useUnicodeFileNames?

> `optional` **useUnicodeFileNames?**: `boolean`

Defined in: [index.d.ts:1677](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1677)

`true` to mark the file names as UTF-8 setting the general purpose bit 11 in the header (see Appendix D -
Language Encoding (EFS)), `false` to mark the names as compliant with the original IBM Code Page 437.

Note that this does not ensure that the file names are in the correct encoding.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`useUnicodeFileNames`](ZipWriterConstructorOptions.md#useunicodefilenames)

***

### useWebWorkers?

> `optional` **useWebWorkers?**: `boolean`

Defined in: [index.d.ts:297](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L297)

`true` to use web workers to compress/decompress data in non-blocking background processes.

#### Default Value

```ts
true
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`useWebWorkers`](ZipWriterConstructorOptions.md#usewebworkers)

***

### version?

> `optional` **version?**: `number`

Defined in: [index.d.ts:1662](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1662)

The "Version" field.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`version`](ZipWriterConstructorOptions.md#version)

***

### versionMadeBy?

> `optional` **versionMadeBy?**: `number`

Defined in: [index.d.ts:1668](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1668)

The "Version made by" field.

#### Default Value

```ts
20
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`versionMadeBy`](ZipWriterConstructorOptions.md#versionmadeby)

***

### zip64?

> `optional` **zip64?**: `boolean`

Defined in: [index.d.ts:1558](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1558)

`true` to use Zip64 to store the entry.

`zip64` is automatically set to `true` when necessary (e.g. compressed data larger than 4GB or with unknown size).

#### Default Value

```ts
false
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`zip64`](ZipWriterConstructorOptions.md#zip64)

***

### zipCrypto?

> `optional` **zipCrypto?**: `boolean`

Defined in: [index.d.ts:1658](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1658)

`true` to use the ZipCrypto algorithm to encrypt the content of the entry. Setting it to `true` will also
set the [ZipWriterConstructorOptions#dataDescriptor](ZipWriterConstructorOptions.md#datadescriptor) to `true`.

It is not recommended to set `zipCrypto` to `true` because the ZipCrypto encryption can be easily broken.

#### Default Value

```ts
false
```

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`zipCrypto`](ZipWriterConstructorOptions.md#zipcrypto)

## Methods

### encodeText()?

> `optional` **encodeText**(`text`): `Uint8Array`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [index.d.ts:1792](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1792)

The function called for encoding the filename and the comment of the entry.

#### Parameters

##### text

`string`

The text to encode.

#### Returns

`Uint8Array`\<`ArrayBufferLike`\> \| `undefined`

The encoded text or `undefined` if the text should be encoded by zip.js.

#### Inherited from

[`ZipWriterConstructorOptions`](ZipWriterConstructorOptions.md).[`encodeText`](ZipWriterConstructorOptions.md#encodetext)

***

### onend()?

> `optional` **onend**(`computedSize`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1820](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1820)

The function called when ending compression/decompression.

#### Parameters

##### computedSize

`number`

The total number of bytes (computed).

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

#### Inherited from

[`EntryDataOnprogressOptions`](EntryDataOnprogressOptions.md).[`onend`](EntryDataOnprogressOptions.md#onend)

***

### onprogress()?

> `optional` **onprogress**(`progress`, `total`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1813](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1813)

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

[`EntryDataOnprogressOptions`](EntryDataOnprogressOptions.md).[`onprogress`](EntryDataOnprogressOptions.md#onprogress)

***

### onstart()?

> `optional` **onstart**(`total`): `void` \| `Promise`\<`void`\>

Defined in: [index.d.ts:1805](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L1805)

The function called when starting compression/decompression.

#### Parameters

##### total

`number`

The total number of bytes.

#### Returns

`void` \| `Promise`\<`void`\>

An empty promise or `undefined`.

#### Inherited from

[`EntryDataOnprogressOptions`](EntryDataOnprogressOptions.md).[`onstart`](EntryDataOnprogressOptions.md#onstart)
