import type { PageServerLoad } from './$types'

import { getCollectibles } from '$lib/database'

export const load = (() => {
  return {
    collectibles: getCollectibles(),
  }
}) satisfies PageServerLoad
