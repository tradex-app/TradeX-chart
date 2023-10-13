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

				const html = updateImageReferences("<h2 id=\"what-is-tradex-chart\">What is TradeX Chart?</h2>\n<p>TradeX Chart is a highly customizable lightweight financial chart.</p>\n<p>It is open source custom HTML component built in plain JavaScript with no frame work dependencies.</p>\n<aside aria-label=\"Caution\" class=\"starlight-aside starlight-aside--caution\"><p class=\"starlight-aside__title\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"starlight-aside__icon\"><path d=\"M12 16C11.8022 16 11.6089 16.0587 11.4444 16.1686C11.28 16.2784 11.1518 16.4346 11.0761 16.6173C11.0004 16.8001 10.9806 17.0011 11.0192 17.1951C11.0578 17.3891 11.153 17.5673 11.2929 17.7071C11.4327 17.847 11.6109 17.9422 11.8049 17.9808C11.9989 18.0194 12.2 17.9996 12.3827 17.9239C12.5654 17.8482 12.7216 17.72 12.8315 17.5556C12.9413 17.3911 13 17.1978 13 17C13 16.7348 12.8946 16.4805 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16ZM22.67 17.47L14.62 3.47003C14.3598 3.00354 13.9798 2.61498 13.5192 2.3445C13.0586 2.07401 12.5341 1.9314 12 1.9314C11.4659 1.9314 10.9414 2.07401 10.4808 2.3445C10.0202 2.61498 9.64019 3.00354 9.38 3.47003L1.38 17.47C1.11079 17.924 0.966141 18.441 0.960643 18.9688C0.955144 19.4966 1.089 20.0166 1.34868 20.4761C1.60837 20.9356 1.9847 21.3185 2.43968 21.5861C2.89466 21.8536 3.41218 21.9964 3.94 22H20.06C20.5921 22.0053 21.1159 21.8689 21.5779 21.6049C22.0399 21.341 22.4234 20.9589 22.689 20.4978C22.9546 20.0368 23.0928 19.5134 23.0895 18.9814C23.0862 18.4493 22.9414 17.9277 22.67 17.47ZM20.94 19.47C20.8523 19.626 20.7245 19.7556 20.5697 19.8453C20.4149 19.935 20.2389 19.9815 20.06 19.98H3.94C3.76111 19.9815 3.5851 19.935 3.43032 19.8453C3.27553 19.7556 3.14765 19.626 3.06 19.47C2.97223 19.318 2.92602 19.1456 2.92602 18.97C2.92602 18.7945 2.97223 18.622 3.06 18.47L11.06 4.47003C11.1439 4.30623 11.2714 4.16876 11.4284 4.07277C11.5855 3.97678 11.766 3.92599 11.95 3.92599C12.134 3.92599 12.3145 3.97678 12.4716 4.07277C12.6286 4.16876 12.7561 4.30623 12.84 4.47003L20.89 18.47C20.9892 18.6199 21.0462 18.7937 21.055 18.9732C21.0638 19.1527 21.0241 19.3312 20.94 19.49V19.47ZM12 8.00003C11.7348 8.00003 11.4804 8.10538 11.2929 8.29292C11.1054 8.48046 11 8.73481 11 9.00003V13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8947 11.7348 14 12 14C12.2652 14 12.5196 13.8947 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13V9.00003C13 8.73481 12.8946 8.48046 12.7071 8.29292C12.5196 8.10538 12.2652 8.00003 12 8.00003Z\"></path></svg>Caution</p><section class=\"starlight-aside__content\"><p>TradeX Chart is currently in heavy development, with the API not yet finalized. However, it is already suitable for displaying candlestick / time-series data.</p></section></aside>\n<h2 id=\"features\">Features</h2>\n<ul>\n<li>Lightweight and smooth with one dependency</li>\n<li>Framework independent, thus future proofing the chart</li>\n<li>API that is logical and organized, making it easy to use</li>\n<li>Built-in indicators</li>\n<li>Custom indicators - build your own</li>\n<li>Highly customizable and extensible\n<ul>\n<li>Themes - style everything in the chart, make it a native part of your app</li>\n<li>Functionality - subscribe and respond to the chart’s internal events</li>\n<li>Add the features you desire</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"where-to-download-tradex-chart\">Where to Download TradeX Chart</h2>\n<p>TradeX Chart is available via <a href=\"https://www.npmjs.com/package/tradex-chart\">NPM</a> and <a href=\"https://github.com/tradex-app/TradeX-chart\">GitHub</a>.</p>\n<h2 id=\"versioning\">Versioning</h2>\n<p>TradeXChart follows [breaking].[feature].[fix] <a href=\"https://semver.org/\">Semantic Versioning</a></p>\n<p>eg. 0.100.6</p>");

				const frontmatter = {"title":"Introduction"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/index.md";
				const url = undefined;
				function rawContent() {
					return "\n## What is TradeX Chart?\n\nTradeX Chart is a highly customizable lightweight financial chart.\n\nIt is open source custom HTML component built in plain JavaScript with no frame work dependencies.\n\n:::caution\nTradeX Chart is currently in heavy development, with the API not yet finalized. However, it is already suitable for displaying candlestick / time-series data.\n:::\n\n## Features\n\n* Lightweight and smooth with one dependency\n* Framework independent, thus future proofing the chart\n* API that is logical and organized, making it easy to use\n* Built-in indicators\n* Custom indicators - build your own\n* Highly customizable and extensible\n  * Themes - style everything in the chart, make it a native part of your app\n  * Functionality - subscribe and respond to the chart's internal events\n  * Add the features you desire\n\n## Where to Download TradeX Chart\n\nTradeX Chart is available via [NPM](https://www.npmjs.com/package/tradex-chart) and [GitHub](https://github.com/tradex-app/TradeX-chart).\n\n## Versioning\n\nTradeXChart follows [breaking].[feature].[fix] [Semantic Versioning](https://semver.org/)\n\neg. 0.100.6\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"what-is-tradex-chart","text":"What is TradeX Chart?"},{"depth":2,"slug":"features","text":"Features"},{"depth":2,"slug":"where-to-download-tradex-chart","text":"Where to Download TradeX Chart"},{"depth":2,"slug":"versioning","text":"Versioning"}];
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
