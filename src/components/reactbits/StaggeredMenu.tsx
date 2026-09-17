import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { Sun, Moon, FileText, Search, Terminal, Zap } from 'lucide-react'

export interface MenuItem {
  label: string
  link: string
  ariaLabel?: string
}

export interface SocialItem {
  label: string
  link: string
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right'
  colors?: string[]
  items?: MenuItem[]
  socialItems?: SocialItem[]
  displaySocials?: boolean
  displayItemNumbering?: boolean
  className?: string
  logoText?: string
  menuButtonColor?: string
  openMenuButtonColor?: string
  accentColor?: string
  isFixed?: boolean
  closeOnClickAway?: boolean
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onOpenResume?: () => void
  onOpenCommandPalette?: () => void
  onOpenConsole?: () => void
  isTLDR?: boolean
  onToggleTLDR?: () => void
  isMuted?: boolean
  onToggleMute?: () => void
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#1e1e24', '#2a2a34'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoText: _logoText = 'DJ.',
  menuButtonColor = '#ffffff',
  openMenuButtonColor: _openMenuButtonColor = '#A02A22',
  accentColor = '#A02A22',
  isFixed = true,
  closeOnClickAway = true,
  theme,
  onToggleTheme,
  onOpenResume,
  onOpenCommandPalette,
  onOpenConsole,
  isTLDR = false,
  onToggleTLDR
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isOpenRef = useRef(false)
  const isBusyRef = useRef(false)

  const panelRef = useRef<HTMLElement>(null)
  const prelayersRef = useRef<HTMLDivElement>(null)
  const prelayerEls = useRef<HTMLElement[]>([])
  const lineHRef = useRef<HTMLSpanElement>(null)
  const lineVRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const textInnerRef = useRef<HTMLSpanElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close'])
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTlRef = useRef<gsap.core.Tween | null>(null)
  const iconTweenRef = useRef<gsap.core.Tween | null>(null)
  const textTweenRef = useRef<gsap.core.Tween | null>(null)

  // Layout init
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const prelayers = prelayersRef.current
      const lineH = lineHRef.current
      const lineV = lineVRef.current
      const icon = iconRef.current
      const textInner = textInnerRef.current

      if (!panel || !lineH || !lineV || !icon || !textInner) return

      let prelayerList: HTMLElement[] = []
      if (prelayers) {
        prelayerList = Array.from(prelayers.querySelectorAll('.sm-prelayer'))
      }
      prelayerEls.current = prelayerList

      const startX = position === 'left' ? -100 : 100
      gsap.set([panel, ...prelayerList], { xPercent: startX, opacity: 1 })
      if (prelayers) gsap.set(prelayers, { xPercent: 0, opacity: 1 })
      gsap.set(lineH, { transformOrigin: '50% 50%', rotate: 0 })
      gsap.set(lineV, { transformOrigin: '50% 50%', rotate: 90 })
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
      gsap.set(textInner, { yPercent: 0 })
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor })
    })

    return () => ctx.revert()
  }, [menuButtonColor, position])

  // Build open timeline
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const prelayerList = prelayerEls.current
    if (!panel) return null

    openTlRef.current?.kill()
    closeTlRef.current?.kill()

    const itemLabels = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'))
    const itemNumberings = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'))
    const socialsTitle = panel.querySelector('.sm-socials-title')
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'))

    const startX = position === 'left' ? -100 : 100
    const prelayerConfigs = prelayerList.map((el) => ({ el, start: startX }))

    if (itemLabels.length) gsap.set(itemLabels, { yPercent: 140, rotate: 10 })
    if (itemNumberings.length) gsap.set(itemNumberings, { '--sm-num-opacity': 0 } as Record<string, unknown>)
    if (socialsTitle) gsap.set(socialsTitle, { opacity: 0 })
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    prelayerConfigs.forEach((cfg, idx) => {
      tl.fromTo(cfg.el, { xPercent: cfg.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, 0.07 * idx)
    })

    const panelDelay = (prelayerConfigs.length ? (prelayerConfigs.length - 1) * 0.07 : 0) + 0.08 * (prelayerConfigs.length ? 1 : 0)

    tl.fromTo(panel, { xPercent: startX }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelDelay)

    if (itemLabels.length) {
      const itemsDelay = panelDelay + 0.0975
      tl.to(
        itemLabels,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: { each: 0.08, from: 'start' }
        },
        itemsDelay
      )
      if (itemNumberings.length) {
        tl.to(
          itemNumberings,
          {
            duration: 0.6,
            ease: 'power2.out',
            ['--sm-num-opacity']: 1,
            stagger: { each: 0.06, from: 'start' }
          } as Record<string, unknown>,
          itemsDelay + 0.1
        )
      }
    }

    if (socialsTitle || socialLinks.length) {
      const socialsDelay = panelDelay + 0.25
      if (socialsTitle) {
        tl.to(socialsTitle, { opacity: 1, duration: 0.45, ease: 'power2.out' }, socialsDelay)
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: { each: 0.06, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' })
            }
          },
          socialsDelay + 0.04
        )
      }
    }

    openTlRef.current = tl
    return tl
  }, [position])

  const openMenu = useCallback(() => {
    if (isBusyRef.current) return
    isBusyRef.current = true
    const tl = buildOpenTimeline()
    if (tl) {
      tl.eventCallback('onComplete', () => {
        isBusyRef.current = false
      })
      tl.play(0)
    } else {
      isBusyRef.current = false
    }
  }, [buildOpenTimeline])

  const closeMenu = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null

    const panel = panelRef.current
    const prelayerList = prelayerEls.current
    if (!panel) return

    const allEls = [...prelayerList, panel]
    closeTlRef.current?.kill()

    const endX = position === 'left' ? -100 : 100
    closeTlRef.current = gsap.to(allEls, {
      xPercent: endX,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemLabels = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'))
        if (itemLabels.length) gsap.set(itemLabels, { yPercent: 140, rotate: 10 })
        const itemNumberings = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'))
        if (itemNumberings.length) gsap.set(itemNumberings, { '--sm-num-opacity': 0 } as Record<string, unknown>)
        const socialsTitle = panel.querySelector('.sm-socials-title')
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'))
        if (socialsTitle) gsap.set(socialsTitle, { opacity: 0 })
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })
        isBusyRef.current = false
      }
    })
  }, [position])

  const animateIcon = useCallback((open: boolean) => {
    const icon = iconRef.current
    if (!icon) return
    iconTweenRef.current?.kill()
    if (open) {
      iconTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' })
    } else {
      iconTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' })
    }
  }, [])

  const animateText = useCallback((open: boolean) => {
    const textInner = textInnerRef.current
    if (!textInner) return
    textTweenRef.current?.kill()

    const initial = open ? 'Menu' : 'Close'
    const target = open ? 'Close' : 'Menu'
    const sequence = [initial, target]
    setTextLines(sequence)

    gsap.set(textInner, { yPercent: 0 })
    textTweenRef.current = gsap.to(textInner, {
      yPercent: -50,
      duration: 0.45,
      ease: 'power4.out'
    })
  }, [])

  const toggleMenu = useCallback(() => {
    const nextState = !isOpenRef.current
    isOpenRef.current = nextState
    setIsOpen(nextState)

    if (nextState) {
      openMenu()
    } else {
      closeMenu()
    }
    animateIcon(nextState)
    animateText(nextState)
  }, [openMenu, closeMenu, animateIcon, animateText])

  const handleDismiss = useCallback(() => {
    if (isOpenRef.current) {
      isOpenRef.current = false
      setIsOpen(false)
      closeMenu()
      animateIcon(false)
      animateText(false)
    }
  }, [closeMenu, animateIcon, animateText])

  // Click away to close
  useEffect(() => {
    if (!closeOnClickAway || !isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target as Node)
      ) {
        handleDismiss()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [closeOnClickAway, isOpen, handleDismiss])

  return (
    <div
      className={`${className} staggered-menu-wrapper${isFixed ? ' fixed-wrapper' : ''}`}
      style={{ '--sm-accent': accentColor } as React.CSSProperties}
      data-position={position}
      data-open={isOpen || undefined}
    >
      {/* Background Backdrop */}
      <div className="sm-backdrop" onClick={handleDismiss} aria-hidden="true" />

      {/* Animated Multi-Layer Color Prelayers */}
      <div ref={prelayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.map((c, idx) => (
          <div key={idx} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      {/* Floating Translucent Header Bar */}
      <header className="staggered-menu-header" aria-label="Main navigation header">
        {/* Brand Logo on Left */}
        <div className="sm-logo" aria-label="Logo">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-white font-bold text-xl sm:text-2xl tracking-tight transition-transform duration-300 hover:scale-105"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <span className="text-ember">D</span>
            <span>J</span>
            <span className="text-ember">.</span>
          </a>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick 1-Click Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="sm-theme-toggle flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
            type="button"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-zinc-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Floating Toggle on Right (Strict Reel Replica: Menu +) */}
          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((line, idx) => (
                  <span key={idx} className="sm-toggle-line">
                    {line}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={lineHRef} className="sm-icon-line" />
              <span ref={lineVRef} className="sm-icon-line sm-icon-line-v" />
            </span>
          </button>
        </div>
      </header>

      {/* Slide-Out Navigation Panel */}
      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel">
        <div className="sm-panel-inner">
          {/* Main Navigation Item Links */}
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.map((item, idx) => (
              <li key={item.label + idx} className="sm-panel-itemWrap">
                <a
                  className="sm-panel-item"
                  href={item.link}
                  onClick={(e) => {
                    handleDismiss()
                    if (item.link.startsWith('#')) {
                      e.preventDefault()
                      const target = document.querySelector(item.link)
                      target?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  aria-label={item.ariaLabel}
                  data-index={idx + 1}
                >
                  <span className="sm-panel-itemLabel">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Quick Tools & Utilities Drawer inside Panel */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {/* Quick Resume Button */}
            {onOpenResume && (
              <button
                onClick={() => {
                  handleDismiss()
                  onOpenResume()
                }}
                aria-label="Inspect Verified Resume PDF"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-ember/15 border border-ember/30 hover:bg-ember text-white text-xs font-semibold tracking-wide transition-all duration-300 text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
                  <span>Inspect Resume PDF</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/20 text-white">Verified</span>
              </button>
            )}

            {/* Quick Command Palette Button */}
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  handleDismiss()
                  onOpenCommandPalette()
                }}
                aria-label="Open Command Palette"
                className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-ember" />
                  <span>Command Palette</span>
                </div>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-silver">⌘K</span>
              </button>
            )}

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
              className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-silver" />
                )}
                <span>Theme Mode</span>
              </div>
              <span className="text-[10px] uppercase text-ash">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>

            {/* Recruiter TL;DR Summary Toggle */}
            {onToggleTLDR && (
              <button
                onClick={onToggleTLDR}
                aria-label="Toggle Recruiter 30-Second Executive TL;DR Mode"
                className={`flex items-center justify-between px-4 py-2 rounded-xl border text-xs font-mono transition-colors text-left cursor-pointer ${
                  isTLDR
                    ? 'bg-ember/20 text-white border-ember/40'
                    : 'bg-white/5 hover:bg-white/10 text-white border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className={`w-3.5 h-3.5 ${isTLDR ? 'text-amber-400 fill-current' : 'text-ash'}`} />
                  <span>30s Recruiter TL;DR</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isTLDR ? 'bg-ember text-white' : 'bg-white/10 text-ash'}`}>
                  {isTLDR ? 'ON' : 'OFF'}
                </span>
              </button>
            )}

            {/* Hacker CLI Terminal */}
            {onOpenConsole && (
              <button
                onClick={() => {
                  handleDismiss()
                  onOpenConsole()
                }}
                className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-ember" />
                  <span>Hacker CLI Console</span>
                </div>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-silver">[~]</span>
              </button>
            )}
          </div>

          {/* Social Links Footer */}
          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((social, idx) => (
                  <li key={social.label + idx} className="sm-socials-item">
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

export default StaggeredMenu
