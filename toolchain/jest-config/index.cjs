/** @type {import("jest").Config} */

module.exports = {
  // An array of file extensions your modules use.
  // We recommend placing the extensions most commonly used in your project on
  // the left, so if you are using TypeScript, you may want to consider moving
  // "ts" and/or "tsx" to the beginning of the array.
  moduleFileExtensions: ['ts', 'mts', 'cts', 'tsx', 'js', 'mjs', 'cjs', 'jsx', 'json', 'node'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Indicates whether the coverage information should be collected while executing the test.
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage
  // information should be collected.
  collectCoverageFrom: ['./src/**/*.{ts,mts,cts,tsx}'],

  // The directory where Jest should output its coverage files.
  coverageDirectory: '.coverage',

  // Indicates which provider should be used to instrument code for coverage.
  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports.
  coverageReporters: ['clover', 'json', 'lcov', 'text'],

  // Make calling deprecated APIs throw helpful error messages.
  errorOnDeprecated: true,

  // Jest now ships with a reporter to be used on GitHub Actions, which will
  // use annotations to print test errors inline
  // https://jestjs.io/blog/2022/04/25/jest-28#github-actions-reporter
  reporters: ['default', 'github-actions'],

  // Automatically reset mock state before every test.
  // This will lead to any mocks having their fake implementations removed
  // but does not restore their initial implementation.
  resetMocks: true,

  // Automatically restore mock state and implementation before every test.
  restoreMocks: true,

  // "Adding '<rootDir>/src' here enables src/__mocks__ to be used for mocking Node.js system modules
  roots: ['<rootDir>/src'],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['dotenv/config'],

  // The glob patterns Jest uses to detect test files.
  testMatch: ['**/*.test.ts'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
            dynamicImport: false,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    ],
  },

  // list any other file extensions that should run with native ESM
  extensionsToTreatAsEsm: ['.ts'],
}
