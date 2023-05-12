import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

export class MyStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const s3Bucket = new Bucket(this, 'exampleBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    new CfnOutput(this, 'bucket-arn', {
      value: s3Bucket.bucketArn,
      exportName: 'BucketArn',
    })
  }
}
