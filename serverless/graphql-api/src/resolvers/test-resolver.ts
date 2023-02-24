import { randomUUID } from 'crypto'

import type { AppSyncResolverEvent } from 'aws-lambda'

import type { Site } from '@packages/graphql-schema'
import { type AsyncHandler, wrapLambdaHandler } from '@packages/lambda-middleware'

type AppSyncResolverHandler = AsyncHandler<AppSyncResolverEvent<unknown>, Array<Site>>

// eslint-disable-next-line @typescript-eslint/require-await
export const appSyncResolverHandler: AppSyncResolverHandler = async (_event, _context) => {
  return [
    {
      id: randomUUID(),
      key: 'ku',
      name: 'Rock Chalk',
    },
  ]
}

export const handler = wrapLambdaHandler(appSyncResolverHandler)
