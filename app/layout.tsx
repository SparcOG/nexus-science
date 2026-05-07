import type { Metadata } from 'next'
import { Playfair_Display, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nexus Science',
    template: '%s | Nexus Science',
  },
  description:
    'A multi-mode science platform for curious minds. Learn neuroscience, AI, physics, biology and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-body bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  )
}
