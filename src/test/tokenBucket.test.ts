import { describe, it, expect } from 'vitest'
import { TokenBucket } from '../utils/tokenBucket'

describe('HyperRoute Token Bucket Rate Limiter', () => {
  it('allows consumption up to full burst capacity', () => {
    const bucket = new TokenBucket({ capacity: 5, refillRatePerSecond: 1 }, 1000)

    for (let i = 0; i < 5; i++) {
      expect(bucket.tryConsume(1, 1000)).toBe(true)
    }

    // Capacity exhausted at same timestamp
    expect(bucket.tryConsume(1, 1000)).toBe(false)
  })

  it('refills tokens monotonically over elapsed time', () => {
    const bucket = new TokenBucket({ capacity: 10, refillRatePerSecond: 2 }, 1000)

    // Consume all 10 tokens
    expect(bucket.tryConsume(10, 1000)).toBe(true)
    expect(bucket.tryConsume(1, 1000)).toBe(false)

    // After 2.5 seconds, 5 tokens refill (2.5 * 2 = 5)
    expect(bucket.tryConsume(5, 3500)).toBe(true)
    expect(bucket.tryConsume(1, 3500)).toBe(false)
  })

  it('clamps tokens to max capacity when idle for extended periods', () => {
    const bucket = new TokenBucket({ capacity: 5, refillRatePerSecond: 1 }, 1000)

    // Fast forward 1 hour
    expect(bucket.getAvailableTokens(3600000)).toBe(5)
  })
})
