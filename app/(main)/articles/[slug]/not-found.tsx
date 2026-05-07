import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        404 — Not Found
      </p>
      <h1 className="mb-4 font-display text-4xl font-bold text-[var(--text-primary)]">
        This article doesn&apos;t exist.
      </h1>
      <p className="mb-8 text-[var(--text-secondary)]">
        It may have been moved, deleted, or never written.
      </p>
      <Link
        href="/articles"
        className="text-sm text-[var(--accent-cyan)] transition-colors hover:underline"
      >
        ← Back to all articles
      </Link>
    </div>
  )
}
