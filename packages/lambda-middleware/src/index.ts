import * as process from 'process'

import type { MiddyfiedHandler } from '@middy/core'
import middy from '@middy/core'

import type {
  AppSyncResolverEvent,
  Context as LambdaContext,
  PostAuthenticationTriggerEvent,
  PostConfirmationTriggerEvent,
  PreAuthenticationTriggerEvent,
  PreSignUpTriggerEvent,
  UserMigrationTriggerEvent,
} from 'aws-lambda'

import { LOG_LEVEL, injectLambdaContext, logger } from '@packages/observability/logger'
import { logMetrics, metrics } from '@packages/observability/metrics'
import { captureLambdaHandler, tracer } from '@packages/observability/tracer'

const initMiddy = (): MiddyfiedHandler => {
  return middy()
    .use(
      injectLambdaContext(logger, {
        logEvent: process.env['LOG_LEVEL'] === LOG_LEVEL.DEBUG,
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

export type { Context } from 'aws-lambda'

export type AsyncHandler<TEvent = unknown, TResult = TEvent> = (
  event: TEvent,
  context: LambdaContext,
) => Promise<TResult>

export const wrapLambdaHandler = <TReqBody = unknown, TResBody = TReqBody>(
  handler: AsyncHandler<TReqBody, TResBody>,
): MiddyfiedHandler => {
  return initMiddy().handler(handler)
}

// Cognito Authentication Handlers
export type PreAuthenticationTriggerHandler = AsyncHandler<PreAuthenticationTriggerEvent>
export type PostAuthenticationTriggerHandler = AsyncHandler<PostAuthenticationTriggerEvent>

// Cognito Sign-up Handlers
export type PreSignUpTriggerHandler = AsyncHandler<PreSignUpTriggerEvent>
export type PostConfirmationTriggerHandler = AsyncHandler<PostConfirmationTriggerEvent>
export type UserMigrationTriggerHandler = AsyncHandler<UserMigrationTriggerEvent>

export type AppSyncResolverHandler<
  TArgs = unknown,
  TResult = unknown,
  TSource = Record<string, unknown> | null,
> = AsyncHandler<AppSyncResolverEvent<TArgs, TSource>, TResult>
