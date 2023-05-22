import type { PageServerLoad } from './$types'

import { getSites } from '$lib/database'

export const load = (() => {
  return {
    sites: getSites(),
  }
}) satisfies PageServerLoad
