import { Aspects, Stack, type StackProps, Tag } from 'aws-cdk-lib'
import type { ISubnet } from 'aws-cdk-lib/aws-ec2'
import {
  GatewayVpcEndpointAwsService,
  InstanceClass,
  InstanceSize,
  InstanceType,
  IpAddresses,
  NatProvider,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

// see https://adrianhesketh.com/2022/05/31/create-vpc-with-cdk/

export class NetworkStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const stackName = Stack.of(this).stackName

    const vpc = new Vpc(this, `${stackName}-vpc`, {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
      natGatewayProvider: NatProvider.instance({
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      }),
      natGateways: 0,
      maxAzs: 1,
      subnetConfiguration: [
        {
          name: 'public-subnet-1',
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'private-subnet-1',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        },
        {
          name: 'isolated-subnet-1',
          subnetType: SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    })

    Aspects.of(vpc).add(new Tag('Name', `${stackName}-vpc`))
    this.nameSubnets(vpc.node.id, vpc.publicSubnets)
    this.nameSubnets(vpc.node.id, vpc.privateSubnets)
    this.nameSubnets(vpc.node.id, vpc.isolatedSubnets)

    vpc.addFlowLog('FlowLog')

    vpc.addGatewayEndpoint('s3Endpoint', {
      service: GatewayVpcEndpointAwsService.S3,
    })
  }

  private nameSubnets(vpcNodeId: string, subnets: ISubnet[]): void {
    for (const subnet of subnets) {
      Aspects.of(subnet).add(
        new Tag(
          'Name',
          `${vpcNodeId}/${subnet.node.id.replace(/Subnet[0-9]$/, '')}/${subnet.availabilityZone}`,
        ),
      )
    }
  }
}
