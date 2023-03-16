'use strict'

module.exports = {
  plugins: ['regexp'],
  extends: ['plugin:regexp/recommended'],
  rules: {
    // https://ota-meshi.github.io/eslint-plugin-regexp/rules/letter-case.html
    'regexp/letter-case': 'error',
    // https://ota-meshi.github.io/eslint-plugin-regexp/rules/prefer-quantifier.html
    'regexp/prefer-quantifier': 'error',
    // https://ota-meshi.github.io/eslint-plugin-regexp/rules/prefer-regexp-exec.html
    'regexp/prefer-regexp-exec': 'error',
    // https://ota-meshi.github.io/eslint-plugin-regexp/rules/prefer-regexp-test.html
    'regexp/prefer-regexp-test': 'error',
    // https://ota-meshi.github.io/eslint-plugin-regexp/rules/sort-character-class-elements.html
    'regexp/sort-character-class-elements': 'error',
  },
}
