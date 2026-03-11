import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  // --- Vitest configuration ---
  test: {
    globals: true,                        // enables describe / it / expect without imports
    environment: 'jsdom',                 // simulates a browser DOM for React rendering
    setupFiles: './src/test/setup.js',    // runs before every test file
    css: false,                           // skip CSS parsing — faster, not needed for logic tests

    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
    
  },
  
})
