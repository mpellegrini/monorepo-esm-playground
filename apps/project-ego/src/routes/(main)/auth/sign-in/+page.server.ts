import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'
import { initiateAuth } from '$lib/server/aws-cognito'

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>
    const { username, password } = formData

    try {
      const result = await initiateAuth(username, password)
      console.log(JSON.stringify(result))
    } catch (err) {
      console.error(JSON.stringify(err))
      return fail(400, formData)
    }

    throw redirect(307, '/')
  },
}
