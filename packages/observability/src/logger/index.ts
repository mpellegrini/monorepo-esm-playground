import { Logger } from '@aws-lambda-powertools/logger'

export const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const

export const logger = new Logger({})

export { injectLambdaContext } from '@aws-lambda-powertools/logger'
