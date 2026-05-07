import { z } from 'zod'
import { anthropic } from '@/lib/anthropic'
import { EXPLAIN_TERM_PROMPT } from '@/lib/prompts'

const bodySchema = z.object({
  term: z.string().min(1).max(500),
  context: z.string().max(500).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = bodySchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { data: null, error: 'Invalid input. Provide a term (1–500 chars).' },
        { status: 400 }
      )
    }

    const { term, context } = parsed.data

    const userMessage = context
      ? `Explain this term: "${term}"\n\nArticle context: "${context}"`
      : `Explain this term: "${term}"`

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: EXPLAIN_TERM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const responseContent = message.content[0]
    if (responseContent.type !== 'text') {
      return Response.json(
        { data: null, error: 'Unexpected response format from AI.' },
        { status: 500 }
      )
    }

    const parsed_data = JSON.parse(responseContent.text) as {
      simple: string
      medium: string
      expert: string
      example: string
    }

    return Response.json({ data: { term, ...parsed_data }, error: null })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return Response.json(
        { data: null, error: 'AI returned an unexpected format. Try again.' },
        { status: 500 }
      )
    }
    return Response.json(
      { data: null, error: 'AI service unavailable. Check your ANTHROPIC_API_KEY.' },
      { status: 500 }
    )
  }
}
