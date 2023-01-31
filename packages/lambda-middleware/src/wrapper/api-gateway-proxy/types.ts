import type { MiddyfiedHandler } from '@middy/core'
import type {
  APIGatewayProxyEvent as AwsAPIGatewayProxyEvent,
  APIGatewayProxyResult as AwsAPIGatewayProxyResult,
  Context as LambdaContext,
} from 'aws-lambda'

type APIGatewayProxyEvent<TReqBody> = Omit<
  AwsAPIGatewayProxyEvent,
  'body' | 'pathParameters' | 'queryStringParameters' | 'multiValueQueryStringParameters'
> & {
  body: TReqBody
  pathParameters: Record<string, string>
  queryStringParameters: Record<string, string>
  multiValueQueryStringParameters: Record<string, Array<string>>
  rawBody: string
  rawHeaders: Record<string, string>
}

interface APIGatewayProxyResult<TResBody = unknown> {
  statusCode: number
  headers?: Record<string, boolean | number | string> | undefined
  multiValueHeaders?: Record<string, Array<boolean | number | string>> | undefined
  body: TResBody
  isBase64Encoded?: boolean | undefined
}

type AsyncHandler<TEvent = unknown, TResult = unknown> = (
  event: TEvent,
  context: LambdaContext,
) => Promise<TResult>

export type AsyncAPIGatewayProxyHandler<TReqBody = unknown, TResBody = unknown> = AsyncHandler<
  APIGatewayProxyEvent<TReqBody>,
  APIGatewayProxyResult<TResBody>
>

export type MiddyfiedAPIGatewayProxyHandler = MiddyfiedHandler<
  AwsAPIGatewayProxyEvent,
  AwsAPIGatewayProxyResult
>
