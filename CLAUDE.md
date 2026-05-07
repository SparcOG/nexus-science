# CLAUDE.md — Project Intelligence File
# Science & AI Learning Platform
# Owner: Igor Stashok | Stack: Next.js 14 + Tailwind CSS + TypeScript

> This file is read by Claude Code automatically on every session.
> It defines HOW to build this project: structure, rules, style, tools, commands.
> Never delete this file. Update it as the project grows.

---

## 1. PROJECT IDENTITY

**Name:** (choose later — placeholder: "Nexus")
**Type:** Multi-mode science platform
- 📚 Learning platform — interactive lessons, flashcards, spaced repetition
- 📰 Science magazine — articles, deep dives, topic pages
- 🤖 AI research tool — Claude-powered search, explanation, summarization
- 🎯 Portfolio & showcase — Igor's work, projects, credentials

**Target user:** Curious adults (B1–C1 English), interested in neuroscience, medicine, AI, physics, chemistry, space, biotech, history.

**Tone:** Smart but not arrogant. Beautiful but not flashy. Like a well-designed science journal meets interactive app.

---

## 2. TECH STACK — DECISIONS & REASONS

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SEO, routing, server components, API routes — all in one |
| Language | **TypeScript** | Catches errors early, better autocomplete, scales well |
| Styling | **Tailwind CSS + custom CSS variables** | Fast utility classes + full control for unique design |
| UI Components | **shadcn/ui** | Copy-paste components, fully customizable, not locked in |
| AI Integration | **Anthropic SDK (@anthropic-ai/sdk)** | Claude API for AI features |
| Database | **Supabase** (when ready) | Postgres + auth + real-time, generous free tier |
| State Management | **Zustand** | Simple, lightweight, no boilerplate |
| Animations | **Framer Motion** | Best React animation library |
| Icons | **Lucide React** | Clean, consistent icon set |
| Fonts | **Via next/font** | Fast, no layout shift |
| Deployment | **Vercel** | One-click deploy, already connected |

---

## 3. PROJECT STRUCTURE

```
/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages group
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/                   # Main app group
│   │   ├── layout.tsx            # Main layout with nav + footer
│   │   ├── page.tsx              # Homepage / landing
│   │   ├── learn/                # Learning platform
│   │   │   ├── page.tsx          # Topics list
│   │   │   └── [topic]/page.tsx  # Topic page with cards
│   │   ├── articles/             # Science magazine
│   │   │   ├── page.tsx          # Article feed
│   │   │   └── [slug]/page.tsx   # Single article
│   │   ├── research/             # AI research tool
│   │   │   └── page.tsx          # AI-powered search/explain
│   │   └── about/page.tsx        # Portfolio / about Igor
│   └── api/                      # API routes
│       ├── ai/
│       │   ├── explain/route.ts  # Claude explain endpoint
│       │   └── search/route.ts   # Claude search endpoint
│       └── articles/route.ts     # Articles CRUD
│
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── layout/                   # Nav, Footer, Sidebar
│   ├── learn/                    # Learning-specific components
│   ├── articles/                 # Article cards, reader
│   ├── research/                 # AI chat, search UI
│   └── shared/                   # Buttons, cards, badges used everywhere
│
├── lib/
│   ├── anthropic.ts              # Claude API client setup
│   ├── supabase.ts               # Supabase client setup
│   ├── utils.ts                  # Helper functions
│   └── constants.ts              # App-wide constants
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
├── content/                      # Static MDX articles (before DB)
│   └── articles/
│       └── example.mdx
│
├── public/
│   ├── fonts/
│   └── images/
│
├── styles/
│   └── globals.css               # Tailwind base + CSS variables
│
├── .env.local                    # Secrets (NEVER commit this)
├── .env.example                  # Template for secrets (commit this)
├── tailwind.config.ts
├── tsconfig.json
└── CLAUDE.md                     # ← This file
```

---

## 4. DESIGN SYSTEM

### Color Palette (CSS variables in globals.css)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0f;        /* Near black — main background */
  --bg-secondary: #111118;      /* Slightly lighter — cards */
  --bg-surface: #1a1a24;        /* Elevated surfaces */
  --bg-border: #2a2a38;         /* Borders */

  /* Text */
  --text-primary: #e8e8f0;      /* Main text */
  --text-secondary: #8888a8;    /* Muted / labels */
  --text-accent: #a0a0c8;       /* Subtle highlight */

  /* Brand Accents */
  --accent-cyan: #00d4ff;       /* Science / AI topics */
  --accent-violet: #8b5cf6;     /* Medicine / neuroscience */
  --accent-emerald: #10b981;    /* Biology / nature */
  --accent-amber: #f59e0b;      /* Physics / space */
  --accent-rose: #f43f5e;       /* Chemistry / molecular */

  /* Functional */
  --radius: 8px;
  --radius-lg: 16px;
}
```

### Typography

```css
/* In tailwind.config.ts — add these fonts via next/font */
Display font:  "Playfair Display" — headings, article titles, hero text
Body font:     "IBM Plex Sans"    — all body text, UI elements
Mono font:     "JetBrains Mono"   — code blocks, technical terms
```

### Component Rules
- Cards: `bg-[--bg-secondary]`, rounded-[--radius-lg], border border-[--bg-border]
- Buttons primary: accent color background, dark text, rounded-full
- Buttons secondary: transparent, border, hover fills
- All interactive elements: transition-all duration-200
- Hover states: always defined, never forgotten

---

## 5. CODING RULES — ALWAYS FOLLOW

### General
- **TypeScript strict mode** — no `any` type unless absolutely necessary
- **No inline styles** — use Tailwind classes or CSS variables only
- **No console.log in production** — use proper error handling
- **Every component gets its own file** — no 300+ line files
- **Descriptive names** — `ArticleCard` not `Card2`, `useTopicData` not `useFetch`

### React / Next.js
- Use **Server Components by default** — only add `"use client"` when needed (user interactions, hooks, browser APIs)
- **Loading states always** — every data fetch needs a loading skeleton
- **Error boundaries** — wrap page sections that can fail
- **`next/image`** for all images — never raw `<img>` tags
- **`next/link`** for all internal navigation — never `<a href>`

### API Routes
- All Claude API calls go through `/app/api/` — never call Anthropic directly from client
- Always validate input with Zod before processing
- Return consistent JSON: `{ data: ..., error: null }` or `{ data: null, error: "message" }`
- Rate limit sensitive endpoints

### File Naming
- Components: `PascalCase.tsx` (e.g., `ArticleCard.tsx`)
- Pages: `page.tsx` (Next.js convention)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.ts` (e.g., `article.types.ts`)

---

## 6. AI INTEGRATION — CLAUDE API

### Setup (lib/anthropic.ts)
```typescript
import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // server-side only
});
```

### Available AI Features — Build in this order
1. **Explain Term** — user highlights any word → Claude explains at 3 levels (B1 / medium / expert)
2. **Article Summarizer** — paste article URL → Claude summarizes + extracts key concepts
3. **Topic Deep Dive** — user asks a science question → Claude answers with sources
4. **Flashcard Generator** — Claude turns any topic into spaced-repetition cards
5. **Research Assistant** — multi-turn chat for deep research sessions

### Prompt Templates
Store all system prompts in `lib/prompts.ts` — never hardcode them in route handlers.

```typescript
// lib/prompts.ts
export const EXPLAIN_TERM_PROMPT = `
You are a science educator. Explain the given term at three levels:
1. Simple (B1 English, no jargon)
2. Medium (university student)
3. Expert (researcher level)
Always give one real-world example. Be concise.
`;
```

---

## 7. CONTENT DOMAINS — TOPIC STRUCTURE

The platform covers these science domains. Each gets its own color accent and icon.

| Domain | Accent Color | Icon | Topics |
|---|---|---|---|
| Neuroscience | `--accent-violet` | Brain | Memory, Consciousness, Dopamine, Plasticity |
| Medicine | `--accent-rose` | Stethoscope | Pharmacology, Disease, Treatment, Research |
| AI & CS | `--accent-cyan` | Cpu | Machine Learning, LLMs, Algorithms, Ethics |
| Physics | `--accent-amber` | Atom | Quantum, Relativity, Space, Materials |
| Biology | `--accent-emerald` | Dna | Genetics, Evolution, Cells, Biotech |
| Chemistry | `--accent-rose` | FlaskConical | Molecules, Reactions, Biochemistry |
| History | `--accent-amber` | BookOpen | Science history, Discoveries, Figures |

---

## 8. ENVIRONMENT VARIABLES

**Required in `.env.local`:**
```bash
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Supabase (when ready)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Never commit `.env.local`** — it is in `.gitignore`.
Always update `.env.example` with new variable names (no values).

---

## 9. DEVELOPMENT COMMANDS

```bash
# Install dependencies
npm install

# Run development server
npm run dev          # → http://localhost:3000

# Build for production
npm run build

# Type check
npm run type-check   # tsc --noEmit

# Lint
npm run lint

# Format
npm run format       # prettier --write .
```

---

## 10. HOW TO ADD A NEW FEATURE — CHECKLIST

Before starting any new feature, follow this order:

- [ ] Define the TypeScript interface/type first (`types/index.ts`)
- [ ] Create the API route if needed (`app/api/...`)
- [ ] Build the smallest working version (no style yet)
- [ ] Add loading state
- [ ] Add error state
- [ ] Style with Tailwind + design system tokens
- [ ] Add Framer Motion animation
- [ ] Test on mobile (375px) and desktop (1440px)
- [ ] Check TypeScript: `npm run type-check`

---

## 11. WHAT CLAUDE CODE SHOULD ALWAYS DO

When I ask you to build something:
1. **Read this file first** — understand the context
2. **Follow the structure** — put files in the right folders
3. **Use TypeScript** — all new files are `.tsx` or `.ts`
4. **Use the design system** — CSS variables, not hardcoded colors
5. **Write loading + error states** — never just the happy path
6. **Explain what you built** — 3 sentences max after each task
7. **Flag risks** — if something might break, say so immediately
8. **Ask before inventing** — if you need a design decision, ask me (Igor)

When I say: "build the homepage" — build it.
When I say: "add AI explain feature" — build the API route + the UI component + connect them.
When I say: "fix this" + paste error — fix it, explain root cause in 1 sentence.

---

## 12. MVP SCOPE — BUILD IN THIS ORDER

**Phase 1 — Foundation (Week 1–2)**
- [ ] Project setup: Next.js + Tailwind + TypeScript + shadcn/ui
- [ ] Design system: globals.css with all CSS variables
- [ ] Layout: Nav + Footer components
- [ ] Homepage: Hero + domain grid + featured article preview

**Phase 2 — Content (Week 3–4)**
- [ ] Articles section: list page + article reader page
- [ ] 3 real articles written (neuroscience, AI, physics)
- [ ] Topic pages with domain color system

**Phase 3 — AI Features (Week 5–6)**
- [ ] `/api/ai/explain` route
- [ ] Highlight-to-explain UI component (works on any article)
- [ ] Research chat page (multi-turn Claude conversation)

**Phase 4 — Learning (Week 7–8)**
- [ ] Flashcard component
- [ ] Topic → auto-generate flashcards via Claude
- [ ] Simple progress tracking (localStorage first, Supabase later)

**Phase 5 — Polish & Launch**
- [ ] Mobile optimization
- [ ] SEO metadata on all pages
- [ ] Deploy to Vercel
- [ ] Share with first 10 users

---

## 13. IGOR'S CONTEXT — REMEMBER THIS

- English level: B1 — explain technical terms simply on first use
- Self-taught developer — explain WHY, not just HOW
- Building from Belarus — Vercel + GitHub workflow works fine
- This connects to Lexiq (vocabulary app) — future integration possible
- Goal: build something real, ship it, grow it

---

*Last updated: May 2026 | Version: 1.0*
*Update this file when the project direction changes.*