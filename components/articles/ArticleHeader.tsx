import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import DomainBadge from './DomainBadge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleHeaderProps {
  article: Article
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-10">
      {/* Back link */}
      <Link
        href="/articles"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={14} />
        All articles
      </Link>

      {/* Domain + meta row */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <DomainBadge domain={article.domain} accentHex={article.accentHex} />
        <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
          <Clock size={12} />
          {article.readingTime} min read
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
          <Calendar size={12} />
          {formatDate(article.publishedAt)}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-4 font-display text-4xl font-bold leading-[1.15] text-[var(--text-primary)] sm:text-5xl">
        {article.title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg leading-relaxed text-[var(--text-secondary)]">{article.excerpt}</p>

      {/* Colored divider */}
      <div className="mt-8 h-px w-full bg-[var(--bg-border)]">
        <div
          className="h-px w-24 rounded-full"
          style={{ backgroundColor: article.accentHex }}
        />
      </div>
    </header>
  )
}
