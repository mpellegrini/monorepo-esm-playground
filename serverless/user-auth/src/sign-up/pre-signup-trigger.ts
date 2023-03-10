import { type PreSignUpTriggerHandler, wrapLambdaHandler } from '@packages/lambda-middleware'

// eslint-disable-next-line @typescript-eslint/require-await
export const preSignUpTriggerHandler: PreSignUpTriggerHandler = async (event, _context) => {
  return event
}
export const handler = wrapLambdaHandler(preSignUpTriggerHandler)
