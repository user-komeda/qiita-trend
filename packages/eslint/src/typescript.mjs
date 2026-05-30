import tseslint from 'typescript-eslint'

const typescriptConfig = [
    ...tseslint.configs.strict,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylistic,
    ...tseslint.configs.stylisticTypeChecked,
    {
        rules: {
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
]

export default typescriptConfig