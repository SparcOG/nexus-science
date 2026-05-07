import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-3">
        The builder
      </p>
      <h1 className="font-display text-5xl font-bold text-[var(--text-primary)]">
        About Igor
      </h1>
      <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl">
        Self-taught developer from Belarus, building tools for curious people. This platform is a
        personal project combining my love of science, AI, and good design.
      </p>
    </main>
  )
}
