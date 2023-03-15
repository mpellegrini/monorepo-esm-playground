import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'

import { signUp } from '$lib/server/aws-cognito'

export const actions = {
  default: async ({ request, url }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>
    const { username, password } = formData

    try {
      const result = await signUp(username, password)
      console.log(result)
    } catch (err) {
      console.error(err)
      return fail(400, formData)
    }

    throw redirect(303, `${url.pathname}/confirm?username=${encodeURIComponent(username)}`)
  },
} satisfies Actions
