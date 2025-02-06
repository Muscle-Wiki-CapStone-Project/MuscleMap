import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['js-cookie']
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy API calls to Flask backend
    },
  },
});
