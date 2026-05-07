import { Brain, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AIMessage } from '@/types'

// ─── Inline markdown parser (bold, italic) ─────────────────────────────────
function renderInline(text: string): React.ReactNode[] {
  // Split on **bold** first, then on *italic* within plain segments
  const boldSplit = text.split(/(\*\*[^*\n]+\*\*)/g)
  const result: React.ReactNode[] = []

  boldSplit.forEach((segment, bi) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      result.push(
        <strong key={`b${bi}`} className="font-semibold text-[var(--text-primary)]">
          {segment.slice(2, -2)}
        </strong>
      )
    } else {
      // Handle *italic* within plain text
      const italicSplit = segment.split(/(\*[^*\n]+\*)/g)
      italicSplit.forEach((part, ii) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          result.push(
            <em key={`i${bi}-${ii}`} className="italic text-[var(--text-accent)]">
              {part.slice(1, -1)}
            </em>
          )
        } else {
          result.push(part)
        }
      })
    }
  })

  return result
}

// ─── Block markdown parser (headings, lists, paragraphs) ──────────────────
function MarkdownContent({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <p key={i} className="mt-3 mb-1 font-semibold text-[var(--text-primary)] text-sm">
          {renderInline(line.slice(3))}
        </p>
      )
      i++
    } else if (line.startsWith('- ')) {
      // Collect consecutive list items
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-1 ml-4 list-disc space-y-1">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
    } else if (line.trim() === '') {
      i++
    } else {
      elements.push(
        <p key={i} className="leading-relaxed">
          {renderInline(line)}
        </p>
      )
      i++
    }
  }

  return (
    <div className="space-y-2">
      {elements}
      {isStreaming && (
        <span className="inline-block h-[1em] w-0.5 animate-pulse bg-[var(--accent-cyan)] align-middle opacity-80" />
      )}
    </div>
  )
}

// ─── ChatMessage ──────────────────────────────────────────────────────────
interface ChatMessageProps {
  message: AIMessage
  isStreaming?: boolean
}

export default function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-[var(--accent-violet)] text-white'
            : 'border border-[var(--bg-border)] bg-[var(--bg-surface)]'
        )}
      >
        {isUser ? (
          <User size={13} />
        ) : (
          <Brain size={13} className="text-[var(--accent-cyan)]" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[82%] rounded-[var(--radius-lg)] px-4 py-3 text-sm',
          isUser
            ? 'rounded-tr-sm bg-[var(--accent-cyan)] text-[var(--bg-primary)]'
            : 'rounded-tl-sm border border-[var(--bg-border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
        )}
      >
        {isUser ? (
          <p className="leading-relaxed">{message.content}</p>
        ) : (
          <MarkdownContent text={message.content} isStreaming={isStreaming} />
        )}
      </div>
    </div>
  )
}
