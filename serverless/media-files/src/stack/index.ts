import path from 'path'
import { fileURLToPath } from 'url'

import { Duration, Stack, type StackProps } from 'aws-cdk-lib'
import { EventBus, Rule } from 'aws-cdk-lib/aws-events'
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets'
import { Architecture, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import {
  LogLevel,
  NodejsFunction,
  type NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

const nodejsFunctionProps: NodejsFunctionProps = {
  timeout: Duration.seconds(10),
  memorySize: 128,
  runtime: Runtime.NODEJS_18_X,
  architecture: Architecture.ARM_64,
  awsSdkConnectionReuse: true,
  tracing: Tracing.ACTIVE,
  logRetention: RetentionDays.ONE_DAY,
  environment: {
    LOG_LEVEL: 'DEBUG',
    POWERTOOLS_SERVICE_NAME: 'MediaFiles', // Can this be auto-defined via stack name??
    POWERTOOLS_METRICS_NAMESPACE: 'MediaFiles', // Can this be auto-defined via stack name??
  },
  layers: [],
  bundling: {
    logLevel: LogLevel.INFO,
    minify: true,
    sourceMap: true,
    target: 'node18',
    format: OutputFormat.ESM,
    preCompilation: false,
    externalModules: ['pg-native', '@aws-sdk/*', '@aws-lambda-powertools/*'],
  },
}

export class MediaFiles extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    nodejsFunctionProps.layers?.push(
      LayerVersion.fromLayerVersionArn(
        this,
        'PowertoolsLayer',
        `arn:aws:lambda:${
          Stack.of(this).region
        }:094274105915:layer:AWSLambdaPowertoolsTypeScript:7`,
      ),
    )

    const s3ObjectCreatedFn = new NodejsFunction(this, 'S3ObjectCreated', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../s3-object-created-notification.js'),
      description: '',
    })

    const s3ObjectDeletedFn = new NodejsFunction(this, 'S3ObjectDeleted', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../s3-object-created-notification.js'),
      description: '',
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
    }).addTarget(new LambdaFunction(s3ObjectCreatedFn))

    new Rule(this, 'ObjectDeletedRule', {
      eventPattern: {
        ...baseEventPattern,
        detailType: ['Object Deleted'],
      },
      eventBus: defaultBus,
    }).addTarget(new LambdaFunction(s3ObjectDeletedFn))
  }
}
