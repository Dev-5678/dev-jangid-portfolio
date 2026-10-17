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
  bio: "Dynamic IT professional with hands-on experience at Airports Authority of India, specializing in system maintenance and network security compliance. Proficient in data structures and algorithms, with strong problem-solving skills focused on improving IT processes and delivering innovative solutions in fast-paced environments.",
  roleSummary: "Specializing in System Maintenance, Network Security Compliance, Data Structures, and Generative AI Solutions.",
  monogram: "DJ",
  status: "OPEN FOR OPPORTUNITIES",
  educationSummary: "B.Tech CSE (Expected 2027)",
  github: "https://github.com/devjangid911",
  linkedin: "https://www.linkedin.com/in/devjangid911/"
}

export const experiences: ExperienceItem[] = [
  {
    id: "aai-it-intern",
    role: "Network Security & IT Intern",
    organization: "Airports Authority of India (AAI)",
    location: "New Delhi, India",
    dates: "14 August 2026 – 25 September 2026",
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
    dates: "15 July 2025 – 31 July 2025",
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
    description: "Production and algorithmic languages used for high-performance systems, database operations, and software development.",
    badge: "LANGUAGES",
    skills: ["C++", "Java", "Python", "TypeScript", "JavaScript (ESNext)", "SQL", "C", "HTML5 & Modern CSS"]
  },
  {
    title: "Core Computer Science & Systems",
    description: "Deep computational foundations, algorithmic complexity optimization, and enterprise infrastructure.",
    badge: "CORE_CS",
    skills: [
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOP)",
      "Network Security & Compliance",
      "VLAN & Subnet Segregation",
      "Linux & POSIX Shell",
      "Database Administration"
    ]
  },
  {
    title: "Artificial Intelligence & Cloud",
    description: "Next-generation generative intelligence, semantic retrieval architectures, and rapid cloud deployment.",
    badge: "AI_CLOUD",
    skills: [
      "Multimodal Generative AI",
      "Gemini 1.5 Pro & Vertex AI",
      "Retrieval-Augmented Generation (RAG)",
      "High-Dimensional Vector Embeddings",
      "Streamlit Application Engine",
      "Prompt Optimization & Context Grounding"
    ]
  },
  {
    title: "Modern Web & Frontend Engineering",
    description: "Interactive, motion-driven user interfaces built with modern reactive component patterns and build pipelines.",
    badge: "FRONTEND_UI",
    skills: [
      "React 19 & Next.js Paradigms",
      "GSAP Motion & Kinetic Typography",
      "Tailwind CSS 4",
      "Vite & Rollup Bundling",
      "WebSockets & RESTful APIs",
      "Vitest & Accessibility (WCAG 2.4.1)"
    ]
  },
  {
    title: "Aerospace & Embedded Telemetry",
    description: "Mission-critical hardware/software communication and remote sensing protocols.",
    badge: "TELEMETRY",
    skills: [
      "1U CanSat Payload Architecture",
      "433 MHz UHF Radio Telemetry",
      "FSK Packet Decoding",
      "Sensor Telemetry Pipelines",
      "Drone Navigation Protocols"
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
  // Standalone projects can be added here with real verified repository URLs.
]

export const educationHistory: EducationItem[] = [
  {
    id: "degree-bachelor",
    degree: "Bachelor’s Degree — Computer Science and Engineering",
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
