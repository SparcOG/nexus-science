function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[var(--bg-surface)] ${className}`} />
}

export default function ArticlesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16">
        <Skeleton className="mb-3 h-3 w-28" />
        <Skeleton className="h-12 w-48" />
        <Skeleton className="mt-4 h-5 w-80" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-5 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-6 h-4 w-2/3" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
