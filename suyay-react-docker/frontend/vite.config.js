import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure Vite uses the port exposed in Docker
    strictPort: true, // Fail if port is already in use
    host: true, // Listen on all addresses, suitable for Docker
    // Proxy API requests to the backend container
    proxy: {
      '/api': {
        target: 'http://backend:3001', // Target the backend service name inside the Docker network
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Optional: If backend uses self-signed certs
        // rewrite: (path) => path.replace(/^\/api/, '') // Optional: remove /api prefix if backend doesn't expect it
      }
    }
  }
})
