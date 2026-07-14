[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / HttpRangeOptions

# Interface: HttpRangeOptions

Defined in: [index.d.ts:558](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L558)

Represents options passed to the constructor of [HttpRangeReader](../classes/HttpRangeReader.md) and [HttpReader](../classes/HttpReader.md).

## Extended by

- [`HttpOptions`](HttpOptions.md)

## Properties

### headers?

> `optional` **headers?**: `Iterable`\<\[`string`, `string`\], `any`, `any`\> \| `Map`\<`string`, `string`\>

Defined in: [index.d.ts:576](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L576)

The HTTP headers.

***

### useXHR?

> `optional` **useXHR?**: `boolean`

Defined in: [index.d.ts:564](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L564)

`true` to rely `XMLHttpRequest` instead of `fetch` to fetch data.

#### Default Value

```ts
false
```

## Methods

### fetch()?

> `optional` **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [index.d.ts:572](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L572)

The function used to fetch the data. It takes precedence over [HttpRangeOptions#useXHR](#usexhr)
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
