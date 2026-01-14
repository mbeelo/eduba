import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: '#e2b714',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#323437',
          fontWeight: 'bold',
          fontFamily: 'system-ui',
        }}
      >
        E
      </div>
    ),
    {
      ...size,
    }
  )
}