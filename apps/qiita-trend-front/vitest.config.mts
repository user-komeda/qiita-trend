import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    exclude: [
      'test/**',
      'tests/**',
      'e2e/**',
    ],
    coverage: {
      include: ['src/app/**/*.{ts,tsx}'],
      exclude: [
        'src/app/layout.tsx',
        'src/app/types/**',
        'src/app/theme.tsx',
        'src/app/\\(pages\\)/**',
      ],
      thresholds: {
        functions: 90,
        branches: 90,
        statements: 90,
        lines: 90,
      },
    },
  },
})
