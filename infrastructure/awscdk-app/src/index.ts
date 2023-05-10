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

new CdkPipelineStack(app, 'CdkPipelineStack')

app.synth()

// class MyStage extends Stage {
//   constructor(scope: Construct, id: string, props?: StageProps) {
//     super(scope, id, props)
//
//     new NetworkStack(this, 'SharedNetwork')
//   }
// }

// pipeline.addStage(
//   new MyStage(app, 'Beta', { env: { account: '111059790892', region: 'us-east-1' } }),
// )
