import Link from 'next/link'
import {
  Brain,
  Stethoscope,
  Cpu,
  Atom,
  Dna,
  FlaskConical,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import type { Domain } from '@/types'

const ICONS: Record<string, LucideIcon> = {
  Brain,
  Stethoscope,
  Cpu,
  Atom,
  Dna,
  FlaskConical,
  BookOpen,
}

interface DomainCardProps {
  domain: Domain
}

export default function DomainCard({ domain }: DomainCardProps) {
  const Icon = ICONS[domain.icon] ?? Brain

  return (
    <Link
      href={domain.href}
      className="domain-card group block rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-6 hover:-translate-y-0.5"
      style={{ '--domain-accent': domain.accentHex } as React.CSSProperties}
    >
      {/* Icon + Name */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `color-mix(in srgb, ${domain.accentHex} 15%, transparent)` }}
        >
          <Icon size={20} style={{ color: domain.accentHex }} />
        </div>
        <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">
          {domain.name}
        </h3>
      </div>

      {/* Description */}
      {domain.description && (
        <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          {domain.description}
        </p>
      )}

      {/* Topic tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {domain.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-[var(--bg-surface)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div
        className="flex items-center gap-1 text-xs font-medium"
        style={{ color: domain.accentHex }}
      >
        <span>Explore</span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  )
}
