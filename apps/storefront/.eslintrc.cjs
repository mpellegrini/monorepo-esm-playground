module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-unresolved': 'off',
  },
  extends: ['@toolchain/eslint-config/profile/node-esm'],
}
