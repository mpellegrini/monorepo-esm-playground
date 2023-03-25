import { randomUUID } from 'crypto'

import { type QueryUserByIdArgs, type User } from '@packages/graphql'
import { wrapLambdaHandler } from '@packages/lambda-middleware'
import type { AppSyncResolverHandler } from '@packages/lambda-middleware'

export const appSyncResolverHandler: AppSyncResolverHandler<QueryUserByIdArgs, User> = async (
  event,
  _context,
  // eslint-disable-next-line @typescript-eslint/require-await
) => {
  const result: User = {
    id: event.arguments.id,
    displayName: 'tuffgong88',
    externalIdentifier: randomUUID(),
    role: 'ADMIN',
  }

  return result
}

export const handler = wrapLambdaHandler(appSyncResolverHandler)
