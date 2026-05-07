interface DomainBadgeProps {
  domain: string
  accentHex: string
  size?: 'sm' | 'md'
}

export default function DomainBadge({ domain, accentHex, size = 'md' }: DomainBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wider ${sizeClass}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${accentHex} 15%, transparent)`,
        color: accentHex,
      }}
    >
      {domain}
    </span>
  )
}
