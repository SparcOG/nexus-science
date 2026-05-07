'use client'

import { motion } from 'framer-motion'
import type { Flashcard } from '@/types'

const DIFFICULTY_LABELS: Record<Flashcard['difficulty'], string> = {
  easy: 'Foundational',
  medium: 'Intermediate',
  hard: 'Advanced',
}

interface FlashCardProps {
  card: Flashcard
  accentHex: string
  isFlipped: boolean
  onFlip: () => void
}

export default function FlashCard({ card, accentHex, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div className="card-flip w-full select-none" onClick={onFlip} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && (e.preventDefault(), onFlip())}
      aria-label={isFlipped ? 'Click to see the term' : 'Click to reveal the answer'}
    >
      <motion.div
        className="card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Front face: term ─────────────────────────────────────── */}
        <div className="card-face rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-8">
          {/* Accent stripe */}
          <div className="mb-6 h-0.5 w-10 rounded-full" style={{ backgroundColor: accentHex }} />

          {/* Difficulty badge */}
          <span
            className="mb-4 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `color-mix(in srgb, ${accentHex} 15%, transparent)`,
              color: accentHex,
            }}
          >
            {DIFFICULTY_LABELS[card.difficulty]}
          </span>

          {/* Term */}
          <h3 className="mb-2 font-display text-2xl font-bold leading-snug text-[var(--text-primary)] sm:text-3xl">
            {card.front}
          </h3>

          {/* Flip hint */}
          <p className="mt-8 text-xs text-[var(--text-secondary)]">
            Space or click to flip ↩
          </p>
        </div>

        {/* ── Back face: definitions ──────────────────────────────── */}
        <div
          className="card-back-face card-face rounded-[var(--radius-lg)] border p-8"
          style={{
            borderColor: `color-mix(in srgb, ${accentHex} 30%, var(--bg-border))`,
            backgroundColor: `color-mix(in srgb, ${accentHex} 5%, var(--bg-secondary))`,
          }}
        >
          {/* Accent stripe */}
          <div className="mb-6 h-0.5 w-10 rounded-full" style={{ backgroundColor: accentHex }} />

          {/* Simple explanation */}
          <div className="mb-5">
            <p
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: accentHex }}
            >
              Simple · B1
            </p>
            <p className="text-base leading-relaxed text-[var(--text-primary)]">
              {card.backSimple}
            </p>
          </div>

          {/* Divider */}
          <div
            className="my-5 h-px w-full"
            style={{ backgroundColor: `color-mix(in srgb, ${accentHex} 20%, var(--bg-border))` }}
          />

          {/* Expert explanation */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Expert
            </p>
            <p className="font-mono text-sm leading-relaxed text-[var(--text-secondary)]">
              {card.backExpert}
            </p>
          </div>

          {/* Flip back hint */}
          <p className="mt-6 text-xs text-[var(--text-secondary)]">Click to flip back ↩</p>
        </div>
      </motion.div>
    </div>
  )
}
