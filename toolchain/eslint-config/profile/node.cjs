/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
  env: {
    node: true,
    es2022: true,
  },

  // report unused eslint-disable comments
  reportUnusedDisableDirectives: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: '2022',
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'prettier',
  ],

  overrides: [
    {
      files: ['**/*.test.ts'],
      env: {
        'vitest-globals/env': true,
      },
      plugins: ['vitest'],
      extends: ['plugin:vitest-globals/recommended'],
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

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },

  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],

    '@typescript-eslint/no-shadow': 'error',

    '@typescript-eslint/no-redeclare': 'error',

    '@typescript-eslint/ban-types': 'error',

    '@typescript-eslint/no-explicit-any': 'error',

    '@typescript-eslint/no-non-null-assertion': 'error',

    '@typescript-eslint/explicit-module-boundary-types': 'error',

    '@typescript-eslint/explicit-function-return-type': 'error',

    '@typescript-eslint/consistent-type-imports': 'error',

    'eslint-comments/no-unused-disable': 'error',

    'no-restricted-imports': [
      'error',
      {
        paths: ['*'],
        patterns: ['**/lib/*', '**/src'],
      },
    ],

    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          { pattern: '@packages/**', group: 'internal' },
          { pattern: '@serverless/**', group: 'internal' },
        ],
        'newlines-between': 'always-and-inside-groups',
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}

module.exports = config
