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

  it('directly renders the main site without entrance blockades', () => {
    render(<App />)
    // No blocking dialogs on load
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    // Hero introduction is immediately accessible
    expect(screen.getByRole('region', { name: /introduction/i })).toBeInTheDocument()
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

  it('renders all 6 navigation sections directly', () => {
    render(<App />)

    expect(screen.getByRole('region', { name: /introduction/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /about dev jangid/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /professional experience/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /technical skills/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /engineering highlights and projects/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /academic history/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /contact dev jangid/i })).toBeInTheDocument()
  })

  it('opens and closes the verified resume modal from the navbar', () => {
    render(<App />)

    const resumeBtn = screen.getByRole('button', { name: /inspect verified resume pdf/i })
    fireEvent.click(resumeBtn)

    const modalDialog = screen.getByRole('dialog', { name: /verified resume/i })
    expect(modalDialog).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: /close resume modal/i })
    fireEvent.click(closeBtn)

    expect(screen.queryByRole('dialog', { name: /verified resume/i })).not.toBeInTheDocument()
  })
})
