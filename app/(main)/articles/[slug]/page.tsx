import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticleBySlug, getAllSlugs } from '@/lib/articles'
import ArticleHeader from '@/components/articles/ArticleHeader'
import { mdxComponents } from '@/components/articles/MdxComponents'
import ArticleExplainWrapper from '@/components/research/ArticleExplainWrapper'

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const result = getArticleBySlug(params.slug)
  if (!result) return {}

  return {
    title: result.frontmatter.title,
    description: result.frontmatter.excerpt,
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const result = getArticleBySlug(params.slug)
  if (!result) notFound()

  const { frontmatter, content } = result

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <ArticleHeader article={frontmatter} />

      {/*
        ArticleExplainWrapper is a Client Component.
        MDXRemote (Server Component) is passed as children —
        this is valid in Next.js App Router via the children prop pattern.
      */}
      <ArticleExplainWrapper>
        <div className="mt-2">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </ArticleExplainWrapper>

      {/* Author footer */}
      <footer className="mt-16 flex items-center gap-3 border-t border-[var(--bg-border)] pt-8">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: frontmatter.accentHex }}
        >
          IS
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">{frontmatter.author}</p>
          <p className="text-xs text-[var(--text-secondary)]">Science writer & developer</p>
        </div>
      </footer>
    </main>
  )
}
