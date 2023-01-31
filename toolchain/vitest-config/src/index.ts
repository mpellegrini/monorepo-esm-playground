import type { InlineConfig } from 'vitest'

export const baseConfig: InlineConfig = {
  globals: true,
  coverage: {
    enabled: true,
    provider: 'c8',
    all: true,
    reportsDirectory: '.coverage',
    reporter: ['text', 'json', 'html'],
  },
}
