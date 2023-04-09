import { MetricUnits, Metrics } from '@aws-lambda-powertools/metrics'

export const metrics = new Metrics({
  defaultDimensions: {
    aws_account_id: process.env['AWS_ACCOUNT_ID'] || 'N/A',
    aws_region: process.env['AWS_REGION'] || 'N/A',
  },
})

export const countMetric = (metric: string & `${string}_count`, value = 1): void => {
  metrics.addMetric(metric, MetricUnits.Count, value)
}
export { logMetrics, MetricUnits } from '@aws-lambda-powertools/metrics'
