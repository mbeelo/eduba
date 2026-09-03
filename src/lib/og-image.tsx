// Shared layout for the per-page dynamic OG images (passages/authors/works/
// collections opengraph-image.tsx). Not a real React component — this JSX
// tree is handed directly to next/og's ImageResponse (Satori), so it can't
// use hooks or any React feature Satori doesn't support, just plain markup.
// Every div with more than one child needs an explicit `display` — Satori
// requires this, unlike normal CSS.

export const ogImageSize = {
  width: 1200,
  height: 630,
}

export const ogImageContentType = 'image/png'

export function OgCard({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        background: '#ffffff',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui',
        padding: 80,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            background: '#e2b714',
            color: '#323437',
            fontWeight: 'bold',
            padding: '12px 28px',
            borderRadius: '10px',
          }}
        >
          eduba
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 56,
            color: '#000000',
            fontWeight: '700',
            maxWidth: '960px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#000000',
              opacity: 0.7,
              fontWeight: '500',
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
