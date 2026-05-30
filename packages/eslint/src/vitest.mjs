import vitest from '@vitest/eslint-plugin'

const vitestConfig = [
    {
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
        rules: {
            ...vitest.configs.all.rules,
            'vitest/consistent-test-it': ['error', { fn: 'test' }],
            'vitest/no-hooks': [
                'error',
                {
                    allow: ['beforeEach'],
                },
            ],
            'max-lines-per-function': ['error', 100],
            'max-params': ['error', 4],
        },
    },
]

export default vitestConfig