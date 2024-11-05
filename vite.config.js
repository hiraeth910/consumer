import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Bind the dev server to 127.0.0.1
    port: 3000, // Optional: Specify the port you want to use
  },
})
