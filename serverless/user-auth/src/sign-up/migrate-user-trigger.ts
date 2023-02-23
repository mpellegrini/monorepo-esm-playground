/// <reference lib="dom" />
import type { UserMigrationTriggerEvent } from 'aws-lambda'

import { wrapLambdaHandler } from '@packages/lambda-middleware'
import type { AsyncHandler } from '@packages/lambda-middleware'

type UserMigrationTriggerHandler = AsyncHandler<UserMigrationTriggerEvent>
export const userMigrationTriggerHandler: UserMigrationTriggerHandler = async (event, _context) => {
  const res = await fetch('https://api-v2.rockchalk.io/mercury-mt/user-management/login', {
    method: 'POST',
    body: JSON.stringify({
      emailId: event.userName,
      pswd: event.request.password,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Referer: 'https://rockchalk.io/',
    },
  })

  if (res.ok) {
    const data = (await res.json()) as unknown
    console.log(data)
  }

  return event
}

export const handler = wrapLambdaHandler(userMigrationTriggerHandler)
