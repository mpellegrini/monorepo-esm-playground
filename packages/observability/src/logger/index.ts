import { Logger } from '@aws-lambda-powertools/logger'

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const

export const logger = new Logger({
  persistentLogAttributes: {
    aws_account_id: process.env['AWS_ACCOUNT_ID'] || 'N/A',
    aws_region: process.env['AWS_REGION'] || 'N/A',
  },
})

export { injectLambdaContext } from '@aws-lambda-powertools/logger'
