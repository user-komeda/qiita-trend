import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import reactCompiler from 'eslint-plugin-react-compiler'
import importPlugin from 'eslint-plugin-import'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import reactRefresh from 'eslint-plugin-react-refresh'
import testingLibrary from 'eslint-plugin-testing-library'
import unusedImports from 'eslint-plugin-unused-imports'
import prettier from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylistic,
      ...tseslint.configs.stylisticTypeChecked,
      ...compat.extends('next', 'next/core-web-vitals'),
      reactCompiler.configs.recommended,
      prettier,
    ],
    plugins: {
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
      'react-refresh': reactRefresh,
    },
    rules: {
      complexity: ['error', 10],
      'max-depth': ['error', 2],
      // TODO: 50にしたい
      'max-lines': ['error', 110],
      // TODO: 30にしたい
      'max-lines-per-function': ['error', 40],
      'max-params': ['error', 3],
      'no-relative-import-paths/no-relative-import-paths': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'sibling', 'index', 'object', 'type'],
          alphabetize: { order: 'asc', caseInsensitive: false },
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      vitest,
    },
    extends: [testingLibrary.configs['flat/react']],
    rules: {
      ...vitest.configs.all.rules, // you can also use vitest.configs.all.rules to enable all rules
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-hooks': [
        'error',
        {
          allow: ['beforeEach'],
        },
      ],
      'vitest/prefer-importing-vitest-globals': 'off',
      'max-lines-per-function': ['error', 100],
      'max-params': ['error', 4],
    },
  },
)
