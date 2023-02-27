import path from 'path'
import { fileURLToPath } from 'url'

import { CfnOutput, Duration, Stack, type StackProps } from 'aws-cdk-lib'
import {
  AuthorizationType,
  FieldLogLevel,
  GraphqlApi,
  SchemaFile,
  UserPoolDefaultAction,
} from 'aws-cdk-lib/aws-appsync'
import type { IUserPool } from 'aws-cdk-lib/aws-cognito'
import { Architecture, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import {
  LogLevel,
  NodejsFunction,
  type NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import type { Construct } from 'constructs'

import { BaseStack, nameIt } from '@packages/aws-cdk-lib'

export const nodejsFunctionProps: NodejsFunctionProps = {
  timeout: Duration.seconds(10),
  memorySize: 128,
  runtime: Runtime.NODEJS_18_X,
  architecture: Architecture.ARM_64,
  awsSdkConnectionReuse: true,
  tracing: Tracing.ACTIVE,
  logRetention: RetentionDays.ONE_DAY,
  environment: {
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

interface AppSyncStackProps extends StackProps {
  userPool: IUserPool
}

export class AppSyncStack extends BaseStack {
  constructor(scope: Construct, id: string, props: AppSyncStackProps) {
    super(scope, id, props)

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    const graphqlApiName = nameIt(this, 'GraphqlAPI')

    const api = new GraphqlApi(this, graphqlApiName, {
      schema: SchemaFile.fromAsset(
        path.join(__dirname, '../../node_modules/@packages/graphql/lib/schema.merged.graphql'),
      ),
      name: graphqlApiName,
      xrayEnabled: true,
      logConfig: {
        excludeVerboseContent: false,
        fieldLogLevel: FieldLogLevel.ALL,
        retention: RetentionDays.ONE_DAY,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
            defaultAction: UserPoolDefaultAction.ALLOW,
          },
        },
      },
    })

    nodejsFunctionProps.layers?.push(
      LayerVersion.fromLayerVersionArn(
        this,
        'PowertoolsLayer',
        `arn:aws:lambda:${
          Stack.of(this).region
        }:094274105915:layer:AWSLambdaPowertoolsTypeScript:7`,
      ),
    )

    const directLambda = new NodejsFunction(this, 'LambdaResolver', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../resolvers/test-resolver.js'),
      description: 'Direct Lambda Resolver Example',
    })

    const datasource = api.addLambdaDataSource('DirectLambda', directLambda)

    datasource.createResolver('QueryListSitesResolver', {
      typeName: 'Query',
      fieldName: 'userById',
    })

    new CfnOutput(this, 'graphqlUrl', { value: api.graphqlUrl })
    new CfnOutput(this, 'apiKey', { value: api.apiKey ?? '' })
    new CfnOutput(this, 'apiId', { value: api.apiId })
  }
}
