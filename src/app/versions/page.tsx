import type { Metadata } from 'next'
import Link from 'next/link'
import {
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
  DownloadSimple,
  ArrowLeft,
  CalendarBlank,
  Package,
} from '@phosphor-icons/react/dist/ssr'
import MarsBackground from '@/components/MarsBackground'
import LiquidGlass from '@/components/LiquidGlass'
import MartianLogo from '@/components/MartianLogo'
import { fetchReleases, type OsKey } from '@/lib/github'
import { formatBytes, OS_META } from '@/lib/os'

export const metadata: Metadata = {
  title: 'Tất cả phiên bản — Martian',
  description: 'Lịch sử phát hành VoxelXLauncher theo ngày, kèm bản tải cho mọi hệ điều hành.',
}

export const revalidate = 600

const OS_ICON: Record<OsKey, React.ReactNode> = {
  windows: <WindowsLogo weight="duotone" className="h-4 w-4" />,
  mac: <AppleLogo weight="duotone" className="h-4 w-4" />,
  linux: <LinuxLogo weight="duotone" className="h-4 w-4" />,
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default async function VersionsPage() {
  let releases
  try {
    releases = await fetchReleases()
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
          Tất cả phiên bản
        </h1>
        <p className="mt-3 max-w-xl text-white/55">
          {releases.length} bản phát hành VoxelXLauncher, sắp xếp theo ngày mới nhất. Chọn đúng tệp cho hệ điều hành của bạn.
        </p>

        {releases.length === 0 ? (
          <LiquidGlass strong className="mt-12 p-10 text-center text-white/60">
            Không tải được danh sách phiên bản. Vui lòng thử lại sau.
          </LiquidGlass>
        ) : (
          <div className="mt-12 space-y-5">
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
                      </div>
                      <div className="text-sm text-white/45">{rel.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/50">
                    <CalendarBlank weight="duotone" className="h-4 w-4" />
                    {fmtDate(rel.date)}
                  </div>
                </div>

                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  {(Object.keys(OS_META) as OsKey[]).map((os) => (
                    <div key={os}>
                      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/55">
                        {OS_ICON[os]}
                        {OS_META[os].label}
                      </div>
                      {rel.os[os].length === 0 ? (
                        <div className="text-xs text-white/25">—</div>
                      ) : (
                        <div className="space-y-1.5">
                          {rel.os[os].map((a) => (
                            <a
                              key={a.name}
                              href={a.url}
                              className="group flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 transition hover:border-mars-400/40 hover:bg-mars-500/10"
                            >
                              <span className="min-w-0">
                                <span className="block truncate text-xs text-mars-50">{a.label}</span>
                                {a.arch && (
                                  <span className="text-[10px] text-white/40">{a.arch}</span>
                                )}
                              </span>
                              <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-white/40">
                                {formatBytes(a.size)}
                                <DownloadSimple
                                  weight="bold"
                                  className="h-3.5 w-3.5 text-mars-300 transition group-hover:translate-y-0.5"
                                />
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
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
