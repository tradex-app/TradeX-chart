import { _ as __astro_tag_component__, F as Fragment, i as createVNode } from './astro.7b6fbd1f.mjs';
import '@astrojs/internal-helpers/path';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './pages/404.astro.1d69ba63.mjs';
import { $ as $$CardGrid, a as $$Card } from './TabItem.76bceb9b.mjs';
import 'html-escaper';
import 'fs';
import 'path';
/* empty css                        */import 'zod';
/* empty css                                                             */import 'execa';
/* empty css                                                             *//* empty css                                                                 *//* empty css                                                             */import 'rehype';
import 'unist-util-visit';

const frontmatter = {
  "title": "TradeX Chart",
  "description": "Flexible and unique, because your market view is unique.",
  "template": "splash",
  "hero": {
    "tagline": "Flexible and unique, because your market view is unique.",
    "image": {
      "file": "../../assets/tx.svg"
    },
    "actions": [{
      "text": "Examples",
      "link": "/examples/custom_indicator/",
      "icon": "right-arrow",
      "variant": "primary"
    }, {
      "text": "Read the TradeX docs",
      "link": "/reference/",
      "icon": "right-arrow"
    }]
  }
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "next-steps",
    "text": "Next steps"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode("iframe", {
      src: "https://codesandbox.io/embed/tradex-chart-static-price-history-lx92vj?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview",
      style: "width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;",
      title: "TradeX-chart - static price history",
      allow: "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",
      sandbox: "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    }), "\n", "\n", createVNode(_components.h2, {
      id: "next-steps",
      children: "Next steps"
    }), "\n", createVNode($$CardGrid, {
      children: [createVNode($$Card, {
        title: "Live Examples",
        icon: "pencil",
        children: createVNode(_components.p, {
          children: [createVNode(_components.a, {
            href: "examples/static_chart/",
            children: "Explore more examples"
          }), "."]
        })
      }), createVNode($$Card, {
        title: "Read the docs",
        icon: "open-book",
        children: createVNode(_components.p, {
          children: ["Learn more in ", createVNode(_components.a, {
            href: "reference/",
            children: "TradeX Referenc"
          }), "."]
        })
      }), createVNode($$Card, {
        title: "Quick How To",
        icon: "add-document",
        children: createVNode(_components.p, {
          children: [createVNode(_components.a, {
            href: "guides/howto",
            children: "How To"
          }), " will give you quick and practical solutions."]
        })
      }), createVNode($$Card, {
        title: "API",
        icon: "setting",
        children: createVNode(_components.p, {
          children: ["Look up the ", createVNode(_components.a, {
            href: "api/core",
            children: "API options"
          }), "."]
        })
      })]
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
const url = "src/content/docs/index.mdx";
const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/index.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
