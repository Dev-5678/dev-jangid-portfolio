import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ContactSection } from '../sections/ContactSection'

describe('Contact Section & Formspree Integration', () => {
  it('renders direct contact channels with verified email and phone', () => {
    render(<ContactSection />)

    const emailLink = screen.getByRole('link', { name: /jangid\.dev20@gmail\.com/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:jangid.dev20@gmail.com')

    const phoneLink = screen.getByRole('link', { name: /\+91 92125 53300/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:9212553300')
  })

  it('renders all required form inputs and detects empty submissions', () => {
    render(<ContactSection />)

    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/your email/i)
    const subjectInput = screen.getByLabelText(/subject/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitBtn = screen.getByRole('button', { name: /dispatch transmission/i })

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(subjectInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()

    // Submit with empty inputs
    fireEvent.click(submitBtn)

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument()
    expect(screen.getByText(/subject line is required/i)).toBeInTheDocument()
    expect(screen.getByText(/message content is required/i)).toBeInTheDocument()
  })

  it('validates email format and message minimum length', () => {
    render(<ContactSection />)

    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/your email/i)
    const subjectInput = screen.getByLabelText(/subject/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitBtn = screen.getByRole('button', { name: /dispatch transmission/i })

    fireEvent.change(nameInput, { target: { value: 'Dev Tester' } })
    fireEvent.change(emailInput, { target: { value: 'invalid-email-address' } })
    fireEvent.change(subjectInput, { target: { value: 'Inquiry' } })
    fireEvent.change(messageInput, { target: { value: 'Short msg' } })

    fireEvent.click(submitBtn)

    expect(screen.getByText(/please provide a valid email address/i)).toBeInTheDocument()
    expect(screen.getByText(/message must be at least 15 characters long/i)).toBeInTheDocument()
  })
})
