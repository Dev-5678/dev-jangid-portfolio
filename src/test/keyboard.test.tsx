import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InteractiveSkillsKeyboard, KEYBOARD_SKILLS } from '../components/InteractiveSkillsKeyboard'

describe('InteractiveSkillsKeyboard Component', () => {
  it('renders the hardware macropad title, status indicators, and 28 keys', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getByText(/Interactive Tech Stack/i)).toBeInTheDocument()
    expect(screen.getByText(/Tactile Stack \/\/ Interactive Hardware/i)).toBeInTheDocument()
    expect(screen.getAllByText(/28 Switches/i).length).toBeGreaterThanOrEqual(1)
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

  it('updates inspection legend when clicking keycaps', () => {
    render(<InteractiveSkillsKeyboard />)

    const pyKeyButton = screen.getByLabelText(/Python 3 keycap/i)
    fireEvent.click(pyKeyButton)

    expect(screen.getByText('Python 3')).toBeInTheDocument()
    expect(screen.getAllByText(/Multimodal AI, semantic vector search backends/i).length).toBeGreaterThanOrEqual(1)
  })

  it('updates inspection legend when hovering a keycap', () => {
    render(<InteractiveSkillsKeyboard />)

    const reactKeyButton = screen.getByLabelText(/React 19 keycap/i)
    fireEvent.pointerEnter(reactKeyButton)

    expect(screen.getByText('React 19')).toBeInTheDocument()
    expect(screen.getAllByText(/Concurrent hooks, state compiler/i).length).toBeGreaterThanOrEqual(1)
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
})
