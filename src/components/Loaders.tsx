'use client'

import Image from 'next/image'
import LiquidGlass from './LiquidGlass'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const LOADERS = [
  { name: 'Vanilla', file: 'vanilla.png', tag: 'Chính thức' },
  { name: 'Fabric', file: 'fabric.png', tag: 'Loader' },
  { name: 'Forge', file: 'forge.png', tag: 'Loader' },
  { name: 'NeoForge', file: 'neoforge.png', tag: 'Loader' },
  { name: 'Quilt', file: 'quilt.png', tag: 'Loader' },
]

const PLATFORMS = [
  { name: 'Modrinth', file: 'modrinth.png', tag: 'Modpack' },
  { name: 'CurseForge', file: 'curseforge.png', tag: 'Modpack' },
  { name: 'Technic', file: 'technic.png', tag: 'Modpack' },
  { name: 'FTB', file: 'ftb.png', tag: 'Modpack' },
]

function Tile({
  item,
  i,
}: {
  item: { name: string; file: string; tag: string }
  i: number
}) {
  return (
    <Reveal delay={(i % 5) * 0.06}>
      <LiquidGlass hover className="flex h-full flex-col items-center gap-3 p-6 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.04]">
          <Image
            src={`/loaders/${item.file}`}
            alt={item.name}
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-mars-50">{item.name}</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/40">
            {item.tag}
          </div>
        </div>
      </LiquidGlass>
    </Reveal>
  )
}

export default function Loaders() {
  return (
    <section id="loaders" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Khả năng tương thích"
        title="Loader & nền tảng mod"
        subtitle="Cài đặt loader chính thức hoặc nhập modpack từ các nền tảng lớn — tất cả chỉ trong vài giây."
      />

      <div className="mt-14">
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="text-sm font-medium text-mars-200">Mod loader</span>
          <span className="h-px flex-1 bg-gradient-to-r from-mars-500/30 to-transparent" />
          <span className="text-xs text-white/35">Cài đặt tự động</span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {LOADERS.map((l, i) => (
            <Tile key={l.name} item={l} i={i} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="text-sm font-medium text-mars-200">Nền tảng bên thứ ba</span>
          <span className="h-px flex-1 bg-gradient-to-r from-mars-500/30 to-transparent" />
          <span className="text-xs text-white/35">Nhập modpack</span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <Tile key={p.name} item={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
