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