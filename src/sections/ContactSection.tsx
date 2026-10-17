import React, { useState } from 'react'
import { personalInfo } from '../data/portfolio'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactSectionProps {
  onCopyText?: (text: string, label: string) => void
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopyText }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[e.target.name]
        return next
      })
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Full name is required.'
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required.'
    if (!formData.message.trim()) {
      errs.message = 'Message content is required.'
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.'
    }
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('error')
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('https://formspree.io/f/xbldwewv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrors({ form: 'Failed to send transmission. Please contact via direct email.' })
      }
    } catch {
      setStatus('error')
      setErrors({ form: 'Network error. Please use direct email.' })
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact Dev Jangid"
      className="relative py-16 sm:py-24 md:py-40 overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" aria-hidden="true" />
      
      {/* Ambient Bottom Ember Glow Pool */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[350px] sm:h-[400px] pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(ellipse, rgba(252,107,47,0.12) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 px-4 sm:px-6 md:px-8">
        <div className="mb-10 sm:mb-16 md:mb-20 text-center">
          <span className="text-ember text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
            Get in Touch
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-3xl mx-auto">
            Let's Create Something Extraordinary
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-ash max-w-xl mx-auto leading-relaxed font-normal">
            Have a project in mind or want to collaborate? Send a message and let's talk.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Left Column: Contact Details (5 cols) */}
          <div className="contact-animate glass-card p-5 sm:p-8 md:p-10 flex flex-col justify-between lg:col-span-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Contact Details</h3>

              <div className="space-y-4 sm:space-y-5">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-ash uppercase tracking-wider mb-0.5 font-semibold">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      onClick={() => onCopyText?.(personalInfo.email, 'Email address')}
                      className="text-sm text-white hover:text-ember transition-colors font-medium break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[11px] text-ash uppercase tracking-wider mb-0.5 font-semibold">Phone</p>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      onClick={() => onCopyText?.(personalInfo.phone, 'Phone number')}
                      className="text-sm text-white hover:text-ember transition-colors font-medium"
                    >
                      {personalInfo.displayPhone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[11px] text-ash uppercase tracking-wider mb-0.5 font-semibold">Location</p>
                    <p className="text-sm text-white font-medium">{personalInfo.location}</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="absolute inset-1 rounded-full border border-emerald-400/50 animate-ping" />
                  </span>
                  <div>
                    <p className="text-[11px] text-ash uppercase tracking-wider mb-0.5 font-semibold">Availability</p>
                    <p className="text-sm text-emerald-400 font-medium">Open to opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[11px] text-ash uppercase tracking-wider mb-3.5 font-semibold">Connect</p>
              <div className="flex gap-2.5 sm:gap-3 flex-wrap">
                <a
                  href={personalInfo.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-ember/40 hover:bg-white/10 transition-all duration-300 group touch-manipulation"
                  title="GitHub"
                >
                  <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-4 h-4 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </a>

                <a
                  href={personalInfo.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-ember/40 hover:bg-white/10 transition-all duration-300 group touch-manipulation"
                  title="LinkedIn"
                >
                  <img src="https://api.iconify.design/simple-icons:linkedin.svg?color=%23ffffff" alt="LinkedIn" className="w-4 h-4 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-ember/40 hover:bg-white/10 transition-all duration-300 group touch-manipulation"
                  title="Email Direct"
                >
                  <Mail className="w-4 h-4 text-white opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="contact-animate glass-card p-5 sm:p-8 md:p-10 lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="text-xs text-ash uppercase tracking-wider block mb-1.5 font-semibold">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder:text-[#2a2a2e] focus:outline-none focus:border-ember/50 transition-colors"
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-xs text-ash uppercase tracking-wider block mb-1.5 font-semibold">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder:text-[#2a2a2e] focus:outline-none focus:border-ember/50 transition-colors"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-subject" className="text-xs text-ash uppercase tracking-wider block mb-1.5 font-semibold">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder:text-[#2a2a2e] focus:outline-none focus:border-ember/50 transition-colors"
                  placeholder="Project inquiry / Opportunity"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs text-ash uppercase tracking-wider block mb-1.5 font-semibold">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder:text-[#2a2a2e] focus:outline-none focus:border-ember/50 transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {errors.form && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message sent successfully! I will reply shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-sm tracking-wide text-white bg-ember hover:bg-ember-bright transition-all duration-300 shadow-[0_0_25px_rgba(160,42,34,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{status === 'submitting' ? 'Dispatching...' : 'Dispatch Transmission'}</span>
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Back-to-Top Footer Bar */}
        <div
          className="section-container relative z-10 px-4 sm:px-6 md:px-8 mt-12 sm:mt-16 pt-6 pb-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-ash">
              © 2026 Dev Jangid. Crafted with passion.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-ash hover:text-white transition-colors flex items-center gap-1.5 font-medium group cursor-pointer py-1"
            >
              <span>Back to top</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 text-ember font-bold">↑</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
