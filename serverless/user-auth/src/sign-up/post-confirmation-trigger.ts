import type { PostConfirmationTriggerHandler } from 'aws-lambda'

import { logger } from '@packages/observability/logger'

// eslint-disable-next-line @typescript-eslint/require-await
export const handler: PostConfirmationTriggerHandler = async (event, context) => {
  const { triggerSource } = event
  if (triggerSource === 'PostConfirmation_ConfirmSignUp') {
    logger.addContext(context)
    logger.info(`Need to add user in db because ${triggerSource} was fired`, {
      event,
      context,
    })
  }

  return event
}
