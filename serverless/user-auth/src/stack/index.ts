import path from 'path'
import { fileURLToPath } from 'url'

import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, Duration, Names, RemovalPolicy, Stack } from 'aws-cdk-lib'
import {
  AccountRecovery,
  ClientAttributes,
  StringAttribute,
  UserPool,
  UserPoolClientIdentityProvider,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito'
import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Architecture, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import type { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LogLevel, NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs'
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
    POWERTOOLS_SERVICE_NAME: 'UserAuth', // Can this be auto-defined via stack name??
    POWERTOOLS_METRICS_NAMESPACE: 'UserAuth', // Can this be auto-defined via stack name??
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

export class AuthStack extends BaseStack {
  public readonly userPoolId: CfnOutput
  public readonly userPoolClientId: CfnOutput
  public readonly userPool: UserPool

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

    const preSignupTriggerFn = new NodejsFunction(this, 'PreSignup', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../sign-up/pre-signup-trigger.js'),
      description: 'Custom validation to accept or deny the sign-up request',
    })

    const postConfirmationTriggerFn = new NodejsFunction(this, 'PostConfirmation', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../sign-up/post-confirmation-trigger.js'),
      description: 'Custom welcome messages or event logging for custom analytics',
    })

    const userMigrationTriggerFn = new NodejsFunction(this, 'UserMigration', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../sign-up/migrate-user-trigger.js'),
      description: 'Migrates a user from an existing user directory to user pools',
    })

    const preAuthenticationTriggerFn = new NodejsFunction(this, 'PreAuthentication', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../authentication/pre-authentication-trigger.js'),
      description: 'Custom validation to accept or deny the sign-in request',
    })

    const postAuthenticationTriggerFn = new NodejsFunction(this, 'PostAuthentication', {
      ...nodejsFunctionProps,
      entry: path.join(__dirname, '../authentication/post-authentication-trigger.js'),
      description: 'Logs events for custom analytics',
    })

    const myUserPool = new UserPool(this, `MyUserPool`, {
      removalPolicy: RemovalPolicy.DESTROY,
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        phone: false,
        username: false,
      },
      userVerification: {
        emailSubject: 'You need to verify your email',
        emailBody: 'Thanks for signing up Your verification code is {####}',
        emailStyle: VerificationEmailStyle.CODE,
      },
      customAttributes: {
        internalIdentifier: new StringAttribute({ mutable: true, minLen: 36, maxLen: 36 }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      lambdaTriggers: {
        preSignUp: preSignupTriggerFn,
        postConfirmation: postConfirmationTriggerFn,
        userMigration: userMigrationTriggerFn,
        preAuthentication: preAuthenticationTriggerFn,
        postAuthentication: postAuthenticationTriggerFn,
      },
    })

    postConfirmationTriggerFn.role?.attachInlinePolicy(
      new Policy(this, 'allowUpdateUserAttributes', {
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['cognito-idp:AdminUpdateUserAttributes'],
            resources: [myUserPool.userPoolArn],
          }),
        ],
      }),
    )

    console.log(`id being passed in is ${Names.uniqueId(myUserPool)}`)

    const userPoolClient = myUserPool.addClient('UserPoolClient', {
      generateSecret: true,
      idTokenValidity: Duration.minutes(5),
      accessTokenValidity: Duration.minutes(5),
      refreshTokenValidity: Duration.days(5),
      preventUserExistenceErrors: true,
      enableTokenRevocation: true,
      readAttributes: new ClientAttributes().withCustomAttributes(...['internalIdentifier']),
      writeAttributes: new ClientAttributes().withCustomAttributes(...[]),
      authFlows: {
        userPassword: true,
        userSrp: false,
        adminUserPassword: false,
        custom: false,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
    })

    myUserPool.addClient('DevUserPoolClient', {
      generateSecret: false,
      enableTokenRevocation: true,
      readAttributes: new ClientAttributes().withCustomAttributes(...['internalIdentifier']),
      writeAttributes: new ClientAttributes().withCustomAttributes(...[]),
      authFlows: {
        userPassword: false,
        userSrp: true,
        adminUserPassword: false,
        custom: false,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
    })

    this.userPool = myUserPool

    this.userPoolId = new CfnOutput(this, 'userPoolId', {
      value: myUserPool.userPoolId,
    })
    this.userPoolClientId = new CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
    })
    new CfnOutput(this, 'userPoolClientSecret', {
      value: userPoolClient.userPoolClientSecret.unsafeUnwrap(),
    })
  }
}
