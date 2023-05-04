import { BaseApp } from '@packages/aws-cdk-lib'

import { MyStack } from './my-stack.js'

const app = new BaseApp({
  context: {
    name: 'hg',
    stage: 'dev',
    region: 'us-east-1',
    account: '111059790892',
  },
})

// new OidcStack(app, 'OidStack', {
//   repos: ['teammercury-dev/monorepo-esm-playground'],
// })
new MyStack(app, 'MyStack')
// new MediaFiles(app, 'MediaFiles')
// new NetworkStack(app, 'SharedNetwork')

// new AuthStack(app, 'UserAuth')
// new AppSyncStack(app, 'AppSync', { userPool: authStack.userPool })

app.synth()
