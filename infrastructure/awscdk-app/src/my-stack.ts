import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

export class MyStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const bucket = new Bucket(this, 'my-first-bucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    new CfnOutput(this, 'bucket-arn', {
      value: bucket.bucketArn,
      exportName: 'bucketArn',
    })

    // const distribution = new Distribution(this, 'website-distribution', {
    //   defaultRootObject: 'index.html',
    //   defaultBehavior: {
    //     cachePolicy: new CachePolicy(this, 'website-caching', {
    //       defaultTtl: Duration.minutes(1),
    //     }),
    //     origin: new S3Origin(bucket),
    //   },
    //   priceClass: PriceClass.PRICE_CLASS_100,
    // })
    //
    // new CfnOutput(this, 'website-url', {
    //   value: distribution.distributionDomainName,
    //   description: 'The URL of your website',
    //   exportName: 'websiteUrl',
    // })
  }
}
