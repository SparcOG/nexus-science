export interface Domain {
  id: string
  name: string
  accent: string
  accentHex: string
  icon: string
  topics: string[]
  href: string
  description?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  domain: string
  domainId: string
  accentHex: string
  author: string
  publishedAt: string
  readingTime: number
  coverImage?: string
  tags?: string[]
}

export interface ArticleWithContent {
  frontmatter: Article
  content: string
}

export interface Flashcard {
  id: string
  front: string
  backSimple: string   // B1 English — plain language
  backExpert: string   // Technical explanation for experts
  domain: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface TopicProgress {
  seen: string[]       // card IDs the user has flipped
  mastered: string[]   // card IDs marked "Got it!"
  lastStudied: string  // ISO date string
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type ExplainLevel = 'simple' | 'medium' | 'expert'

export interface ExplainResponse {
  term: string
  simple: string
  medium: string
  expert: string
  example: string
}
