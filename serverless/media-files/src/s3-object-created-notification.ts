import {
  type S3NotificationEventBridgeHandler,
  type S3ObjectCreatedNotificationEvent,
  wrapLambdaHandler,
} from '@packages/lambda-middleware'

const s3ObjectCreatedHandler: S3NotificationEventBridgeHandler<
  S3ObjectCreatedNotificationEvent
  // eslint-disable-next-line @typescript-eslint/require-await
> = async () => {
  return
}

export const handler = wrapLambdaHandler(s3ObjectCreatedHandler)
