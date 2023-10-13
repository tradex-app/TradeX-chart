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

				const html = updateImageReferences("<p>Guides lead a user through a specific task they want to accomplish, often with a sequence of steps.\nWriting a good guide requires thinking about what your users are trying to do.</p>\n<h2 id=\"chart-title\">Chart Title</h2>\n<p>Change the title displayed top left before OHLCV</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart</span><span style=\"color: #B392F0\">.setTitle(</span><span style=\"color: #FFAB70\">\"New Title\"</span><span style=\"color: #B392F0\">)</span></span></code></pre>\n<h2 id=\"chart-watermark\">Chart Watermark</h2>\n<p>Use a text watermark behind chart content</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart0</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">config</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">watermark</span><span style=\"color: #B392F0\">.text </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">\"abc\"</span></span></code></pre>\n<p>Use an image watermark behind chart content</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart0</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">config</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">watermark</span><span style=\"color: #B392F0\">.imgURL </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">\"./watermark.svg\"</span></span></code></pre>\n<p>This option accepts either:</p>\n<ul>\n<li>an image file URL</li>\n<li>a data<div></div> eg. <code>\"data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==\"</code></li>\n</ul>\n<h2 id=\"further-reading\">Further reading</h2>\n<ul>\n<li>Read <a href=\"https://diataxis.fr/how-to-guides/\">about how-to guides</a> in the Diátaxis framework</li>\n</ul>");

				const frontmatter = {"title":"How To","description":"A list of quick specific tasks."};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/guides/howto.md";
				const url = undefined;
				function rawContent() {
					return "\nGuides lead a user through a specific task they want to accomplish, often with a sequence of steps.\nWriting a good guide requires thinking about what your users are trying to do.\n\n## Chart Title\n\nChange the title displayed top left before OHLCV\n\n```javascript\nchart.setTitle(\"New Title\")\n```\n\n## Chart Watermark\n\nUse a text watermark behind chart content\n\n```javascript\nchart0.config.watermark.text = \"abc\"\n```\n\nUse an image watermark behind chart content\n\n```javascript\nchart0.config.watermark.imgURL = \"./watermark.svg\"\n```\nThis option accepts either:\n\n* an image file URL\n* a data:URL eg. ``\"data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==\"``\n\n## Further reading\n\n- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"chart-title","text":"Chart Title"},{"depth":2,"slug":"chart-watermark","text":"Chart Watermark"},{"depth":2,"slug":"further-reading","text":"Further reading"}];
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
