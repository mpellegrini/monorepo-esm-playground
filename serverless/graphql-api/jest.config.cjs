/** @type {import('ts-jest').JestConfigWithTsJest} */

const baseConfig = require('@toolchain/jest-config')

const packageJson = require('./package.json')

module.exports = {
  ...baseConfig,
  displayName: packageJson.name,
}
