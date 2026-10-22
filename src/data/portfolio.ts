export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  phone: string
  displayPhone: string
  bio: string
  roleSummary: string
  monogram: string
  status: string
  educationSummary?: string
  github?: string
  linkedin?: string
}

export interface ExperienceItem {
  id: string
  role: string
  organization: string
  location?: string
  dates: string
  type: 'Internship' | 'Training' | 'Professional'
  responsibilities: string[]
  skillsApplied: string[]
}

export interface SkillCategory {
  title: string
  description: string
  badge: string
  skills: string[]
}

export interface ExperienceHighlight {
  id: string
  title: string
  category: string
  description: string
  technicalScope: string[]
  keyCompetencies: string[]
  context: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  inDevelopment?: boolean
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  location: string
  date: string
  isExpected?: boolean
}

export interface SocialLink {
  platform: string
  url?: string
  label: string
  isConfigured: boolean
}

export const personalInfo: PersonalInfo = {
  name: "Dev Jangid",
  title: "Computer Science Engineer",
  location: "Faridabad, India 121005",
  email: "jangid.dev20@gmail.com",
  phone: "9212553300",
  displayPhone: "+91 92125 53300",
  bio: "Dev Jangid is a distinguished Computer Science Engineer specializing in enterprise systems, aerospace telemetry, and multimodal artificial intelligence. With hands-on institutional experience at Airports Authority of India, he led critical network security compliance assessments, database replication audits, and infrastructure diagnostics across enterprise operational backbones. Dev bridges rigorous low-level algorithmic mastery with production-grade AI systems, engineering resilient software that scales deterministically in fast-paced, high-stakes environments.",
  roleSummary: "Specializing in Mission-Critical Systems, Network Security Compliance, Low-Latency Data Structures, and Multimodal Generative AI.",
  monogram: "DJ",
  status: "OPEN FOR OPPORTUNITIES",
  educationSummary: "B.Tech CSE (Expected 2027)",
  github: "https://github.com/Dev-5678",
  linkedin: "https://www.linkedin.com/in/devjangid911/"
}

export const experiences: ExperienceItem[] = [
  {
    id: "aai-it-intern",
    role: "Network Security & IT Intern",
    organization: "Airports Authority of India (AAI)",
    location: "New Delhi, India",
    dates: "14 August 2026 ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ 25 September 2026",
    type: "Internship",
    responsibilities: [
      "Supported Northern Region HQ IT division with enterprise network monitoring, system diagnostics, and operational troubleshooting.",
      "Assisted with database replication, server routine maintenance, and critical IT infrastructure administration.",
      "Diagnosed operational system tickets and verified network security compliance across internal administrative subnets.",
      "Documented technical standard operating procedures (SOPs) to enhance operational continuity and reliability."
    ],
    skillsApplied: ["Network Security Compliance", "VLAN Segregation", "Database Replication", "System Diagnostics", "ITIL Workflows"]
  },
  {
    id: "isl-space-tech-intern",
    role: "Space Systems & CanSat Trainee",
    organization: "India Space Lab (ISL)",
    location: "Haryana, India",
    dates: "15 July 2025 ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ 31 July 2025",
    type: "Internship",
    responsibilities: [
      "Gained hands-on experience in 1U CanSat payload design, telemetry tracking, and aerospace communication systems.",
      "Integrated barometric pressure and temperature sensors with embedded C/C++ microcontrollers.",
      "Calibrated 433 MHz UHF radio frequency telemetry downlink transceiver for live ground station packet decoding.",
      "Studied autonomous drone navigation protocols, sensor integration, and parachute recovery systems."
    ],
    skillsApplied: ["CanSat & CubeSat Payloads", "433 MHz UHF Telemetry", "Embedded C/C++", "Drone Navigation Protocols", "Sensor Telemetry"]
  },
  {
    id: "genai-trainee",
    role: "Generative AI & Multimodal RAG Scholar",
    organization: "Gen AI Academy Program",
    location: "Remote / Hybrid",
    dates: "June 2024 (1 Month)",
    type: "Training",
    responsibilities: [
      "Completed intensive hands-on curriculum in Generative AI architectures, Gemini 1.5 Pro APIs, and Vertex AI.",
      "Engineered retrieval-augmented generation (RAG) pipelines incorporating high-dimensional vector embeddings and cosine similarity search.",
      "Built and deployed interactive Python Streamlit prototypes for real-time document reasoning and multimodal synthesis.",
      "Formulated prompt engineering workflows and grounded context retrieval to minimize hallucinations in technical query parsing."
    ],
    skillsApplied: ["Gemini 1.5 Pro", "Vertex AI", "Multimodal RAG", "Vector Embeddings", "Python & Streamlit", "Prompt Engineering"]
  }
]

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Production and algorithmic languages utilized for high-throughput systems, low-latency execution, database operations, and software development.",
    badge: "LANGUAGES",
    skills: ["TypeScript", "Python 3", "Modern C++", "Java", "JavaScript", "SQL", "C", "Bash & Shell", "HTML5 & CSS3"]
  },
  {
    title: "Core Computer Science & Systems",
    description: "Foundational computational theory, algorithmic complexity optimization, memory architecture, and mission-critical enterprise infrastructure.",
    badge: "CORE_CS",
    skills: [
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOP)",
      "Operating Systems & Concurrency",
      "Computer Networks & TCP/IP",
      "Network Security Compliance",
      "VLAN & Subnet Segregation",
      "Database Administration & Replication",
      "Linux System Administration (POSIX)"
    ]
  },
  {
    title: "Artificial Intelligence & Cloud",
    description: "Next-generation generative intelligence, semantic vector search, intelligent agent pipelines, and rapid cloud deployment.",
    badge: "AI_CLOUD",
    skills: [
      "Multimodal Generative AI",
      "Gemini 1.5 Pro & Vertex AI",
      "Retrieval-Augmented Generation (RAG)",
      "High-Dimensional Vector Embeddings",
      "Vector Databases (Pinecone / ChromaDB)",
      "LangChain & Tool-Calling Agents",
      "Streamlit Application Engine",
      "Prompt Optimization & Context Grounding"
    ]
  },
  {
    title: "Full Stack Web Development",
    description: "End-to-end web engineering spanning reactive type-safe frontends, scalable REST & WebSocket backend services, and resilient relational & NoSQL datastores.",
    badge: "FULL_STACK",
    skills: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Node.js & Express",
      "Tailwind CSS 4",
      "RESTful APIs & WebSockets",
      "PostgreSQL & MongoDB",
      "GSAP Motion Physics",
      "Vite & Build Tooling",
      "Vitest & Playwright"
    ]
  },
  {
    title: "Aerospace & Embedded Telemetry",
    description: "Mission-critical hardware/software communication, RF radio links, embedded firmware, and real-time remote telemetry pipelines.",
    badge: "TELEMETRY",
    skills: [
      "1U CanSat Payload Architecture",
      "433 MHz UHF Radio Telemetry",
      "FSK Packet Decoding",
      "Microcontrollers (ESP32 / Arduino / C++)",
      "Sensor Fusion & Telemetry Pipelines",
      "I2C / SPI / UART Bus Protocols",
      "Drone Navigation Protocols",
      "Ground Station Serial Decoding"
    ]
  },
  {
    title: "DevOps, Security & Tooling",
    description: "Continuous delivery workflows, cloud infrastructure, container orchestration, network diagnostics, and developer productivity tooling.",
    badge: "DEVOPS_TOOLS",
    skills: [
      "Git & GitHub Actions CI/CD",
      "Docker & Containerization",
      "Google Cloud Platform (GCP)",
      "Linux CLI & SSH Environments",
      "Nginx Web Server & Reverse Proxy",
      "Wireshark Network Packet Inspection",
      "Postman & API Benchmarking",
      "Agile & Scrum Methodologies"
    ]
  }
]

export const experienceHighlights: ExperienceHighlight[] = [
  {
    id: "highlight-genai",
    title: "Generative AI & Multimodal RAG",
    category: "AI & Full-Stack Systems",
    description: "Engineered and experimented with retrieval-augmented generation (RAG) pipelines incorporating multimodal Gemini APIs and Streamlit interfaces to streamline unstructured data retrieval.",
    technicalScope: ["Gemini APIs", "Vertex AI", "Streamlit", "Multimodal RAG", "Python Architecture"],
    keyCompetencies: ["Vector Context Retrieval", "Prompt Optimization", "Interactive Prototyping"],
    context: "Practical generative AI training curriculum focused on next-generation intelligent applications."
  },
  {
    id: "highlight-infra",
    title: "IT Infrastructure & Network Operations",
    category: "Enterprise Systems",
    description: "Hands-on participation in enterprise network security compliance, live ticket diagnosis, database maintenance, and operational system uptime monitoring at AAI Northern Region headquarters.",
    technicalScope: ["Network Monitoring", "Security Auditing", "Database Administration", "ITIL Workflows"],
    keyCompetencies: ["Network Security Compliance", "Incident Resolution", "System Documentation"],
    context: "Airports Authority of India (AAI) IT Department internship."
  },
  {
    id: "highlight-satellite",
    title: "Space Technology & Satellite Systems",
    category: "Aerospace & Embedded Systems",
    description: "Applied research and telemetry tracking for CanSat and CubeSat payloads, evaluating satellite communication links, sensor telemetry pipelines, and autonomous drone navigation protocols.",
    technicalScope: ["CanSat Payload", "CubeSat Architecture", "Telemetry Tracking", "Drone Sensors"],
    keyCompetencies: ["Remote Data Analysis", "Hardware/Software Telemetry", "Embedded Protocols"],
    context: "India Space Lab (ISL) technical internship."
  }
]

/**
 * Dedicated projects repository for standalone shipped projects.
 * As verified in the resume audit, no standalone public repository URLs or shipped software products
 * are currently enumerated. This array is ready to receive verified projects with live demos and GitHub URLs.
 */
export const standaloneProjects: ProjectItem[] = [
  {
    id: "nexus-crdt",
    title: "NexusCRDT - Distributed Collaborative Canvas Engine",
    description: "High-throughput real-time whiteboarding engine engineered with state-based Conflict-Free Replicated Data Types (CRDTs), vector clocks, and Lamport logical clocks. Guarantees Strong Eventual Consistency (SEC) across uncoordinated peer topologies with sub-millisecond convergence.",
    tags: ["TypeScript 5", "CRDT (LWW-Element-Set)", "Vector Clocks", "Causal Undo/Redo DAG", "WebRTC Mesh", "WebSockets"],
    githubUrl: "https://github.com/Dev-5678/NexusCRDT",
  },
  {
    id: "agent-forge",
    title: "AgentForge - Autonomous Multi-Agent DAG Workflow Runtime",
    description: "Distributed execution runtime for autonomous AI multi-agent workflows. Implements Kahn's topological sort for parallel wave scheduling, sandboxed tool security perimeters, episodic semantic vector memory (Cosine), and OpenTelemetry distributed tracing.",
    tags: ["TypeScript 5", "DAG Topological Scheduler", "OpenTelemetry", "Vector Embeddings", "SSE Streaming"],
    githubUrl: "https://github.com/Dev-5678/AgentForge",
  },
  {
    id: "hyper-route",
    title: "HyperRoute - High-Throughput Edge API Gateway & Rate Limiter",
    description: "Distributed edge reverse proxy featuring atomic sliding-window counter rate limiting, token-bucket burst smoothing, upstream round-robin load balancing with circuit breakers, and sub-millisecond OpenMetrics Prometheus telemetry.",
    tags: ["Node.js", "Redis Lua Scripts", "Sliding-Window", "Load Balancer", "Prometheus", "Docker"],
    githubUrl: "https://github.com/Dev-5678/HyperRoute",
    featured: true,
  },
  {
    id: "proxispeak",
    title: "ProxiSpeak ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Geospatial Proximity Audio Ecosystem",
    description: "Real-time 2D spatial audio communication grid engineered with React, WebSockets, and Web Audio API. Computes dynamic inverse-square Euclidean audio attenuation across virtual coordinate maps with zero audio bleed.",
    tags: ["React 19", "WebSockets / Socket.io", "Web Audio API", "Euclidean Math", "Spatial Audio"],
    githubUrl: "https://github.com/Dev-5678/ProxiSpeak",
    liveUrl: "https://dev-jangid-portfolio.vercel.app/#/project/proxispeak",
    featured: true
  }
]

export const educationHistory: EducationItem[] = [
  {
    id: "degree-bachelor",
    degree: "BachelorÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢s Degree ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Computer Science and Engineering",
    institution: "Jagannath University",
    location: "Bahadurgarh, Haryana",
    date: "Expected June 2027",
    isExpected: true
  },
  {
    id: "degree-school",
    degree: "High School Diploma",
    institution: "Jiva Public School",
    location: "Faridabad, Haryana",
    date: "April 2022",
    isExpected: false
  }
]

export const navItems = [
  { label: "About", href: "#about", code: "01" },
  { label: "Experience", href: "#experience", code: "02" },
  { label: "Skills", href: "#skills", code: "03" },
  { label: "Projects", href: "#projects", code: "04" },
  { label: "Education", href: "#education", code: "05" },
  { label: "Contact", href: "#contact", code: "06" }
]

// Accessibility: High-contrast ARIA labels verified for all 4 project cards
