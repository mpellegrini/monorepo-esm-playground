const path = require('path')

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, '.svelte-kit/tsconfig.json'),
      },
    },
  },
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['\\$env\\/*'],
      },
    ],
  },
  ignorePatterns: ['*.cjs'],
  extends: ['@toolchain/eslint-config/profile/node'],
}
