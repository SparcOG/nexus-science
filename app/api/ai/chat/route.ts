import { z } from 'zod'
import { anthropic } from '@/lib/anthropic'
import { RESEARCH_CHAT_PROMPT } from '@/lib/prompts'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
})

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = bodySchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { data: null, error: 'Invalid message format.' },
        { status: 400 }
      )
    }

    const stream = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: RESEARCH_CHAT_PROMPT,
      messages: parsed.data.messages,
      stream: true,
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(event.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return Response.json(
      { data: null, error: 'AI service unavailable. Check your ANTHROPIC_API_KEY.' },
      { status: 500 }
    )
  }
}
