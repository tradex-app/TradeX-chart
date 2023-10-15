import { i as createVNode, F as Fragment, s as spreadAttributes } from './astro.8a1fcc00.mjs';
import '@astrojs/internal-helpers/path';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './pages/404.astro.3b1f3a71.mjs';
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

				const html = updateImageReferences("<h2 id=\"get-tradex-chart\">Get TradeX Chart</h2>\n<p>TradeX Chart supports multiple download methods, you can get it through package management tools such as <code>npm</code>, <code>yarn</code>, or <code>CDN</code>.</p>\n<h3 id=\"npm\">npm</h3>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #B392F0\">npm </span><span style=\"color: #9DB1C5\">install</span><span style=\"color: #B392F0\"> </span><span style=\"color: #9DB1C5\">tradex-chart</span><span style=\"color: #B392F0\"> </span><span style=\"color: #9DB1C5\">--save</span></span></code></pre>\n<h3 id=\"yarn\">yarn</h3>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #B392F0\">yarn </span><span style=\"color: #9DB1C5\">add</span><span style=\"color: #B392F0\"> </span><span style=\"color: #9DB1C5\">tradex-chart</span></span></code></pre>\n<h3 id=\"cdn\">CDN</h3>\n<p>You can use <code>jsDelivr</code>, <code>unpkg</code> or others.</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #6B737C\">&#x3C;!-- jsdelivr --></span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">&#x3C;</span><span style=\"color: #FFAB70\">script</span><span style=\"color: #B392F0\"> src</span><span style=\"color: #F97583\">=</span><span style=\"color: #FFAB70\">\"https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js\"</span><span style=\"color: #B392F0\">>&#x3C;/</span><span style=\"color: #FFAB70\">script</span><span style=\"color: #B392F0\">></span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #6B737C\">&#x3C;!-- unpkg --></span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">&#x3C;</span><span style=\"color: #FFAB70\">script</span><span style=\"color: #B392F0\"> src</span><span style=\"color: #F97583\">=</span><span style=\"color: #FFAB70\">\" https://cdn.jsdelivr.net/npm/tradex-chart@0.128.1/dist/tradex-chart.umd.min.js \"</span><span style=\"color: #B392F0\">>&#x3C;/</span><span style=\"color: #FFAB70\">script</span><span style=\"color: #B392F0\">></span></span></code></pre>\n<h2 id=\"step-1--creating-the-chart\">Step 1.  Creating the Chart</h2>\n<p>TradeX Chart is a custom HTML element. It must be created and inserted into the DOM.</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #F97583\">import</span><span style=\"color: #B392F0\"> { Chart } </span><span style=\"color: #F97583\">from</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">'tradex-chart'</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #6B737C\">// Create an empty chart and insert it into the DOM</span></span>\n<span class=\"line\"><span style=\"color: #F97583\">let</span><span style=\"color: #B392F0\"> chart </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">document</span><span style=\"color: #B392F0\">.createElement(</span><span style=\"color: #FFAB70\">\"tradex-chart\"</span><span style=\"color: #B392F0\">)</span></span>\n<span class=\"line\"><span style=\"color: #F97583\">let</span><span style=\"color: #B392F0\"> mount </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">document</span><span style=\"color: #B392F0\">.getElementByID(</span><span style=\"color: #FFAB70\">\"#mount\"</span><span style=\"color: #B392F0\">)</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">mount</span><span style=\"color: #B392F0\">.appendChild(chart)</span></span></code></pre>\n<h2 id=\"step-2--configure-and-start-the-chart\">Step 2.  Configure and Start the Chart</h2>\n<p>After the chart has mounted on the DOM, start it with a configuration object.</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart</span><span style=\"color: #B392F0\">.start(config)</span></span></code></pre>\n<p>Without a configuration, the chart won’t do anything useful, so you need define a few things. The <a href=\"../02_configuration\">Configuration</a> documentation will explain what options are available.</p>");

				const frontmatter = {"title":"Getting Started","description":"How to set up and use TradeX Chart"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/01_getting_started.md";
				const url = undefined;
				function rawContent() {
					return "\n## Get TradeX Chart\n\nTradeX Chart supports multiple download methods, you can get it through package management tools such as ``npm``, ``yarn``, or ``CDN``.\n\n### npm\n```bash\nnpm install tradex-chart --save\n```\n### yarn\n```bash\nyarn add tradex-chart\n```\n\n### CDN\nYou can use `jsDelivr`, `unpkg` or others.\n```html\n<!-- jsdelivr -->\n<script src=\"https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js\"></script>\n\n<!-- unpkg -->\n<script src=\" https://cdn.jsdelivr.net/npm/tradex-chart@0.128.1/dist/tradex-chart.umd.min.js \"></script>\n```\n\n## Step 1.  Creating the Chart\n\nTradeX Chart is a custom HTML element. It must be created and inserted into the DOM.\n\n```javascript\nimport { Chart } from 'tradex-chart'\n\n// Create an empty chart and insert it into the DOM\nlet chart = document.createElement(\"tradex-chart\")\nlet mount = document.getElementByID(\"#mount\")\n    mount.appendChild(chart)\n```\n\n## Step 2.  Configure and Start the Chart\n\nAfter the chart has mounted on the DOM, start it with a configuration object.\n\n```javascript\nchart.start(config)\n```\n\nWithout a configuration, the chart won't do anything useful, so you need define a few things. The [Configuration](../02_configuration) documentation will explain what options are available.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"get-tradex-chart","text":"Get TradeX Chart"},{"depth":3,"slug":"npm","text":"npm"},{"depth":3,"slug":"yarn","text":"yarn"},{"depth":3,"slug":"cdn","text":"CDN"},{"depth":2,"slug":"step-1--creating-the-chart","text":"Step 1.  Creating the Chart"},{"depth":2,"slug":"step-2--configure-and-start-the-chart","text":"Step 2.  Configure and Start the Chart"}];
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
