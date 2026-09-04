import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Eduba for support, bug reports, or general questions about traditional scribe training.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
