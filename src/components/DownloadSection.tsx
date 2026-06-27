'use client'

import {
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
  DownloadSimple,
  type Icon,
} from '@phosphor-icons/react'
import LiquidGlass from './LiquidGlass'
import Reveal from './Reveal'
import { useDownload } from './DownloadContext'
import type { OsKey } from '@/lib/github'

const PLATFORMS: { icon: Icon; label: string; note: string; os: OsKey }[] = [
  { icon: WindowsLogo, label: 'Windows', note: 'Installer & bản portable (.exe)', os: 'windows' },
  { icon: AppleLogo, label: 'macOS', note: 'Apple Silicon & Intel (.dmg)', os: 'mac' },
  { icon: LinuxLogo, label: 'Linux', note: 'AppImage · .deb · AUR', os: 'linux' },
]

export default function DownloadSection() {
  const { total, open } = useDownload()

  return (
    <section id="download" className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <Reveal>
        <LiquidGlass strong className="overflow-hidden p-10 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_50%_0%,rgba(255,90,45,0.22),transparent_55%)]" />

          <h2 className="text-balance text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
            Sẵn sàng bắt đầu hành trình?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-lg text-white/60">
            Tải Martian ngay hôm nay. Java được đóng gói sẵn — không cần cài đặt thủ công trên bất kỳ nền tảng nào.
          </p>

          <button
            onClick={() => open()}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-mars-600 to-mars-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-mars-900/50 transition hover:from-mars-500 hover:to-mars-400"
          >
            <DownloadSimple weight="bold" className="h-5 w-5 transition group-hover:-translate-y-0.5" />
            Tải xuống ngay
          </button>

          <div className="mt-4 text-sm text-white/45">
            Đã có{' '}
            <span className="font-mono font-semibold text-mars-200">
              {total.toLocaleString('vi-VN')}
            </span>{' '}
            lượt tải · Miễn phí & mã nguồn mở
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {PLATFORMS.map((p) => {
              const Ico = p.icon
              return (
                <button
                  key={p.label}
                  onClick={() => open(p.os)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition hover:border-mars-400/40 hover:bg-mars-500/5"
                >
                  <Ico weight="duotone" className="h-8 w-8 text-mars-300" />
                  <span className="text-sm font-medium text-mars-50">{p.label}</span>
                  <span className="text-xs text-white/45">{p.note}</span>
                </button>
              )
            })}
          </div>
        </LiquidGlass>
      </Reveal>
    </section>
  )
}
