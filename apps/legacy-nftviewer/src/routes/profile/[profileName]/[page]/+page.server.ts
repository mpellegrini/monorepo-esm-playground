import type { PageServerLoad } from './$types'

import { getCollectiblesByProfile, getCollectiblesByProfileCount } from '$lib/database'

export const load = (({ params }) => {
  const { profileName, page } = params

  const limit = 12
  const offset = (+page - 1) * limit
  return {
    totalItems: getCollectiblesByProfileCount(profileName),
    pageSize: limit,
    collectibles: getCollectiblesByProfile(profileName, offset, limit),
  }
}) satisfies PageServerLoad
