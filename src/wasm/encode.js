const readFileSync = require('fs').readFileSync;
const writeFileSync = require('fs').writeFileSync;

const wasmCode = readFileSync("talib.wasm");
const encoded = Buffer.from(wasmCode, 'binary').toString('base64');
writeFileSync("wasm.encoded.txt", encoded)

console.log(encoded)
console.log("done")