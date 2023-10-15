import { _ as __astro_tag_component__, F as Fragment, i as createVNode } from './astro.8a1fcc00.mjs';
import '@astrojs/internal-helpers/path';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './pages/404.astro.3b1f3a71.mjs';
import { $ as $$CardGrid, a as $$Card } from './TabItem.58b47605.mjs';
import 'html-escaper';
import 'fs';
import 'path';
/* empty css                        */import 'zod';
/* empty css                                                             */import 'execa';
/* empty css                                                             *//* empty css                                                                 *//* empty css                                                             */import 'rehype';
import 'unist-util-visit';

const frontmatter = {
  "title": "TradeX Chart",
  "description": "Get started building your charts with TradeX.",
  "template": "splash",
  "hero": {
    "tagline": "Get started building your charts with TradeX!",
    "image": {
      "file": "../../assets/tx.svg"
    },
    "actions": [{
      "text": "Example Guide",
      "link": "/guides/example/",
      "icon": "right-arrow",
      "variant": "primary"
    }, {
      "text": "Read the Starlight docs",
      "link": "https://starlight.astro.build",
      "icon": "external"
    }]
  }
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "next-steps",
    "text": "Next steps"
  }, {
    "depth": 1,
    "slug": "contents",
    "text": "Contents"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    code: "code",
    a: "a",
    h1: "h1",
    ul: "ul",
    li: "li"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "next-steps",
      children: "Next steps"
    }), "\n", createVNode($$CardGrid, {
      children: [createVNode($$Card, {
        title: "Update content",
        icon: "pencil",
        children: createVNode(_components.p, {
          children: ["Edit ", createVNode(_components.code, {
            children: "src/content/docs/index.mdx"
          }), " to see this page change."]
        })
      }), createVNode($$Card, {
        title: "Add new content",
        icon: "add-document",
        children: createVNode(_components.p, {
          children: ["Add Markdown or MDX files to ", createVNode(_components.code, {
            children: "src/content/docs"
          }), " to create new pages."]
        })
      }), createVNode($$Card, {
        title: "Configure your site",
        icon: "setting",
        children: createVNode(_components.p, {
          children: ["Edit your ", createVNode(_components.code, {
            children: "sidebar"
          }), " and other config in ", createVNode(_components.code, {
            children: "astro.config.mjs"
          }), "."]
        })
      }), createVNode($$Card, {
        title: "Read the docs",
        icon: "open-book",
        children: createVNode(_components.p, {
          children: ["Learn more in ", createVNode(_components.a, {
            href: "https://starlight.astro.build/",
            children: "the Starlight Docs"
          }), "."]
        })
      })]
    }), "\n", createVNode(_components.h1, {
      id: "contents",
      children: "Contents"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "architecture.md",
          children: "Architecture"
        })
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "https://tradex-app.github.io/TradeX-chart/api/",
          children: "API Documentation"
        }), " (not currently up to date!)"]
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "api-examples.md",
          children: "API Examples"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "configuration.md",
          children: "Configuration"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "state.md",
          children: "Chart State"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "events.md",
          children: "Events"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "streaming-price-data.md",
          children: "Streaming Price Data"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "indicators.md",
          children: "Indicators"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "overlays.md",
          children: "Overlays"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "themes.md",
          children: "Themes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "TradeX-chart-Development-Roadmap.pdf",
          children: "Development Road Map"
        })
      }), "\n"]
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
const url = "src/content/docs/documentation.mdx";
const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/documentation.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/documentation.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
