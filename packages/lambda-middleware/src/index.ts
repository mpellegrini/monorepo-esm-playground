import * as process from 'process'

import type { MiddyfiedHandler } from '@middy/core'
import middy from '@middy/core'

import type { Context as LambdaContext } from 'aws-lambda'

import { LogLevel, injectLambdaContext, logger } from '@packages/observability/logger'
import { logMetrics, metrics } from '@packages/observability/metrics'
import { captureLambdaHandler, tracer } from '@packages/observability/tracer'

const initMiddy = (): MiddyfiedHandler => {
  return middy()
    .use(
      injectLambdaContext(logger, {
        logEvent: process.env['LOG_LEVEL'] === LogLevel.DEBUG,
        clearState: true,
      }),
    )
    .use(
      logMetrics(metrics, {
        captureColdStartMetric: true,
      }),
    )
    .use(captureLambdaHandler(tracer))
}

export type AsyncHandler<TEvent = unknown, TResult = TEvent> = (
  event: TEvent,
  context: LambdaContext,
) => Promise<TResult>

export const wrapLambdaHandler = <TReqBody = unknown, TResBody = TReqBody>(
  handler: AsyncHandler<TReqBody, TResBody>,
): MiddyfiedHandler => {
  return initMiddy().handler(handler)
}
