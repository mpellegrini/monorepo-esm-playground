import type { Handle } from '@sveltejs/kit'
import { verifyCognitoToken } from '$lib/server/aws-cognito'
import { sequence } from '@sveltejs/kit/hooks'
import { JwtExpiredError } from 'aws-jwt-verify/error'
import { initiateRefreshTokenAuth } from './lib/server/aws-cognito'

const auth: Handle = async ({ event, resolve }) => {
  console.log('in hooks.server.ts')

  const idToken = event.cookies.get('idToken')
  if (idToken) {
    try {
      const payload = await verifyCognitoToken(idToken, 'id')
      event.locals.userId = payload.sub
    } catch (err) {
      if (err instanceof JwtExpiredError) {
        const lastAuthUser = event.cookies.get('lastAuthUser')
        const refreshToken = event.cookies.get('refreshToken')
        if (lastAuthUser && refreshToken) {
          try {
            const result = await initiateRefreshTokenAuth(lastAuthUser!, refreshToken!)
            if (result.AuthenticationResult) {
              const { IdToken: idToken, AccessToken: accessToken } = result.AuthenticationResult

              if (idToken && accessToken) {
                event.cookies.set('idToken', idToken, {
                  httpOnly: true,
                  path: '/',
                  sameSite: 'strict',
                })
              }

              event.locals.userId = lastAuthUser
            }
          } catch (err) {
            console.error(JSON.stringify(err))
          }
        }
      }
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
