import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      include: ['src/app/**'],
      exclude: ['src/app/public/login/**'],
      thresholds: {
        functions: 100,
        branches: 100,
        statements: 100,
        lines: 100,
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'nodenext' },
    }),
  ],
})
