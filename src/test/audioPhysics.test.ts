import { describe, it, expect } from 'vitest'
import {
  calculateEuclideanDistance,
  calculateSpatialGain,
  calculateStereoPan,
  DEFAULT_SPATIAL_CONFIG
} from '../utils/audioPhysics'

describe('Spatial Audio Distance & Stereo Panning Physics Engine', () => {
  it('correctly calculates 2D Euclidean distance between coordinates', () => {
    const p1 = { x: 0, y: 0 }
    const p2 = { x: 30, y: 40 }
    expect(calculateEuclideanDistance(p1, p2)).toBe(50)
  })

  it('clamps audio gain to 1.0 within the minimum threshold zone', () => {
    expect(calculateSpatialGain(15, DEFAULT_SPATIAL_CONFIG)).toBe(1.0)
    expect(calculateSpatialGain(30, DEFAULT_SPATIAL_CONFIG)).toBe(1.0)
  })

  it('drops audio gain to 0.0 beyond maximum audible boundary', () => {
    expect(calculateSpatialGain(350, DEFAULT_SPATIAL_CONFIG)).toBe(0.0)
    expect(calculateSpatialGain(500, DEFAULT_SPATIAL_CONFIG)).toBe(0.0)
  })

  it('calculates logarithmic falloff monotonically between min and max distances', () => {
    const gainNear = calculateSpatialGain(80, DEFAULT_SPATIAL_CONFIG)
    const gainFar = calculateSpatialGain(200, DEFAULT_SPATIAL_CONFIG)
    expect(gainNear).toBeGreaterThan(gainFar)
    expect(gainNear).toBeLessThan(1.0)
    expect(gainFar).toBeGreaterThan(0.0)
  })

  it('calculates directional stereo panning between left, center, and right coordinates', () => {
    const listener = { x: 200, y: 200 }
    const sourceCenter = { x: 200, y: 150 }
    const sourceRight = { x: 375, y: 200 }
    const sourceLeft = { x: 25, y: 200 }

    expect(calculateStereoPan(listener, sourceCenter)).toBe(0)
    expect(calculateStereoPan(listener, sourceRight)).toBe(1.0)
    expect(calculateStereoPan(listener, sourceLeft)).toBe(-1.0)
  })
})
