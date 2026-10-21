/**
 * Dev Jangid Portfolio - Live Systems Telemetry Dataset
 * 
 * @author Dev Jangid <https://github.com/Dev-5678>
 */

export interface SystemMetrics {
  system: string;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  throughputOpsSec: number;
  memoryFootprintMb: number;
}