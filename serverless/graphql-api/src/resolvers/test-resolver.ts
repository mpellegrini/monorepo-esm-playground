import { randomUUID } from 'crypto'

import type { AppSyncResolverHandler } from 'aws-lambda'

import type { Site } from '@packages/graphql-schema'

// eslint-disable-next-line @typescript-eslint/require-await
export const handler: AppSyncResolverHandler<undefined, Site> = async (_event, _context) => {
  return {
    id: randomUUID(),
    name: '',
    key: '',
  }
}
