import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import ArticleGrid from '@/components/articles/ArticleGrid'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Science articles on neuroscience, AI, physics, biology and more.',
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      {/* Page header */}
      <div className="mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          Science Magazine
        </p>
        <h1 className="font-display text-5xl font-bold text-[var(--text-primary)]">Articles</h1>
        <p className="mt-4 max-w-lg text-lg text-[var(--text-secondary)]">
          Deep dives into neuroscience, AI, physics, biology, and the history of science. Written
          for curious minds.
        </p>
      </div>

      <ArticleGrid articles={articles} />
    </main>
  )
}
