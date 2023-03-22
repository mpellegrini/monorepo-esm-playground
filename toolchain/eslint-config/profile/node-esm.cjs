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
      overrides: [
        {
          files: ['*.test.ts'],
          plugins: ['vitest-globals', 'vitest'],
          env: {
            'vitest-globals/env': true,
            browser: true,
          },
          rules: {
            // https://github.com/veritem/eslint-plugin-vitest#list-of-supported-rules
            'vitest/consistent-test-filename': ['error'],
            'vitest/consistent-test-it': ['error', { fn: 'it' }],
            'vitest/expect-expect': ['error'],
            'vitest/max-expects': ['error'],
            'vitest/max-nested-describe': ['error', { max: 3 }],
            'vitest/no-alias-methods': ['error'],
            'vitest/no-commented-out-tests': ['error'],
            'vitest/no-conditional-expect': ['error'],
            'vitest/no-conditional-in-test': ['error'],
            'vitest/no-conditional-tests': ['error'],
            'vitest/no-disabled-tests': ['error'],
            'vitest/no-done-callback': ['error'],
            'vitest/no-duplicate-hooks': ['error'],
            'vitest/no-focused-tests': ['error'],
            'vitest/no-hooks': ['error'],
            'vitest/no-identical-title': ['error'],
            'vitest/no-interpolation-in-snapshots': ['error'],
            'vitest/no-large-snapshots': ['error'],
            'vitest/no-mocks-import': ['error'],
            'vitest/no-restricted-matchers': ['error'],
            'vitest/no-restricted-vi-methods': ['error'],
            'vitest/no-skipped-tests': ['error'],
            'vitest/no-standalone-expect': ['error'],
            'vitest/no-test-prefixes': ['error'],
            'vitest/no-test-return-statement': ['error'],
            'vitest/prefer-called-with': ['error'],
            'vitest/prefer-lowercase-title': ['error'],
            'vitest/prefer-to-be': ['error'],
            'vitest/valid-title': ['error'],
          },
        },
      ],
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
  ignorePatterns: ['vitest.config.ts', 'lib'],
}

module.exports = config
