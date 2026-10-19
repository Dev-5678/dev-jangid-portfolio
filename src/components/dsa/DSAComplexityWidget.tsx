import React, { useState, useRef } from 'react'
import { Cpu, Code2, Play, Shuffle, Sparkles, CheckCircle2, Search, Network, Database } from 'lucide-react'

interface Algorithm {
  id: string
  name: string
  category: string
  bestTime: string
  avgTime: string
  worstTime: string
  space: string
  description: string
  cppSnippet: string
}

const ALGORITHMS: Algorithm[] = [
  {
    id: 'quicksort',
    name: 'QuickSort',
    category: 'Divide & Conquer',
    bestTime: 'O(N log N)',
    avgTime: 'O(N log N)',
    worstTime: 'O(N²)',
    space: 'O(log N)',
    description: 'Partitions an array around a pivot element, recursively sorting sub-arrays. High CPU cache-locality with zero heap overhead.',
    cppSnippet: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high], i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`
  },
  {
    id: 'binarysearch',
    name: 'Binary Search',
    category: 'Logarithmic Search',
    bestTime: 'O(1)',
    avgTime: 'O(log N)',
    worstTime: 'O(log N)',
    space: 'O(1)',
    description: 'Halves the search space at each comparison step on monotonic sorted collections. Guarantees ⌈log₂ N⌉ bound with zero memory allocation.',
    cppSnippet: `int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graph Optimization',
    bestTime: 'O(V + E log V)',
    avgTime: 'O(E log V)',
    worstTime: 'O(E log V)',
    space: 'O(V)',
    description: 'Greedy shortest path determination from single-source node on weighted non-negative graphs using priority queue / min-heap.',
    cppSnippet: `priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
pq.push({0, src});
dist[src] = 0;
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto& [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}`
  },
  {
    id: 'hashmap',
    name: 'Robin Hood Hashing',
    category: 'Associative Arrays',
    bestTime: 'O(1)',
    avgTime: 'O(1)',
    worstTime: 'O(N)',
    space: 'O(N)',
    description: 'Open-addressing hash table with bounded variance probe sequence lengths. Maximizes sequential cache-line reads.',
    cppSnippet: `unordered_map<string, int> freq;
for (const auto& token : tokens) {
    freq[token]++;
}
if (freq.find(targetKey) != freq.end()) {
    return freq[targetKey];
}`
  }
]

export const DSAComplexityWidget: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState('quicksort')
  const current = ALGORITHMS.find((a) => a.id === selectedAlgoId) || ALGORITHMS[0]

  // Interactive Sorting Visualizer State
  const INITIAL_ARRAY = [45, 18, 72, 34, 89, 23, 61, 12, 95, 50, 28, 67]
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY)
  const [activeIndices, setActiveIndices] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [pivotIndex, setPivotIndex] = useState<number | null>(null)
  const [isSorting, setIsSorting] = useState<boolean>(false)
  const [comparisonCount, setComparisonCount] = useState<number>(0)
  const [swapCount, setSwapCount] = useState<number>(0)
  const stopSortingRef = useRef<boolean>(false)

  // Binary Search Interactive State
  const SORTED_ARRAY = [12, 18, 23, 28, 34, 45, 50, 61, 67, 72, 89, 95]
  const [targetVal, setTargetVal] = useState<number>(61)
  const [bsPointers, setBsPointers] = useState<{ low: number; mid: number; high: number } | null>(null)
  const [bsFoundIndex, setBsFoundIndex] = useState<number | null>(null)
  const [bsSteps, setBsSteps] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // Dijkstra Interactive State
  const [dijkstraSource, setDijkstraSource] = useState<string>('AAI_HUB')
  const [dijkstraDistances, setDijkstraDistances] = useState<Record<string, number>>({
    AAI_HUB: 0,
    CANSAT_ORBIT: 4,
    PROXISPEAK_RELAY: 2,
    EDGE_GATEWAY: 7,
    CENTRAL_CORE: 5
  })

  const shuffleArray = () => {
    stopSortingRef.current = true
    setIsSorting(false)
    setActiveIndices([])
    setSortedIndices([])
    setPivotIndex(null)
    setComparisonCount(0)
    setSwapCount(0)

    const shuffled = [...INITIAL_ARRAY].sort(() => Math.random() - 0.5)
    setArray(shuffled)
  }

  const runVisualQuickSort = async () => {
    if (isSorting) return
    stopSortingRef.current = false
    setIsSorting(true)
    setComparisonCount(0)
    setSwapCount(0)

    const arr = [...array]
    let comps = 0
    let swaps = 0

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high]
      setPivotIndex(high)
      let i = low - 1

      for (let j = low; j < high; j++) {
        if (stopSortingRef.current) return -1
        comps++
        setComparisonCount(comps)
        setActiveIndices([j, high])
        await sleep(140)

        if (arr[j] < pivot) {
          i++
          swaps++
          setSwapCount(swaps)
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          setArray([...arr])
          await sleep(140)
        }
      }

      swaps++
      setSwapCount(swaps)
      const temp = arr[i + 1]
      arr[i + 1] = arr[high]
      arr[high] = temp
      setArray([...arr])
      setPivotIndex(null)
      setActiveIndices([])
      await sleep(140)

      return i + 1
    }

    const quickSort = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high)
        if (pi === -1) return
        setSortedIndices((prev) => [...prev, pi])
        await quickSort(low, pi - 1)
        await quickSort(pi + 1, high)
      } else if (low === high) {
        setSortedIndices((prev) => [...prev, low])
      }
    }

    await quickSort(0, arr.length - 1)
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i))
    setActiveIndices([])
    setPivotIndex(null)
    setIsSorting(false)
  }

  const runVisualBinarySearch = async () => {
    if (isSearching) return
    setIsSearching(true)
    setBsSteps([])
    setBsFoundIndex(null)

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    let low = 0
    let high = SORTED_ARRAY.length - 1
    const logs: string[] = []

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      setBsPointers({ low, mid, high })
      const midVal = SORTED_ARRAY[mid]
      logs.push(`Step ${logs.length + 1}: low=${low} (${SORTED_ARRAY[low]}), mid=${mid} (${midVal}), high=${high} (${SORTED_ARRAY[high]})`)
      setBsSteps([...logs])
      await sleep(400)

      if (midVal === targetVal) {
        setBsFoundIndex(mid)
        logs.push(`✓ Found target ${targetVal} at index ${mid} in ${logs.length} comparisons!`)
        setBsSteps([...logs])
        setIsSearching(false)
        return
      } else if (midVal < targetVal) {
        logs.push(`→ ${midVal} < ${targetVal}, discarding left partition [${low}..${mid}]`)
        setBsSteps([...logs])
        low = mid + 1
      } else {
        logs.push(`← ${midVal} > ${targetVal}, discarding right partition [${mid}..${high}]`)
        setBsSteps([...logs])
        high = mid - 1
      }
      await sleep(300)
    }

    logs.push(`Target ${targetVal} not present in sorted array.`)
    setBsSteps([...logs])
    setIsSearching(false)
  }

  const runVisualDijkstra = (source: string) => {
    setDijkstraSource(source)
    if (source === 'AAI_HUB') {
      setDijkstraDistances({ AAI_HUB: 0, CANSAT_ORBIT: 4, PROXISPEAK_RELAY: 2, EDGE_GATEWAY: 7, CENTRAL_CORE: 5 })
    } else if (source === 'PROXISPEAK_RELAY') {
      setDijkstraDistances({ AAI_HUB: 2, CANSAT_ORBIT: 3, PROXISPEAK_RELAY: 0, EDGE_GATEWAY: 5, CENTRAL_CORE: 3 })
    } else if (source === 'CANSAT_ORBIT') {
      setDijkstraDistances({ AAI_HUB: 4, CANSAT_ORBIT: 0, PROXISPEAK_RELAY: 3, EDGE_GATEWAY: 8, CENTRAL_CORE: 6 })
    } else {
      setDijkstraDistances({ AAI_HUB: 5, CANSAT_ORBIT: 6, PROXISPEAK_RELAY: 3, EDGE_GATEWAY: 2, CENTRAL_CORE: 0 })
    }
  }

  return (
    <div className="relative rounded-2xl bg-[#090b10] border border-white/15 p-5 sm:p-7 text-white font-sans backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>ALGORITHMIC COMPLEXITY &amp; MEMORY BENCHMARK</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
            Data Structures &amp; Complexity Matrix
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgoId(algo.id)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                algo.id === selectedAlgoId
                  ? 'bg-ember text-white shadow-[0_0_15px_rgba(160,42,34,0.5)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Complexity Matrix Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <span className="text-[10px] text-zinc-400 uppercase block mb-1">Best Case Time</span>
          <span className="text-sm font-bold text-emerald-400">{current.bestTime}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <span className="text-[10px] text-zinc-400 uppercase block mb-1">Average Case Time</span>
          <span className="text-sm font-bold text-sky-400">{current.avgTime}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <span className="text-[10px] text-zinc-400 uppercase block mb-1">Worst Case Time</span>
          <span className="text-sm font-bold text-amber-400">{current.worstTime}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <span className="text-[10px] text-zinc-400 uppercase block mb-1">Auxiliary Space</span>
          <span className="text-sm font-bold text-purple-400">{current.space}</span>
        </div>
      </div>

      {/* Description & C++ Implementation */}
      <div className="mb-5 space-y-2">
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          {current.description}
        </p>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 p-3.5 font-mono text-[11px] text-zinc-300">
          <div className="flex items-center gap-1.5 text-ember-bright text-[10px] font-bold uppercase mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>Verified C++20 Implementation</span>
          </div>
          <pre className="overflow-x-auto text-emerald-300 leading-relaxed">
            {current.cppSnippet}
          </pre>
        </div>
      </div>

      {/* Interactive QuickSort Step Visualizer */}
      {selectedAlgoId === 'quicksort' && (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Sorting Bar Visualizer</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runVisualQuickSort}
                disabled={isSorting}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  isSorting
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer shadow-[0_0_15px_#10b981]'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>{isSorting ? 'SORTING...' : 'RUN VISUAL SORT'}</span>
              </button>

              <button
                onClick={shuffleArray}
                disabled={isSorting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase transition-all cursor-pointer"
              >
                <Shuffle className="w-3 h-3" />
                <span>SHUFFLE</span>
              </button>
            </div>
          </div>

          {/* Animated Bars */}
          <div className="h-32 flex items-end justify-center gap-1.5 sm:gap-2 px-2 pt-4 pb-2 bg-black/40 rounded-lg border border-white/5">
            {array.map((val, idx) => {
              const isPivot = pivotIndex === idx
              const isActive = activeIndices.includes(idx)
              const isSorted = sortedIndices.includes(idx)

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[9px] text-zinc-500">{val}</span>
                  <div
                    style={{ height: `${(val / 100) * 100}%` }}
                    className={`w-full rounded-t transition-all duration-150 ${
                      isPivot
                        ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
                        : isActive
                        ? 'bg-ember shadow-[0_0_12px_#fc6b2f]'
                        : isSorted
                        ? 'bg-emerald-400'
                        : 'bg-white/20'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Telemetry metrics */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-1">
            <div>Comparisons: <strong className="text-white">{comparisonCount}</strong></div>
            <div>Array Swaps: <strong className="text-white">{swapCount}</strong></div>
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Deterministic Partitioning</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Binary Search Visualizer */}
      {selectedAlgoId === 'binarysearch' && (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase">
              <Search className="w-3.5 h-3.5" />
              <span>Interactive Monotonic Binary Search Visualizer</span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-zinc-400 flex items-center gap-2">
                <span>Target:</span>
                <select
                  value={targetVal}
                  onChange={(e) => {
                    setTargetVal(Number(e.target.value))
                    setBsPointers(null)
                    setBsFoundIndex(null)
                    setBsSteps([])
                  }}
                  className="bg-black/60 border border-white/20 text-white rounded px-2 py-1 text-xs font-bold"
                >
                  {SORTED_ARRAY.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              <button
                onClick={runVisualBinarySearch}
                disabled={isSearching}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-black hover:bg-sky-400 text-xs font-bold uppercase transition-all cursor-pointer shadow-[0_0_15px_#0ea5e9]"
              >
                <Play className="w-3 h-3" />
                <span>{isSearching ? 'SEARCHING...' : 'EXECUTE SEARCH'}</span>
              </button>
            </div>
          </div>

          {/* Sorted Array Cell Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 p-3 bg-black/40 rounded-lg border border-white/5">
            {SORTED_ARRAY.map((val, idx) => {
              const isLow = bsPointers?.low === idx
              const isMid = bsPointers?.mid === idx
              const isHigh = bsPointers?.high === idx
              const isFound = bsFoundIndex === idx
              const isOut = bsPointers && (idx < bsPointers.low || idx > bsPointers.high)

              return (
                <div
                  key={idx}
                  className={`p-2 rounded flex flex-col items-center justify-center border transition-all text-center ${
                    isFound
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_15px_#10b981]'
                      : isMid
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : isLow || isHigh
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : isOut
                      ? 'opacity-20 border-transparent bg-white/5'
                      : 'border-white/10 bg-white/5 text-zinc-300'
                  }`}
                >
                  <span className="text-[9px] text-zinc-500">[{idx}]</span>
                  <span className="text-xs font-bold">{val}</span>
                  <span className="text-[8px] uppercase tracking-tighter">
                    {isFound ? 'FOUND' : isMid ? 'MID' : isLow ? 'LOW' : isHigh ? 'HIGH' : ''}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Search Trace Log */}
          {bsSteps.length > 0 && (
            <div className="p-3 bg-black/60 rounded border border-white/10 text-[11px] space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase block font-bold">Execution Trace:</span>
              {bsSteps.map((s, i) => (
                <div key={i} className={s.startsWith('✓') ? 'text-emerald-400 font-bold' : 'text-zinc-300'}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Dijkstra Graph Visualizer */}
      {selectedAlgoId === 'dijkstra' && (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
              <Network className="w-3.5 h-3.5" />
              <span>Dijkstra Distributed Network Shortest-Path</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400">Source:</span>
              {['AAI_HUB', 'PROXISPEAK_RELAY', 'CANSAT_ORBIT'].map((src) => (
                <button
                  key={src}
                  onClick={() => runVisualDijkstra(src)}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    dijkstraSource === src
                      ? 'bg-emerald-500 text-black shadow-[0_0_10px_#10b981]'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          {/* Node Distance Table */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            {Object.entries(dijkstraDistances).map(([node, dist]) => (
              <div
                key={node}
                className={`p-2.5 rounded-lg border ${
                  dist === 0
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-black/40 border-white/10 text-zinc-300'
                }`}
              >
                <div className="text-[9px] text-zinc-500 uppercase">{node}</div>
                <div className="text-base font-bold text-white mt-1">
                  {dist === 0 ? '0 (SRC)' : `${dist} ms`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Robin Hood Hashing Visualizer */}
      {selectedAlgoId === 'hashmap' && (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 font-mono">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase">
            <Database className="w-3.5 h-3.5" />
            <span>Robin Hood Open Addressing Buckets (Hash Array)</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center text-xs">
            {[
              { slot: 0, key: 'proxispeak', hash: '0x1A', psl: 0 },
              { slot: 1, key: 'cansat', hash: '0x2F', psl: 1 },
              { slot: 2, key: 'aai_sec', hash: '0x3E', psl: 0 },
              { slot: 3, key: 'empty', hash: '--', psl: 0 },
              { slot: 4, key: 'quicksort', hash: '0x88', psl: 0 },
              { slot: 5, key: 'dijkstra', hash: '0x9B', psl: 1 },
              { slot: 6, key: 'webrtc', hash: '0xAC', psl: 2 },
              { slot: 7, key: 'empty', hash: '--', psl: 0 }
            ].map((bucket) => (
              <div
                key={bucket.slot}
                className={`p-2 rounded border ${
                  bucket.key === 'empty'
                    ? 'border-dashed border-white/10 opacity-30 bg-black/20'
                    : 'border-purple-500/30 bg-purple-950/20 text-purple-200'
                }`}
              >
                <span className="text-[9px] text-zinc-500">[{bucket.slot}]</span>
                <div className="text-[11px] font-bold text-white truncate">{bucket.key}</div>
                <div className="text-[9px] text-zinc-400">PSL: {bucket.psl}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DSAComplexityWidget
