import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'

const importConfig = [
    importPlugin.flatConfigs.recommended,
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            'unused-imports/no-unused-imports': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'sibling', 'index', 'object', 'type'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                    'newlines-between': 'always',
                },
            ],
        },
    },
]

export default importConfig