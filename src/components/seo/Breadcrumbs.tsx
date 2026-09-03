import Link from 'next/link'
import { breadcrumbJsonLd, type BreadcrumbItem } from '@/lib/json-ld'

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm mb-6" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.url} className="hover:underline" style={{ color: 'var(--accent)' }}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
