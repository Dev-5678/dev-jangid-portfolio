/**
 * HyperRoute High-Throughput Token Bucket Rate Limiter
 * Implements monotonic fractional refill token bucket with burst capacity handling.
 */

export interface TokenBucketOptions {
  capacity: number
  refillRatePerSecond: number
}

export class TokenBucket {
  private tokens: number
  private capacity: number
  private refillRate: number
  private lastRefillTimestamp: number

  constructor(options: TokenBucketOptions, initialTimestamp: number = Date.now()) {
    this.capacity = options.capacity
    this.tokens = options.capacity
    this.refillRate = options.refillRatePerSecond
    this.lastRefillTimestamp = initialTimestamp
  }

  private refill(currentTimestamp: number): void {
    if (currentTimestamp <= this.lastRefillTimestamp) return

    const elapsedSeconds = (currentTimestamp - this.lastRefillTimestamp) / 1000
    const addedTokens = elapsedSeconds * this.refillRate
    this.tokens = Math.min(this.capacity, this.tokens + addedTokens)
    this.lastRefillTimestamp = currentTimestamp
  }

  tryConsume(tokensRequired: number = 1, currentTimestamp: number = Date.now()): boolean {
    this.refill(currentTimestamp)

    if (this.tokens >= tokensRequired) {
      this.tokens -= tokensRequired
      return true
    }

    return false
  }

  getAvailableTokens(currentTimestamp: number = Date.now()): number {
    this.refill(currentTimestamp)
    return Math.floor(this.tokens)
  }
}
