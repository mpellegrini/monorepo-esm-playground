// @ts-check

/** @type {import("@graphql-codegen/cli").CodegenConfig} */
const config = {
  overwrite: true,

  schema: ['./src/schemas/**/*.graphql', './src/_aws-appsync.graphql'],

  documents: ['./src/documents/**/*.graphql'],

  emitLegacyCommonJSImports: false,

  generates: {
    'src/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        enumsAsTypes: true,
        strictScalars: true,
        useTypeImports: true,
        scalars: {
          AWSJSON: 'string',
          AWSDate: 'string',
          AWSTime: 'string',
          AWSDateTime: 'string',
          AWSTimestamp: 'number',
          AWSEmail: 'string',
          AWSURL: 'string',
          AWSPhone: 'string',
          AWSIPAddress: 'string',
        },
      },
    },
  },
}

module.exports = config
