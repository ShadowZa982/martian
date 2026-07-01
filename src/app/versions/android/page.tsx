import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AndroidLogo,
  WindowsLogo,
  DownloadSimple,
  ArrowLeft,
  CalendarBlank,
  Package,
  DeviceMobile,
} from '@phosphor-icons/react/dist/ssr'
import MarsBackground from '@/components/MarsBackground'
import LiquidGlass from '@/components/LiquidGlass'
import MartianLogo from '@/components/MartianLogo'
import { fetchAndroidReleases, type AndroidRelease } from '@/lib/github'
import { formatBytes, ANDROID_META } from '@/lib/os'

export const metadata: Metadata = {
  title: 'Phiên bản Android · Martian',
  description:
    'Tất cả bản phát hành Martian Launcher cho Android. Tải APK theo kiến trúc thiết bị.',
  alternates: { canonical: '/versions/android' },
  openGraph: {
    type: 'website',
    title: 'Phiên bản Android · Martian',
    description:
      'Tất cả bản phát hành Martian Launcher cho Android. Tải APK theo kiến trúc thiết bị.',
    url: '/versions/android',
  },
}

export const revalidate = 600

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default async function AndroidVersionsPage() {
  let releases: AndroidRelease[] = []
  try {
    releases = await fetchAndroidReleases()
  } catch {
    releases = []
  }

  return (
    <main className="grain relative min-h-screen">
      <MarsBackground />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <MartianLogo size={30} />
          <span className="text-lg font-semibold tracking-wide text-mars-50">Martian</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:border-white/30 hover:text-white"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
          Trang chủ
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-mars-400">
          Lịch sử phát hành
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
          Phiên bản Android
        </h1>
        <p className="mt-3 max-w-xl text-white/55">
          {releases.length} bản phát hành Martian Launcher cho Android, sắp xếp theo ngày mới nhất.
          Yêu cầu {ANDROID_META.minSdk}.
        </p>

        <div className="mt-8 flex gap-2">
          <Link
            href="/versions"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/60 transition hover:border-mars-400/40 hover:text-mars-200"
          >
            <WindowsLogo weight="duotone" className="h-4 w-4 text-[#00adef]" />
            Desktop
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-mars-500/20 px-4 py-2 text-sm font-medium text-mars-200">
            <AndroidLogo weight="duotone" className="h-4 w-4 text-[#3ddc84]" />
            Android (APK)
          </span>
        </div>

        <LiquidGlass className="mt-8 flex items-start gap-4 p-5 sm:items-center">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mars-500/15 text-mars-300">
            <DeviceMobile weight="duotone" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-mars-50">Chọn APK phù hợp với thiết bị</p>
            <p className="mt-0.5 text-xs text-white/50">
              Hầu hết điện thoại Android hiện đại dùng <span className="text-white/75">arm64-v8a</span>.
              Nếu không chắc, tải bản <span className="text-white/75">Universal</span> (dung lượng lớn hơn nhưng chạy được trên mọi thiết bị).
            </p>
          </div>
        </LiquidGlass>

        {releases.length === 0 ? (
          <LiquidGlass strong className="mt-8 p-10 text-center text-white/60">
            Không tải được danh sách phiên bản. Vui lòng thử lại sau.
          </LiquidGlass>
        ) : (
          <div className="mt-6 space-y-5">
            {releases.map((rel, i) => (
              <LiquidGlass key={rel.tag} strong className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-mars-500/15 text-mars-300">
                      <Package weight="duotone" className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-semibold text-mars-50">{rel.tag}</span>
                        {i === 0 && !rel.prerelease && (
                          <span className="rounded-full bg-mars-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mars-300">
                            Mới nhất
                          </span>
                        )}
                        {rel.prerelease && (
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/55">
                            Beta
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/45">
                          <AndroidLogo weight="duotone" className="h-3 w-3 text-[#3ddc84]" />
                          APK
                        </span>
                      </div>
                      <div className="text-sm text-white/45">{rel.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/50">
                    <CalendarBlank weight="duotone" className="h-4 w-4" />
                    {fmtDate(rel.date)}
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {rel.apks.map((a) => (
                    <a
                      key={a.name}
                      href={a.url}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-gradient-to-r from-white/[0.04] to-transparent px-4 py-3 transition hover:border-mars-400/40 hover:from-mars-500/10"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-sm text-mars-50">
                          <span className="truncate">{a.label}</span>
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
                  href={rel.notesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-xs text-white/40 transition hover:text-mars-200"
                >
                  Ghi chú phát hành trên GitHub →
                </a>
              </LiquidGlass>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
