import { A as AstroError, f as AstroErrorData, i as createVNode, F as Fragment, s as spreadAttributes } from './astro.7b6fbd1f.mjs';
import { g as getImage } from './pages/404.astro.1d69ba63.mjs';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'fs';
import 'node:fs/promises';
import 'node:url';
import 'node:fs';
import 'node:path';
import 'slash';
import 'path';
/* empty css                        */import 'zod';
/* empty css                                                             */import 'execa';

const images = {
					'../../../assets/notes-01.png': await getImageSafely((await import('./notes-01.258ef9b3.mjs')).default, "../../../assets/notes-01.png", "/src/assets/notes-01.png"),'../../../assets/notes-02.png': await getImageSafely((await import('./notes-02.de433170.mjs')).default, "../../../assets/notes-02.png", "/src/assets/notes-02.png")
				};

				async function getImageSafely(imageSrc, imagePath, resolvedImagePath) {
					if (!imageSrc) {
						throw new AstroError({
							...AstroErrorData.MarkdownImageNotFound,
							message: AstroErrorData.MarkdownImageNotFound.message(
								imagePath,
								resolvedImagePath
							),
							location: { file: "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/annotations.md" },
						});
					}

					return await getImage({src: imageSrc})
				}

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>Annotations overlay is still in concept and planning stage. Feedback is welcome via <a href=\"https://discord.com/invite/XnfZudwpfg\">Discord</a> or <a href=\"https://github.com/tradex-app/TradeX-chart/discussions/categories/general\">GitHub</a>.</p>\n<p><img alt=\"annotation\" __ASTRO_IMAGE_=\"../../../assets/notes-01.png\"></p>\n<p><img alt=\"annotation\" __ASTRO_IMAGE_=\"../../../assets/notes-02.png\"></p>");

				const frontmatter = {"title":"Annotations","description":"Add annotations to the chart"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/annotations.md";
				const url = undefined;
				function rawContent() {
					return "\nAnnotations overlay is still in concept and planning stage. Feedback is welcome via [Discord](https://discord.com/invite/XnfZudwpfg) or [GitHub](https://github.com/tradex-app/TradeX-chart/discussions/categories/general).\n\n![annotation](../../../assets/notes-01.png)\n\n![annotation](../../../assets/notes-02.png)\n";
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
