import type { PostAuthenticationTriggerEvent } from 'aws-lambda'

import { type AsyncHandler, wrapLambdaHandler } from '@packages/lambda-middleware'

type PostAuthenticationTriggerHandler = AsyncHandler<PostAuthenticationTriggerEvent>

// eslint-disable-next-line @typescript-eslint/require-await
const postAuthTriggerHandler: PostAuthenticationTriggerHandler = async (event, _context) => {
  return event
}

export const handler = wrapLambdaHandler(postAuthTriggerHandler)
