import type { Metadata } from 'next'
import ResearchChat from '@/components/research/ResearchChat'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Multi-turn science chat powered by Claude AI. Ask anything about neuroscience, physics, biology, AI, and more.',
}

export default function ResearchPage() {
  return <ResearchChat />
}
