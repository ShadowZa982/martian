'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
  AndroidLogo,
  X,
  DownloadSimple,
  SpinnerGap,
  ArrowClockwise,
  SealCheck,
} from '@phosphor-icons/react'
import LiquidGlass from './LiquidGlass'
import { formatBytes, OS_META, ANDROID_META } from '@/lib/os'
import type { OsKey, ReleaseVersion, AndroidRelease } from '@/lib/github'
import type { DownloadTarget } from './DownloadContext'

const COUNTDOWN = 5

const TARGET_ICON: Record<DownloadTarget, React.ReactNode> = {
  windows: <WindowsLogo weight="duotone" className="h-5 w-5 text-[#00adef]" />,
  mac: <AppleLogo weight="duotone" className="h-5 w-5 text-[#a8b2be]" />,
  linux: <LinuxLogo weight="duotone" className="h-5 w-5 text-[#f5a623]" />,
  android: <AndroidLogo weight="duotone" className="h-5 w-5 text-[#3ddc84]" />,
}

type Phase = 'counting' | 'loading' | 'ready' | 'error'

export default function DownloadModal({
  open,
  target,
  onClose,
  onCounted,
}: {
  open: boolean
  target: DownloadTarget
  onClose: () => void
  onCounted: (total: number) => void
}) {
  const [phase, setPhase] = useState<Phase>('counting')
  const [remaining, setRemaining] = useState(COUNTDOWN)
  const [releases, setReleases] = useState<ReleaseVersion[]>([])
  const [androidReleases, setAndroidReleases] = useState<AndroidRelease[]>([])
  const [picked, setPicked] = useState<string | null>(null)

  const isAndroid = target === 'android'

  const loadReleases = useCallback(async () => {
    setPhase('loading')
    try {
      if (isAndroid) {
        const res = await fetch('/api/releases-android')
        const data = await res.json()
        if (!res.ok || !data.releases?.length) throw new Error('empty')
        setAndroidReleases(data.releases)
      } else {
        const res = await fetch('/api/releases')
        const data = await res.json()
        if (!res.ok || !data.releases?.length) throw new Error('empty')
        setReleases(data.releases)
      }
      setPhase('ready')
    } catch {
      setPhase('error')
    }
  }, [isAndroid])

  useEffect(() => {
    if (!open) return
    setPhase('counting')
    setRemaining(COUNTDOWN)
    setPicked(null)

    const started = performance.now()
    const id = setInterval(() => {
      const left = COUNTDOWN - (performance.now() - started) / 1000
      if (left <= 0) {
        clearInterval(id)
        setRemaining(0)
        loadReleases()
      } else {
        setRemaining(left)
      }
    }, 80)
    return () => clearInterval(id)
  }, [open, loadReleases])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const countDownload = useCallback(() => {
    fetch('/api/download', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => typeof d.total === 'number' && onCounted(d.total))
      .catch(() => {})
  }, [onCounted])

  const handlePick = useCallback(
    (name: string) => {
      countDownload()
      setPicked(name)
      window.setTimeout(() => onClose(), 1800)
    },
    [countDownload, onClose]
  )

  const dash = useMemo(() => {
    const pct = (COUNTDOWN - remaining) / COUNTDOWN
    const c = 2 * Math.PI * 52
    return { c, offset: c * (1 - pct) }
  }, [remaining])

  const latestDesktop = !isAndroid
    ? (releases.find((r) => r.os[target as OsKey].length > 0) ?? null)
    : null

  const latestAndroid = isAndroid
    ? (androidReleases.find((r) => r.apks.length > 0) ?? null)
    : null

  const targetLabel = isAndroid ? ANDROID_META.label : OS_META[target as OsKey].label
  const targetTagline = isAndroid ? ANDROID_META.tagline : OS_META[target as OsKey].tagline

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-liquid-ignore
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl"
          >
            <LiquidGlass strong className="p-7 sm:p-9">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white"
                aria-label="Đóng"
              >
                <X weight="bold" className="h-4 w-4" />
              </button>

              {(phase === 'counting' || phase === 'loading') && (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="relative grid h-32 w-32 place-items-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="url(#mg)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={dash.c}
                        strokeDashoffset={phase === 'loading' ? 0 : dash.offset}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                      />
                      <defs>
                        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#e2462f" />
                          <stop offset="100%" stopColor="#ff8a4c" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {phase === 'counting' ? (
                      <span className="text-4xl font-semibold tabular-nums text-mars-50">
                        {Math.ceil(remaining)}
                      </span>
                    ) : (
                      <SpinnerGap weight="bold" className="h-9 w-9 animate-spin text-mars-300" />
                    )}
                  </div>
                  <h3 className="mt-6 flex items-center gap-2 text-lg font-medium text-mars-50">
                    {TARGET_ICON[target]}
                    {phase === 'counting'
                      ? `Đang chuẩn bị bản tải cho ${targetLabel}…`
                      : 'Đang lấy phiên bản mới nhất…'}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-white/55">
                    {phase === 'counting'
                      ? 'Cảm ơn bạn đã chọn Martian. Liên kết tải sẽ sẵn sàng ngay khi đếm ngược kết thúc.'
                      : `Kết nối tới GitHub Releases để lấy bản mới nhất cho ${targetLabel}.`}
                  </p>
                </div>
              )}

              {phase === 'error' && (
                <div className="flex flex-col items-center py-10 text-center">
                  <p className="text-base text-mars-100">Không tải được danh sách phiên bản.</p>
                  <p className="mt-2 text-sm text-white/50">Có thể do giới hạn mạng hoặc GitHub. Thử lại nhé.</p>
                  <button
                    onClick={loadReleases}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-mars-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-mars-400"
                  >
                    <ArrowClockwise weight="bold" className="h-4 w-4" /> Thử lại
                  </button>
                </div>
              )}

              {phase === 'ready' && !isAndroid && latestDesktop && (
                <div>
                  <div className="flex items-center gap-2 text-mars-300">
                    <SealCheck weight="duotone" className="h-5 w-5" />
                    <h3 className="flex items-center gap-2 text-base font-medium text-mars-50">
                      {TARGET_ICON[target]}
                      Martian cho {targetLabel}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{targetTagline}</p>

                  {picked && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-mars-400/40 bg-mars-500/15 px-4 py-3 text-sm text-mars-100">
                      <SpinnerGap weight="bold" className="h-4 w-4 animate-spin text-mars-300" />
                      <span className="min-w-0">
                        Đang tải <span className="font-medium text-mars-50">{picked}</span>… cửa sổ sẽ tự đóng.
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-mars-500/25 bg-mars-500/[0.07] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-mars-100">{latestDesktop.tag}</span>
                      <span className="rounded-full bg-mars-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mars-300">
                        Mới nhất
                      </span>
                      {latestDesktop.prerelease && (
                        <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                          Beta
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/45">
                      {new Date(latestDesktop.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <div className="mt-3 grid max-h-[42vh] gap-2 overflow-y-auto pr-1">
                    {latestDesktop.os[target as OsKey].map((a) => (
                      <a
                        key={a.name}
                        href={a.url}
                        onClick={() => handlePick(a.name)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-gradient-to-r from-white/[0.04] to-transparent px-4 py-3 transition hover:border-mars-400/40 hover:from-mars-500/10"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-sm text-mars-50">
                            <span className="truncate">{a.label}</span>
                            {a.arch && (
                              <span className="shrink-0 rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-white/55">
                                {a.arch}
                              </span>
                            )}
                          </div>
                          <div className="truncate text-[11px] text-white/40">{a.name}</div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-xs text-white/45">{formatBytes(a.size)}</span>
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-mars-500/15 text-mars-300 transition group-hover:bg-mars-500 group-hover:text-white">
                            <DownloadSimple weight="bold" className="h-4 w-4" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  <a
                    href="/versions"
                    className="mt-3 inline-block text-xs text-white/45 transition hover:text-mars-200"
                  >
                    Xem tất cả phiên bản theo ngày →
                  </a>
                </div>
              )}

              {phase === 'ready' && isAndroid && latestAndroid && (
                <div>
                  <div className="flex items-center gap-2 text-mars-300">
                    <SealCheck weight="duotone" className="h-5 w-5" />
                    <h3 className="flex items-center gap-2 text-base font-medium text-mars-50">
                      {TARGET_ICON.android}
                      Martian Launcher cho Android
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{ANDROID_META.tagline}</p>

                  {picked && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-mars-400/40 bg-mars-500/15 px-4 py-3 text-sm text-mars-100">
                      <SpinnerGap weight="bold" className="h-4 w-4 animate-spin text-mars-300" />
                      <span className="min-w-0">
                        Đang tải <span className="font-medium text-mars-50">{picked}</span>… cửa sổ sẽ tự đóng.
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-mars-500/25 bg-mars-500/[0.07] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-mars-100">{latestAndroid.tag}</span>
                      <span className="rounded-full bg-mars-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mars-300">
                        Mới nhất
                      </span>
                      {latestAndroid.prerelease && (
                        <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                          Beta
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/45">
                      {new Date(latestAndroid.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <div className="mt-3 grid max-h-[42vh] gap-2 overflow-y-auto pr-1">
                    {latestAndroid.apks.map((a) => (
                      <a
                        key={a.name}
                        href={a.url}
                        onClick={() => handlePick(a.name)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-gradient-to-r from-white/[0.04] to-transparent px-4 py-3 transition hover:border-mars-400/40 hover:from-mars-500/10"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-sm text-mars-50">
                            <span className="truncate">{a.label}</span>
                            {a.arch && (
                              <span className="shrink-0 rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-white/55">
                                {a.arch}
                              </span>
                            )}
                          </div>
                          <div className="truncate text-[11px] text-white/40">{a.name}</div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-xs text-white/45">{formatBytes(a.size)}</span>
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-mars-500/15 text-mars-300 transition group-hover:bg-mars-500 group-hover:text-white">
                            <DownloadSimple weight="bold" className="h-4 w-4" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  <a
                    href="/versions/android"
                    className="mt-3 inline-block text-xs text-white/45 transition hover:text-mars-200"
                  >
                    Xem tất cả phiên bản Android →
                  </a>
                </div>
              )}

              {phase === 'ready' && (
                (!isAndroid && !latestDesktop) || (isAndroid && !latestAndroid)
              ) && (
                <div className="py-10 text-center text-sm text-white/55">
                  Chưa có bản phát hành cho {targetLabel}.
                </div>
              )}
            </LiquidGlass>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
