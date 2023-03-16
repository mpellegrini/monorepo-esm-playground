/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
  extends: [
    require.resolve('./configs/recommended.cjs'),
    require.resolve('./configs/+node.cjs'),
    require.resolve('./configs/+typescript.cjs'),
  ],
  ignorePatterns: ['lib', 'vitest-config.ts'],
}

module.exports = config
