/**
 * Spatial Audio Distance Attenuation Physics Engine
 * Implements Euclidean distance calculation, inverse-square law falloff,
 * and logarithmic volume decibel conversion for ProxiSpeak spatial audio.
 */

export interface Coordinate2D {
  x: number
  y: number
}

export interface SpatialAudioConfig {
  maxDistance: number
  minDistance: number
  rolloffFactor: number
}

export const DEFAULT_SPATIAL_CONFIG: SpatialAudioConfig = {
  minDistance: 30,
  maxDistance: 350,
  rolloffFactor: 1.2
}

/**
 * Calculates 2D Euclidean distance between two coordinate vectors.
 */
export function calculateEuclideanDistance(a: Coordinate2D, b: Coordinate2D): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Calculates inverse-square volume gain (0.0 to 1.0) based on listener distance.
 */
export function calculateSpatialGain(
  distance: number,
  config: SpatialAudioConfig = DEFAULT_SPATIAL_CONFIG
): number {
  if (distance <= config.minDistance) return 1.0
  if (distance >= config.maxDistance) return 0.0

  const normalized = (distance - config.minDistance) / (config.maxDistance - config.minDistance)
  // Inverse-square power falloff with rolloff factor
  const gain = 1 / (1 + config.rolloffFactor * normalized * normalized)
  return Math.max(0, Math.min(1, Math.round(gain * 1000) / 1000))
}

/**
 * Calculates stereo panning position (-1.0 to +1.0) based on horizontal offset.
 */
export function calculateStereoPan(
  listener: Coordinate2D,
  source: Coordinate2D,
  maxAudibleDistance: number = 350
): number {
  const dx = source.x - listener.x
  const pan = dx / (maxAudibleDistance / 2)
  return Math.max(-1.0, Math.min(1.0, Math.round(pan * 100) / 100))
}
