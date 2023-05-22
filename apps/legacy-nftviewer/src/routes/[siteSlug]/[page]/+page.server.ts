import type { PageServerLoad } from './$types'

import { getCollectiblesBySite, getCollectiblesBySiteCount } from '$lib/database'

export const load = (({ params }) => {
  const page = Number(params.page)
  const siteSlug = params.siteSlug

  const limit = 12
  const offset = (page - 1) * limit

  return {
    totalItems: getCollectiblesBySiteCount(siteSlug),
    pageSize: limit,
    collectibles: getCollectiblesBySite(siteSlug, offset, limit),
  }
}) satisfies PageServerLoad
