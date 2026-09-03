export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function passageSlug(author: string | null, title: string): string {
  const authorPart = slugify(author ?? 'unknown')
  const titlePart = slugify(title)
  return `${authorPart}-${titlePart}`
}

export function authorSlug(author: string): string {
  return slugify(author)
}

export function workSlug(author: string | null, work: string): string {
  const authorPart = slugify(author ?? 'unknown')
  const workPart = slugify(work)
  return `${authorPart}-${workPart}`
}
