[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / HttpOptions

# Interface: HttpOptions

Defined in: [index.d.ts:531](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L531)

Represents the options passed to the constructor of [HttpReader](../classes/HttpReader.md).

## Extends

- [`HttpRangeOptions`](HttpRangeOptions.md)

## Extended by

- [`ZipDirectoryEntryImportHttpOptions`](ZipDirectoryEntryImportHttpOptions.md)

## Properties

### combineSizeEocd?

> `optional` **combineSizeEocd?**: `boolean`

Defined in: [index.d.ts:556](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L556)

`true` to use `Range: bytes=-22` on the first request and cache the EOCD, make sure beforehand that the server supports a suffix range request.

#### Default Value

```ts
false
```

***

### forceRangeRequests?

> `optional` **forceRangeRequests?**: `boolean`

Defined in: [index.d.ts:543](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L543)

`true` to always use `Range` headers when fetching data.

#### Default Value

```ts
false
```

***

### headers?

> `optional` **headers?**: `Iterable`\<\[`string`, `string`\], `any`, `any`\> \| `Map`\<`string`, `string`\>

Defined in: [index.d.ts:580](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L580)

The HTTP headers.

#### Inherited from

[`HttpRangeOptions`](HttpRangeOptions.md).[`headers`](HttpRangeOptions.md#headers)

***

### preventHeadRequest?

> `optional` **preventHeadRequest?**: `boolean`

Defined in: [index.d.ts:550](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L550)

`true` to prevent using `HEAD` HTTP request in order the get the size of the content.
`false` to explicitly use `HEAD`, this is useful in case of CORS where `Access-Control-Expose-Headers: Content-Range` is not returned by the server.

#### Default Value

```ts
false
```

***

### useRangeHeader?

> `optional` **useRangeHeader?**: `boolean`

Defined in: [index.d.ts:537](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L537)

`true` to use `Range` headers when fetching data from servers returning `Accept-Ranges` headers.

#### Default Value

```ts
false
```

***

### useXHR?

> `optional` **useXHR?**: `boolean`

Defined in: [index.d.ts:568](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L568)

`true` to rely `XMLHttpRequest` instead of `fetch` to fetch data.

#### Default Value

```ts
false
```

#### Inherited from

[`HttpRangeOptions`](HttpRangeOptions.md).[`useXHR`](HttpRangeOptions.md#usexhr)

## Methods

### fetch()?

> `optional` **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [index.d.ts:576](https://github.com/gildas-lormeau/zip.js/blob/e5781a79ff06ae1a02698642150807a30282543c/index.d.ts#L576)

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

[`HttpRangeOptions`](HttpRangeOptions.md).[`fetch`](HttpRangeOptions.md#fetch)
