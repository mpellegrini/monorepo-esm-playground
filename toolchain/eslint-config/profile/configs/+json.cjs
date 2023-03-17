'use strict'

module.exports = {
  overrides: [
    {
      files: ['*.json', '*.json5'],
      extends: ['plugin:jsonc/recommended-with-jsonc', require.resolve('./json-schema/config.cjs')],
      rules: {
        'jsonc/auto': 'error',
      },
    },
  ],
}
