'use client'

import {
  Folders,
  ShieldCheck,
  Package,
  Coffee,
  TerminalWindow,
  GameController,
  ChartBar,
  BellRinging,
  type Icon,
} from '@phosphor-icons/react'
import LiquidGlass from './LiquidGlass'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const FEATURES: { icon: Icon; title: string; desc: string; color: string; bg: string; wide?: boolean }[] = [
  {
    icon: Folders,
    title: 'Đa hồ sơ',
    desc: 'Tạo không giới hạn hồ sơ — mỗi hồ sơ có loader, phiên bản, mod và thiết lập riêng.',
    color: 'text-[#60a5fa]',
    bg: 'from-blue-500/20 to-blue-700/8',
    wide: true,
  },
  {
    icon: ShieldCheck,
    title: 'Đăng nhập Microsoft',
    desc: 'Xác thực OAuth2 an toàn, token tự động làm mới.',
    color: 'text-[#34d399]',
    bg: 'from-emerald-500/20 to-emerald-700/8',
  },
  {
    icon: Package,
    title: 'Hỗ trợ Mod',
    desc: 'Kéo-thả modpack từ CurseForge & Modrinth.',
    color: 'text-[#f59e0b]',
    bg: 'from-amber-500/20 to-amber-700/8',
  },
  {
    icon: Coffee,
    title: 'Java tự động',
    desc: 'Tự phát hiện và tải đúng bản Java cho từng phiên bản.',
    color: 'text-[#fb923c]',
    bg: 'from-orange-500/20 to-orange-700/8',
  },
  {
    icon: TerminalWindow,
    title: 'Log thời gian thực',
    desc: 'Nhật ký game tô màu theo cấp độ, sao chép nhanh.',
    color: 'text-[#a78bfa]',
    bg: 'from-violet-500/20 to-violet-700/8',
  },
  {
    icon: GameController,
    title: 'Discord RPC',
    desc: 'Hiển thị hồ sơ và thời gian chơi tự động.',
    color: 'text-[#818cf8]',
    bg: 'from-indigo-500/20 to-indigo-700/8',
  },
  {
    icon: ChartBar,
    title: 'Thống kê chơi',
    desc: 'Theo dõi giờ chơi, số thế giới và số mod.',
    color: 'text-[#38bdf8]',
    bg: 'from-sky-500/20 to-sky-700/8',
  },
  {
    icon: BellRinging,
    title: 'Thông báo',
    desc: 'Toast kèm âm thanh cho các sự kiện khởi chạy.',
    color: 'text-[#f472b6]',
    bg: 'from-pink-500/20 to-pink-700/8',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Tính năng"
        title="Mọi thứ một launcher cần"
        subtitle="Được xây dựng để vừa mạnh mẽ cho người chơi chuyên sâu, vừa đơn giản cho người mới."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Ico = f.icon
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.08} className={f.wide ? 'lg:col-span-2' : ''}>
              <LiquidGlass hover className="h-full p-6">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.bg} ${f.color}`}>
                  <Ico weight="duotone" className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-mars-50">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.desc}</p>
              </LiquidGlass>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
