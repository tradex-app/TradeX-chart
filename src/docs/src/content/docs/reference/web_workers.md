---
title: "Web Workers"
description: "Web workers for parallel processing of functions"
---

TradeX provides an API for the implementation of Web Workers and promises to run sync heavy functions in a worker (process) and get the result in a promise.

Currently the API only makes provision for inline Web Workers, which means a function has to be passed to the ``WebWorker.create()`` static method, either as a defined function object or as text (JavaScript source code).

``WebWorker.create()`` returns an instance.

Data can then be passed to the worker via ``worker.postMessage()``. Workers accept data of the JavaScript types listed in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).

``worker.postMessage()`` returns a promise which when resolved will contain the result from the Web Worker.

```javascript
function doSomething(x) { 
  return `I did something. ${x}`
}

const test = WebWorker.create(doSomethingStr)
const result = await test.postMessage("bla")
console.log(result)

// or 

test.postMessage("bla")
.then(r => console.log(r))
```
