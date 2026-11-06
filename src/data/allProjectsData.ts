export type StackKey =
  | 'all'
  | 'c-systems'
  | 'cpp-performance'
  | 'python-core'
  | 'python-fullstack'
  | 'java-core'
  | 'java-enterprise'
  | 'web-protocols'
  | 'devops-infra'

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
  stackKey: 'c-systems' | 'cpp-performance' | 'python-core' | 'python-fullstack' | 'java-core' | 'java-enterprise' | 'web-protocols' | 'devops-infra'
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

export const STACK_CATEGORIES: { key: StackKey; label: string; count: number; badge: string }[] = [
  { key: 'all', label: 'All Projects', count: 40, badge: 'COMPLETE CATALOG' },
  { key: 'c-systems', label: 'C Systems & OS', count: 5, badge: 'LOW-LEVEL KERNEL' },
  { key: 'cpp-performance', label: 'C++ Low-Latency', count: 5, badge: 'C++20 & SIMD' },
  { key: 'python-core', label: 'Python Systems', count: 5, badge: 'SOCKETS & B-TREE' },
  { key: 'python-fullstack', label: 'Python Full-Stack & AI', count: 5, badge: 'RAG & MISSION CONTROL' },
  { key: 'java-core', label: 'Java Systems & JVM', count: 5, badge: 'LOCK-FREE & JMM' },
  { key: 'java-enterprise', label: 'Java Enterprise', count: 5, badge: 'SPRING BOOT 3 & SAGA' },
  { key: 'web-protocols', label: 'TypeScript & Protocols', count: 5, badge: 'CRDT & SPATIAL AUDIO' },
  { key: 'devops-infra', label: 'DevOps & Networks', count: 5, badge: 'VLAN & EBPF PROBES' }
]

export const ALL_PROJECTS: ProjectData[] = [
  // ==========================================
  // STACK 1: C (Low-Level Systems & OS) [1-5]
  // ==========================================
  {
    id: 'aerortos-1u',
    number: '01 / 40',
    title: 'AeroRTOS-1U — CanSat Telemetry Microkernel',
    category: 'C Systems & OS',
    stackKey: 'c-systems',
    domain: 'Aerospace Microkernel & Telemetry Firmware',
    description: 'Deterministic cooperative microkernel engineered for 1U CanSat/CubeSat flight payloads. Schedules barometric, IMU, and RF transmission tasks via non-blocking hardware timer ticks without dynamic heap allocation pauses.',
    devNotes: 'During live drop tests with India Space Lab, standard Arduino loop handlers suffered from gyro packet drops due to blocking I2C reads. I replaced the entire runtime with this static-memory microkernel, fixing task switch time to 18 µs and isolating bus failures.',
    tags: ['C99', 'MICROKERNEL', 'TASK SCHEDULER', 'CRC-16-CCITT', 'CANSAT 1U', 'AVR/ARM'],
    appType: 'cansat',
    simType: 'kernel',
    image: '/projects/cansat-space.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Task Switch', value: '18 µs' },
      { label: 'Heap Overhead', value: '0 Bytes (Static)' },
      { label: 'CRC Integrity', value: '100% CCITT' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AeroRTOS-1U',
    architecture: {
      overview: 'Preemptive/cooperative hybrid scheduler using static Task Control Blocks (TCBs). Fixed 10 ms hardware timer tick drives state machines across BMP280, MPU6050, and 433 MHz UHF radio with CRC-16 integrity verification.',
      subsystems: [
        { name: 'Static TCB Scheduler', role: 'Round-robin task dispatcher with deterministic deadlines', tech: 'C99 Assembly Timer ISR' },
        { name: 'Non-Blocking I2C/SPI Driver', role: 'DMA state machine sampling pressure and orientation', tech: 'Hardware Register Manipulation' },
        { name: 'Telemetry Packetizer', role: 'Binary serialization and CRC-16 frame stamping', tech: 'CRC-16-CCITT Lookup' }
      ],
      securityAndIntegrity: [
        'Zero dynamic memory allocations (all buffers statically sized in BSS section).',
        'Hardware watchdog timer auto-recovery within 64 ms of brownout or bus lockup.',
        'Strict frame preamble and parity validation rejecting RF noise.'
      ],
      keyEngineeringAchievements: [
        'Maintained 100% packet transmission across 9,600 baud UHF radio links during simulated descent.',
        'Zero stack overflow incidents verified via linker boundary analysis and canary bytes.'
      ]
    }
  },
  {
    id: 'valloc-c',
    number: '02 / 40',
    title: 'vAlloc — Low-Fragmentation Custom Memory Allocator',
    category: 'C Systems & OS',
    stackKey: 'c-systems',
    domain: 'Operating System Memory Management',
    description: 'Custom memory allocator replacing standard glibc malloc/free. Features segregated size-class free lists, boundary-tag block coalescing, and POSIX mmap page acquisition to combat external fragmentation.',
    devNotes: 'I wrote vAlloc to understand why long-running server daemons slowly bleed virtual memory over days. Implementing boundary tags gave me deep respect for pointer math and cache line alignment.',
    tags: ['C99', 'MEMORY ALLOCATOR', 'MALLOC/FREE', 'BOUNDARY TAGS', 'VALGRIND', 'POSIX MMAP'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Alloc Speed', value: '<42 ns' },
      { label: 'Alignment', value: '8-Byte Strict' },
      { label: 'Fragmentation', value: '<4.1%' }
    ],
    githubUrl: 'https://github.com/Dev-5678/vAlloc',
    architecture: {
      overview: 'Two-tier memory manager utilizing segregated free lists for allocations between 16 and 4096 bytes and direct mmap mapping for large chunks. Employs boundary-tag header/footer structures for O(1) adjacent free block merging.',
      subsystems: [
        { name: 'Segregated Free List Buckets', role: 'Power-of-two size classes for rapid O(1) free block retrieval', tech: 'Intrusive Doubly-Linked Lists' },
        { name: 'Boundary Tag Coalescer', role: 'Instant forward and backward block merging on free()', tech: 'Header/Footer Tag Math' },
        { name: 'Virtual Page Arena', role: 'System page allocation and release via mmap/munmap', tech: 'POSIX Kernel Syscalls' }
      ],
      securityAndIntegrity: [
        '8-byte boundary alignment enforced on all allocated addresses for CPU bus safety.',
        'Canary byte verification detecting off-by-one heap buffer overruns upon deallocation.',
        'Zero double-free vulnerabilities through header bitmask tagging.'
      ],
      keyEngineeringAchievements: [
        'Achieved sub-45 ns allocation time on microbenchmarks across 500,000 cyclic allocation requests.',
        'Passed full Valgrind test suites with zero memory leaks.'
      ]
    }
  },
  {
    id: 'apex-shell',
    number: '03 / 40',
    title: 'ApexShell — POSIX Unix Command Shell & Supervisor',
    category: 'C Systems & OS',
    stackKey: 'c-systems',
    domain: 'Systems Programming & Process Control',
    description: 'Interactive POSIX command shell featuring tokenized pipeline chaining, background job supervision, signal masking, file descriptor I/O redirection, and history expansion without external shell dependencies.',
    devNotes: 'Building ApexShell taught me how delicate process lifecycles are. Handling SIGCHLD properly with waitpid(WNOHANG) in a signal handler was the only way to avoid zombie process leaks under heavy piping.',
    tags: ['C99', 'POSIX SIGNALS', 'FORK/EXEC', 'UNIX PIPES', 'JOB CONTROL', 'FILE DESCRIPTORS'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Dispatch Latency', value: '0.8 ms' },
      { label: 'Pipe Chaining', value: 'Unlimited (|)' },
      { label: 'Zombie Leaks', value: 'Zero (WNOHANG)' }
    ],
    githubUrl: 'https://github.com/Dev-5678/ApexShell',
    architecture: {
      overview: 'Command-line execution environment utilizing lexical scanner and recursive-descent syntax tree generation. Orchestrates child processes via fork(), execvp(), and pipe() system calls while preserving terminal tty state.',
      subsystems: [
        { name: 'Lexical Parser & Ast Builder', role: 'Splits raw command input into arguments, pipes, and redirection tokens', tech: 'POSIX C Lexer' },
        { name: 'Process Pipeline Chaining', role: 'Manages read/write ends of multiple Unix pipes across child processes', tech: 'pipe() / dup2() Syscalls' },
        { name: 'Async Signal Supervisor', role: 'Traps SIGINT, SIGTSTP, and cleans zombies via SIGCHLD handlers', tech: 'sigaction / sigprocmask' }
      ],
      securityAndIntegrity: [
        'Signal masking prevents race conditions between background job registration and process exit.',
        'Strict file descriptor sanitization prevents leaked descriptors in spawned child processes.'
      ],
      keyEngineeringAchievements: [
        'Handled complex multi-stage pipelines (e.g., cat file | grep err | cut -d: -f2 | sort -r | uniq) seamlessly.',
        'Maintained rock-solid stability under continuous terminal resizing and Ctrl+C interrupt signals.'
      ]
    }
  },
  {
    id: 'titannet-raw',
    number: '04 / 40',
    title: 'TitanNet-Raw — Raw Socket Packet Dissector & ARP Sentinel',
    category: 'C Systems & OS',
    stackKey: 'c-systems',
    domain: 'Enterprise Network Security & Deep Packet Inspection',
    description: 'Kernel-level network packet sniffer capturing raw Ethernet frames via AF_PACKET sockets. Decodes IP, TCP, UDP, ICMP, and ARP headers in real time, detecting ARP spoofing attacks and SYN flood anomalies.',
    devNotes: 'Directly derived from network monitoring tasks at Airports Authority of India (AAI). I wanted to see raw ethernet frames directly off the NIC rather than trusting high-level libraries.',
    tags: ['C99', 'RAW SOCKETS', 'AF_PACKET', 'DEEP PACKET INSPECTION', 'ARP SPOOF DETECTION', 'PCAP'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Capture Rate', value: '120k pkts/s' },
      { label: 'Overhead', value: '<1.2% CPU' },
      { label: 'Inspection', value: 'Layer 2/3/4' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TitanNet-Raw',
    architecture: {
      overview: 'High-speed promiscuous-mode packet sniffer bound directly to Linux raw network sockets. Parses protocol headers sequentially without payload copying and compares incoming ARP frames against an in-memory IP-to-MAC baseline table.',
      subsystems: [
        { name: 'Raw Socket Ingress Engine', role: 'Captures raw frames from NIC using AF_PACKET and SOCK_RAW', tech: 'Linux Kernel Socket API' },
        { name: 'Protocol Header Dissector', role: 'Zero-copy decoding of Ethernet, IPv4, TCP, UDP, and ICMP headers', tech: 'netinet/ip.h C Structs' },
        { name: 'ARP Integrity Sentinel', role: 'Real-time detection of unsolicited ARP replies and gateway poisoning', tech: 'Dynamic ARP Hash Table' }
      ],
      securityAndIntegrity: [
        'Promiscuous mode privilege dropped immediately after socket creation to adhere to least privilege.',
        'Buffer boundary enforcement prevents memory corruption on truncated or malformed IP packets.'
      ],
      keyEngineeringAchievements: [
        'Captured and dissected 120,000 packets per second with zero kernel dropped frames.',
        'Detected simulated Man-in-the-Middle ARP poisoning attacks within 4 milliseconds.'
      ]
    }
  },
  {
    id: 'bytevm',
    number: '05 / 40',
    title: 'ByteVM — Stack-Based Bytecode Virtual Machine & JIT Simulator',
    category: 'C Systems & OS',
    stackKey: 'c-systems',
    domain: 'Virtual Machine Architecture & Compiler Runtimes',
    description: 'Compact stack-based virtual machine executing custom assembly instructions with call-frame stack unwinding, 32 virtual registers, and a mark-and-sweep garbage collection subsystem.',
    devNotes: 'I built ByteVM to demystify how the JVM and Python CPython runtimes actually interpret bytecode. Writing the computed goto dispatch table made opcode evaluation 35% faster than switch-case.',
    tags: ['C99', 'BYTECODE RUNTIME', 'STACK VM', 'COMPUTED GOTO', 'GARBAGE COLLECTION', 'OPCODES'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Dispatch Rate', value: '45M opcodes/s' },
      { label: 'Memory Footprint', value: '<256 KB' },
      { label: 'GC Pause', value: '<0.4 ms' }
    ],
    githubUrl: 'https://github.com/Dev-5678/ByteVM',
    architecture: {
      overview: 'Virtual runtime environment featuring program counter, operand stack, call frames, and 28 instruction opcodes. Employs direct threaded execution with GCC labels-as-values dispatch loop.',
      subsystems: [
        { name: 'Threaded Dispatch Engine', role: 'Direct instruction pointer jump table minimizing CPU branch misprediction', tech: 'GCC Computed Goto' },
        { name: 'Call Frame Stack Manager', role: 'Handles function arguments, local variables, and return address unwinding', tech: 'Dynamic Call Frame Array' },
        { name: 'Mark-and-Sweep GC', role: 'Traverses roots from evaluation stack and collects unreachable heap chunks', tech: 'Two-Phase Garbage Collector' }
      ],
      securityAndIntegrity: [
        'Call stack recursion limits prevent host stack exhaustion from rogue infinite loops.',
        'Bytecode bytecode verification pass prior to execution validates jump offsets.'
      ],
      keyEngineeringAchievements: [
        'Achieved execution throughput exceeding 45 million opcodes per second on standard benchmarks.',
        'Cleanly executed recursive Fibonacci and sorting algorithms written in custom bytecode.'
      ]
    }
  },

  // ==========================================
  // STACK 2: Modern C++20 (Low-Latency & SIMD) [6-10]
  // ==========================================
  {
    id: 'lmax-apex',
    number: '06 / 40',
    title: 'LMAX-Apex — Ultra-Low-Latency Limit Order Matching Engine',
    category: 'C++ Low-Latency',
    stackKey: 'cpp-performance',
    domain: 'High-Frequency Trading & Systems Architecture',
    description: 'In-memory price-time priority order book matching engine. Features lock-free SPSC ring buffers, cache-aligned contiguous memory pools, and zero heap allocations on the hot path for sub-microsecond trade execution.',
    devNotes: 'High-frequency systems live and die by CPU cache lines. By padding price-level structures to 64-byte boundaries with alignas(64), I eliminated false sharing between the order reader and matching threads entirely.',
    tags: ['MODERN C++20', 'ORDER BOOK', 'LOCK-FREE SPSC', 'CACHE-ALIGNED', 'GOOGLE BENCHMARK', 'ATOMIC'],
    appType: 'systems',
    simType: 'hft',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Tick Latency', value: '280 ns' },
      { label: 'Throughput', value: '3.6M orders/s' },
      { label: 'Heap Calls', value: '0 on Hot Path' }
    ],
    githubUrl: 'https://github.com/Dev-5678/LMAX-Apex',
    architecture: {
      overview: 'Lock-free financial matching engine. Inbound orders pass through an atomic SPSC circular buffer into double-ended price ladders. Orders at equal prices are matched FIFO via intrusive doubly linked nodes pre-allocated in continuous buffers.',
      subsystems: [
        { name: 'Lock-Free SPSC Ring Buffer', role: 'Zero-lock order ingress between network reader and matcher thread', tech: 'std::atomic with Acquire-Release' },
        { name: 'Price-Level Order Ladder', role: 'Double-ended min/max price level indexing with intrusive lists', tech: 'Flat Intrusive Node Array' },
        { name: 'Pre-Allocated Memory Arena', role: 'Zero-runtime malloc pool keeping all active orders cache-resident', tech: 'alignas(64) Memory Arenas' }
      ],
      securityAndIntegrity: [
        'Deterministic execution time guarantees immunity to algorithmic complexity attacks.',
        'Lock-free atomics eliminate deadlock possibilities during high order bursts.'
      ],
      keyEngineeringAchievements: [
        'Benchmarked median tick-to-trade execution latency at 280 nanoseconds under continuous load.',
        'Zero cache line false sharing validated using Linux perf hardware counters.'
      ]
    }
  },
  {
    id: 'robinhood-kv',
    number: '07 / 40',
    title: 'RobinHood-KV — SIMD-Accelerated Open-Addressing Hash Table',
    category: 'C++ Low-Latency',
    stackKey: 'cpp-performance',
    domain: 'Low-Latency Data Structures & Hardware Acceleration',
    description: 'High-performance key-value hash table employing Robin Hood open addressing with backward-shift deletion and AVX2 SIMD parallel 16-byte hash probing, dramatically outperforming standard std::unordered_map.',
    devNotes: 'std::unordered_map causes severe pointer-chasing cache misses. Implementing Robin Hood hashing ensures probe sequence lengths are bounded, allowing 16 slot hashes to be evaluated in a single AVX2 vector instruction.',
    tags: ['MODERN C++20', 'ROBIN HOOD HASHING', 'AVX2 SIMD', 'CACHE LOCALITY', 'OPEN ADDRESSING'],
    appType: 'systems',
    simType: 'hft',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'L1 Cache Hit', value: '99.4%' },
      { label: 'Lookup Speed', value: '4.2x std::map' },
      { label: 'Max Probe Length', value: '<5 Slots' }
    ],
    githubUrl: 'https://github.com/Dev-5678/RobinHood-KV',
    architecture: {
      overview: 'Flat array hash table pairing keys, values, and 1-byte hash fingerprints in contiguous memory. Robin Hood insertion displaces "rich" elements to guarantee minimal variance in probe distance, enabling AVX2 SIMD parallel search.',
      subsystems: [
        { name: 'Robin Hood Hash Table Core', role: 'Key-value storage with probe sequence length minimization', tech: 'Contiguous Slot Buffer' },
        { name: 'AVX2 SIMD Fingerprint Vectorizer', role: 'Compares 16 hash fingerprints in parallel via _mm256_cmpeq_epi8', tech: 'x86 AVX2 Intrinsics' },
        { name: 'Backward-Shift Deleter', role: 'Removes keys without tombstone bloat to preserve high load factors', tech: 'O(1) Shift Compaction' }
      ],
      securityAndIntegrity: [
        'FNV-1a / Murmur3 hash seed randomization guards against HashDoS collision attacks.',
        'Strict load factor management triggers automatic resizing before probe lengths exceed 8.'
      ],
      keyEngineeringAchievements: [
        'Maintained 99.4% L1 cache hit rate across 5 million key lookups.',
        'Demonstrated 4.2x faster read throughput than C++ std::unordered_map on random integer keys.'
      ]
    }
  },
  {
    id: 'telemetry-dsp',
    number: '08 / 40',
    title: 'TelemetryDSP — SDR FSK Telemetry Demodulator & Signal Processor',
    category: 'C++ Low-Latency',
    stackKey: 'cpp-performance',
    domain: 'Digital Signal Processing & Aerospace Radio Comms',
    description: 'Software-defined radio baseband processing engine. Demodulates raw 433 MHz Frequency-Shift Keying (FSK) audio streams into binary telemetry packets using IIR Butterworth filtering and the Goertzel tone detection algorithm.',
    devNotes: 'During field testing with India Space Lab, radio signal flutter caused corrupted bytes. I wrote this DSP pipeline in C++20 to process raw audio from the SDR ground station, successfully recovering weak signals that hardware decoders missed.',
    tags: ['MODERN C++20', 'DIGITAL SIGNAL PROCESSING', 'FSK DEMODULATION', 'GOERTZEL ALGORITHM', 'SDR', 'AEROSPACE'],
    appType: 'cansat',
    simType: 'protocol',
    image: '/projects/cansat-space.jpg',
    liveMetrics: [
      { label: 'Sample Rate', value: '96 kHz Live' },
      { label: 'BER at -110dBm', value: '<10^-4' },
      { label: 'Frame Recovery', value: '99.8%' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TelemetryDSP',
    architecture: {
      overview: 'Streaming audio signal processing pipeline. Samples 96 kHz baseband audio from SDR receiver, applies digital bandpass filtering, extracts mark/space frequencies (1200 Hz / 2200 Hz) via Goertzel algorithm, and reconstructs framing.',
      subsystems: [
        { name: 'IIR Butterworth Bandpass Filter', role: 'Attenuates out-of-band radio noise and carrier harmonics', tech: 'Bi-quad Cascaded Filter C++' },
        { name: 'Dual Goertzel Tone Discriminator', role: 'Extracts binary 1/0 states from mark/space frequency energies', tech: 'SIMD Goertzel Equation' },
        { name: 'Bit Synchronizer & Framer', role: 'Recovers clock timing and extracts telemetry frames via UART sync word', tech: 'Early-Late Gate Phase Detector' }
      ],
      securityAndIntegrity: [
        'CRC-16-CCITT frame validation drops noise bursts automatically.',
        'Floating-point denormal protection prevents CPU slowdowns during silent radio periods.'
      ],
      keyEngineeringAchievements: [
        'Recovered CanSat telemetry frames down to -110 dBm signal strength in high-noise RF environments.',
        'Processed real-time 96 kHz audio streams using under 2.5% CPU load on modern hardware.'
      ]
    }
  },
  {
    id: 'raftcore-cpp',
    number: '09 / 40',
    title: 'RaftCore-CPP — Distributed Consensus Engine & Replicated Log',
    category: 'C++ Low-Latency',
    stackKey: 'cpp-performance',
    domain: 'Distributed Systems & Fault-Tolerant Infrastructure',
    description: 'C++20 asynchronous implementation of the Raft consensus protocol. Guarantees linearizable replicated state machine updates across multi-node clusters with randomized election timers and write-ahead log compaction.',
    devNotes: 'Building Raft from the original paper taught me how subtle distributed state bugs can be. Modeling election timers with C++20 coroutines made the asynchronous RPC flow clear and deadlock-free under simulated network splits.',
    tags: ['MODERN C++20', 'RAFT CONSENSUS', 'COROUTINES', 'REPLICATED LOG', 'DISTRIBUTED SYSTEMS'],
    appType: 'universal',
    simType: 'network',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Commit Latency', value: '1.4 ms' },
      { label: 'Split-Brain Safety', value: '100% Proved' },
      { label: 'Throughput', value: '85k ops/s' }
    ],
    githubUrl: 'https://github.com/Dev-5678/RaftCore-CPP',
    architecture: {
      overview: 'Asynchronous consensus coordinator using C++20 coroutines. Handles candidate heartbeats, leader election, append-entries RPCs, and state machine log compaction with disk write-ahead log persistence.',
      subsystems: [
        { name: 'Raft State Machine Coordinator', role: 'Manages Leader/Follower/Candidate role transitions and terms', tech: 'C++20 Coroutine State Machine' },
        { name: 'Append-Entries Log Engine', role: 'Replicates command entries across peer nodes with commit tracking', tech: 'Zero-Copy Log Ring' },
        { name: 'Async Network Transport', role: 'Multiplexes non-blocking RPC connections between cluster nodes', tech: 'epoll / TCP Sockets' }
      ],
      securityAndIntegrity: [
        'Strict election safety rules guarantee that at most one leader can be elected in a given term.',
        'Log matching invariant enforces that committed entries are permanently durable across crashes.'
      ],
      keyEngineeringAchievements: [
        'Successfully passed Jepsen-style simulated network partitions with zero lost or duplicated commits.',
        'Achieved 85,000 committed state updates per second across a 5-node local test cluster.'
      ]
    }
  },
  {
    id: 'voxelray-gl',
    number: '10 / 40',
    title: 'VoxelRay-GL — Multi-Threaded Volumetric Ray Marching Engine',
    category: 'C++ Low-Latency',
    stackKey: 'cpp-performance',
    domain: 'Computer Graphics & Scientific Spatial Simulation',
    description: 'High-performance CPU volumetric ray marcher and Signed Distance Field (SDF) evaluator. Features camera frustum culling, dynamic soft shadows, and SIMD vector math to render complex spatial terrains at 60 FPS.',
    devNotes: 'I created this engine to render 3D atmospheric density layers and CanSat descent corridors without heavy game engine overhead. Tuning bounding volume checks made pure CPU ray marching run smoothly at 60 FPS.',
    tags: ['MODERN C++20', 'RAY MARCHING', 'SIGNED DISTANCE FIELDS', 'SIMD MATH', 'OPENGL', 'MULTI-THREADED'],
    appType: 'universal',
    simType: 'protocol',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Frame Rate', value: '60 FPS (CPU)' },
      { label: 'Ray Invocations', value: '1.2M/frame' },
      { label: 'Thread Scaling', value: '98% Multi-Core' }
    ],
    githubUrl: 'https://github.com/Dev-5678/VoxelRay-GL',
    architecture: {
      overview: 'Volumetric ray marching renderer evaluating analytic distance fields. Tiles screen pixels across a work-stealing worker pool, vectorizing 4 ray paths simultaneously via AVX vector operations.',
      subsystems: [
        { name: 'SDF Geometric Evaluator', role: 'Computes analytical distances to terrain, spheres, and atmospheric planes', tech: 'Vectorized Distance Math' },
        { name: 'Screen-Tile Multi-Threader', role: 'Partitions viewport into 16x16 pixel blocks for parallel rendering', tech: 'Custom Worker Thread Pool' },
        { name: 'Dynamic Shadow & Lighting Solver', role: 'Traces secondary occlusion rays for realistic soft ambient occlusion', tech: 'Gradient Normal Approximation' }
      ],
      securityAndIntegrity: [
        'Maximum ray step limits prevent infinite looping in divergent mathematical edge cases.',
        'Bounds checking ensures pixel buffer memory integrity.'
      ],
      keyEngineeringAchievements: [
        'Rendered complex atmospheric volumetric clouds at full 1080p resolution at 60 FPS purely on the CPU.',
        'Demonstrated near-linear 98% multi-core scaling from 1 to 16 threads.'
      ]
    }
  },

  // ==========================================
  // STACK 3: Python (Core Systems & Networking) [11-15]
  // ==========================================
  {
    id: 'netsentinel',
    number: '11 / 40',
    title: 'NetSentinel — Async Port Scanner, Banner Grabber & Flow Analyzer',
    category: 'Python Systems',
    stackKey: 'python-core',
    domain: 'Network Security Compliance & Infrastructure Auditing',
    description: 'Asynchronous network discovery engine built with Python asyncio. Performs half-open TCP SYN scanning, service banner inspection, and flow rate analysis across enterprise IP blocks with adaptive rate control.',
    devNotes: 'Built to automate network compliance audits at Airports Authority of India (AAI). Instead of running clunky third-party scanners, NetSentinel lets us audit Northern Region internal IP blocks safely without triggering firewall thresholds.',
    tags: ['PYTHON 3', 'ASYNCIO', 'RAW SOCKETS', 'PORT SCANNER', 'BANNER GRABBING', 'NETWORK SECURITY'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Full Scan Speed', value: '65k Ports in 3.2s' },
      { label: 'Concurrency', value: '2,048 Async Sockets' },
      { label: 'Detection Accuracy', value: '99.8%' }
    ],
    githubUrl: 'https://github.com/Dev-5678/NetSentinel',
    architecture: {
      overview: 'Async socket engine utilizing Python asyncio event loops. Spawns non-blocking connection workers governed by token-bucket rate limiters to probe remote ports, extract TLS/SSH/HTTP banners, and export structured JSON reports.',
      subsystems: [
        { name: 'Async SYN/Connect Engine', role: 'Rapid non-blocking port probing with connection timeout management', tech: 'Python asyncio.open_connection' },
        { name: 'Banner & Fingerprint Extractor', role: 'Sends minimal protocol handshakes to extract version identifiers', tech: 'TLS / SSH Protocol Probers' },
        { name: 'Adaptive Rate Limiter', role: 'Dynamic probe backoff to prevent network congestion or IDS bans', tech: 'Token Bucket Token Algorithm' }
      ],
      securityAndIntegrity: [
        'Strict socket descriptor recycling prevents EMFILE OS limit crashes.',
        'Sanitized banner parsing prevents terminal escape injection from malicious honeypot banners.'
      ],
      keyEngineeringAchievements: [
        'Audited 65,535 ports on local server environments in 3.2 seconds with zero packet loss.',
        'Accurately fingerprinted 20+ network services across internal subnet segments.'
      ]
    }
  },
  {
    id: 'btreestore',
    number: '12 / 40',
    title: 'BTreeStore — Disk-Backed B+Tree Database Engine with WAL',
    category: 'Python Systems',
    stackKey: 'python-core',
    domain: 'Database Storage Engines & File Systems',
    description: 'Disk-backed relational storage engine implementing a B+Tree on top of 4096-byte binary pages. Features slotted-page record layout, LRU page buffer caching, and Write-Ahead Logging (WAL) for ACID crash recovery.',
    devNotes: 'Using SQLite is easy; writing the underlying page serialization and WAL recovery yourself is how you truly understand databases. Validating B+Tree node splits on disk by examining raw hex bytes was the highlight of this build.',
    tags: ['PYTHON 3', 'B+ TREE', 'STORAGE ENGINE', 'SLOTTED PAGES', 'WRITE-AHEAD LOG', 'ACID'],
    appType: 'universal',
    simType: 'database',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Point Lookup', value: '<0.3 ms' },
      { label: 'Page Size', value: '4096 Bytes' },
      { label: 'Crash Recovery', value: '100% Guaranteed' }
    ],
    githubUrl: 'https://github.com/Dev-5678/BTreeStore',
    architecture: {
      overview: 'Slotted page storage architecture on disk. The B+Tree index enables O(log N) point search and fast sequential range scans across leaf node pointers, protected by an append-only WAL for crash recovery.',
      subsystems: [
        { name: 'Slotted Page Storage Manager', role: 'Serializes variable-length key-value tuples into 4 KB binary pages', tech: 'Python struct Module' },
        { name: 'B+ Tree Index Engine', role: 'Balances internal routing nodes and leaf data chains with page splits', tech: 'B+ Tree Balanced Index' },
        { name: 'WAL & LRU Buffer Cache', role: 'Caches frequently accessed disk pages and replays uncommitted logs', tech: 'LRU Page Cache / fsync' }
      ],
      securityAndIntegrity: [
        'Atomic writes verified via WAL checksums before page buffer flushing.',
        'Page checksum validation detects silent disk corruption upon load.'
      ],
      keyEngineeringAchievements: [
        'Executed 100,000 insertions with consistent O(log N) depth and zero node corruption.',
        'Successfully recovered all committed records after hard simulated process termination.'
      ]
    }
  },
  {
    id: 'pydisasm-sec',
    number: '13 / 40',
    title: 'PyDisasm-Sec — Bytecode Decompiler & Security Taint Analyzer',
    category: 'Python Systems',
    stackKey: 'python-core',
    domain: 'Static Analysis, Program Security & Runtime Auditing',
    description: 'Static analysis engine for compiled Python bytecode (.pyc). Reconstructs basic-block Control Flow Graphs (CFGs), traces data provenance to detect code injection vulnerabilities, and audits unsafe system calls.',
    devNotes: 'Built to inspect suspicious Python scripts before they run in production. Reading CPython bytecode structures and tracking variable taint from input sources to sinks taught me how real static security analyzers work.',
    tags: ['PYTHON 3', 'BYTECODE DISASSEMBLY', 'CONTROL FLOW GRAPH', 'TAINT ANALYSIS', 'AST', 'OWASP'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Analysis Speed', value: '1,500 LOC/s' },
      { label: 'Taint Detection', value: '98.5% Precision' },
      { label: 'Zero Execution', value: '100% Static' }
    ],
    githubUrl: 'https://github.com/Dev-5678/PyDisasm-Sec',
    architecture: {
      overview: 'Directly parses compiled Python code objects, deconstructing opcode sequences into basic blocks. Builds a directed Control Flow Graph (CFG) and propagates taint flags from input arguments to dangerous sink opcodes like EXEC or EVAL.',
      subsystems: [
        { name: 'Bytecode Decompiler Core', role: 'Decodes raw bytecode into human-readable instructions and operands', tech: 'Python dis & marshal Modules' },
        { name: 'Control Flow Graph Builder', role: 'Partitions opcodes into basic blocks and computes branch edges', tech: 'Directed Graph Algorithms' },
        { name: 'Security Taint Propagator', role: 'Traces untrusted parameters into os.system, eval, and socket sinks', tech: 'Data-Flow Taint Analysis' }
      ],
      securityAndIntegrity: [
        'Completely static execution; untrusted bytecode is inspected without being run, preventing malicious payload activation.',
        'Detects obfuscated string formatting and dynamic attribute lookups.'
      ],
      keyEngineeringAchievements: [
        'Flagged 100% of injected OWASP command injection flaws in benchmark test suites.',
        'Exported interactive DOT and Mermaid graph visualizations of audited control flows.'
      ]
    }
  },
  {
    id: 'distributed-crawler',
    number: '14 / 40',
    title: 'DistributedCrawler — High-Scale Indexer with Bloom Filters',
    category: 'Python Systems',
    stackKey: 'python-core',
    domain: 'Distributed Web Scraping & High-Volume Data Pipelines',
    description: 'High-throughput distributed web crawler engineered with aiohttp and Redis. Employs scalable Bloom filters for memory-efficient O(1) URL deduplication and adaptive token-bucket rate limiters per domain.',
    devNotes: 'Crawling millions of documentation pages quickly exhausts RAM if you store URLs in a standard Python set. Implementing a scalable Bloom filter cut memory consumption by 92% with only a 0.01% false-positive rate.',
    tags: ['PYTHON 3', 'AIOHTTP', 'REDIS', 'BLOOM FILTER', 'DISTRIBUTED CRAWLER', 'ASYNCIO'],
    appType: 'universal',
    simType: 'network',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Crawl Throughput', value: '4,800 pages/min' },
      { label: 'RAM Savings', value: '92% via Bloom' },
      { label: 'Duplicate Rate', value: '<0.01%' }
    ],
    githubUrl: 'https://github.com/Dev-5678/DistributedCrawler',
    architecture: {
      overview: 'Async crawler coordinate system. Distributed workers pull unvisited links from Redis priority queues, check visited status against a Redis-backed scalable Bloom filter, and stream parsed markdown documents to disk.',
      subsystems: [
        { name: 'Async Ingestion Workers', role: 'Fetch HTTP/HTTPS web pages with automatic redirection handling', tech: 'aiohttp ClientSession' },
        { name: 'Bloom Filter Deduplicator', role: 'Provides O(1) visited checks across millions of URLs with low RAM', tech: 'Redis Scalable Bloom Filter' },
        { name: 'Domain Rate Governor', role: 'Respects robots.txt directives and prevents target server throttling', tech: 'Token Bucket Rate Limiter' }
      ],
      securityAndIntegrity: [
        'Strict Content-Type verification filters out large binary files (ISOs, videos) prior to download.',
        'Host IP resolution pinning prevents internal SSRF attacks against private network ranges.'
      ],
      keyEngineeringAchievements: [
        'Successfully crawled and indexed 250,000 documentation pages in under an hour.',
        'Consumed less than 45 MB of memory for deduplicating over 1,000,000 encountered links.'
      ]
    }
  },
  {
    id: 'aeropath-grid',
    number: '15 / 40',
    title: 'AeroPath-Grid — Hierarchical Drone Pathfinding & Spatial Planner',
    category: 'Python Systems',
    stackKey: 'python-core',
    domain: 'Autonomous Navigation, Spatial Geometry & Graph Theory',
    description: 'Hierarchical pathfinding and collision-avoidance trajectory engine for autonomous drones. Implements Hierarchical Pathfinding (HPA*), Jump Point Search (JPS), and Dubins path smoothing for real-world turning constraints.',
    devNotes: 'Derived from drone navigation research at India Space Lab. Standard A* pathfinders calculate jagged 90-degree turns that physical quadcopters cannot fly. Adding Dubins curve smoothing gave smooth, physically flyable waypoints.',
    tags: ['PYTHON 3', 'HPA* PATHFINDING', 'JUMP POINT SEARCH', 'DUBINS CURVES', 'DRONE NAVIGATION', 'NUMPY'],
    appType: 'cansat',
    simType: 'protocol',
    image: '/projects/cansat-space.jpg',
    liveMetrics: [
      { label: 'Route Gen Time', value: '<1.2 ms' },
      { label: 'Speedup over A*', value: '11.8x' },
      { label: 'Turn Continuity', value: 'G1 Smooth' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AeroPath-Grid',
    architecture: {
      overview: 'Spatial path planning architecture. Partitions a 3D terrain grid into interconnected abstract clusters, computes macroscopic routes across cluster portals, and refines waypoints using Dubins curve smoothing.',
      subsystems: [
        { name: 'Abstract Cluster Portal Mesh', role: 'Pre-computes clearance and edge weights between terrain clusters', tech: 'Hierarchical HPA* Grid' },
        { name: 'Jump Point Search Solver', role: 'Prunes redundant symmetrical grid neighbors for rapid waypoint discovery', tech: 'JPS Algorithm' },
        { name: 'Dubins Continuous Smoother', role: 'Converts discrete grid waypoints into flyable arc-line-arc trajectories', tech: 'Kinematic Turn Physics' }
      ],
      securityAndIntegrity: [
        'Geofencing constraints strictly forbid routes crossing restricted civil aviation airspace.',
        'Altitude clearance safety buffers prevent ground-collision trajectories.'
      ],
      keyEngineeringAchievements: [
        'Generated optimal 3D routes across a 1000x1000 navigation grid in under 1.2 milliseconds.',
        'Delivered 11.8x speedup over standard A* pathfinding on large flight map benchmarks.'
      ]
    }
  },

  // ==========================================
  // STACK 4: Python Full-Stack & AI [16-20]
  // ==========================================
  {
    id: 'aerorag-enterprise',
    number: '16 / 40',
    title: 'AeroRAG-Enterprise — Multimodal Aerospace RAG Knowledge Engine',
    category: 'Python Full-Stack & AI',
    stackKey: 'python-fullstack',
    domain: 'Enterprise Cloud AI, Vector Systems & Multimodal Search',
    description: 'Enterprise retrieval-augmented generation engine for technical aerospace manuals. Converts aircraft schematics and engineering manuals into dense vector embeddings, retrieves context via cosine similarity, and synthesizes answers via Gemini 1.5 Pro.',
    devNotes: 'Direct outcome of the Google Cloud Gen AI Academy program. In aviation maintenance, hallucinations can be disastrous. I built a hybrid reranker pairing dense vectors with BM25 keyword matching to guarantee zero hallucinations on part numbers.',
    tags: ['PYTHON', 'FASTAPI', 'GEMINI 1.5 PRO', 'CHROMA DB', 'HYBRID SEARCH', 'REACT', 'TAILWIND CSS'],
    appType: 'rag',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Retrieval Latency', value: '<160 ms' },
      { label: 'Vector Store', value: '768-Dim Dense' },
      { label: 'Hallucination Rate', value: 'Zero (Grounded)' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AeroRAG-Enterprise',
    architecture: {
      overview: 'End-to-end multimodal knowledge retrieval architecture. Ingests PDFs, diagrams, and flight logs, extracts dense embeddings with Gemini Embedding API, and performs hybrid similarity ranking in ChromaDB to power grounded technical Q&A.',
      subsystems: [
        { name: 'Multimodal Chunking Pipeline', role: 'Parses text, schematics, and tabular data with contextual headers', tech: 'FastAPI / Pydantic' },
        { name: 'Hybrid Vector & BM25 Store', role: 'Indexes 768-dimensional embeddings with reciprocal rank fusion', tech: 'ChromaDB / BM25' },
        { name: 'Gemini 1.5 Synthesis Engine', role: 'Generates citation-grounded technical answers with confidence scores', tech: 'Google AI SDK' }
      ],
      securityAndIntegrity: [
        'Strict context grounding forces the LLM to output "NOT FOUND" if grounding context lacks the answer.',
        'Sanitized API key handling and rate-limiting prevents external quota exhaustion.'
      ],
      keyEngineeringAchievements: [
        'Maintained sub-180 ms end-to-end query and synthesis latency across 10,000 indexed pages.',
        'Achieved 100% citation accuracy on critical aviation maintenance compliance audits.'
      ]
    }
  },
  {
    id: 'cansat-groundcontrol',
    number: '17 / 40',
    title: 'CanSat-GroundControl — Live Satellite Telemetry & Mission Control',
    category: 'Python Full-Stack & AI',
    stackKey: 'python-fullstack',
    domain: 'Aerospace Ground Stations & Real-Time Visualization',
    description: 'Full-stack mission control dashboard. Ingests live 433 MHz UHF radio telemetry packets over serial ports, broadcasts real-time states over WebSockets, renders live 3D satellite attitude, and triggers descent alerts.',
    devNotes: 'Built for India Space Lab field launches. Watching the 3D model of our CanSat rotate in real time on screen as it tumbled out of the drone at 300 meters, driven by our own serial telemetry parser, was unforgettable.',
    tags: ['FASTAPI', 'WEBSOCKETS', 'THREE.JS', 'CHART.JS', 'SERIAL COMM', '433 MHZ UHF', 'AEROSPACE'],
    appType: 'cansat',
    simType: 'protocol',
    image: '/projects/cansat-space.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Websocket Latency', value: '<12 ms' },
      { label: 'Render Refresh', value: '60 FPS' },
      { label: 'RF Baud Rate', value: '9600 Baud' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CanSat-GroundControl',
    architecture: {
      overview: 'Real-time telemetry acquisition and visualization suite. Reads binary serial streams from ground station receiver, parses packets with CRC integrity validation, broadcasts JSON state over WebSockets, and animates 3D telemetry in Three.js.',
      subsystems: [
        { name: 'Serial Ingress & Packet Decoder', role: 'Reads raw serial UART bytes and validates CRC-16 frames', tech: 'pySerial / Async IO' },
        { name: 'WebSocket Telemetry Broadcaster', role: 'Dispatches 20 Hz state frames to connected ground controllers', tech: 'FastAPI WebSockets' },
        { name: '3D Horizon & Chart Canvas', role: 'Renders 3D gyro attitude pitch/roll and barometric altitude profile', tech: 'Three.js / Canvas API' }
      ],
      securityAndIntegrity: [
        'Descent threshold alert triggers automatically when descent velocity exceeds 12 m/s.',
        'Automatic local CSV flight recorder ensures zero telemetry loss during network disconnects.'
      ],
      keyEngineeringAchievements: [
        'Delivered rock-solid 60 FPS real-time telemetry streaming during live field drop tests.',
        'Successfully tracked and visualized complete descent trajectory from 300m AGL to ground.'
      ]
    }
  },
  {
    id: 'taskqueue-apex',
    number: '18 / 40',
    title: 'TaskQueue-Apex — Distributed Task Queue & Worker Runtime',
    category: 'Python Full-Stack & AI',
    stackKey: 'python-fullstack',
    domain: 'Distributed Backend Architecture & Queue Systems',
    description: 'Asynchronous task queue and worker coordination platform built with FastAPI and Redis Streams. Implements worker heartbeat tracking, consumer groups, dead-letter queues (DLQ), and a live monitoring web console.',
    devNotes: 'I wrote TaskQueue-Apex because Celery can feel like a heavy black box with cryptic failure modes. Building the Redis consumer group ACK/NACK logic myself showed me how to make distributed jobs truly resilient.',
    tags: ['PYTHON 3', 'FASTAPI', 'REDIS STREAMS', 'CONSUMER GROUPS', 'DEAD-LETTER QUEUE', 'DOCKER'],
    appType: 'universal',
    simType: 'microservices',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Throughput', value: '10k tasks/s' },
      { label: 'Dispatch Latency', value: '<1.1 ms' },
      { label: 'Crash Recovery', value: 'Automatic ACK/NACK' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TaskQueue-Apex',
    architecture: {
      overview: 'Distributed task execution engine. FastAPI acts as the producer pushing jobs into Redis Streams. Worker nodes join consumer groups, claim pending tasks with atomic Lua scripts, and stream execution progress to a live web dashboard.',
      subsystems: [
        { name: 'Task Producer Gateway', role: 'REST API validating payloads and assigning task UUIDs', tech: 'FastAPI / Pydantic' },
        { name: 'Redis Stream Consumer Pool', role: 'Independent worker processes claiming and executing job functions', tech: 'Redis Streams / XACK' },
        { name: 'Supervisor & DLQ Monitor', role: 'Reclaims abandoned tasks from dead workers and moves failures to DLQ', tech: 'Atomic Lua Scripts' }
      ],
      securityAndIntegrity: [
        'Idempotency tokens prevent duplicated executions on network retries.',
        'Sandboxed task timeouts kill hung worker processes automatically.'
      ],
      keyEngineeringAchievements: [
        'Sustained 10,000 tasks per second across 8 concurrent worker containers.',
        'Maintained 100% job recovery under intentional worker process SIGKILL tests.'
      ]
    }
  },
  {
    id: 'agentmesh',
    number: '19 / 40',
    title: 'AgentMesh — Multi-Agent Code Review & CVE Security Audit Platform',
    category: 'Python Full-Stack & AI',
    stackKey: 'python-fullstack',
    domain: 'Agentic AI Systems, DevSecOps & LLM Orchestration',
    description: 'Autonomous multi-agent code analysis platform. Spawns specialized agents (Syntax Auditor, OWASP Security Auditor, Big-O Performance Profiler) orchestrated via a DAG runtime to generate automated pull-request review reports.',
    devNotes: 'Instead of one generic LLM prompt that misses edge cases, AgentMesh breaks code reviews into a DAG of focused expert agents. The Security Agent specifically checks for AAI-style compliance and OWASP Top 10 vulnerabilities.',
    tags: ['PYTHON', 'FASTAPI', 'GEMINI 1.5 PRO', 'AGENTIC WORKFLOWS', 'DAG SCHEDULER', 'GITHUB WEBHOOKS'],
    appType: 'universal',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    liveMetrics: [
      { label: 'Audit Speed', value: '45s per PR' },
      { label: 'Vulnerability Catch', value: '94% OWASP Top 10' },
      { label: 'Parallel Waves', value: 'DAG Topological' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AgentMesh',
    architecture: {
      overview: 'Multi-agent orchestration pipeline. Listens to GitHub PR webhooks, decomposes review tasks into an acyclic dependency graph, schedules parallel agent executions via Kahn’s algorithm, and streams live markdown comments via Server-Sent Events.',
      subsystems: [
        { name: 'GitHub Webhook Ingestor', role: 'Captures PR diffs and extracts modified file ASTs', tech: 'FastAPI / PyGitHub' },
        { name: 'Topological DAG Runtime', role: 'Schedules independent agent audit waves in parallel', tech: 'Asyncio Task Group' },
        { name: 'Specialized LLM Evaluators', role: 'Syntax, Security, and Algorithmic performance analysis agents', tech: 'Gemini 1.5 Pro Prompt Chains' }
      ],
      securityAndIntegrity: [
        'Read-only sandboxing guarantees agents cannot execute untrusted code.',
        'Strict output JSON schema validation prevents malformed automated comments.'
      ],
      keyEngineeringAchievements: [
        'Automated comprehensive security reviews across 50+ pull requests with zero false CVE reports.',
        'Reduced code review turnaround from hours to under 45 seconds.'
      ]
    }
  },
  {
    id: 'spectravision',
    number: '20 / 40',
    title: 'SpectraVision — Real-Time Acoustic Telemetry & Anomaly Detector',
    category: 'Python Full-Stack & AI',
    stackKey: 'python-fullstack',
    domain: 'Audio Signal Processing, Deep Learning & Predictive Maintenance',
    description: 'Real-time acoustic analysis system for predictive equipment maintenance. Ingests live microphone streams over WebRTC, calculates Short-Time Fourier Transform (STFT) spectrograms, and detects bearing anomalies via an ONNX neural net.',
    devNotes: 'Inspired by airport HVAC and aerospace equipment maintenance. Motors make ultrasonic whining noises hours before mechanical failure. SpectraVision visualizes the live spectrogram in the browser while running neural inference in real time.',
    tags: ['PYTHON', 'FASTAPI', 'LIBROSA', 'ONNX RUNTIME', 'WEBRTC', 'CANVAS SPECTROGRAM', 'SIGNAL PROCESSING'],
    appType: 'universal',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    liveMetrics: [
      { label: 'Inference Latency', value: '<28 ms' },
      { label: 'STFT Window', value: '1024 Samples' },
      { label: 'F1 Anomaly Score', value: '0.96' }
    ],
    githubUrl: 'https://github.com/Dev-5678/SpectraVision',
    architecture: {
      overview: 'Acoustic predictive maintenance platform. Browser streams audio chunks via WebRTC/WebSocket to a FastAPI backend. Python computes STFT spectrograms, evaluates an ONNX neural classifier, and pushes anomaly probability overlays to the UI.',
      subsystems: [
        { name: 'WebRTC Audio Stream Receiver', role: 'Buffers raw PCM audio chunks without packet loss', tech: 'FastAPI / aiortc' },
        { name: 'STFT Spectrogram Engine', role: 'Transforms time-domain audio into frequency power matrices', tech: 'NumPy / Librosa' },
        { name: 'ONNX Classifier Runtime', role: 'Real-time anomaly scoring for motor bearing chatter', tech: 'ONNX Runtime CPU/GPU' }
      ],
      securityAndIntegrity: [
        'Audio buffer clamping prevents acoustic clipping and arithmetic overflow.',
        'Sliding-window averaging prevents transient background noises from triggering false alarms.'
      ],
      keyEngineeringAchievements: [
        'Achieved sub-30 ms end-to-end inference latency on streaming 44.1 kHz audio feeds.',
        'Detected mechanical bearing friction anomalies with a 0.96 F1 classification score.'
      ]
    }
  },

  // ==========================================
  // STACK 5: Java (Core Concurrency & JVM) [21-25]
  // ==========================================
  {
    id: 'disruptor-java',
    number: '21 / 40',
    title: 'Disruptor-Java — High-Throughput Lock-Free Concurrent Ring Buffer',
    category: 'Java Systems & JVM',
    stackKey: 'java-core',
    domain: 'Java Concurrency & High-Performance Computing',
    description: 'High-throughput lock-free inter-thread messaging architecture. Implements LMAX Disruptor design principles in pure Java 21 using circular ring buffers, atomic sequence barriers (VarHandle), and cache-line padding to prevent false sharing.',
    devNotes: 'Java’s standard ArrayBlockingQueue suffers from severe lock contention when multiple threads compete for the head and tail. Building this lock-free ring buffer taught me how CPU cache line false sharing slows down multi-threaded Java applications.',
    tags: ['JAVA 21', 'LOCK-FREE CONCURRENCY', 'VARHANDLE', 'CACHE-LINE PADDING', 'JMH BENCHMARK', 'RING BUFFER'],
    appType: 'systems',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Throughput', value: '18M msgs/s' },
      { label: 'Latency (P99)', value: '<65 ns' },
      { label: 'GC Allocations', value: '0 on Hot Path' }
    ],
    githubUrl: 'https://github.com/Dev-5678/Disruptor-Java',
    architecture: {
      overview: 'Lock-free event processing engine. Producers write to pre-allocated event objects in a power-of-two circular buffer using atomic compare-and-swap sequence claims. Consumers read sequentially through memory barriers without locking.',
      subsystems: [
        { name: 'Sequenced Ring Buffer', role: 'Pre-allocated contiguous array indexed via bitwise AND masking', tech: 'Atomic Long Sequence' },
        { name: 'VarHandle Memory Barrier', role: 'Acquire/Release semantics ensuring visibility across CPU cores', tech: 'java.lang.invoke.VarHandle' },
        { name: 'Contended Cache-Line Padder', role: 'Pads atomic cursors with dummy longs to prevent CPU false sharing', tech: '64-Byte Cache Alignment' }
      ],
      securityAndIntegrity: [
        'Zero garbage collection allocations during continuous operation prevents stop-the-world JVM pauses.',
        'Memory barrier correctness verified across multi-core benchmarks.'
      ],
      keyEngineeringAchievements: [
        'Sustained 18 million messages per second throughput on JMH microbenchmarks.',
        'Achieved sub-70 nanosecond 99th percentile latency under heavy multi-producer contention.'
      ]
    }
  },
  {
    id: 'nettyrpc',
    number: '22 / 40',
    title: 'NettyRPC — Asynchronous Non-Blocking RPC Framework',
    category: 'Java Systems & JVM',
    stackKey: 'java-core',
    domain: 'Asynchronous Network Systems & Inter-Service Comms',
    description: 'Custom high-performance Remote Procedure Call (RPC) framework built directly on Netty NIO. Features Google Protobuf binary serialization, dynamic reflection client proxies, connection multiplexing, and client-side load balancing.',
    devNotes: 'Standard Spring Boot REST APIs are too heavy and slow for microsecond inter-service communication. Building this RPC framework directly on Netty gave me deep hands-on mastery over event loops, byte buffers, and network protocols.',
    tags: ['JAVA 21', 'NETTY', 'NON-BLOCKING I/O', 'PROTOBUF', 'DYNAMIC PROXIES', 'RPC FRAMEWORK'],
    appType: 'universal',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'RPC Latency', value: '0.45 ms' },
      { label: 'Throughput', value: '65k req/s' },
      { label: 'Payload Size', value: '4.8x smaller than JSON' }
    ],
    githubUrl: 'https://github.com/Dev-5678/NettyRPC',
    architecture: {
      overview: 'Asynchronous RPC architecture. Java interfaces are backed by dynamic reflection proxies that serialize invocations into Protobuf frames, dispatch them over Netty channel pipelines, and resolve CompletableFuture responses.',
      subsystems: [
        { name: 'Netty NIO Pipeline', role: 'Non-blocking TCP socket multiplexing with length-field framing', tech: 'Netty EventLoopGroup' },
        { name: 'Protobuf Serializer', role: 'Compact binary message serialization minimizing network bandwidth', tech: 'Google Protobuf' },
        { name: 'Dynamic Client Proxy', role: 'Transparent interface proxies converting method calls into async futures', tech: 'java.lang.reflect.Proxy' }
      ],
      securityAndIntegrity: [
        'Heartbeat ping/pong frames detect broken connections within 3 seconds.',
        'Connection pooling with automatic reconnection handles sudden node restarts gracefully.'
      ],
      keyEngineeringAchievements: [
        'Delivered 5x lower latency compared to Spring Boot REST endpoints under identical loads.',
        'Handled 65,000 remote procedure requests per second with linear client-side scaling.'
      ]
    }
  },
  {
    id: 'titancache-jvm',
    number: '23 / 40',
    title: 'TitanCache-JVM — In-Memory Cache with W-TinyLFU Eviction',
    category: 'Java Systems & JVM',
    stackKey: 'java-core',
    domain: 'High-Performance Caching & Data Structures',
    description: 'In-memory caching engine implementing Window-TinyLFU eviction algorithms. Employs a 4-bit Count-Min Sketch for frequency estimation, concurrent hash striping, and asynchronous write-behind persistence.',
    devNotes: 'Standard LRU caches perform poorly when sudden one-hit-wonder queries evict frequently requested items. Implementing Window-TinyLFU (the algorithm powering Caffeine Cache) gave me a 98.7% hit ratio on Zipfian distribution tests.',
    tags: ['JAVA 21', 'W-TINYLFU', 'COUNT-MIN SKETCH', 'CONCURRENT CACHE', 'JMH', 'MEMORY ARCHITECTURE'],
    appType: 'universal',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Hit Ratio', value: '98.7% (Zipfian)' },
      { label: 'Read Latency', value: '<35 ns' },
      { label: 'Concurrency', value: 'Lock-Free Striping' }
    ],
    githubUrl: 'https://github.com/Dev-5678/TitanCache-JVM',
    architecture: {
      overview: 'Two-tier cache architecture. New entries enter a small window cache using LRU; when evicted from the window, they contend against the main cache based on Count-Min Sketch historical frequency comparisons.',
      subsystems: [
        { name: 'Window & Main LRU Rings', role: 'Tracks temporal recency of cached key-value entries', tech: 'Doubly-Linked Node Arrays' },
        { name: 'Count-Min Sketch Estimator', role: '4-bit frequency sketch tracking historical access popularity', tech: 'Bitwise Hash Functions' },
        { name: 'Striped Hash Index', role: 'Partitioned hash buckets minimizing write lock contention', tech: 'ConcurrentHashMap Striping' }
      ],
      securityAndIntegrity: [
        'Periodic 4-bit counter halving prevents historical frequency starvation on stale keys.',
        'Thread-safe memory visibility guaranteed through volatile node state pointers.'
      ],
      keyEngineeringAchievements: [
        'Achieved a 98.7% cache hit ratio under Zipfian distribution access workloads.',
        'Outperformed standard Guava cache implementations by 2.4x on concurrent read benchmarks.'
      ]
    }
  },
  {
    id: 'j-classcheck',
    number: '24 / 40',
    title: 'J-ClassCheck — JVM Classfile Bytecode Parser & Security Verifier',
    category: 'Java Systems & JVM',
    stackKey: 'java-core',
    domain: 'JVM Internals, Security Verification & Classloaders',
    description: 'Standalone binary parser for Java .class files. Inspects constant pools, method bytecodes, stack map frames, and detects dangerous Unsafe operations and unauthorized JNI native calls prior to classloader loading.',
    devNotes: 'I wrote this parser to understand how the JVM actually verifies bytecode before execution. Parsing the 0xCAFEBABE binary format byte-by-byte gave me complete clarity on how JVM classes and security perimeters work.',
    tags: ['JAVA 21', 'JVM INTERNALS', 'BYTECODE PARSER', 'CONSTANT POOL', 'CLASSLOADER', 'SECURITY AUDIT'],
    appType: 'universal',
    simType: 'kernel',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Parse Time', value: '<2 ms per .class' },
      { label: 'Dependencies', value: '0 (Pure Java)' },
      { label: 'Audit Coverage', value: '100% JVM Specs' }
    ],
    githubUrl: 'https://github.com/Dev-5678/J-ClassCheck',
    architecture: {
      overview: 'Binary classfile inspector. Reads compiled Java .class binaries according to JVM specification: parses magic number, major/minor version, constant pool table, access flags, interfaces, fields, methods, and Code attributes.',
      subsystems: [
        { name: 'Binary Class Reader', role: 'Decodes JVM classfile structures from raw byte streams', tech: 'DataInputStream / ByteBuffer' },
        { name: 'Constant Pool Resolver', role: 'Reconstructs UTF8 strings, Methodrefs, and Class entries', tech: 'Constant Pool Hash Table' },
        { name: 'Security Opcode Verifier', role: 'Scans bytecode instructions for unauthorized sun.misc.Unsafe access', tech: 'Bytecode Instruction Scanner' }
      ],
      securityAndIntegrity: [
        'Stack map frame verification guarantees operand stack height consistency before execution.',
        'Flags unauthorized reflection and native invocation attempts.'
      ],
      keyEngineeringAchievements: [
        'Successfully parsed and verified over 2,500 core JDK classes with zero crashes.',
        'Detected 100% of injected bytecode tampering exploits in security test suites.'
      ]
    }
  },
  {
    id: 'workerpool-stealing',
    number: '25 / 40',
    title: 'WorkerPool-Stealing — Work-Stealing Task Scheduler',
    category: 'Java Systems & JVM',
    stackKey: 'java-core',
    domain: 'Parallel Computing & Thread Pool Architecture',
    description: 'Custom work-stealing thread pool executor. Implements the Chase-Lev deque algorithm to balance uneven computational workloads across CPU cores via lock-free atomic CAS task stealing.',
    devNotes: 'Standard Java ThreadPoolExecutors choke when recursive tasks generate unbalanced workloads. Implementing Chase-Lev deques allowed idle threads to steal tasks from the tails of busy workers with zero lock contention.',
    tags: ['JAVA 21', 'WORK-STEALING', 'CHASE-LEV DEQUE', 'THREAD POOL', 'ATOMIC CAS', 'CONCURRENCY'],
    appType: 'universal',
    simType: 'concurrency',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Throughput Boost', value: '38% over ThreadPool' },
      { label: 'Steal Contention', value: '<0.2%' },
      { label: 'CPU Utilization', value: '99% All Cores' }
    ],
    githubUrl: 'https://github.com/Dev-5678/WorkerPool-Stealing',
    architecture: {
      overview: 'Multi-threaded work-stealing scheduler. Each worker thread owns an unbounded double-ended queue. Workers push and pop tasks from their own queue head; when idle, they steal tasks from other workers’ tails via atomic compare-and-swap.',
      subsystems: [
        { name: 'Chase-Lev Work Deque', role: 'Lock-free per-thread queue supporting LIFO push/pop and FIFO steal', tech: 'AtomicReferenceArray' },
        { name: 'Worker Thread Supervisor', role: 'Manages worker thread lifecycle and park/unpark backoff', tech: 'LockSupport.parkNanos' },
        { name: 'Task Future Coordinator', role: 'Asynchronous task result coordination and exception propagation', tech: 'Custom CompletableTask' }
      ],
      securityAndIntegrity: [
        'Atomic CAS operations eliminate race conditions during concurrent worker steals.',
        'Exponential backoff prevents CPU spinning when no stealable tasks exist.'
      ],
      keyEngineeringAchievements: [
        'Reduced recursive parallel sorting execution time by 38% compared to standard ThreadPoolExecutor.',
        'Kept all CPU cores at 99% balanced load without starvation.'
      ]
    }
  },

  // ==========================================
  // STACK 6: Java Full-Stack & Spring Boot 3 [26-30]
  // ==========================================
  {
    id: 'skyshield-ops',
    number: '26 / 40',
    title: 'SkyShield-Ops — Flight Radar & Airspace Incident Management',
    category: 'Java Enterprise',
    stackKey: 'java-enterprise',
    domain: 'Civil Aviation Infrastructure & Enterprise Incident Response',
    description: 'Civil aviation incident tracking and radar telemetry platform modeled on Airports Authority of India (AAI) operations. Features Spring Boot 3, Spring Security JWT, PostGIS spatial queries, and tamper-evident SHA-256 audit chaining.',
    devNotes: 'Directly reflects my real internship at AAI Northern Region HQ. Aviation incident logs cannot be mutable. I engineered an immutable SHA-256 block-chained audit trail so that no air navigation or maintenance records could ever be tampered with.',
    tags: ['SPRING BOOT 3', 'SPRING SECURITY', 'POSTGRESQL / POSTGIS', 'SHA-256 AUDIT CHAIN', 'JWT RBAC', 'REACT'],
    appType: 'aai',
    simType: 'microservices',
    image: '/projects/aai-security.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Query Latency', value: '<32 ms' },
      { label: 'Audit Security', value: 'SHA-256 Tamper-Proof' },
      { label: 'Compliance', value: '100% ITIL Standards' }
    ],
    githubUrl: 'https://github.com/Dev-5678/SkyShield-Ops',
    architecture: {
      overview: 'Enterprise flight operations and incident reporting platform. Implements role-based access control (Airside vs Landside controllers), spatial flight corridor queries via PostGIS, and cryptographic hash-chaining on all audit logs.',
      subsystems: [
        { name: 'Core Spring Boot Service', role: 'REST controllers, SLA validation, and incident state machines', tech: 'Spring Boot 3 / Java 21' },
        { name: 'Spatial PostGIS Database', role: 'Indexes flight navigation corridors and airport perimeter assets', tech: 'PostgreSQL / PostGIS' },
        { name: 'Tamper-Evident Audit Chain', role: 'Chains incident record hashes sequentially to guarantee immutability', tech: 'SHA-256 Cryptographic Hash' }
      ],
      securityAndIntegrity: [
        'Strict role-based access control preventing administrative users from altering air navigation telemetry.',
        'Cryptographic hash verification detects retroactive database row manipulation automatically.'
      ],
      keyEngineeringAchievements: [
        'Engineered an auditable ITIL compliance incident lifecycle workflow matching real AAI operational standards.',
        'Executed sub-35 ms spatial boundary lookups across 50,000 geofenced airspace zones.'
      ]
    }
  },
  {
    id: 'cloudmart-saga',
    number: '27 / 40',
    title: 'CloudMart-Saga — Distributed Microservices Platform with Saga Pattern',
    category: 'Java Enterprise',
    stackKey: 'java-enterprise',
    domain: 'Cloud Microservices, Event-Driven Architecture & Kafka',
    description: 'Distributed microservices architecture utilizing the choreography-based Saga pattern across Order, Payment, and Inventory services. Employs Apache Kafka event streaming and automated compensating transactions.',
    devNotes: 'Anyone can build a basic Spring Boot CRUD app. The real engineering challenge is maintaining data consistency when one microservice fails midway through a transaction. Implementing Kafka-driven compensating rollbacks solved that.',
    tags: ['SPRING BOOT 3', 'SPRING CLOUD', 'APACHE KAFKA', 'SAGA PATTERN', 'DOCKER COMPOSE', 'REDIS'],
    appType: 'universal',
    simType: 'microservices',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Event Throughput', value: '25k events/s' },
      { label: 'Consistency', value: '100% Eventual' },
      { label: 'Rollback Safety', value: 'Zero Phantom Deductions' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CloudMart-Saga',
    architecture: {
      overview: 'Distributed event-driven microservices architecture. Spring Cloud Gateway routes incoming requests. Microservices communicate asynchronously via Kafka topics, with automated compensating transactions to rollback failures gracefully.',
      subsystems: [
        { name: 'Spring Cloud API Gateway', role: 'Authentication, token propagation, and dynamic service routing', tech: 'Spring Cloud Gateway' },
        { name: 'Kafka Event Bus Broker', role: 'Decoupled event topics for OrderCreated, PaymentFailed, and Restock', tech: 'Apache Kafka' },
        { name: 'Saga Compensating Controller', role: 'Executes inverse transactions to maintain consistency upon failure', tech: 'Kafka Consumer Groups' }
      ],
      securityAndIntegrity: [
        'Idempotent message consumers prevent duplicate processing of re-delivered Kafka events.',
        'Distributed tracing with OpenTelemetry guarantees end-to-end transaction visibility.'
      ],
      keyEngineeringAchievements: [
        'Maintained 100% transactional consistency across simulated random network partitions.',
        'Sustained 25,000 asynchronous events per second with sub-10 ms event delivery.'
      ]
    }
  },
  {
    id: 'hyperstream-ledger',
    number: '28 / 40',
    title: 'HyperStream-Ledger — High-Throughput Event-Driven Banking Ledger API',
    category: 'Java Enterprise',
    stackKey: 'java-enterprise',
    domain: 'FinTech Systems, Concurrency Control & Double-Entry Accounting',
    description: 'Financial ledger API enforcing immutable double-entry bookkeeping. Employs Kafka partition-keyed transactions, Redis distributed locks (Redisson), and optimistic database locking to prevent overdraft race conditions.',
    devNotes: 'In financial ledgers, race conditions mean lost money. By combining Redis distributed locks with database version columns, I guaranteed that concurrent debit requests never overdraw an account, even under 5,000 concurrent requests/sec.',
    tags: ['SPRING BOOT 3', 'APACHE KAFKA', 'REDIS REDISSON', 'DOUBLE-ENTRY', 'POSTGRESQL', 'JUNIT 5'],
    appType: 'universal',
    simType: 'microservices',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Transfer TPS', value: '5,200 tx/s' },
      { label: 'Double Spend', value: 'Zero (Atomic)' },
      { label: 'Idempotency', value: '100% Guaranteed' }
    ],
    githubUrl: 'https://github.com/Dev-5678/HyperStream-Ledger',
    architecture: {
      overview: 'Financial transaction engine. Incoming transfers pass through idempotency filters into Kafka. Redisson distributed locks serialize account debits/credits, ensuring double-entry balance equality before updating PostgreSQL.',
      subsystems: [
        { name: 'Idempotent Transfer Gateway', role: 'Filters duplicate transfer requests using unique transaction hashes', tech: 'Spring Boot Filter' },
        { name: 'Redisson Distributed Lock', role: 'Serializes concurrent account updates across clustered nodes', tech: 'Redis Redisson Locks' },
        { name: 'Double-Entry Accounting Core', role: 'Enforces debits equal credits invariant on every balance change', tech: 'Spring Data JPA / PostgreSQL' }
      ],
      securityAndIntegrity: [
        'Optimistic locking (@Version) catches concurrent database row collisions instantly.',
        'Ledger balance invariant (Sum(Debits) == Sum(Credits)) verified by database triggers.'
      ],
      keyEngineeringAchievements: [
        'Handled 5,200 atomic transactions per second without a single balance mismatch.',
        'Zero overdraft errors detected under automated JMeter stress tests.'
      ]
    }
  },
  {
    id: 'nexus-auth',
    number: '29 / 40',
    title: 'Nexus-Auth — Zero-Trust Identity Gateway with OAuth2 & TOTP',
    category: 'Java Enterprise',
    stackKey: 'java-enterprise',
    domain: 'Enterprise Identity Management & Zero-Trust Security',
    description: 'Centralized OAuth2 / OpenID Connect (OIDC) identity server built with Spring Authorization Server. Features RS256 asymmetric token signing, Redis-backed instant token blacklisting, and TOTP 2FA authentication.',
    devNotes: 'At AAI, least-privilege access and identity verification are non-negotiable. Building a full OAuth2 server from scratch with asymmetric RS256 keys and instant token revocation gave me deep insight into enterprise authentication.',
    tags: ['SPRING BOOT 3', 'SPRING AUTHORIZATION SERVER', 'OAUTH2 / OIDC', 'REDIS', 'TOTP 2FA', 'RS256'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Token Verify', value: '<3.8 ms' },
      { label: 'Revocation Speed', value: 'Instant (<1ms)' },
      { label: 'Security Level', value: 'Zero-Trust OIDC' }
    ],
    githubUrl: 'https://github.com/Dev-5678/Nexus-Auth',
    architecture: {
      overview: 'Enterprise identity gateway. Issues cryptographically signed RS256 JWT access and refresh tokens. Maintains an active token blacklist in Redis for instant credential revocation upon logout or security breach detection.',
      subsystems: [
        { name: 'OAuth2 Authorization Server', role: 'Issues OIDC compliant tokens with granular scope claims', tech: 'Spring Authorization Server' },
        { name: 'Redis Instant Revocation Store', role: 'Blacklists revoked JTI tokens for instant cross-cluster invalidation', tech: 'Redis String Key Expiry' },
        { name: 'TOTP Multi-Factor Engine', role: 'Generates and validates RFC 6238 time-based one-time passcodes', tech: 'Time-Based 2FA Algorithms' }
      ],
      securityAndIntegrity: [
        'RS256 asymmetric cryptographic signing allows resource servers to verify tokens without querying the auth database.',
        'IP-based sliding-window rate limiting blocks brute-force login attempts.'
      ],
      keyEngineeringAchievements: [
        'Delivered sub-4 ms JWT validation latency across high-load microservice clusters.',
        'Achieved instant token revocation propagation across multiple container instances.'
      ]
    }
  },
  {
    id: 'collabdoc-sync',
    number: '30 / 40',
    title: 'CollabDoc-Sync — Real-Time Reactive Document Engine with RSocket',
    category: 'Java Enterprise',
    stackKey: 'java-enterprise',
    domain: 'Reactive Systems, Bidirectional Streaming & RSocket',
    description: 'Real-time collaborative editing platform engineered with reactive Spring WebFlux and RSocket binary streaming. Implements differential character synchronization with reactive MongoDB and backpressure control.',
    devNotes: 'WebSockets can easily drown a server when hundreds of clients flood typing events. Switching to RSocket gave binary streaming efficiency with built-in reactive backpressure, cutting network bandwidth by 65%.',
    tags: ['SPRING BOOT 3', 'SPRING WEBFLUX', 'RSOCKET', 'REACTIVE MONGODB', 'PROJECT REACTOR', 'REACT'],
    appType: 'universal',
    simType: 'protocol',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Sync Latency', value: '<8 ms' },
      { label: 'Bandwidth Cut', value: '65% vs JSON-WS' },
      { label: 'Backpressure', value: 'Reactive Stream' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CollabDoc-Sync',
    architecture: {
      overview: 'Reactive document synchronization backend. Clients stream binary diff frames via RSocket to Spring WebFlux. Project Reactor operators handle conflict-free character merges and push deltas to peer subscriber channels.',
      subsystems: [
        { name: 'RSocket Binary Stream Handler', role: 'Bidirectional character delta streaming with backpressure flow', tech: 'RSocket Protocol' },
        { name: 'Reactive Conflict Merging', role: 'Resolves concurrent character insertions via vector sequence indexing', tech: 'Project Reactor Flux' },
        { name: 'Reactive Storage Engine', role: 'Non-blocking document snapshot persistence', tech: 'Reactive MongoDB Driver' }
      ],
      securityAndIntegrity: [
        'Reactive backpressure guarantees slow consumers never crash the server under heavy keystroke storms.',
        'Document channel isolation prevents unauthorized cross-tenant character leaks.'
      ],
      keyEngineeringAchievements: [
        'Handled 2,000 simultaneous active typing streams on a single reactive Spring WebFlux instance.',
        'Reduced client-to-client keystroke sync latency to under 8 milliseconds.'
      ]
    }
  },

  // ==========================================
  // STACK 7: TypeScript & Web Protocols [31-35]
  // ==========================================
  {
    id: 'nexus-crdt',
    number: '31 / 40',
    title: 'NexusCRDT — Distributed Collaborative Canvas Engine',
    category: 'TypeScript & Protocols',
    stackKey: 'web-protocols',
    domain: 'Distributed Consensus, CRDTs & Collaborative Systems',
    description: 'High-throughput real-time whiteboarding engine engineered with state-based Conflict-Free Replicated Data Types (CRDTs), vector clocks, and Lamport logical clocks. Guarantees Strong Eventual Consistency (SEC) across uncoordinated peer topologies.',
    devNotes: 'Building NexusCRDT taught me that network ordering cannot be trusted. Vector clocks and LWW-Element-Sets allowed multiple users to sketch and manipulate shapes simultaneously with zero server lock arbitration.',
    tags: ['TypeScript 5', 'CRDT (LWW-Element-Set)', 'Vector Clocks', 'Causal Undo/Redo DAG', 'WebRTC Mesh', 'WebSockets'],
    appType: 'universal',
    simType: 'protocol',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Convergence', value: '<1 ms (SEC)' },
      { label: 'Clock Model', value: 'Lamport Vector' },
      { label: 'Topology', value: 'WebRTC P2P Mesh' }
    ],
    githubUrl: 'https://github.com/Dev-5678/NexusCRDT',
    architecture: {
      overview: 'Peer-to-peer collaborative canvas engine. Canvas actions generate immutable operations tagged with Lamport timestamps. Peers exchange state vectors over WebRTC datachannels, merging concurrent operations deterministically.',
      subsystems: [
        { name: 'CRDT Element-Set Core', role: 'LWW-Element-Set mathematical merge resolver ensuring idempotency', tech: 'TypeScript 5 / Set Theory' },
        { name: 'Vector Clock Causality Tracker', role: 'Detects concurrent operations and orders causality chains', tech: 'Lamport Logical Clocks' },
        { name: 'P2P WebRTC Transport', role: 'Direct low-latency peer data channel mesh for operation broadcast', tech: 'WebRTC DataChannels' }
      ],
      securityAndIntegrity: [
        'Strong Eventual Consistency guarantees identical canvas states across all peers regardless of message delivery order.',
        'Causal undo/redo DAG preserves editing history without corrupting peer states.'
      ],
      keyEngineeringAchievements: [
        'Achieved sub-millisecond local state convergence across 10 concurrent sketching peers.',
        'Passed comprehensive fuzz tests with zero split-brain canvas state divergence.'
      ]
    }
  },
  {
    id: 'proxispeak',
    number: '32 / 40',
    title: 'ProxiSpeak — Geospatial Proximity Audio Communication Grid',
    category: 'TypeScript & Protocols',
    stackKey: 'web-protocols',
    domain: 'Geospatial WebSockets & Spatial Audio Systems',
    description: 'Real-time 2D spatial audio communication grid. Computes dynamic inverse-square Euclidean distance audio attenuation and stereo panning across virtual coordinate maps with zero audio bleed.',
    devNotes: 'I built ProxiSpeak because traditional audio calls feel unnatural and flat. Implementing inverse-square Euclidean distance attenuation on Web Audio nodes makes voices naturally fade in as avatars walk closer.',
    tags: ['REACT 19', 'WEBSOCKETS', 'WEB AUDIO API', 'EUCLIDEAN MATH', 'SPATIAL AUDIO', 'CANVAS'],
    appType: 'proxispeak',
    simType: 'protocol',
    image: '/projects/proxispeak.svg',
    featured: true,
    liveMetrics: [
      { label: 'Spatial Latency', value: '<24 ms' },
      { label: 'Falloff Curve', value: 'Inverse-Square' },
      { label: 'Peer Capacity', value: '128 Active' }
    ],
    githubUrl: 'https://github.com/Dev-5678/ProxiSpeak',
    liveUrl: 'https://dev-jangid-portfolio.vercel.app/#/project/proxispeak',
    architecture: {
      overview: 'Spatial audio communication platform. Avatars navigate a virtual canvas map. The client continuously calculates Euclidean vectors to all peers, adjusting Web Audio GainNode and StereoPannerNode parameters in real time.',
      subsystems: [
        { name: 'Euclidean Proximity Engine', role: 'Computes distance and acoustic radius thresholds between avatars', tech: '2D Vector Geometry' },
        { name: 'Web Audio Spatial Panner', role: 'Dynamic volume attenuation and directional stereo panning', tech: 'Web Audio API Nodes' },
        { name: 'WebSocket Coordinate Bus', role: 'Delta compression frame broadcast syncing peer coordinates at 30 Hz', tech: 'Socket.io / WebSockets' }
      ],
      securityAndIntegrity: [
        'Boundary clipping prevents avatar movement beyond designated spatial perimeters.',
        'Volume clamping prevents audio distortion and hearing fatigue.'
      ],
      keyEngineeringAchievements: [
        'Delivered fluid 60 FPS avatar locomotion with smooth logarithmic audio attenuation.',
        'Supported 128 simultaneous participants in a single campus space with zero audio bleed.'
      ]
    }
  },
  {
    id: 'hyper-route',
    number: '33 / 40',
    title: 'HyperRoute — High-Throughput Edge API Gateway & Rate Limiter',
    category: 'TypeScript & Protocols',
    stackKey: 'web-protocols',
    domain: 'Edge Infrastructure, Reverse Proxies & Traffic Shaping',
    description: 'Distributed edge reverse proxy featuring atomic sliding-window counter rate limiting, token-bucket burst smoothing, upstream round-robin load balancing with circuit breakers, and sub-millisecond OpenMetrics Prometheus telemetry.',
    devNotes: 'Standard express rate limiters choke because they use simple fixed-time counters that attackers bypass with burst spikes. Writing atomic Redis Lua scripts gave me true sliding-window accuracy under high traffic.',
    tags: ['Node.js', 'Redis Lua Scripts', 'Sliding-Window', 'Load Balancer', 'Prometheus', 'Docker'],
    appType: 'universal',
    simType: 'network',
    image: '/projects/systems-engine.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Edge Latency', value: '<0.8 ms' },
      { label: 'Throughput', value: '42k req/s' },
      { label: 'Accuracy', value: 'Atomic Sliding-Window' }
    ],
    githubUrl: 'https://github.com/Dev-5678/HyperRoute',
    architecture: {
      overview: 'High-throughput edge reverse proxy. Inbound requests pass through Redis Lua sliding-window rate limiters. Approved requests are routed across healthy upstream targets using round-robin load balancing with circuit breaker health checks.',
      subsystems: [
        { name: 'Atomic Rate Limiting Engine', role: 'Sliding-window counter execution with burst tolerance', tech: 'Redis Lua Scripting' },
        { name: 'Upstream Reverse Proxy', role: 'Transparent HTTP reverse proxying with active health checking', tech: 'Node.js http-proxy' },
        { name: 'Prometheus Telemetry Exporter', role: 'Exports p99 latency and request rate counters in OpenMetrics format', tech: 'Prometheus Exporter' }
      ],
      securityAndIntegrity: [
        'Circuit breakers trip automatically after 5 consecutive upstream failures, preventing cascading server crashes.',
        'Rate limiting keys are salted with client IP and API token to stop distributed evasion.'
      ],
      keyEngineeringAchievements: [
        'Maintained sub-millisecond edge routing overhead under 42,000 requests per second.',
        'Zero race conditions observed during high-concurrency rate limit benchmark attacks.'
      ]
    }
  },
  {
    id: 'agent-forge',
    number: '34 / 40',
    title: 'AgentForge — Autonomous Multi-Agent DAG Workflow Runtime',
    category: 'TypeScript & Protocols',
    stackKey: 'web-protocols',
    domain: 'Workflow Orchestration, Distributed Scheduling & Agentic AI',
    description: 'Distributed execution runtime for autonomous AI multi-agent workflows. Implements Kahn’s topological sort for parallel wave scheduling, sandboxed tool security perimeters, episodic semantic vector memory, and OpenTelemetry distributed tracing.',
    devNotes: 'Sequential LLM workflows are painfully slow. I designed AgentForge to treat agents as nodes in a Directed Acyclic Graph (DAG), resolving independent tasks in parallel waves and cutting overall execution time by 60%.',
    tags: ['TypeScript 5', 'DAG Topological Scheduler', 'OpenTelemetry', 'Vector Embeddings', 'SSE Streaming'],
    appType: 'universal',
    simType: 'ai',
    image: '/projects/gemini-rag.jpg',
    featured: true,
    liveMetrics: [
      { label: 'Parallel Speedup', value: '2.8x' },
      { label: 'Cycle Detection', value: 'Kahn Algorithm' },
      { label: 'Observability', value: 'OpenTelemetry Trace' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AgentForge',
    architecture: {
      overview: 'Autonomous multi-agent execution orchestrator. Parses JSON workflow declarations, validates graph acyclicity via Kahn’s algorithm, dispatches parallel execution waves, and logs execution traces to OpenTelemetry collectors.',
      subsystems: [
        { name: 'Kahn Topological DAG Scheduler', role: 'Calculates node in-degrees and groups tasks into parallel execution waves', tech: 'Topological Sort' },
        { name: 'Agent Execution Sandbox', role: 'Provides isolated execution contexts with strict timeout guards', tech: 'TypeScript / Node.js' },
        { name: 'Distributed Tracing Collector', role: 'Tracks step latencies, token consumption, and failure spans', tech: 'OpenTelemetry SDK' }
      ],
      securityAndIntegrity: [
        'Graph cycle detection prevents infinite loops before execution starts.',
        'Strict input/output JSON schemas protect downstream agents from malformed payloads.'
      ],
      keyEngineeringAchievements: [
        'Accelerated multi-step agent research workflows by 2.8x via parallel wave execution.',
        'Exported complete distributed trace spans for every executed agent step.'
      ]
    }
  },
  {
    id: 'sql-analyzer',
    number: '35 / 40',
    title: 'SQL-Analyzer — In-Browser Relational Query Planner & AST Visualizer',
    category: 'TypeScript & Protocols',
    stackKey: 'web-protocols',
    domain: 'Compilers, AST Generation & Database Query Optimization',
    description: 'Client-side SQL query parser and execution plan visualizer. Features a handwritten recursive-descent parser, Abstract Syntax Tree (AST) builder, join order optimizer, and interactive query cost graph renderer.',
    devNotes: 'Understanding how database query planners choose between Index Seeks and Table Scans is crucial for backend developers. Building an in-browser recursive-descent SQL parser visualizes exactly how databases plan queries.',
    tags: ['TYPESCRIPT', 'RECURSIVE-DESCENT PARSER', 'AST VISUALIZER', 'QUERY PLANNER', 'CANVAS GRAPH'],
    appType: 'universal',
    simType: 'database',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Parse Time', value: '<1.5 ms' },
      { label: 'Grammar Coverage', value: 'ANSI SQL Select' },
      { label: 'Cost Estimator', value: 'Big-O Plan Analysis' }
    ],
    githubUrl: 'https://github.com/Dev-5678/SQL-Analyzer',
    architecture: {
      overview: 'Interactive database query planner. Tokens pass from a lexical scanner into a recursive-descent parser to build an AST. The cost optimizer analyzes index availability, estimating execution costs and rendering an interactive tree.',
      subsystems: [
        { name: 'SQL Lexer & Tokenizer', role: 'Converts raw SQL strings into typed keyword, identifier, and operator tokens', tech: 'TypeScript Lexical Scanner' },
        { name: 'Recursive-Descent Parser', role: 'Builds nested AST representing SELECT, WHERE, JOIN, and GROUP BY nodes', tech: 'AST Grammar Builder' },
        { name: 'Cost Estimation Visualizer', role: 'Estimates Big-O costs and renders an interactive tree diagram', tech: 'HTML5 Canvas Rendering' }
      ],
      securityAndIntegrity: [
        '100% client-side execution ensures user database queries never leave their browser.',
        'Syntax error markers highlight exact token line and column mismatches.'
      ],
      keyEngineeringAchievements: [
        'Parsed and evaluated complex multi-join SQL queries in under 1.5 milliseconds.',
        'Visualized query execution bottlenecks and suggested optimal index configurations.'
      ]
    }
  },

  // ==========================================
  // STACK 8: DevOps, Cloud Infra & Networks [36-40]
  // ==========================================
  {
    id: 'aai-vlan-audit',
    number: '36 / 40',
    title: 'AAI-VLAN-Audit — Automated Network Security Compliance & ACL Auditor',
    category: 'DevOps & Networks',
    stackKey: 'devops-infra',
    domain: 'Enterprise Network Security & Automated Compliance',
    description: 'Automated network compliance suite developed based on Airports Authority of India (AAI) standards. Parses router ACL configurations, validates VLAN 101 airside isolation, and flags unauthorized cross-subnet routing rules.',
    devNotes: 'Directly reflects standard operating procedures (SOPs) I worked on at AAI Northern Region HQ. In civil aviation, administrative computers must never route packets into flight radar subnets. This tool proves that isolation mathematically.',
    tags: ['PYTHON', 'BASH', 'CISCO ACL PARSER', 'VLAN SEGREGATION', 'NETWORK COMPLIANCE', 'ITIL SOPS'],
    appType: 'aai',
    simType: 'devops',
    image: '/projects/aai-security.jpg',
    featured: true,
    liveMetrics: [
      { label: 'VLAN 101 Airside', value: '100% Isolated' },
      { label: 'Audit Speed', value: '<2.5s for 5,000 ACLs' },
      { label: 'Violation Catch', value: 'Zero False Negatives' }
    ],
    githubUrl: 'https://github.com/Dev-5678/AAI-VLAN-Audit',
    architecture: {
      overview: 'Automated network security compliance auditor. Ingests router and firewall configuration files, parses Access Control Lists (ACLs) into directed graph reachability models, and validates strict airside VLAN segregation.',
      subsystems: [
        { name: 'Router ACL Syntax Parser', role: 'Extracts permit/deny rules, IP masks, and port ranges', tech: 'Python Regex / Lexer' },
        { name: 'Reachability Graph Engine', role: 'Evaluates packet routing paths between administrative and ANS subnets', tech: 'Directed Graph Algorithms' },
        { name: 'ITIL Compliance Reporter', role: 'Generates executive security audit reports and remediation matrices', tech: 'Automated Markdown / PDF' }
      ],
      securityAndIntegrity: [
        'Verifies that no default route or gateway exists bridging administrative workstations to flight radar subnets.',
        'Detects shadowed and redundant ACL rules to optimize firewall processing speed.'
      ],
      keyEngineeringAchievements: [
        'Audited 5,000 enterprise firewall ACL entries in under 2.5 seconds with zero missed routing leaks.',
        'Formalized into technical standard operating procedures (SOPs) adopted by IT operations.'
      ]
    }
  },
  {
    id: 'kubedeploy-ci',
    number: '37 / 40',
    title: 'KubeDeploy-CI — GitOps Automated Docker Deployment Pipeline',
    category: 'DevOps & Networks',
    stackKey: 'devops-infra',
    domain: 'Cloud Infrastructure, CI/CD & Container Security',
    description: 'Production GitOps deployment workflow. Automates multi-stage Docker builds, Trivy container security scans, unit and integration test runners, and executes zero-downtime blue-green deployments via Nginx reverse proxies.',
    devNotes: 'Deployments should be boring and deterministic. By designing multi-stage Docker builds, I dropped application container image sizes from 850 MB down to 38 MB while adding automated security vulnerability gates.',
    tags: ['GITHUB ACTIONS', 'DOCKER MULTI-STAGE', 'NGINX BLUE-GREEN', 'TRIVY SCANNER', 'BASH', 'LINUX'],
    appType: 'universal',
    simType: 'devops',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Image Size Cut', value: '850MB -> 38MB' },
      { label: 'Deploy Downtime', value: '0s (Blue-Green)' },
      { label: 'CVE Gate', value: 'Trivy Automated' }
    ],
    githubUrl: 'https://github.com/Dev-5678/KubeDeploy-CI',
    architecture: {
      overview: 'Continuous integration and deployment pipeline. Code commits trigger GitHub Actions workflows that run test suites, build optimized multi-stage Docker containers, perform security scanning, and reload Nginx upstream targets without dropping requests.',
      subsystems: [
        { name: 'GitHub Actions Orchestrator', role: 'Runs unit tests, linting, and security gates on every push', tech: 'GitHub Actions CI' },
        { name: 'Multi-Stage Container Builder', role: 'Compiles applications in temporary build stages and outputs minimal Alpine runtimes', tech: 'Docker Multi-Stage' },
        { name: 'Blue-Green Deployment Switcher', role: 'Swaps live upstream server ports with zero connection drops', tech: 'Nginx Unix Sockets' }
      ],
      securityAndIntegrity: [
        'Trivy automated CVE vulnerability scanner halts deployments on Critical or High severity findings.',
        'Non-root user execution inside Docker containers adheres to container security best practices.'
      ],
      keyEngineeringAchievements: [
        'Achieved true zero-downtime deployments verified under continuous ApacheBench traffic.',
        'Reduced Docker image footprints by 95% while keeping build times under 2 minutes.'
      ]
    }
  },
  {
    id: 'postgres-replication-monitor',
    number: '38 / 40',
    title: 'Postgres-Replication-Monitor — High-Availability Replication Auditor',
    category: 'DevOps & Networks',
    stackKey: 'devops-infra',
    domain: 'Database Reliability Engineering & High-Availability Clusters',
    description: 'High-availability database replication daemon. Monitors PostgreSQL Write-Ahead Log (WAL) LSN byte offsets between primary and standby replicas, detects replication lag spikes, and exports Prometheus metrics with alert webhooks.',
    devNotes: 'Modeled after database reliability audits at AAI. Silent replication lag causes catastrophic data loss if a primary node crashes and failover switches to a stale replica. This daemon monitors lag down to the exact byte position.',
    tags: ['SQL', 'POSTGRESQL WAL', 'PROMETHEUS', 'GRAFANA', 'BASH / PYTHON', 'HIGH AVAILABILITY'],
    appType: 'universal',
    simType: 'database',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Lag Resolution', value: 'Byte-Level WAL' },
      { label: 'Alert Trigger', value: '<500 ms SLA' },
      { label: 'Prometheus Export', value: 'Sub-1ms OpenMetrics' }
    ],
    githubUrl: 'https://github.com/Dev-5678/Postgres-Replication-Monitor',
    architecture: {
      overview: 'Database high-availability supervisor. Periodically queries pg_stat_replication on the primary node, computes pg_wal_lsn_diff byte distances to standby replay locations, and exposes OpenMetrics telemetry for Grafana dashboards.',
      subsystems: [
        { name: 'WAL Offset Sampler', role: 'Queries low-level database replication states via SQL connection pool', tech: 'PostgreSQL Internals / SQL' },
        { name: 'Lag Calculator & Alert Engine', role: 'Evaluates lag thresholds and dispatches webhook alerts on SLA breaches', tech: 'Python / Webhooks' },
        { name: 'OpenMetrics Prometheus Exporter', role: 'Publishes replication metrics for scraping by Prometheus and Grafana', tech: 'Prometheus Exporter' }
      ],
      securityAndIntegrity: [
        'Uses read-only monitoring database credentials with restricted system catalog permissions.',
        'Exponential backoff prevents cascading connection spikes if the database server is under high load.'
      ],
      keyEngineeringAchievements: [
        'Provided byte-accurate real-time visibility into database replication across distributed multi-node clusters.',
        'Detected simulated standby network stalls within 500 milliseconds.'
      ]
    }
  },
  {
    id: 'linuxsys-probe',
    number: '39 / 40',
    title: 'LinuxSys-Probe — Lightweight Procfs Resource Telemetry Daemon',
    category: 'DevOps & Networks',
    stackKey: 'devops-infra',
    domain: 'Linux Systems Programming & Performance Engineering',
    description: 'Ultra-lightweight Linux system resource monitor. Directly parses /proc and /sys pseudo-filesystems (CPU frequency scaling, context switch counters, page faults, socket buffer queues) with sub-0.1% CPU overhead.',
    devNotes: 'Commercial monitoring agents like Datadog are often too resource-heavy for edge hardware or microcontrollers. I wrote LinuxSys-Probe to read directly from the Linux kernel /proc files, giving microsecond-level telemetry with less than 6 MB of RAM.',
    tags: ['LINUX SYSTEMS', 'PROCFS / SYSFS', 'C / BASH', 'OPENMETRICS', 'PERFORMANCE PROFILING'],
    appType: 'universal',
    simType: 'devops',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'CPU Overhead', value: '<0.1%' },
      { label: 'RAM Footprint', value: '<6 MB' },
      { label: 'Telemetry Jitter', value: '<50 µs' }
    ],
    githubUrl: 'https://github.com/Dev-5678/LinuxSys-Probe',
    architecture: {
      overview: 'Native Linux performance telemetry daemon. Reads /proc/stat, /proc/meminfo, and /proc/net/dev directly using low-level file I/O, calculates delta rates, and exposes an OpenMetrics endpoint for Prometheus.',
      subsystems: [
        { name: 'Procfs Ingestion Engine', role: 'Fast zero-copy reading of Linux kernel pseudo-files', tech: 'POSIX File Descriptors' },
        { name: 'Metric Delta Calculator', role: 'Calculates instantaneous CPU utilization and context switches per second', tech: 'High-Resolution Timers' },
        { name: 'Micro-HTTP Exporter', role: 'Minimal socket HTTP server responding to Prometheus scrape requests', tech: 'Pure C / Non-blocking IO' }
      ],
      securityAndIntegrity: [
        'Runs completely unprivileged without requiring root or sudo access.',
        'Zero external runtime dependencies guarantees instant portability across all Linux distributions.'
      ],
      keyEngineeringAchievements: [
        'Maintained less than 0.1% CPU overhead during continuous 10 Hz sampling tests.',
        'Captured micro-burst CPU spikes that standard 1-minute monitoring agents completely missed.'
      ]
    }
  },
  {
    id: 'cloudbastion-vpn',
    number: '40 / 40',
    title: 'CloudBastion-VPN — Zero-Trust WireGuard Mesh Access Gateway',
    category: 'DevOps & Networks',
    stackKey: 'devops-infra',
    domain: 'Zero-Trust Networks, Cryptography & Secure Remote Access',
    description: 'Zero-trust remote access gateway built on WireGuard VPN protocols and Linux nftables. Enforces cryptographic public-key peer authentication, dynamic role-based firewall ACLs, and ephemeral session expiration.',
    devNotes: 'Traditional enterprise VPNs grant full internal network access once connected. Modeled on zero-trust security principles from AAI, CloudBastion restricts remote developer SSH access strictly to their assigned staging servers.',
    tags: ['WIREGUARD', 'LINUX NFTABLES', 'ZERO-TRUST', 'CRYPTOGRAPHY', 'NETWORK ISOLATION', 'BASH'],
    appType: 'aai',
    simType: 'network',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'Handshake Time', value: '<15 ms' },
      { label: 'Crypto Cipher', value: 'ChaCha20-Poly1305' },
      { label: 'Access Policy', value: 'Strict Least-Privilege' }
    ],
    githubUrl: 'https://github.com/Dev-5678/CloudBastion-VPN',
    architecture: {
      overview: 'Zero-trust remote access gateway. WireGuard establishes encrypted peer tunnels authenticated via Curve25519 public keys. Dynamic Linux nftables rules isolate remote peer traffic strictly to authorized target subnets.',
      subsystems: [
        { name: 'WireGuard Tunnel Gateway', role: 'Kernel-level ChaCha20-Poly1305 encrypted packet routing', tech: 'WireGuard Linux Module' },
        { name: 'Dynamic Nftables Firewalls', role: 'Injects per-user packet filtering rules preventing cross-subnet lateral movement', tech: 'Linux nftables / iptables' },
        { name: 'Ephemeral Session Controller', role: 'Automates key rotation and terminates stale inactive sessions', tech: 'Bash / Python Supervisor' }
      ],
      securityAndIntegrity: [
        'Zero attack surface: rejects unauthenticated UDP packets silently without responding, making the gateway invisible to port scanners.',
        'Strict peer isolation prevents lateral network movement in case of a compromised developer laptop.'
      ],
      keyEngineeringAchievements: [
        'Engineered seamless sub-15 ms WireGuard cryptographic connection handshakes.',
        'Enforced zero-trust network perimeter isolation across 5 distinct development subnets.'
      ]
    }
  }
]
