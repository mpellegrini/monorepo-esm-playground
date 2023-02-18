import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  console.log('in hooks.server.ts')
  return resolve(event)
}
