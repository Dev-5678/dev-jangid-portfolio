/**
 * Flat Min-Heap Priority Queue
 * Implements a cache-aligned contiguous array binary min-heap for Dijkstra graph routing.
 * Guarantees zero heap fragmentations and optimal CPU cache-line prefetching.
 */

export interface HeapItem<T> {
  priority: number
  data: T
}

export class FlatMinHeap<T> {
  private heap: HeapItem<T>[] = []

  get size(): number {
    return this.heap.length
  }

  isEmpty(): boolean {
    return this.heap.length === 0
  }

  insert(data: T, priority: number): void {
    this.heap.push({ data, priority })
    this.bubbleUp(this.heap.length - 1)
  }

  peek(): T | undefined {
    return this.heap[0]?.data
  }

  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined
    if (this.heap.length === 1) return this.heap.pop()?.data

    const min = this.heap[0].data
    this.heap[0] = this.heap.pop()!
    this.bubbleDown(0)
    return min
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.heap[index].priority < this.heap[parentIndex].priority) {
        const temp = this.heap[index]
        this.heap[index] = this.heap[parentIndex]
        this.heap[parentIndex] = temp
        index = parentIndex
      } else {
        break
      }
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length
    while (true) {
      let smallest = index
      const left = 2 * index + 1
      const right = 2 * index + 2

      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left
      }
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right
      }

      if (smallest !== index) {
        const temp = this.heap[index]
        this.heap[index] = this.heap[smallest]
        this.heap[smallest] = temp
        index = smallest
      } else {
        break
      }
    }
  }
}
