import { loadFilesSync } from '@graphql-tools/load-files'
import { join } from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'
import {existsSync, writeFileSync, mkdirSync} from 'fs'

const loadedFiles = loadFilesSync(join(__dirname, 'src/schemas'), {
  extensions: ['graphql'],
})

const typeDefs = mergeTypeDefs(loadedFiles)
const printedTypeDefs = print(typeDefs)

if (!existsSync('lib')) {
  mkdirSync('lib')
}
writeFileSync(join(__dirname, 'lib/schema.merged.graphql'), printedTypeDefs)

