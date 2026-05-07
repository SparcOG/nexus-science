'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles } from 'lucide-react'
import ExplainModal from './ExplainModal'

interface FloatingButtonState {
  text: string
  top: number   // viewport-relative (px)
  left: number  // viewport-relative (px)
}

interface ArticleExplainWrapperProps {
  children: React.ReactNode
}

export default function ArticleExplainWrapper({ children }: ArticleExplainWrapperProps) {
  const [floatingBtn, setFloatingBtn] = useState<FloatingButtonState | null>(null)
  const [activeTerm, setActiveTerm] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect text selection on mouseup
  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection()
    const text = sel?.toString().trim() ?? ''

    if (!text || text.length < 2 || text.length > 300 || !sel?.rangeCount) {
      setFloatingBtn(null)
      return
    }

    // Only activate inside the article body
    const range = sel.getRangeAt(0)
    if (!containerRef.current?.contains(range.commonAncestorContainer)) {
      setFloatingBtn(null)
      return
    }

    const rect = range.getBoundingClientRect()
    setFloatingBtn({
      text,
      top: rect.top - 44,             // 44px above the selection
      left: rect.left + rect.width / 2, // horizontally centered on selection
    })
  }, [])

  // Hide button when user scrolls (rect becomes stale)
  useEffect(() => {
    const onScroll = () => setFloatingBtn(null)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseUp])

  const handleExplainClick = useCallback(() => {
    if (!floatingBtn?.text) return
    setActiveTerm(floatingBtn.text)
    setFloatingBtn(null)
    window.getSelection()?.removeAllRanges()
  }, [floatingBtn])

  return (
    <div ref={containerRef}>
      {children}

      {/* Floating "Explain" button — positioned fixed in viewport */}
      {floatingBtn && !activeTerm && (
        <div
          className="pointer-events-auto fixed z-30"
          style={{
            top: floatingBtn.top,
            left: floatingBtn.left,
            transform: 'translateX(-50%)',
          }}
        >
          <button
            // Prevent mousedown from clearing the text selection
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleExplainClick}
            className="flex items-center gap-1.5 rounded-full border border-[var(--accent-cyan)]/40 bg-[var(--bg-secondary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent-cyan)] shadow-lg shadow-black/50 transition-all hover:border-[var(--accent-cyan)] hover:bg-[var(--bg-surface)]"
          >
            <Sparkles size={11} />
            Explain
          </button>
        </div>
      )}

      {/* Explain modal */}
      {activeTerm && (
        <ExplainModal
          term={activeTerm}
          onClose={() => setActiveTerm(null)}
        />
      )}
    </div>
  )
}
