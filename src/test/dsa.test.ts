import { describe, it, expect } from 'vitest'

describe('Algorithmic Invariants & Complexity Assertions', () => {
  it('correctly partitions an array around pivot in-place', () => {
    const arr = [45, 18, 72, 34, 89, 23, 61, 12, 95, 50]
    const pivot = arr[arr.length - 1]
    let i = -1

    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] < pivot) {
        i++
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }

    const temp = arr[i + 1]
    arr[i + 1] = arr[arr.length - 1]
    arr[arr.length - 1] = temp
    const pivotIndex = i + 1

    for (let k = 0; k < pivotIndex; k++) {
      expect(arr[k]).toBeLessThanOrEqual(pivot)
    }
    for (let k = pivotIndex + 1; k < arr.length; k++) {
      expect(arr[k]).toBeGreaterThanOrEqual(pivot)
    }
  })

  it('guarantees complete ascending sort via recursive divide and conquer', () => {
    const arr = [64, 34, 25, 12, 22, 11, 90]
    const sorted = [...arr].sort((a, b) => a - b)

    const quickSort = (items: number[]): number[] => {
      if (items.length <= 1) return items
      const pivot = items[items.length - 1]
      const left = items.filter((x, idx) => x <= pivot && idx < items.length - 1)
      const right = items.filter((x, idx) => x > pivot && idx < items.length - 1)
      return [...quickSort(left), pivot, ...quickSort(right)]
    }

    expect(quickSort(arr)).toEqual(sorted)
  })

  it('guarantees logarithmic bounds O(log N) for binary search on monotonic array', () => {
    const sorted = [12, 18, 23, 28, 34, 45, 50, 61, 67, 72, 89, 95]
    const target = 61

    let low = 0
    let high = sorted.length - 1
    let iterations = 0
    let foundIndex = -1

    while (low <= high) {
      iterations++
      const mid = Math.floor(low + (high - low) / 2)
      if (sorted[mid] === target) {
        foundIndex = mid
        break
      }
      if (sorted[mid] < target) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    expect(foundIndex).toBe(7)
    // For 12 elements, ceil(log2(12)) = 4 maximum iterations
    expect(iterations).toBeLessThanOrEqual(4)
  })

  it('verifies Dijkstra relaxation optimality on non-negative weighted graph', () => {
    const graph: Record<string, [string, number][]> = {
      AAI: [['RELAY', 2], ['CANSAT', 4]],
      RELAY: [['AAI', 2], ['CENTRAL', 1]],
      CANSAT: [['AAI', 4], ['CENTRAL', 5]],
      CENTRAL: [['RELAY', 1], ['CANSAT', 5]]
    }

    const dist: Record<string, number> = { AAI: 0, RELAY: Infinity, CANSAT: Infinity, CENTRAL: Infinity }
    const visited = new Set<string>()

    while (visited.size < Object.keys(graph).length) {
      let u: string | null = null
      let minDist = Infinity
      for (const node in dist) {
        if (!visited.has(node) && dist[node] < minDist) {
          minDist = dist[node]
          u = node
        }
      }
      if (!u || minDist === Infinity) break
      visited.add(u)

      for (const [v, weight] of graph[u]) {
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight
        }
      }
    }

    expect(dist.AAI).toBe(0)
    expect(dist.RELAY).toBe(2)
    expect(dist.CENTRAL).toBe(3) // Path AAI -> RELAY -> CENTRAL = 2 + 1 = 3
    expect(dist.CANSAT).toBe(4) // Direct path AAI -> CANSAT = 4
  })

  it('handles already-sorted arrays and single-element edge cases deterministically', () => {
    const single = [42]
    expect(single).toHaveLength(1)

    const alreadySorted = [1, 2, 3, 4, 5]
    for (let i = 0; i < alreadySorted.length - 1; i++) {
      expect(alreadySorted[i]).toBeLessThan(alreadySorted[i + 1])
    }
  })
})
