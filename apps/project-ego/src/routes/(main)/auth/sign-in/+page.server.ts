import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'
import { initiateUserPasswordAuth } from '$lib/server/aws-cognito'

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>
    const { username, password } = formData

    try {
      const result = await initiateUserPasswordAuth(username, password)
      console.log(JSON.stringify(result))

      if (result.AuthenticationResult) {
        const {
          IdToken: idToken,
          RefreshToken: refreshToken,
          AccessToken: accessToken,
        } = result.AuthenticationResult

        if (idToken && refreshToken && accessToken) {
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
        }
      }
    } catch (err) {
      console.error(JSON.stringify(err))
      return fail(400, formData)
    }

    throw redirect(307, '/')
  },
}
