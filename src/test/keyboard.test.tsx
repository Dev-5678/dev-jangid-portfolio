import { describe, it, expect, vi } from 'vitest'
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

  it('updates telemetry HUD and increments actuation counter when clicking keycaps', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getByText('ACTUATIONS:')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()

    const pyKeyButton = screen.getByLabelText(/Python 3 keycap/i)
    fireEvent.click(pyKeyButton)

    expect(screen.getByText('Python 3')).toBeInTheDocument()
    expect(screen.getAllByText(/AI & Data Pipelines/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders realistic switch specs in the hardware OLED bar', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getByText(/SWITCH STEM:/i)).toBeInTheDocument()
    expect(screen.getByText(/ACTUATION FORCE:/i)).toBeInTheDocument()
    expect(screen.getByText(/TRAVEL:/i)).toBeInTheDocument()
  })

  it('cross-links keycap to portfolio project and triggers smooth scroll', () => {
    const targetDiv = document.createElement('div')
    targetDiv.id = 'high-throughput-systems'
    const scrollMock = vi.fn()
    targetDiv.scrollIntoView = scrollMock
    document.body.appendChild(targetDiv)

    render(<InteractiveSkillsKeyboard />)

    const projectJumpBtn = screen.getByTitle(/Jump to/i)
    fireEvent.click(projectJumpBtn)

    expect(scrollMock).toHaveBeenCalled()
    document.body.removeChild(targetDiv)
  })

  it('updates telemetry HUD when hovering a keycap', () => {
    render(<InteractiveSkillsKeyboard />)

    const reactKeyButton = screen.getByLabelText(/React 19 keycap/i)
    fireEvent.pointerEnter(reactKeyButton)

    expect(screen.getByText('React 19')).toBeInTheDocument()
    expect(screen.getAllByText(/State & Motion Physics/i).length).toBeGreaterThanOrEqual(1)
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
