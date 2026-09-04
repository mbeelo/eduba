import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Eduba\'s privacy policy — what information we collect and how it\'s used.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
