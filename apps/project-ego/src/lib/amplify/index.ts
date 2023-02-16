import { Amplify } from '@aws-amplify/core'
import { env } from '$env/dynamic/public'
import { browser } from '$app/environment'
import type { AmplifyConfig } from '@aws-amplify/core/lib-esm/types'

const config: AmplifyConfig = {
  ssr: true,
  Auth: {
    region: env.PUBLIC_AMPLIFY_AUTH_REGION,
    userPoolId: env.PUBLIC_AMPLIFY_AUTH_USER_POOL_ID,
    userPoolWebClientId: env.PUBLIC_AMPLIFY_AUTH_WEB_CLIENT_ID,

    ...(browser && {
      cookieStorage: {
        domain: window.location.hostname,
        path: '/',
        expires: 5,
        sameSite: 'lax',
        secure: window.location.protocol === 'https:',
      },
    }),

    // (optional) - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',

    // (optional) - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    clientMetadata: { myCustomKey: 'myCustomValue' },
  },
  API: {},
}
export const initializeAmplify = async () => {
  console.log(
    `initializeAmplify on ${
      browser ? 'browser' : 'server'
    } with the following config \n ${JSON.stringify(config)}`,
  )
  Amplify.configure(config)
}
