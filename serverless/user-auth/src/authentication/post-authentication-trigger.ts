import {
  type PostAuthenticationTriggerHandler,
  wrapLambdaHandler,
} from '@packages/lambda-middleware'

// eslint-disable-next-line @typescript-eslint/require-await
const postAuthTriggerHandler: PostAuthenticationTriggerHandler = async (event, _context) => {
  return event
}

export const handler = wrapLambdaHandler(postAuthTriggerHandler)
