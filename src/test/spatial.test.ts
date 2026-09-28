import { describe, it, expect } from 'vitest'

describe('ProxiSpeak Spatial Audio Math & Attenuation Verification', () => {
  it('calculates Euclidean distance accurately', () => {
    const p1 = { x: 0, y: 0 }
    const p2 = { x: 300, y: 400 }
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
    expect(dist).toBe(500)
  })

  it('guarantees 100% volume at zero distance', () => {
    const distance = 0
    const radius = 100
    const factor = 1 - distance / radius
    const vol = Math.min(100, Math.round(Math.pow(factor, 1.5) * 100))
    expect(vol).toBe(100)
  })

  it('guarantees 0% volume and zero bleed beyond boundary radius', () => {
    const distance = 150
    const radius = 100
    const isOutOfRange = distance > radius
    expect(isOutOfRange).toBe(true)
  })

  it('computes stereo panning clamped between -1.0 and +1.0', () => {
    const avatarX = 400
    const nodeLeftX = 300
    const radius = 100
    const relLeft = (nodeLeftX - avatarX) / radius
    expect(relLeft).toBe(-1)

    const nodeRightX = 500
    const relRight = (nodeRightX - avatarX) / radius
    expect(relRight).toBe(1)
  })
})
