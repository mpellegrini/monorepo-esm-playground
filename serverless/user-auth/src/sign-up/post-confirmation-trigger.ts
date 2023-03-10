import { randomUUID } from 'crypto'

import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

import { type PostConfirmationTriggerHandler, wrapLambdaHandler } from '@packages/lambda-middleware'
import { logger } from '@packages/observability/logger'

const provider = new CognitoIdentityProvider({ region: 'us-east-1' })

export const postConfirmationTriggerEvent: PostConfirmationTriggerHandler = async (
  event,
  context,
) => {
  const { triggerSource } = event
  if (triggerSource === 'PostConfirmation_ConfirmSignUp') {
    try {
      const result = await provider.adminUpdateUserAttributes({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        UserAttributes: [
          {
            Name: 'custom:internalIdentifier',
            Value: randomUUID(),
          },
        ],
      })
      logger.info('adminUpdateUserAttributes was successful', { result })
    } catch (err) {
      logger.warn('adminUpdateUserAttributes failed', { err })
    }

    logger.info(`Need to add user in db because ${triggerSource} was fired`, {
      event,
      context,
    })
  }

  return event
}

export const handler = wrapLambdaHandler(postConfirmationTriggerEvent)
