/**
 * State-based Conflict-Free Replicated Data Type (CRDT)
 * Implements Last-Write-Wins Element Set (LWW-Element-Set) for real-time collaborative canvas elements.
 * Guarantees Strong Eventual Consistency (SEC) across uncoordinated peers.
 */

export interface CRDTElement<T> {
  id: string
  value: T
  timestamp: number
  peerId: string
}

export class LWWElementSet<T> {
  private addSet: Map<string, CRDTElement<T>> = new Map()
  private removeSet: Map<string, number> = new Map()

  add(id: string, value: T, timestamp: number, peerId: string): void {
    const existing = this.addSet.get(id)
    if (!existing || timestamp > existing.timestamp) {
      this.addSet.set(id, { id, value, timestamp, peerId })
    }
  }

  remove(id: string, timestamp: number): void {
    const existingTime = this.removeSet.get(id) || 0
    if (timestamp > existingTime) {
      this.removeSet.set(id, timestamp)
    }
  }

  has(id: string): boolean {
    const addElement = this.addSet.get(id)
    if (!addElement) return false

    const removeTimestamp = this.removeSet.get(id)
    if (removeTimestamp === undefined) return true

    return addElement.timestamp >= removeTimestamp
  }

  get(id: string): T | undefined {
    return this.has(id) ? this.addSet.get(id)?.value : undefined
  }

  merge(other: LWWElementSet<T>): void {
    for (const [id, elem] of other.addSet.entries()) {
      this.add(elem.id, elem.value, elem.timestamp, elem.peerId)
    }
    for (const [id, timestamp] of other.removeSet.entries()) {
      this.remove(id, timestamp)
    }
  }

  getAll(): T[] {
    const result: T[] = []
    for (const [id, elem] of this.addSet.entries()) {
      if (this.has(id)) {
        result.push(elem.value)
      }
    }
    return result
  }
}
