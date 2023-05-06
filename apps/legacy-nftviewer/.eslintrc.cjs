'use strict'

require('@toolchain/eslint-config/patch/modern-module-resolution')

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-unresolved': 'off', // This rule doesn't play well with SvelteKit
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
  },
  extends: ['@toolchain/eslint-config/profile/node-esm'],
}
