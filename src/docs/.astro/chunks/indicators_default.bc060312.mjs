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

				const html = updateImageReferences("<h1 id=\"currently-implemented-indicators\">Currently implemented indicators</h1>\n<p>More indicators will be implemented. The plan is that the chart will ship with a select few or none, and the bundle of indicators published as an extension to the chart, allowing you to selectively import the indicators that you require, rather than all at once.</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #b392f0\"> </span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    Momentum Indicators</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    -----------------------------------------</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    AROON - Aroon</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    RSI - Relative Strength Index</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    </span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    Overlap Studies</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    -----------------------------------------</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    BBANDS - Bollinger Bands</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    EMA - Exponential Moving Average</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    SMA - Simple Moving Average</span></span>\n<span class=\"line\"><span style=\"color: #b392f0\"></span></span>\n<span class=\"line\"><span style=\"color: #b392f0\">    </span></span></code></pre>");

				const frontmatter = {"title":"Default Indicators"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/indicators_default.md";
				const url = undefined;
				function rawContent() {
					return "\n# Currently implemented indicators\n\nMore indicators will be implemented. The plan is that the chart will ship with a select few or none, and the bundle of indicators published as an extension to the chart, allowing you to selectively import the indicators that you require, rather than all at once.\n\n```\n \n    Momentum Indicators\n    -----------------------------------------\n    AROON - Aroon\n    RSI - Relative Strength Index\n    \n    Overlap Studies\n    -----------------------------------------\n    BBANDS - Bollinger Bands\n    EMA - Exponential Moving Average\n    SMA - Simple Moving Average\n\n    \n```\n\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"currently-implemented-indicators","text":"Currently implemented indicators"}];
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
