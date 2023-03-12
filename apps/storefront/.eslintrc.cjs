module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['*.cjs'],
  extends: ['@toolchain/eslint-config/profile/node'],
}
