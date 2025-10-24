---
title: Build Process
description: Understanding the TradeX Chart build system and configuration
---

Learn how TradeX Chart is built, bundled, and optimized for distribution.

## Build System Overview

TradeX Chart uses **Vite** as its build tool, which provides:
- Fast development server with HMR
- Optimized production builds
- ES modules and UMD output
- TypeScript definition generation
- Source map generation

## Build Scripts

### Available Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Complete build (all formats)
npm run buildall

# Serve built files
npm run serve

# Run tests
npm test

# Format code
npm run format
```

### Script Details

#### `npm run dev`

Starts Vite development server:
- Hot Module Replacement (HMR)
- Fast refresh on file changes
- Source maps for debugging
- Runs on `http://localhost:5173`

```bash
vite
```

#### `npm run build`

Builds the library for production:
- ES module format
- UMD format
- TypeScript definitions
- Source maps

```bash
./bin/build.sh
```

#### `npm run buildall`

Complete build including:
- All module formats
- Minified versions
- Documentation
- Type definitions

```bash
./bin/buildall.sh
```

## Build Configuration

### Vite Config

The build is configured in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'TradeXChart',
      formats: ['es', 'umd'],
      fileName: (format) => `tradex-chart.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  }
})
```

### Key Configuration Options

**Library Mode**
```javascript
build: {
  lib: {
    entry: 'src/index.js',      // Entry point
    name: 'TradeXChart',         // Global variable name (UMD)
    formats: ['es', 'umd']       // Output formats
  }
}
```

**External Dependencies**
```javascript
rollupOptions: {
  external: ['mjolnir.js'],      // Don't bundle these
  output: {
    globals: {
      'mjolnir.js': 'mjolnir'    // Global name for externals
    }
  }
}
```

**Source Maps**
```javascript
sourcemap: true  // Generate .map files
```

**Minification**
```javascript
minify: 'terser',
terserOptions: {
  compress: {
    drop_console: false,       // Keep console logs
    drop_debugger: true        // Remove debugger statements
  }
}
```

## Build Output

### Output Files

After running `npm run build`, the `dist/` directory contains:

```
dist/
├── tradex-chart.es.js          # ES module (for bundlers)
├── tradex-chart.es.js.map      # Source map for ES module
├── tradex-chart.umd.js         # UMD module (for browsers)
├── tradex-chart.umd.js.map     # Source map for UMD
├── tradex-chart.umd.min.js     # Minified UMD
└── tradex-chart.d.ts           # TypeScript definitions
```

### Module Formats

#### ES Module (ESM)

**File**: `tradex-chart.es.js`

**Usage**:
```javascript
import { Chart } from 'tradex-chart'
```

**Target**: Modern bundlers (Webpack, Rollup, Vite)

**Features**:
- Tree-shakeable
- Smaller bundle size
- Modern JavaScript

#### UMD Module

**File**: `tradex-chart.umd.js`

**Usage**:
```html
<script src="tradex-chart.umd.js"></script>
<script>
  const chart = new TradeXChart.Chart()
</script>
```

**Target**: Direct browser usage, legacy systems

**Features**:
- Works in browsers without bundler
- AMD/CommonJS compatible
- Global variable fallback

## Build Process Steps

### 1. Pre-build

**Clean previous builds**:
```bash
rm -rf dist/
```

**Validate environment**:
- Check Node.js version
- Verify dependencies installed
- Ensure no uncommitted changes (optional)

### 2. Compilation

**Vite processes**:
1. Parse entry point (`src/index.js`)
2. Resolve all imports
3. Transform modern JavaScript
4. Bundle dependencies
5. Apply optimizations

**Transformations**:
- ES6+ → ES5 (if configured)
- JSX → JavaScript (if used)
- Remove dead code
- Minify output

### 3. Type Generation

**Generate TypeScript definitions**:
```bash
tsc --declaration --emitDeclarationOnly
```

Creates `tradex-chart.d.ts` from JSDoc comments.

### 4. Post-build

**Verify output**:
- Check file sizes
- Validate exports
- Test in demo page

**Generate checksums** (optional):
```bash
sha256sum dist/*.js > dist/checksums.txt
```

## Optimization Strategies

### Code Splitting

For large applications, consider code splitting:

```javascript
// Dynamic imports
const indicator = await import('./indicators/RSI.js')
```

### Tree Shaking

Ensure exports are tree-shakeable:

```javascript
// Good - named exports
export { Chart, Indicator, Overlay }

// Avoid - default exports with objects
export default { Chart, Indicator, Overlay }
```

### Bundle Analysis

Analyze bundle size:

```bash
npm install --save-dev rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
})
```

### Minification

**Terser options**:
```javascript
terserOptions: {
  compress: {
    drop_console: true,        // Remove console.log
    drop_debugger: true,       // Remove debugger
    pure_funcs: ['console.log'] // Remove specific functions
  },
  mangle: {
    properties: false          // Don't mangle property names
  }
}
```

## Build Scripts

### Custom Build Script

**`bin/build.sh`**:
```bash
#!/bin/bash

# Clean dist directory
rm -rf dist

# Build library
vite build

# Generate TypeScript definitions
npm run build:types

# Copy additional files
cp README.md dist/
cp LICENSE dist/

echo "Build complete!"
```

### Build All Script

**`bin/buildall.sh`**:
```bash
#!/bin/bash

# Run standard build
./bin/build.sh

# Build minified version
vite build --mode production

# Generate documentation
npm run docs:build

# Run tests
npm test

echo "Full build complete!"
```

## Environment Variables

### Development

```bash
# .env.development
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

### Production

```bash
# .env.production
VITE_API_URL=https://api.example.com
VITE_DEBUG=false
```

### Usage in Code

```javascript
const apiUrl = import.meta.env.VITE_API_URL
const debug = import.meta.env.VITE_DEBUG === 'true'

if (debug) {
  console.log('Debug mode enabled')
}
```

## TypeScript Definitions

### Generating Types

TradeX Chart generates TypeScript definitions from JSDoc:

```javascript
/**
 * Chart class
 * @class
 * @param {Object} config - Configuration options
 * @param {number} config.width - Chart width
 * @param {number} config.height - Chart height
 */
export class Chart {
  constructor(config) {
    this.config = config
  }
}
```

Generates:
```typescript
export class Chart {
  constructor(config: {
    width: number;
    height: number;
  });
}
```

### Type Configuration

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "allowJs": true,
    "outDir": "./dist",
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist
        path: dist/
```

### NPM Publishing

```yaml
- name: Publish to NPM
  if: startsWith(github.ref, 'refs/tags/v')
  run: |
    npm config set //registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}
    npm publish
```

## Build Performance

### Optimization Tips

**1. Use build cache**:
```javascript
build: {
  cache: true
}
```

**2. Parallel builds**:
```bash
# Build multiple targets in parallel
npm run build:es & npm run build:umd & wait
```

**3. Incremental builds**:
- Only rebuild changed files
- Use watch mode during development

**4. Reduce bundle size**:
- Remove unused code
- Optimize dependencies
- Use dynamic imports

### Build Metrics

**Track build performance**:
```bash
time npm run build
```

**Typical build times**:
- Development build: 2-5 seconds
- Production build: 10-30 seconds
- Full build with docs: 1-2 minutes

## Troubleshooting

### Build Fails

**Clear cache and rebuild**:
```bash
rm -rf node_modules/.vite
npm run build
```

### Out of Memory

**Increase Node.js memory**:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Module Resolution Errors

**Check imports**:
```javascript
// Use relative paths
import { Chart } from './components/chart.js'

// Not absolute
import { Chart } from 'components/chart.js'
```

### Source Maps Not Working

**Verify configuration**:
```javascript
build: {
  sourcemap: true,  // or 'inline' or 'hidden'
}
```

## Related Documentation

- [Local Setup](local-setup) - Development environment setup
- [Contributing Code](contributing-code) - Contribution guidelines
- [Debugging Tips](debugging-tips) - Debug techniques
- [Testing](../../reference/testing) - Testing guide