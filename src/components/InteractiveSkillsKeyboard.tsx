import React, { useState, useMemo, useCallback } from 'react'
import { Volume2, VolumeX, Eye, Sparkles } from 'lucide-react'

export interface KeySkill {
  id: string
  label: string
  subLabel?: string
  name: string
  category: string
  color: {
    base: string
    light: string
    dark: string
    sideDark: string
    sideDarker: string
    sideDeep: string
    glow: string
    text: string
  }
  description: string
  iconType: string
}

// --- Realistic Vector Tech & Tool Glyphs for Artisan Keycaps ---
export const KeyIcon: React.FC<{ iconType: string; className?: string }> = ({
  iconType,
  className = 'w-5 h-5'
}) => {
  switch (iconType) {
    case 'c':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M17 8.5A6 6 0 1 0 17 15.5" />
          <path d="M14 6A8 8 0 1 0 14 18" strokeWidth="1.6" opacity="0.6" />
        </svg>
      )
    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M9 8a5 5 0 1 0 0 8" strokeWidth="2.6" />
          <path d="M12.5 12h3m-1.5-1.5v3" strokeWidth="2.2" />
          <path d="M18 12h3m-1.5-1.5v3" strokeWidth="2.2" />
        </svg>
      )
    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 18.5c3 .4 6 .4 9 0M5 21.5c4 .6 8 .6 12 0" />
          <path d="M6.5 11h7.5a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5H6.5a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 1 2.5-2.5z" fill="currentColor" fillOpacity="0.25" />
          <path d="M16.5 12.5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2" />
          <path d="M8.5 4.5c0 2-1 3-1 4m4-4c0 2-1 3-1 4m4-4c0 2-1 3-1 4" strokeWidth="1.6" />
        </svg>
      )
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M11.9 2c-3.1 0-5 1.5-5 3.7v1.8h5.2v.7H4.5C2.6 8.2 1 9.9 1 12.2c0 2.2 1.6 3.8 3.5 3.8h1.6v-2.3c0-2.3 2-4.2 4.3-4.2h5.1V6.3c0-2.2-1.9-4.3-3.6-4.3zm-1.8 1.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm1.9 18.2c3.1 0 5-1.5 5-3.7v-1.8h-5.2v-.7h7.6c1.9 0 3.5-1.7 3.5-4 0-2.2-1.6-3.8-3.5-3.8h-1.6v2.3c0 2.3-2 4.2-4.3 4.2h-5.1v3.2c0 2.2 1.9 4.3 3.6 4.3zm1.8-1.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
        </svg>
      )
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
          <path d="M6.5 9h5M9 9v7.5" strokeWidth="2.4" />
          <path d="M14 15.5c.8.6 2 .6 2.8 0 .6-.5.4-1.5-.3-1.8l-1.2-.5c-.8-.4-.9-1.4-.4-1.9.7-.6 1.9-.6 2.6 0" strokeWidth="2.2" />
        </svg>
      )
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
          <path d="M8 10.5v4.5a1.8 1.8 0 0 1-2.8 1.5" strokeWidth="2.2" />
          <path d="M13.5 15.5c.8.6 2 .6 2.8 0 .6-.5.4-1.5-.3-1.8l-1.2-.5c-.8-.4-.9-1.4-.4-1.9.7-.6 1.9-.6 2.6 0" strokeWidth="2.2" />
        </svg>
      )
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" fill="currentColor" fillOpacity="0.2" />
          <path d="M4.5 5.5v5.5c0 1.5 3.3 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.5" />
          <path d="M4.5 11v5.5c0 1.5 3.3 2.8 7.5 2.8s7.5-1.3 7.5-2.8V11" />
        </svg>
      )
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        </svg>
      )
    case 'nextjs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
          <path d="M9 8v8M15 8v3.5" strokeWidth="2.2" />
          <path d="M9 8l6.5 8.5" strokeWidth="2.4" />
        </svg>
      )
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2l8 4.6v9.2l-8 4.6-8-4.6V6.6L12 2z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.8" />
          <path d="M12 2v9.2l8 4.6M12 11.2l-8 4.6" strokeWidth="1.8" />
        </svg>
      )
    case 'express':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 8l5 8M9 8l-5 8" strokeWidth="2.5" />
          <path d="M14 12h6a2.5 2.5 0 0 0-2.5-2.5c-2 0-3 1.5-3 3.5s1 3.5 3.5 3.5a3 3 0 0 0 2.5-1" strokeWidth="2.2" />
        </svg>
      )
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.2 3.4-.9.7.2 1.2.7 1.8 1.3 1 1 2.1 2.2 4.8 2.2 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.2-3.4.9-.7-.2-1.2-.7-1.8-1.3-1-1-2.1-2.2-4.8-2.2zM4.5 12C2.1 12 .6 13.2 0 15.6c1-.9 2.1-1.2 3.4-.9.7.2 1.2.7 1.8 1.3 1 1 2.1 2.2 4.8 2.2 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.2-3.4.9-.7-.2-1.2-.7-1.8-1.3-1-1-2.1-2.2-4.8-2.2z" />
        </svg>
      )
    case 'htmlcss':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M5 3l1.5 15L12 21l5.5-3L19 3H5z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.8" />
          <path d="M9.5 8h5M9.5 12h4.5l-.5 4-1.5.5-1.5-.5-.2-1.8" strokeWidth="2" />
        </svg>
      )
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3a7 7 0 0 0-7 7c0 3 2 5.5 4.5 6.5V20l3-1.5v-2c3.5-.5 6.5-3 6.5-6.5a7 7 0 0 0-7-7z" fill="currentColor" fillOpacity="0.2" />
          <path d="M9 10h.01M15 10h.01M9.5 14c1.5 1 3.5 1 5 0" strokeWidth="1.8" />
        </svg>
      )
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2C11.5 3 7 7.5 7 12.5c0 3.8 2.5 7 5 9.5 2.5-2.5 5-5.7 5-9.5C17 7.5 12.5 3 12 2zm.2 17.5V4.2c2.8 2.4 3.8 5.7 3.8 8.3 0 3-1.6 5.5-3.8 7z" />
        </svg>
      )
    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
        </svg>
      )
    case 'rag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="6" cy="6" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <circle cx="18" cy="6" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <circle cx="12" cy="18" r="3" fill="currentColor" fillOpacity="0.7" />
          <path d="M8 7.5l2.5 8M16 7.5l-2.5 8M8.5 6h7" strokeWidth="1.8" />
        </svg>
      )
    case 'vectordb':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
          <path d="M12 3v9l8 4.5M12 12l-8 4.5" strokeWidth="1.6" />
          <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16" cy="14" r="1.5" fill="currentColor" />
          <circle cx="8" cy="14" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'gcp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M18 10h-1.3a5.5 5.5 0 0 0-10.4 1.5A4.5 4.5 0 0 0 7 20h11a4 4 0 0 0 0-8v-2z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      )
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M2.5 13.5c.3 3.6 3.4 6.5 7.5 6.5 5 0 8.5-3 9.8-7.5.3-.2.8-.2 1.2 0 1 .4 2 .3 2.5-.2-.4-.8-1.3-1.3-2.5-1.1-.3-1-1.3-1.7-2.5-1.7h-.5c-.8-1.5-2.2-2.5-4-2.5-.3 0-.6 0-.8.1-.5-.8-1.4-1.3-2.5-1.3H10v2h2v-1.2c.4.1.7.4.9.8H10v2h4v-1.3c.6.3 1 1 1.2 1.8H3.5c-.7 0-1 .4-1 1v3.5h-.5v.5h.5zm4.5-4h2v2H7v-2zm-3 0h2v2H4v-2zm6-3h2v2h-2V6.5zm-3 0h2v2H7V6.5z" />
        </svg>
      )
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="18" cy="6" r="2.5" fill="currentColor" />
          <circle cx="6" cy="18" r="2.5" fill="currentColor" />
          <circle cx="18" cy="18" r="2.5" fill="currentColor" />
          <path d="M6 15.5V9a3 3 0 0 1 3-3h6.5" strokeWidth="2.2" />
          <path d="M18 8.5V15.5" strokeWidth="2.2" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    case 'linux':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="4" width="18" height="16" rx="3" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
          <path d="M7 9l3 3-3 3" strokeWidth="2.2" />
          <path d="M12 15h5" strokeWidth="2.4" />
        </svg>
      )
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
          <path d="M12 7l4 5-4 5M8 12h8" strokeWidth="2.2" />
          <circle cx="7.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'wireshark':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 16.5c3-1 6-1 9 0s6 1 9 0" strokeWidth="1.8" />
          <path d="M5 16.5c1-4 4-11 9-11 0 4-1 8-3 11" fill="currentColor" fillOpacity="0.3" strokeWidth="2" />
          <circle cx="10" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'cansat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="9" y="8" width="6" height="8" rx="1.5" fill="currentColor" fillOpacity="0.3" strokeWidth="1.8" />
          <path d="M3 10.5h6M3 13.5h6M15 10.5h6M15 13.5h6" strokeWidth="2" />
          <path d="M3 10.5v3M21 10.5v3M6 10.5v3M18 10.5v3" strokeWidth="1.5" />
          <path d="M12 8V4.5m0 0l-1.5 1.5M12 4.5l1.5 1.5" strokeWidth="1.8" />
        </svg>
      )
    case 'esp32':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" fillOpacity="0.25" strokeWidth="1.8" />
          <path d="M10 10.5l2.5-2-.8 3.5 3-1.8-3.5 5.2.8-3.5-2 1.6z" fill="currentColor" stroke="none" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" strokeWidth="1.8" />
        </svg>
      )
    case 'dsa':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="5" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="6" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="18" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M10.5 7L7 15.5M13.5 7L17 15.5" strokeWidth="2" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

// --- 28 Essential Skills from Dev's Resume & Portfolio ---
export const KEYBOARD_SKILLS: KeySkill[] = [
  // --- ROW 1: Core Programming Languages ---
  {
    id: 'c',
    label: 'C',
    name: 'C',
    category: 'Language',
    color: {
      base: '#2b3a67',
      light: '#495d9e',
      dark: '#1b2545',
      sideDark: '#141d36',
      sideDarker: '#0e1426',
      sideDeep: '#080c17',
      glow: 'rgba(73, 93, 158, 0.75)',
      text: '#ffffff'
    },
    description: 'Low-level memory management, pointer arithmetic, system calls, and embedded firmware.',
    iconType: 'c'
  },
  {
    id: 'cpp',
    label: 'C++',
    name: 'C++',
    category: 'Language',
    color: {
      base: '#00599c',
      light: '#1f7ec7',
      dark: '#004275',
      sideDark: '#00335a',
      sideDarker: '#002542',
      sideDeep: '#001729',
      glow: 'rgba(0, 89, 156, 0.75)',
      text: '#ffffff'
    },
    description: 'High-performance systems programming, object-oriented design, STL, and hardware interfaces.',
    iconType: 'cpp'
  },
  {
    id: 'java',
    label: 'Java',
    name: 'Java',
    category: 'Language',
    color: {
      base: '#d35400',
      light: '#e67e22',
      dark: '#b03a00',
      sideDark: '#8a2d00',
      sideDarker: '#632000',
      sideDeep: '#3e1400',
      glow: 'rgba(230, 126, 34, 0.75)',
      text: '#ffffff'
    },
    description: 'Object-oriented enterprise systems, multithreading, and JVM runtime architecture.',
    iconType: 'java'
  },
  {
    id: 'python',
    label: 'Python',
    name: 'Python',
    category: 'Language',
    color: {
      base: '#2b5b84',
      light: '#3c79ad',
      dark: '#1e415e',
      sideDark: '#17334a',
      sideDarker: '#102436',
      sideDeep: '#0a1621',
      glow: 'rgba(55, 118, 171, 0.75)',
      text: '#ffd43b'
    },
    description: 'AI model orchestration, data pipelines, automation scripts, and backend services.',
    iconType: 'python'
  },
  {
    id: 'ts',
    label: 'TS',
    name: 'TypeScript',
    category: 'Language',
    color: {
      base: '#007acc',
      light: '#3192e0',
      dark: '#0062a3',
      sideDark: '#004f85',
      sideDarker: '#003d66',
      sideDeep: '#002b47',
      glow: 'rgba(0, 122, 204, 0.75)',
      text: '#ffffff'
    },
    description: 'Strict static type systems, generics, interfaces, and scalable architectures.',
    iconType: 'typescript'
  },
  {
    id: 'js',
    label: 'JS',
    name: 'JavaScript',
    category: 'Language',
    color: {
      base: '#d4b800',
      light: '#fae852',
      dark: '#b39c00',
      sideDark: '#8c7b00',
      sideDarker: '#665900',
      sideDeep: '#403800',
      glow: 'rgba(247, 223, 30, 0.7)',
      text: '#111111'
    },
    description: 'Modern asynchronous event loops, promises, browser APIs, and V8 execution.',
    iconType: 'javascript'
  },
  {
    id: 'sql',
    label: 'SQL',
    name: 'SQL',
    category: 'Database',
    color: {
      base: '#d97706',
      light: '#f59e0b',
      dark: '#b45309',
      sideDark: '#92400e',
      sideDarker: '#78350f',
      sideDeep: '#451a03',
      glow: 'rgba(245, 158, 11, 0.75)',
      text: '#ffffff'
    },
    description: 'Relational queries, complex joins, transactions, indexing strategies, and schema modeling.',
    iconType: 'sql'
  },

  // --- ROW 2: Frontend & Full Stack Engineering ---
  {
    id: 'react',
    label: 'React',
    name: 'React',
    category: 'Frontend',
    color: {
      base: '#00b4d8',
      light: '#48cae4',
      dark: '#0096c7',
      sideDark: '#0077b6',
      sideDarker: '#023e8a',
      sideDeep: '#03045e',
      glow: 'rgba(0, 180, 216, 0.85)',
      text: '#ffffff'
    },
    description: 'Component lifecycles, custom hooks, state reconciliation, and dynamic interactive UIs.',
    iconType: 'react'
  },
  {
    id: 'next',
    label: 'Next.js',
    name: 'Next.js',
    category: 'Framework',
    color: {
      base: '#18181b',
      light: '#27272a',
      dark: '#09090b',
      sideDark: '#050507',
      sideDarker: '#020203',
      sideDeep: '#000000',
      glow: 'rgba(255, 255, 255, 0.5)',
      text: '#fafafa'
    },
    description: 'Server-side rendering, React Server Components (RSC), App Router, and edge delivery.',
    iconType: 'nextjs'
  },
  {
    id: 'node',
    label: 'Node.js',
    name: 'Node.js',
    category: 'Runtime',
    color: {
      base: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      sideDark: '#15803d',
      sideDarker: '#166534',
      sideDeep: '#14532d',
      glow: 'rgba(34, 197, 94, 0.75)',
      text: '#ffffff'
    },
    description: 'Non-blocking I/O event loops, RESTful microservices, and high-concurrency runtimes.',
    iconType: 'nodejs'
  },
  {
    id: 'express',
    label: 'Express',
    name: 'Express',
    category: 'Backend',
    color: {
      base: '#3f3f46',
      light: '#52525b',
      dark: '#27272a',
      sideDark: '#18181b',
      sideDarker: '#111113',
      sideDeep: '#09090b',
      glow: 'rgba(161, 161, 170, 0.65)',
      text: '#ffffff'
    },
    description: 'Middleware pipelines, routing controllers, JWT authentication, and REST API endpoints.',
    iconType: 'express'
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    name: 'Tailwind CSS',
    category: 'Styling',
    color: {
      base: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      sideDark: '#0e7490',
      sideDarker: '#155e75',
      sideDeep: '#164e63',
      glow: 'rgba(6, 182, 212, 0.75)',
      text: '#ffffff'
    },
    description: 'Utility-first CSS architecture, responsive design tokens, and fluid component styling.',
    iconType: 'tailwind'
  },
  {
    id: 'htmlcss',
    label: 'HTML/CSS',
    name: 'HTML & CSS',
    category: 'Web',
    color: {
      base: '#e34f26',
      light: '#f0653f',
      dark: '#ba3c18',
      sideDark: '#942f11',
      sideDarker: '#73230b',
      sideDeep: '#4d1606',
      glow: 'rgba(227, 79, 38, 0.75)',
      text: '#ffffff'
    },
    description: 'Semantic markup architecture, modern CSS Flexbox/Grid, and responsive layout styling.',
    iconType: 'htmlcss'
  },
  {
    id: 'postgres',
    label: 'Postgres',
    name: 'PostgreSQL',
    category: 'Database',
    color: {
      base: '#336791',
      light: '#4b7ea8',
      dark: '#265073',
      sideDark: '#1c3d59',
      sideDarker: '#132c40',
      sideDeep: '#0a1a26',
      glow: 'rgba(51, 103, 145, 0.75)',
      text: '#ffffff'
    },
    description: 'ACID relational transactions, foreign keys, JSONB queries, and connection pooling.',
    iconType: 'postgres'
  },

  // --- ROW 3: Databases, AI & Cloud ---
  {
    id: 'mongo',
    label: 'MongoDB',
    name: 'MongoDB',
    category: 'Database',
    color: {
      base: '#10b981',
      light: '#34d399',
      dark: '#059669',
      sideDark: '#047857',
      sideDarker: '#065f46',
      sideDeep: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.75)',
      text: '#ffffff'
    },
    description: 'Document modeling, aggregation pipelines, and high-volume collections.',
    iconType: 'mongodb'
  },
  {
    id: 'gemini',
    label: 'Gemini',
    name: 'Gemini AI',
    category: 'Artificial Intelligence',
    color: {
      base: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      sideDark: '#4338ca',
      sideDarker: '#3730a3',
      sideDeep: '#312e81',
      glow: 'rgba(99, 102, 241, 0.85)',
      text: '#ffffff'
    },
    description: 'Long-context multimodal reasoning (2M tokens), vision analysis, and tool calling.',
    iconType: 'gemini'
  },
  {
    id: 'rag',
    label: 'RAG',
    name: 'RAG',
    category: 'Artificial Intelligence',
    color: {
      base: '#fc6b2f',
      light: '#fd8c5a',
      dark: '#d94d14',
      sideDark: '#ad390c',
      sideDarker: '#822706',
      sideDeep: '#571702',
      glow: 'rgba(252, 107, 47, 0.85)',
      text: '#ffffff'
    },
    description: 'Retrieval-augmented generation, cosine similarity search, chunking, and grounded answers.',
    iconType: 'rag'
  },
  {
    id: 'vectordb',
    label: 'Vector DB',
    name: 'Vector DB',
    category: 'Artificial Intelligence',
    color: {
      base: '#9333ea',
      light: '#c084fc',
      dark: '#7e22ce',
      sideDark: '#6b21a8',
      sideDarker: '#581c87',
      sideDeep: '#3b0764',
      glow: 'rgba(147, 51, 234, 0.8)',
      text: '#ffffff'
    },
    description: 'High-dimensional embeddings, ChromaDB vector indexing, and semantic similarity search.',
    iconType: 'vectordb'
  },
  {
    id: 'gcp',
    label: 'Cloud',
    name: 'Google Cloud',
    category: 'Cloud',
    color: {
      base: '#4285f4',
      light: '#6ba3f7',
      dark: '#1a73e8',
      sideDark: '#1557b0',
      sideDarker: '#103e7d',
      sideDeep: '#0b264d',
      glow: 'rgba(66, 133, 244, 0.75)',
      text: '#ffffff'
    },
    description: 'Vertex AI, Cloud Storage, Compute Engine, serverless functions, and IAM policies.',
    iconType: 'gcp'
  },
  {
    id: 'docker',
    label: 'Docker',
    name: 'Docker',
    category: 'DevOps',
    color: {
      base: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(2, 132, 199, 0.75)',
      text: '#ffffff'
    },
    description: 'Multi-stage lean Dockerfiles, container isolation, and Compose network bridges.',
    iconType: 'docker'
  },
  {
    id: 'git',
    label: 'Git',
    name: 'Git',
    category: 'DevOps',
    color: {
      base: '#f05032',
      light: '#f5745d',
      dark: '#c73b22',
      sideDark: '#9f2d18',
      sideDarker: '#77200f',
      sideDeep: '#4e1307',
      glow: 'rgba(240, 80, 50, 0.8)',
      text: '#ffffff'
    },
    description: 'Distributed version control, branching strategies, interactive rebasing, and merge hygiene.',
    iconType: 'git'
  },

  // --- ROW 4: Tooling, Systems, Aerospace & Security ---
  {
    id: 'github',
    label: 'GitHub',
    name: 'GitHub',
    category: 'DevOps',
    color: {
      base: '#24292e',
      light: '#3f4448',
      dark: '#1b1f23',
      sideDark: '#14171a',
      sideDarker: '#0d0f11',
      sideDeep: '#050607',
      glow: 'rgba(255, 255, 255, 0.45)',
      text: '#ffffff'
    },
    description: 'GitHub Actions CI/CD workflows, repository management, PR code reviews, and releases.',
    iconType: 'github'
  },
  {
    id: 'linux',
    label: 'Linux',
    name: 'Linux',
    category: 'Systems',
    color: {
      base: '#262626',
      light: '#404040',
      dark: '#171717',
      sideDark: '#0f0f0f',
      sideDarker: '#0a0a0a',
      sideDeep: '#000000',
      glow: 'rgba(250, 204, 21, 0.6)',
      text: '#facc15'
    },
    description: 'POSIX shell environments, systemd services, SSH remote management, and permissions.',
    iconType: 'linux'
  },
  {
    id: 'postman',
    label: 'Postman',
    name: 'Postman',
    category: 'Tooling',
    color: {
      base: '#ff6c37',
      light: '#ff8c5a',
      dark: '#e0531f',
      sideDark: '#b83f12',
      sideDarker: '#8f2f0a',
      sideDeep: '#5c1d04',
      glow: 'rgba(255, 108, 55, 0.75)',
      text: '#ffffff'
    },
    description: 'API endpoint testing, automated request collections, environment variables, and benchmarks.',
    iconType: 'postman'
  },
  {
    id: 'wireshark',
    label: 'Wireshark',
    name: 'Wireshark',
    category: 'Security',
    color: {
      base: '#1d4ed8',
      light: '#3b82f6',
      dark: '#1e40af',
      sideDark: '#1e3a8a',
      sideDarker: '#172554',
      sideDeep: '#0f172a',
      glow: 'rgba(29, 78, 216, 0.75)',
      text: '#ffffff'
    },
    description: 'Deep TCP/IP packet capture, frame dissection, and network troubleshooting.',
    iconType: 'wireshark'
  },
  {
    id: 'cansat',
    label: 'CanSat',
    name: 'CanSat',
    category: 'Aerospace',
    color: {
      base: '#eab308',
      light: '#fde047',
      dark: '#ca8a04',
      sideDark: '#a16207',
      sideDarker: '#78350f',
      sideDeep: '#451a03',
      glow: 'rgba(234, 179, 8, 0.8)',
      text: '#18181b'
    },
    description: '1U micro-satellite payload design, barometric descent profiling, and telemetry radio link.',
    iconType: 'cansat'
  },
  {
    id: 'esp32',
    label: 'ESP32',
    name: 'ESP32',
    category: 'Embedded',
    color: {
      base: '#e11d48',
      light: '#fb7185',
      dark: '#be123c',
      sideDark: '#9f1239',
      sideDarker: '#881337',
      sideDeep: '#4c0519',
      glow: 'rgba(225, 29, 72, 0.75)',
      text: '#ffffff'
    },
    description: 'Microcontroller programming in C/C++, I2C/SPI sensor fusion, and hardware interrupts.',
    iconType: 'esp32'
  },
  {
    id: 'dsa',
    label: 'DSA',
    name: 'DSA',
    category: 'Core CS',
    color: {
      base: '#10b981',
      light: '#34d399',
      dark: '#059669',
      sideDark: '#047857',
      sideDarker: '#065f46',
      sideDeep: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.75)',
      text: '#ffffff'
    },
    description: 'Data structures & algorithms, asymptotic complexity analysis, trees, and dynamic programming.',
    iconType: 'dsa'
  }
]

// --- Realistic Mechanical Audio Synthesizer ---
class RealisticAudioEngine {
  private ctx: AudioContext | null = null

  private getCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  playDownstroke(pitch: number = 1.0) {
    try {
      const ctx = this.getCtx()
      if (!ctx) return

      // Downstroke mechanical bottom-out thock
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(160 * pitch, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(45 * pitch, ctx.currentTime + 0.07)

      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.08)

      // Snap burst
      const bufferSize = Math.floor(ctx.sampleRate * 0.015)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1400 * pitch, ctx.currentTime)
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.09, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start()
      noise.stop(ctx.currentTime + 0.025)
    } catch {}
  }

  playUpstroke(pitch: number = 1.0) {
    try {
      const ctx = this.getCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(540 * pitch, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(780 * pitch, ctx.currentTime + 0.025)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch {}
  }

  playHover(pitch: number = 1.0) {
    try {
      const ctx = this.getCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const freq = 360 * pitch
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.025)
      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch {}
  }
}

const audioEngine = new RealisticAudioEngine()

export const InteractiveSkillsKeyboard: React.FC = () => {
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null)
  const [activeKeyId, setActiveKeyId] = useState<string>('c')
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [view3D, setView3D] = useState<boolean>(true)

  // Currently inspected key
  const inspectedKey = useMemo(() => {
    const targetId = hoveredKeyId || activeKeyId
    return KEYBOARD_SKILLS.find((k) => k.id === targetId) || KEYBOARD_SKILLS[0]
  }, [hoveredKeyId, activeKeyId])

  // Key Hover Handler
  const handleKeyHover = useCallback(
    (key: KeySkill, idx: number) => {
      setHoveredKeyId(key.id)
      if (soundEnabled) {
        const pitch = 0.88 + (idx % 7) * 0.04
        audioEngine.playHover(pitch)
      }
    },
    [soundEnabled]
  )

  // Key Click Handler with Real Spring Plunge & Return
  const handleKeyClick = useCallback(
    (key: KeySkill, idx: number) => {
      setActiveKeyId(key.id)
      setHoveredKeyId(key.id)
      setPressedKeyId(key.id)

      const pitch = 0.88 + (idx % 7) * 0.05
      if (soundEnabled) audioEngine.playDownstroke(pitch)

      setTimeout(() => {
        setPressedKeyId(null)
        if (soundEnabled) audioEngine.playUpstroke(pitch)
      }, 125)
    },
    [soundEnabled]
  )

  return (
    <div className="w-full mt-14 sm:mt-20 select-none">
      {/* Header Eyebrow & Themed Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
            <span className="text-ember text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Tactile Stack // Interactive Hardware
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Interactive Tech Stack</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-ash border border-white/10 uppercase tracking-widest hidden sm:inline-block">
              28 Switches
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-ash mt-1 max-w-xl">
            A sculpted 3D mechanical macropad showcasing core programming languages and engineering tools. Hover or click any switch.
          </p>
        </div>

        {/* Global Controls: Sound Toggle & Perspective View Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
              soundEnabled
                ? 'bg-ember/15 border-ember/40 text-ember hover:bg-ember/25'
                : 'bg-white/5 border-white/10 text-ash hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Mechanical Switch Audio' : 'Enable Mechanical Switch Audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Perspective View Toggle */}
          <button
            type="button"
            onClick={() => setView3D((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
              view3D
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25'
                : 'bg-white/5 border-white/10 text-ash hover:text-white'
            }`}
            title="Toggle between 3D Isometric View and Flat Studio View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px]">{view3D ? '3D ISOMETRIC' : '2D STUDIO'}</span>
          </button>
        </div>
      </div>

      {/* Clean, Realistic Minimal Legend (Clean Name, Category & Vector Emblem) */}
      <div className="mb-6 p-4 rounded-xl bg-[#0c0d12] border border-white/10 relative overflow-hidden shadow-xl">
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${inspectedKey.color.base}, transparent)`,
            boxShadow: `0 0 16px ${inspectedKey.color.glow}`
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-2 sm:pr-8">
          <div className="flex items-center gap-3">
            {/* Color Accent & Vector Emblem Indicator */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md border border-white/20 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${inspectedKey.color.light}, ${inspectedKey.color.base})`,
                color: inspectedKey.color.text,
                boxShadow: `0 2px 10px ${inspectedKey.color.glow}`
              }}
            >
              <KeyIcon iconType={inspectedKey.iconType} className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-base tracking-tight">
                  {inspectedKey.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/5 text-cloud border border-white/10">
                  {inspectedKey.category}
                </span>
              </div>
              <p className="text-xs text-ash mt-0.5 font-normal leading-relaxed">
                {inspectedKey.description}
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ash/60 shrink-0 self-end sm:self-auto pr-6 sm:pr-12">
            <span>SWITCH // CHERRY MX</span>
          </div>
        </div>
      </div>

      {/* 3D Hardware Keyboard Stage - Realistic Mechanical Macropad */}
      <div
        className="w-full flex items-center justify-center py-6 sm:py-10 md:py-12 overflow-visible"
        style={{
          perspective: view3D ? '1300px' : 'none',
          perspectiveOrigin: '50% 35%'
        }}
      >
        {/* Chassis Body */}
        <div
          className="relative transition-all duration-300 ease-out shrink-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: view3D
              ? 'rotateX(52deg) rotateZ(-26deg) rotateY(6deg)'
              : 'none'
          }}
        >
          {/* Main Mechanical Keyboard Case (Chassis) */}
          <div
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-white/15 transition-all duration-300"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #181922 0%, #101118 60%, #08090d 100%)',
              boxShadow: view3D
                ? `
                  0 2px 0 #282a3a,
                  0 4px 0 #1e202d,
                  0 8px 0 #14151e,
                  0 14px 0 #0d0e14,
                  0 20px 0 #07070a,
                  0 30px 45px rgba(0, 0, 0, 0.85),
                  0 0 60px rgba(252, 107, 47, 0.10)
                `
                : '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
          >
            {/* CNC Corner Screws */}
            <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>

            {/* Recessed Switch Plate */}
            <div
              className="relative p-2.5 sm:p-3.5 rounded-xl border border-black/80 shadow-inner"
              style={{
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(180deg, #090a0f 0%, #0d0e14 100%)',
                boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)'
              }}
            >
              {/* Keyboard Grid: 4 rows of 7 keys */}
              <div 
                className="grid grid-cols-7 gap-2.5 sm:gap-3 md:gap-3.5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {KEYBOARD_SKILLS.map((skill, idx) => {
                  const isHovered = hoveredKeyId === skill.id
                  const isSelected = activeKeyId === skill.id
                  const isPressed = pressedKeyId === skill.id

                  return (
                    <div
                      key={skill.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${skill.name} keycap`}
                      className="relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0 border-0 bg-transparent cursor-pointer focus:outline-none"
                      style={{
                        transformStyle: 'preserve-3d',
                        touchAction: 'manipulation'
                      }}
                      onPointerEnter={() => handleKeyHover(skill, idx)}
                      onPointerLeave={() => setHoveredKeyId(null)}
                      onPointerDown={() => handleKeyClick(skill, idx)}
                      onClick={() => handleKeyClick(skill, idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleKeyClick(skill, idx)
                        }
                      }}
                    >
                      {/* 1. Underlying Switch Bed & Red Cross Stem */}
                      <div
                        className="absolute inset-1 rounded-md bg-[#07080c] border border-white/5 flex items-center justify-center pointer-events-none"
                        style={{ transform: 'translateZ(0px)' }}
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] bg-[#991b1b] border border-[#7f1d1d] flex items-center justify-center shadow-inner">
                          {/* Cross stem */}
                          <div 
                            className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 transition-transform duration-100 ease-out"
                            style={{
                              transform: isPressed ? 'scale(0.7) translateY(1px)' : isHovered ? 'scale(1.2) translateY(-1px)' : 'scale(1)'
                            }}
                          >
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 bg-[#ef4444] rounded-[0.5px]" />
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-[#ef4444] rounded-[0.5px]" />
                          </div>
                        </div>

                        {/* Underglow LED projection */}
                        <div
                          className="absolute inset-0 rounded-md transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${skill.color.glow} 0%, transparent 75%)`,
                            opacity: isHovered || isSelected ? 0.95 : 0.08
                          }}
                        />
                      </div>

                      {/* 2. Sculpted High-Profile 3D Keycap Body */}
                      <div
                        className="absolute inset-0 rounded-[7px] sm:rounded-[9px] transition-all duration-150 transform-gpu flex flex-col items-center justify-center pointer-events-none"
                        style={{
                          transformStyle: 'preserve-3d',
                          // Dynamic Spring Plunge vs Elevation
                          transform: view3D
                            ? isPressed
                              ? 'translateZ(2px) translateY(3px) scale(0.96)'
                              : isHovered
                              ? 'translateZ(38px) translateY(-14px) scale(1.08)'
                              : isSelected
                              ? 'translateZ(24px) translateY(-8px) scale(1.04)'
                              : 'translateZ(8px) translateY(0px) scale(1.0)'
                            : isPressed
                            ? 'translateY(3px) scale(0.96)'
                            : isHovered
                            ? 'translateY(-10px) scale(1.06)'
                            : isSelected
                            ? 'translateY(-5px) scale(1.03)'
                            : 'translateY(0px)',
                          background: `linear-gradient(180deg, ${skill.color.light} 0%, ${skill.color.base} 55%, ${skill.color.dark} 100%)`,
                          boxShadow: isPressed
                            ? `
                              0 1px 0 ${skill.color.sideDark},
                              0 2px 4px rgba(0, 0, 0, 0.4)
                            `
                            : isHovered
                            ? `
                              0 2px 0 ${skill.color.sideDark},
                              0 5px 0 ${skill.color.sideDarker},
                              0 10px 0 ${skill.color.sideDeep},
                              0 18px 24px rgba(0, 0, 0, 0.75),
                              0 0 28px ${skill.color.glow}
                            `
                            : isSelected
                            ? `
                              0 2px 0 ${skill.color.sideDark},
                              0 4px 0 ${skill.color.sideDarker},
                              0 7px 0 ${skill.color.sideDeep},
                              0 12px 16px rgba(0, 0, 0, 0.65),
                              0 0 18px ${skill.color.glow}
                            `
                            : `
                              0 1.5px 0 ${skill.color.sideDark},
                              0 3px 0 ${skill.color.sideDarker},
                              0 5px 0 ${skill.color.sideDeep},
                              0 8px 10px rgba(0, 0, 0, 0.5)
                            `,
                          zIndex: isHovered ? 50 : isSelected ? 30 : 10
                        }}
                      >
                        {/* Concave Dish with Specular Sheen */}
                        <div
                          className="absolute inset-[2.5px] sm:inset-[3.5px] rounded-[5px] sm:rounded-[7px] flex flex-col items-center justify-center p-0.5 overflow-hidden pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 65%), linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.22) 100%)`,
                            boxShadow: `
                              inset 0 1.5px 2px rgba(255,255,255,0.4),
                              inset 0 -1.5px 2px rgba(0,0,0,0.4)
                            `
                          }}
                        >
                          {/* Realistic Laser-Etched Vector Icon */}
                          <div
                            className="transition-transform duration-150 flex items-center justify-center"
                            style={{
                              color: skill.color.text,
                              filter: isHovered ? `drop-shadow(0 0 4px ${skill.color.glow})` : 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
                            }}
                          >
                            <KeyIcon iconType={skill.iconType} className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" />
                          </div>

                          {/* Clean Key Label */}
                          <span
                            className="font-mono font-bold tracking-tight text-[7px] sm:text-[8.5px] md:text-[9.5px] leading-tight mt-0.5 truncate max-w-full px-0.5 select-none"
                            style={{
                              color: skill.color.text,
                              textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                            }}
                          >
                            {skill.label}
                          </span>
                        </div>

                        {/* Top specular highlight rim */}
                        <div className="absolute top-1 inset-x-2 h-[1px] bg-white/40 rounded-full pointer-events-none" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Keyboard Lip / Custom Callsign */}
            <div className="mt-3.5 sm:mt-4 flex items-center justify-between px-1 text-[10px] font-mono text-ash/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
                <span className="uppercase tracking-widest text-[9px] text-ash/80">
                  TACTILE STACK // 28 SWITCHES
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-ember font-bold text-[9px]">
                  DEV JANGID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Interactive Legend Hint */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ash/70 text-center">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ember" />
          <span>Interactive 3D elevation active on hover and click</span>
        </span>
      </div>
    </div>
  )
}

export default InteractiveSkillsKeyboard
