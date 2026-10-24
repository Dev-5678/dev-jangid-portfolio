/**
 * OpenMetrics Prometheus Telemetry Serializer
 * Formats low-latency systems telemetry, rate-limiting counters,
 * and HTTP response histogram buckets into standardized Prometheus scrape format.
 */

export interface MetricSample {
  name: string
  help: string
  type: 'counter' | 'gauge' | 'histogram'
  value: number
  labels?: Record<string, string>
}

export function formatPrometheusMetrics(samples: MetricSample[]): string {
  const lines: string[] = []

  for (const sample of samples) {
    lines.push(`# HELP ${sample.name} ${sample.help}`)
    lines.push(`# TYPE ${sample.name} ${sample.type}`)

    let labelStr = ''
    if (sample.labels && Object.keys(sample.labels).length > 0) {
      const parts = Object.entries(sample.labels).map(([k, v]) => `${k}="${v}"`)
      labelStr = `{${parts.join(',')}}`
    }

    lines.push(`${sample.name}${labelStr} ${sample.value}`)
  }

  return lines.join('\n') + '\n'
}
