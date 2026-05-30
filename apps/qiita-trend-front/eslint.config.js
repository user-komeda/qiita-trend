import nextPlugin from '@next/eslint-plugin-next'
import {
  baseConfig,
  importConfig,
  prettierConfig,
  qualityConfig,
  typescriptConfig,
  vitestConfig,
} from '@qiita-trend/eslint'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import playwright from 'eslint-plugin-playwright'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactRefresh from 'eslint-plugin-react-refresh'
import testingLibrary from 'eslint-plugin-testing-library'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'coverage/**',
      'node_modules/**',
      'next-env.d.ts',
      'eslint.config.js',
      'vitest.config.mts',
      'tests-results/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      ...baseConfig,
      ...importConfig,
      ...typescriptConfig,
      ...qualityConfig,
      reactCompiler.configs.recommended,
      ...prettierConfig,
    ],
    plugins: {
      '@next/next': nextPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'max-lines': ['error', 115],
      'max-lines-per-function': ['error', 40],
      'no-relative-import-paths/no-relative-import-paths': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    extends: [...vitestConfig, testingLibrary.configs['flat/react']],
    rules: {
      'vitest/prefer-importing-vitest-globals': 'off',
    },
  },
  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      // Customize Playwright rules
      // ...
    },
  },
)
