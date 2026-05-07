'use client'

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
  isLoading: boolean
  initialValue?: string
}

export default function ChatInput({ onSend, isLoading, initialValue = '' }: ChatInputProps) {
  const [value, setValue] = useState(initialValue)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sync if parent changes initialValue (e.g. suggested question clicked)
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
      textareaRef.current?.focus()
    }
  }, [initialValue])

  // Auto-resize textarea up to 160px
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [value])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setValue('')
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-end gap-3">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a science question… (Enter to send, Shift+Enter for new line)"
          rows={1}
          disabled={isLoading}
          className="w-full resize-none rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] px-4 py-3 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-colors focus:border-[var(--accent-cyan)] focus:outline-none disabled:opacity-50"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        aria-label="Send message"
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--accent-cyan)] text-[var(--bg-primary)] transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--bg-primary)] border-t-transparent" />
        ) : (
          <Send size={16} />
        )}
      </button>
    </div>
  )
}
