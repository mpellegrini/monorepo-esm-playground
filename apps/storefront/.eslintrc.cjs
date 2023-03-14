module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-unresolved': 'off', // This rule doesn't play well with SvelteKit
  },
  extends: ['@toolchain/eslint-config/profile/node-esm'],
}
