import path from 'path'
import { fileURLToPath } from 'url'

import { type StackProps } from 'aws-cdk-lib'
import { EventBus, Rule } from 'aws-cdk-lib/aws-events'
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets'
import type { Construct } from 'constructs'

import { BaseStack, CustomFunction } from '@packages/aws-cdk-lib'

export class MediaFiles extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    const s3ObjectCreatedFn = new CustomFunction(this, 'S3ObjectCreated', {
      entry: path.join(__dirname, '../s3-object-created-notification.js'),
    })

    const s3ObjectDeletedFn = new CustomFunction(this, 'S3ObjectDeleted', {
      entry: path.join(__dirname, '../s3-object-deleted-notification.js'),
    })

    const baseEventPattern = {
      source: ['aws.s3'],
      detail: {
        bucket: {
          name: ['aws-sih-media'],
        },
      },
    }

    const defaultBus = EventBus.fromEventBusName(this, 'defaultBus', 'default')
    new Rule(this, 'ObjectCreatedRule', {
      description: '',
      eventPattern: {
        ...baseEventPattern,
        detailType: ['Object Created'],
      },
      eventBus: defaultBus,
    }).addTarget(new LambdaFunction(s3ObjectCreatedFn.function))

    new Rule(this, 'ObjectDeletedRule', {
      eventPattern: {
        ...baseEventPattern,
        detailType: ['Object Deleted'],
      },
      eventBus: defaultBus,
    }).addTarget(new LambdaFunction(s3ObjectDeletedFn.function))
  }
}
