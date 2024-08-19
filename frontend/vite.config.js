import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5100",
      "/uploads": {
        target: "http://localhost:5100",
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
})
