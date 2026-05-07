import { progressPercent } from '@/lib/progress'

interface ProgressBarProps {
  mastered: number
  total: number
  accentHex: string
  showLabel?: boolean
}

export default function ProgressBar({
  mastered,
  total,
  accentHex,
  showLabel = true,
}: ProgressBarProps) {
  const pct = progressPercent(mastered, total)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>
            <span className="font-medium text-[var(--text-primary)]">{mastered}</span> of {total}{' '}
            mastered
          </span>
          <span style={{ color: pct > 0 ? accentHex : undefined }}>{pct}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-surface)]">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: accentHex }}
        />
      </div>
    </div>
  )
}
