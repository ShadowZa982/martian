import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowSquareOut,
  Warning,
} from '@phosphor-icons/react/dist/ssr'
import MarsBackground from '@/components/MarsBackground'
import LiquidGlass from '@/components/LiquidGlass'
import MartianLogo from '@/components/MartianLogo'

export const metadata: Metadata = {
  title: 'Dịch vụ bên thứ ba · Martian',
  description:
    'Martian tích hợp với Modrinth, CurseForge, Microsoft, Mojang, Discord, Adoptium và nhiều dịch vụ khác. Trang này ghi lại từng dịch vụ và dữ liệu được chia sẻ.',
  alternates: { canonical: '/third-party' },
}

type ServiceColor = {
  bg: string
  border: string
  text: string
}

type Service = {
  name: string
  category: string
  icon: string
  color: ServiceColor
  website: string
  api: string
  terms: string
  privacy: string
  license: string
  licenseUrl: string
  desc: string
  usage: string[]
  data: string
}

const SERVICES: Service[] = [
  {
    name: 'Microsoft / Xbox Live',
    category: 'Xác thực',
    icon: '/third-party-icons/xbox.png',
    color: { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', text: '#60a5fa' },
    website: 'https://www.microsoft.com',
    api: 'https://wiki.vg/Microsoft_Authentication_Scheme',
    terms: 'https://www.microsoft.com/en-us/servicesagreement',
    privacy: 'https://privacy.microsoft.com/en-us/privacystatement',
    license: 'Proprietary',
    licenseUrl: 'https://www.microsoft.com/en-us/servicesagreement',
    desc: 'Microsoft OAuth2 được dùng để xác thực tài khoản Minecraft: Java Edition. Luồng xác thực tuân theo chuỗi chính thức Microsoft → Xbox Live → Minecraft Services. Token được lưu cục bộ và không bao giờ được truyền đến máy chủ FoxStudio. Chế độ Offline cũng được hỗ trợ.',
    usage: [
      'Luồng device code OAuth2 để đăng nhập Microsoft',
      'Trao đổi token Xbox Live',
      'Lấy profile Minecraft Services',
      'Token truy cập được lưu mã hóa trong dữ liệu ứng dụng cục bộ',
      'Chế độ Offline: không cần tài khoản Microsoft, chơi singleplayer, LAN & server không yêu cầu premium',
    ],
    data: 'Token xác thực chỉ được lưu cục bộ. Thông tin đăng nhập Microsoft của bạn không bao giờ được Martian hay FoxStudio xem hoặc lưu trữ.',
  },
  {
    name: 'Mojang / Minecraft Services',
    category: 'Dịch vụ Game',
    icon: '/third-party-icons/mojang.png',
    color: { bg: 'rgba(180,120,60,0.08)', border: 'rgba(180,120,60,0.25)', text: '#b47c3c' },
    website: 'https://minecraft.net',
    api: 'https://wiki.vg/Minecraft_Login',
    terms: 'https://www.minecraft.net/en-us/eula',
    privacy: 'https://privacy.microsoft.com/en-us/privacystatement',
    license: 'Proprietary',
    licenseUrl: 'https://www.minecraft.net/en-us/eula',
    desc: 'Minecraft Services API được dùng để xác minh quyền sở hữu game, lấy profile người chơi và dữ liệu skin/cape. Martian tuân thủ EULA Minecraft.',
    usage: [
      'Xác minh quyền sở hữu Minecraft: Java Edition',
      'Lấy UUID và tên người chơi',
      'Lấy texture skin và cape của người chơi',
      'Khởi chạy game với token phiên hợp lệ',
    ],
    data: 'UUID và tên người chơi được lấy và lưu cục bộ chỉ để hiển thị.',
  },
  {
    name: 'Modrinth',
    category: 'Nền tảng Mod',
    icon: '/third-party-icons/modrinth.png',
    color: { bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)', text: '#4ade80' },
    website: 'https://modrinth.com',
    api: 'https://docs.modrinth.com',
    terms: 'https://modrinth.com/legal/terms',
    privacy: 'https://modrinth.com/legal/privacy',
    license: 'LGPL-3.0',
    licenseUrl: 'https://github.com/modrinth/labrinth/blob/master/LICENSE',
    desc: 'Martian sử dụng Modrinth API để tìm kiếm, duyệt và import modpack và mod. Không cần xác thực cho nội dung công khai. File tải xuống được phục vụ trực tiếp từ CDN của Modrinth.',
    usage: [
      'Tìm kiếm và duyệt mod/modpack công khai',
      'Lấy metadata modpack và file manifest',
      'Tải file mod qua Modrinth CDN',
      'Không có dữ liệu người dùng nào được gửi đến Modrinth',
    ],
    data: 'Không có — tất cả yêu cầu chỉ đọc và không xác thực.',
  },
  {
    name: 'CurseForge',
    category: 'Nền tảng Mod',
    icon: '/third-party-icons/curseforge.png',
    color: { bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)', text: '#fb923c' },
    website: 'https://www.curseforge.com',
    api: 'https://docs.curseforge.com',
    terms: 'https://www.overwolf.com/legal/terms',
    privacy: 'https://www.overwolf.com/legal/privacy',
    license: 'Proprietary',
    licenseUrl: 'https://www.overwolf.com/legal/terms',
    desc: 'Martian hỗ trợ import modpack CurseForge qua file .zip cục bộ. CurseForge API (v2) được dùng để phân giải URL tải mod từ manifest.',
    usage: [
      'Phân tích file .zip modpack CurseForge cục bộ',
      'Phân giải URL tải file mod qua CurseForge API',
      'Tải file mod qua CurseForge CDN',
      'Yêu cầu CurseForge API key (tích hợp sẵn trong app)',
    ],
    data: 'Project ID và file ID được gửi đến CurseForge API để phân giải URL tải xuống. Không có dữ liệu người dùng cá nhân nào được truyền đi.',
  },
  {
    name: 'Technic Platform',
    category: 'Nền tảng Modpack',
    icon: '/third-party-icons/technic.png',
    color: { bg: 'rgba(156,163,175,0.08)', border: 'rgba(156,163,175,0.25)', text: '#9ca3af' },
    website: 'https://www.technicpack.net',
    api: 'https://api.technicpack.net',
    terms: 'https://www.technicpack.net/terms',
    privacy: 'https://www.technicpack.net/privacy',
    license: 'Proprietary',
    licenseUrl: 'https://www.technicpack.net/terms',
    desc: 'Martian tích hợp với Technic Platform API để duyệt và tìm kiếm modpack được host trên technicpack.net. API được dùng chỉ đọc.',
    usage: [
      'Tìm kiếm modpack qua Technic search API',
      'Lấy metadata modpack (tên, mô tả, icon, background)',
      'Lấy danh sách phiên bản modpack qua Solder API (nếu có)',
      'Không có dữ liệu người dùng nào được gửi đến Technic',
    ],
    data: 'Không có — tất cả yêu cầu chỉ đọc và không xác thực.',
  },
  {
    name: 'Feed The Beast (FTB)',
    category: 'Nền tảng Modpack',
    icon: '/third-party-icons/ftb.png',
    color: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', text: '#f97316' },
    website: 'https://www.feed-the-beast.com',
    api: 'https://api.modpacks.ch',
    terms: 'https://www.feed-the-beast.com/terms',
    privacy: 'https://www.feed-the-beast.com/privacy',
    license: 'Proprietary',
    licenseUrl: 'https://www.feed-the-beast.com/terms',
    desc: 'Martian sử dụng FTB API (modpacks.ch) để duyệt và tìm kiếm modpack FTB chính thức. Tất cả yêu cầu chỉ đọc.',
    usage: [
      'Duyệt modpack FTB phổ biến qua modpacks.ch API',
      'Tìm kiếm modpack theo từ khóa',
      'Lấy chi tiết modpack: mô tả, phiên bản, hình ảnh',
      'Lấy thông tin phiên bản (phiên bản Minecraft, Forge)',
      'Không có dữ liệu người dùng nào được gửi đến FTB',
    ],
    data: 'Không có — tất cả yêu cầu chỉ đọc và không xác thực.',
  },
  {
    name: 'Discord',
    category: 'Rich Presence',
    icon: '/third-party-icons/discord.png',
    color: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)', text: '#818cf8' },
    website: 'https://discord.com',
    api: 'https://discord.com/developers/docs/rich-presence/overview',
    terms: 'https://discord.com/terms',
    privacy: 'https://discord.com/privacy',
    license: 'Proprietary',
    licenseUrl: 'https://discord.com/terms',
    desc: 'Discord Rich Presence (qua discord-rpc) được dùng để hiển thị phiên game hiện tại của bạn trên Discord. Tính năng này hoàn toàn tùy chọn và chỉ kích hoạt khi Discord đang chạy.',
    usage: [
      'Hiển thị tên profile hiện tại trong trạng thái Discord',
      'Hiển thị loại loader và phiên bản Minecraft',
      'Hiển thị thời gian chơi đã trôi qua',
      'Tính năng có thể tắt trong Cài đặt',
    ],
    data: 'Chỉ thông tin hiển thị trong trạng thái Discord của bạn được chia sẻ với Discord client cục bộ qua IPC. Martian không gửi gì trực tiếp đến máy chủ Discord.',
  },
  {
    name: 'bore',
    category: 'TCP Tunnel',
    icon: '/third-party-icons/bore.png',
    color: { bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)', text: '#4ade80' },
    website: 'https://github.com/ekzhang/bore',
    api: 'https://github.com/ekzhang/bore',
    terms: 'https://github.com/ekzhang/bore/blob/main/LICENSE',
    privacy: 'https://github.com/ekzhang/bore',
    license: 'MIT',
    licenseUrl: 'https://github.com/ekzhang/bore/blob/main/LICENSE',
    desc: 'bore là công cụ TCP tunnel mã nguồn mở dùng để expose Minecraft server ra internet công cộng mà không cần port forwarding hay cấu hình router.',
    usage: [
      'Tải bore binary từ GitHub releases (lần đầu sử dụng, ~6MB)',
      'Chạy bore local <port> --to bore.pub để tạo TCP tunnel',
      'Chỉ expose đúng cổng Minecraft server được chỉ định',
      'Tunnel chỉ hoạt động khi tính năng được bật',
      'Không cần tài khoản hay đăng ký',
    ],
    data: 'Traffic TCP trên cổng Minecraft được chỉ định được chuyển tiếp qua bore.pub. Không có dữ liệu cá nhân nào được bore thu thập.',
  },
  {
    name: 'Adoptium / Eclipse Temurin',
    category: 'Java Runtime',
    icon: '/third-party-icons/adoptium.png',
    color: { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', text: '#fbbf24' },
    website: 'https://adoptium.net',
    api: 'https://api.adoptium.net',
    terms: 'https://adoptium.net/about/',
    privacy: 'https://www.eclipse.org/legal/privacy.php',
    license: 'GPL-2.0 with Classpath Exception',
    licenseUrl: 'https://adoptium.net/about/',
    desc: 'Martian tự động tải xuống và quản lý Java runtime từ Adoptium API (Eclipse Temurin). Phiên bản Java chính xác được chọn dựa trên phiên bản Minecraft đang khởi chạy.',
    usage: [
      'Truy vấn Adoptium API để lấy các phiên bản Java có sẵn',
      'Tự động tải xuống Java runtime',
      'Quản lý nhiều phiên bản Java cho từng phiên bản Minecraft',
      'Không có dữ liệu người dùng nào được gửi đến Adoptium',
    ],
    data: 'Không có — chỉ truy vấn metadata phiên bản đến Adoptium API.',
  },
  {
    name: 'Azul Zulu',
    category: 'Java Runtime',
    icon: '/third-party-icons/azul.png',
    color: { bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)', text: '#38bdf8' },
    website: 'https://www.azul.com/downloads/',
    api: 'https://api.azul.com/metadata/v1',
    terms: 'https://www.azul.com/products/core/openjdk-terms-of-use/',
    privacy: 'https://www.azul.com/privacy-policy/',
    license: 'GPL-2.0 with Classpath Exception',
    licenseUrl: 'https://www.azul.com/products/core/openjdk-terms-of-use/',
    desc: 'Azul Zulu là bản phân phối OpenJDK do Azul Systems cung cấp. Martian sử dụng Azul Metadata API như nguồn dự phòng để tải Java runtime khi gói Adoptium không có sẵn.',
    usage: [
      'Truy vấn Azul Metadata API để lấy các bản Zulu có sẵn',
      'Dùng làm dự phòng khi Adoptium không có gói phù hợp',
      'Tải Java runtime cho Windows, Linux và macOS',
      'Không có dữ liệu người dùng nào được gửi đến Azul',
    ],
    data: 'Không có — chỉ truy vấn metadata phiên bản đến Azul API.',
  },
  {
    name: 'GraalVM',
    category: 'Java Runtime',
    icon: '/third-party-icons/GraalVM.png',
    color: { bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', text: '#a855f7' },
    website: 'https://www.graalvm.org',
    api: 'https://github.com/graalvm/graalvm-ce-builds/releases',
    terms: 'https://www.oracle.com/downloads/licenses/graal-free-license.html',
    privacy: 'https://www.oracle.com/legal/privacy/',
    license: 'GraalVM Free License / GPL-2.0 CE',
    licenseUrl: 'https://www.oracle.com/downloads/licenses/graal-free-license.html',
    desc: 'GraalVM là bản phân phối JDK hiệu năng cao từ Oracle. Martian cung cấp GraalVM như một lựa chọn Java runtime tùy chọn trong Java Manager.',
    usage: [
      'Có sẵn như runtime tùy chọn trong Java Manager',
      'Tải GraalVM CE builds từ GitHub releases',
      'Người dùng phải chọn GraalVM rõ ràng — không dùng mặc định',
      'Không có dữ liệu người dùng nào được gửi đến Oracle hay dự án GraalVM',
    ],
    data: 'Không có — GraalVM binary được tải trực tiếp từ GitHub releases. Không có dữ liệu cá nhân nào được truyền đi.',
  },
]

function ServiceCard({ s }: { s: Service }) {
  return (
    <LiquidGlass className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl"
            style={{ background: s.color.bg, border: `1px solid ${s.color.border}` }}
          >
            <Image
              src={s.icon}
              alt={s.name}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-mars-50">{s.name}</h3>
            <span
              className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: s.color.bg, border: `1px solid ${s.color.border}`, color: s.color.text }}
            >
              {s.category}
            </span>
          </div>
        </div>
        <a
          href={s.website}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50 transition hover:border-white/20 hover:text-white"
        >
          <ArrowSquareOut weight="bold" className="h-3.5 w-3.5" />
          Website
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/55">{s.desc}</p>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/35">
          Cách chúng tôi sử dụng
        </p>
        <ul className="space-y-1.5">
          {s.usage.map((u, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/65">
              <span
                className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full"
                style={{ background: s.color.bg, border: `1px solid ${s.color.border}` }}
              >
                <svg className="h-2.5 w-2.5" fill="currentColor" style={{ color: s.color.text }} viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
              {u}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-5 rounded-xl p-3"
        style={{ background: 'rgba(255,106,61,0.04)', border: '1px solid rgba(255,106,61,0.12)' }}
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-mars-400/60">
          Dữ liệu được chia sẻ
        </p>
        <p className="text-sm text-white/65">{s.data}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: 'Điều khoản dịch vụ', href: s.terms },
          { label: 'Chính sách quyền riêng tư', href: s.privacy },
          { label: 'Tài liệu API', href: s.api },
          { label: `Giấy phép: ${s.license}`, href: s.licenseUrl },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-white/40 transition hover:border-white/15 hover:text-white/70"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </LiquidGlass>
  )
}

export default function ThirdPartyPage() {
  return (
    <main className="grain relative min-h-screen">
      <MarsBackground />

      <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-4 py-6 sm:px-6">
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

      <section className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-mars-400">
          Pháp lý
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
          Dịch vụ bên thứ ba
        </h1>
        <p className="mt-3 max-w-xl text-white/55">
          Martian tích hợp với một số dịch vụ bên thứ ba để cung cấp các tính năng.
          Trang này ghi lại từng dịch vụ, cách sử dụng và dữ liệu nào được chia sẻ.
        </p>
        <p className="mt-2 text-xs text-white/30">
          Cập nhật lần cuối: Tháng 6/2026 · {SERVICES.length} dịch vụ được ghi lại
        </p>

        <LiquidGlass className="mt-8 flex items-start gap-3 p-4">
          <Warning weight="duotone" className="mt-0.5 h-5 w-5 shrink-0 text-[#fbbf24]" />
          <div>
            <p className="text-sm font-semibold text-[#fbbf24]">Tuyên bố miễn trách</p>
            <p className="mt-1 text-xs leading-relaxed text-white/50">
              Martian không liên kết, được chứng thực hoặc kết nối chính thức với Mojang, Microsoft,
              CurseForge, Modrinth, Discord hay bất kỳ dịch vụ bên thứ ba nào được liệt kê trên trang này.
              Tất cả nhãn hiệu và nhãn hiệu dịch vụ là tài sản của chủ sở hữu tương ứng.
            </p>
          </div>
        </LiquidGlass>

        <div className="mt-8 space-y-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.name} s={s} />
          ))}
        </div>
      </section>
    </main>
  )
}
