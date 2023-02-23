import type { PreSignUpTriggerEvent } from 'aws-lambda'

import { type AsyncHandler, wrapLambdaHandler } from '@packages/lambda-middleware'

type PreSignUpTriggerHandler = AsyncHandler<PreSignUpTriggerEvent>

// eslint-disable-next-line @typescript-eslint/require-await
export const preSignUpTriggerHandler: PreSignUpTriggerHandler = async (event, _context) => {
  return event
}
export const handler = wrapLambdaHandler(preSignUpTriggerHandler)
