import path from 'path'

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      azi: path.join(__dirname, '../src/index.ts'),
    },
  },
  plugins: [vueJsx(), vue()],
  build: {
    outDir: '../dist',
  },
})
