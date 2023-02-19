import { createHmac } from 'crypto'
import { env } from '$env/dynamic/private'
import {
  AuthFlowType,
  CognitoIdentityProvider,
  type ConfirmSignUpCommandInput,
  type InitiateAuthCommandInput,
  type SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider'

const provider = new CognitoIdentityProvider({ region: env.AWS_COGNITO_REGION })

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

export const initiateAuth = async (
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

const hashSecret = (username: string) => {
  return createHmac('SHA256', env.AWS_COGNITO_WEB_CLIENT_SECRET)
    .update(username + env.AWS_COGNITO_WEB_CLIENT_ID)
    .digest('base64')
}
