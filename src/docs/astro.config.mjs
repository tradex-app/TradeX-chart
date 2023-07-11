import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'TradeX Chart',
      customCss: [ '/src/styles/custom.css', ],
      logo: { src: '/src/assets/tx.svg' },
      social: {
        github: 'https://github.com/tradex-app/TradeX-chart',
        discord: 'https://discord.com/channels/1039287962510311434/1039288750913634405'
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
});
