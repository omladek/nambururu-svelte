import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/nambururu-svelte/',
  build: {
    target: 'esnext',
  },
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    stylelint(),
    eslint(),
  ],
})
