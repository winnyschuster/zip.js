[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipDirectoryEntryImportHttpOptions

# Interface: ZipDirectoryEntryImportHttpOptions

Defined in: [index.d.ts:2188](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L2188)

Represents the options passed to [ZipDirectoryEntry#importHttpContent](../classes/ZipDirectoryEntry.md#importhttpcontent).

## Extends

- [`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`HttpOptions`](HttpOptions.md)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`checkAmbiguity`](ZipReaderConstructorOptions.md#checkambiguity)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`checkOverlappingEntry`](ZipReaderConstructorOptions.md#checkoverlappingentry)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`checkOverlappingEntryOnly`](ZipReaderConstructorOptions.md#checkoverlappingentryonly)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`checkPasswordOnly`](ZipReaderConstructorOptions.md#checkpasswordonly)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`checkSignature`](ZipReaderConstructorOptions.md#checksignature)

***

### combineSizeEocd?

> `optional` **combineSizeEocd?**: `boolean`

Defined in: [index.d.ts:498](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L498)

`true` to use `Range: bytes=-22` on the first request and cache the EOCD, make sure beforehand that the server supports a suffix range request.

#### Default Value

```ts
false
```

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`combineSizeEocd`](HttpOptions.md#combinesizeeocd)

***

### commentEncoding?

> `optional` **commentEncoding?**: `string`

Defined in: [index.d.ts:844](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L844)

The encoding of the comment of the entry.

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`commentEncoding`](ZipReaderConstructorOptions.md#commentencoding)

***

### extractAppendedData?

> `optional` **extractAppendedData?**: `boolean`

Defined in: [index.d.ts:823](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L823)

`true` to extract the appended data into [ZipReader#appendedData](../classes/ZipReader.md#appendeddata).

#### Default Value

```ts
false
```

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`extractAppendedData`](ZipReaderConstructorOptions.md#extractappendeddata)

***

### extractPrependedData?

> `optional` **extractPrependedData?**: `boolean`

Defined in: [index.d.ts:817](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L817)

`true` to extract the prepended data into [ZipReader#prependedData](../classes/ZipReader.md#prependeddata).

#### Default Value

```ts
false
```

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`extractPrependedData`](ZipReaderConstructorOptions.md#extractprependeddata)

***

### filenameEncoding?

> `optional` **filenameEncoding?**: `string`

Defined in: [index.d.ts:840](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L840)

The encoding of the filename of the entry.

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`filenameEncoding`](ZipReaderConstructorOptions.md#filenameencoding)

***

### forceRangeRequests?

> `optional` **forceRangeRequests?**: `boolean`

Defined in: [index.d.ts:485](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L485)

`true` to always use `Range` headers when fetching data.

#### Default Value

```ts
false
```

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`forceRangeRequests`](HttpOptions.md#forcerangerequests)

***

### headers?

> `optional` **headers?**: `Iterable`\<\[`string`, `string`\], `any`, `any`\> \| `Map`\<`string`, `string`\>

Defined in: [index.d.ts:522](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L522)

The HTTP headers.

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`headers`](HttpOptions.md#headers)

***

### passThrough?

> `optional` **passThrough?**: `boolean`

Defined in: [index.d.ts:917](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L917)

`true` to read the data as-is without decompressing it and without decrypting it.

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`passThrough`](ZipReaderConstructorOptions.md#passthrough)

***

### password?

> `optional` **password?**: `string`

Defined in: [index.d.ts:913](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L913)

The password used to decrypt the content of the entry.

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`password`](ZipReaderConstructorOptions.md#password)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`preventClose`](ZipReaderConstructorOptions.md#preventclose)

***

### preventHeadRequest?

> `optional` **preventHeadRequest?**: `boolean`

Defined in: [index.d.ts:492](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L492)

`true` to prevent using `HEAD` HTTP request in order the get the size of the content.
`false` to explicitly use `HEAD`, this is useful in case of CORS where `Access-Control-Expose-Headers: Content-Range` is not returned by the server.

#### Default Value

```ts
false
```

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`preventHeadRequest`](HttpOptions.md#preventheadrequest)

***

### rawPassword?

> `optional` **rawPassword?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.d.ts:921](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L921)

The password used to encrypt the content of the entry (raw).

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`rawPassword`](ZipReaderConstructorOptions.md#rawpassword)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [index.d.ts:925](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L925)

The `AbortSignal` instance used to cancel the decompression.

#### Inherited from

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`signal`](ZipReaderConstructorOptions.md#signal)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`transferStreams`](ZipReaderConstructorOptions.md#transferstreams)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`useCompressionStream`](ZipReaderConstructorOptions.md#usecompressionstream)

***

### useRangeHeader?

> `optional` **useRangeHeader?**: `boolean`

Defined in: [index.d.ts:479](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L479)

`true` to use `Range` headers when fetching data from servers returning `Accept-Ranges` headers.

#### Default Value

```ts
false
```

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`useRangeHeader`](HttpOptions.md#userangeheader)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`useWebWorkers`](ZipReaderConstructorOptions.md#usewebworkers)

***

### useXHR?

> `optional` **useXHR?**: `boolean`

Defined in: [index.d.ts:510](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L510)

`true` to rely `XMLHttpRequest` instead of `fetch` to fetch data.

#### Default Value

```ts
false
```

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`useXHR`](HttpOptions.md#usexhr)

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

[`ZipReaderConstructorOptions`](ZipReaderConstructorOptions.md).[`decodeText`](ZipReaderConstructorOptions.md#decodetext)

***

### fetch()?

> `optional` **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [index.d.ts:518](https://github.com/gildas-lormeau/zip.js/blob/9b8df6d764cb40dbf4ab59d093091fe62ec48303/index.d.ts#L518)

The function used to fetch the data. It takes precedence over [HttpRangeOptions#useXHR](HttpRangeOptions.md#usexhr)
when set. The returned object must expose the `status`, `statusText` and `headers` properties,
and the `arrayBuffer()` method of the `Response` class.

#### Parameters

##### input

`string`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Default Value

`fetch`

#### Inherited from

[`HttpOptions`](HttpOptions.md).[`fetch`](HttpOptions.md#fetch)
