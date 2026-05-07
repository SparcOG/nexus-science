'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'
import type { ExplainResponse } from '@/types'

type Level = 'simple' | 'medium' | 'expert'

const LEVELS: { key: Level; label: string; desc: string }[] = [
  { key: 'simple', label: 'Simple', desc: 'B1 English' },
  { key: 'medium', label: 'Medium', desc: 'University' },
  { key: 'expert', label: 'Expert', desc: 'Researcher' },
]

interface ExplainModalProps {
  term: string
  onClose: () => void
}

export default function ExplainModal({ term, onClose }: ExplainModalProps) {
  const [level, setLevel] = useState<Level>('simple')
  const [data, setData] = useState<ExplainResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setData(null)

    fetch('/api/ai/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term }),
    })
      .then((res) => res.json())
      .then((json: { data: ExplainResponse | null; error: string | null }) => {
        if (json.error || !json.data) {
          setError(json.error ?? 'Unknown error')
        } else {
          setData(json.data)
        }
      })
      .catch(() => setError('Failed to connect to AI service.'))
      .finally(() => setLoading(false))
  }, [term])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const displayTerm = term.length > 80 ? term.slice(0, 80) + '…' : term

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Explanation of: ${displayTerm}`}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
      >
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] shadow-2xl shadow-black/60">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[var(--bg-border)] p-5">
            <div className="flex items-start gap-3 min-w-0">
              <Sparkles size={16} className="mt-1 flex-shrink-0 text-[var(--accent-cyan)]" />
              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  Explaining
                </p>
                <h3 className="font-display text-base font-semibold leading-snug text-[var(--text-primary)]">
                  &ldquo;{displayTerm}&rdquo;
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-3 flex-shrink-0 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Level tabs */}
          <div className="flex gap-1 border-b border-[var(--bg-border)] px-4">
            {LEVELS.map((l) => (
              <button
                key={l.key}
                onClick={() => setLevel(l.key)}
                className={`border-b-2 px-3 pb-3 pt-3 text-sm transition-colors duration-150 ${
                  level === l.key
                    ? 'border-[var(--accent-cyan)] text-[var(--accent-cyan)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {l.label}
                <span className="ml-1.5 text-[10px] opacity-60">{l.desc}</span>
              </button>
            ))}
          </div>

          {/* Explanation content */}
          <div className="min-h-[120px] p-5">
            {loading && (
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-[var(--bg-surface)]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--bg-surface)]" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-[var(--bg-surface)]" />
              </div>
            )}

            {error && !loading && (
              <div className="space-y-1">
                <p className="text-sm text-[var(--accent-rose)]">{error}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Make sure ANTHROPIC_API_KEY is set in .env.local and restart the dev server.
                </p>
              </div>
            )}

            {data && !loading && (
              <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)]">
                {data[level]}
              </p>
            )}
          </div>

          {/* Example footer */}
          {data && !loading && (
            <div className="rounded-b-[var(--radius-lg)] border-t border-[var(--bg-border)] bg-[var(--bg-surface)] p-5">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                Real-world example
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {data.example}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
