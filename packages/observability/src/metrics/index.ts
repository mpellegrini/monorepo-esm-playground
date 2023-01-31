import { MetricUnits, Metrics } from '@aws-lambda-powertools/metrics'

export const metrics = new Metrics()

export const countMetric = (metric: string & `${string}_count`, value = 1): void => {
  metrics.addMetric(metric, MetricUnits.Count, value)
}
export { logMetrics, MetricUnits } from '@aws-lambda-powertools/metrics'
