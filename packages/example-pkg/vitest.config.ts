import { baseConfig } from '@toolchain/vitest-config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    ...baseConfig,
  },
})
