import path from 'path'

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vueJsx({
      mergeProps: false,
      enableObjectSlots: false,
      babelPlugins: [
        path.join(__dirname, '../plugin/babel-auto-bind-style/index.js'),
      ],
    }),
    vue(),
  ],
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      azi: path.join(__dirname, '../src'),
    },
  },
})
