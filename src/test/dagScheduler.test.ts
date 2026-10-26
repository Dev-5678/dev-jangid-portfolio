import { describe, it, expect } from 'vitest'
import { scheduleDAG, type DAGNode } from '../utils/dagScheduler'

describe('AgentForge Kahn Algorithm Topological DAG Scheduler', () => {
  it('correctly batches independent parallel execution waves', () => {
    const pipeline: DAGNode[] = [
      { id: 'fetch_data', dependencies: [] },
      { id: 'clean_data', dependencies: ['fetch_data'] },
      { id: 'generate_summary', dependencies: ['clean_data'] },
      { id: 'generate_charts', dependencies: ['clean_data'] },
      { id: 'publish_report', dependencies: ['generate_summary', 'generate_charts'] }
    ]

    const result = scheduleDAG(pipeline)

    expect(result.hasCycle).toBe(false)
    expect(result.waves).toEqual([
      ['fetch_data'],
      ['clean_data'],
      ['generate_charts', 'generate_summary'],
      ['publish_report']
    ])
    expect(result.executionOrder).toEqual([
      'fetch_data',
      'clean_data',
      'generate_charts',
      'generate_summary',
      'publish_report'
    ])
  })

  it('detects circular dependencies and flags hasCycle: true', () => {
    const cyclicGraph: DAGNode[] = [
      { id: 'task_a', dependencies: ['task_c'] },
      { id: 'task_b', dependencies: ['task_a'] },
      { id: 'task_c', dependencies: ['task_b'] }
    ]

    const result = scheduleDAG(cyclicGraph)
    expect(result.hasCycle).toBe(true)
    expect(result.waves).toEqual([])
  })

  it('throws an error if a node refers to a non-existent dependency ID', () => {
    const brokenGraph: DAGNode[] = [
      { id: 'task_1', dependencies: ['ghost_dependency'] }
    ]

    expect(() => scheduleDAG(brokenGraph)).toThrow(/Missing dependency node ID/)
  })
})
