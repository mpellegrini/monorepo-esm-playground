import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, Duration, Names, RemovalPolicy, Stack } from 'aws-cdk-lib'
import {
  AccountRecovery,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import type { Construct } from 'constructs'

export class AuthStack extends Stack {
  public readonly userPoolId: CfnOutput
  public readonly userPoolClientId: CfnOutput

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const userPool = new UserPool(this, `MyUserPool`, {
      removalPolicy: RemovalPolicy.DESTROY,
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
      lambdaTriggers: {
        preSignUp: new NodejsFunction(this, 'PreSignup', {
          timeout: Duration.seconds(30),
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
        }),
      },
    })

    const uid: string = Names.uniqueId(userPool)
    console.log(`id being passed in is ${uid}`)

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
