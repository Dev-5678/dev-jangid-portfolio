import { describe, it, expect } from 'vitest';

interface NetworkState {
  isOnline: boolean;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  saveData: boolean;
}

function computeAdaptiveAssetStrategy(state: NetworkState): {
  loadHighResMedia: boolean;
  preloadNextRoutes: boolean;
  heartbeatIntervalMs: number;
} {
  if (!state.isOnline || state.saveData || state.effectiveType === '2g' || state.effectiveType === 'slow-2g') {
    return {
      loadHighResMedia: false,
      preloadNextRoutes: false,
      heartbeatIntervalMs: 30000,
    };
  }

  if (state.effectiveType === '3g') {
    return {
      loadHighResMedia: false,
      preloadNextRoutes: true,
      heartbeatIntervalMs: 15000,
    };
  }

  return {
    loadHighResMedia: true,
    preloadNextRoutes: true,
    heartbeatIntervalMs: 5000,
  };
}

describe('Network Resilience & Adaptive Media Delivery', () => {
  it('throttles heavy assets and background preloading on constrained network tiers', () => {
    const offlineStrategy = computeAdaptiveAssetStrategy({
      isOnline: false,
      effectiveType: '4g',
      saveData: false,
    });
    expect(offlineStrategy.loadHighResMedia).toBe(false);
    expect(offlineStrategy.preloadNextRoutes).toBe(false);

    const constrainedStrategy = computeAdaptiveAssetStrategy({
      isOnline: true,
      effectiveType: '2g',
      saveData: false,
    });
    expect(constrainedStrategy.loadHighResMedia).toBe(false);
    expect(constrainedStrategy.heartbeatIntervalMs).toBe(30000);

    const optimalStrategy = computeAdaptiveAssetStrategy({
      isOnline: true,
      effectiveType: '4g',
      saveData: false,
    });
    expect(optimalStrategy.loadHighResMedia).toBe(true);
    expect(optimalStrategy.preloadNextRoutes).toBe(true);
    expect(optimalStrategy.heartbeatIntervalMs).toBe(5000);
  });
});
