import React, { useState } from 'react'
import { Cpu, Code2 } from 'lucide-react'

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
    description: 'Partitions an array around a pivot element, recursively sorting sub-arrays. Efficient in-place cache-friendly sorting algorithm.',
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
    id: 'bst',
    name: 'Binary Search Tree Search',
    category: 'Tree Structures',
    bestTime: 'O(1)',
    avgTime: 'O(log N)',
    worstTime: 'O(N)',
    space: 'O(h)',
    description: 'Hierarchical node structure where left subtrees hold keys less than the parent and right subtrees hold keys greater.',
    cppSnippet: `TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) 
        return searchBST(root->left, val);
    return searchBST(root->right, val);
}`
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graph Algorithms',
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
    name: 'Hash Table Lookup',
    category: 'Associative Arrays',
    bestTime: 'O(1)',
    avgTime: 'O(1)',
    worstTime: 'O(N)',
    space: 'O(N)',
    description: 'Computes index into an array of buckets via hash function. Fast constant-time average case retrieval with chaining collision resolution.',
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

  return (
    <div className="brutal-card p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#00E5FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#111317] dark:border-[#334155] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF5500] dark:text-[#00E5FF] uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-[#00E5FF]" />
            <span>ALGORITHMIC FOUNDATIONS // DSA & BIG-O MATRIX</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#111317] dark:text-[#F4F7FB] mt-1">
            Data Structures & Complexity Benchmark
          </h3>
        </div>
      </div>

      {/* Algorithm Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ALGORITHMS.map((algo) => (
          <button
            key={algo.id}
            onClick={() => setSelectedAlgoId(algo.id)}
            className={`px-3 py-2 font-mono text-xs font-bold uppercase border-2 transition-all cursor-pointer ${
              algo.id === selectedAlgoId
                ? 'bg-[#111317] text-[#00E5FF] border-[#111317] dark:border-[#00E5FF] shadow-[3px_3px_0px_#00E5FF]'
                : 'bg-[#FAF8F5] dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] border-[#111317] dark:border-[#334155] hover:border-[#00E5FF]'
            }`}
          >
            {algo.name}
          </button>
        ))}
      </div>

      {/* Complexity Matrix Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Best Time</span>
          <span className="text-sm font-black text-[#111317] dark:text-[#CCFF00]">{current.bestTime}</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Average Time</span>
          <span className="text-sm font-black text-[#00E5FF]">{current.avgTime}</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Worst Time</span>
          <span className="text-sm font-black text-[#FF5500]">{current.worstTime}</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Auxiliary Space</span>
          <span className="text-sm font-black text-gray-700 dark:text-gray-300">{current.space}</span>
        </div>
      </div>

      {/* Description & Code Preview */}
      <div className="p-4 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] space-y-3 font-mono text-xs">
        <p className="font-sans text-xs text-gray-700 dark:text-gray-300">
          {current.description}
        </p>

        <div>
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-300 dark:border-gray-800 text-[10px] text-gray-500">
            <span className="flex items-center gap-1 font-bold">
              <Code2 className="w-3.5 h-3.5 text-[#00E5FF]" />
              C++ IMPLEMENTATION
            </span>
            <span>OPTIMIZED FOR LOW LATENCY</span>
          </div>
          <pre className="mt-2 p-3 bg-white dark:bg-[#141820] border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-[11px] overflow-x-auto">
            <code>{current.cppSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
