[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / HttpRangeOptions

# Interface: HttpRangeOptions

Defined in: [index.d.ts:504](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L504)

Represents options passed to the constructor of [HttpRangeReader](../classes/HttpRangeReader.md) and [HttpReader](../classes/HttpReader.md).

## Extended by

- [`HttpOptions`](HttpOptions.md)

## Properties

### headers?

> `optional` **headers?**: `Iterable`\<\[`string`, `string`\], `any`, `any`\> \| `Map`\<`string`, `string`\>

Defined in: [index.d.ts:522](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L522)

The HTTP headers.

***

### useXHR?

> `optional` **useXHR?**: `boolean`

Defined in: [index.d.ts:510](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L510)

`true` to rely `XMLHttpRequest` instead of `fetch` to fetch data.

#### Default Value

```ts
false
```

## Methods

### fetch()?

> `optional` **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [index.d.ts:518](https://github.com/gildas-lormeau/zip.js/blob/65178e72a3d88c674dd7152f80ef791465744538/index.d.ts#L518)

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
