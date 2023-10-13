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

				const html = updateImageReferences("<p>Reference pages are ideal for outlining how things work in terse and clear terms.\nLess concerned with telling a story or addressing a specific use case, they should give a comprehensive outline of what your documenting.</p>\n<h2 id=\"further-reading\">Further reading</h2>\n<ul>\n<li>Read <a href=\"https://diataxis.fr/reference/\">about reference</a> in the Diátaxis framework</li>\n</ul>");

				const frontmatter = {"title":"Example Reference","description":"A reference page in my new Starlight docs site."};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/example.md";
				const url = undefined;
				function rawContent() {
					return "\nReference pages are ideal for outlining how things work in terse and clear terms.\nLess concerned with telling a story or addressing a specific use case, they should give a comprehensive outline of what your documenting.\n\n## Further reading\n\n- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"further-reading","text":"Further reading"}];
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
