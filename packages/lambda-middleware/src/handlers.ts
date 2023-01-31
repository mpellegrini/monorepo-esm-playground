import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpResponseSerializer from '@middy/http-response-serializer'
import httpSecurityHeaders from '@middy/http-security-headers'

import { LogLevel, injectLambdaContext, logger } from '@packages/observability/logger'
import { logMetrics, metrics } from '@packages/observability/metrics'
import { captureLambdaHandler, tracer } from '@packages/observability/tracer'

import type {
  AsyncAPIGatewayProxyHandler,
  AsyncSQSHandler,
  MiddyfiedAPIGatewayProxyHandler,
  MiddyfiedSQSHandler,
} from './types.js'

/**
 * Wrap an API Gateway V1 format proxy lambda function handler.
 *
 * This wrapper includes commonly useful middleware. You may further wrap it
 * with your own function that adds additional middleware, or just use it as
 * an example.
 *
 * @param handler async function to wrap
 * @see https://middy.js.org/#:~:text=available%20middlewares
 * @see https://www.npmjs.com/package/http-errors
 */
export const wrapApiGatewayProxyHandler = <TReqBody = unknown, TResBody = unknown>(
  handler: AsyncAPIGatewayProxyHandler<TReqBody, TResBody>,
): MiddyfiedAPIGatewayProxyHandler => {
  return middy(handler)
    .use(
      injectLambdaContext(logger, {
        logEvent: process.env['LOG_LEVEL'] === LogLevel.DEBUG,
        clearState: true,
      }),
    )
    .use(logMetrics(metrics, { captureColdStartMetric: true }))
    .use(captureLambdaHandler(tracer))
    .use(httpEventNormalizer())
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())

    .use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
        defaultContentType: 'application/json',
      }),
    )
    .use(httpCors())
    .use(httpSecurityHeaders()) as unknown as MiddyfiedAPIGatewayProxyHandler
}

export const wrapSQSHandler = <TReqBody = unknown>(
  handler: AsyncSQSHandler<TReqBody>,
): MiddyfiedSQSHandler => {
  return middy(handler)
    .use(
      injectLambdaContext(logger, {
        logEvent: process.env['LOG_LEVEL'] === LogLevel.DEBUG,
        clearState: true,
      }),
    )
    .use(logMetrics(metrics, { captureColdStartMetric: true }))
    .use(captureLambdaHandler(tracer)) as unknown as MiddyfiedSQSHandler
}
