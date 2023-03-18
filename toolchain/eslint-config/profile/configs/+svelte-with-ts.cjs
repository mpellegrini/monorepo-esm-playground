'use strict'

const base = require('./ts/base-config')
module.exports = {
  overrides: [
    {
      files: ['*.svelte'],
      extends: [require.resolve('./+svelte'), ...base.extends],
      ...base,
      parserOptions: {
        ...base.parserOptions,
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.svelte'],
      },
    },
  ],
}
