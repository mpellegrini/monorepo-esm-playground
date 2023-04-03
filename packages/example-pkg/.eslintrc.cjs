require('@toolchain/eslint-config/patch/modern-module-resolution')

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['@toolchain/eslint-config'],
}
