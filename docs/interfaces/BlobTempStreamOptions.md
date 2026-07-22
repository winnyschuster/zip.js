[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / BlobTempStreamOptions

# Interface: BlobTempStreamOptions

Defined in: [index.d.ts:387](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L387)

Options for [createBlobTempStream](../functions/createBlobTempStream.md).

## Properties

### thresholdBytes?

> `optional` **thresholdBytes?**: `number`

Defined in: [index.d.ts:393](https://github.com/gildas-lormeau/zip.js/blob/ae37f1a6c766aac973c08b8689ebda97872e7dd2/index.d.ts#L393)

Spill a buffered entry to a `Blob` once its buffered data exceeds this size, in bytes. Smaller entries stay in memory.

#### Default Value

```ts
1048576
```
