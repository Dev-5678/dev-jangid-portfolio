import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import {
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
  Terminal,
  Layers,
  Play,
  CheckCircle2,
  Sliders,
  Keyboard as KeyboardIcon
} from 'lucide-react'

export type KeyboardCategory =
  | 'LANGUAGES'
  | 'FULL_STACK'
  | 'AI_CLOUD'
  | 'CORE_CS'
  | 'TELEMETRY'
  | 'DEVOPS'

export type SoundProfile = 'thock' | 'clicky' | 'linear'
export type RgbMode = 'static' | 'ripple' | 'rainbow' | 'matrix' | 'ember'

export interface KeySkill {
  id: string
  label: string
  subLabel?: string
  shortcutKey: string
  name: string
  category: KeyboardCategory
  categoryLabel: string
  color: {
    base: string
    light: string
    dark: string
    sideDark: string
    sideDarker: string
    sideDeep: string
    glow: string
    text: string
  }
  proficiency: string
  experience: string
  highlight: string
  codeSnippet: string
  codeOutput: string
}

export const KEYBOARD_SKILLS: KeySkill[] = [
  // --- ROW 1: Programming Languages ---
  {
    id: 'ts',
    label: 'TS',
    subLabel: '5.x',
    shortcutKey: 'T',
    name: 'TypeScript',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#007acc',
      light: '#3192e0',
      dark: '#0062a3',
      sideDark: '#004f85',
      sideDarker: '#003d66',
      sideDeep: '#002b47',
      glow: 'rgba(0, 122, 204, 0.75)',
      text: '#ffffff'
    },
    proficiency: '98% // Master',
    experience: 'Production & Full-Stack',
    highlight: 'Strict compile-time type safety, interfaces, generic constraints, zero runtime type errors.',
    codeSnippet: 'type SafePayload<T> = { status: 200; data: Readonly<T>; timestamp: number };',
    codeOutput: '✓ TypeScript compiler: 0 errors in 1,420 modules. Strict null checks passed.'
  },
  {
    id: 'js',
    label: 'JS',
    subLabel: 'ES24',
    shortcutKey: 'J',
    name: 'JavaScript',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#f7df1e',
      light: '#fae852',
      dark: '#e0c70f',
      sideDark: '#b8a204',
      sideDarker: '#8f7e02',
      sideDeep: '#665900',
      glow: 'rgba(247, 223, 30, 0.7)',
      text: '#111111'
    },
    proficiency: '96% // Expert',
    experience: 'Asynchronous Core',
    highlight: 'Event loop mastery, non-blocking I/O, V8 microtask scheduling, closures & prototypes.',
    codeSnippet: 'const pipeline = async (req) => await Promise.allSettled(microservices.map(fn => fn(req)));',
    codeOutput: '✓ Event loop: 0 latency drift. Microtasks drained in 0.8ms.'
  },
  {
    id: 'py',
    label: 'PY',
    subLabel: '3.12',
    shortcutKey: 'P',
    name: 'Python 3',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#3776ab',
      light: '#4d8fc4',
      dark: '#275780',
      sideDark: '#1e4463',
      sideDarker: '#16334a',
      sideDeep: '#0d2030',
      glow: 'rgba(55, 118, 171, 0.75)',
      text: '#ffd43b'
    },
    proficiency: '95% // Expert',
    experience: 'AI & Data Pipelines',
    highlight: 'Multimodal RAG backends, NumPy vector calculations, Streamlit engines, high-speed scripting.',
    codeSnippet: 'scores = cosine_similarity(query_emb, vector_db.embeddings); return top_k(scores, 5)',
    codeOutput: '✓ Vector similarity: Top 5 contexts retrieved in 14.2ms. Cosine: 0.942.'
  },
  {
    id: 'cpp',
    label: 'C++',
    subLabel: 'C++20',
    shortcutKey: '4',
    name: 'Modern C++',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#00599c',
      light: '#1f7ec7',
      dark: '#004275',
      sideDark: '#00335a',
      sideDarker: '#002542',
      sideDeep: '#001729',
      glow: 'rgba(0, 89, 156, 0.75)',
      text: '#ffffff'
    },
    proficiency: '90% // Advanced',
    experience: 'Low-Latency & Firmware',
    highlight: 'Deterministic manual memory management, RAII, STL algorithms, embedded aerospace controllers.',
    codeSnippet: 'template <std::integral T> constexpr auto bit_pack(T reg, uint8_t mask) noexcept;',
    codeOutput: '✓ GCC -O3 optimized: Zero allocation overhead. Cache-line aligned (64B).'
  },
  {
    id: 'c',
    label: 'C',
    subLabel: 'POSIX',
    shortcutKey: 'C',
    name: 'C Language',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#4a5568',
      light: '#718096',
      dark: '#2d3748',
      sideDark: '#232b38',
      sideDarker: '#1a202c',
      sideDeep: '#10141b',
      glow: 'rgba(160, 174, 192, 0.65)',
      text: '#e2e8f0'
    },
    proficiency: '88% // Systems Ready',
    experience: 'Bare-Metal Systems',
    highlight: 'Direct memory pointers, register-level manipulation, hardware interrupts, bitwise packet masking.',
    codeSnippet: 'inline void ISR_TIMER0_vect(void) { PORTB ^= (1 << PB5); TIFR0 |= (1 << OCF0A); }',
    codeOutput: '✓ Interrupt service completed in 1.4µs. Bare-metal hardware state nominal.'
  },
  {
    id: 'java',
    label: 'JAVA',
    subLabel: '21',
    shortcutKey: '6',
    name: 'Java LTS',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#e76f51',
      light: '#f4a261',
      dark: '#c75336',
      sideDark: '#9f3f27',
      sideDarker: '#7a2f1c',
      sideDeep: '#541f11',
      glow: 'rgba(231, 111, 81, 0.7)',
      text: '#ffffff'
    },
    proficiency: '86% // Proficient',
    experience: 'OOP & Algorithms',
    highlight: 'Object-oriented class structures, JVM garbage collection internals, threading concurrency.',
    codeSnippet: 'record TelemetryPacket(UUID id, double altitude, Instant recordedAt) {}',
    codeOutput: '✓ JVM HotSpot: JIT compiled tier-4 native assembly. 0 GC pauses.'
  },
  {
    id: 'html5',
    label: '5',
    subLabel: 'CSS3',
    shortcutKey: 'H',
    name: 'HTML5 & CSS3',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#e34f26',
      light: '#f0653f',
      dark: '#ba3c18',
      sideDark: '#942f11',
      sideDarker: '#73230b',
      sideDeep: '#4d1606',
      glow: 'rgba(227, 79, 38, 0.75)',
      text: '#ffffff'
    },
    proficiency: '98% // Expert',
    experience: 'Semantic Web & 3D UI',
    highlight: 'Semantic DOM accessibility, CSS 3D matrix transforms, responsive fluid layouts, OKLCH color science.',
    codeSnippet: 'transform: perspective(1400px) rotateX(var(--tilt-x)) preserve-3d;',
    codeOutput: '✓ Hardware GPU composition: 120 FPS render thread. W3C Validated.'
  },

  // --- ROW 2: Full Stack Web Engineering ---
  {
    id: 'next',
    label: 'N',
    subLabel: '15',
    shortcutKey: 'N',
    name: 'Next.js 15',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#18181b',
      light: '#27272a',
      dark: '#09090b',
      sideDark: '#050507',
      sideDarker: '#020203',
      sideDeep: '#000000',
      glow: 'rgba(255, 255, 255, 0.5)',
      text: '#fafafa'
    },
    proficiency: '95% // Production Master',
    experience: 'App Router & Edge',
    highlight: 'React Server Components (RSC), dynamic streaming SSR, incremental static regeneration (ISR).',
    codeSnippet: 'export default async function Page() { const data = await fetchCached(); return <View />; }',
    codeOutput: '✓ Server Component streamed: TTFB 18ms. Zero client JavaScript footprint.'
  },
  {
    id: 'tailwind',
    label: '≈',
    subLabel: 'v4',
    shortcutKey: 'W',
    name: 'Tailwind CSS 4',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      sideDark: '#0e7490',
      sideDarker: '#155e75',
      sideDeep: '#164e63',
      glow: 'rgba(6, 182, 212, 0.75)',
      text: '#ffffff'
    },
    proficiency: '98% // Expert',
    experience: 'Modern UI Architecture',
    highlight: 'Zero-runtime utility styling, custom theme tokens, glassmorphism filters, sub-millisecond build time.',
    codeSnippet: '@theme { --color-ember: oklch(0.68 0.22 35); --font-brand: var(--font-poppins); }',
    codeOutput: '✓ Vite CSS pipeline compiled in 4ms. Purged unused tokens: 99.2%.'
  },
  {
    id: 'node',
    label: '⬢',
    subLabel: 'Node',
    shortcutKey: 'E',
    name: 'Node.js',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      sideDark: '#15803d',
      sideDarker: '#166534',
      sideDeep: '#14532d',
      glow: 'rgba(34, 197, 94, 0.75)',
      text: '#ffffff'
    },
    proficiency: '94% // Expert',
    experience: 'High-Concurrency Runtime',
    highlight: 'Asynchronous event stream processing, microservice orchestrations, worker threads, native buffer I/O.',
    codeSnippet: 'pipeline(readableStream, zlib.createGzip(), responseStream, (err) => {});',
    codeOutput: '✓ Backpressure handled: High-throughput 45,000 req/sec streamed.'
  },
  {
    id: 'express',
    label: 'ex',
    subLabel: 'API',
    shortcutKey: 'X',
    name: 'Express.js',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#3f3f46',
      light: '#52525b',
      dark: '#27272a',
      sideDark: '#18181b',
      sideDarker: '#111113',
      sideDeep: '#09090b',
      glow: 'rgba(161, 161, 170, 0.65)',
      text: '#ffffff'
    },
    proficiency: '92% // Advanced',
    experience: 'RESTful Middleware',
    highlight: 'JWT authentication pipelines, rate-limiting middleware, CORS policies, modular routing architectures.',
    codeSnippet: 'app.use(rateLimiter({ windowMs: 60_000, max: 120 })); app.post("/api/auth", authenticate);',
    codeOutput: '✓ Middleware chain mounted: IP token bucket verified. Status: 200 OK.'
  },
  {
    id: 'react',
    label: '⚛',
    subLabel: '19',
    shortcutKey: 'R',
    name: 'React 19',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#00b4d8',
      light: '#48cae4',
      dark: '#0096c7',
      sideDark: '#0077b6',
      sideDarker: '#023e8a',
      sideDeep: '#03045e',
      glow: 'rgba(0, 180, 216, 0.85)',
      text: '#ffffff'
    },
    proficiency: '98% // Core Specialist',
    experience: 'State & Motion Physics',
    highlight: 'Concurrent hooks, compiler optimization, custom state machines, virtual DOM reconciliation.',
    codeSnippet: 'const [state, update] = useOptimistic(feed, (curr, update) => [...curr, update]);',
    codeOutput: '✓ React Concurrent Fiber: Reconciled with zero layout thrashing in 1.1ms.'
  },
  {
    id: 'postgres',
    label: 'PG',
    subLabel: 'SQL',
    shortcutKey: 'S',
    name: 'PostgreSQL',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#336791',
      light: '#4b7ea8',
      dark: '#265073',
      sideDark: '#1c3d59',
      sideDarker: '#132c40',
      sideDeep: '#0a1a26',
      glow: 'rgba(51, 103, 145, 0.75)',
      text: '#ffffff'
    },
    proficiency: '90% // Proficient',
    experience: 'Relational Database',
    highlight: 'ACID transactional integrity, B-Tree indexes, JSONB semi-structured storage, connection pooling.',
    codeSnippet: 'CREATE INDEX CONCURRENTLY idx_users_email ON users USING btree (email);',
    codeOutput: '✓ EXPLAIN ANALYZE: Index Scan on users. Execution Time: 0.142 ms.'
  },
  {
    id: 'mongo',
    label: '🍃',
    subLabel: 'NoSQL',
    shortcutKey: 'M',
    name: 'MongoDB',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#10b981',
      light: '#34d399',
      dark: '#059669',
      sideDark: '#047857',
      sideDarker: '#065f46',
      sideDeep: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.75)',
      text: '#ffffff'
    },
    proficiency: '89% // Proficient',
    experience: 'Document Modeling',
    highlight: 'BSON document modeling, aggregation pipelines, replica set failover, dynamic horizontal sharding.',
    codeSnippet: 'collection.aggregate([{ $match: { active: true } }, { $group: { _id: "$tag" } }]);',
    codeOutput: '✓ WiredTiger cache: Pipeline executed in 3.6ms across 50,000 documents.'
  },

  // --- ROW 3: AI, Cloud & DevOps ---
  {
    id: 'git',
    label: '⑂',
    subLabel: 'Git',
    shortcutKey: 'G',
    name: 'Git VCS',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
    color: {
      base: '#f05032',
      light: '#f5745d',
      dark: '#c73b22',
      sideDark: '#9f2d18',
      sideDarker: '#77200f',
      sideDeep: '#4e1307',
      glow: 'rgba(240, 80, 50, 0.75)',
      text: '#ffffff'
    },
    proficiency: '96% // Expert',
    experience: 'Source Control & Hygiene',
    highlight: 'Feature branching, interactive rebasing, bisecting regressions, atomic commits, submodule management.',
    codeSnippet: 'git rebase -i HEAD~5 --autosquash && git push origin feature --force-with-lease',
    codeOutput: '✓ Fast-forward rebase clean. Linear commit tree maintained.'
  },
  {
    id: 'github',
    label: '🐙',
    subLabel: 'CI/CD',
    shortcutKey: 'A',
    name: 'GitHub Actions',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
    color: {
      base: '#24292e',
      light: '#3f4448',
      dark: '#1b1f23',
      sideDark: '#14171a',
      sideDarker: '#0d0f11',
      sideDeep: '#050607',
      glow: 'rgba(255, 255, 255, 0.45)',
      text: '#ffffff'
    },
    proficiency: '94% // Expert',
    experience: 'Automated CI/CD',
    highlight: 'Automated test matrices, Docker multi-platform builds, semantic versioning, secret injection.',
    codeSnippet: 'jobs: test: runs-on: ubuntu-latest steps: - run: npm test && npm run build',
    codeOutput: '✓ Workflow run: 25/25 tests passing in 14.1s. Deployment authorized.'
  },
  {
    id: 'gemini',
    label: '✦',
    subLabel: 'Pro',
    shortcutKey: 'D',
    name: 'Gemini 1.5 Pro',
    category: 'AI_CLOUD',
    categoryLabel: 'AI & Cloud',
    color: {
      base: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      sideDark: '#4338ca',
      sideDarker: '#3730a3',
      sideDeep: '#312e81',
      glow: 'rgba(99, 102, 241, 0.85)',
      text: '#ffffff'
    },
    proficiency: '95% // AI Scholar',
    experience: 'Multimodal Intelligence',
    highlight: '2,000,000-token context processing, structured schema generation, tool-calling agents, vision analysis.',
    codeSnippet: 'const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", tools: [searchTool] });',
    codeOutput: '✓ 1.2M tokens ingested: Multimodal reasoning output parsed into strict JSON.'
  },
  {
    id: 'rag',
    label: 'RAG',
    subLabel: 'Embed',
    shortcutKey: 'F',
    name: 'Multimodal RAG',
    category: 'AI_CLOUD',
    categoryLabel: 'AI & Cloud',
    color: {
      base: '#fc6b2f',
      light: '#fd8c5a',
      dark: '#d94d14',
      sideDark: '#ad390c',
      sideDarker: '#822706',
      sideDeep: '#571702',
      glow: 'rgba(252, 107, 47, 0.85)',
      text: '#ffffff'
    },
    proficiency: '93% // Production Grade',
    experience: 'Vector Semantic Search',
    highlight: 'High-dimensional embeddings, ChromaDB vector indexing, cosine ranking, hallucination suppression.',
    codeSnippet: 'rag_query = vector_db.similarity_search_with_score(prompt_embedding, k=4)',
    codeOutput: '✓ Context grounding injected: Ground truth citation verified with 0 hallucinations.'
  },
  {
    id: 'vertex',
    label: '☁',
    subLabel: 'GCP',
    shortcutKey: 'V',
    name: 'Vertex AI & Cloud',
    category: 'AI_CLOUD',
    categoryLabel: 'AI & Cloud',
    color: {
      base: '#4285f4',
      light: '#6ba3f7',
      dark: '#1a73e8',
      sideDark: '#1557b0',
      sideDarker: '#103e7d',
      sideDeep: '#0b264d',
      glow: 'rgba(66, 133, 244, 0.75)',
      text: '#ffffff'
    },
    proficiency: '90% // Certified',
    experience: 'Managed Cloud ML',
    highlight: 'Model deployment endpoints, Cloud Storage buckets, serverless Cloud Functions, IAM least-privilege.',
    codeSnippet: 'aiplatform.init(project="dev-aerospace", location="us-central1")',
    codeOutput: '✓ Cloud endpoint healthy: Autoscaling 1..8 instances. Latency p95: 42ms.'
  },
  {
    id: 'docker',
    label: '🐳',
    subLabel: 'Box',
    shortcutKey: 'K',
    name: 'Docker Containers',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
    color: {
      base: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(2, 132, 199, 0.75)',
      text: '#ffffff'
    },
    proficiency: '92% // Advanced',
    experience: 'Container Orchestration',
    highlight: 'Multi-stage lean Dockerfiles, Compose network bridges, alpine base images, container isolation.',
    codeSnippet: 'FROM node:22-alpine AS build ... FROM nginx:alpine COPY --from=build /dist /usr/share/nginx/html',
    codeOutput: '✓ Multi-stage image size: 28MB. Security scan: 0 vulnerabilities (CVE-free).'
  },
  {
    id: 'linux',
    label: '🐧',
    subLabel: 'POSIX',
    shortcutKey: 'L',
    name: 'Linux System Admin',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
    color: {
      base: '#1c1917',
      light: '#292524',
      dark: '#0c0a09',
      sideDark: '#070605',
      sideDarker: '#040303',
      sideDeep: '#000000',
      glow: 'rgba(250, 204, 21, 0.6)',
      text: '#facc15'
    },
    proficiency: '94% // Advanced',
    experience: 'POSIX & Shell Internals',
    highlight: 'Systemd service daemons, SSH hardened tunnels, process signals, bash automation, permission models.',
    codeSnippet: 'sudo systemctl daemon-reload && sudo systemctl restart portfolio-daemon.service',
    codeOutput: '✓ systemd [PID 1]: service active (running) with uptime 99.98%.'
  },

  // --- ROW 4: Aerospace, Telemetry & Core Systems ---
  {
    id: 'cansat',
    label: '🛰',
    subLabel: '1U',
    shortcutKey: 'Z',
    name: '1U CanSat Payload',
    category: 'TELEMETRY',
    categoryLabel: 'Aerospace & Telemetry',
    color: {
      base: '#eab308',
      light: '#fde047',
      dark: '#ca8a04',
      sideDark: '#a16207',
      sideDarker: '#78350f',
      sideDeep: '#451a03',
      glow: 'rgba(234, 179, 8, 0.8)',
      text: '#18181b'
    },
    proficiency: '95% // Flight Proven',
    experience: 'Aerospace Payload Eng.',
    highlight: '1U CubeSat payload architecture, barometric pressure calibration, parachute descent recovery.',
    codeSnippet: 'float altitude = 44330.0 * (1.0 - pow(bmp280.readPressure() / 101325.0, 0.1903));',
    codeOutput: '✓ CanSat apogee: 1,024 meters detected. Parachute ejection squib fired.'
  },
  {
    id: 'uhf',
    label: '📡',
    subLabel: '433M',
    shortcutKey: 'U',
    name: '433 MHz RF Telemetry',
    category: 'TELEMETRY',
    categoryLabel: 'Aerospace & Telemetry',
    color: {
      base: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(2, 132, 199, 0.75)',
      text: '#ffffff'
    },
    proficiency: '92% // Field Tested',
    experience: 'Radio Frequency Downlink',
    highlight: 'FSK radio packet decoding, ground station live telemetry streams, RF antenna matching & link budget.',
    codeSnippet: 'rf_transceiver.transmitPacket((uint8_t*)&telemetry_frame, sizeof(telemetry_frame));',
    codeOutput: '✓ Telemetry packet locked: RSSI -68 dBm | SNR 11.4 dB. Zero packet drops.'
  },
  {
    id: 'esp32',
    label: '⚡',
    subLabel: 'MCU',
    shortcutKey: '3',
    name: 'ESP32 Embedded C++',
    category: 'TELEMETRY',
    categoryLabel: 'Aerospace & Telemetry',
    color: {
      base: '#e11d48',
      light: '#fb7185',
      dark: '#be123c',
      sideDark: '#9f1239',
      sideDarker: '#881337',
      sideDeep: '#4c0519',
      glow: 'rgba(225, 29, 72, 0.75)',
      text: '#ffffff'
    },
    proficiency: '93% // Embedded Grade',
    experience: 'Sensor Fusion & Hardware',
    highlight: 'I2C/SPI sensor fusion buses, hardware timer ISR interrupts, UART serial decoding, low-power modes.',
    codeSnippet: 'xTaskCreatePinnedToCore(telemetry_task, "RF_TASK", 4096, NULL, 1, &Task1, 0);',
    codeOutput: '✓ FreeRTOS Dual-Core scheduler: Core 0 dedicated to 433MHz RF transceiver.'
  },
  {
    id: 'sec',
    label: '🛡',
    subLabel: 'VLAN',
    shortcutKey: '8',
    name: 'Network Security (AAI)',
    category: 'CORE_CS',
    categoryLabel: 'Core CS & Systems',
    color: {
      base: '#0284c7',
      light: '#0ea5e9',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(14, 165, 233, 0.75)',
      text: '#ffffff'
    },
    proficiency: '91% // Airport Standard',
    experience: 'Civil Aviation Cybersec',
    highlight: 'Airports Authority of India (AAI) network defense, VLAN isolation, firewall ACLs, zero-trust policies.',
    codeSnippet: 'vlan 10 name ATC_SECURE; vlan 20 name RADAR_DATA; switchport access vlan 10;',
    codeOutput: '✓ AAI Civil Aviation VLAN Segregation verified: 0 inter-VLAN leakage.'
  },
  {
    id: 'wireshark',
    label: '🦈',
    subLabel: 'PCAP',
    shortcutKey: 'B',
    name: 'Wireshark Analysis',
    category: 'CORE_CS',
    categoryLabel: 'Core CS & Systems',
    color: {
      base: '#1d4ed8',
      light: '#3b82f6',
      dark: '#1e40af',
      sideDark: '#1e3a8a',
      sideDarker: '#172554',
      sideDeep: '#0f172a',
      glow: 'rgba(29, 78, 216, 0.75)',
      text: '#ffffff'
    },
    proficiency: '89% // Advanced',
    experience: 'Deep Packet Inspection',
    highlight: 'TCP/IP packet frame capture, protocol dissection, anomalous beacon detection, latency diagnostics.',
    codeSnippet: 'tshark -i eth0 -f "tcp port 443" -Y "ssl.handshake.type == 1" -T fields -e ip.src',
    codeOutput: '✓ Deep Packet Inspection: TLS 1.3 handshake validated. Zero MITM anomalies.'
  },
  {
    id: 'dsa',
    label: '∿',
    subLabel: 'BigO',
    shortcutKey: 'O',
    name: 'Data Structures & Algorithms',
    category: 'CORE_CS',
    categoryLabel: 'Core CS & Systems',
    color: {
      base: '#10b981',
      light: '#34d399',
      dark: '#059669',
      sideDark: '#047857',
      sideDarker: '#065f46',
      sideDeep: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.75)',
      text: '#ffffff'
    },
    proficiency: '96% // Foundational',
    experience: 'Algorithmic Optimization',
    highlight: 'Asymptotic complexity minimization, cache line locality, trees, graphs, dynamic programming.',
    codeSnippet: 'int memo[N]; int dp(int i) { if (i <= 0) return 0; return memo[i] ??= dp(i-1) + dp(i-2); }',
    codeOutput: '✓ Asymptotic complexity: O(N) linear time, O(1) auxiliary cache space.'
  },
  {
    id: 'vite',
    label: '⚡V',
    subLabel: 'HMR',
    shortcutKey: 'I',
    name: 'Vite & Build Tooling',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
    color: {
      base: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6d28d9',
      sideDark: '#5b21b6',
      sideDarker: '#4c1d95',
      sideDeep: '#2e1065',
      glow: 'rgba(139, 92, 246, 0.8)',
      text: '#ffffff'
    },
    proficiency: '95% // Production Master',
    experience: 'High-Speed Bundler',
    highlight: 'ESM hot module replacement (HMR), Rollup tree-shaking plugins, sub-second deployment bundles.',
    codeSnippet: 'export default defineConfig({ plugins: [react(), tailwindcss()], build: { target: "esnext" } });',
    codeOutput: '✓ Vite HMR update: src/App.tsx changed (1 module). Updated in 24ms.'
  }
]

export const CATEGORY_FILTERS = [
  { id: 'ALL', label: 'All Switches (28)' },
  { id: 'LANGUAGES', label: 'Languages' },
  { id: 'FULL_STACK', label: 'Full Stack' },
  { id: 'AI_CLOUD', label: 'AI & Cloud' },
  { id: 'CORE_CS', label: 'Systems & Security' },
  { id: 'TELEMETRY', label: 'Aerospace & IoT' },
  { id: 'DEVOPS', label: 'DevOps' }
] as const

// --- Mechanical Audio Synthesizer with 3 Distinct Sound Profiles ---
class AdvancedAudioEngine {
  private ctx: AudioContext | null = null

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  playSwitchSound(pitch: number = 1.0, isHover: boolean = false, profile: SoundProfile = 'thock') {
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      if (isHover) {
        // Soft tactile elevation blip
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        const baseFreq = (profile === 'clicky' ? 440 : 320) * pitch
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, ctx.currentTime + 0.035)

        gain.gain.setValueAtTime(0.03, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.045)
      } else {
        // Actuation profiles:
        if (profile === 'thock') {
          // Holy Panda / Boba U4T deep thock
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(160 * pitch, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(45 * pitch, ctx.currentTime + 0.08)

          gain.gain.setValueAtTime(0.22, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)

          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.095)

          // Sub-bass wood plate resonance
          const sub = ctx.createOscillator()
          const subGain = ctx.createGain()
          sub.type = 'sine'
          sub.frequency.setValueAtTime(90 * pitch, ctx.currentTime)
          sub.frequency.exponentialRampToValueAtTime(30 * pitch, ctx.currentTime + 0.06)
          subGain.gain.setValueAtTime(0.15, ctx.currentTime)
          subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)
          sub.connect(subGain)
          subGain.connect(ctx.destination)
          sub.start()
          sub.stop(ctx.currentTime + 0.075)
        } else if (profile === 'clicky') {
          // Cherry MX Blue sharp metallic click
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(1800 * pitch, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(400 * pitch, ctx.currentTime + 0.02)
          gain.gain.setValueAtTime(0.18, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.03)

          const noiseBuff = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.02), ctx.sampleRate)
          const data = noiseBuff.getChannelData(0)
          for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 80)
          const noise = ctx.createBufferSource()
          noise.buffer = noiseBuff
          const filter = ctx.createBiquadFilter()
          filter.type = 'highpass'
          filter.frequency.setValueAtTime(3000 * pitch, ctx.currentTime)
          const noiseGain = ctx.createGain()
          noiseGain.gain.setValueAtTime(0.15, ctx.currentTime)
          noise.connect(filter)
          filter.connect(noiseGain)
          noiseGain.connect(ctx.destination)
          noise.start()
          noise.stop(ctx.currentTime + 0.025)
        } else {
          // Gateron Oil King creamy linear
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(220 * pitch, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(80 * pitch, ctx.currentTime + 0.05)
          gain.gain.setValueAtTime(0.12, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.065)
        }
      }
    } catch {
      // AudioContext unavailable
    }
  }
}

const audioEngine = new AdvancedAudioEngine()

export const InteractiveSkillsKeyboard: React.FC = () => {
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null)
  const [activeKeyId, setActiveKeyId] = useState<string>('ts')
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [soundProfile, setSoundProfile] = useState<SoundProfile>('thock')
  const [rgbMode, setRgbMode] = useState<RgbMode>('static')
  const [view3D, setView3D] = useState<boolean>(true)
  const [isExecuting, setIsExecuting] = useState<boolean>(false)
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null)
  const [lastTypedKey, setLastTypedKey] = useState<string | null>(null)

  // 3D Mouse Parallax tilt state
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Active or hovered key
  const inspectedKey = useMemo(() => {
    const targetId = hoveredKeyId || activeKeyId
    return KEYBOARD_SKILLS.find((k) => k.id === targetId) || KEYBOARD_SKILLS[0]
  }, [hoveredKeyId, activeKeyId])

  // Actuation action for any key
  const actuateKey = useCallback(
    (key: KeySkill, idx: number, source: 'click' | 'keyboard' | 'hover') => {
      if (source === 'hover') {
        setHoveredKeyId(key.id)
        if (soundEnabled) {
          const pitch = 0.88 + (idx % 7) * 0.04
          audioEngine.playSwitchSound(pitch, true, soundProfile)
        }
      } else {
        // Press action
        setActiveKeyId(key.id)
        setHoveredKeyId(key.id)
        setPressedKeyId(key.id)
        setTerminalOutput(null)
        setTimeout(() => setPressedKeyId(null), 200)

        if (soundEnabled) {
          const pitch = 0.88 + (idx % 7) * 0.05
          audioEngine.playSwitchSound(pitch, false, soundProfile)
        }
      }
    },
    [soundEnabled, soundProfile]
  )

  // Physical Keyboard Listener: Allows typing from the real keyboard!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea elsewhere
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      const pressedChar = e.key.toUpperCase()
      const foundIdx = KEYBOARD_SKILLS.findIndex(
        (k) => k.shortcutKey.toUpperCase() === pressedChar || k.label.toUpperCase() === pressedChar
      )

      if (foundIdx !== -1) {
        const foundKey = KEYBOARD_SKILLS[foundIdx]
        setLastTypedKey(pressedChar)
        actuateKey(foundKey, foundIdx, 'keyboard')
      } else if (e.key === ' ' || e.code === 'Space') {
        // Spacebar cycles RGB mode!
        e.preventDefault()
        const modes: RgbMode[] = ['static', 'ripple', 'rainbow', 'matrix', 'ember']
        setRgbMode((curr) => modes[(modes.indexOf(curr) + 1) % modes.length])
        if (soundEnabled) audioEngine.playSwitchSound(0.75, false, soundProfile)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [actuateKey, soundEnabled, soundProfile])

  // Mouse Parallax movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !view3D) return
    const rect = containerRef.current.getBoundingClientRect()
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5
    setMouseTilt({
      x: xRatio * 12,
      y: yRatio * -9
    })
  }, [view3D])

  const handleMouseLeaveContainer = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 })
    setHoveredKeyId(null)
  }, [])

  // Simulate executing code in the OLED Micro-Terminal
  const handleRunCode = () => {
    setIsExecuting(true)
    setTerminalOutput('Compiling & running execution pipeline...')
    setTimeout(() => {
      setIsExecuting(false)
      setTerminalOutput(inspectedKey.codeOutput)
      if (soundEnabled) audioEngine.playSwitchSound(1.2, false, 'thock')
    }, 450)
  }

  // Smooth scroll to projects section
  const handleScrollToProjects = () => {
    const projectsSec = document.getElementById('projects')
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full mt-14 sm:mt-20 select-none">
      {/* Header Eyebrow & Hardware Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
            <span className="text-ember text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Tactile Hardware Macropad // Interactive Stack
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Dev-MK64 Mechanical Core</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-ash border border-white/10 uppercase tracking-widest hidden sm:inline-block">
              28 Hot-Swap Switches
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-ash mt-1 max-w-xl">
            Click any sculpted keycap or <strong className="text-cloud">press the corresponding key on your physical keyboard</strong> to actuate.
          </p>
        </div>

        {/* Global Hardware Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          {/* Switch Sound Profile Selector */}
          <button
            type="button"
            onClick={() => {
              const profiles: SoundProfile[] = ['thock', 'clicky', 'linear']
              const next = profiles[(profiles.indexOf(soundProfile) + 1) % profiles.length]
              setSoundProfile(next)
              audioEngine.playSwitchSound(1.0, false, next)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border bg-white/5 border-white/10 text-cloud hover:border-ember/40 hover:text-white"
            title="Cycle switch sound acoustics (Holy Panda Thock, Cherry Clicky, Gateron Linear)"
          >
            <Sliders className="w-3.5 h-3.5 text-ember" />
            <span className="text-[11px] uppercase">{soundProfile} SWITCH</span>
          </button>

          {/* RGB Matrix Mode Switcher */}
          <button
            type="button"
            onClick={() => {
              const modes: RgbMode[] = ['static', 'ripple', 'rainbow', 'matrix', 'ember']
              setRgbMode((curr) => modes[(modes.indexOf(curr) + 1) % modes.length])
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border bg-white/5 border-white/10 text-cloud hover:border-cyan-400/40 hover:text-white"
            title="Cycle RGB Backlight Animation Mode"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] uppercase">RGB: {rgbMode}</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
              soundEnabled
                ? 'bg-ember/15 border-ember/40 text-ember hover:bg-ember/25'
                : 'bg-white/5 border-white/10 text-ash hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Mechanical Switch Audio' : 'Enable Mechanical Switch Audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Perspective View Toggle */}
          <button
            type="button"
            onClick={() => setView3D((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
              view3D
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25'
                : 'bg-white/5 border-white/10 text-ash hover:text-white'
            }`}
            title="Toggle between 3D Isometric View and Flat Studio View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px]">{view3D ? '3D ISOMETRIC' : '2D STUDIO'}</span>
          </button>
        </div>
      </div>

      {/* Layer / Category Filter Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <span className="text-[10px] font-mono uppercase tracking-wider text-ash/70 flex items-center gap-1 shrink-0 mr-1">
          <Layers className="w-3 h-3 text-ember" />
          <span>Filter Layer:</span>
        </span>
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide transition-all whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-ember text-white font-bold border-ember shadow-[0_0_12px_rgba(252,107,47,0.4)]'
                  : 'bg-white/5 text-ash border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Active Key OLED Telemetry HUD & Interactive Micro-Terminal */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#0c0d12] border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Scanlines & phosphor dot texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '12px 12px'
          }}
        />
        {/* Dynamic laser top border matching inspected key */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${inspectedKey.color.base}, transparent)`,
            boxShadow: `0 0 20px ${inspectedKey.color.glow}`
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Top Row: Key Identifiers + Status Flags */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              {/* Miniature Keycap Preview Indicator */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg shrink-0 shadow-lg border border-white/20 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${inspectedKey.color.light}, ${inspectedKey.color.base})`,
                  color: inspectedKey.color.text,
                  boxShadow: `0 4px 16px ${inspectedKey.color.glow}`
                }}
              >
                {inspectedKey.label}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white font-extrabold text-lg tracking-tight font-sans">
                    {inspectedKey.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-cloud border border-white/10">
                    {inspectedKey.categoryLabel}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
                    style={{
                      backgroundColor: `${inspectedKey.color.base}22`,
                      color: inspectedKey.color.light,
                      border: `1px solid ${inspectedKey.color.base}55`
                    }}
                  >
                    {inspectedKey.proficiency}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ember/20 text-ember border border-ember/30 font-bold">
                    [KEY: {inspectedKey.shortcutKey}]
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-cloud border border-white/10 font-medium">
                    {inspectedKey.experience}
                  </span>
                </div>
                <p className="text-xs text-ash mt-0.5 font-normal leading-relaxed">
                  {inspectedKey.highlight}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ember/20 hover:bg-ember/30 border border-ember/40 text-ember text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isExecuting ? 'RUNNING...' : 'RUN CODE'}</span>
              </button>

              <button
                type="button"
                onClick={handleScrollToProjects}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cloud text-xs font-mono font-semibold transition-all cursor-pointer active:scale-95"
              >
                <span>VIEW PROJECTS</span>
              </button>
            </div>
          </div>

          {/* Micro Terminal Display: Real executable code and live terminal response */}
          <div className="rounded-xl bg-[#08080c] border border-white/10 p-3 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2 text-[10px] text-ash/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-1 text-ash/80">DEV-TERMINAL // {inspectedKey.id}.spec</span>
              </div>
              <div className="text-ash/60 flex items-center gap-1">
                <KeyboardIcon className="w-3 h-3 text-ember" />
                <span>HOTKEY: [{inspectedKey.shortcutKey}]</span>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="text-cloud/90 overflow-x-auto whitespace-pre font-mono text-[11px] sm:text-xs py-1">
              <span className="text-ember font-bold select-none">&gt;&nbsp;</span>
              <span>{inspectedKey.codeSnippet}</span>
            </div>

            {/* Terminal Execution Result */}
            {terminalOutput && (
              <div className="mt-2 pt-2 border-t border-white/10 text-emerald-400 font-mono text-[11px] flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>{terminalOutput}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Hardware Keyboard Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveContainer}
        className="w-full flex items-center justify-center py-6 sm:py-10 md:py-14 overflow-x-auto overflow-y-visible"
        style={{
          perspective: view3D ? '1400px' : 'none',
          perspectiveOrigin: '50% 30%'
        }}
      >
        {/* Chassis Body */}
        <div
          className="relative transition-transform duration-300 ease-out transform-gpu shrink-0"
          style={{
            transformStyle: view3D ? 'preserve-3d' : 'flat',
            transform: view3D
              ? `rotateX(${50 + mouseTilt.y}deg) rotateZ(${-25 + mouseTilt.x * 0.6}deg) rotateY(${7 + mouseTilt.x * 0.5}deg)`
              : 'none'
          }}
        >
          {/* Top Aviator Cable Accent */}
          <div
            className="absolute -top-12 left-10 pointer-events-none hidden sm:flex items-center gap-2 opacity-80"
            style={{ transform: view3D ? 'translateZ(-10px)' : 'none' }}
          >
            <div className="w-32 h-2.5 rounded-full bg-gradient-to-r from-transparent via-[#2b2d38] to-[#1e2029] shadow-inner" />
            <div className="w-5 h-4 rounded-sm bg-gradient-to-b from-[#94a3b8] via-[#64748b] to-[#475569] border border-white/20 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-2.5 bg-[#334155] rounded-[1px]" />
            </div>
            <div className="w-6 h-2 rounded-full bg-[#1e2029]" />
          </div>

          {/* Main Mechanical Keyboard Case (Chassis) */}
          <div
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-white/15 transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, #181922 0%, #101118 60%, #08090d 100%)',
              boxShadow: view3D
                ? `
                  0 2px 0 #282a3a,
                  0 4px 0 #1e202d,
                  0 8px 0 #14151e,
                  0 14px 0 #0d0e14,
                  0 20px 0 #07070a,
                  0 30px 45px rgba(0, 0, 0, 0.85),
                  0 0 60px rgba(252, 107, 47, 0.12)
                `
                : '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
          >
            {/* CNC Brass Corner Torx Screws */}
            <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>

            {/* Recessed Switch Plate */}
            <div
              className="relative p-2.5 sm:p-3.5 rounded-xl border border-black/80 shadow-inner"
              style={{
                background: 'linear-gradient(180deg, #090a0f 0%, #0d0e14 100%)',
                boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)'
              }}
            >
              {/* Keyboard Grid: 4 rows of 7 keys */}
              <div className="grid grid-cols-7 gap-2.5 sm:gap-3 md:gap-3.5">
                {KEYBOARD_SKILLS.map((skill, idx) => {
                  const isHovered = hoveredKeyId === skill.id
                  const isSelected = activeKeyId === skill.id
                  const isPressed = pressedKeyId === skill.id
                  const matchesFilter = activeCategory === 'ALL' || skill.category === activeCategory

                  // Dynamic RGB glow calculation based on chosen RGB mode
                  let activeGlow = skill.color.glow
                  if (rgbMode === 'rainbow') {
                    const hue = (idx * 28 + Date.now() / 80) % 360
                    activeGlow = `hsla(${hue}, 90%, 55%, 0.85)`
                  } else if (rgbMode === 'matrix') {
                    activeGlow = 'rgba(34, 197, 94, 0.85)'
                  } else if (rgbMode === 'ember') {
                    activeGlow = 'rgba(252, 107, 47, 0.85)'
                  }

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      aria-label={`${skill.name} mechanical keycap. Hotkey: ${skill.shortcutKey}`}
                      className="group relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0 border-0 bg-transparent cursor-pointer focus:outline-none"
                      style={{
                        transformStyle: view3D ? 'preserve-3d' : 'flat',
                        touchAction: 'manipulation'
                      }}
                      onPointerEnter={() => actuateKey(skill, idx, 'hover')}
                      onPointerDown={() => actuateKey(skill, idx, 'click')}
                    >
                      {/* 1. Underlying Switch Bed & Cherry Stem (Revealed when key pops up!) */}
                      <div
                        className="absolute inset-1 rounded-md bg-[#07080c] border border-white/5 flex items-center justify-center pointer-events-none"
                        style={{
                          transform: view3D ? 'translateZ(0px)' : 'none'
                        }}
                      >
                        {/* Red mechanical switch housing */}
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] bg-[#991b1b] border border-[#7f1d1d] flex items-center justify-center shadow-inner">
                          {/* Cross stem */}
                          <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 bg-[#ef4444] rounded-[0.5px]" />
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-[#ef4444] rounded-[0.5px]" />
                          </div>
                        </div>

                        {/* Underglow RGB LED projection onto plate */}
                        <div
                          className="absolute inset-0 rounded-md transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${activeGlow} 0%, transparent 75%)`,
                            opacity: isHovered || isSelected ? 0.95 : matchesFilter ? 0.3 : 0.05
                          }}
                        />
                      </div>

                      {/* 2. The 3D Sculpted Mechanical Keycap Body */}
                      <div
                        className={`absolute inset-0 rounded-[7px] sm:rounded-[9px] transition-all duration-200 transform-gpu flex flex-col items-center justify-center pointer-events-none ${
                          !matchesFilter ? 'opacity-35 grayscale contrast-75' : 'opacity-100'
                        }`}
                        style={{
                          transformStyle: view3D ? 'preserve-3d' : 'flat',
                          // Dynamic 3D Pop-Up Elevation on Hover or Pressed!
                          transform: view3D
                            ? isPressed
                              ? 'translateZ(4px) translateY(2px) scale(0.96)'
                              : isHovered
                              ? 'translateZ(38px) translateY(-14px) scale(1.08)'
                              : isSelected
                              ? 'translateZ(24px) translateY(-8px) scale(1.04)'
                              : 'translateZ(8px) translateY(0px) scale(1.0)'
                            : isPressed
                            ? 'translateY(2px) scale(0.96)'
                            : isHovered
                            ? 'translateY(-10px) scale(1.06)'
                            : isSelected
                            ? 'translateY(-5px) scale(1.03)'
                            : 'translateY(0px)',
                          background: `linear-gradient(180deg, ${skill.color.light} 0%, ${skill.color.base} 55%, ${skill.color.dark} 100%)`,
                          boxShadow: isPressed
                            ? `
                              0 1px 0 ${skill.color.sideDark},
                              0 2px 4px rgba(0, 0, 0, 0.4)
                            `
                            : isHovered
                            ? `
                              0 2px 0 ${skill.color.sideDark},
                              0 5px 0 ${skill.color.sideDarker},
                              0 10px 0 ${skill.color.sideDeep},
                              0 18px 24px rgba(0, 0, 0, 0.75),
                              0 0 28px ${activeGlow}
                            `
                            : isSelected
                            ? `
                              0 2px 0 ${skill.color.sideDark},
                              0 4px 0 ${skill.color.sideDarker},
                              0 7px 0 ${skill.color.sideDeep},
                              0 12px 16px rgba(0, 0, 0, 0.65),
                              0 0 18px ${activeGlow}
                            `
                            : `
                              0 1.5px 0 ${skill.color.sideDark},
                              0 3px 0 ${skill.color.sideDarker},
                              0 5px 0 ${skill.color.sideDeep},
                              0 8px 10px rgba(0, 0, 0, 0.5)
                            `,
                          zIndex: isHovered ? 50 : isSelected ? 30 : 10
                        }}
                      >
                        {/* Keycap Ergonomic Concave Dish */}
                        <div
                          className="absolute inset-[2.5px] sm:inset-[3.5px] rounded-[5px] sm:rounded-[7px] flex flex-col items-center justify-center p-0.5 overflow-hidden pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.18) 100%)`,
                            boxShadow: `
                              inset 0 1.5px 2px rgba(255,255,255,0.4),
                              inset 0 -1.5px 2px rgba(0,0,0,0.4)
                            `
                          }}
                        >
                          {/* Monogram / Icon Symbol */}
                          <div
                            className="font-black leading-none tracking-tight flex items-center justify-center text-center select-none"
                            style={{
                              color: skill.color.text,
                              fontSize:
                                skill.label.length >= 4
                                  ? '9px'
                                  : skill.label.length === 3
                                  ? '11px'
                                  : skill.label.length === 2
                                  ? '14px'
                                  : '17px',
                              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                            }}
                          >
                            {skill.label}
                          </div>

                          {/* Subtle Sub-label */}
                          {skill.subLabel && (
                            <span
                              className="text-[7px] sm:text-[8px] font-mono font-bold leading-none tracking-tight mt-0.5 opacity-85"
                              style={{ color: skill.color.text }}
                            >
                              {skill.subLabel}
                            </span>
                          )}
                        </div>

                        {/* Top specular highlight rim */}
                        <div className="absolute top-1 inset-x-2 h-[1px] bg-white/40 rounded-full pointer-events-none" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bottom Keyboard Lip / Callout & Brand Engraving */}
            <div className="mt-3.5 sm:mt-4 flex items-center justify-between px-1 text-[10px] font-mono text-ash/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
                <span className="uppercase tracking-widest text-[9px] text-ash/80">
                  CHOPPER-64 // CUSTOM FR4 SWITCH PLATE
                </span>
                {lastTypedKey && (
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[8px] font-bold">
                    TYPED: [{lastTypedKey}]
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block uppercase tracking-wider text-[9px] text-ash/60">
                  HOT-SWAPPABLE 5-PIN RGB
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-ember font-bold text-[9px]">
                  DEV JANGID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Interactive Legend Hint below the keyboard */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ash/70 text-center">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ember" />
          <span>Interactive 3D elevation active on hover</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Press real keys (T, P, R, G, D, etc.) or Spacebar for RGB wave</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span>Move mouse across container to parallax-tilt chassis</span>
        </span>
      </div>
    </div>
  )
}

export default InteractiveSkillsKeyboard
