import zlib from 'node:zlib'
import '@testing-library/jest-dom/vitest'

// Polyfill Node.js zlib Zstandard for undici/vitest compatibility across Node versions
if (typeof zlib === 'object' && zlib !== null && !(zlib as any).createZstdDecompress) {
  (zlib as any).createZstdDecompress = () => ({
    on: () => {},
    once: () => {},
    emit: () => {},
    end: () => {},
    write: () => {},
  })
}

// Mock window.matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock ResizeObserver for JSDOM
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver

// Mock IntersectionObserver for JSDOM
class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
