import type { AppSyncResolverEvent } from 'aws-lambda'

import type { QueryUserByIdArgs, User } from '@packages/graphql'
import { type AsyncHandler, wrapLambdaHandler } from '@packages/lambda-middleware'

type AppSyncResolverHandler = AsyncHandler<AppSyncResolverEvent<QueryUserByIdArgs>, User>

// eslint-disable-next-line @typescript-eslint/require-await
export const appSyncResolverHandler: AppSyncResolverHandler = async (event, _context) => {
  return {
    id: event.arguments.id,
    displayName: 'tuffgong88',
  }
}

export const handler = wrapLambdaHandler(appSyncResolverHandler)
