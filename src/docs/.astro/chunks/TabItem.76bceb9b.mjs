import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, l as renderComponent, u as unescapeHTML, j as renderSlot, g as addAttribute, F as Fragment } from './astro.7b6fbd1f.mjs';
import { a as $$Icon } from './pages/404.astro.1d69ba63.mjs';
/* empty css                                                             *//* empty css                                                                 *//* empty css                                                             */import { rehype } from 'rehype';
import { visit, CONTINUE, SKIP } from 'unist-util-visit';

const $$Astro$3 = createAstro("https://tradex-app.github.io/");
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Card;
  const { icon, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<article class="card flex astro-V5TIDMUC">
  <p class="title flex astro-V5TIDMUC">
    ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "icon astro-V5TIDMUC", "size": "1.333em" })}`}
    <span class="astro-V5TIDMUC">${unescapeHTML(title)}</span>
  </p>
  <div class="body astro-V5TIDMUC">${renderSlot($$result, $$slots["default"])}</div>
</article>`;
}, "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/node_modules/@astrojs/starlight/user-components/Card.astro");

const $$Astro$2 = createAstro("https://tradex-app.github.io/");
const $$CardGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CardGrid;
  const { stagger = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([["card-grid", { stagger }], "astro-ZNTQMYDN"], "class:list")}>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/node_modules/@astrojs/starlight/user-components/CardGrid.astro");

const TabItemTagname = "starlight-tab-item";
let count = 0;
const getIDs = () => {
  const id = count++;
  return { panelId: "tab-panel-" + id, tabId: "tab-" + id };
};
const tabsProcessor = rehype().data("settings", { fragment: true }).use(function tabs() {
  return (tree, file) => {
    file.data.panels = [];
    let isFirst = true;
    visit(tree, "element", (node) => {
      if (node.tagName !== TabItemTagname || !node.properties) {
        return CONTINUE;
      }
      const { dataLabel } = node.properties;
      const ids = getIDs();
      file.data.panels?.push({
        ...ids,
        label: String(dataLabel)
      });
      delete node.properties.dataLabel;
      node.tagName = "section";
      node.properties.id = ids.panelId;
      node.properties["aria-labelledby"] = ids.tabId;
      node.properties.role = "tabpanel";
      node.properties.tabindex = -1;
      if (isFirst) {
        isFirst = false;
      } else {
        node.properties.hidden = true;
      }
      return SKIP;
    });
  };
});
const processPanels = (html) => {
  const file = tabsProcessor.processSync({ value: html });
  return {
    /** Data for each tab panel. */
    panels: file.data.panels,
    /** Processed HTML for the tab panels. */
    html: file.toString()
  };
};

const $$Astro$1 = createAstro("https://tradex-app.github.io/");
const $$Tabs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Tabs;
  const panelHtml = await Astro2.slots.render("default");
  const { html, panels } = processPanels(panelHtml);
  return renderTemplate`${renderComponent($$result, "starlight-tabs", "starlight-tabs", { "class": "astro-ESQGOLMP" }, { "default": () => renderTemplate`
  ${panels && renderTemplate`${maybeRenderHead($$result)}<div class="tablist-wrapper astro-ESQGOLMP">
        <ul role="tablist" class="astro-ESQGOLMP">
          ${panels.map(({ label, panelId, tabId }, idx) => renderTemplate`<li role="presentation" class="tab astro-ESQGOLMP">
              <a role="tab"${addAttribute("#" + panelId, "href")}${addAttribute(tabId, "id")}${addAttribute(idx === 0 && "true", "aria-selected")}${addAttribute(idx !== 0 ? -1 : 0, "tabindex")} class="astro-ESQGOLMP">
                ${label}
              </a>
            </li>`)}
        </ul>
      </div>`}
  ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })}
` })}`;
}, "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/node_modules/@astrojs/starlight/user-components/Tabs.astro");

const $$Astro = createAstro("https://tradex-app.github.io/");
const $$TabItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TabItem;
  const { label } = Astro2.props;
  if (!label) {
    throw new Error("Missing prop `label` on `<TabItem>` component.");
  }
  return renderTemplate`${renderComponent($$result, "TabItemTagname", TabItemTagname, { "data-label": label }, { "default": ($$result2) => renderTemplate`
  ${renderSlot($$result2, $$slots["default"])}
` })}`;
}, "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/node_modules/@astrojs/starlight/user-components/TabItem.astro");

export { $$CardGrid as $, $$Card as a };
