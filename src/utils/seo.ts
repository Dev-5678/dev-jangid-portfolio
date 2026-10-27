export interface SoftwareAppSchema {
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  name: string
  applicationCategory: string
  operatingSystem: string
  url: string
  author: {
    "@type": "Person"
    name: string
    url: string
  }
  description: string
}

export const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dev Jangid",
  jobTitle: "Computer Science Engineer",
  url: "https://dev-jangid-portfolio.vercel.app",
  sameAs: [
    "https://github.com/Dev-5678",
    "https://github.com/Dev-5678/NexusCRDT",
    "https://github.com/Dev-5678/AgentForge",
    "https://github.com/Dev-5678/HyperRoute",
    "https://github.com/Dev-5678/ProxiSpeak",
    "https://github.com/Dev-5678/dev-jangid-portfolio"
  ]
}

export const repositorySchemas: SoftwareAppSchema[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HyperRoute",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    url: "https://github.com/Dev-5678/HyperRoute",
    author: {
      "@type": "Person",
      name: "Dev Jangid",
      url: "https://github.com/Dev-5678"
    },
    description: "High-throughput edge API gateway with token-bucket rate limiting and sub-millisecond OpenMetrics Prometheus instrumentation."
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AgentForge",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    url: "https://github.com/Dev-5678/AgentForge",
    author: {
      "@type": "Person",
      name: "Dev Jangid",
      url: "https://github.com/Dev-5678"
    },
    description: "Autonomous multi-agent DAG workflow runtime implementing Kahn algorithm topological wave scheduling."
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NexusCRDT",
    applicationCategory: "CollaborationSoftware",
    operatingSystem: "Web",
    url: "https://github.com/Dev-5678/NexusCRDT",
    author: {
      "@type": "Person",
      name: "Dev Jangid",
      url: "https://github.com/Dev-5678"
    },
    description: "Distributed real-time collaborative canvas engine using state-based join-semilattices (LWW-Element-Set)."
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ProxiSpeak",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Web",
    url: "https://github.com/Dev-5678/ProxiSpeak",
    author: {
      "@type": "Person",
      name: "Dev Jangid",
      url: "https://github.com/Dev-5678"
    },
    description: "Geospatial proximity audio ecosystem with inverse-square Euclidean falloff and Web Audio stereo panning."
  }
]
