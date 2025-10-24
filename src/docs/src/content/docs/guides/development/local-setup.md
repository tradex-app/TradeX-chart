---
title: Local Development Setup
description: Set up your local environment for TradeX Chart development
---

Get your local environment ready for contributing to or customizing TradeX Chart.

## Prerequisites

### Required Software

**Node.js** - Version 18.x or higher
```bash
# Check your version
node --version

# Should output v18.0.0 or higher
```

**npm** - Version 9.x or higher (comes with Node.js)
```bash
npm --version
```

**Git** - For version control
```bash
git --version
```

### Recommended Tools

- **VS Code** - Recommended IDE with excellent JavaScript support
- **Chrome DevTools** - For debugging
- **Git GUI** - GitKraken, SourceTree, or GitHub Desktop (optional)

## Clone the Repository

### Fork the Repository (for contributors)

1. Visit [TradeX Chart on GitHub](https://github.com/tradex-app/TradeX-chart)
2. Click the "Fork" button in the top right
3. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/TradeX-chart.git
cd TradeX-chart
```

### Clone Directly (for local development)

```bash
git clone https://github.com/tradex-app/TradeX-chart.git
cd TradeX-chart
```

## Install Dependencies

```bash
# Install all dependencies
npm install
```

This installs:
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Canvas** - For server-side rendering tests
- **TALib-web** - Technical indicators library
- **Rollup plugins** - For building

## Project Structure

```
TradeX-chart/
├── src/                    # Source code
│   ├── components/         # Chart components
│   ├── helpers/           # Utility functions
│   ├── indicators/        # Technical indicators
│   ├── overlays/          # Chart overlays
│   ├── scaleX/            # X-axis (time) scale
│   ├── scaleY/            # Y-axis (price) scale
│   ├── state/             # State management
│   ├── tools/             # Drawing tools
│   ├── utils/             # Utilities
│   └── index.js           # Main entry point
├── dist/                  # Built files (generated)
├── tests/                 # Test files
├── demo/                  # Demo pages
├── docs/                  # Documentation source
├── bin/                   # Build scripts
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project readme
```

## Development Server

### Start the Dev Server

```bash
npm run dev
```

This starts Vite dev server at `http://localhost:5173`

### Available Demo Pages

Once the dev server is running, visit:

- `http://localhost:5173/` - Main demo
- `http://localhost:5173/demo.html` - Full demo page
- `http://localhost:5173/test.html` - Test page

### Hot Module Replacement (HMR)

Vite provides instant hot reloading:
- Edit source files in `src/`
- Changes appear immediately in browser
- No manual refresh needed

## Building the Project

### Development Build

```bash
npm run build
```

Generates:
- `dist/tradex-chart.es.js` - ES module
- `dist/tradex-chart.umd.js` - UMD module
- `dist/tradex-chart.d.ts` - TypeScript definitions

### Production Build

```bash
npm run buildall
```

Builds everything including:
- Minified versions
- Source maps
- Type definitions
- Documentation

### Build Output

```
dist/
├── tradex-chart.es.js          # ES module
├── tradex-chart.es.js.map      # Source map
├── tradex-chart.umd.js         # UMD module
├── tradex-chart.umd.js.map     # Source map
├── tradex-chart.umd.min.js     # Minified UMD
├── tradex-chart.d.ts           # TypeScript definitions
└── style.css                   # Styles (if any)
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Watch Mode

```bash
npm test -- --watch
```

### Run Specific Test File

```bash
npm test -- tests/state.test.js
```

### Coverage Report

```bash
npm test -- --coverage
```

## Code Quality

### Format Code

```bash
npm run format
```

Uses Prettier to format all files.

### Linting

Currently, the project doesn't have ESLint configured, but you can add it:

```bash
npm install --save-dev eslint
npx eslint --init
```

## Development Workflow

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/my-new-feature

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Changes

Edit files in `src/` directory:

```javascript
// src/components/chart.js
export class Chart {
  // Your changes here
}
```

### 3. Test Your Changes

```bash
# Start dev server
npm run dev

# In another terminal, run tests
npm test
```

### 4. Build and Verify

```bash
# Build the project
npm run build

# Test the built version
npm run serve
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"

# Or for fixes
git commit -m "fix: resolve issue with..."
```

## Environment Configuration

### VS Code Setup

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "files.eol": "\n",
  "javascript.preferences.quoteStyle": "single"
}
```

### Recommended VS Code Extensions

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **GitLens** - Enhanced Git integration
- **JavaScript (ES6) code snippets** - Code snippets
- **Path Intellisense** - File path autocomplete

## Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
# Vite will automatically try the next available port
# Or specify a different port
vite --port 3000
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear dist folder
rm -rf dist

# Rebuild
npm run build
```

### Canvas Module Issues (Tests)

If canvas module fails to install:

```bash
# On Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# On macOS
brew install pkg-config cairo pango libpng jpeg giflib librsvg

# Then reinstall
npm install canvas
```

### Permission Errors

```bash
# Don't use sudo with npm
# Instead, fix npm permissions:
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

## Working with Submodules

If the project uses git submodules:

```bash
# Initialize submodules
git submodule init
git submodule update

# Or clone with submodules
git clone --recursive https://github.com/tradex-app/TradeX-chart.git
```

## Development Tips

### Live Reload

- Dev server watches `src/` directory
- Changes trigger automatic rebuild
- Browser auto-refreshes

### Console Logging

Add debug logging:

```javascript
// Temporary debug logging
console.log('[Chart]', 'Debug info:', data)

// Remove before committing
```

### Browser DevTools

- **F12** - Open DevTools
- **Ctrl+Shift+C** - Inspect element
- **Ctrl+Shift+J** - Console
- **Ctrl+Shift+I** - DevTools

### Source Maps

Source maps are generated automatically:
- Debug original source in browser
- Set breakpoints in source files
- See original file names in stack traces

## Next Steps

Now that your environment is set up:

1. **Explore the codebase** - Read through `src/` files
2. **Run the demo** - See the chart in action
3. **Make a small change** - Test your setup
4. **Read the docs** - Understand the architecture
5. **Check issues** - Find something to work on

## Related Documentation

- [Build Process](build-process) - Detailed build information
- [Contributing Code](contributing-code) - Contribution guidelines
- [Debugging Tips](debugging-tips) - Debug techniques
- [Architecture](../../reference/architecture) - Code architecture
- [API Reference](../../api/core) - API documentation

## Getting Help

If you encounter issues:

- Check [GitHub Issues](https://github.com/tradex-app/TradeX-chart/issues)
- Ask in [Discord](https://discord.gg/6XS9tDrcdq)
- Review [FAQ](../faq)
- Read [Troubleshooting](debugging-tips)