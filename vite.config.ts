import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Auto-seat-psv-Client/', // Must match your GitHub repo name exactly
  build: {
    outDir: 'dist',
    emptyOutDir: true // Cleans the dist folder before build
  }
})
