https://stackoverflow.com/a/51473757/15109215

Yes, you are correct, in order to inline wasm modules and avoid the HTTP request, you'll have to perform some sort of encoding. I'd recommend using Base64 encoded strings as they are the most compact form.

You can encode as follows:
```javascript
const readFileSync = require('fs').readFileSync;

const wasmCode = readFileSync(id);
const encoded = Buffer.from(wasmCode, 'binary').toString('base64');
```
You can then load the module as follows:
```javascript
    var encoded = "... contents of encoded from above ...";

    function asciiToBinary(str) {
      if (typeof atob === 'function') {
        // this works in the browser
        return atob(str)
      } else {
        // this works in node
        return new Buffer(str, 'base64').toString('binary');
      }
    }

    function decode(encoded) {
      var binaryString =  asciiToBinary(encoded);
      var bytes = new Uint8Array(binaryString.length);
      for (var i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    var module = WebAssembly.instantiate(decode(encoded), {});
```
# Creating a URL from Binary JavaScript Resource

Create a URL resource from binary data in JavaScript:
**Method 1: Using `URL.createObjectURL()`**

You can create a URL object from a binary blob using the `URL.createObjectURL()` method. This method takes a Blob object as an argument and returns a URL that can be used to reference the blob.

Example:
```javascript
const binaryData = ...; // assume binaryData is a Uint8Array or Blob
const blob = new Blob([binaryData], { type: 'image/png' }); // adjust MIME type as needed
const url = URL.createObjectURL(blob);
```

This URL can be used as the `src` attribute of an <img> element or as a value for a `fetch` or `XMLHttpRequestt` request.
**Method 2: Creating a “data:” URL**

Alternatively, you can create a “data:” URL by encoding the binary data as a base64 string and prefixing it with “data:image/;base64,”.

Example:
```javascript
const binaryData = ...; // assume binaryData is a Uint8Array
const base64String = btoa(String.fromCharCode(...binaryData)); // encode as base64
const url = `data:image/png;base64,${base64String}`;
```

This “data:” URL can be used as a fallback if URL.createObjectURL() is not supported or if you need to store the URL in a string format.

**Additional Considerations**

   * When using URL.createObjectURL(), ensure that the blob is properly created and initialized with the correct MIME type.
   * When creating a “data:” URL, be aware of the limitations on URL length and potential issues with browser support.
   * If you’re working with large binary data, consider using a streaming approach or chunking the data to avoid memory issues.

Remember to adjust the MIME type and encoding as needed for your specific use case.



https://ionic.io/blog/converting-a-base64-string-to-a-blob-in-javascript
