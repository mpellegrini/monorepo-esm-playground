import type { APIGatewayProxyResult } from '@packages/lambda-middleware'
import { wrapApiGatewayProxyHandler } from '@packages/lambda-middleware'
import { logger } from '@packages/observability/logger'

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = wrapApiGatewayProxyHandler(async (event, context) => {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: {
      message: event,
      context: context,
      remainingTime: context.getRemainingTimeInMillis(),
    },
  }
  logger.info('Getting ready to return response')
  return response
})
