import { Stage, type StageProps } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

import { MyStack } from './my-stack.js'

/**
 * A Stage in a CDK Pipeline represents a set of one or more CDK Stacks that
 * should be deployed together, to a particular environment.
 */
export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)
    new MyStack(this, 'MyStack')
  }
}
