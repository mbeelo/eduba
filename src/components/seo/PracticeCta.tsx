'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface PracticeCtaProps {
  slug: string
  title: string
  path: string
  fallbackHref: string
}

export function PracticeCta({ slug, title, path, fallbackHref }: PracticeCtaProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    setFailed(false)

    // Always resolve the current id live — the raw DB id can rotate on a
    // content reseed, so it must never be baked into a statically
    // generated page.
    const { data, error } = await supabase.from('passages').select('id').eq('slug', slug).single()

    if (error || !data) {
      setLoading(false)
      setFailed(true)
      return
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'seo_passage_to_practice', {
        passage_slug: slug,
        passage_title: title,
        collection: path,
      })
    }

    router.push(`/practice/${data.id}`)
  }

  if (failed) {
    return (
      <a href={fallbackHref} className="button-primary px-6 py-3 text-base font-medium inline-block">
        Browse this collection
      </a>
    )
  }

  return (
    <Button onClick={handleClick} loading={loading} size="lg">
      Practice this passage
    </Button>
  )
}
