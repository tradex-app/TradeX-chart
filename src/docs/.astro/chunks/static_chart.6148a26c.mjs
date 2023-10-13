import { _ as __astro_tag_component__, F as Fragment, i as createVNode } from './astro.7b6fbd1f.mjs';
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

const frontmatter = {
  "title": "Static Price History",
  "description": "TradeX Chart static price history example"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  return createVNode("iframe", {
    src: "https://codesandbox.io/embed/tradex-chart-static-price-history-d2mcgn?fontsize=14&hidenavigation=1&theme=dark",
    style: "width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;",
    title: "TradeX-chart - static price history",
    allow: "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",
    sandbox: "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/docs/examples/static_chart.mdx";
const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/examples/static_chart.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/examples/static_chart.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
