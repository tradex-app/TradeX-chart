const id = "reference/web_workers.md";
						const collection = "docs";
						const slug = "reference/web_workers";
						const body = "\nTradeX provides an API for the implementation of Web Workers and promises to run sync heavy functions in a worker (process) and get the result in a promise.\n\nCurrently the API only makes provision for inline Web Workers, which means a function has to be passed to the ``WebWorker.create()`` static method, either as a defined function object or as text (JavaScript source code).\n\n``WebWorker.create()`` returns an instance.\n\nData can then be passed to the worker via ``worker.postMessage()``. Workers accept data of the JavaScript types listed in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).\n\n``worker.postMessage()`` returns a promise which when resolved will contain the result from the Web Worker.\n\n```javascript\nfunction doSomething(x) { \n  return `I did something. ${x}`\n}\n\nconst test = WebWorker.create(doSomethingStr)\nconst result = await test.postMessage(\"bla\")\nconsole.log(result)\n\n// or \n\ntest.postMessage(\"bla\")\n.then(r => console.log(r))\n```\n";
						const data = {title:"Web Workers",description:"Web workers for parallel processing of functions",editUrl:true,head:[],template:"doc"};
						const _internal = {
							type: 'content',
							filePath: "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/web_workers.md",
							rawData: "\ntitle: \"Web Workers\"\ndescription: \"Web workers for parallel processing of functions\"",
						};

export { _internal, body, collection, data, id, slug };
