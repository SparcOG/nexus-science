'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Atom, RotateCcw } from 'lucide-react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import type { AIMessage } from '@/types'

const SUGGESTED_QUESTIONS = [
  'What actually happens in the brain during a stroke?',
  'How does CRISPR-Cas9 edit DNA at the molecular level?',
  'Why does quantum computing need temperatures near absolute zero?',
  'What is the difference between dopamine and serotonin?',
  'How do vaccines train the immune system to recognize viruses?',
  'What makes a black hole radiate energy (Hawking radiation)?',
]

const TOPIC_CHIPS = [
  { label: 'Neuroscience', color: 'var(--accent-violet)' },
  { label: 'AI & CS', color: 'var(--accent-cyan)' },
  { label: 'Physics', color: 'var(--accent-amber)' },
  { label: 'Biology', color: 'var(--accent-emerald)' },
  { label: 'Medicine', color: 'var(--accent-rose)' },
]

export default function ResearchChat() {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingQuestion, setPendingQuestion] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages or streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return

      const userMessage: AIMessage = {
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setError(null)
      setStreamingText('')

      try {
        // Build the messages array for the API (role + content only)
        const apiMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }))

        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        })

        if (!response.ok) {
          const errJson = (await response.json()) as { error: string }
          throw new Error(errJson.error ?? `HTTP ${response.status}`)
        }

        if (!response.body) throw new Error('No response body from server.')

        // Read streaming chunks
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          fullText += chunk
          setStreamingText(fullText)
        }

        // Commit the full response as a real message
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: fullText,
            timestamp: new Date().toISOString(),
          },
        ])
        setStreamingText('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
        setStreamingText('')
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading]
  )

  const handleSuggestedQuestion = useCallback(
    (q: string) => {
      setPendingQuestion(q)
    },
    []
  )

  const clearChat = useCallback(() => {
    setMessages([])
    setStreamingText('')
    setError(null)
    setPendingQuestion('')
  }, [])

  const hasMessages = messages.length > 0 || isLoading

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* ── Page header ── */}
      <div className="flex-none border-b border-[var(--bg-border)] px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Research
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Multi-turn science chat powered by Claude
            </p>
          </div>
          {hasMessages && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
            >
              <RotateCcw size={13} />
              New chat
            </button>
          )}
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          /* Empty state */
          <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mx-auto w-full max-w-lg">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--bg-border)] bg-[var(--bg-secondary)]">
                  <Atom size={28} className="text-[var(--accent-cyan)]" />
                </div>
              </div>

              <h2 className="mb-2 font-display text-3xl font-bold text-[var(--text-primary)]">
                Ask anything.
              </h2>
              <p className="mb-8 text-[var(--text-secondary)]">
                From quantum mechanics to the neuroscience of memory — Claude knows the science.
              </p>

              {/* Topic chips */}
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {TOPIC_CHIPS.map((chip) => (
                  <span
                    key={chip.label}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${chip.color} 15%, transparent)`,
                      color: chip.color,
                    }}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              {/* Suggested questions */}
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-secondary)] px-4 py-3 text-left text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--accent-cyan)]/40 hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {/* Streaming response */}
            {streamingText && (
              <ChatMessage
                message={{
                  role: 'assistant',
                  content: streamingText,
                  timestamp: new Date().toISOString(),
                }}
                isStreaming
              />
            )}

            {/* Loading indicator (before first token arrives) */}
            {isLoading && !streamingText && (
              <div className="flex gap-3">
                <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--bg-border)] bg-[var(--bg-surface)]">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--bg-border)] border-t-[var(--accent-cyan)]" />
                </div>
                <div className="flex items-center gap-1 rounded-[var(--radius-lg)] rounded-tl-sm border border-[var(--bg-border)] bg-[var(--bg-secondary)] px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-[var(--radius)] border border-[var(--accent-rose)]/30 bg-[var(--accent-rose)]/10 px-4 py-3 text-sm text-[var(--accent-rose)]">
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div className="flex-none border-t border-[var(--bg-border)] bg-[var(--bg-primary)]/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            initialValue={pendingQuestion}
            key={pendingQuestion} // remounts to sync initialValue
          />
        </div>
      </div>
    </div>
  )
}
