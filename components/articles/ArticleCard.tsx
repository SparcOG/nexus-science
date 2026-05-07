import Link from 'next/link'
import { Clock } from 'lucide-react'
import DomainBadge from './DomainBadge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="article-card group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{ '--article-accent': article.accentHex } as React.CSSProperties}
    >
      {/* Left accent stripe */}
      <div
        className="absolute bottom-0 left-0 top-0 w-[3px]"
        style={{ backgroundColor: article.accentHex }}
      />

      {/* Header: badge + reading time */}
      <div className="mb-4 flex items-center justify-between pl-2">
        <DomainBadge domain={article.domain} accentHex={article.accentHex} />
        <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
          <Clock size={12} />
          {article.readingTime} min read
        </span>
      </div>

      {/* Title */}
      <h2 className="mb-3 pl-2 font-display text-xl font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
        {article.title}
      </h2>

      {/* Excerpt */}
      <p className="mb-6 flex-1 pl-2 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
        {article.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pl-2">
        <span className="text-xs text-[var(--text-secondary)]">{formatDate(article.publishedAt)}</span>
        <span
          className="flex items-center gap-1 text-xs font-medium transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ color: article.accentHex }}
        >
          Read →
        </span>
      </div>
    </Link>
  )
}
