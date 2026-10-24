import { describe, it, expect } from 'vitest'
import { FlatMinHeap } from '../utils/flatMinHeap'

describe('Systems Engine Contiguous Flat Min-Heap Priority Queue', () => {
  it('extracts elements in strictly ascending priority order', () => {
    const heap = new FlatMinHeap<string>()
    heap.insert('node-5', 50)
    heap.insert('node-1', 10)
    heap.insert('node-3', 30)
    heap.insert('node-2', 20)
    heap.insert('node-4', 40)

    expect(heap.size).toBe(5)
    expect(heap.peek()).toBe('node-1')

    expect(heap.extractMin()).toBe('node-1')
    expect(heap.extractMin()).toBe('node-2')
    expect(heap.extractMin()).toBe('node-3')
    expect(heap.extractMin()).toBe('node-4')
    expect(heap.extractMin()).toBe('node-5')
    expect(heap.isEmpty()).toBe(true)
    expect(heap.extractMin()).toBeUndefined()
  })

  it('handles negative and fractional priority weights correctly', () => {
    const heap = new FlatMinHeap<string>()
    heap.insert('packet-c', 0.5)
    heap.insert('packet-a', -12.4)
    heap.insert('packet-b', -2.1)

    expect(heap.extractMin()).toBe('packet-a')
    expect(heap.extractMin()).toBe('packet-b')
    expect(heap.extractMin()).toBe('packet-c')
  })
})
