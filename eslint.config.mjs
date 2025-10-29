import js from '@eslint/js';
import globals from 'globals';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        ignores: [
            'public/js/templates.precompiled.js',
            'dist/',
            'node_modules/',
        ],
        plugins: { js },
        extends: ['js/recommended', pluginPrettierRecommended],
        languageOptions: {
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
]);
