// import type { APIGatewayProxyResult } from '@packages/lambda-middleware'
// import { wrapApiGatewayProxyHandler } from '@packages/lambda-middleware'
import { randomUUID } from 'crypto'

import type { PreSignUpTriggerHandler } from 'aws-lambda'

import { logger } from '@packages/observability/logger'

// export const handler = wrapApiGatewayProxyHandler(async (event, context) => {
//   const response: APIGatewayProxyResult = {
//     statusCode: 200,
//     body: {
//       message: event,
//       context: context,
//       remainingTime: context.getRemainingTimeInMillis(),
//     },
//   }
//   logger.info('Getting ready to return response')
//   return response
// })

// eslint-disable-next-line @typescript-eslint/require-await
export const handler: PreSignUpTriggerHandler = async (event, context) => {
  logger.addContext(context)
  logger.info('Getting ready to return response', { event, context, id: randomUUID() })
  return event
}
