import { Metadata } from 'next'
import { NOINDEX_METADATA } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your memory training dashboard. Track your progress across learning paths, view your statistics, and continue your memorization journey.',
  openGraph: {
    title: 'Dashboard | Eduba',
    description: 'Your memory training dashboard. Track your progress across learning paths, view your statistics, and continue your memorization journey.',
  },
  ...NOINDEX_METADATA,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}