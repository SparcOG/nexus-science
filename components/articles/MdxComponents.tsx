import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ProseProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>

export const mdxComponents = {
  h2: ({ children, className, ...props }: ProseProps<'h2'>) => (
    <h2
      className={cn(
        'mb-4 mt-10 font-display text-2xl font-semibold leading-tight text-[var(--text-primary)] first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, className, ...props }: ProseProps<'h3'>) => (
    <h3
      className={cn(
        'mb-3 mt-8 font-display text-xl font-semibold text-[var(--text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),

  p: ({ children, className, ...props }: ProseProps<'p'>) => (
    <p
      className={cn('mb-5 text-[17px] leading-[1.8] text-[var(--text-secondary)]', className)}
      {...props}
    >
      {children}
    </p>
  ),

  strong: ({ children, className, ...props }: ProseProps<'strong'>) => (
    <strong
      className={cn('font-semibold text-[var(--text-primary)]', className)}
      {...props}
    >
      {children}
    </strong>
  ),

  em: ({ children, className, ...props }: ProseProps<'em'>) => (
    <em className={cn('italic text-[var(--text-accent)]', className)} {...props}>
      {children}
    </em>
  ),

  ul: ({ children, className, ...props }: ProseProps<'ul'>) => (
    <ul
      className={cn('mb-5 ml-5 list-disc space-y-2 marker:text-[var(--text-secondary)]', className)}
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, className, ...props }: ProseProps<'ol'>) => (
    <ol
      className={cn(
        'mb-5 ml-5 list-decimal space-y-2 marker:text-[var(--text-secondary)]',
        className
      )}
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, className, ...props }: ProseProps<'li'>) => (
    <li
      className={cn('text-[17px] leading-relaxed text-[var(--text-secondary)]', className)}
      {...props}
    >
      {children}
    </li>
  ),

  blockquote: ({ children, className, ...props }: ProseProps<'blockquote'>) => (
    <blockquote
      className={cn(
        'my-6 border-l-2 border-[var(--accent-violet)] pl-5 italic text-[var(--text-accent)]',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),

  code: ({ children, className, ...props }: ProseProps<'code'>) => (
    <code
      className={cn(
        'rounded-[4px] bg-[var(--bg-surface)] px-1.5 py-0.5 font-mono text-[14px] text-[var(--accent-cyan)]',
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),

  pre: ({ children, className, ...props }: ProseProps<'pre'>) => (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-[var(--radius)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-5 font-mono text-sm leading-relaxed',
        className
      )}
      {...props}
    >
      {children}
    </pre>
  ),

  a: ({ href, children, className, ...props }: ProseProps<'a'>) => {
    const isExternal = href?.startsWith('http')
    const linkClass = cn(
      'text-[var(--accent-cyan)] underline decoration-[var(--accent-cyan)]/30 transition-colors hover:decoration-[var(--accent-cyan)]',
      className
    )
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href ?? '/'} className={linkClass} {...props}>
        {children}
      </Link>
    )
  },

  hr: ({ className, ...props }: ProseProps<'hr'>) => (
    <hr className={cn('my-10 border-[var(--bg-border)]', className)} {...props} />
  ),
}
