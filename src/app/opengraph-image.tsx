import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Martian — Tải VoxelXLauncher'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
            'radial-gradient(900px 600px at 78% 22%, #7a2a16 0%, #2a0f08 45%, #0a0605 80%)',
          color: '#fff',
          fontFamily: 'Be Vietnam Pro',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 90,
            right: 110,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 30%, #ff8a4c, #e2462f 55%, #7a1f10 100%)',
            boxShadow: '0 0 120px 10px rgba(255,90,45,0.45)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 35% 30%, #ff8a4c, #e2462f 60%, #7a1f10)',
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
            MARTIAN
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 780 }}>
            Tải VoxelXLauncher
          </div>
          <div style={{ fontSize: 32, color: 'rgba(255,225,210,0.85)', maxWidth: 740 }}>
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
