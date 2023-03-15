import type { LayoutServerLoad } from './$types'

export const load = (({ locals }) => {
  return {
    user: locals.userId,
  } as { user: string }
}) satisfies LayoutServerLoad
