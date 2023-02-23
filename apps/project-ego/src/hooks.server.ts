import type { Handle } from '@sveltejs/kit'
import { verifyCognitoToken } from '$lib/server/aws-cognito'
import { sequence } from '@sveltejs/kit/hooks'
import { JwtExpiredError } from 'aws-jwt-verify/error'

const auth: Handle = async ({ event, resolve }) => {
  console.log('in hooks.server.ts')

  const idToken = event.cookies.get('idToken')
  if (idToken) {
    try {
      const payload = await verifyCognitoToken(idToken, 'id')
      console.log('Hg User Id ', payload.sub)
      event.locals.userId = payload.sub
    } catch (err) {
      if (err instanceof JwtExpiredError) {
      }
      console.log(err)
    }
  }
  return resolve(event)
}

const logger: Handle = async ({ event, resolve }) => {
  const requestStartTime = Date.now()
  const response = await resolve(event)

  console.debug(
    new Date(requestStartTime).toISOString(),
    event.request.method,
    event.url.pathname,
    `(${Date.now() - requestStartTime}ms)`,
    response.status,
  )

  return response
}

// export const handle: Handle = sequence(logger, auth.handleHooks());
export const handle: Handle = sequence(logger, auth)
