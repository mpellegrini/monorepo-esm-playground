'use strict'

const base = require('./ts/base-config.cjs')
module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '.tsx'],
      parser: require.resolve('@typescript-eslint/parser'),
      ...base,
    },
    {
      files: [
        'test/**/*.ts',
        'tests/**/*.ts',
        'test/**/*.mts',
        'tests/**/*.mts',
        'test/**/*.cts',
        'tests/**/*.cts',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}
