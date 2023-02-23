import { createHmac } from 'crypto'
import { env } from '$env/dynamic/private'
import {
  AuthFlowType,
  CognitoIdentityProvider,
  type ConfirmSignUpCommandInput,
  type InitiateAuthCommandInput,
  type SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import type { CognitoJwtPayload } from 'aws-jwt-verify/jwt-model'

const provider = new CognitoIdentityProvider({ region: env.AWS_COGNITO_REGION })
console.log(env.AWS_COGNITO_USER_POOL ?? '')
const cognitoJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: env.AWS_COGNITO_USER_POOL === '' ? 'us-east-1_dH4OjcjfQ' : env.AWS_COGNITO_USER_POOL,
})

export const signUp = async (
  username: string,
  password: string,
  clientMetadata?: Record<string, string>,
) => {
  const command: SignUpCommandInput = {
    ClientId: env.AWS_COGNITO_WEB_CLIENT_ID,
    Username: username,
    Password: password,
    SecretHash: hashSecret(username),
    UserAttributes: [
      {
        Name: 'email',
        Value: username,
      },
    ],
    ClientMetadata: clientMetadata,
  }

  return await provider.signUp(command)
}

export const confirmSignUp = async (
  username: string,
  confirmationCode: string,
  clientMetadata?: Record<string, string>,
) => {
  const command: ConfirmSignUpCommandInput = {
    ClientId: env.AWS_COGNITO_WEB_CLIENT_ID,
    ConfirmationCode: confirmationCode,
    Username: username,
    SecretHash: hashSecret(username),
    ClientMetadata: clientMetadata,
  }

  return await provider.confirmSignUp(command)
}

export const initiateUserPasswordAuth = async (
  username: string,
  password: string,
  clientMetadata?: Record<string, string>,
) => {
  const command: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: hashSecret(username),
    },
    ClientId: env.AWS_COGNITO_WEB_CLIENT_ID,
    ClientMetadata: clientMetadata,
  }

  return await provider.initiateAuth(command)
}

export const initiateRefreshTokenAuth = async (
  username: string,
  refreshToken: string,
  clientMetadata?: Record<string, string>,
) => {
  console.debug('username to refresh ', username)
  const command: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: hashSecret('9e038fea-83ae-42c7-ab48-3c21cfdd2124'),
    },
    ClientId: env.AWS_COGNITO_WEB_CLIENT_ID,
    ClientMetadata: clientMetadata,
  }

  return await provider.initiateAuth(command)
}
export type JwtPayload = CognitoJwtPayload
export const verifyCognitoToken = async (
  token: string,
  tokenUse: 'id' | 'access' | null,
): Promise<JwtPayload> => {
  return await cognitoJwtVerifier.verify(token, {
    clientId: env.AWS_COGNITO_WEB_CLIENT_ID ?? '',
    tokenUse,
  })
}

const hashSecret = (username: string) => {
  return createHmac('SHA256', env.AWS_COGNITO_WEB_CLIENT_SECRET)
    .update(username + env.AWS_COGNITO_WEB_CLIENT_ID)
    .digest('base64')
}
