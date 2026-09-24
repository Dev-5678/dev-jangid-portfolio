import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { InteractiveSkillsKeyboard, KEYBOARD_SKILLS } from '../components/InteractiveSkillsKeyboard'

describe('InteractiveSkillsKeyboard Component', () => {
  it('renders the hardware macropad title, status indicators, and 28 keys', () => {
    render(<InteractiveSkillsKeyboard />)

    expect(screen.getByText(/Dev-MK64 Mechanical Core/i)).toBeInTheDocument()
    expect(screen.getByText(/28 Hot-Swap Switches/i)).toBeInTheDocument()
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

  it('updates telemetry HUD when clicking a keycap via pointerdown', () => {
    render(<InteractiveSkillsKeyboard />)

    const pyKeyButton = screen.getByLabelText(/Python 3 mechanical keycap/i)
    fireEvent.pointerDown(pyKeyButton)

    expect(screen.getByText('Python 3')).toBeInTheDocument()
    expect(screen.getByText(/AI & Data Pipelines/i)).toBeInTheDocument()
  })

  it('actuates key when typing on physical keyboard', () => {
    render(<InteractiveSkillsKeyboard />)

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }))
    })

    // React 19 should be actuated
    expect(screen.getByText('React 19')).toBeInTheDocument()
    expect(screen.getByText(/State & Motion Physics/i)).toBeInTheDocument()
  })

  it('cycles switch acoustic sound profiles', () => {
    render(<InteractiveSkillsKeyboard />)

    const switchBtn = screen.getByTitle(/Cycle switch sound acoustics/i)
    expect(switchBtn).toHaveTextContent(/THOCK SWITCH/i)

    fireEvent.click(switchBtn)
    expect(switchBtn).toHaveTextContent(/CLICKY SWITCH/i)

    fireEvent.click(switchBtn)
    expect(switchBtn).toHaveTextContent(/LINEAR SWITCH/i)
  })

  it('cycles RGB matrix lighting modes', () => {
    render(<InteractiveSkillsKeyboard />)

    const rgbBtn = screen.getByTitle(/Cycle RGB Backlight Animation Mode/i)
    expect(rgbBtn).toHaveTextContent(/RGB: STATIC/i)

    fireEvent.click(rgbBtn)
    expect(rgbBtn).toHaveTextContent(/RGB: RIPPLE/i)
  })

  it('simulates code execution in the micro-terminal when RUN CODE is clicked', async () => {
    vi.useFakeTimers()
    render(<InteractiveSkillsKeyboard />)

    const runBtn = screen.getByText('RUN CODE')
    fireEvent.click(runBtn)

    expect(screen.getByText(/Compiling & running execution pipeline/i)).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/TypeScript compiler: 0 errors/i)).toBeInTheDocument()
    vi.useRealTimers()
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
