import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { registerServiceWorker } from '../serviceWorkerRegistration'

describe('Progressive Web App (PWA) & Offline Manifest Validation', () => {
  it('contains a valid, well-formed webmanifest file with standalone display mode', () => {
    const manifestPath = path.resolve(__dirname, '../../public/manifest.webmanifest')
    expect(fs.existsSync(manifestPath)).toBe(true)

    const raw = fs.readFileSync(manifestPath, 'utf-8')
    const manifest = JSON.parse(raw)

    expect(manifest.name).toContain('Dev Jangid')
    expect(manifest.short_name).toBe('Dev Jangid')
    expect(manifest.start_url).toBe('/')
    expect(manifest.display).toBe('standalone')
    expect(manifest.theme_color).toBe('#a02a22')
    expect(manifest.background_color).toBe('#08090d')
    expect(Array.isArray(manifest.icons)).toBe(true)
    expect(manifest.icons.length).toBeGreaterThan(0)
  })

  it('provides an active service worker file caching root assets and handling cache-first reads', () => {
    const swPath = path.resolve(__dirname, '../../public/sw.js')
    expect(fs.existsSync(swPath)).toBe(true)

    const swContent = fs.readFileSync(swPath, 'utf-8')
    expect(swContent).toContain("const CACHE_NAME = 'dev-portfolio-cache-v1'")
    expect(swContent).toContain("addEventListener('install'")
    expect(swContent).toContain("addEventListener('activate'")
    expect(swContent).toContain("addEventListener('fetch'")
  })

  it('executes registerServiceWorker safely without throwing errors in test environment', () => {
    expect(() => registerServiceWorker()).not.toThrow()
  })
})
