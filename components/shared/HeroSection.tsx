import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--accent-violet) 12%, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--accent-cyan) 8%, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          Where science meets curiosity
        </p>

        <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
          Explore the Universe,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)',
            }}
          >
            One Idea at a Time.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          Neuroscience. AI. Physics. Biology. Read real science, learn interactively, and explore
          complex topics with Claude-powered research tools.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/learn"
            className="rounded-full bg-[var(--accent-cyan)] px-8 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Start Learning
          </Link>
          <Link
            href="/research"
            className="rounded-full border border-[var(--bg-border)] px-8 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-violet)] hover:text-[var(--accent-violet)]"
          >
            Explore with AI
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-[var(--text-secondary)] to-transparent" />
      </div>
    </section>
  )
}
