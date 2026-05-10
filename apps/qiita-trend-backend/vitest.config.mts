import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  oxc: false,
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
    coverage: {
      include: ['src/app/**/*.ts'],
      exclude:["src/app/form/**/*.ts"],
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        100: true,
      },
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'nodenext' },
    }),
  ],
})
