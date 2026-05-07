import type { Metadata } from 'next'
import HeroSection from '@/components/shared/HeroSection'
import DomainGrid from '@/components/shared/DomainGrid'

export const metadata: Metadata = {
  title: 'Nexus Science — Where Science Meets Curiosity',
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DomainGrid />
    </main>
  )
}
