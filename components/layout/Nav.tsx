'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, FlaskConical } from 'lucide-react'

const NAV_LINKS = [
  { href: '/learn', label: 'Learn' },
  { href: '/articles', label: 'Articles' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--bg-border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <FlaskConical
            size={18}
            className="text-[var(--accent-cyan)] group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-display text-lg font-bold text-[var(--text-primary)] tracking-wide">
            Nexus
            <span className="text-[var(--accent-cyan)]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="border-t border-[var(--bg-border)] bg-[var(--bg-primary)] md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
