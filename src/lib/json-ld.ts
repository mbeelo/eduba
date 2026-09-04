import { isPersonAuthor, type SeoPassage } from './seo-content'

const SITE_URL = 'https://www.eduba.co'

export interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function personJsonLd(name: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(description ? { description } : {}),
  }
}

// Shared by creativeWorkJsonLd and workJsonLd: an author is Person-typed
// unless it's one of the non-person (government document) authors.
function authorJsonLd(author: string | null) {
  if (!author) return {}
  return { author: { '@type': isPersonAuthor(author) ? 'Person' : 'Organization', name: author } }
}

export function creativeWorkJsonLd(passage: SeoPassage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: passage.title,
    text: passage.content,
    ...authorJsonLd(passage.author),
    ...(passage.work ? { isPartOf: { '@type': 'CreativeWork', name: passage.work } } : {}),
    url: `${SITE_URL}/passages/${passage.slug}`,
    ...(passage.seo_description ? { description: passage.seo_description } : {}),
    ...(passage.theme_tags && passage.theme_tags.length > 0 ? { keywords: passage.theme_tags.join(', ') } : {}),
  }
}

export function workJsonLd(work: string, author: string | null, description: string | undefined, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work,
    ...authorJsonLd(author),
    ...(description ? { description } : {}),
    url,
  }
}

export { SITE_URL }
