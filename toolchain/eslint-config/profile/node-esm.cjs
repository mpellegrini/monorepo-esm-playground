const { sharedRules, sharedExtends } = require('./_commonConfig.cjs')

/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
  env: {
    node: true,
    es2022: true,
  },

  reportUnusedDisableDirectives: true,

  parser: null,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },

  extends: ['prettier'],

  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2022,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: sharedExtends,
      rules: sharedRules,
    },
    {
      files: ['*.svelte'],
      env: {
        browser: true,
      },
      parser: 'svelte-eslint-parser',
      parserOptions: {
        project: ['./tsconfig.json', './.svelte-kit/tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2022,
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.svelte'],
      },

      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [...sharedExtends, 'plugin:svelte/recommended', 'plugin:svelte/prettier'],
      rules: {
        ...sharedRules,
        'svelte/block-lang': ['error', { script: 'ts', style: ['postcss', 'css'] }],
      },
    },
  ],
  ignorePatterns: ['lib', '$houdini', '.svelte-kit'],
}

module.exports = config
