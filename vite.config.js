import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        franchise: resolve(__dirname, 'franchise/index.html'),
        merchant: resolve(__dirname, 'merchant/index.html'),
      }
    }
  },
  server: {
    open: true
  }
})