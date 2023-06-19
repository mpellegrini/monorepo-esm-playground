import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'
import { existsSync, writeFileSync, mkdirSync } from 'node:fs'

const loadedFiles = loadFilesSync(new URL('./src/schemas', import.meta.url).pathname, {
  extensions: ['graphql'],
})

const typeDefs = mergeTypeDefs(loadedFiles)
const printedTypeDefs = print(typeDefs)

if (!existsSync('lib')) {
  mkdirSync('lib')
}

writeFileSync(new URL('./lib/schema.merged.graphql', import.meta.url).pathname, printedTypeDefs)
