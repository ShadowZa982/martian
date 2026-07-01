'use client'

import { useEffect, useState } from 'react'
import { DownloadSimple, List, X, Lightning, Drop } from '@phosphor-icons/react'
import MartianLogo from './MartianLogo'
import { useDownload } from './DownloadContext'
import { useGraphics } from './GraphicsContext'

const NAV = [
  { label: 'Tính năng', href: '#features' },
  { label: 'Loader', href: '#loaders' },
  { label: 'Hình ảnh', href: '#gallery' },
  { label: 'Phiên bản', href: '/versions' },
  { label: 'Tải về', href: '#download' },
]

export default function Header() {
  const { total, open } = useDownload()
  const { mode, toggle } = useGraphics()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass' : 'border border-transparent'
          }`}
        >
          <a href="#" className="flex items-center gap-2.5">
            <MartianLogo size={30} />
            <span className="text-lg font-semibold tracking-wide text-mars-50">
              Martian
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-white/65 transition hover:text-mars-200"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mars-400" />
              <span className="font-mono text-xs text-white/70">
                {total.toLocaleString('vi-VN')}
              </span>
              <span className="text-[11px] text-white/40">lượt tải</span>
            </div>
            <button
              onClick={toggle}
              title={mode === 'lite' ? 'Chuyển sang chất lượng cao' : 'Chuyển sang nhẹ nhàng'}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition hover:border-white/25 hover:text-white"
            >
              {mode === 'lite'
                ? <Lightning weight="duotone" className="h-4 w-4 text-[#f5a623]" />
                : <Drop weight="duotone" className="h-4 w-4 text-[#60a5fa]" />
              }
            </button>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mars-600 to-mars-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-mars-900/40 transition hover:from-mars-500 hover:to-mars-400"
            >
              <DownloadSimple weight="bold" className="h-4 w-4" />
              <span className="hidden sm:inline">Tải về</span>
            </button>
            <button
              onClick={() => setMenu((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg text-white/70 md:hidden"
              aria-label="Menu"
            >
              {menu ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menu && (
          <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="rounded-xl px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
