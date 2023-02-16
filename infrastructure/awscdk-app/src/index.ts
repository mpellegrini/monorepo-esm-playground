import { AuthStack } from '@serverless/user-auth/stack'

import { HgApp } from './hg-app.js'

const app = new HgApp({
  context: {
    name: 'hg',
    stage: 'dev',
    region: 'us-east-1',
    account: '111059790892',
  },
})

new AuthStack(app, 'UserAuth')

app.synth()
