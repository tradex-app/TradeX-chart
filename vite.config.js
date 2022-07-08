// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

const name = "TradeX-chart"
const id = "tradex-chart"

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: name,
      fileName: (format) => `${id}.${format}.js`
    },
    emptyOutDir: true,
    target: "esnext",
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: [
        'talib-web',
        '@jingwood/input-control'
      ],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          // vue: 'Vue'
        }
      }
    }
  },
  server: {
    open: '/demo.html'
  }
})
