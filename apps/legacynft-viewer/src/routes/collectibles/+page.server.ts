import { getCollectibles } from '$lib/database'
import type { PageServerLoad } from './$types'

export const load = (async () => {
  return {
    collectibles: getCollectibles(),
  }
}) satisfies PageServerLoad
