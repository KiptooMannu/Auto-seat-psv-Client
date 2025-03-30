import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Auto-seat-psv-Client/', // Match repository name exactly
  build: {
    outDir: 'dist'
  }
})
