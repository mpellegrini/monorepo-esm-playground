import { Duration, Stack } from 'aws-cdk-lib'
import { Architecture, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import {
  LogLevel,
  NodejsFunction,
  type NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs'
import type { ILogGroup } from 'aws-cdk-lib/aws-logs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Construct } from 'constructs'

export const nodejsFunctionProps: NodejsFunctionProps = {
  timeout: Duration.seconds(10),
  memorySize: 128,
  runtime: Runtime.NODEJS_18_X,
  architecture: Architecture.ARM_64,
  awsSdkConnectionReuse: true,
  tracing: Tracing.ACTIVE,
  logRetention: RetentionDays.ONE_DAY,
  environment: {
    NODE_OPTIONS: '--enable-source-maps',
    LOG_LEVEL: 'DEBUG',
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

export type CustomFunctionProps = {
  /**
   * Code entry point.
   * Eg: `${__dirname}/../lambda/my-function/index.ts`
   */
  entry: string
}

export class CustomFunction extends Construct {
  readonly function: NodejsFunction
  readonly logGroup: ILogGroup

  constructor(scope: Construct, id: string, props: CustomFunctionProps) {
    super(scope, id)

    nodejsFunctionProps.layers?.push(
      LayerVersion.fromLayerVersionArn(
        this,
        'PowertoolsTypescriptLayer',
        `arn:aws:lambda:${
          Stack.of(this).region
        }:094274105915:layer:AWSLambdaPowertoolsTypeScript:11`,
      ),
    )

    const fn = new NodejsFunction(this, 'Fnc', {
      ...nodejsFunctionProps,
      entry: props.entry,
    })
    this.function = fn
    this.logGroup = fn.logGroup
  }
}
