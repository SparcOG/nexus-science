import { z } from 'zod'
import { anthropic } from '@/lib/anthropic'
import { FLASHCARD_GENERATOR_PROMPT } from '@/lib/prompts'
import type { Flashcard } from '@/types'

const bodySchema = z.object({
  topic: z.string().min(1).max(200),
  domain: z.string().min(1).max(100),
})

type RawCard = {
  front: string
  backSimple: string
  backExpert: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = bodySchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { data: null, error: 'Provide a topic (1–200 chars) and domain.' },
        { status: 400 }
      )
    }

    const { topic, domain } = parsed.data

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: FLASHCARD_GENERATOR_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate flashcards for the topic: "${topic}" (Domain: ${domain})`,
        },
      ],
    })

    const responseContent = message.content[0]
    if (responseContent.type !== 'text') {
      return Response.json(
        { data: null, error: 'Unexpected response format from AI.' },
        { status: 500 }
      )
    }

    console.log('[flashcards] raw Claude response:', responseContent.text)

    // Strip markdown code fences if Claude wrapped the JSON
    const cleaned = responseContent.text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    let rawCards: RawCard[]
    try {
      rawCards = JSON.parse(cleaned) as RawCard[]
    } catch {
      console.error('[flashcards] JSON parse failed. Received:', cleaned.slice(0, 300))
      return Response.json(
        { data: null, error: `AI returned unexpected format. Got: ${cleaned.slice(0, 120)}…` },
        { status: 500 }
      )
    }

    if (!Array.isArray(rawCards) || rawCards.length === 0) {
      return Response.json(
        { data: null, error: 'AI returned an empty card set. Try a different topic.' },
        { status: 500 }
      )
    }

    const cards: Flashcard[] = rawCards.map((card) => ({
      id: crypto.randomUUID(),
      front: card.front,
      backSimple: card.backSimple,
      backExpert: card.backExpert,
      difficulty: card.difficulty,
      domain,
    }))

    return Response.json({ data: cards, error: null })
  } catch (err) {
    console.error('[flashcards] unexpected error:', err)
    return Response.json(
      { data: null, error: 'AI service unavailable. Check your ANTHROPIC_API_KEY.' },
      { status: 500 }
    )
  }
}
