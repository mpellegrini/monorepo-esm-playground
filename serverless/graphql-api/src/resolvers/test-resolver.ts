import { randomUUID } from 'crypto'

import type { QueryUserByIdArgs, User } from '@packages/graphql'
import { wrapLambdaHandler } from '@packages/lambda-middleware'
import type { AppSyncResolverHandler } from '@packages/lambda-middleware'

// eslint-disable-next-line @typescript-eslint/require-await
export const appSyncResolverHandler: AppSyncResolverHandler<QueryUserByIdArgs, User> = async (
  event,
  _context,
) => {
  return {
    id: event.arguments.id,
    displayName: 'tuffgong88',
    externalIdentifier: randomUUID(),
  }
}

export const handler = wrapLambdaHandler(appSyncResolverHandler)
