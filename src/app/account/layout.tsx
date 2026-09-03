import { Metadata } from 'next'
import { NOINDEX_METADATA } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Account',
  ...NOINDEX_METADATA,
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
