import Link from 'next/link'
import { FlaskConical } from 'lucide-react'

const FOOTER_LINKS = [
  { href: '/learn', label: 'Learn' },
  { href: '/articles', label: 'Articles' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--bg-border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical size={16} className="text-[var(--accent-cyan)]" />
              <span className="font-display text-lg font-bold text-[var(--text-primary)]">
                Nexus<span className="text-[var(--accent-cyan)]">.</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
              A science platform for curious minds. Learn, explore, and discover.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[var(--bg-border)] pt-8 text-xs text-[var(--text-secondary)] sm:flex-row">
          <span>© {new Date().getFullYear()} Nexus Science</span>
          <span>Built by Igor Stashok</span>
        </div>
      </div>
    </footer>
  )
}
