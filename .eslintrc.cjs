/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    // add more generic rule sets here, such as:
    'eslint:recommended',
    'plugin:svelte/base',
    'plugin:svelte/recommended',
    'plugin:svelte/prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    extraFileExtensions: ['.svelte'],
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  },
  plugins: ['@typescript-eslint', 'sort-destructure-keys', 'sonarjs'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
}
