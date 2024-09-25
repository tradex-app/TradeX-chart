import path from 'path';
import { defineConfig } from 'vite';
import cleanup from 'rollup-plugin-cleanup';

const name = "TradeX-chart";
const id = "tradex-chart";

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    return {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),
          name: name,
          fileName: (format) => `${id}.${format}.js`
        },
        emptyOutDir: true,
        target: "esnext",
        minify: "esbuild",
        rollupOptions: {
          external: [
            'talib-web',
          ],
          output: {
            globals: {
              // vue: 'Vue'
            }
          },
          plugins: [
            cleanup()
          ]
        }
      },
    };
  } else if (command === 'serve') {
    return {
      server: {
        host: true
      }
    };
  } else {
    return {
      // dev / serve specific config
    };
  }
});
