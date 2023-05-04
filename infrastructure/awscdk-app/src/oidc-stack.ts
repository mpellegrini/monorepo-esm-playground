import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput } from 'aws-cdk-lib'

import type { IOpenIdConnectProvider, IPrincipal } from 'aws-cdk-lib/aws-iam'
import {
  Effect,
  OpenIdConnectPrincipal,
  OpenIdConnectProvider,
  PolicyDocument,
  PolicyStatement,
  Role,
} from 'aws-cdk-lib/aws-iam'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

const formatRepos = (repos: string[]): string[] => {
  const formattedRepos: string[] = []
  for (const repo of repos) {
    formattedRepos.push(`repo:${repo}:*`)
  }
  return formattedRepos
}

/**
 * Properties for the GitHubActionRole construct.
 */
export interface GitHubActionRoleProps extends StackProps {
  /**
   * A list of GitHub repositories you want to be able to access the IAM role.
   * Each entry should be your GitHub username and repository passed in as a
   * single string.
   *
   * For example, `['owner/repo1', 'owner/repo2'].
   */
  readonly repos: string[]

  /**
   * The name of the Oidc role.
   *
   * @default 'GitHubActionRole'
   */
  readonly roleName?: string

  /**
   * The GitHub OpenId Connect Provider. Must have provider url
   * `https://token.actions.githubusercontent.com`. The audience must be
   * `sts:amazonaws.com`.
   *
   * Only one such provider can be defined per account, so if you already
   * have a provider with the same url, a new provider cannot be created for you.
   *
   * @default - a provider is created for you.
   */
  readonly provider?: IOpenIdConnectProvider
}

export class OidcStack extends BaseStack {
  constructor(scope: Construct, id: string, props: GitHubActionRoleProps) {
    super(scope, id, props)

    const rawEndpoint = 'token.actions.githubusercontent.com'
    const providerUrl = `https://${rawEndpoint}`

    const provider = new OpenIdConnectProvider(this, 'GitHubProvider', {
      url: providerUrl,
      clientIds: ['sts.amazonaws.com'],
      thumbprints: [
        'a031c46782e6e6c662c2c87c76da9aa62ccabd8e',
        '6938fd4d98bab03faadb97b34396831e3780aea1',
      ],
    })

    const principal = new OpenIdConnectPrincipal(provider, {
      StringLike: {
        [`${rawEndpoint}:sub`]: formatRepos(props.repos),
      },
    })

    // permit this role from assuming all of the CDK bootstrap roles
    const oidcPolicyStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['sts:AssumeRole'],
      resources: ['*'],
      conditions: {
        'ForAnyValue:StringEquals': {
          'iam:ResourceTag/aws-cdk:bootstrap-role': [
            'deploy',
            'lookup',
            'file-publishing',
            'image-publishing',
          ],
        },
      },
    })

    // permit this role from accessing ecr repositories for docker assets
    const ecrPolicyStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['ecr:GetAuthorizationToken'],
      resources: ['*'],
    })

    const role = new Role(this, 'github-action-role', {
      roleName: props.roleName ?? 'GitHubActionRole',
      description: 'Used via GitHub Actions to deploy with AWS CDK on the target AWS account',
      assumedBy: principal as IPrincipal,
      inlinePolicies: {
        AssumeBootstrapRoles: new PolicyDocument({
          statements: [oidcPolicyStatement, ecrPolicyStatement],
        }),
      },
      // maxSessionDuration: Duration.hours(1),
    })

    // show the role arn in the stack output
    new CfnOutput(this, 'roleArn', {
      value: role.roleArn,
    })
  }
}
