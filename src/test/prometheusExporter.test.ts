import { describe, it, expect } from 'vitest'
import { formatPrometheusMetrics, type MetricSample } from '../utils/prometheusExporter'

describe('Prometheus OpenMetrics Telemetry Serializer', () => {
  it('correctly formats counters, gauges, and label dimensions', () => {
    const samples: MetricSample[] = [
      {
        name: 'hyperroute_requests_total',
        help: 'Total processed API requests through edge gateway',
        type: 'counter',
        value: 120480,
        labels: { status: '200', method: 'GET' }
      },
      {
        name: 'hyperroute_latency_p99_milliseconds',
        help: 'p99 latency in milliseconds',
        type: 'gauge',
        value: 2.8,
        labels: { region: 'bom1' }
      }
    ]

    const output = formatPrometheusMetrics(samples)

    expect(output).toContain('# HELP hyperroute_requests_total Total processed API requests through edge gateway')
    expect(output).toContain('# TYPE hyperroute_requests_total counter')
    expect(output).toContain('hyperroute_requests_total{status="200",method="GET"} 120480')
    expect(output).toContain('# HELP hyperroute_latency_p99_milliseconds p99 latency in milliseconds')
    expect(output).toContain('# TYPE hyperroute_latency_p99_milliseconds gauge')
    expect(output).toContain('hyperroute_latency_p99_milliseconds{region="bom1"} 2.8')
  })

  it('handles metric samples without labels', () => {
    const samples: MetricSample[] = [
      {
        name: 'agentforge_active_workers',
        help: 'Active concurrent WASM worker sandboxes',
        type: 'gauge',
        value: 8
      }
    ]

    const output = formatPrometheusMetrics(samples)
    expect(output).toContain('agentforge_active_workers 8')
  })
})
