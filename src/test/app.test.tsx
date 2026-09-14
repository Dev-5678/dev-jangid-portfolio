import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App Root Integration & Accessibility', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('renders accessible skip to main content link', () => {
    render(<App />)
    const skipLink = screen.getByRole('link', { name: /skip to main content/i })
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('renders portal entry dialog and allows entering main site', () => {
    render(<App />)
    const portalDialog = screen.getByRole('dialog')
    expect(portalDialog).toBeInTheDocument()

    const enterBtn = screen.getByRole('button', { name: /direct access/i })
    fireEvent.click(enterBtn)

    // After entering, dialog is dismissed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('toggles dark and light mode and persists in localStorage', () => {
    render(<App />)
    const themeBtn = screen.getByRole('button', { name: /switch to (dark|light) mode/i })
    expect(themeBtn).toBeInTheDocument()

    const initialAriaPressed = themeBtn.getAttribute('aria-pressed')
    fireEvent.click(themeBtn)

    const updatedAriaPressed = themeBtn.getAttribute('aria-pressed')
    expect(updatedAriaPressed).not.toBe(initialAriaPressed)
    expect(localStorage.getItem('theme')).toBe(updatedAriaPressed === 'true' ? 'dark' : 'light')
  })

  it('renders all 6 navigation sections', () => {
    render(<App />)
    // Dismiss portal
    const directBtn = screen.getByRole('button', { name: /direct access/i })
    fireEvent.click(directBtn)

    expect(screen.getByRole('region', { name: /introduction/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /about dev jangid/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /professional experience/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /technical skills/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /engineering highlights and projects/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /academic history/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /contact dev jangid/i })).toBeInTheDocument()
  })
})
