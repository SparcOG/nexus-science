'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react'
import FlashcardDeck from './FlashcardDeck'
import type { Flashcard, Domain } from '@/types'

type SessionState =
  | { status: 'idle' }
  | { status: 'loading'; topic: string }
  | { status: 'ready'; topic: string; cards: Flashcard[] }
  | { status: 'error'; topic: string; message: string }

interface FlashcardSessionProps {
  domain: Domain
}

export default function FlashcardSession({ domain }: FlashcardSessionProps) {
  const [session, setSession] = useState<SessionState>({ status: 'idle' })
  const [customTopic, setCustomTopic] = useState('')

  const generateCards = useCallback(
    async (topic: string) => {
      if (!topic.trim()) return
      setSession({ status: 'loading', topic })

      try {
        const res = await fetch('/api/ai/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: topic.trim(), domain: domain.id }),
        })

        const json = (await res.json()) as { data: Flashcard[] | null; error: string | null }

        if (json.error || !json.data) {
          setSession({ status: 'error', topic, message: json.error ?? 'Unknown error' })
        } else {
          setSession({ status: 'ready', topic: topic.trim(), cards: json.data })
        }
      } catch {
        setSession({
          status: 'error',
          topic,
          message: 'Failed to connect. Check your ANTHROPIC_API_KEY in .env.local.',
        })
      }
    },
    [domain.id]
  )

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateCards(customTopic)
    setCustomTopic('')
  }

  const progressKey =
    session.status === 'ready' ? `${domain.id}:${session.topic}` : ''

  // ── Deck view ────────────────────────────────────────────────────────────
  if (session.status === 'ready') {
    return (
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setSession({ status: 'idle' })}
              className="mb-1 flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowLeft size={14} />
              Change topic
            </button>
            <p className="text-xs text-[var(--text-secondary)]">
              Topic:{' '}
              <span className="font-semibold text-[var(--text-primary)]">{session.topic}</span>
              {' '}· {session.cards.length} cards
            </p>
          </div>
        </div>

        <FlashcardDeck
          cards={session.cards}
          progressKey={progressKey}
          domain={domain}
          onReset={() => setSession({ status: 'idle' })}
        />
      </div>
    )
  }

  // ── Selection / loading / error view ─────────────────────────────────────
  return (
    <div className="flex flex-col gap-10">
      {/* Back link */}
      <Link
        href="/learn"
        className="flex w-fit items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={14} />
        All topics
      </Link>

      {/* Domain header */}
      <div>
        <div
          className="mb-3 h-0.5 w-12 rounded-full"
          style={{ backgroundColor: domain.accentHex }}
        />
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: domain.accentHex }}
        >
          {domain.name}
        </p>
        <h1 className="font-display text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
          {domain.description ?? `Learn ${domain.name}`}
        </h1>
      </div>

      {/* Topic selection */}
      <div>
        <p className="mb-4 text-sm font-medium text-[var(--text-secondary)]">
          Select a topic to generate flashcards:
        </p>

        {/* Preset topic chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {domain.topics.map((topic) => (
            <button
              key={topic}
              onClick={() => generateCards(topic)}
              disabled={session.status === 'loading'}
              className="flex items-center gap-1.5 rounded-full border border-[var(--bg-border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] disabled:cursor-wait disabled:opacity-50"
              style={{
                borderColor:
                  session.status === 'loading' && session.topic === topic
                    ? domain.accentHex
                    : undefined,
                color:
                  session.status === 'loading' && session.topic === topic
                    ? domain.accentHex
                    : undefined,
              }}
            >
              {session.status === 'loading' && session.topic === topic ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles size={12} />
                  {topic}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--bg-border)]" />
          <span className="text-xs text-[var(--text-secondary)]">or</span>
          <div className="h-px flex-1 bg-[var(--bg-border)]" />
        </div>

        {/* Custom topic input */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder={`Custom topic in ${domain.name}…`}
            disabled={session.status === 'loading'}
            className="flex-1 rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-cyan)] focus:outline-none disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!customTopic.trim() || session.status === 'loading'}
            className="flex items-center gap-1.5 rounded-[var(--radius-lg)] px-4 py-2.5 text-sm font-semibold text-[var(--bg-primary)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: domain.accentHex }}
          >
            <Sparkles size={14} />
            Generate
          </button>
        </form>
      </div>

      {/* Error state */}
      {session.status === 'error' && (
        <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--accent-rose)]/30 bg-[var(--accent-rose)]/10 p-4">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-[var(--accent-rose)]" />
          <div>
            <p className="text-sm font-medium text-[var(--accent-rose)]">Generation failed</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{session.message}</p>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {session.status === 'loading' && (
        <div className="space-y-3">
          <p className="text-xs text-[var(--text-secondary)]">
            Generating flashcards for{' '}
            <span className="font-semibold text-[var(--text-primary)]">{session.topic}</span>…
          </p>
          <div className="rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-8">
            <div className="mb-6 h-0.5 w-10 animate-pulse rounded-full bg-[var(--bg-surface)]" />
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-[var(--bg-surface)]" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-[var(--bg-surface)]" />
          </div>
        </div>
      )}
    </div>
  )
}
