import { i as createVNode, F as Fragment, s as spreadAttributes } from './astro.7b6fbd1f.mjs';
import '@astrojs/internal-helpers/path';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './pages/404.astro.1d69ba63.mjs';
import 'html-escaper';
import 'fs';
import 'path';
/* empty css                        */import 'zod';
/* empty css                                                             */import 'execa';

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>TradeX provides an API for the implementation of Web Workers and promises to run sync heavy functions in a worker (process) and get the result in a promise.</p>\n<p>Currently the API only makes provision for inline Web Workers, which means a function has to be passed to the <code>WebWorker.create()</code> static method, either as a defined function object or as text (JavaScript source code).</p>\n<p><code>WebWorker.create()</code> returns an instance.</p>\n<p>Data can then be passed to the worker via <code>worker.postMessage()</code>. Workers accept data of the JavaScript types listed in the <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm\">MDN documentation</a>.</p>\n<p><code>worker.postMessage()</code> returns a promise which when resolved will contain the result from the Web Worker.</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #F97583\">function</span><span style=\"color: #B392F0\"> doSomething(x) { </span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #F97583\">return</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">`I did something. </span><span style=\"color: #F97583\">${</span><span style=\"color: #B392F0\">x</span><span style=\"color: #F97583\">}</span><span style=\"color: #FFAB70\">`</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #F97583\">const</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">test</span><span style=\"color: #B392F0\"> </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">WebWorker</span><span style=\"color: #B392F0\">.create(doSomethingStr)</span></span>\n<span class=\"line\"><span style=\"color: #F97583\">const</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">result</span><span style=\"color: #B392F0\"> </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #F97583\">await</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">test</span><span style=\"color: #B392F0\">.postMessage(</span><span style=\"color: #FFAB70\">\"bla\"</span><span style=\"color: #B392F0\">)</span></span>\n<span class=\"line\"><span style=\"color: #79B8FF\">console</span><span style=\"color: #B392F0\">.log(result)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #6B737C\">// or </span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79B8FF\">test</span><span style=\"color: #B392F0\">.postMessage(</span><span style=\"color: #FFAB70\">\"bla\"</span><span style=\"color: #B392F0\">)</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">.then(r </span><span style=\"color: #F97583\">=></span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">console</span><span style=\"color: #B392F0\">.log(r))</span></span></code></pre>");

				const frontmatter = {"title":"Web Workers","description":"Web workers for parallel processing of functions"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/web_workers.md";
				const url = undefined;
				function rawContent() {
					return "\nTradeX provides an API for the implementation of Web Workers and promises to run sync heavy functions in a worker (process) and get the result in a promise.\n\nCurrently the API only makes provision for inline Web Workers, which means a function has to be passed to the ``WebWorker.create()`` static method, either as a defined function object or as text (JavaScript source code).\n\n``WebWorker.create()`` returns an instance.\n\nData can then be passed to the worker via ``worker.postMessage()``. Workers accept data of the JavaScript types listed in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).\n\n``worker.postMessage()`` returns a promise which when resolved will contain the result from the Web Worker.\n\n```javascript\nfunction doSomething(x) { \n  return `I did something. ${x}`\n}\n\nconst test = WebWorker.create(doSomethingStr)\nconst result = await test.postMessage(\"bla\")\nconsole.log(result)\n\n// or \n\ntest.postMessage(\"bla\")\n.then(r => console.log(r))\n```\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
