import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      include: ['src/app/**'],
      exclude: [
        './src/app/api/**',
        './src/app/(pages)/**',
        './src/app/types/**',
        './src/app/layout.tsx',
        './src/app/component/Header.tsx',
        './src/app/component/MainContent.tsx',
        './src/app/component/SideMenu.tsx',
        './src/app/component/WrapDrawer.tsx',
        './src/app/features/component/drawer/DrawerMenu.tsx',
      ],
      thresholds: {
        functions: 100,
        branches: 100,
        statements: 100,
        lines: 100,
      },
    },
  },
})
