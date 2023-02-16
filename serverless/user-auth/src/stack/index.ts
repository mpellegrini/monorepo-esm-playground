import path from 'path'

import { fileURLToPath } from 'url'

import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, Duration, Names, RemovalPolicy, Stack } from 'aws-cdk-lib'
import {
  AccountRecovery,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolOperation,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito'
import { Architecture, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import type { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LogLevel, NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import type { Construct } from 'constructs'

import { HgStack } from './hg-stack.js'

const nodejsFunctionProps: NodejsFunctionProps = {
  timeout: Duration.seconds(10),
  memorySize: 128,
  runtime: Runtime.NODEJS_18_X,
  architecture: Architecture.ARM_64,
  awsSdkConnectionReuse: true,
  tracing: Tracing.ACTIVE,
  logRetention: RetentionDays.ONE_DAY,
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

export class AuthStack extends HgStack {
  public readonly userPoolId: CfnOutput
  public readonly userPoolClientId: CfnOutput

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    const userPool = new UserPool(this, `MyUserPool`, {
      removalPolicy: RemovalPolicy.DESTROY,
      // TODO: CHECK USERNAME CASE SENISTIVITY
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        phone: false,
        username: false,
      },
      userVerification: {
        emailStyle: VerificationEmailStyle.CODE,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
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
    // nodejsFunctionProps.layers?.push(
    //   LayerVersion.fromLayerVersionArn(
    //     this,
    //     'powertools-layer',
    //     `arn:aws:lambda:${
    //       Stack.of(this).region
    //     }:094274105915:layer:AWSLambdaPowertoolsTypeScript:7`,
    //   ),
    // )

    userPool.addTrigger(
      UserPoolOperation.PRE_SIGN_UP,
      new NodejsFunction(this, 'PreSignup', {
        ...nodejsFunctionProps,
        entry: path.join(__dirname, '../sign-up/pre-signup-trigger.js'),
        description: 'Custom validation to accept or deny the sign-up request',
      }),
    )

    userPool.addTrigger(
      UserPoolOperation.POST_CONFIRMATION,
      new NodejsFunction(this, 'PostConfirmation', {
        ...nodejsFunctionProps,
        entry: path.join(__dirname, '../sign-up/post-confirmation-trigger.js'),
        description: 'Custom welcome messages or event logging for custom analytics',
      }),
    )

    console.log(`id being passed in is ${Names.uniqueId(userPool)}`)

    const userPoolClient = new UserPoolClient(this, 'UserPoolClient', {
      userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
    })

    this.userPoolId = new CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
    })
    this.userPoolClientId = new CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
    })
  }
}
