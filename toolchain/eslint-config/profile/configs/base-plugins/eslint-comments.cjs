'use strict'

module.exports = {
  extends: ['plugin:eslint-comments/recommended'],
  rules: {
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
    'eslint-comments/require-description': 'error',
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html
    'eslint-comments/no-unused-disable': 'error',
  },
}
