import type { PreAuthenticationTriggerEvent } from 'aws-lambda'

import type { AsyncHandler } from '@packages/lambda-middleware'
import { wrapLambdaHandler } from '@packages/lambda-middleware'

type PreAuthenticationTriggerHandler = AsyncHandler<PreAuthenticationTriggerEvent>
// eslint-disable-next-line @typescript-eslint/require-await
const preAuthTriggerHandler: PreAuthenticationTriggerHandler = async (event, _context) => {
  return event
}

export const handler = wrapLambdaHandler(preAuthTriggerHandler)
