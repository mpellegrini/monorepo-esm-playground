import type { StackProps } from 'aws-cdk-lib'
import { Stack } from 'aws-cdk-lib'
import { paramCase } from 'change-case'
import type { Construct } from 'constructs'

const nameStack = (scope: Construct, id: string): string => {
  const stage = scope.node.tryGetContext('stage') as string
  const name = scope.node.tryGetContext('name') as string
  return `${stage}-${name}-${paramCase(id)}`
}

export class HgStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, nameStack(scope, id), {
      ...props,
      env: {
        account: scope.node.tryGetContext('account') as string,
        region: scope.node.tryGetContext('region') as string,
      },
      terminationProtection: false,
    })
  }
}
