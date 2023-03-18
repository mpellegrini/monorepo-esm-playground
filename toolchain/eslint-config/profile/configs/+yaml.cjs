'use strict'

module.exports = {
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      extends: ['plugin:yml/standard', require.resolve('./json-schema/config.cjs')],
      rules: {
        'yml/require-string-key': 'error',
      },
    },
  ],
}
