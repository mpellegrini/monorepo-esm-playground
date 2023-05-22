import type { PageServerLoad } from '../.svelte-kit/types/src/routes'

export const load = (() => {
  return {
    collectibles: {},
  }
}) satisfies PageServerLoad
