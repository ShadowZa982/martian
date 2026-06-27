import type { Metadata, Viewport } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import GlassFilter from '@/components/GlassFilter'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Martian — Tải VoxelXLauncher',
  description:
    'Martian — trình khởi chạy Minecraft thế hệ mới. Quản lý hồ sơ, cài mod, tự động tải Java và chơi mọi phiên bản. Hỗ trợ Windows, macOS và Linux.',
  keywords: ['Minecraft', 'launcher', 'VoxelXLauncher', 'Martian', 'mod', 'Fabric', 'Forge'],
  openGraph: {
    title: 'Martian — Tải VoxelXLauncher',
    description: 'Trình khởi chạy Minecraft thế hệ mới. Chơi mọi phiên bản, một cú chạm.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='26' fill='%23ff6a3d'/%3E%3Ccircle cx='24' cy='25' r='5' fill='%23bb2d18'/%3E%3Ccircle cx='40' cy='38' r='7' fill='%23bb2d18'/%3E%3Ccircle cx='43' cy='21' r='3' fill='%23bb2d18'/%3E%3C/svg%3E",
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0605',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${sora.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <GlassFilter />
        {children}
      </body>
    </html>
  )
}
