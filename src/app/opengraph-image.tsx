import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 32,
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: 80,
              background: '#e2b714',
              color: '#323437',
              fontWeight: 'bold',
              padding: '20px 40px',
              borderRadius: '12px',
            }}
          >
            eduba
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 48,
              color: '#000000',
              fontWeight: '600',
              maxWidth: '800px',
              lineHeight: 1.2,
            }}
          >
            Train your recall, one minute at a time
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 32,
              color: '#000000',
              opacity: 0.8,
              maxWidth: '700px',
              lineHeight: 1.3,
            }}
          >
            Memorize passages from history&rsquo;s greatest minds
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}