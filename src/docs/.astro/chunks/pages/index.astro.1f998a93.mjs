import { d as createAstro, e as createComponent, r as renderTemplate, l as renderComponent } from '../astro.7b6fbd1f.mjs';
import { p as paths, $ as $$Page } from './404.astro.1d69ba63.mjs';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'fs';
import 'node:fs/promises';
import 'node:url';
import 'node:fs';
import 'node:path';
import 'slash';
import 'path';
/* empty css                         */import 'zod';
/* empty css                                                              */import 'execa';

const $$Astro = createAstro("https://tradex-app.github.io/");
async function getStaticPaths() {
  return paths;
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { Content, headings } = await Astro2.props.entry.render();
  return renderTemplate`${renderComponent($$result, "Page", $$Page, { ...Astro2.props, "headings": headings }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Content", Content, {})}` })}`;
}, "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/node_modules/@astrojs/starlight/index.astro");

const $$file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/node_modules/@astrojs/starlight/index.astro";
const $$url = undefined;

export { $$Index as default, $$file as file, getStaticPaths, $$url as url };
