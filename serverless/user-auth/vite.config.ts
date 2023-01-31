/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import { baseConfig } from '@toolchain/vitest-config'

export default defineConfig({
  build: {
    sourcemap: true,
    target: 'node18',
    reportCompressedSize: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: `[name].mjs`,
      },
    },
  },
  test: {
    ...baseConfig,
  },
})
