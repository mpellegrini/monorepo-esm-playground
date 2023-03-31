/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
  env: {
    node: true,
    es2021: true,
  },
  reportUnusedDisableDirectives: true,
  parser: '',
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: '2021',
        sourceType: 'module',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      plugins: [
        // Plugin documentation: https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
        '@typescript-eslint/eslint-plugin',
      ],
      rules: {
        // enable scope analysis rules
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: true,
          },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',

        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
    {
      files: ['**/*.test.ts'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
      extends: [
        // https://www.npmjs.com/package/eslint-plugin-jest
        'plugin:jest/recommended',
        'plugin:jest/style',
      ],
      rules: {
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        'jest/prefer-called-with': 'error',
        'jest/prefer-comparison-matcher': 'error',
        'jest/prefer-equality-matcher': 'error',
        'jest/prefer-expect-assertions': 'error',
        'jest/prefer-expect-resolves': 'error',
        'jest/prefer-hooks-in-order': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-lowercase-title': 'error',
        'jest/prefer-snapshot-hint': 'error',
        'jest/prefer-spy-on': 'error',
        'jest/prefer-strict-equal': 'error',
        'jest/prefer-todo': 'error',
        'jest/require-hook': 'error',
        'jest/require-to-throw-message': 'error',
        'jest/require-top-level-describe': 'error',
      },
    },
  ],
  plugins: ['import'],
  rules: {
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
  ignorePatterns: [
    'lib',
    'cdk.out',
    '.coverage',
    '.output',
    '.nuxt',
    'pnpm-lock.yaml',
    '__snapshots__',
    '!.github',
    '!.vscode',
    'vite.config.ts',
  ],
}

module.exports = config
