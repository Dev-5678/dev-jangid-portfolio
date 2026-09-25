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

  it('renders keycaps for core programming languages (C, C++, Java, Python, TS, JS, SQL, Git)', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getAllByText('C').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('C++')).toBeInTheDocument()
    expect(screen.getAllByText('Java').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Python').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('TS')).toBeInTheDocument()
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.getByText('SQL')).toBeInTheDocument()
    expect(screen.getByText('Git')).toBeInTheDocument()
  })

  it('updates inspection legend when clicking keycaps (clean names without cheesy versions)', () => {
    render(<InteractiveSkillsKeyboard />)

    const pyKeyButton = screen.getByLabelText(/Python keycap/i)
    fireEvent.click(pyKeyButton)

    // Name is clean "Python" (both on keycap and in inspection legend)
    expect(screen.getAllByText('Python').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText(/AI model orchestration, data pipelines/i).length).toBeGreaterThanOrEqual(1)

    // Git key click
    const gitKeyButton = screen.getByLabelText(/Git keycap/i)
    fireEvent.click(gitKeyButton)

    // Name is clean "Git" (both on keycap and in inspection legend)
    expect(screen.getAllByText('Git').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText(/Distributed version control, branching strategies/i).length).toBeGreaterThanOrEqual(1)
  })

  it('updates inspection legend when hovering a keycap', () => {
    render(<InteractiveSkillsKeyboard />)

    const reactKeyButton = screen.getByLabelText(/React keycap/i)
    fireEvent.pointerEnter(reactKeyButton)

    // Name is clean "React" (both on keycap and in inspection legend)
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText(/Component lifecycles, custom hooks/i).length).toBeGreaterThanOrEqual(1)
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
