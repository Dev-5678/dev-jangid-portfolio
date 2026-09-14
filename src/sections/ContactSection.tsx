import React, { useState, useEffect, useRef } from 'react'
import { personalInfo } from '../data/portfolio'
import { SpotlightCard } from '../components/reactbits/SpotlightCard'
import { Magnet } from '../components/reactbits/Magnet'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, Loader2, Terminal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  _gotcha: string // honeypot
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || ''

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject line is required.'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required.'
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear inline error on edit
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check: If bot filled the hidden _gotcha field, silently drop
    if (formData._gotcha) {
      setStatus('success')
      return
    }

    if (!validate()) return

    // If Formspree ID is not configured, inform the user clearly
    if (!formId) {
      setStatus('error')
      setErrorMessage(
        'Formspree form ID is not configured (VITE_FORMSPREE_FORM_ID). Please reach out directly via jangid.dev20@gmail.com while deployment credentials are being finalized.'
      )
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _gotcha: ''
        })
      } else {
        setStatus('error')
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(', '))
        } else {
          setErrorMessage('Unable to deliver message at this time. Please retry or contact directly.')
        }
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network connection failure. Please check your internet connection or email directly.')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact Dev Jangid"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[06]</span>
            <span>TRANSMISSION // CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            GET IN TOUCH
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 dark:text-gray-400 max-w-xs">
          Open to software engineering roles, technical internships, and collaborative development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <SpotlightCard
            spotlightColor="rgba(0, 229, 255, 0.15)"
            className="contact-card p-6 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[5px_5px_0px_#111317] dark:shadow-[5px_5px_0px_#1E293B]"
          >
            <h3 className="font-mono text-xs font-bold text-[#FF5500] dark:text-[#CCFF00] uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
              DIRECT_CHANNELS
            </h3>

            {/* Email */}
            <div className="mb-6">
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 block mb-1">
                PRIMARY EMAIL
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-mono text-sm sm:text-base font-bold text-[#111317] dark:text-[#F4F7FB] hover:text-[#CCFF00] dark:hover:text-[#CCFF00] flex items-center gap-2 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 block mb-1">
                TELEPHONE (CALL / SMS)
              </span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="font-mono text-sm sm:text-base font-bold text-[#111317] dark:text-[#F4F7FB] hover:text-[#CCFF00] dark:hover:text-[#CCFF00] flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#CCFF00] flex-shrink-0" />
                <span>{personalInfo.displayPhone}</span>
              </a>
            </div>

            {/* Location */}
            <div>
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 block mb-1">
                GEOGRAPHIC LOCATION
              </span>
              <div className="font-mono text-sm font-bold text-[#111317] dark:text-[#F4F7FB] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF5500] flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Formspree Status Callout */}
          <div className="contact-card p-5 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] font-mono text-xs">
            <div className="flex items-center gap-2 text-[#111317] dark:text-[#CCFF00] font-bold mb-2">
              <Terminal className="w-4 h-4" />
              <span>DISPATCH_SYSTEM: FORMSPREE</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
              Submissions are delivered directly to Dev Jangid via Formspree webhook dispatch with real-time field validation and anti-spam protection.
            </p>
          </div>
        </div>

        {/* Contact Form (7 cols) with Spotlight Card */}
        <div className="lg:col-span-7">
          <SpotlightCard
            spotlightColor="rgba(204, 255, 0, 0.12)"
            className="contact-card p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#CCFF00]"
          >
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] mb-2">
              Send a Transmission
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 font-mono">
              Fill in the parameters below to establish communications.
            </p>

            {/* Success Announcement */}
            {status === 'success' && (
              <div
                role="alert"
                className="mb-6 p-4 bg-[#CCFF00]/20 border-2 border-[#111317] dark:border-[#CCFF00] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#111317] dark:text-[#CCFF00] flex-shrink-0 mt-0.5" />
                <div className="font-mono text-xs">
                  <strong className="block text-[#111317] dark:text-[#CCFF00] uppercase font-bold mb-1">
                    TRANSMISSION SUCCESSFUL
                  </strong>
                  <span className="text-[#111317] dark:text-[#F4F7FB]">
                    Your message has been delivered to Dev Jangid. A response will be provided shortly.
                  </span>
                </div>
              </div>
            )}

            {/* Error Announcement */}
            {status === 'error' && (
              <div
                role="alert"
                className="mb-6 p-4 bg-red-100 dark:bg-red-950/40 border-2 border-red-500 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="font-mono text-xs text-red-800 dark:text-red-300">
                  <strong className="block uppercase font-bold mb-1">SUBMISSION ALERT</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_gotcha">Do not fill this</label>
                <input
                  type="text"
                  id="_gotcha"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-bold uppercase mb-1 text-[#111317] dark:text-[#F4F7FB]">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] focus:border-[#CCFF00] dark:focus:border-[#CCFF00] font-mono text-sm text-[#111317] dark:text-[#F4F7FB] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 font-mono text-xs text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold uppercase mb-1 text-[#111317] dark:text-[#F4F7FB]">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] focus:border-[#CCFF00] dark:focus:border-[#CCFF00] font-mono text-sm text-[#111317] dark:text-[#F4F7FB] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 font-mono text-xs text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase mb-1 text-[#111317] dark:text-[#F4F7FB]">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  placeholder="e.g. Software Engineering Opportunity / Discussion"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] focus:border-[#CCFF00] dark:focus:border-[#CCFF00] font-mono text-sm text-[#111317] dark:text-[#F4F7FB] focus:outline-none transition-colors"
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1 font-mono text-xs text-red-600 dark:text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono font-bold uppercase mb-1 text-[#111317] dark:text-[#F4F7FB]">
                  Message <span className="text-red-500">* (min 15 chars)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] focus:border-[#CCFF00] dark:focus:border-[#CCFF00] font-mono text-sm text-[#111317] dark:text-[#F4F7FB] focus:outline-none transition-colors"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 font-mono text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA with Magnet */}
              <div className="w-full">
                <Magnet padding={20} magnetStrength={0.2} className="w-full">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="brutal-btn w-full py-4 bg-[#CCFF00] hover:bg-[#b8e600] disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-[#111317] font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-3 border-[#111317] shadow-[4px_4px_0px_#111317] dark:shadow-[4px_4px_0px_#CCFF00]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Payload...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Dispatch Transmission</span>
                      </>
                    )}
                  </button>
                </Magnet>
              </div>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
