/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */

'use strict'

module.exports = {
  overrides: [
    {
      files: ['package.json'],
      extends: ['plugin:node-dependencies/recommended', require.resolve('./+json.cjs')],
      rules: {
        'node-dependencies/absolute-version': 'error',
      },
    },
  ],
}
