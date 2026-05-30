import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed'
import {
  baseConfig,
  importConfig,
  prettierConfig,
  qualityConfig,
  typescriptConfig,
  vitestConfig,
} from '@qiita-trend/eslint'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  {
    files: ['./src/**/*.{mjs,ts,mts}', './test/**/*.{mjs,ts,mts}'],
    extends: [
      ...baseConfig,
      ...importConfig,
      ...typescriptConfig,
      ...qualityConfig,
      eslintNestJs.configs.flatRecommended,
      ...prettierConfig,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'max-lines': ['error', 70],
      'max-lines-per-function': ['error', 30],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off',
      '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
      '@darraghor/nestjs-typed/injectable-should-be-provided': 'off',
    },
  },
  {
    files: ['src/**/*.test.ts', 'test/**/*.test.ts'],
    extends: [...vitestConfig],
    rules: {
      complexity: 'off',
      'max-depth': 'off',
      'max-lines': 'off',
      ' @typescript-eslint/unbound-method': 'off',
    },
  },
)
