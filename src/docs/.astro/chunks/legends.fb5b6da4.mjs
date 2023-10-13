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

				const html = updateImageReferences("<p>Each Chart Pane and Indicator has a legend. It is also possible (TODO:) to add a legend to an Overlay.\nLegends display information provided by their host component.\nThey also allow modification of their host component via the chart GUI.</p>\n<p>The legend control icons become visible when hovering over the legend with pointer.</p>\n<p>TODO: Config options to modify legends</p>\n<p>TODO: API functions that allow modification of the legend</p>\n<h1 id=\"chart-legends\">Chart Legends</h1>\n<ul>\n<li>Re-order move pane up</li>\n<li>Re-order move pane down</li>\n<li>Collapse expand</li>\n<li>Maximize restore</li>\n<li>Remove</li>\n<li>Config</li>\n</ul>\n<h1 id=\"indicator-legends\">Indicator Legends</h1>\n<ul>\n<li>Re-order move indicator up in stacking order</li>\n<li>Re-order move indicator down in stacking order</li>\n<li>Visibility</li>\n<li>Remove</li>\n<li>Config</li>\n</ul>");

				const frontmatter = {"title":"Legends","description":"Legends for Chart Panes, Indicators and Overlays"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/legends.md";
				const url = undefined;
				function rawContent() {
					return "Each Chart Pane and Indicator has a legend. It is also possible (TODO:) to add a legend to an Overlay. \nLegends display information provided by their host component. \nThey also allow modification of their host component via the chart GUI.\n\nThe legend control icons become visible when hovering over the legend with pointer.\n\nTODO: Config options to modify legends\n\nTODO: API functions that allow modification of the legend\n\n# Chart Legends\n\n* Re-order move pane up\n* Re-order move pane down\n* Collapse expand\n* Maximize restore\n* Remove\n* Config\n\n# Indicator Legends\n\n* Re-order move indicator up in stacking order\n* Re-order move indicator down in stacking order\n* Visibility\n* Remove\n* Config\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"chart-legends","text":"Chart Legends"},{"depth":1,"slug":"indicator-legends","text":"Indicator Legends"}];
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
