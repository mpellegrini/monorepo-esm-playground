import type { Environment } from 'aws-cdk-lib'
import { App } from 'aws-cdk-lib'

import { AuthStack } from '@serverless/user-auth/stack'

const app = new App({ analyticsReporting: false })

const env: Environment = {
  account: '111059790892',
  region: 'us-east-1',
}

new AuthStack(app, 'UserAuth', {
  env,
})

app.synth()
