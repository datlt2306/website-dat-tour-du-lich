import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gioiThieu: resolve(__dirname, 'gioi-thieu.html'),
        tours: resolve(__dirname, 'tours.html'),
        lienHe: resolve(__dirname, 'lien-he.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

