import {
  type PreAuthenticationTriggerHandler,
  wrapLambdaHandler,
} from '@packages/lambda-middleware'

// eslint-disable-next-line @typescript-eslint/require-await
const preAuthTriggerHandler: PreAuthenticationTriggerHandler = async (event, _context) => {
  return event
}

export const handler = wrapLambdaHandler(preAuthTriggerHandler)
