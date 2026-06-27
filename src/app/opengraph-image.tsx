import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Martian — Tải VoxelXLauncher'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const marsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
  <defs>
    <radialGradient id="mars" cx="38%" cy="32%" r="78%">
      <stop offset="0%" stop-color="#ffb184"/>
      <stop offset="45%" stop-color="#e2462f"/>
      <stop offset="100%" stop-color="#6e1c0f"/>
    </radialGradient>
    <clipPath id="disc"><circle cx="100" cy="104" r="64"/></clipPath>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="11"/>
    </filter>
  </defs>
  <circle cx="100" cy="104" r="72" fill="#ff5a2d" opacity="0.45" filter="url(#glow)"/>
  <ellipse cx="108" cy="112" rx="104" ry="38" transform="rotate(-24 108 112)" fill="none" stroke="#ff9a5c" stroke-width="7" opacity="0.85"/>
  <circle cx="100" cy="104" r="64" fill="url(#mars)"/>
  <g clip-path="url(#disc)">
    <ellipse cx="100" cy="50" rx="28" ry="11" fill="#ffe0cc" opacity="0.85"/>
    <circle cx="76" cy="82" r="14" fill="#a32a16"/>
    <circle cx="122" cy="74" r="7" fill="#a32a16"/>
    <circle cx="116" cy="122" r="18" fill="#9c2613"/>
    <circle cx="70" cy="120" r="10" fill="#a32a16"/>
    <ellipse cx="96" cy="102" rx="11" ry="5" fill="#b3331c"/>
    <circle cx="92" cy="140" r="6" fill="#a32a16"/>
    <circle cx="132" cy="132" r="66" fill="#350d06" opacity="0.42"/>
  </g>
</svg>`

const marsUri = `data:image/svg+xml,${encodeURIComponent(marsSvg)}`

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([
    fetch(new URL('./_og/BeVietnamPro-Regular.ttf', import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL('./_og/BeVietnamPro-Bold.ttf', import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(900px 600px at 80% 24%, #5c2113 0%, #240d07 48%, #0a0605 82%)',
          color: '#fff',
          fontFamily: 'Be Vietnam Pro',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={marsUri}
          width={420}
          height={420}
          alt=""
          style={{ position: 'absolute', top: 40, right: 60 }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={marsUri} width={52} height={52} alt="" />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
            MARTIAN
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 720 }}>
            Tải VoxelXLauncher
          </div>
          <div style={{ fontSize: 32, color: 'rgba(255,225,210,0.85)', maxWidth: 700 }}>
            Trình khởi chạy Minecraft thế hệ mới — hồ sơ, mod, Java tự động.
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
            {['Windows', 'macOS', 'Linux'].map((os) => (
              <div
                key={os}
                style={{
                  fontSize: 24,
                  padding: '8px 20px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {os}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Be Vietnam Pro', data: regular, weight: 400, style: 'normal' },
        { name: 'Be Vietnam Pro', data: bold, weight: 700, style: 'normal' },
      ],
    }
  )
}
