// import { NetworkStack } from '@infrastructure/shared-infrastructure'
import { BaseApp } from '@packages/aws-cdk-lib'
import { MediaFiles } from '@serverless/media-files/stack'
// import { AppSyncStack } from '@serverless/graphql-api/stack'
// import { AuthStack } from '@serverless/user-auth/stack'

const app = new BaseApp({
  context: {
    name: 'hg',
    stage: 'dev',
    region: 'us-east-1',
    account: '111059790892',
  },
})
new MediaFiles(app, 'MediaFiles')
// new NetworkStack(app, 'SharedNetwork')

// new AuthStack(app, 'UserAuth')
// new AppSyncStack(app, 'AppSync', { userPool: authStack.userPool })

app.synth()
