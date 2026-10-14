import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'swift-bags-doubt.loca.lt', // Add your specific loca.lt host here
      '.loca.lt' // Or allow all loca.lt subdomains automatically
    ]
  }
})