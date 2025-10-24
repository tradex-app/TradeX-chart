---
title: Vite Configuration
description: Configure Vite for fast TradeX Chart development and builds
---

# Vite Configuration

Optimize your Vite configuration for blazing-fast development and production builds with TradeX Chart.

## Basic Configuration

### vite.config.js

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
})
```

## Production Configuration

### Optimized Build

```javascript
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        manualChunks: {
          'tradex-chart': ['tradex-chart'],
          'vendor': ['react', 'react-dom']
        },
        
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop()
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ]
})
```

## Development Configuration

### Dev Server

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    
    hmr: {
      overlay: true
    },
    
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  }
})
```

## React Configuration

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'tradex-chart': ['tradex-chart']
        }
      }
    }
  }
})
```

## Related Documentation

- [Webpack Configuration](webpack-config) - Webpack alternative
- [Production Checklist](production-checklist) - Deployment checklist
- [Performance Optimization](../performance) - Performance tips
- [CDN Deployment](cdn-deployment) - CDN setup