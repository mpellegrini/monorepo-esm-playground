import {
  type S3NotificationEventBridgeHandler,
  type S3ObjectDeletedNotificationEvent,
  wrapLambdaHandler,
} from '@packages/lambda-middleware'

const s3ObjectDeletedHandler: S3NotificationEventBridgeHandler<
  S3ObjectDeletedNotificationEvent
  // eslint-disable-next-line @typescript-eslint/require-await
> = async () => {
  return
}

export const handler = wrapLambdaHandler(s3ObjectDeletedHandler)
