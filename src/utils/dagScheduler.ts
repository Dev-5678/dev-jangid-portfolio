/**
 * AgentForge Topological DAG Task Scheduler
 * Implements Kahn's algorithm for dependency resolution, wave-based parallel execution batching,
 * and circular dependency cycle detection.
 */

export interface DAGNode {
  id: string
  dependencies: string[]
}

export interface DAGScheduleResult {
  hasCycle: boolean
  waves: string[][]
  executionOrder: string[]
}

export function scheduleDAG(nodes: DAGNode[]): DAGScheduleResult {
  const inDegree: Map<string, number> = new Map()
  const adjacency: Map<string, string[]> = new Map()
  const allIds = new Set(nodes.map((n) => n.id))

  // Initialize graph
  for (const node of nodes) {
    inDegree.set(node.id, 0)
    adjacency.set(node.id, [])
  }

  // Populate graph edges and incoming degree counts
  for (const node of nodes) {
    for (const dep of node.dependencies) {
      if (!allIds.has(dep)) {
        throw new Error(`Missing dependency node ID: ${dep}`)
      }
      adjacency.get(dep)?.push(node.id)
      inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1)
    }
  }

  // Find initial batch of independent nodes (in-degree == 0)
  let currentWave: string[] = []
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) currentWave.push(id)
  }

  const waves: string[][] = []
  const executionOrder: string[] = []

  while (currentWave.length > 0) {
    currentWave.sort() // Deterministic ordering
    waves.push([...currentWave])
    executionOrder.push(...currentWave)

    const nextWave: string[] = []
    for (const nodeId of currentWave) {
      const neighbors = adjacency.get(nodeId) || []
      for (const neighbor of neighbors) {
        const updatedDeg = (inDegree.get(neighbor) || 0) - 1
        inDegree.set(neighbor, updatedDeg)
        if (updatedDeg === 0) {
          nextWave.push(neighbor)
        }
      }
    }

    currentWave = nextWave
  }

  const hasCycle = executionOrder.length < nodes.length

  return {
    hasCycle,
    waves: hasCycle ? [] : waves,
    executionOrder: hasCycle ? [] : executionOrder
  }
}
