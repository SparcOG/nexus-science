function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[var(--bg-surface)] ${className}`} />
}

const BODY_WIDTHS = ['w-full', 'w-11/12', 'w-full', 'w-4/5', 'w-full', 'w-full', 'w-10/12']

export default function ArticleLoading() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Back link skeleton */}
      <Skeleton className="mb-8 h-4 w-24" />

      {/* Meta */}
      <div className="mb-5 flex gap-3">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Title */}
      <Skeleton className="mb-3 h-12 w-full" />
      <Skeleton className="mb-4 h-12 w-4/5" />

      {/* Excerpt */}
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-3/4" />

      {/* Divider */}
      <Skeleton className="mb-10 h-px w-full" />

      {/* Body paragraphs */}
      <div className="space-y-3">
        {BODY_WIDTHS.map((w, i) => (
          <Skeleton key={i} className={`h-4 ${w}`} />
        ))}
      </div>
    </div>
  )
}
