import type { UserMigrationTriggerEvent } from 'aws-lambda'

import { wrapLambdaHandler } from '@packages/lambda-middleware'
import type { AsyncHandler } from '@packages/lambda-middleware'
import { logger } from '@packages/observability/logger'

type UserMigrationTriggerHandler = AsyncHandler<UserMigrationTriggerEvent>
// eslint-disable-next-line @typescript-eslint/require-await
export const userMigrationTriggerHandler: UserMigrationTriggerHandler = async (event, context) => {
  logger.info('Getting ready to return response', { event, context })
  return event
}

export const handler = wrapLambdaHandler(userMigrationTriggerHandler)
