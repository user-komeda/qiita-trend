import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin'
import _import from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import jest from 'eslint-plugin-jest'
import checkFile from 'eslint-plugin-check-file'
import jsdoc from 'eslint-plugin-jsdoc'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/.eslintrc.js', '**/jest.config.ts'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:jsdoc/recommended-typescript-error',
      'plugin:@typescript-eslint/stylistic',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:jest/recommended',
      'plugin:jest/style',
      'next/core-web-vitals',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslintEslintPlugin),
      import: fixupPluginRules(_import),
      'unused-imports': unusedImports,
      jest: fixupPluginRules(jest),
      'check-file': checkFile,
      'prefer-arrow-functions': preferArrowFunctions,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: './',
      },
    },

    settings: {
      'import/resolver': 'typescript',
    },

    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['strictCamelCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'accessor',
          format: ['strictCamelCase'],
        },
        {
          selector: 'parameter',
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeAlias',
          format: ['StrictPascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'class',
          format: ['StrictPascalCase'],
        },
        {
          selector: 'interface',
          format: ['StrictPascalCase'],
        },
      ],

      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/sort-type-constituents': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      'no-console': 'error',
      'no-template-curly-in-string': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'arrow-body-style': ['error', 'always'],
      camelcase: 'error',
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      complexity: ['error', 10],
      'consistent-return': 'error',
      curly: 'error',
      'dot-notation': 'error',
      'max-lines': ['error', 200],
      'max-lines-per-function': ['error', 40],
      'max-params': ['error', 3],
      'no-magic-numbers': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'no-restricted-syntax': [
        'error',
        'FunctionExpression',
        'FunctionDeclaration',
      ],
      'no-var': 'error',
      'no-else-return': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'unused-imports/no-unused-imports': 'error',

      'check-file/folder-match-with-fex': [
        'error',
        {
          //   '*.test.{js,jsx,ts,tsx}': '**/tests/',
          '*.d.ts': '**/types/**/',
        },
      ],

      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/(page.tsx|layout.tsx|const.ts)': 'CAMEL_CASE',
          'src/app/(component|const|features|store|util)/**/*.tsx':
            'PASCAL_CASE',
          'src/app/(component|const|features|store|util)/**/*.ts': 'CAMEL_CASE',
          'src/app/(types)/**': 'PASCAL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/!((pages))': 'CAMEL_CASE',
        },
      ],

      'jsdoc/check-param-names': [
        'error',
        {
          checkDestructured: false,
        },
      ],

      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: ['remarks', 'typeParam'],
        },
      ],

      'jsdoc/require-description': [
        'error',
        {
          contexts: [
            'ArrowFunctionExpression',
            'ClassDeclaration',
            'ClassExpression',
            'FunctionDeclaration',
            'FunctionExpression',
            'MethodDefinition',
            'PropertyDefinition',
            'VariableDeclaration',
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSPropertySignature',
            'TSMethodSignature',
          ],
        },
      ],

      'jsdoc/require-hyphen-before-param-description': ['error', 'always'],

      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,

          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },

          contexts: [
            'PropertyDefinition',
            'VariableDeclaration',
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSPropertySignature',
            'TSMethodSignature',
          ],

          checkConstructors: false,
        },
      ],

      'jsdoc/require-param': [
        'error',
        {
          checkDestructuredRoots: false,
        },
      ],

      'jsdoc/tag-lines': [
        'error',
        'always',
        {
          startLines: 1,
          applyToEndTag: false,
        },
      ],

      'jsdoc/sort-tags': [
        'error',
        {
          reportIntraTagGroupSpacing: false,
        },
      ],

      'jsdoc/require-returns': ['off'],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
    },
  },
]
