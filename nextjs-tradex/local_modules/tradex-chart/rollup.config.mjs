import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'build/src/index.js',
  output: {
    dir: '.',
    format: 'es',
    entryFileNames: '[name].mjs',
    chunkFileNames: '[name]-[hash].mjs',
    assetFileNames: 'assets/[name]-[hash].[ext]'
  },
  plugins: [resolve(), commonjs(), json()]
};
