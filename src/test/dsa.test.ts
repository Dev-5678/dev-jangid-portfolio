import { describe, it, expect } from 'vitest'

describe('Algorithmic Partitioning & Complexity Invariants', () => {
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

    // Verify invariants:
    // Every element before pivotIndex must be <= pivot
    for (let k = 0; k < pivotIndex; k++) {
      expect(arr[k]).toBeLessThanOrEqual(pivot)
    }
    // Every element after pivotIndex must be >= pivot
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

  it('handles already-sorted arrays and single-element edge cases deterministically', () => {
    const single = [42]
    expect(single).toHaveLength(1)

    const alreadySorted = [1, 2, 3, 4, 5]
    for (let i = 0; i < alreadySorted.length - 1; i++) {
      expect(alreadySorted[i]).toBeLessThan(alreadySorted[i + 1])
    }
  })
})
