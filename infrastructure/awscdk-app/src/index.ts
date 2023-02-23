import { BaseApp } from '@packages/aws-cdk-lib'
import { AppSyncStack } from '@serverless/graphql-api/stack'
import { AuthStack } from '@serverless/user-auth/stack'

const app = new BaseApp({
  context: {
    name: 'hg',
    stage: 'dev',
    region: 'us-east-1',
    account: '111059790892',
  },
})

new AuthStack(app, 'UserAuth')

new AppSyncStack(app, 'AppSync')

app.synth()
