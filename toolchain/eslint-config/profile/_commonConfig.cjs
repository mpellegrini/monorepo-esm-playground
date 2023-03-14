const sharedExtends = [
  'eslint:recommended',
  'plugin:eslint-comments/recommended',
  'plugin:import/recommended',
  'plugin:promise/recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:import/typescript',
]

const sharedRules = {
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
}

module.exports = { sharedExtends, sharedRules }
