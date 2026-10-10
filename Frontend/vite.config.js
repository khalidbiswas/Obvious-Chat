import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Proxy API requests to backend server
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Ensure this port matches your Express backend server
        changeOrigin: true,
      },
    },
    "/socket.io": {
      target: "http://localhost:3000",
      changeOrigin: true,
      ws: true,
    },
  },
})
