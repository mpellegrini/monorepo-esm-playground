import { type StackProps } from 'aws-cdk-lib'
import type { IFileSetProducer } from 'aws-cdk-lib/pipelines'
import { ShellStep } from 'aws-cdk-lib/pipelines'
import { AwsCredentials, GitHubWorkflow, Runner } from 'cdk-pipelines-github'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

export class CdkPipelineStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    new GitHubWorkflow(this, 'Pipleline', {
      workflowName: 'My Workfow',
      synth: new ShellStep('Build', {
        commands: ['echo "nothing to do (cdk.out is committed)"'],
      }) as IFileSetProducer,

      awsCreds: AwsCredentials.fromOpenIdConnect({
        gitHubActionRoleArn: 'arn:aws:iam::255795313725:role/GitHubActionRole',
      }),

      runner: Runner.UBUNTU_LATEST,

      // preBuildSteps: [
      //   {
      //     uses: 'actions/setup-node@v3',
      //     with: { nodeVersion: '18' },
      //   },
      // ],
    })
  }
}
