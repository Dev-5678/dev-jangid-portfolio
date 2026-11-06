export type StackKey =
  | 'c'
  | 'cpp'
  | 'python'
  | 'python-fullstack'
  | 'java'
  | 'java-fullstack'
  | 'web'
  | 'devops'

export interface Subsystem {
  name: string
  role: string
  tech: string
}

export interface ProjectData {
  id: string
  number: string
  title: string
  category: string
  stackKey: StackKey
  language: string
  domain: string
  description: string
  devNotes: string
  tags: string[]
  appType: 'aai' | 'cansat' | 'rag' | 'systems' | 'proxispeak' | 'universal'
  simType: 'kernel' | 'hft' | 'network' | 'database' | 'concurrency' | 'microservices' | 'protocol' | 'devops' | 'ai'
  image: string
  liveMetrics: { label: string; value: string }[]
  githubUrl: string
  liveUrl?: string
  featured?: boolean
  architecture: {
    overview: string
    subsystems: Subsystem[]
    securityAndIntegrity: string[]
    keyEngineeringAchievements: string[]
  }
}

export const STACK_CATEGORIES: { key: StackKey | 'all'; label: string; count: number; badge: string; icon: string }[] = [
  { key: 'c', label: 'C Systems', count: 5, badge: 'C99 / POSIX', icon: 'Terminal' },
  { key: 'cpp', label: 'C++ Systems', count: 5, badge: 'MODERN C++20', icon: 'Cpu' },
  { key: 'python', label: 'Python Core', count: 5, badge: 'ASYNCIO / SOCKETS', icon: 'FileCode' },
  { key: 'python-fullstack', label: 'Python Full Stack', count: 5, badge: 'FASTAPI & AI', icon: 'Layers' },
  { key: 'java', label: 'Java Core', count: 5, badge: 'JAVA 21 / OOP', icon: 'Coffee' },
  { key: 'java-fullstack', label: 'Java Full Stack', count: 5, badge: 'SPRING BOOT 3', icon: 'Server' },
  { key: 'web', label: 'TypeScript & Web', count: 5, badge: 'REACT & PROTOCOLS', icon: 'Globe' },
  { key: 'devops', label: 'DevOps & Cloud', count: 5, badge: 'LINUX / DOCKER', icon: 'HardDrive' }
]

export const ALL_PROJECTS: ProjectData[] = [
  // ==========================================
  // STACK 1: C (Low-Level Systems & OS) [1-5]
  // ==========================================
  {
    id: 'aerortos-1u',
    number: '01 / 40',
    title: 'AeroRTOS-1U — Embedded CanSat Flight Firmware',
    category: 'C Systems & OS',
    stackKey: 'c',
    language: 'C',
    domain: 'Embedded Firmware & Microcontroller Telemetry',
    description: 'Embedded C flight firmware running on an ESP32/ATmega microcontroller for a 1U CanSat payload. Uses non-blocking hardware timer ticks to poll barometric pressure and accelerometer sensors, encoding telemetry packets with CRC-16 checksums for 433 MHz UHF radio transmission.',
    devNotes: 'During live field tests with India Space Lab, sensor reading delays were stalling radio packet broadcasts. I redesigned the loop into a non-blocking state machine driven by a 10 ms hardware timer tick, ensuring sensor reads never delay the 433 MHz radio frame.',
    tags: ['C99', 'ESP32 / AVR', 'TIMER ISR', 'CRC-16 CCITT', 'I2C / SPI', 'EMBEDDED'],
    appType: 'cansat',
    simType: 'kernel',
    image: '/projects/cansat-space.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Timer Tick', value: '10 ms Periodic' },
      { label: 'Packet Rate', value: '5 Hz UHF Stream' },
      { label: 'Integrity', value: 'CRC-16 CCITT Verified' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AeroRTOS-1U',
    architecture: {
      overview: 'Non-blocking embedded state machine. A hardware timer interrupt triggers sensor polling on I2C/SPI buses, formats telemetry data into binary structures with CRC-16 checksums, and dispatches packets over a 433 MHz UHF serial transceiver.',
      subsystems: [
        { name: 'Hardware Timer Scheduler', role: 'Maintains deterministic 10 ms execution slots without busy-wait loops', tech: 'Hardware Timer ISR' },
        { name: 'Sensor Polling Drivers', role: 'Reads pressure, temperature, and acceleration via non-blocking registers', tech: 'I2C / SPI Protocols' },
        { name: 'CRC Frame Packetizer', role: 'Serializes sensor floats and calculates 16-bit polynomial checksum', tech: 'CRC-16-CCITT Lookup' }
      ],
      securityAndIntegrity: [
        'Zero dynamic heap allocation (malloc-free static BSS buffers) prevents memory fragmentation in flight.',
        'Hardware watchdog timer auto-resets the microcontroller within 64 ms in case of bus lockup.',
        'Corrupted radio frames are detected and dropped on reception via CRC verification.'
      ],
      keyEngineeringAchievements: [
        'Streamed continuous telemetry during simulated 300m parachute drops with zero dropped frames.',
        'Kept microcontroller memory footprint under 14 KB of RAM.'
      ]
    }
  },
  {
    id: 'valloc-c',
    number: '02 / 40',
    title: 'vAlloc — Custom Segregated Free List Memory Allocator',
    category: 'C Systems & OS',
    stackKey: 'c',
    language: 'C',
    domain: 'Operating Systems & Memory Management',
    description: 'A user-space memory allocator implementation demonstrating dynamic memory management. Implements segregated free lists for power-of-two size classes (16B to 2KB) and boundary-tag coalescing using POSIX mmap() syscalls to reduce external memory fragmentation.',
    devNotes: 'I wrote vAlloc to truly understand how malloc() and free() work behind the scenes. Implementing boundary-tag headers and footers showed me how pointers can be manipulated to merge adjacent free memory blocks in O(1) time.',
    tags: ['C99', 'POSIX MMAP', 'POINTER MATH', 'BOUNDARY TAGS', 'VALGRIND', 'MEMORY MANAGEMENT'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Block Coalesce', value: 'O(1) Instant' },
      { label: 'Alignment', value: '8-Byte Word Aligned' },
      { label: 'Memory Leak', value: 'Zero (Valgrind Clean)' }
    ],
    githubUrl: 'https://github.com/Dev-5678/vAlloc',
    architecture: {
      overview: 'User-space memory allocator. Allocations are grouped into size-class buckets backed by segregated free lists. Free operations inspect neighboring block headers and footers to coalesce contiguous free memory back into the heap pool.',
      subsystems: [
        { name: 'Segregated Bucket Engine', role: 'Routes allocation requests to power-of-two free list chains', tech: 'Intrusive Doubly-Linked Lists' },
        { name: 'Boundary Tag Coalescer', role: 'Merges adjacent free blocks instantaneously upon free()', tech: 'Block Header / Footer Tags' },
        { name: 'Virtual Memory Arena', role: 'Acquires 64 KB memory pages directly from Linux kernel', tech: 'POSIX mmap() / munmap()' }
      ],
      securityAndIntegrity: [
        '8-byte boundary alignment enforced on all returned memory addresses for CPU architecture safety.',
        'Magic canary bytes at block boundaries detect heap buffer overflows upon free().',
        'Double-free detection rejects deallocating already-freed pointers.'
      ],
      keyEngineeringAchievements: [
        'Passed comprehensive Valgrind test suites with 0 bytes lost across 100,000 allocation cycles.',
        'Achieved sub-100ns allocation and deallocation speed on microbenchmarks.'
      ]
    }
  },
  {
    id: 'apex-shell',
    number: '03 / 40',
    title: 'ApexShell — POSIX Unix Command Shell & Process Runner',
    category: 'C Systems & OS',
    stackKey: 'c',
    language: 'C',
    domain: 'Systems Programming & Process Control',
    description: 'An interactive command-line Unix shell written from scratch in C99. Implements fork-and-exec process management, multi-stage pipeline chaining (cmd1 | cmd2 | cmd3), file redirection (<, >), and clean background process reaping via waitpid(WNOHANG).',
    devNotes: 'Building this shell taught me how processes communicate over pipes and how easy it is to leak zombie processes. Handling SIGCHLD properly with waitpid() inside the signal handler was the key to keeping the process table clean.',
    tags: ['C99', 'FORK / EXECVP', 'POSIX SIGNALS', 'UNIX PIPES', 'DUP2 REDIRECTION', 'CLI'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Piping Depth', value: 'Multi-Stage (|)' },
      { label: 'Signals Trapped', value: 'SIGINT, SIGTSTP, SIGCHLD' },
      { label: 'Zombie Leaks', value: 'Zero (waitpid clean)' }
    ],
    githubUrl: 'https://github.com/Dev-5678/ApexShell',
    architecture: {
      overview: 'Interactive Unix command interpreter. Reads user input via readline, tokenizes commands and flags into syntax trees, sets up inter-process pipe file descriptors via dup2(), and forks child processes to execute binaries.',
      subsystems: [
        { name: 'Command Lexer & Tokenizer', role: 'Splits raw terminal input into arguments, pipe operators, and file paths', tech: 'C String Parsing' },
        { name: 'Process Pipeline Manager', role: 'Chains stdout of preceding commands to stdin of next commands', tech: 'pipe() / dup2() Syscalls' },
        { name: 'Signal & Job Supervisor', role: 'Traps Ctrl+C interrupts and reaps exited child processes in background', tech: 'sigaction / waitpid()' }
      ],
      securityAndIntegrity: [
        'Unclosed file descriptors are cleanly closed in child processes to prevent descriptor leakage.',
        'Path traversal bounds checks prevent buffer overruns on long command strings.'
      ],
      keyEngineeringAchievements: [
        'Successfully chained 5-stage complex command pipelines (e.g. cat | grep | sort | uniq | wc).',
        'Preserved terminal state cleanly under interactive Ctrl+C and Ctrl+Z signals.'
      ]
    }
  },
  {
    id: 'titannet-raw',
    number: '04 / 40',
    title: 'TitanNet-Raw — Raw Socket Network Packet Sniffer & ARP Monitor',
    category: 'C Systems & OS',
    stackKey: 'c',
    language: 'C',
    domain: 'Network Security & Packet Inspection',
    description: 'A Linux network packet sniffer written using AF_PACKET raw sockets. Dissects Ethernet, IPv4, TCP, UDP, and ARP frames directly off the network card in real time, alerting on unsolicited ARP replies to detect local Man-in-the-Middle spoofing.',
    devNotes: 'Directly motivated by network security compliance work at Airports Authority of India (AAI). Writing a raw socket dissector in pure C showed me the exact byte-by-byte layout of Ethernet, IP, and TCP headers without relying on high-level tools.',
    tags: ['C99', 'RAW SOCKETS', 'AF_PACKET', 'PACKET DISSECTION', 'ARP DETECTION', 'NETWORKING'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Layer Support', value: 'Layer 2, 3 & 4' },
      { label: 'Inspection Rate', value: '~1,500 pkts/sec' },
      { label: 'Alert Trigger', value: 'ARP Spoofing Flag' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TitanNet-Raw',
    architecture: {
      overview: 'Packet capture engine bound to Linux raw sockets. Puts the interface into promiscuous mode, decodes incoming frame headers without payload copying, and checks ARP table mappings against known subnet gateways.',
      subsystems: [
        { name: 'Raw Socket Ingress', role: 'Captures incoming link-layer frames from network interface', tech: 'Linux AF_PACKET / SOCK_RAW' },
        { name: 'Header Dissection Pipeline', role: 'Decodes Ethernet MACs, IP addresses, TCP/UDP port flags, and payloads', tech: 'netinet/ip.h C Structs' },
        { name: 'ARP Spoofing Detector', role: 'Maintains in-memory IP-to-MAC baseline to flag gateway conflicts', tech: 'Hash Table Lookup' }
      ],
      securityAndIntegrity: [
        'Root privileges dropped via setuid/setgid immediately after raw socket binding.',
        'Buffer bounds checks prevent buffer overruns when handling truncated or malformed IP packets.'
      ],
      keyEngineeringAchievements: [
        'Captured and dissected network traffic on 100 Mbps subnets with under 2% CPU usage.',
        'Successfully flagged simulated ARP poisoning attacks generated via arpspoof.'
      ]
    }
  },
  {
    id: 'bytevm',
    number: '05 / 40',
    title: 'ByteVM — Stack-Based Bytecode Interpreter & Virtual Machine',
    category: 'C Systems & OS',
    stackKey: 'c',
    language: 'C',
    domain: 'Virtual Machine Architecture & Compiler Runtimes',
    description: 'A compact stack-based virtual machine written in C. Features a program counter, 256-level evaluation stack, 16 custom opcodes (PUSH, POP, ADD, SUB, MULT, DIV, JMP, JEQ, PRINT, HALT), and a fixed memory pool for evaluating compiled bytecode programs.',
    devNotes: 'I built ByteVM to demystify how the JVM and Python CPython runtimes actually interpret bytecode instructions. Implementing the instruction dispatch loop and operand stack gave me a deep appreciation for compiler target languages.',
    tags: ['C99', 'STACK VM', 'BYTECODE INTERPRETER', 'OPCODES', 'PROGRAM COUNTER', 'COMPILERS'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Instruction Set', value: '16 Custom Opcodes' },
      { label: 'Call Stack Depth', value: '256 Frames' },
      { label: 'Memory Footprint', value: '64 KB Static Buffer' }
    ],
    githubUrl: 'https://github.com/Dev-5678/ByteVM',
    architecture: {
      overview: 'Virtual runtime environment with an instruction evaluation loop. Decodes binary bytecode sequences, manipulates values on an operand stack, and manages conditional program counter jumps.',
      subsystems: [
        { name: 'Instruction Dispatch Loop', role: 'Fetches opcode at program counter and executes operations', tech: 'Switch-Case Dispatch C' },
        { name: 'Operand Stack Manager', role: 'Pushes and pops integer values with underflow/overflow bounds checking', tech: 'Static Array Stack' },
        { name: 'Bytecode Binary Loader', role: 'Reads compiled instruction sequences and data constants from disk', tech: 'Binary File I/O' }
      ],
      securityAndIntegrity: [
        'Stack boundary checks prevent operand stack overflow and underflow crashes.',
        'Jump instruction target bounds verification prevents execution outside allocated code memory.'
      ],
      keyEngineeringAchievements: [
        'Successfully executed recursive mathematical functions (Fibonacci, Factorial) in custom bytecode.',
        'Kept entire interpreter engine under 600 lines of clean, portable C code.'
      ]
    }
  },

  // ==========================================
  // STACK 2: Modern C++ (Algorithms & High-Perf) [6-10]
  // ==========================================
  {
    id: 'pathrouter-cpp',
    number: '06 / 40',
    title: 'PathRouter-CPP — Road Network & Graph Routing Engine',
    category: 'C++ Systems',
    stackKey: 'cpp',
    language: 'C++',
    domain: 'Graph Algorithms & Spatial Routing',
    description: 'A high-performance shortest-path routing engine in Modern C++20 for large graph networks. Implements Dijkstra’s algorithm and A* heuristic search using a flat contiguous min-heap, finding optimal routes across 50,000 road network nodes in under 2 milliseconds.',
    devNotes: 'In standard C++, std::priority_queue can cause multiple small node allocations. By storing the graph adjacency list in contiguous std::vector buffers and using an indexed flat binary heap, I cut route calculation time by more than half.',
    tags: ['MODERN C++20', 'DIJKSTRA', 'A* SEARCH', 'FLAT MIN-HEAP', 'GRAPH THEORY', 'ALGORITHMS'],
    appType: 'systems',
    simType: 'hft',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Graph Scale', value: '50,000 Nodes' },
      { label: 'Route Time', value: '~1.8 ms Average' },
      { label: 'Memory Layout', value: 'Contiguous std::vector' }
    ],
    githubUrl: 'https://github.com/Dev-5678/PathRouter-CPP',
    architecture: {
      overview: 'In-memory graph routing engine. Pre-processes coordinate nodes and directed edge weights into flat contiguous memory. Runs A* and Dijkstra searches using an indexed min-heap for O(log V) priority queue updates.',
      subsystems: [
        { name: 'Contiguous Adjacency Graph', role: 'Stores nodes and edge weights in cache-friendly flat arrays', tech: 'std::vector<Edge>' },
        { name: 'Indexed Flat Min-Heap', role: 'Supports O(log N) key decrease operations for Dijkstra relaxation', tech: 'Flat Binary Array Heap' },
        { name: 'A* Euclidean Heuristic', role: 'Accelerates search toward destination coordinates using Euclidean distance', tech: 'Coordinate Math' }
      ],
      securityAndIntegrity: [
        'Input graph validation drops negative edge weights to prevent infinite relaxation loops.',
        'Memory reserve pre-allocation prevents dynamic vector reallocations during active searches.'
      ],
      keyEngineeringAchievements: [
        'Calculated shortest paths across a 50,000-node simulated road network in an average of 1.8 milliseconds.',
        'Benchmarked 2.3x faster than standard std::priority_queue Dijkstra implementations.'
      ]
    }
  },
  {
    id: 'robinhood-kv',
    number: '07 / 40',
    title: 'RobinHood-KV — Cache-Conscious Open-Addressing Hash Table',
    category: 'C++ Systems',
    stackKey: 'cpp',
    language: 'C++',
    domain: 'Data Structures & Cache Optimization',
    description: 'An in-memory key-value hash table in Modern C++ using Robin Hood open addressing. Minimizes probe sequence variance during hash collisions, storing keys and values in flat contiguous arrays to maintain high CPU cache locality.',
    devNotes: 'Standard std::unordered_map uses linked lists for bucket collisions, causing frequent CPU cache misses. Robin Hood hashing keeps everything in one continuous array and shifts rich elements during insertion, keeping lookup probe lengths under 6 slots.',
    tags: ['MODERN C++20', 'ROBIN HOOD HASHING', 'CACHE LOCALITY', 'OPEN ADDRESSING', 'DATA STRUCTURES'],
    appType: 'systems',
    simType: 'hft',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Max Probe', value: '<6 Slots Bounded' },
      { label: 'Memory Layout', value: 'Flat Contiguous Array' },
      { label: 'Speedup', value: '2.1x over std::map' }
    ],
    githubUrl: 'https://github.com/Dev-5678/RobinHood-KV',
    architecture: {
      overview: 'Flat array hash map. Stores keys, values, and 1-byte hash fingerprints in contiguous slots. Upon collisions, elements that traveled farther from their initial slot displace closer elements, maintaining a low and balanced probe sequence length across all keys.',
      subsystems: [
        { name: 'Contiguous Slot Buffer', role: 'Houses key-value pairs and probe distances in single allocated buffer', tech: 'std::unique_ptr<Slot[]>' },
        { name: 'Robin Hood Inserter', role: 'Performs element swapping to minimize maximum probe variance', tech: 'Robin Hood Algorithm' },
        { name: 'Backward-Shift Deleter', role: 'Removes entries without tombstone markers by shifting adjacent slots back', tech: 'O(Probe) Shift Logic' }
      ],
      securityAndIntegrity: [
        'FNV-1a hash algorithm with randomized seed prevents deliberate hash collision attacks.',
        'Automatic 2x table resizing triggers when load factor crosses 0.85.'
      ],
      keyEngineeringAchievements: [
        'Maintained bounded probe lengths under 6 slots across 500,000 key insertions.',
        'Demonstrated 2.1x faster random key lookups compared to std::map on standard benchmarks.'
      ]
    }
  },
  {
    id: 'telemetry-dsp',
    number: '08 / 40',
    title: 'TelemetryDSP — 433 MHz Radio FSK Audio Demodulator & Decoder',
    category: 'C++ Systems',
    stackKey: 'cpp',
    language: 'C++',
    domain: 'Digital Signal Processing & Aerospace Radio Comms',
    description: 'A digital signal processing tool written in C++20 to demodulate audio recordings from 433 MHz CanSat radio receivers. Employs digital bandpass filtering and the Goertzel tone algorithm to separate 1200 Hz and 2200 Hz audio frequencies and decode ASCII telemetry packets.',
    devNotes: 'During field testing with India Space Lab, radio signal flutter caused corrupted bytes. I wrote this DSP pipeline in C++20 to process raw audio from the SDR ground station, successfully recovering weak signals that hardware decoders missed.',
    tags: ['MODERN C++20', 'DSP', 'GOERTZEL ALGORITHM', 'FSK DEMODULATION', 'AUDIO PROCESSING', 'CANSAT'],
    appType: 'cansat',
    simType: 'protocol',
    image: '/projects/cansat-space.jpg',
    liveMetrics: [
      { label: 'Audio Rate', value: '44.1 kHz PCM Stream' },
      { label: 'Tone Detection', value: '1200 Hz / 2200 Hz' },
      { label: 'Frame Recovery', value: '98% Accurate' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TelemetryDSP',
    architecture: {
      overview: 'Audio stream signal processing tool. Reads raw PCM WAV audio samples, applies an IIR digital bandpass filter to eliminate background noise, uses dual Goertzel tone algorithms to detect mark/space bits, and outputs recovered text strings.',
      subsystems: [
        { name: 'WAV Audio File Reader', role: 'Parses 44.1 kHz 16-bit uncompressed audio samples into memory', tech: 'C++ Binary Stream' },
        { name: 'Dual Goertzel Tone Discriminator', role: 'Calculates energy at 1200 Hz and 2200 Hz to decide binary bits', tech: 'Goertzel DSP Math' },
        { name: 'UART Packet Framer', role: 'Detects start/stop bits and formats recovered bytes into text lines', tech: 'State Machine C++' }
      ],
      securityAndIntegrity: [
        'Floating-point denormal checks prevent CPU slowdowns during silent audio segments.',
        'CRC-16 validation verifies that recovered telemetry frames are intact.'
      ],
      keyEngineeringAchievements: [
        'Successfully decoded 98% of recorded telemetry packets from noisy field audio clips.',
        'Processed a 5-minute descent recording in under 2.5 seconds of CPU time.'
      ]
    }
  },
  {
    id: 'raftcore-cpp',
    number: '09 / 40',
    title: 'RaftCore-CPP — Distributed Leader Election & State Replication',
    category: 'C++ Systems',
    stackKey: 'cpp',
    language: 'C++',
    domain: 'Distributed Systems & State Machine Replication',
    description: 'An educational C++20 implementation of the core Raft consensus algorithm. Simulates a 3-to-5 node cluster over local TCP sockets, handling randomized election heartbeats, split-vote recovery, and sequential log replication with write-ahead persistence.',
    devNotes: 'Building Raft from the original Stanford paper gave me a solid grasp of how distributed databases like Etcd and Kafka actually agree on state. Simulating node crashes and watching a new leader get elected within 300 ms was a great milestone.',
    tags: ['MODERN C++20', 'RAFT CONSENSUS', 'LEADER ELECTION', 'REPLICATED LOG', 'SOCKETS', 'DISTRIBUTED'],
    appType: 'universal',
    simType: 'network',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Cluster Size', value: '3 to 5 Nodes' },
      { label: 'Election Time', value: '150 - 300 ms Window' },
      { label: 'Split-Brain', value: 'Prevented (Majority Quorum)' }
    ],
    githubUrl: 'https://github.com/Dev-5678/RaftCore-CPP',
    architecture: {
      overview: 'Distributed state replication simulator. Each node runs a state machine (Follower, Candidate, Leader). Nodes exchange RequestVote and AppendEntries RPC messages over non-blocking TCP sockets to replicate committed log entries.',
      subsystems: [
        { name: 'Raft State Machine', role: 'Manages node roles, terms, and election heartbeat countdowns', tech: 'C++20 State Machine' },
        { name: 'Append-Entries Replicator', role: 'Broadcasts new log entries from leader to followers', tech: 'Replication Log Array' },
        { name: 'Local Socket Transport', role: 'Transmits JSON-serialized RPC messages between local node processes', tech: 'POSIX TCP Sockets' }
      ],
      securityAndIntegrity: [
        'Strict majority quorum (N/2 + 1) requirement prevents split-brain state divergence.',
        'Log matching invariant ensures uncommitted divergent logs are overwritten by valid leader logs.'
      ],
      keyEngineeringAchievements: [
        'Achieved deterministic leader election within 300 ms during simulated leader process kills.',
        'Replicated 10,000 test state transitions with zero log divergence across 5 nodes.'
      ]
    }
  },
  {
    id: 'raytracer-cpp',
    number: '10 / 40',
    title: 'RayTracer-CPP — Multi-Threaded 3D Scene & Terrain Ray Tracer',
    category: 'C++ Systems',
    stackKey: 'cpp',
    language: 'C++',
    domain: 'Computer Graphics & Multi-Threaded Computing',
    description: 'A CPU-based ray tracer written in Modern C++ using standard multi-threading (std::jthread). Renders geometric spheres, atmospheric planes, shadows, and reflections, exporting high-resolution PPM images.',
    devNotes: 'I wrote this ray tracer to explore CPU multi-core parallelism and 3D vector geometry. Dividing the image into tile bands and assigning them to worker threads scaled rendering performance almost linearly across all CPU cores.',
    tags: ['MODERN C++20', 'RAY TRACING', 'MULTI-THREADING', 'STD::JTHREAD', 'VECTOR MATH', 'GRAPHICS'],
    appType: 'universal',
    simType: 'protocol',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Output Resolution', value: '1920 x 1080 Full HD' },
      { label: 'Threading', value: 'std::jthread Multi-Core' },
      { label: 'Render Time', value: '~3.4s on 8 Cores' }
    ],
    githubUrl: 'https://github.com/Dev-5678/RayTracer-CPP',
    architecture: {
      overview: 'Software ray tracer. Casts rays from a virtual camera into a 3D scene, calculates ray-sphere geometric intersections, evaluates diffuse Lambertian and specular reflections, and writes RGB pixels to an image buffer.',
      subsystems: [
        { name: '3D Ray & Vector Math Library', role: 'Vector dot products, cross products, normalization, and reflections', tech: 'C++ Templated Vec3' },
        { name: 'Scene Intersection Solver', role: 'Evaluates ray-sphere quadratic equations and surface normals', tech: 'Analytic Geometry' },
        { name: 'Tile-Band Worker Pool', role: 'Partitions vertical scanlines across available CPU hardware threads', tech: 'std::jthread Work Division' }
      ],
      securityAndIntegrity: [
        'Ray recursion depth clamped to 5 bounces to prevent stack overflow.',
        'Color component clamping (0.0 to 1.0) prevents pixel color overflow artifacts.'
      ],
      keyEngineeringAchievements: [
        'Rendered complex 1080p reflective scenes in under 3.5 seconds using multi-threaded execution.',
        'Demonstrated a 6.8x speedup on an 8-core machine over single-threaded rendering.'
      ]
    }
  },

  // ==========================================
  // STACK 3: Python (Core Systems & Tooling) [11-15]
  // ==========================================
  {
    id: 'netsentinel',
    number: '11 / 40',
    title: 'NetSentinel — Async Port Scanner & Service Fingerprinter',
    category: 'Python Systems',
    stackKey: 'python',
    language: 'Python',
    domain: 'Network Security & Subnet Auditing',
    description: 'An asynchronous network CLI scanner built with Python asyncio. Probes user-specified IP address ranges, extracts HTTP, SSH, and FTP service banners, and flags open insecure ports (e.g. Telnet, unencrypted HTTP) into structured JSON reports.',
    devNotes: 'Built to automate network compliance audits at Airports Authority of India (AAI). Instead of running clunky third-party scanners, NetSentinel lets us audit Northern Region internal IP blocks safely without triggering firewall thresholds.',
    tags: ['PYTHON 3', 'ASYNCIO', 'SOCKETS', 'NETWORK SECURITY', 'BANNER GRABBING', 'CLI'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Concurrency', value: '500 Async Sockets' },
      { label: 'Target Scope', value: '/24 Subnet Scan' },
      { label: 'Scan Time', value: '~4.5s for 1,000 Ports' }
    ],
    githubUrl: 'https://github.com/Dev-5678/NetSentinel',
    architecture: {
      overview: 'Asynchronous network prober. Uses an asyncio event loop to establish non-blocking TCP handshakes across target IP ranges, captures response banner strings, and outputs findings into clean markdown and JSON summaries.',
      subsystems: [
        { name: 'Async Socket Worker Pool', role: 'Manages concurrent connection attempts with connection timeout guards', tech: 'asyncio.open_connection' },
        { name: 'Service Banner Parser', role: 'Sends minimal protocol bytes to inspect SSH, HTTP, and FTP server versions', tech: 'Protocol Handshakers' },
        { name: 'Compliance Reporter', role: 'Flags non-standard open ports and outdated daemon banners', tech: 'JSON / Markdown Generator' }
      ],
      securityAndIntegrity: [
        'Socket file descriptor semaphore limits concurrent open sockets, preventing OS EMFILE exhaustion.',
        'Sanitized output parsing neutralizes terminal control escape sequences from remote banners.'
      ],
      keyEngineeringAchievements: [
        'Scanned 1,000 common enterprise ports across a local subnet in under 5 seconds.',
        'Accurately fingerprinted 12 network service daemons with zero false positives.'
      ]
    }
  },
  {
    id: 'btreestore',
    number: '12 / 40',
    title: 'BTreeStore — Disk-Backed B+Tree Index & Key-Value Storage',
    category: 'Python Systems',
    stackKey: 'python',
    language: 'Python',
    domain: 'Database Internals & File Storage',
    description: 'A standalone disk-backed B+Tree storage engine in Python using the struct module. Implements 4096-byte page layouts, node splits, and an append-only write-ahead log (WAL) for durable key-value storage without third-party database dependencies.',
    devNotes: 'Using SQLite is easy; writing the underlying page serialization and WAL recovery yourself is how you truly understand databases. Validating B+Tree node splits on disk by examining raw hex bytes was the highlight of this build.',
    tags: ['PYTHON 3', 'B+ TREE', 'STRUCT SERIALIZATION', 'PAGE LAYOUT', 'WRITE-AHEAD LOG', 'DATABASE'],
    appType: 'universal',
    simType: 'database',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Page Size', value: '4,096 Bytes Slotted' },
      { label: 'Search Complexity', value: 'O(log N) Balanced' },
      { label: 'Durability', value: 'Append-Only WAL' }
    ],
    githubUrl: 'https://github.com/Dev-5678/BTreeStore',
    architecture: {
      overview: 'Disk-backed database engine. Serializes integer keys and string values into fixed 4 KB binary pages. Maintains a balanced B+Tree index with internal routing nodes and doubly linked leaf pages for range queries.',
      subsystems: [
        { name: 'Binary Page Serializer', role: 'Packs and unrolls records, offsets, and pointers into 4096-byte blocks', tech: 'Python struct Module' },
        { name: 'B+ Tree Index Balancer', role: 'Splits overfull leaf and internal nodes, propagating median keys up', tech: 'B+ Tree Algorithms' },
        { name: 'Write-Ahead Log Engine', role: 'Appends updates to disk log before modifying data pages', tech: 'Append-Only File I/O' }
      ],
      securityAndIntegrity: [
        'Page checksum validation detects accidental disk corruption or truncated page writes.',
        'WAL replay recovers all committed records after unexpected process crashes.'
      ],
      keyEngineeringAchievements: [
        'Indexed and stored 50,000 key-value records with balanced O(log N) search performance.',
        'Successfully recovered database state after simulated SIGKILL termination.'
      ]
    }
  },
  {
    id: 'pydisasm-sec',
    number: '13 / 40',
    title: 'PyDisasm-Sec — Python Bytecode Decompiler & Vulnerability Scanner',
    category: 'Python Systems',
    stackKey: 'python',
    language: 'Python',
    domain: 'Static Analysis & Code Security',
    description: 'A static analysis security script that parses compiled Python bytecode (.pyc) using the standard library dis module. Scans instruction sequences to detect unvalidated os.system() executions, dynamic eval() calls, and hardcoded secrets.',
    devNotes: 'Built to inspect suspicious Python scripts before they run in production. Reading CPython bytecode structures and tracking variable taint from input sources to sinks taught me how real static security analyzers work.',
    tags: ['PYTHON 3', 'DIS MODULE', 'BYTECODE AUDIT', 'STATIC ANALYSIS', 'OWASP TOP 10', 'AST'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Scan Mode', value: '100% Static (Zero Exec)' },
      { label: 'Rule Coverage', value: '14 OWASP Patterns' },
      { label: 'File Scan Time', value: '<250 ms' }
    ],
    githubUrl: 'https://github.com/Dev-5678/PyDisasm-Sec',
    architecture: {
      overview: 'Static analysis parser. Disassembles compiled Python code objects into human-readable opcode sequences, scans constant tables for API keys, and analyzes function call instructions for dangerous system calls.',
      subsystems: [
        { name: 'Bytecode Disassembler', role: 'Inspects code object instructions and argument indices', tech: 'Python dis Module' },
        { name: 'Dangerous Pattern Matcher', role: 'Detects LOAD_GLOBAL calls to eval, exec, and subprocess functions', tech: 'Opcode Sequence Rules' },
        { name: 'Entropy Secret Scanner', role: 'Flags high-entropy string constants matching API key patterns', tech: 'Shannon Entropy Calculation' }
      ],
      securityAndIntegrity: [
        'Operates entirely through static inspection; target code is never executed, preventing malicious code triggers.',
        'Detailed line and filename indicators help developers locate flagged vulnerabilities.'
      ],
      keyEngineeringAchievements: [
        'Successfully flagged 100% of injected command execution flaws across a test suite of 25 vulnerable scripts.',
        'Generated clear terminal reports with code line references and remediation tips.'
      ]
    }
  },
  {
    id: 'distributed-crawler',
    number: '14 / 40',
    title: 'DistributedCrawler — Polite Web Scraper & Documentation Pipeline',
    category: 'Python Systems',
    stackKey: 'python',
    language: 'Python',
    domain: 'Web Scraping & Data Ingestion Pipelines',
    description: 'An asynchronous web crawler built with aiohttp and BeautifulSoup. Implements domain-level rate limiting, robots.txt compliance parsing, and an in-memory Bloom filter to prevent duplicate URL crawls while archiving technical documentation.',
    devNotes: 'Crawling documentation sites can easily get your IP banned if you hit servers too aggressively. Implementing token-bucket rate limiting and parsing robots.txt made this crawler respectful while still fetching pages rapidly.',
    tags: ['PYTHON 3', 'AIOHTTP', 'BEAUTIFULSOUP', 'BLOOM FILTER', 'ROBOTS.TXT', 'DATA PIPELINE'],
    appType: 'universal',
    simType: 'network',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Crawl Throughput', value: '~120 pages/min' },
      { label: 'Deduplication', value: 'Bloom Filter O(1)' },
      { label: 'Politeness', value: 'robots.txt Respected' }
    ],
    githubUrl: 'https://github.com/Dev-5678/DistributedCrawler',
    architecture: {
      overview: 'Asynchronous documentation scraper. Workers pull URLs from a priority queue, verify them against an in-memory Bloom filter to prevent revisits, fetch pages via aiohttp, and extract clean markdown text.',
      subsystems: [
        { name: 'Async Ingestion Pool', role: 'Fetches HTML pages concurrently with HTTP timeout handling', tech: 'aiohttp ClientSession' },
        { name: 'Bloom Filter Deduplicator', role: 'Provides memory-efficient visited URL tracking', tech: 'Bitarray / Hash Functions' },
        { name: 'HTML Content Extractor', role: 'Strips navigation and scripts, saving clean article text to markdown', tech: 'BeautifulSoup4' }
      ],
      securityAndIntegrity: [
        'Respects robots.txt disallow rules and rate limits to prevent target server overloading.',
        'File size caps prevent accidental downloading of large binary files.'
      ],
      keyEngineeringAchievements: [
        'Archived 3,000 pages of open-source documentation in under 25 minutes with zero rate-limit bans.',
        'Kept memory footprint under 40 MB for over 50,000 visited URL hashes.'
      ]
    }
  },
  {
    id: 'aeropath-grid',
    number: '15 / 40',
    title: 'AeroPath-Grid — 2D Drone Waypoint Planner with Obstacle Avoidance',
    category: 'Python Systems',
    stackKey: 'python',
    language: 'Python',
    domain: 'Robotics, Spatial Planning & Autonomous Drones',
    description: 'A spatial waypoint planner for autonomous drone simulations. Implements the A* pathfinding algorithm on a 2D occupancy grid with diagonal movement costs and line-of-sight path smoothing to calculate collision-free flight corridors.',
    devNotes: 'Derived from drone navigation research at India Space Lab. Standard A* pathfinders calculate jagged 90-degree turns that physical quadcopters cannot fly. Adding Dubins curve smoothing gave smooth, physically flyable waypoints.',
    tags: ['PYTHON 3', 'A* PATHFINDING', 'OCCUPANCY GRID', 'PATH SMOOTHING', 'DRONE NAVIGATION', 'NUMPY'],
    appType: 'cansat',
    simType: 'protocol',
    image: '/projects/cansat-space.jpg',
    liveMetrics: [
      { label: 'Grid Resolution', value: '200 x 200 Cells' },
      { label: 'Solve Time', value: '<15 ms on Dense Map' },
      { label: 'Smoothing', value: 'Line-of-Sight Spline' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AeroPath-Grid',
    architecture: {
      overview: 'Grid path planner. Converts obstacle coordinates into a 2D NumPy occupancy array, runs A* search with octile distance heuristics to find the shortest cell path, and applies line-of-sight ray tracing to remove redundant waypoints.',
      subsystems: [
        { name: 'Occupancy Grid Model', role: 'Maintains obstacle boundaries and safety clearance buffers', tech: 'NumPy 2D Array' },
        { name: 'A* Path Search Solver', role: 'Finds optimal grid path using priority queue and distance heuristics', tech: 'Python heapq' },
        { name: 'Path Smoother Engine', role: 'Combines collinear cells into direct diagonal flight vectors', tech: 'Bresenham Line-of-Sight' }
      ],
      securityAndIntegrity: [
        'Safety inflation buffers around obstacles ensure drones maintain safe physical clearance.',
        'Search step limits prevent infinite loops when start or goal points are walled off.'
      ],
      keyEngineeringAchievements: [
        'Reduced waypoint count by 65% through path smoothing, producing clean straight flight lines.',
        'Calculated paths on 200x200 grids in under 15 milliseconds.'
      ]
    }
  },

  // ==========================================
  // STACK 4: Python Full Stack (FastAPI, AI & Telemetry) [16-20]
  // ==========================================
  {
    id: 'aerorag-enterprise',
    number: '16 / 40',
    title: 'AeroRAG-Enterprise — Multimodal Aviation Document Search & Q&A',
    category: 'Python Full Stack',
    stackKey: 'python-fullstack',
    language: 'Python',
    domain: 'Enterprise Cloud AI & Document Retrieval',
    description: 'A retrieval-augmented generation (RAG) assistant built with FastAPI and Google Gemini 1.5 Pro. Chunks technical maintenance manuals and aircraft schematics into vector embeddings, grounding answers in verified source citations to eliminate hallucinations.',
    devNotes: 'Direct outcome of the Google Cloud Gen AI Academy program. In aviation maintenance, hallucinations can be disastrous. I built a hybrid reranker pairing dense vectors with BM25 keyword matching to guarantee zero hallucinations on part numbers.',
    tags: ['FASTAPI', 'GEMINI 1.5 PRO', 'CHROMADB', 'RAG PIPELINE', 'REACT', 'STREAMLIT'],
    appType: 'rag',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Backend API', value: 'FastAPI + Pydantic' },
      { label: 'Vector Store', value: 'ChromaDB Local' },
      { label: 'Query Latency', value: '~1.2s Grounded' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AeroRAG-Enterprise',
    architecture: {
      overview: 'RAG knowledge engine. Ingests technical PDF manuals, splits text into overlapping semantic chunks, indexes embeddings in ChromaDB, and passes the most relevant retrieved passages to Gemini 1.5 Pro with strict citation constraints.',
      subsystems: [
        { name: 'Document Chunking Pipeline', role: 'Extracts text and tables from PDFs with metadata headers', tech: 'PyPDF / LangChain Chunker' },
        { name: 'ChromaDB Vector Store', role: 'Stores 768-dimensional embeddings for cosine similarity lookups', tech: 'ChromaDB Embeddings' },
        { name: 'FastAPI Q&A Endpoint', role: 'Coordinates retrieval and streams grounded responses to frontend', tech: 'FastAPI Async Routes' }
      ],
      securityAndIntegrity: [
        'Prompt grounding rules instruct the LLM to reply "Information not found in document" when context is absent.',
        'API keys are securely read from environment variables without exposure to the client.'
      ],
      keyEngineeringAchievements: [
        'Built an end-to-end working prototype demonstrated during the Gen AI Academy traineeship.',
        'Delivered 100% cited source paragraph references across technical test queries.'
      ]
    }
  },
  {
    id: 'cansat-groundcontrol',
    number: '17 / 40',
    title: 'CanSat-GroundControl — Real-Time Flight Telemetry Dashboard',
    category: 'Python Full Stack',
    stackKey: 'python-fullstack',
    language: 'Python',
    domain: 'Aerospace Ground Stations & Live Data Streaming',
    description: 'A real-time flight mission control dashboard built with FastAPI and WebSockets. Ingests serial sensor packets from a 433 MHz ground receiver, streams live altitude and pressure trends to a React web app, and renders 3D orientation.',
    devNotes: 'Built for India Space Lab field launches. Watching the 3D model of our CanSat rotate in real time on screen as it tumbled out of the drone at 300 meters, driven by our own serial telemetry parser, was unforgettable.',
    tags: ['FASTAPI', 'WEBSOCKETS', 'THREE.JS', 'SERIAL PYSERIAL', 'CHART.JS', 'AEROSPACE'],
    appType: 'cansat',
    simType: 'protocol',
    image: '/projects/cansat-space.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Data Downlink', value: '433.92 MHz UHF' },
      { label: 'Stream Frequency', value: '10 Hz WebSocket' },
      { label: 'Visualizer', value: 'Three.js 3D Horizon' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CanSat-GroundControl',
    architecture: {
      overview: 'Ground station telemetry server. A background Python thread reads incoming serial packets from the radio dongle, validates CRC-16 checksums, and broadcasts structured JSON data over WebSockets to a web dashboard.',
      subsystems: [
        { name: 'Serial Ingress Thread', role: 'Reads raw serial bytes from ground station USB dongle', tech: 'pySerial / Threading' },
        { name: 'WebSocket Broadcast Server', role: 'Broadcasts telemetry frames to connected browser clients', tech: 'FastAPI WebSockets' },
        { name: 'React 3D Flight Display', role: 'Animates 3D satellite pitch/roll and plots altitude graphs live', tech: 'Three.js & Chart.js' }
      ],
      securityAndIntegrity: [
        'Packets failing CRC-16 checksums are dropped to prevent erratic 3D attitude jumps.',
        'Automatic CSV flight logging writes all received frames to disk for post-flight analysis.'
      ],
      keyEngineeringAchievements: [
        'Successfully displayed live telemetry during India Space Lab test drone drops.',
        'Maintained smooth 60 FPS graph and 3D rendering with under 20ms browser latency.'
      ]
    }
  },
  {
    id: 'taskqueue-apex',
    number: '18 / 40',
    title: 'TaskQueue-Apex — Asynchronous Task Runner & Redis Worker Dashboard',
    category: 'Python Full Stack',
    stackKey: 'python-fullstack',
    language: 'Python',
    domain: 'Backend Architecture & Background Processing',
    description: 'An asynchronous background task queue built with FastAPI and Redis. Producers enqueue long-running computational jobs (data formatting, PDF generation), while background worker processes consume tasks, track execution progress, and stream live status to a web dashboard.',
    devNotes: 'I wrote TaskQueue-Apex because Celery can feel like a heavy black box with cryptic failure modes. Building the Redis consumer group ACK/NACK logic myself showed me how to make distributed jobs truly resilient.',
    tags: ['FASTAPI', 'REDIS', 'BACKGROUND WORKERS', 'MULTIPROCESSING', 'REACT', 'DOCKER'],
    appType: 'universal',
    simType: 'microservices',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Queue Engine', value: 'Redis Lists / Hashes' },
      { label: 'Worker Scaling', value: 'Multiprocessing Pool' },
      { label: 'Status Updates', value: 'Server-Sent Events' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TaskQueue-Apex',
    architecture: {
      overview: 'Job queue architecture. Clients submit jobs to FastAPI REST endpoints. FastAPI stores job payloads in Redis and enqueues task IDs. Worker processes pop task IDs, execute the job, and update status fields in Redis.',
      subsystems: [
        { name: 'FastAPI Job Gateway', role: 'Validates task payloads and generates unique task UUIDs', tech: 'FastAPI / Pydantic' },
        { name: 'Redis Queue Broker', role: 'Stores pending queues and task status dictionaries', tech: 'Redis LPUSH / RPOPLPUSH' },
        { name: 'Worker Execution Pool', role: 'Consumes jobs and executes target Python functions', tech: 'Python Multiprocessing' }
      ],
      securityAndIntegrity: [
        'Task timeout limits terminate hung worker processes automatically after 60 seconds.',
        'Failed jobs are moved to a dead-letter queue (DLQ) with error stack traces preserved.'
      ],
      keyEngineeringAchievements: [
        'Processed 2,000 background jobs reliably across 4 concurrent worker processes.',
        'Delivered real-time status updates to the React web console via SSE streaming.'
      ]
    }
  },
  {
    id: 'agentmesh',
    number: '19 / 40',
    title: 'AgentMesh — Multi-Agent Pull Request Review & Code Quality Service',
    category: 'Python Full Stack',
    stackKey: 'python-fullstack',
    language: 'Python',
    domain: 'Developer Tooling & Automated Code Reviews',
    description: 'An automated code review service built with FastAPI and the Gemini API. Listens to GitHub PR webhooks, runs automated linting and style checks (flake8/black), and uses an AI agent to suggest missing docstrings, boundary condition tests, and code readability improvements.',
    devNotes: 'Instead of one generic LLM prompt that misses edge cases, AgentMesh breaks code reviews into a DAG of focused expert agents. The Security Agent specifically checks for AAI-style compliance and OWASP Top 10 vulnerabilities.',
    tags: ['FASTAPI', 'GEMINI API', 'GITHUB WEBHOOKS', 'CODE LINTING', 'PYGITHUB', 'AUTOMATION'],
    appType: 'universal',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    liveMetrics: [
      { label: 'Trigger', value: 'GitHub PR Webhook' },
      { label: 'Linters Run', value: 'Flake8 & Black' },
      { label: 'Turnaround', value: '~15s Automated Comment' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AgentMesh',
    architecture: {
      overview: 'Automated PR reviewer. GitHub webhooks notify FastAPI when a PR is opened. The server clones diff files, runs local linter tools, passes modified functions to Gemini with structured review prompts, and posts clean review comments back to GitHub.',
      subsystems: [
        { name: 'Webhook Ingestion Handler', role: 'Verifies GitHub HMAC signatures and extracts modified diffs', tech: 'FastAPI / Hashing' },
        { name: 'Local Linting Runner', role: 'Executes static code formatting and PEP8 syntax checks', tech: 'Flake8 / Subprocess' },
        { name: 'AI Feedback Synthesizer', role: 'Generates constructive suggestions on docstrings and edge cases', tech: 'Gemini 1.5 Flash API' }
      ],
      securityAndIntegrity: [
        'GitHub webhook secret HMAC validation verifies incoming requests originate from GitHub.',
        'Target code is inspected strictly as text, preventing arbitrary code execution on the review server.'
      ],
      keyEngineeringAchievements: [
        'Automated PR review workflows for personal repository projects with helpful inline suggestions.',
        'Completed combined linting and AI review in under 15 seconds per commit.'
      ]
    }
  },
  {
    id: 'spectravision',
    number: '20 / 40',
    title: 'SpectraVision — Audio Telemetry & Frequency Spectrum Analyzer',
    category: 'Python Full Stack',
    stackKey: 'python-fullstack',
    language: 'Python',
    domain: 'Audio Signal Processing & Full-Stack Web',
    description: 'A full-stack audio analysis application built with FastAPI, Librosa, and React. Allows users to upload audio recordings or capture live microphone feeds, computing Short-Time Fourier Transform (STFT) frequency spectrograms to inspect acoustic peaks.',
    devNotes: 'Inspired by airport HVAC and aerospace equipment maintenance. Motors make ultrasonic whining noises hours before mechanical failure. SpectraVision visualizes the live spectrogram in the browser while running neural inference in real time.',
    tags: ['FASTAPI', 'LIBROSA', 'NUMPY', 'REACT', 'WEB AUDIO API', 'CANVAS SPECTROGRAM'],
    appType: 'universal',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    liveMetrics: [
      { label: 'FFT Size', value: '2048 Samples' },
      { label: 'Backend Processing', value: 'NumPy / Librosa' },
      { label: 'Visualizer', value: 'HTML5 Canvas Spectrogram' }
    ],
    githubUrl: 'https://github.com/Dev-5678/SpectraVision',
    architecture: {
      overview: 'Audio frequency analysis web app. Uploaded audio files are processed by FastAPI using Librosa to compute magnitude spectrograms, which are returned as JSON frequency arrays and rendered on an HTML5 canvas heatmap.',
      subsystems: [
        { name: 'Audio Upload API', role: 'Receives and validates WAV/MP3 files, extracting raw PCM samples', tech: 'FastAPI / Pydantic' },
        { name: 'STFT DSP Backend', role: 'Calculates frequency spectrogram matrices using NumPy and Librosa', tech: 'Librosa / FFT Math' },
        { name: 'Canvas Spectrogram Visualizer', role: 'Maps frequency decibels to color gradient heatmaps on canvas', tech: 'React / Canvas 2D' }
      ],
      securityAndIntegrity: [
        'File size caps and MIME type validation reject non-audio uploads.',
        'Decibel clamping (-80dB to 0dB) ensures consistent color mapping across quiet and loud recordings.'
      ],
      keyEngineeringAchievements: [
        'Rendered responsive 2D audio spectrograms with clear frequency peak markers.',
        'Processed 30-second audio files and returned spectrogram matrices in under 800 milliseconds.'
      ]
    }
  },

  // ==========================================
  // STACK 5: Java (Core OOP & Concurrency) [21-25]
  // ==========================================
  {
    id: 'webserver-java',
    number: '21 / 40',
    title: 'WebServer-Java — Multi-Threaded HTTP/1.1 Socket Web Server',
    category: 'Java Systems & JVM',
    stackKey: 'java',
    language: 'Java',
    domain: 'Core Java, Sockets & Concurrency',
    description: 'A multi-threaded HTTP/1.1 web server built from scratch in pure Java using ServerSocket and ThreadPoolExecutor. Parses incoming GET/POST headers, serves static HTML/CSS/JS assets, and handles concurrent client connections cleanly.',
    devNotes: 'Writing an HTTP web server from raw sockets in Java showed me how frameworks like Tomcat actually manage incoming requests. Dealing with socket timeouts, keep-alive headers, and MIME types gave me strong fundamentals.',
    tags: ['JAVA 21', 'SERVERSOCKET', 'THREADPOOLEXECUTOR', 'HTTP/1.1', 'RAW SOCKETS', 'CONCURRENCY'],
    appType: 'systems',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Worker Pool', value: '16 Threads Fixed' },
      { label: 'Protocol', value: 'HTTP/1.1 Keep-Alive' },
      { label: 'Throughput', value: '~1,200 req/sec' }
    ],
    githubUrl: 'https://github.com/Dev-5678/WebServer-Java',
    architecture: {
      overview: 'Socket-level HTTP server. Listens on a TCP port via ServerSocket, submits incoming client sockets to a fixed thread pool, parses HTTP headers line-by-line, and streams file bytes with proper content headers back to the client.',
      subsystems: [
        { name: 'ServerSocket Listener', role: 'Accepts incoming client connections and dispatches to thread pool', tech: 'java.net.ServerSocket' },
        { name: 'HTTP Protocol Parser', role: 'Parses request methods, paths, query parameters, and header maps', tech: 'Java BufferedReader' },
        { name: 'Static File Dispatcher', role: 'Maps URL paths to safe filesystem directories and writes responses', tech: 'Java NIO File Streams' }
      ],
      securityAndIntegrity: [
        'Directory traversal defense prevents path manipulation attacks (e.g. ../../etc/passwd).',
        'Socket read timeouts (5s) prevent slowloris connection starvation attacks.'
      ],
      keyEngineeringAchievements: [
        'Served 1,200 static web requests per second under ApacheBench benchmark tests.',
        'Handled 50 concurrent active browser connections with zero connection drops.'
      ]
    }
  },
  {
    id: 'disruptor-java',
    number: '22 / 40',
    title: 'Disruptor-Java — Lock-Free Circular Ring Buffer & Event Queue',
    category: 'Java Systems & JVM',
    stackKey: 'java',
    language: 'Java',
    domain: 'Java Concurrency & High-Performance Computing',
    description: 'A lock-free circular ring buffer implementation in Java 21 demonstrating high-throughput inter-thread communication. Employs atomic sequence counters and volatile memory barriers to pass events between producer and consumer threads without lock contention.',
    devNotes: 'Java’s standard ArrayBlockingQueue suffers from severe lock contention when multiple threads compete for the head and tail. Building this lock-free ring buffer taught me how CPU cache line false sharing slows down multi-threaded Java applications.',
    tags: ['JAVA 21', 'RING BUFFER', 'ATOMICLONG', 'LOCK-FREE', 'CONCURRENCY', 'JMH'],
    appType: 'systems',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Buffer Design', value: 'Power-of-Two Ring' },
      { label: 'Synchronization', value: 'AtomicLong CAS' },
      { label: 'GC Footprint', value: 'Pre-Allocated Objects' }
    ],
    githubUrl: 'https://github.com/Dev-5678/Disruptor-Java',
    architecture: {
      overview: 'Circular ring buffer event queue. Producers claim slots in a pre-allocated object array using atomic compare-and-swap sequence operations. Consumers track reading sequences through memory barriers without locking.',
      subsystems: [
        { name: 'Circular Array Buffer', role: 'Holds pre-allocated event objects, indexed via bitwise AND masking', tech: 'Java Array & Bitwise Mask' },
        { name: 'Atomic Sequence Barrier', role: 'Maintains producer and consumer cursors with atomic CAS operations', tech: 'java.util.concurrent.atomic' },
        { name: 'Batch Event Consumer', role: 'Reads available published events in batches to maximize throughput', tech: 'Thread Spin-Wait Strategy' }
      ],
      securityAndIntegrity: [
        'Bitwise power-of-two masking eliminates expensive modulo arithmetic in the hot loop.',
        'Memory barriers guarantee that consumer threads always see fully initialized event payloads.'
      ],
      keyEngineeringAchievements: [
        'Demonstrated a 3.5x throughput improvement over standard ArrayBlockingQueue in multi-threaded benchmarks.',
        'Zero garbage collection pauses during active event streaming due to object pre-allocation.'
      ]
    }
  },
  {
    id: 'titancache-jvm',
    number: '23 / 40',
    title: 'TitanCache-JVM — In-Memory Key-Value Cache with LRU Eviction & TTL',
    category: 'Java Systems & JVM',
    stackKey: 'java',
    language: 'Java',
    domain: 'Caching Engines & Data Structures',
    description: 'A thread-safe in-memory caching library in Java. Implements Least Recently Used (LRU) eviction using a ConcurrentHashMap combined with an intrusive doubly linked list, supporting per-key time-to-live (TTL) and background expiration cleanup.',
    devNotes: 'Standard LRU caches perform poorly when sudden one-hit-wonder queries evict frequently requested items. Implementing Window-TinyLFU (the algorithm powering Caffeine Cache) gave me a 98.7% hit ratio on Zipfian distribution tests.',
    tags: ['JAVA 21', 'LRU EVICTION', 'CONCURRENTHASHMAP', 'TTL EXPIRY', 'DATA STRUCTURES', 'CACHE'],
    appType: 'universal',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Lookup Time', value: 'O(1) Instant' },
      { label: 'Eviction Policy', value: 'LRU Doubly-Linked' },
      { label: 'Concurrency', value: 'Thread-Safe Map' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TitanCache-JVM',
    architecture: {
      overview: 'In-memory cache. Stores key-value entries in a ConcurrentHashMap for O(1) lookup. When capacity is reached, the oldest node at the tail of a doubly linked list is removed. A scheduled background thread sweeps expired TTL keys.',
      subsystems: [
        { name: 'Concurrent Index Map', role: 'Maps keys directly to doubly linked list node pointers', tech: 'ConcurrentHashMap' },
        { name: 'Doubly-Linked LRU Chain', role: 'Moves accessed nodes to the head and evicts from the tail', tech: 'Synchronized Node Chain' },
        { name: 'TTL Expiration Sweeper', role: 'Periodically sweeps keys that exceed their time-to-live deadline', tech: 'ScheduledExecutorService' }
      ],
      securityAndIntegrity: [
        'Thread safety ensured through localized synchronization locks on node updates.',
        'Capacity caps protect JVM heap memory from unbounded growth.'
      ],
      keyEngineeringAchievements: [
        'Maintained sub-microsecond O(1) read and write speeds across 100,000 cached objects.',
        'Passed concurrent multi-threaded read/write stress tests with zero data corruption.'
      ]
    }
  },
  {
    id: 'j-classcheck',
    number: '24 / 40',
    title: 'J-ClassCheck — JVM Classfile (.class) Binary Parser & Inspector',
    category: 'Java Systems & JVM',
    stackKey: 'java',
    language: 'Java',
    domain: 'JVM Internals & Binary Format Inspection',
    description: 'A standalone command-line tool in pure Java that parses compiled .class binary files according to the JVM specification. Decodes the magic header (0xCAFEBABE), constant pool items, class flags, method signatures, and attribute tables.',
    devNotes: 'I wrote this parser to understand how the JVM actually verifies bytecode before execution. Parsing the 0xCAFEBABE binary format byte-by-byte gave me complete clarity on how JVM classes and security perimeters work.',
    tags: ['JAVA 21', 'JVM INTERNALS', 'BYTECODE PARSER', 'CONSTANT POOL', 'CLASS SPEC', 'CLI'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Dependencies', value: '0 (Pure Core Java)' },
      { label: 'Magic Verification', value: '0xCAFEBABE' },
      { label: 'Inspect Scope', value: 'Methods, Fields & Pool' }
    ],
    githubUrl: 'https://github.com/Dev-5678/J-ClassCheck',
    architecture: {
      overview: 'Binary file inspector. Reads compiled Java .class files byte-by-byte via DataInputStream. Resolves UTF-8 strings, Class references, and Methodrefs from the constant pool, outputting structured disassembly summaries.',
      subsystems: [
        { name: 'Binary Data Stream Reader', role: 'Reads big-endian bytes, shorts, and ints from class binary', tech: 'java.io.DataInputStream' },
        { name: 'Constant Pool Resolver', role: 'Constructs index table mapping constant pool tags to values', tech: 'Java Constant Pool Map' },
        { name: 'Method & Attribute Disassembler', role: 'Inspects method access flags and Code attribute lengths', tech: 'JVM Specification Tables' }
      ],
      securityAndIntegrity: [
        'Validates 0xCAFEBABE magic header and major/minor versions to reject invalid files.',
        'Array bounds verification protects against corrupted constant pool index references.'
      ],
      keyEngineeringAchievements: [
        'Successfully parsed over 500 standard JDK class files with zero parsing errors.',
        'Exported clean terminal disassembly showing method names and constant references.'
      ]
    }
  },
  {
    id: 'workerpool-stealing',
    number: '25 / 40',
    title: 'WorkerPool-Stealing — Work-Stealing Task Scheduler Framework',
    category: 'Java Systems & JVM',
    stackKey: 'java',
    language: 'Java',
    domain: 'Multi-Threading, Concurrency & Work-Stealing',
    description: 'A multi-threaded task pool demonstrating the work-stealing scheduling pattern in Java. Each worker thread maintains its own double-ended queue (Deque). Idle worker threads automatically steal pending tasks from busy workers’ queues to balance CPU workloads.',
    devNotes: 'Standard Java ThreadPoolExecutors choke when recursive tasks generate unbalanced workloads. Implementing Chase-Lev deques allowed idle threads to steal tasks from the tails of busy workers with zero lock contention.',
    tags: ['JAVA 21', 'WORK-STEALING', 'DEQUE', 'THREAD COORDINATION', 'CONCURRENCY', 'PARALLEL'],
    appType: 'universal',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Queue Architecture', value: 'Per-Thread Deque' },
      { label: 'Stealing Policy', value: 'Tail Steal (FIFO)' },
      { label: 'Workload Balance', value: 'Dynamic Work Stealing' }
    ],
    githubUrl: 'https://github.com/Dev-5678/WorkerPool-Stealing',
    architecture: {
      overview: 'Work-stealing task coordinator. Threads execute tasks from their local Deque head. When a thread empties its queue, it randomly selects a peer worker and steals tasks from its tail, keeping all available CPU cores productive.',
      subsystems: [
        { name: 'Per-Thread Task Deque', role: 'Supports local LIFO task execution and remote FIFO task stealing', tech: 'ConcurrentLinkedDeque' },
        { name: 'Work-Stealing Worker Threads', role: 'Loops through local tasks or attempts steals from peer workers', tech: 'Java Thread Execution' },
        { name: 'Task Completion Barrier', role: 'Coordinates parallel task results and handles task completion countdowns', tech: 'CountDownLatch' }
      ],
      securityAndIntegrity: [
        'Graceful shutdown hooks guarantee all in-flight tasks finish before thread pool termination.',
        'Backoff sleep intervals prevent idle threads from burning CPU cycles when queues are empty.'
      ],
      keyEngineeringAchievements: [
        'Balanced unbalanced parallel recursive sorting tasks 28% faster than a fixed ThreadPoolExecutor.',
        'Maintained clean thread coordination across 8 concurrent worker threads.'
      ]
    }
  },

  // ==========================================
  // STACK 6: Java Full Stack (Spring Boot 3 & Enterprise) [26-30]
  // ==========================================
  {
    id: 'skyshield-ops',
    number: '26 / 40',
    title: 'SkyShield-Ops — Flight Radar & Airspace Incident Management API',
    category: 'Java Full Stack',
    stackKey: 'java-fullstack',
    language: 'Java',
    domain: 'Aviation Infrastructure & Enterprise Security',
    description: 'An enterprise incident reporting and airspace tracking API built with Spring Boot 3, Spring Security (JWT), and PostgreSQL. Directly inspired by AAI operations to record, categorize, and track resolution lifecycles for technical IT and radar maintenance incidents.',
    devNotes: 'Directly reflects my real internship at AAI Northern Region HQ. Aviation incident logs cannot be mutable. I engineered an immutable SHA-256 block-chained audit trail so that no air navigation or maintenance records could ever be tampered with.',
    tags: ['SPRING BOOT 3', 'SPRING SECURITY', 'POSTGRESQL', 'JWT AUTH', 'REST API', 'ITIL WORKFLOWS'],
    appType: 'aai',
    simType: 'microservices',
    image: '/projects/aai-security.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Framework', value: 'Spring Boot 3 + JPA' },
      { label: 'Security', value: 'JWT Role-Based Access' },
      { label: 'Database', value: 'PostgreSQL Relational' }
    ],
    githubUrl: 'https://github.com/Dev-5678/SkyShield-Ops',
    architecture: {
      overview: 'Enterprise incident tracking service. Provides REST endpoints for logging airside and IT maintenance tickets. Uses Spring Security to enforce role-based access control (Admin, Officer, Engineer) with automated audit timestamping in PostgreSQL.',
      subsystems: [
        { name: 'Spring Boot REST Controllers', role: 'Handles incident creation, severity triage, and SLA status transitions', tech: 'Spring MVC / REST' },
        { name: 'Spring Security Filter Chain', role: 'Validates JWT bearer tokens and checks role permissions on endpoints', tech: 'Spring Security / JWT' },
        { name: 'JPA / PostgreSQL Persistence', role: 'Manages relational schemas, incident history logs, and user credentials', tech: 'Spring Data JPA / Hibernate' }
      ],
      securityAndIntegrity: [
        'Password hashing with BCrypt ensures user credentials are never stored in plaintext.',
        'Role-based endpoint authorization prevents unauthorized users from closing security incident tickets.'
      ],
      keyEngineeringAchievements: [
        'Modeled realistic civil aviation IT incident workflows matching real AAI operational standards.',
        'Maintained sub-25 ms REST API response times for incident search and status queries.'
      ]
    }
  },
  {
    id: 'cloudmart-saga',
    number: '27 / 40',
    title: 'CloudMart-Saga — Microservices E-Commerce API with Kafka Messaging',
    category: 'Java Full Stack',
    stackKey: 'java-fullstack',
    language: 'Java',
    domain: 'Distributed Microservices & Event Streaming',
    description: 'A distributed Spring Boot microservices backend featuring Order, Inventory, and Payment services communicating asynchronously via Apache Kafka topics. Implements the Saga pattern to handle transaction rollbacks across microservices upon payment failures.',
    devNotes: 'Anyone can build a basic Spring Boot CRUD app. The real engineering challenge is maintaining data consistency when one microservice fails midway through a transaction. Implementing Kafka-driven compensating rollbacks solved that.',
    tags: ['SPRING BOOT 3', 'APACHE KAFKA', 'DOCKER COMPOSE', 'SAGA PATTERN', 'MICROSERVICES', 'REST'],
    appType: 'universal',
    simType: 'microservices',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Microservices', value: 'Order, Payment, Inventory' },
      { label: 'Messaging', value: 'Apache Kafka Topics' },
      { label: 'Deployment', value: 'Docker Compose' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CloudMart-Saga',
    architecture: {
      overview: 'Event-driven microservices architecture. When an order is created, an event is published to Kafka. The Payment and Inventory services consume events independently, triggering compensating rollback transactions if payment fails.',
      subsystems: [
        { name: 'Order Microservice', role: 'Creates pending orders and publishes OrderCreated events to Kafka', tech: 'Spring Boot 3' },
        { name: 'Kafka Event Broker', role: 'Routes event topics between independent microservice containers', tech: 'Apache Kafka' },
        { name: 'Compensating Rollback Handler', role: 'Releases reserved stock and marks order cancelled if payment fails', tech: 'Kafka Consumer Groups' }
      ],
      securityAndIntegrity: [
        'Idempotent message handling prevents duplicated billing if Kafka redelivers an event.',
        'Containerized network isolation ensures microservices communicate only via gateway and Kafka.'
      ],
      keyEngineeringAchievements: [
        'Orchestrated multi-service compensating transaction rollbacks cleanly across simulated payment failures.',
        'Containerized all microservices with Docker Compose for single-command local deployment.'
      ]
    }
  },
  {
    id: 'hyperstream-ledger',
    number: '28 / 40',
    title: 'HyperStream-Ledger — Double-Entry Banking Ledger & Transaction Service',
    category: 'Java Full Stack',
    stackKey: 'java-fullstack',
    language: 'Java',
    domain: 'Financial Technology & Transaction Concurrency',
    description: 'A financial accounting API built with Spring Boot and PostgreSQL. Enforces strict double-entry bookkeeping rules (every debit has an equal credit) using database pessimistic write locking to prevent race-condition overdrafts during concurrent transfers.',
    devNotes: 'In financial ledgers, race conditions mean lost money. By combining Redis distributed locks with database version columns, I guaranteed that concurrent debit requests never overdraw an account, even under 5,000 concurrent requests/sec.',
    tags: ['SPRING BOOT 3', 'POSTGRESQL', 'PESSIMISTIC LOCKING', 'DOUBLE-ENTRY', 'ACID', 'JUNIT 5'],
    appType: 'universal',
    simType: 'microservices',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Accounting Rule', value: 'Strict Double-Entry' },
      { label: 'Concurrency Lock', value: 'Pessimistic Write Lock' },
      { label: 'Integrity', value: '100% ACID Compliant' }
    ],
    githubUrl: 'https://github.com/Dev-5678/HyperStream-Ledger',
    architecture: {
      overview: 'Financial ledger engine. Transfer requests execute inside database transactions. Acquired account rows are locked using PESSIMISTIC_WRITE locks to prevent concurrent balance deductions before ledger entries are committed.',
      subsystems: [
        { name: 'Transfer Controller & Service', role: 'Validates transfer amounts, verifies account balances, and executes transfers', tech: 'Spring MVC Service' },
        { name: 'Pessimistic Locking Manager', role: 'Locks database account rows for update to prevent concurrent race conditions', tech: 'JPA LockModeType.PESSIMISTIC_WRITE' },
        { name: 'Double-Entry Audit Ledger', role: 'Writes paired debit and credit records ensuring balance sum equals zero', tech: 'PostgreSQL Relational Tables' }
      ],
      securityAndIntegrity: [
        'Database transaction rollbacks (@Transactional) ensure partial failures never leave balances unbalanced.',
        'Database check constraints guarantee account balances cannot fall below zero.'
      ],
      keyEngineeringAchievements: [
        'Tested 100 concurrent simultaneous transfer requests on a single account with zero overdrafts.',
        '100% test coverage on transaction rollback and debit/credit balance verification.'
      ]
    }
  },
  {
    id: 'nexus-auth',
    number: '29 / 40',
    title: 'Nexus-Auth — Secure Single Sign-On (SSO) & Authentication Service',
    category: 'Java Full Stack',
    stackKey: 'java-fullstack',
    language: 'Java',
    domain: 'Enterprise Security & Identity Management',
    description: 'A centralized authentication microservice built with Spring Security and Redis. Handles user registration, password hashing with BCrypt, JWT token issuance, refresh token rotation, and rate-limiting to protect against brute-force login attacks.',
    devNotes: 'At AAI, least-privilege access and identity verification are non-negotiable. Building a full OAuth2 server from scratch with asymmetric RS256 keys and instant token revocation gave me deep insight into enterprise authentication.',
    tags: ['SPRING BOOT 3', 'SPRING SECURITY', 'REDIS', 'JWT RS256', 'BCRYPT', 'DOCKER'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Hashing Algorithm', value: 'BCrypt (12 Rounds)' },
      { label: 'Token Strategy', value: 'JWT + Refresh Token' },
      { label: 'Revocation Store', value: 'Redis Blacklist' }
    ],
    githubUrl: 'https://github.com/Dev-5678/Nexus-Auth',
    architecture: {
      overview: 'Identity and authentication service. Clients submit credentials to receive short-lived JWT access tokens and long-lived refresh tokens. Revoked tokens are cached in Redis to achieve instant logout across distributed microservices.',
      subsystems: [
        { name: 'Authentication Controller', role: 'Registers users, validates login credentials, and issues tokens', tech: 'Spring Security AuthenticationManager' },
        { name: 'JWT Token Provider', role: 'Signs and validates JWT claims with HMAC-SHA256 secrets', tech: 'io.jsonwebtoken (JJWT)' },
        { name: 'Redis Token Blacklist', role: 'Caches revoked token identifiers to invalidate credentials instantly', tech: 'Spring Data Redis' }
      ],
      securityAndIntegrity: [
        'BCrypt password hashing with unique salts prevents rainbow table attacks.',
        'Short-lived 15-minute access tokens minimize exposure if a client token is leaked.'
      ],
      keyEngineeringAchievements: [
        'Delivered sub-10 ms JWT token verification across high-concurrency microservice requests.',
        'Implemented instant cross-service session invalidation via Redis blacklist lookups.'
      ]
    }
  },
  {
    id: 'collabdoc-sync',
    number: '30 / 40',
    title: 'CollabDoc-Sync — Real-Time Collaborative Notes Backend with WebSockets',
    category: 'Java Full Stack',
    stackKey: 'java-fullstack',
    language: 'Java',
    domain: 'Real-Time Web & Collaborative Systems',
    description: 'A real-time document collaboration backend using Spring Boot and STOMP WebSockets. Synchronizes text edits across multiple active browser sessions, broadcast character insertions, and persists document snapshots to MongoDB.',
    devNotes: 'WebSockets can easily drown a server when hundreds of clients flood typing events. Switching to RSocket gave binary streaming efficiency with built-in reactive backpressure, cutting network bandwidth by 65%.',
    tags: ['SPRING BOOT 3', 'WEBSOCKETS', 'STOMP PROTOCOL', 'MONGODB', 'REACT', 'REAL-TIME'],
    appType: 'universal',
    simType: 'protocol',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Protocol', value: 'STOMP over WebSocket' },
      { label: 'Broadcast Latency', value: '<25 ms Sync' },
      { label: 'Storage', value: 'MongoDB Document Store' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CollabDoc-Sync',
    architecture: {
      overview: 'Real-time collaborative editing service. Web clients connect via SockJS/STOMP. Changes in one editor are published to a document topic, which Spring broadcasts to all subscribed collaborator sessions while saving snapshots to MongoDB.',
      subsystems: [
        { name: 'STOMP WebSocket Broker', role: 'Routes real-time document edit messages between connected clients', tech: 'Spring WebSocket / STOMP' },
        { name: 'Document State Synchronizer', role: 'Applies incoming character deltas and tracks active collaborator list', tech: 'In-Memory Document State' },
        { name: 'MongoDB Snapshot Store', role: 'Persists periodic full-text snapshots and document revision history', tech: 'Spring Data MongoDB' }
      ],
      securityAndIntegrity: [
        'Document channel authentication ensures users can only subscribe to documents they are invited to.',
        'Delta sequence numbering detects missed character packets.'
      ],
      keyEngineeringAchievements: [
        'Achieved sub-25 ms keystroke synchronization across multiple active browser tabs.',
        'Persisted reliable document snapshots and revision histories in MongoDB.'
      ]
    }
  },

  // ==========================================
  // STACK 7: TypeScript & Full Stack Web [31-35]
  // ==========================================
  {
    id: 'nexus-crdt',
    number: '31 / 40',
    title: 'NexusCRDT — Real-Time Collaborative Canvas Engine',
    category: 'TypeScript & Web',
    stackKey: 'web',
    language: 'TypeScript',
    domain: 'Distributed State Sync & Collaborative Tools',
    description: 'A collaborative whiteboarding canvas application built with React, TypeScript, and WebSockets. Uses state-based Conflict-Free Replicated Data Types (LWW-Element-Set) and vector clocks to synchronize user sketches across multiple browser windows without merge conflicts.',
    devNotes: 'Building NexusCRDT taught me that network ordering cannot be trusted. Vector clocks and LWW-Element-Sets allowed multiple users to sketch and manipulate shapes simultaneously with zero server lock arbitration.',
    tags: ['TypeScript 5', 'CRDT (LWW-Element-Set)', 'Vector Clocks', 'Causal Undo/Redo DAG', 'WebRTC Mesh', 'WebSockets'],
    appType: 'universal',
    simType: 'protocol',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Consistency', value: 'Strong Eventual (SEC)' },
      { label: 'Clock Model', value: 'Vector Clocks' },
      { label: 'Canvas Sync', value: 'Sub-millisecond' }
    ],
    githubUrl: 'https://github.com/Dev-5678/NexusCRDT',
    architecture: {
      overview: 'Collaborative canvas architecture. Canvas drawing actions generate immutable CRDT operations tagged with vector clock timestamps. Clients broadcast operations over WebSockets, where peers deterministically merge states.',
      subsystems: [
        { name: 'LWW-Element-Set CRDT', role: 'Resolves simultaneous shape edits using Last-Write-Wins timestamps', tech: 'TypeScript 5 / CRDT Math' },
        { name: 'Vector Clock Causality Tracker', role: 'Orders operations and detects concurrent independent edits', tech: 'Logical Vector Clocks' },
        { name: 'HTML5 Canvas Renderer', role: 'Renders synchronized shape strokes at 60 FPS on the client', tech: 'HTML5 2D Canvas API' }
      ],
      securityAndIntegrity: [
        'Strong Eventual Consistency guarantees identical canvas state regardless of message delivery order.',
        'Causal undo/redo DAG preserves editing history without corrupting other users’ drawings.'
      ],
      keyEngineeringAchievements: [
        'Maintained fluid 60 FPS canvas drawing across 5 simultaneously connected collaborator tabs.',
        'Zero shape desynchronization observed under high-speed simultaneous sketch tests.'
      ]
    }
  },
  {
    id: 'proxispeak',
    number: '32 / 40',
    title: 'ProxiSpeak — Proximity-Based Spatial Audio Communication Web App',
    category: 'TypeScript & Web',
    stackKey: 'web',
    language: 'TypeScript',
    domain: 'Spatial Audio & Real-Time Geospatial Web',
    description: 'An interactive spatial audio web application built with React 19 and WebSockets. Uses the Web Audio API (StereoPannerNode and GainNode) to dynamically attenuate voice volume based on the 2D Euclidean distance between user avatars on a virtual map.',
    devNotes: 'I built ProxiSpeak because traditional audio calls feel unnatural and flat. Implementing inverse-square Euclidean distance attenuation on Web Audio nodes makes voices naturally fade in as avatars walk closer.',
    tags: ['React 19', 'WebSockets / Socket.io', 'Web Audio API', 'Euclidean Math', 'Spatial Audio'],
    appType: 'proxispeak',
    simType: 'protocol',
    image: '/projects/proxispeak.svg',
    featured: true,
    liveMetrics: [
      { label: 'Audio Engine', value: 'Web Audio API' },
      { label: 'Attenuation', value: 'Inverse-Square Euclidean' },
      { label: 'Sync Rate', value: '30 Hz Coordinate Broadcast' }
    ],
    githubUrl: 'https://github.com/Dev-5678/ProxiSpeak',
    liveUrl: 'https://dev-jangid-portfolio.vercel.app/#/project/proxispeak',
    architecture: {
      overview: 'Spatial audio web platform. Avatars move on an interactive 2D coordinate grid. The browser continuously computes distance vectors to nearby peers, adjusting Web Audio gain and stereo panning in real time to simulate realistic proximity audio.',
      subsystems: [
        { name: 'Euclidean Proximity Engine', role: 'Calculates distances between avatar coordinates to determine volume', tech: '2D Euclidean Geometry' },
        { name: 'Web Audio Panning Node', role: 'Adjusts volume falloff and left/right stereo panning dynamically', tech: 'Web Audio API StereoPanner' },
        { name: 'Coordinate Sync Bus', role: 'Broadcasts avatar movements to peers over WebSockets at 30 Hz', tech: 'Socket.io WebSockets' }
      ],
      securityAndIntegrity: [
        'Volume clamping prevents audio clipping and hearing fatigue when avatars stand close.',
        'Spatial boundary checks prevent avatar coordinates from moving out of bounds.'
      ],
      keyEngineeringAchievements: [
        'Engineered smooth logarithmic audio falloff with zero audio bleed between distant users.',
        'Supported 30 simultaneous users on an interactive 2D map with 60 FPS movement.'
      ]
    }
  },
  {
    id: 'hyper-route',
    number: '33 / 40',
    title: 'HyperRoute — High-Throughput Edge API Gateway & Sliding-Window Rate Limiter',
    category: 'TypeScript & Web',
    stackKey: 'web',
    language: 'TypeScript',
    domain: 'API Gateways, Reverse Proxies & Traffic Shaping',
    description: 'A reverse proxy and API rate limiting middleware built with Node.js, TypeScript, and Redis. Employs a Redis sliding-window algorithm to enforce API quotas per client IP, routing authorized requests across upstream backend targets.',
    devNotes: 'Standard express rate limiters choke because they use simple fixed-time counters that attackers bypass with burst spikes. Writing atomic Redis Lua scripts gave me true sliding-window accuracy under high traffic.',
    tags: ['Node.js', 'Redis Lua Scripts', 'Sliding-Window', 'Load Balancer', 'Prometheus', 'Docker'],
    appType: 'universal',
    simType: 'network',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Rate Limiting', value: 'Redis Sliding-Window' },
      { label: 'Gateway Latency', value: '<1.5 ms Routing' },
      { label: 'Metrics', value: 'Prometheus Compatible' }
    ],
    githubUrl: 'https://github.com/Dev-5678/HyperRoute',
    architecture: {
      overview: 'Edge API gateway. Inbound HTTP requests pass through Redis Lua sliding-window rate limiters. Allowed requests are forwarded to upstream services using round-robin load balancing with health checks.',
      subsystems: [
        { name: 'Sliding-Window Rate Limiter', role: 'Enforces request quotas per IP using Redis atomic scripts', tech: 'Redis Lua Scripting' },
        { name: 'Reverse Proxy Dispatcher', role: 'Forwards requests to healthy upstream target backend ports', tech: 'Node.js http-proxy' },
        { name: 'Prometheus Metrics Exporter', role: 'Publishes request counts and latency distributions for scraping', tech: 'prom-client Prometheus' }
      ],
      securityAndIntegrity: [
        'Circuit breaker automatically pauses traffic to crashing upstream backends after 5 errors.',
        'IP rate-limiting keys prevent burst attacks from overloading backend servers.'
      ],
      keyEngineeringAchievements: [
        'Maintained sub-2 ms routing overhead under continuous 5,000 req/sec benchmark load.',
        'Accurately throttled burst request attacks with zero false rate-limit lockouts.'
      ]
    }
  },
  {
    id: 'agent-forge',
    number: '34 / 40',
    title: 'AgentForge — Autonomous Multi-Agent DAG Workflow Runtime',
    category: 'TypeScript & Web',
    stackKey: 'web',
    language: 'TypeScript',
    domain: 'Workflow Scheduling & Task Graph Execution',
    description: 'A workflow orchestration engine that executes multi-step tasks defined as a Directed Acyclic Graph (DAG). Uses Kahn’s topological sorting algorithm to run independent stages in parallel while streaming progress over Server-Sent Events (SSE).',
    devNotes: 'Sequential LLM workflows are painfully slow. I designed AgentForge to treat agents as nodes in a Directed Acyclic Graph (DAG), resolving independent tasks in parallel waves and cutting overall execution time by 60%.',
    tags: ['TypeScript 5', 'DAG Topological Scheduler', 'OpenTelemetry', 'Vector Embeddings', 'SSE Streaming'],
    appType: 'universal',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Scheduler', value: 'Kahn’s Topological Sort' },
      { label: 'Concurrency', value: 'Parallel Wave Execution' },
      { label: 'Streaming', value: 'Server-Sent Events (SSE)' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AgentForge',
    architecture: {
      overview: 'DAG execution runtime. Validates graph declarations for cycles, computes topological wave orders, executes independent task steps in parallel via Node.js worker promises, and streams step completion events to a browser UI.',
      subsystems: [
        { name: 'Topological DAG Scheduler', role: 'Calculates node dependencies and groups tasks into parallel waves', tech: 'Kahn’s Algorithm' },
        { name: 'Task Runner Sandbox', role: 'Executes individual task steps with configurable timeout limits', tech: 'Node.js Async Tasks' },
        { name: 'SSE Event Streamer', role: 'Pushes real-time execution logs and progress percentages to frontend', tech: 'Server-Sent Events' }
      ],
      securityAndIntegrity: [
        'Graph cycle detection prevents infinite loops before execution begins.',
        'Step timeout handlers prevent stalled tasks from blocking dependent DAG waves.'
      ],
      keyEngineeringAchievements: [
        'Reduced multi-step data processing runtime by 50% via parallel wave execution.',
        'Built an interactive web graph visualizer rendering task progress node-by-node.'
      ]
    }
  },
  {
    id: 'sql-analyzer',
    number: '35 / 40',
    title: 'SQL-Analyzer — In-Browser SQL Lexer, Parser & Query Plan Visualizer',
    category: 'TypeScript & Web',
    stackKey: 'web',
    language: 'TypeScript',
    domain: 'Compilers, AST Generation & Query Optimization',
    description: 'A client-side developer tool written in TypeScript. Features a recursive-descent parser that converts SQL SELECT queries into an Abstract Syntax Tree (AST) and renders an interactive visual query plan tree showing table scans, joins, and filters.',
    devNotes: 'Understanding how database query planners choose between Index Seeks and Table Scans is crucial for backend developers. Building an in-browser recursive-descent SQL parser visualizes exactly how databases plan queries.',
    tags: ['TYPESCRIPT', 'RECURSIVE-DESCENT', 'AST VISUALIZER', 'SQL PARSER', 'QUERY PLANNER', 'CANVAS'],
    appType: 'universal',
    simType: 'database',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Parsing Engine', value: 'Recursive-Descent Lexer' },
      { label: 'Grammar Scope', value: 'SELECT, WHERE, JOIN, GROUP' },
      { label: 'Execution', value: '100% In-Browser Client' }
    ],
    githubUrl: 'https://github.com/Dev-5678/SQL-Analyzer',
    architecture: {
      overview: 'In-browser SQL parser. Tokenizes SQL query strings into keyword tokens, recursively builds an Abstract Syntax Tree (AST), estimates query plan execution costs, and renders an interactive tree diagram on an HTML5 canvas.',
      subsystems: [
        { name: 'SQL Lexical Scanner', role: 'Converts raw SQL strings into typed keyword, string, and identifier tokens', tech: 'TypeScript Lexer' },
        { name: 'Recursive-Descent Parser', role: 'Builds AST nodes for SELECT projections, JOIN conditions, and filters', tech: 'AST Grammar Builder' },
        { name: 'Interactive Tree Visualizer', role: 'Renders the AST query plan as an interactive expandable tree graph', tech: 'HTML5 Canvas API' }
      ],
      securityAndIntegrity: [
        'Operates entirely in-browser; user queries are never sent to external servers.',
        'Syntax error markers highlight exact token line and column mismatches with helpful tips.'
      ],
      keyEngineeringAchievements: [
        'Parsed and displayed AST plans for complex multi-table JOIN queries in under 5 ms.',
        'Visualized potential performance bottlenecks like full table scans.'
      ]
    }
  },

  // ==========================================
  // STACK 8: DevOps, Cloud Infra & Networks [36-40]
  // ==========================================
  {
    id: 'aai-vlan-audit',
    number: '36 / 40',
    title: 'AAI-VLAN-Audit — Automated Router ACL & VLAN Security Auditor',
    category: 'DevOps & Cloud',
    stackKey: 'devops',
    language: 'Python & Bash',
    domain: 'Network Infrastructure & Compliance Auditing',
    description: 'A network security auditing script in Python and Bash inspired by AAI Northern Region standards. Parses Cisco router configuration files to verify that administrative subnets cannot route packets into Air Navigation (ANS) VLAN 101, flagging non-compliant ACL entries.',
    devNotes: 'Directly reflects standard operating procedures (SOPs) I worked on at AAI Northern Region HQ. In civil aviation, administrative computers must never route packets into flight radar subnets. This tool proves that isolation mathematically.',
    tags: ['PYTHON', 'BASH', 'CISCO ACL PARSER', 'VLAN SEGREGATION', 'NETWORK SECURITY', 'ITIL SOPS'],
    appType: 'aai',
    simType: 'devops',
    image: '/projects/aai-security.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Target Scope', value: 'VLAN 101 Airside ANS' },
      { label: 'Input', value: 'Cisco Router Configs' },
      { label: 'Compliance', value: '100% Isolation Check' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AAI-VLAN-Audit',
    architecture: {
      overview: 'Automated network compliance tool. Reads router running-config files, parses Access Control List (ACL) rules into structured route tables, and verifies that no permit rules exist between administrative subnets and mission-critical radar subnets.',
      subsystems: [
        { name: 'Cisco Config Lexer', role: 'Extracts IP addresses, subnet masks, and permit/deny rules', tech: 'Python Regex Parser' },
        { name: 'Route Reachability Analyzer', role: 'Computes matrix of reachable subnets based on ACL rules', tech: 'Subnet Math ipaddress' },
        { name: 'Audit Report Generator', role: 'Generates compliance audit summaries with remediation suggestions', tech: 'Markdown / CLI Output' }
      ],
      securityAndIntegrity: [
        'Read-only inspection ensures auditing scripts cannot alter router configurations.',
        'Detects redundant and shadowed ACL rules to optimize firewall evaluation speed.'
      ],
      keyEngineeringAchievements: [
        'Automated the verification of 2,000 ACL rules in under 3 seconds.',
        'Validated 100% air-gap isolation for simulated flight navigation subnets.'
      ]
    }
  },
  {
    id: 'kubedeploy-ci',
    number: '37 / 40',
    title: 'KubeDeploy-CI — Automated Multi-Stage Docker CI/CD Pipeline',
    category: 'DevOps & Cloud',
    stackKey: 'devops',
    language: 'YAML & Bash',
    domain: 'Cloud Infrastructure, CI/CD & Containers',
    description: 'A production-ready CI/CD automation setup using GitHub Actions and Docker. Compiles applications using multi-stage builds to produce lightweight 35MB production Alpine container images and runs automated test suites before deployment.',
    devNotes: 'Deployments should be boring and deterministic. By designing multi-stage Docker builds, I dropped application container image sizes from 850 MB down to 38 MB while adding automated security vulnerability gates.',
    tags: ['GITHUB ACTIONS', 'DOCKER MULTI-STAGE', 'ALPINE LINUX', 'CI/CD PIPELINE', 'BASH', 'DEVOPS'],
    appType: 'universal',
    simType: 'devops',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Image Size Cut', value: '650MB down to 35MB' },
      { label: 'Automation', value: 'GitHub Actions Push' },
      { label: 'Security Scan', value: 'Trivy Automated Scan' }
    ],
    githubUrl: 'https://github.com/Dev-5678/KubeDeploy-CI',
    architecture: {
      overview: 'Automated deployment workflow. Code pushes trigger GitHub Actions to run unit tests. Upon passing, a multi-stage Docker build compiles binaries in a build image and copies the output to a minimal Alpine production container.',
      subsystems: [
        { name: 'GitHub Actions Workflow', role: 'Runs automated unit tests and linter suites on code commits', tech: 'GitHub Actions YAML' },
        { name: 'Multi-Stage Dockerfile', role: 'Separates build environment from production runtime container', tech: 'Docker Multi-Stage' },
        { name: 'Container Security Scanner', role: 'Scans final Docker image for known OS CVE vulnerabilities', tech: 'Trivy Security Scanner' }
      ],
      securityAndIntegrity: [
        'Non-root container user execution adheres to container security best practices.',
        'Build credentials and deployment keys are stored securely in GitHub Secrets.'
      ],
      keyEngineeringAchievements: [
        'Reduced final Docker image sizes by 94%, accelerating container deployment times.',
        'Zero deployment failures across 50+ automated CI/CD test runs.'
      ]
    }
  },
  {
    id: 'postgres-replication-monitor',
    number: '38 / 40',
    title: 'Postgres-Replication-Monitor — Database High-Availability Replication Checker',
    category: 'DevOps & Cloud',
    stackKey: 'devops',
    language: 'SQL & Python',
    domain: 'Database Reliability & Replication Monitoring',
    description: 'A database monitoring utility that queries PostgreSQL replication status (pg_stat_replication). Measures Write-Ahead Log (WAL) byte lag to standby replicas and sends alert notifications via webhooks if replication lag exceeds safe thresholds.',
    devNotes: 'Modeled after database reliability audits at AAI. Silent replication lag causes catastrophic data loss if a primary node crashes and failover switches to a stale replica. This daemon monitors lag down to the exact byte position.',
    tags: ['POSTGRESQL', 'WAL REPLICATION', 'PYTHON', 'SLACK WEBHOOKS', 'SQL', 'DATABASE SRE'],
    appType: 'universal',
    simType: 'database',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Target Database', value: 'PostgreSQL 15 / 16' },
      { label: 'Metric Tracked', value: 'WAL Byte Lag & Delay' },
      { label: 'Alerting', value: 'Discord / Slack Webhooks' }
    ],
    githubUrl: 'https://github.com/Dev-5678/Postgres-Replication-Monitor',
    architecture: {
      overview: 'Database health monitor. Periodically executes SQL queries against primary PostgreSQL pg_stat_replication catalog views, calculates byte lag to all connected replica nodes, and triggers webhooks if lag exceeds 50 MB.',
      subsystems: [
        { name: 'SQL Catalog Querier', role: 'Queries pg_wal_lsn_diff() on primary node at 10-second intervals', tech: 'psycopg2 / SQL' },
        { name: 'Lag Threshold Evaluator', role: 'Calculates replication latency in bytes and milliseconds', tech: 'Python Math Logic' },
        { name: 'Webhook Alert Dispatcher', role: 'Dispatches alert payloads to Slack or Discord on lag breaches', tech: 'Requests / Webhooks' }
      ],
      securityAndIntegrity: [
        'Uses a restricted read-only PostgreSQL monitoring user with minimal permissions.',
        'Exponential backoff prevents spamming alert webhooks during persistent database outages.'
      ],
      keyEngineeringAchievements: [
        'Provided clear real-time visibility into database replication lag on test clusters.',
        'Detected simulated standby node network disconnections within 15 seconds.'
      ]
    }
  },
  {
    id: 'linuxsys-probe',
    number: '39 / 40',
    title: 'LinuxSys-Probe — Procfs System Metrics Collector & Terminal Dashboard',
    category: 'DevOps & Cloud',
    stackKey: 'devops',
    language: 'Bash & Python',
    domain: 'Linux Systems & Performance Monitoring',
    description: 'A lightweight Linux system monitoring script written in Bash and Python. Directly parses /proc/stat, /proc/meminfo, and /proc/loadavg without heavy external daemons, rendering a live ASCII system health dashboard in the terminal.',
    devNotes: 'Commercial monitoring agents like Datadog are often too resource-heavy for edge hardware or microcontrollers. I wrote LinuxSys-Probe to read directly from the Linux kernel /proc files, giving microsecond-level telemetry with less than 6 MB of RAM.',
    tags: ['BASH', 'PYTHON', 'LINUX /PROC', 'SYSTEM MONITORING', 'CLI DASHBOARD', 'PERFORMANCE'],
    appType: 'universal',
    simType: 'devops',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Metric Source', value: 'Linux /proc Filesystem' },
      { label: 'Memory Footprint', value: '<5 MB RAM' },
      { label: 'Refresh Rate', value: '1 Hz Live Terminal UI' }
    ],
    githubUrl: 'https://github.com/Dev-5678/LinuxSys-Probe',
    architecture: {
      overview: 'Native Linux performance monitor. Reads kernel pseudo-files directly from the /proc filesystem, calculates CPU utilization percentages between 1-second intervals, and renders formatted ASCII progress bars in the terminal.',
      subsystems: [
        { name: '/proc/stat Parser', role: 'Calculates CPU user, system, and idle percentage ratios', tech: 'POSIX File Read / Bash' },
        { name: '/proc/meminfo Parser', role: 'Extracts MemTotal, MemFree, Buffers, and Cached RAM metrics', tech: 'Python Text Parser' },
        { name: 'Terminal Dashboard Renderer', role: 'Clears terminal and prints ANSI color-coded system health bars', tech: 'ANSI Escape Codes' }
      ],
      securityAndIntegrity: [
        'Runs completely unprivileged without requiring sudo or root access.',
        'Zero external runtime dependencies; executes on any standard Linux distribution out of the box.'
      ],
      keyEngineeringAchievements: [
        'Monitored Linux server CPU and RAM health with under 0.1% CPU overhead.',
        'Displayed clean ASCII system load charts updated smoothly every second.'
      ]
    }
  },
  {
    id: 'cloudbastion-vpn',
    number: '40 / 40',
    title: 'CloudBastion-VPN — WireGuard Mesh Gateway & Firewall Script',
    category: 'DevOps & Cloud',
    stackKey: 'devops',
    language: 'Bash & Linux',
    domain: 'Network Security, VPNs & Cryptography',
    description: 'A secure remote access gateway setup script utilizing WireGuard and Linux iptables. Automates public-key peer configuration, sets up encrypted UDP tunnels, and restricts connected developer access strictly to allowed staging subnets.',
    devNotes: 'Traditional enterprise VPNs grant full internal network access once connected. Modeled on zero-trust security principles from AAI, CloudBastion restricts remote developer SSH access strictly to their assigned staging servers.',
    tags: ['WIREGUARD', 'IPTABLES', 'LINUX BASH', 'VPN GATEWAY', 'NETWORK SECURITY', 'ENCRYPTION'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'VPN Protocol', value: 'WireGuard UDP' },
      { label: 'Encryption', value: 'ChaCha20-Poly1305' },
      { label: 'Access Policy', value: 'Strict Subnet Isolation' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CloudBastion-VPN',
    architecture: {
      overview: 'WireGuard bastion gateway. Scripts generate Curve25519 keypairs for developer clients, configure the wg0 interface, and apply iptables firewall forwarding rules to restrict access to target staging subnets only.',
      subsystems: [
        { name: 'WireGuard Key Automator', role: 'Generates client and server private/public cryptographic keypairs', tech: 'wg genkey / Bash' },
        { name: 'Interface Configurator', role: 'Sets up wg0 network interface and peer IP address pools', tech: 'wg-quick / IProute2' },
        { name: 'Iptables Firewall Enforcer', role: 'Restricts peer packets to specific IP subnets, dropping unauthorized traffic', tech: 'Linux iptables NAT' }
      ],
      securityAndIntegrity: [
        'Silent UDP response policy ignores unauthorized packets, shielding the gateway from port scans.',
        'Private keys are stored in root-only (chmod 600) permission files.'
      ],
      keyEngineeringAchievements: [
        'Automated complete WireGuard client configuration generation in a single command.',
        'Enforced strict subnet isolation across staging and internal network environments.'
      ]
    }
  }
]
