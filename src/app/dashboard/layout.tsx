import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your memory training dashboard. Track your progress across learning paths, view your statistics, and continue your memorization journey.',
  openGraph: {
    title: 'Dashboard | Eduba',
    description: 'Your memory training dashboard. Track your progress across learning paths, view your statistics, and continue your memorization journey.',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}