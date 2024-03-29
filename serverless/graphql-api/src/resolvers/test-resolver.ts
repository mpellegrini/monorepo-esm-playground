import { randomUUID } from 'crypto'

import type { QueryUserByIdArgs, User } from '@packages/graphql'
import { type AppSyncResolverHandler, wrapLambdaHandler } from '@packages/lambda-middleware'

const appSyncResolverHandler: AppSyncResolverHandler<QueryUserByIdArgs, User> = async (
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
