import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://tradex-app.github.io/TradeX-chart/',
  base: '/docs',
  outDir: '../../docs',
  publicDir: './public',
  assets: '../../docs/_astro',
  integrations: [
    starlight({
      title: 'TradeX Chart',
      customCss: [ '/src/styles/custom.css', ],
      logo: { src: '/src/assets/tx.svg' },
      social: {
        github: 'https://github.com/tradex-app/TradeX-chart',
        discord: 'https://discord.gg/hhfvuhJJY'
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      sidebar: [
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },

          // items: [
          //   // Each item here is one entry in the navigation menu.
          //   { label: 'Example Guide', link: '/guides/example/' },
          // ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'API',
          autogenerate: { directory: 'api' },
          // items: [
          //   { label: 'Axis', link: 'api/Axis' },
          // ]
        },
      ],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'min-dark',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});
