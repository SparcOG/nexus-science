'use client'

import { useState, useEffect } from 'react'
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
import ProgressBar from './ProgressBar'
import { getAllProgress } from '@/lib/progress'
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

interface TopicCardProps {
  domain: Domain
}

export default function TopicCard({ domain }: TopicCardProps) {
  const [masteredCount, setMasteredCount] = useState(0)
  const [totalSeen, setTotalSeen] = useState(0)
  const [hasMastered, setHasMastered] = useState(false)

  // Read progress from localStorage after mount (client-only)
  useEffect(() => {
    const all = getAllProgress()
    let mastered = 0
    let seen = 0

    // Sum progress across all subtopics for this domain
    Object.entries(all).forEach(([key, prog]) => {
      if (key.startsWith(`${domain.id}:`)) {
        mastered += prog.mastered.length
        seen += prog.seen.length
      }
    })

    setMasteredCount(mastered)
    setTotalSeen(seen)
    setHasMastered(mastered > 0)
  }, [domain.id])

  const Icon = ICONS[domain.icon] ?? Brain

  return (
    <Link
      href={domain.href}
      className="domain-card group flex flex-col rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-6 transition-all"
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
        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
          {domain.name}
        </h3>
      </div>

      {/* Description */}
      {domain.description && (
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
          {domain.description}
        </p>
      )}

      {/* Topic chips */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {domain.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-[var(--bg-surface)] px-2.5 py-1 text-[11px] text-[var(--text-secondary)]"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Progress (only shown if user has studied this domain) */}
      {hasMastered ? (
        <div className="mb-4">
          <ProgressBar
            mastered={masteredCount}
            total={totalSeen}
            accentHex={domain.accentHex}
          />
        </div>
      ) : (
        <div className="mb-4 text-xs text-[var(--text-secondary)]">No sessions yet</div>
      )}

      {/* CTA */}
      <div
        className="flex items-center gap-1 text-xs font-medium transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ color: domain.accentHex }}
      >
        <span>Start Learning</span>
        <span>→</span>
      </div>
    </Link>
  )
}
