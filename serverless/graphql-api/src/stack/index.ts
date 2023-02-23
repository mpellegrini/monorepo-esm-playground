import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { Duration, Expiration, type StackProps } from 'aws-cdk-lib'
import { AuthorizationType, FieldLogLevel, GraphqlApi, SchemaFile } from 'aws-cdk-lib/aws-appsync'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import type { Construct } from 'constructs'

import { BaseStack } from '@packages/aws-cdk-lib'

export class AppSyncStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const __dirname = dirname(fileURLToPath(import.meta.url))

    new GraphqlApi(this, 'GraphqlAPI', {
      schema: SchemaFile.fromAsset(
        join(__dirname, '../../node_modules/@packages/graphql-schema/src/sample.graphql'),
      ),
      name: 'GraphqlAPI',
      xrayEnabled: true,
      logConfig: {
        excludeVerboseContent: false,
        fieldLogLevel: FieldLogLevel.ALL,
        retention: RetentionDays.ONE_DAY,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: 'default-api-key',
            expires: Expiration.after(Duration.days(7)),
          },
        },
      },
    })

    // api.addNoneDataSource()
  }
}
