'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle } from 'lucide-react'
import FlashCard from './FlashCard'
import ProgressBar from './ProgressBar'
import { getTopicProgress, markSeen, markMastered, unmarkMastered } from '@/lib/progress'
import type { Flashcard } from '@/types'
import type { Domain } from '@/types'

interface FlashcardDeckProps {
  cards: Flashcard[]
  progressKey: string   // e.g. "neuroscience:Dopamine"
  domain: Domain
  onReset: () => void
}

export default function FlashcardDeck({ cards, progressKey, domain, onReset }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set())
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set())
  const [isDone, setIsDone] = useState(false)

  // Hydrate progress from localStorage on mount
  useEffect(() => {
    const prog = getTopicProgress(progressKey)
    setMasteredIds(new Set(prog.mastered))
    setSeenIds(new Set(prog.seen))
  }, [progressKey])

  const currentCard = cards[index]
  const isCurrentMastered = masteredIds.has(currentCard.id)

  const goNext = useCallback(() => {
    if (index < cards.length - 1) {
      setIndex((i) => i + 1)
      setIsFlipped(false)
    } else {
      setIsDone(true)
    }
  }, [index, cards.length])

  const goPrev = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1)
      setIsFlipped(false)
    }
  }, [index])

  const handleFlip = useCallback(() => {
    if (!isFlipped) {
      // Mark as seen on first flip
      if (!seenIds.has(currentCard.id)) {
        markSeen(progressKey, currentCard.id)
        setSeenIds((prev) => new Set([...prev, currentCard.id]))
      }
    }
    setIsFlipped((f) => !f)
  }, [isFlipped, currentCard.id, progressKey, seenIds])

  const handleMastered = useCallback(() => {
    markMastered(progressKey, currentCard.id)
    setMasteredIds((prev) => new Set([...prev, currentCard.id]))
    // Small delay before advancing so the user sees the state change
    setTimeout(goNext, 250)
  }, [progressKey, currentCard.id, goNext])

  const handleUnmaster = useCallback(() => {
    unmarkMastered(progressKey, currentCard.id)
    setMasteredIds((prev) => {
      const next = new Set(prev)
      next.delete(currentCard.id)
      return next
    })
  }, [progressKey, currentCard.id])

  const handleRestart = useCallback(() => {
    setIndex(0)
    setIsFlipped(false)
    setIsDone(false)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      if (isDone) return
      switch (e.key) {
        case ' ':
          e.preventDefault()
          handleFlip()
          break
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
        case 'Enter':
          if (!isCurrentMastered) handleMastered()
          break
        case 'Backspace':
          if (isCurrentMastered) handleUnmaster()
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleFlip, goNext, goPrev, handleMastered, handleUnmaster, isCurrentMastered, isDone])

  // ── Completion screen ──────────────────────────────────────────────────
  if (isDone) {
    const masteredCount = masteredIds.size
    const remaining = cards.length - masteredCount

    return (
      <div className="flex flex-col items-center gap-6 rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-10 text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: `color-mix(in srgb, ${domain.accentHex} 20%, transparent)` }}
        >
          <CheckCircle2 size={28} style={{ color: domain.accentHex }} />
        </div>

        <div>
          <h3 className="mb-1 font-display text-2xl font-bold text-[var(--text-primary)]">
            Session complete!
          </h3>
          <p className="text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{masteredCount}</span>{' '}
            mastered ·{' '}
            <span className="font-semibold text-[var(--text-primary)]">{remaining}</span> still
            learning
          </p>
        </div>

        <ProgressBar
          mastered={masteredCount}
          total={cards.length}
          accentHex={domain.accentHex}
        />

        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 rounded-full border border-[var(--bg-border)] px-5 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--bg-surface)] hover:text-[var(--text-primary)]"
          >
            <RotateCcw size={14} />
            Review again
          </button>
          <button
            onClick={onReset}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--bg-primary)] transition-opacity hover:opacity-90"
            style={{ backgroundColor: domain.accentHex }}
          >
            New topic
          </button>
        </div>
      </div>
    )
  }

  // ── Main deck ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <ProgressBar
        mastered={masteredIds.size}
        total={cards.length}
        accentHex={domain.accentHex}
      />

      {/* Card counter */}
      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span>
          Card{' '}
          <span className="font-semibold text-[var(--text-primary)]">{index + 1}</span>{' '}
          of {cards.length}
        </span>
        <span className="flex items-center gap-3">
          <kbd className="rounded border border-[var(--bg-border)] px-1.5 py-0.5 font-mono text-[10px]">
            Space
          </kbd>
          flip
          <kbd className="rounded border border-[var(--bg-border)] px-1.5 py-0.5 font-mono text-[10px]">
            ←→
          </kbd>
          navigate
        </span>
      </div>

      {/* The card */}
      <FlashCard
        card={currentCard}
        accentHex={domain.accentHex}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />

      {/* Navigation row */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="flex items-center gap-1.5 rounded-full border border-[var(--bg-border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        {/* Mastered toggle */}
        {isCurrentMastered ? (
          <button
            onClick={handleUnmaster}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: `color-mix(in srgb, ${domain.accentHex} 20%, transparent)`, color: domain.accentHex }}
          >
            <CheckCircle2 size={15} />
            Mastered
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={goNext}
              className="flex items-center gap-1.5 rounded-full border border-[var(--bg-border)] px-3.5 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <XCircle size={14} />
              Still learning
            </button>
            <button
              onClick={handleMastered}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-[var(--bg-primary)] transition-opacity hover:opacity-90"
              style={{ backgroundColor: domain.accentHex }}
            >
              <CheckCircle2 size={14} />
              Got it!
            </button>
          </div>
        )}

        <button
          onClick={goNext}
          className="flex items-center gap-1.5 rounded-full border border-[var(--bg-border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {index === cards.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
