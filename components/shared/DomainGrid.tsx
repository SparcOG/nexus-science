import DomainCard from './DomainCard'
import { DOMAINS } from '@/lib/constants'

export default function DomainGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            Explore by Domain
          </p>
          <h2 className="font-display text-4xl font-bold text-[var(--text-primary)]">
            Seven fields. Infinite questions.
          </h2>
        </div>

        {/* Domain grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </div>
    </section>
  )
}
