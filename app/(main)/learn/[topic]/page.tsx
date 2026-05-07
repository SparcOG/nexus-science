import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DOMAINS } from '@/lib/constants'
import FlashcardSession from '@/components/learn/FlashcardSession'

interface TopicPageProps {
  params: { topic: string }
}

export async function generateStaticParams() {
  return DOMAINS.map((d) => ({ topic: d.id }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const domain = DOMAINS.find((d) => d.id === params.topic)
  if (!domain) return {}
  return {
    title: `Learn ${domain.name}`,
    description: `AI-generated flashcards for ${domain.name}. ${domain.description ?? ''}`,
  }
}

export default function TopicPage({ params }: TopicPageProps) {
  const domain = DOMAINS.find((d) => d.id === params.topic)
  if (!domain) notFound()

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      {/*
        FlashcardSession is a Client Component. It receives the domain object
        as a serializable prop from this Server Component — valid App Router pattern.
      */}
      <FlashcardSession domain={domain} />
    </main>
  )
}
