/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
  extends: [
    require.resolve('./configs/recommended.cjs'),
    require.resolve('./configs/+node.cjs'),
    require.resolve('./configs/+typescript.cjs'),
    require.resolve('./configs/+package-json.cjs'),
    require.resolve('./configs/+json.cjs'),
    require.resolve('./configs/+yaml.cjs'),
    'prettier',
  ],
  ignorePatterns: ['lib', '.vercel', '.svelte-kit'],
}
module.exports = config
