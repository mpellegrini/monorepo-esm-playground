import { Tracer } from '@aws-lambda-powertools/tracer'

export const tracer = new Tracer()

export { captureLambdaHandler } from '@aws-lambda-powertools/tracer'
