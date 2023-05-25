import type { PageServerLoad } from './$types'

import { getCollectibleById, getCollectibleByIdCount } from '$lib/database'

export const load = (({ params }) => {
  const dropId = params.id
  const id = dropId.split('/')[0]

  return {
    totalItems: getCollectibleByIdCount(id),
    collectibles: getCollectibleById(id),
  }
}) satisfies PageServerLoad
