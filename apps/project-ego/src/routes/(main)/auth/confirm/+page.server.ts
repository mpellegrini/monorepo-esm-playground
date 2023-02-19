import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'
import { confirmSignUp } from '$lib/server/aws-cognito'

export const actions: Actions = {
  default: async ({ request }) => {
    const { code } = Object.fromEntries(await request.formData()) as Record<string, string>

    try {
      const result = await confirmSignUp('mp@mercury.fan', code)
      console.log(result)
    } catch (err) {
      console.log('Confirm Signup fail. Error: ', err)
      return fail(400, { code })
    }

    throw redirect(307, '/')
  },
}
