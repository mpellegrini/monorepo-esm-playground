'use strict'

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['@toolchain/eslint-config/profile/node-esm2'],
}
