# TradeX Chart Documentation

This directory contains the documentation website for TradeX Chart, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build/).

## 📁 Project Structure

```
src/docs/
├── public/              # Static assets (chart library, data files)
├── src/
│   ├── assets/         # Images (architecture diagrams, screenshots)
│   ├── content/
│   │   ├── docs/       # Documentation content
│   │   │   ├── guides/      # How-to guides
│   │   │   ├── reference/   # Reference documentation
│   │   │   ├── api/         # API documentation
│   │   │   ├── examples/    # Code examples
│   │   │   └── index.mdx    # Homepage
│   │   └── config.ts   # Content collections config
│   └── styles/         # Custom CSS
├── astro.config.mjs    # Astro configuration
├── package.json
└── tsconfig.json
```

Documentation is written in Markdown (`.md`) or MDX (`.mdx`) files in the `src/content/docs/` directory.

## 🧞 Commands

All commands are run from the `src/docs` directory:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3002`      |
| `npm run build`           | Build production site to `./dist/`               |
| `npm run build:github`    | Build with GitHub Pages config                   |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📝 Contributing to Documentation

To contribute to the documentation:

1. Edit or add `.md` or `.mdx` files in `src/content/docs/`
2. Add images to `src/assets/`
3. Test locally with `npm run dev`
4. Build with `npm run build` to verify

## 🔗 Resources

- [TradeX Chart Repository](https://github.com/tradex-app/TradeX-chart)
- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)
