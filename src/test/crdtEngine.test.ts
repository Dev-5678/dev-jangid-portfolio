import { describe, it, expect } from 'vitest'
import { LWWElementSet } from '../utils/crdtEngine'

describe('LWW-Element-Set CRDT Engine for Collaborative Canvas', () => {
  it('correctly tracks elements added to the set', () => {
    const set = new LWWElementSet<{ x: number; y: number; color: string }>()
    set.add('node-1', { x: 100, y: 150, color: '#fc6b2f' }, 1000, 'peer-A')

    expect(set.has('node-1')).toBe(true)
    expect(set.get('node-1')).toEqual({ x: 100, y: 150, color: '#fc6b2f' })
  })

  it('honors deletions when remove timestamp is newer than add timestamp', () => {
    const set = new LWWElementSet<string>()
    set.add('rect-1', 'Rectangle A', 1000, 'peer-A')
    set.remove('rect-1', 1005)

    expect(set.has('rect-1')).toBe(false)
  })

  it('keeps element alive if re-added with higher timestamp after removal', () => {
    const set = new LWWElementSet<string>()
    set.add('rect-1', 'Rectangle A', 1000, 'peer-A')
    set.remove('rect-1', 1005)
    set.add('rect-1', 'Rectangle A (Restored)', 1010, 'peer-B')

    expect(set.has('rect-1')).toBe(true)
    expect(set.get('rect-1')).toBe('Rectangle A (Restored)')
  })

  it('achieves strong eventual consistency when two divergent replicas merge commutative states', () => {
    const clientA = new LWWElementSet<string>()
    const clientB = new LWWElementSet<string>()

    // Client A operations
    clientA.add('circle-1', 'Circle Red', 2000, 'client-A')
    clientA.add('line-1', 'Line Blue', 2005, 'client-A')

    // Client B operations (concurrent)
    clientB.add('rect-1', 'Rect Green', 2002, 'client-B')
    clientB.add('line-1', 'Line Updated', 2010, 'client-B') // newer than A

    // Bi-directional merge
    clientA.merge(clientB)
    clientB.merge(clientA)

    expect(clientA.getAll().sort()).toEqual(clientB.getAll().sort())
    expect(clientA.get('line-1')).toBe('Line Updated')
    expect(clientB.get('line-1')).toBe('Line Updated')
  })
})
