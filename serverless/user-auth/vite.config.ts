/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import { baseConfig } from '@toolchain/vitest-config'
import { builtinModules } from 'node:module'

const nodePrefixedBuiltinModules = builtinModules.map((module) => {
  return `node:${module}`
})

console.log(nodePrefixedBuiltinModules)

export default defineConfig({
  build: {
    sourcemap: true,
    target: 'node18',
    reportCompressedSize: false,
    lib: {
      entry: resolve(__dirname, 'src/stack/index.ts'),
      formats: ['es'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: nodePrefixedBuiltinModules,
    },
  },
  test: {
    ...baseConfig,
  },
})
