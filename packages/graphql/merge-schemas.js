import { loadFilesSync } from '@graphql-tools/load-files'
import { join, dirname } from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'
import { existsSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const loadedFiles = loadFilesSync(join(__dirname, 'src/schemas'), {
  extensions: ['graphql'],
})

const typeDefs = mergeTypeDefs(loadedFiles)
const printedTypeDefs = print(typeDefs)

if (!existsSync('lib')) {
  mkdirSync('lib')
}

writeFileSync(join(__dirname, 'lib/schema.merged.graphql'), printedTypeDefs)
