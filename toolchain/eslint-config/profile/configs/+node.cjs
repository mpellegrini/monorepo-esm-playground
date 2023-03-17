'use strict'

module.exports = {
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      extends: ['plugin:node/recommended'],
      parserOptions: {
        ecmaFeatures: { globalReturn: true },
        ecmaVersion: 2022,
        sourceType: 'script',
      },
      rules: {
        'node/exports-style': ['error', 'module.exports'],
        'node/no-process-env': 'error',
        'node/file-extension-in-import': [
          'error',
          'always',
          { '.js': 'never', '.ts': 'never', '.tsx': 'never' },
        ],
        'node/prefer-global/buffer': 'error',
        'node/prefer-global/console': 'error',
        'node/prefer-global/process': 'error',
      },
      globals: {
        URL: 'readonly',
      },
    },
  ],
}
