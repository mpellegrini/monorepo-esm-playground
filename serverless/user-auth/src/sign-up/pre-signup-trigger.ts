import type { PreSignUpTriggerEvent } from 'aws-lambda'

import { type AsyncHandler, wrapLambdaHandler } from '@packages/lambda-middleware'
import { logger } from '@packages/observability/logger'

type PreSignUpTriggerHandler = AsyncHandler<PreSignUpTriggerEvent>

// eslint-disable-next-line @typescript-eslint/require-await
export const preSignUpTriggerHandler: PreSignUpTriggerHandler = async (event, context) => {
  logger.info('Getting ready to return response', { event, context })
  return event
}
export const handler = wrapLambdaHandler(preSignUpTriggerHandler)
