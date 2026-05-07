import type { TopicProgress } from '@/types'

const STORAGE_KEY = 'nexus-progress'

type ProgressStore = Record<string, TopicProgress>

function readStore(): ProgressStore {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as ProgressStore
  } catch {
    return {}
  }
}

function writeStore(store: ProgressStore): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getTopicProgress(key: string): TopicProgress {
  return readStore()[key] ?? { seen: [], mastered: [], lastStudied: '' }
}

export function getAllProgress(): ProgressStore {
  return readStore()
}

export function markSeen(key: string, cardId: string): void {
  const store = readStore()
  const topic = store[key] ?? { seen: [], mastered: [], lastStudied: '' }
  if (!topic.seen.includes(cardId)) {
    topic.seen = [...topic.seen, cardId]
  }
  topic.lastStudied = new Date().toISOString()
  store[key] = topic
  writeStore(store)
}

export function markMastered(key: string, cardId: string): void {
  const store = readStore()
  const topic = store[key] ?? { seen: [], mastered: [], lastStudied: '' }
  if (!topic.seen.includes(cardId)) topic.seen = [...topic.seen, cardId]
  if (!topic.mastered.includes(cardId)) topic.mastered = [...topic.mastered, cardId]
  topic.lastStudied = new Date().toISOString()
  store[key] = topic
  writeStore(store)
}

export function unmarkMastered(key: string, cardId: string): void {
  const store = readStore()
  const topic = store[key] ?? { seen: [], mastered: [], lastStudied: '' }
  topic.mastered = topic.mastered.filter((id) => id !== cardId)
  store[key] = topic
  writeStore(store)
}

export function clearTopicProgress(key: string): void {
  const store = readStore()
  delete store[key]
  writeStore(store)
}

export function progressPercent(mastered: number, total: number): number {
  if (total === 0) return 0
  return Math.round((mastered / total) * 100)
}
