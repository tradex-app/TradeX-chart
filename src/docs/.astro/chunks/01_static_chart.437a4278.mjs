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
  "title": "Static Price History",
  "description": "TradeX Chart static price history example"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "providing-price-history-to-the-chart",
    "text": "Providing Price History to the Chart"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    ol: "ol",
    li: "li",
    code: "code",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode("iframe", {
      src: "https://codesandbox.io/embed/tradex-chart-static-price-history-d2mcgn?fontsize=14&hidenavigation=1&theme=dark",
      style: "width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;",
      title: "TradeX-chart - static price history",
      allow: "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",
      sandbox: "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    }), "\n", createVNode(_components.h2, {
      id: "providing-price-history-to-the-chart",
      children: "Providing Price History to the Chart"
    }), "\n", createVNode(_components.p, {
      children: "There are two ways to load price history into the chart:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["Config provided upon ", createVNode(_components.code, {
          children: "start(config)"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["API via ", createVNode(_components.code, {
          children: "chart.mergeData({data: d})"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["When using either option the data has to be proved in a ", createVNode(_components.a, {
        href: "../../reference/state/#state-object",
        children: [createVNode(_components.code, {
          children: "State"
        }), " object format"]
      }), "."]
    })]
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
  }) : _createMdxContent(props);
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/docs/examples/01_static_chart.mdx";
const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/examples/01_static_chart.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/examples/01_static_chart.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
