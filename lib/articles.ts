import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Article, ArticleWithContent } from '@/types'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(ARTICLES_DIR)

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(ARTICLES_DIR, file)
      const source = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(source)

      return {
        id: slug,
        slug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        domain: data.domain as string,
        domainId: data.domainId as string,
        accentHex: data.accentHex as string,
        author: data.author as string,
        publishedAt: data.publishedAt as string,
        readingTime: data.readingTime as number,
        tags: data.tags as string[] | undefined,
      } satisfies Article
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleBySlug(slug: string): ArticleWithContent | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) return null

  const source = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(source)

  return {
    frontmatter: {
      id: slug,
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      domain: data.domain as string,
      domainId: data.domainId as string,
      accentHex: data.accentHex as string,
      author: data.author as string,
      publishedAt: data.publishedAt as string,
      readingTime: data.readingTime as number,
      tags: data.tags as string[] | undefined,
    } satisfies Article,
    content,
  }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
