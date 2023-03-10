import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = ({ cookies, locals }) => {
  cookies.delete('idToken', { path: '/' })
  cookies.delete('refreshToken', { path: '/' })
  cookies.delete('accessToken', { path: '/' })
  cookies.delete('lastAuthUser', { path: '/' })

  locals.userId = null

  throw redirect(303, '/')
}
