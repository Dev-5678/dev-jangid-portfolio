import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InteractiveSkillsKeyboard, KEYBOARD_SKILLS } from '../components/InteractiveSkillsKeyboard'

describe('InteractiveSkillsKeyboard Component', () => {
  it('renders the hardware macropad title, status indicators, and 28 keys', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getByText(/Dev-MK64 Mechanical Core/i)).toBeInTheDocument()
    expect(screen.getByText(/28 Switches/i)).toBeInTheDocument()
    expect(KEYBOARD_SKILLS.length).toBe(28)
  })

  it('renders keycaps for core programming languages (TS, JS, PY, C++, C, Java, HTML5)', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getAllByText('TS').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.getByText('PY')).toBeInTheDocument()
    expect(screen.getByText('C++')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('JAVA')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('updates telemetry HUD when clicking a keycap', () => {
    render(<InteractiveSkillsKeyboard />)

    // Click on Python key
    const pyKey = screen.getByText('PY')
    fireEvent.click(pyKey)

    // The HUD should display Python 3
    expect(screen.getByText('Python 3')).toBeInTheDocument()
    expect(screen.getByText(/AI & Data Pipelines/i)).toBeInTheDocument()
  })

  it('toggles audio on/off when clicking audio button', () => {
    render(<InteractiveSkillsKeyboard />)

    const audioButton = screen.getByTitle(/Mute Mechanical Switch Audio/i)
    expect(audioButton).toHaveTextContent(/AUDIO ON/i)

    fireEvent.click(audioButton)
    expect(audioButton).toHaveTextContent(/MUTED/i)
  })

  it('toggles 3D Isometric / 2D Studio perspective view', () => {
    render(<InteractiveSkillsKeyboard />)

    const viewButton = screen.getByTitle(/Toggle between 3D Isometric View and Flat Studio View/i)
    expect(viewButton).toHaveTextContent(/3D ISOMETRIC/i)

    fireEvent.click(viewButton)
    expect(viewButton).toHaveTextContent(/2D STUDIO/i)
  })

  it('filters keycaps when selecting a category layer', () => {
    render(<InteractiveSkillsKeyboard />)

    const languagesTab = screen.getByText('Languages')
    fireEvent.click(languagesTab)

    expect(languagesTab).toHaveClass('bg-ember')
  })
})
