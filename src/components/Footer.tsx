import Link from 'next/link'
import { GithubLogo, DiscordLogo, GlobeHemisphereWest } from '@phosphor-icons/react/dist/ssr'
import MartianLogo from './MartianLogo'
import FooterMeta from './FooterMeta'

const PRODUCT = [
  { label: 'Tính năng', href: '/#features' },
  { label: 'Loader', href: '/#loaders' },
  { label: 'Hình ảnh', href: '/#gallery' },
  { label: 'Phiên bản', href: '/versions' },
]

const LINKS = [
  { label: 'Tải về', href: '/#download' },
  { label: 'GitHub', href: 'https://github.com/foxstudio-201/VoxelXClient' },
  { label: 'Discord', href: 'https://join.foxstudio.site' },
  { label: 'Website', href: 'https://voxelxclient.vercel.app' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10">
      <div
        aria-hidden
        className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-mars-500/45 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <MartianLogo size={22} />
              <span className="text-base font-semibold tracking-wide text-mars-50">Martian</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Cổng tải chính thức cho VoxelXLauncher — trình khởi chạy Minecraft thế hệ mới, gọn nhẹ và đẹp mắt.
            </p>
            <div className="mt-5 flex gap-2">
              <Social href="https://github.com/foxstudio-201/VoxelXClient" label="GitHub">
                <GithubLogo weight="duotone" className="h-[18px] w-[18px]" />
              </Social>
              <Social href="https://join.foxstudio.site" label="Discord">
                <DiscordLogo weight="duotone" className="h-[18px] w-[18px]" />
              </Social>
              <Social href="https://voxelxclient.vercel.app" label="Website">
                <GlobeHemisphereWest weight="duotone" className="h-[18px] w-[18px]" />
              </Social>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-8 sm:gap-x-20">
            <FooterCol title="Sản phẩm" items={PRODUCT} />
            <FooterCol title="Liên kết" items={LINKS} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 text-xs text-white/35 sm:flex-row">
          <span>© 2026 FoxStudio · Made with FoxStudio</span>
          <span>Minecraft là thương hiệu của Mojang Studios.</span>
        </div>

        <FooterMeta />
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-mars-300/80">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => {
          const external = it.href.startsWith('http')
          return (
            <li key={it.label}>
              {external ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/55 transition hover:text-mars-200"
                >
                  {it.label}
                </a>
              ) : (
                <Link
                  href={it.href}
                  className="text-sm text-white/55 transition hover:text-mars-200"
                >
                  {it.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/55 transition hover:border-mars-400/40 hover:text-mars-200"
    >
      {children}
    </a>
  )
}
