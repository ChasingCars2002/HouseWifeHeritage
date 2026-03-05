import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/HouseWifeHeritage/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/testSetup.js',
  },
})
