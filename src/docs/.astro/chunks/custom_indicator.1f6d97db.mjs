import { _ as __astro_tag_component__, F as Fragment, i as createVNode } from './astro.8a1fcc00.mjs';
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

const frontmatter = {
  "title": "Custom Indicator - How to Build and Use",
  "description": "TradeX Chart custom indicator example"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  return createVNode("iframe", {
    src: "https://codesandbox.io/embed/tradex-chart-custom-indicator-5w4jj5?fontsize=14&hidenavigation=1&theme=dark",
    style: "width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;",
    title: "TradeX-chart - custom indicator",
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
const url = "src/content/docs/guides/custom_indicator.mdx";
const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/guides/custom_indicator.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/guides/custom_indicator.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
