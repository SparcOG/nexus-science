import type { Metadata } from 'next'
import { DOMAINS } from '@/lib/constants'
import TopicCard from '@/components/learn/TopicCard'

export const metadata: Metadata = {
  title: 'Learn',
  description:
    'AI-powered flashcards for neuroscience, physics, biology, AI, and more. Learn by domain, track your progress.',
}

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      {/* Page header */}
      <div className="mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          Learning Platform
        </p>
        <h1 className="font-display text-5xl font-bold text-[var(--text-primary)]">Learn</h1>
        <p className="mt-4 max-w-lg text-lg text-[var(--text-secondary)]">
          Choose a domain. Claude generates a tailored set of flashcards. Study, flip, master.
        </p>
      </div>

      {/* Domain grid — TopicCard is a Client Component that reads localStorage for progress */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((domain) => (
          <TopicCard key={domain.id} domain={domain} />
        ))}
      </div>

      {/* Keyboard hint */}
      <p className="mt-12 text-center text-xs text-[var(--text-secondary)]">
        Inside a deck: <kbd className="rounded border border-[var(--bg-border)] px-1.5 py-0.5 font-mono">Space</kbd> to flip
        · <kbd className="rounded border border-[var(--bg-border)] px-1.5 py-0.5 font-mono">←→</kbd> to navigate
        · <kbd className="rounded border border-[var(--bg-border)] px-1.5 py-0.5 font-mono">Enter</kbd> to mark mastered
      </p>
    </main>
  )
}
