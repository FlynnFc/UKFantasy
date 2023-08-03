import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react/dist'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})