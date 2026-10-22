/**
 * Dev Jangid Portfolio - Engineering Changelog
 */

export interface ChangelogItem {
  version: string
  date: string
  title: string
  changes: string[]
}

export const portfolioChangelog: ChangelogItem[] = [
  {
    version: "v2.5.0",
    date: "October 21, 2026",
    title: "High-Throughput Telemetry & WebRTC P2P Expansion",
    changes: [
      "Integrated LiveMetricsConsole with real-time latency percentiles",
      "Added Causal Undo/Redo DAG history and WebRTC DataChannel to NexusCRDT",
      "Added dynamic conditional branching and priority queue to AgentForge",
      "Added Least-Connections balancing and edge LRU cache to HyperRoute"
    ]
  },
  {
    version: "v2.4.0",
    date: "October 20, 2026",
    title: "S-Tier Systems Trio Integration",
    changes: [
      "Integrated NexusCRDT distributed real-time collaborative canvas engine",
      "Integrated AgentForge autonomous multi-agent DAG workflow runtime",
      "Integrated HyperRoute high-throughput edge API gateway & rate limiter",
      "Added deep-dive architecture showcase pages and unit test coverage"
    ]
  }
]