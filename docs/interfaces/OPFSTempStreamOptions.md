[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / OPFSTempStreamOptions

# Interface: OPFSTempStreamOptions

Defined in: [index.d.ts:351](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L351)

Options for [createOPFSTempStream](../functions/createOPFSTempStream.md).

## Properties

### directoryName?

> `optional` **directoryName?**: `string`

Defined in: [index.d.ts:363](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L363)

Name of the OPFS sub-directory holding the temporary files.

#### Default Value

```ts
".zip.js-temp"
```

***

### getDirectory?

> `optional` **getDirectory?**: () => `FileSystemDirectoryHandle` \| `Promise`\<`FileSystemDirectoryHandle`\>

Defined in: [index.d.ts:369](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L369)

Returns (or resolves to) the root `FileSystemDirectoryHandle`. Defaults to `navigator.storage.getDirectory()`.

Provide it to run inside a worker with a pre-obtained handle, or to test against a mock.

#### Returns

`FileSystemDirectoryHandle` \| `Promise`\<`FileSystemDirectoryHandle`\>

***

### thresholdBytes?

> `optional` **thresholdBytes?**: `number`

Defined in: [index.d.ts:357](https://github.com/gildas-lormeau/zip.js/blob/035705c5459fc1f25930826ed97791164f0700af/index.d.ts#L357)

Spill a buffered entry to a file once its buffered data exceeds this size, in bytes. Smaller entries stay in memory.

#### Default Value

```ts
1048576
```
