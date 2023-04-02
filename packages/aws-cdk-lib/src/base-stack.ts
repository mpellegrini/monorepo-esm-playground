import type { StackProps } from 'aws-cdk-lib'
import { Stack } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

import { nameIt } from './utils.js'

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, nameIt(scope, id), {
      ...props,
      env: {
        account: scope.node.tryGetContext('account') as string,
        region: scope.node.tryGetContext('region') as string,
      },
      terminationProtection: false,
    })
  }
}
