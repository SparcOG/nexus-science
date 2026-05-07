# Nexus Science

A multi-mode science platform for curious minds. Learn neuroscience, AI, physics, biology, chemistry, and more — with AI-powered explanations, spaced-repetition flashcards, and a built-in research assistant.

**Live:** [nexus-science.vercel.app](https://nexus-science.vercel.app) *(update after deploy)*

---

## What it does

- **Science magazine** — articles on neuroscience, AI, physics, biology, chemistry, and history of science
- **Learning platform** — topic pages with AI-generated spaced-repetition flashcards
- **AI research assistant** — multi-turn Claude-powered chat for science questions
- **Highlight to explain** — select any text in an article and get a 3-level explanation (simple / medium / expert)

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS variables |
| UI components | shadcn/ui |
| AI | Anthropic Claude (via `@anthropic-ai/sdk`) |
| Fonts | Playfair Display, IBM Plex Sans, JetBrains Mono |
| Deployment | Vercel |

---

## Local setup

**1. Clone the repo**

```bash
git clone https://github.com/YOUR_USERNAME/nexus-science.git
cd nexus-science
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```bash
ANTHROPIC_API_KEY=sk-ant-...          # Get from console.anthropic.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Supabase variables are optional until the database features are built.

**4. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check (no emit)
npm run format       # Prettier format
```

---

## Project structure

```
app/
  (main)/            # All user-facing pages
    page.tsx         # Homepage
    articles/        # Science magazine
    learn/           # Flashcard learning platform
    research/        # AI research chat
    about/           # About page
  api/ai/            # Claude API routes (server-side only)
    explain/         # Highlight-to-explain endpoint
    chat/            # Research assistant chat
    flashcards/      # Flashcard generator
components/
  layout/            # Nav, Footer
  articles/          # Article cards, reader, headers
  learn/             # Flashcard UI, progress bar
  research/          # Chat UI, explain modal
  shared/            # Hero, domain grid, reusable pieces
lib/
  anthropic.ts       # Anthropic client (server-only)
  prompts.ts         # All Claude system prompts
  constants.ts       # Domain definitions, app constants
content/articles/    # MDX article files
```

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL, e.g. `https://nexus-science.vercel.app`)
4. Deploy — Vercel auto-detects Next.js

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Claude API key from console.anthropic.com |
| `NEXT_PUBLIC_APP_URL` | Yes | Full URL of the app (no trailing slash) |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL (when DB is added) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (server-only) |

---

Built by [Igor Stashok](https://github.com/YOUR_USERNAME).
