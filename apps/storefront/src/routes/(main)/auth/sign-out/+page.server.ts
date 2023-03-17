import { redirect } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load = (({ cookies, locals }) => {
  cookies.delete('idToken', { path: '/' })
  cookies.delete('refreshToken', { path: '/' })
  cookies.delete('accessToken', { path: '/' })
  cookies.delete('lastAuthUser', { path: '/' })

  locals.user = null

  throw redirect(303, '/')
}) satisfies PageServerLoad
