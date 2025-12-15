// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    // global ignores
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'public/js/templates.precompiled.js',
            'public/assets/**',
        ],
    },

    // ESLint recommended rules
    js.configs.recommended,

    // Prettier as an ESLint rule + disables conflicting formatting rules
    prettierRecommended,

    // your project rules
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                Handlebars: 'readonly',
            },
        },
        rules: {
            semi: ['error', 'always'],
        },
    },
];
