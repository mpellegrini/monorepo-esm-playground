import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'

import { initiateUserPasswordAuth } from '$lib/server/aws-cognito'

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>
    const { username, password } = formData

    try {
      const result = await initiateUserPasswordAuth(username, password)

      if (result.AuthenticationResult) {
        const { IdToken: idToken, RefreshToken: refreshToken } = result.AuthenticationResult

        if (idToken && refreshToken) {
          cookies.set('idToken', idToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
          })

          cookies.set(`refreshToken`, refreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
          })

          cookies.set(`lastAuthUser`, '9e038fea-83ae-42c7-ab48-3c21cfdd2124', {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
          })
        }
      }
    } catch (err) {
      console.error(JSON.stringify(err))
      return fail(400, formData)
    }

    throw redirect(303, '/')
  },
} satisfies Actions
