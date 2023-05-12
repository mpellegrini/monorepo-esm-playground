import { CdkPipelineStack } from '@infrastructure/cdk-pipeline'
import { BaseApp } from '@packages/aws-cdk-lib'

const app = new BaseApp({
  context: {
    name: 'hg',
    stage: 'dev',
    region: 'us-east-1',
    account: '111059790892',
  },
})

// new MyStack(app, 'MyStack')
new CdkPipelineStack(app, 'Pipeline')

app.synth()
