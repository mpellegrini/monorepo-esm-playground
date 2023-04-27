import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, Duration, RemovalPolicy } from 'aws-cdk-lib'
import { CachePolicy, Distribution, PriceClass } from 'aws-cdk-lib/aws-cloudfront'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

export class MyStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const bucket = new Bucket(this, 'hg-aws-my-first-bucket', {
      // bucketName: 'hg-aws-my-first-bucket',
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const distribution = new Distribution(this, 'website-distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        cachePolicy: new CachePolicy(this, 'website-caching', {
          defaultTtl: Duration.minutes(1),
        }),
        origin: new S3Origin(bucket),
      },
      priceClass: PriceClass.PRICE_CLASS_100,
    })

    new CfnOutput(this, 'website-url', {
      value: distribution.distributionDomainName,
      description: 'The URL of your website',
      exportName: 'websiteUrl',
    })
  }
}
