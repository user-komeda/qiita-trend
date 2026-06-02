import js from '@eslint/js'

const baseConfig = [
    js.configs.recommended,
    {
        rules: {
            'no-console': [
                'error',
                {
                    allow: ['error'],
                },
            ],
        },
    },
]

export default baseConfig