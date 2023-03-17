'use strict'

module.exports = {
  extends: ['plugin:json-schema-validator/recommended'],
  rules: {
    'json-schema-validator/no-invalid': [
      'error',
      {
        schemas: [
          {
            fileMatch: ['.eslintrc.js', '.eslintrc.cjs'],
            schema: 'https://json.schemastore.org/eslintrc',
          },
          {
            fileMatch: ['.prettierrc.toml'],
            schema: 'https://json.schemastore.org/prettierrc',
          },
          {
            fileMatch: [
              'stylelint.config.js',
              'stylelint.config.cjs',
              '.stylelintrc.js',
              '.stylelintrc.yaml',
              '.stylelintrc.yml',
            ],
            schema: 'https://json.schemastore.org/stylelintrc',
          },
        ],
        useSchemastoreCatalog: true,
      },
    ],
  },
}
