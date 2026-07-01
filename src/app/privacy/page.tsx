import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import MarsBackground from '@/components/MarsBackground'
import LiquidGlass from '@/components/LiquidGlass'
import MartianLogo from '@/components/MartianLogo'

export const metadata: Metadata = {
  title: 'Chính sách quyền riêng tư · Martian',
  description:
    'Chính sách quyền riêng tư của Martian — dữ liệu nào chúng tôi thu thập, cách sử dụng và quyền của bạn.',
  alternates: { canonical: '/privacy' },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 border-b border-white/8 pb-2 text-xl font-semibold text-mars-50">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-white/55">{children}</div>
    </div>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 shrink-0 text-mars-400">•</span>
      <span>{children}</span>
    </li>
  )
}

export default function PrivacyPage() {
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
        <div className="mb-10">
          <span className="inline-block rounded-full border border-mars-500/25 bg-mars-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-mars-400">
            Pháp lý
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
            Chính sách quyền riêng tư
          </h1>
          <p className="mt-2 text-sm text-white/35">Cập nhật lần cuối: Tháng 6/2026</p>
        </div>

        <Section title="1. Giới thiệu">
          <p>
            Martian ("chúng tôi") tôn trọng quyền riêng tư của bạn. Chính sách này mô tả những gì
            xảy ra với dữ liệu khi bạn sử dụng ứng dụng launcher hoặc trang web này.
          </p>
          <p>
            VoxelXLauncher được thiết kế với nguyên tắc ưu tiên cục bộ — hầu hết dữ liệu ở lại trên
            máy của bạn và không bao giờ rời khỏi thiết bị.
          </p>
        </Section>

        <Section title="2. Dữ liệu chúng tôi xử lý">
          <p><strong className="font-semibold text-mars-100">Dữ liệu lưu cục bộ trên máy bạn:</strong></p>
          <ul className="mt-2 space-y-2">
            <Li>Token tài khoản Microsoft (mã hóa, dùng để xác thực Minecraft)</Li>
            <Li>UUID và tên người chơi Minecraft</Li>
            <Li>Profile và cài đặt launcher</Li>
            <Li>Thống kê thời gian chơi theo profile</Li>
            <Li>Tùy chọn và cấu hình ứng dụng</Li>
          </ul>
          <p className="mt-3"><strong className="font-semibold text-mars-100">Dữ liệu thu thập trên web:</strong></p>
          <ul className="mt-2 space-y-2">
            <Li>
              Số lượt tải — chúng tôi tăng bộ đếm khi bạn bắt đầu tải xuống. Không có dữ liệu cá
              nhân nào được lưu.
            </Li>
            <Li>
              Analytics ẩn danh qua Vercel Analytics (lượt xem trang, referrer, vị trí cấp quốc
              gia). Không dùng cookie để theo dõi.
            </Li>
          </ul>
        </Section>

        <Section title="3. Những gì chúng tôi KHÔNG làm">
          <ul className="space-y-2">
            <Li>Chúng tôi không thu thập mật khẩu hay thông tin đăng nhập Microsoft của bạn</Li>
            <Li>Chúng tôi không lưu token xác thực trên máy chủ của chúng tôi</Li>
            <Li>Chúng tôi không theo dõi hoạt động trong game của bạn</Li>
            <Li>Chúng tôi không bán hoặc chia sẻ dữ liệu của bạn với bên thứ ba để quảng cáo</Li>
            <Li>Chúng tôi không dùng cookie để theo dõi trên trang web này</Li>
            <Li>Ở chế độ Offline, không có dữ liệu nào được gửi đến Microsoft hay Mojang</Li>
          </ul>
        </Section>

        <Section title="4. Dịch vụ bên thứ ba">
          <p>
            Launcher tích hợp với một số dịch vụ bên thứ ba để cung cấp tính năng. Xem chi tiết tại{' '}
            <Link href="/third-party" className="text-mars-400 hover:underline">
              trang Dịch vụ bên thứ ba
            </Link>.
          </p>
        </Section>

        <Section title="5. Bảo mật dữ liệu">
          <p>
            Token xác thực Microsoft được mã hóa bằng SQLCipher trước khi lưu trong cơ sở dữ liệu
            cục bộ. Chúng tôi không thể truy cập dữ liệu này vì nó không bao giờ rời khỏi thiết bị
            của bạn.
          </p>
          <p>
            Bảo mật tốt nhất phụ thuộc vào bảo mật của chính thiết bị bạn. Hãy bảo vệ thiết bị và
            tài khoản hệ điều hành của mình.
          </p>
        </Section>

        <Section title="6. Dữ liệu trẻ em">
          <p>
            Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn là
            phụ huynh và biết con mình đã cung cấp dữ liệu cá nhân, hãy liên hệ với chúng tôi.
          </p>
        </Section>

        <Section title="7. Thay đổi chính sách">
          <p>
            Chúng tôi có thể cập nhật chính sách này theo thời gian. Thay đổi đáng kể sẽ được thông
            báo qua Discord hoặc GitHub. Tiếp tục sử dụng sau khi thay đổi có hiệu lực đồng nghĩa
            bạn chấp nhận chính sách mới.
          </p>
        </Section>

        <Section title="8. Luật áp dụng">
          <p>
            Chính sách này được điều chỉnh theo luật pháp Việt Nam. Đối với người dùng tại EU, các
            quyền GDPR có thể được áp dụng theo mức độ phù hợp với mô hình cục bộ của chúng tôi.
          </p>
        </Section>

        <Section title="9. Cookies">
          <p>
            Trang web này chỉ sử dụng cookie thiết yếu cho phiên làm việc. Không có cookie theo dõi
            hay quảng cáo được sử dụng. Bạn có thể từ chối analytics bằng cách nhấn "Từ chối"
            trong banner hiển thị khi lần đầu truy cập.
          </p>
        </Section>

        <Section title="10. Quyền của bạn">
          <p>
            Vì Martian lưu dữ liệu cục bộ trên máy của bạn, bạn có toàn quyền kiểm soát:
          </p>
          <ul className="mt-2 space-y-2">
            <Li>
              Xóa dữ liệu ứng dụng bất cứ lúc nào bằng cách gỡ cài đặt hoặc xóa thư mục dữ liệu
            </Li>
            <Li>Xóa tài khoản khỏi launcher trong phần Quản lý tài khoản</Li>
            <Li>Tắt Discord Rich Presence trong Cài đặt</Li>
            <Li>Từ chối analytics bằng cách nhấn "Từ chối" trong banner cookie</Li>
          </ul>
        </Section>

        <Section title="11. Liên hệ">
          <p>Nếu bạn có câu hỏi về chính sách này, liên hệ qua:</p>
          <ul className="mt-2 space-y-2">
            <Li>
              Discord:{' '}
              <a
                href="https://join.foxstudio.site"
                target="_blank"
                rel="noreferrer"
                className="text-mars-400 hover:underline"
              >
                join.foxstudio.site
              </a>
            </Li>
            <Li>
              GitHub:{' '}
              <a
                href="https://github.com/foxstudio-201/VoxelXClient"
                target="_blank"
                rel="noreferrer"
                className="text-mars-400 hover:underline"
              >
                github.com/foxstudio-201/VoxelXClient
              </a>
            </Li>
          </ul>
        </Section>
      </section>
    </main>
  )
}
