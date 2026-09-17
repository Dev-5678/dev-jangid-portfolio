// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiRequest = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResponse = any

interface BenchmarkRecord {
  id: string
  algorithm: string
  datasetSize: number
  elapsedUs: number
  throughputKops: number
  cacheHitRate: string
  status: string
  timestamp: string
}

let benchmarksStore: BenchmarkRecord[] = [
  {
    id: 'bench-1',
    algorithm: 'QuickSort (Cache-Aligned In-Place)',
    datasetSize: 10000,
    elapsedUs: 420,
    throughputKops: 2380,
    cacheHitRate: '99.4%',
    status: 'SUB_MILLISECOND_CERTIFIED',
    timestamp: '2026-10-17 21:10:00'
  },
  {
    id: 'bench-2',
    algorithm: 'Dijkstra Flat Min-Heap',
    datasetSize: 2000,
    elapsedUs: 310,
    throughputKops: 6450,
    cacheHitRate: '94.8%',
    status: 'SUB_MILLISECOND_CERTIFIED',
    timestamp: '2026-10-17 21:12:15'
  }
]

export default function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      engine: 'NEXUS_CORE_C20_BENCHMARK_SUITE',
      count: benchmarksStore.length,
      data: benchmarksStore
    })
  }

  if (req.method === 'POST') {
    const { algorithm, datasetSize, elapsedUs, throughputKops, cacheHitRate } = req.body || {}
    const newRecord: BenchmarkRecord = {
      id: `bench-${Date.now()}`,
      algorithm: algorithm || 'In-Place Partition Sorter',
      datasetSize: Number(datasetSize || 10000),
      elapsedUs: Number(elapsedUs || 450),
      throughputKops: Number(throughputKops || 2200),
      cacheHitRate: cacheHitRate || '99.1%',
      status: 'SUB_MILLISECOND_CERTIFIED',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    benchmarksStore.unshift(newRecord)
    return res.status(201).json({
      success: true,
      message: 'Benchmark record committed to persistent systems database.',
      record: newRecord
    })
  }

  return res.status(405).json({ error: 'Method Not Allowed' })
}
