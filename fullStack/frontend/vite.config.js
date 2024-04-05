import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000' //this port gets appended, the url with think this is the origin  
    }
  },
  plugins: [react()],
})
