import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import MarsBackground from '@/components/MarsBackground'
import MartianLogo from '@/components/MartianLogo'

export const metadata: Metadata = {
  title: 'Điều khoản dịch vụ · Martian',
  description:
    'Điều khoản dịch vụ của Martian — quy tắc sử dụng, giấy phép GPL v3, tuân thủ EULA Minecraft và tuyên bố từ chối trách nhiệm.',
  alternates: { canonical: '/terms' },
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

export default function TermsPage() {
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
            Điều khoản dịch vụ
          </h1>
          <p className="mt-2 text-sm text-white/35">Cập nhật lần cuối: Tháng 6/2026</p>
        </div>

        <Section title="1. Chấp nhận điều khoản">
          <p>
            Bằng cách tải xuống, cài đặt hoặc sử dụng VoxelXLauncher ("Ứng dụng"), bạn đồng ý bị
            ràng buộc bởi các điều khoản dịch vụ này. Nếu bạn không đồng ý, vui lòng không sử dụng
            Ứng dụng.
          </p>
        </Section>

        <Section title="2. Mô tả dịch vụ">
          <p>
            VoxelXLauncher là trình khởi chạy Minecraft của bên thứ ba cho phép người dùng quản lý
            profile, cài đặt mod, tải Java và khởi chạy các phiên bản Minecraft. Ứng dụng không phải
            là sản phẩm chính thức của Mojang Studios hay Microsoft.
          </p>
        </Section>

        <Section title="3. Giấy phép mã nguồn mở">
          <p>
            VoxelXLauncher được phát hành theo Giấy phép Công cộng GNU (GPL v3). Bạn được phép sử
            dụng, sao chép, sửa đổi và phân phối phần mềm theo các điều khoản của giấy phép đó.
          </p>
          <p>
            Mã nguồn có tại:{' '}
            <a
              href="https://github.com/foxstudio-201/VoxelXClient"
              target="_blank"
              rel="noreferrer"
              className="text-mars-400 hover:underline"
            >
              github.com/foxstudio-201/VoxelXClient
            </a>
          </p>
        </Section>

        <Section title="4. Tuân thủ EULA Minecraft">
          <p>
            Bằng cách sử dụng VoxelXLauncher, bạn đồng ý tuân thủ{' '}
            <a
              href="https://www.minecraft.net/en-us/eula"
              target="_blank"
              rel="noreferrer"
              className="text-mars-400 hover:underline"
            >
              Thỏa thuận cấp phép người dùng cuối (EULA) của Minecraft
            </a>.
          </p>
          <p>
            VoxelXLauncher không bao gồm bản sao Minecraft và không vi phạm EULA. Người dùng phải
            sở hữu giấy phép Minecraft hợp lệ để chơi chế độ có xác thực.
          </p>
        </Section>

        <Section title="5. Hành vi bị cấm">
          <p>Bạn đồng ý không sử dụng Ứng dụng để:</p>
          <ul className="mt-2 space-y-2">
            <Li>Bỏ qua, crack hoặc phá vỡ xác thực hoặc DRM của Minecraft</Li>
            <Li>Phân phối bản sao lậu của Minecraft hoặc bất kỳ mod nào</Li>
            <Li>Vi phạm điều khoản dịch vụ của bất kỳ dịch vụ bên thứ ba tích hợp nào</Li>
            <Li>Tham gia vào bất kỳ hoạt động bất hợp pháp nào</Li>
            <Li>Dịch ngược ứng dụng cho mục đích độc hại</Li>
          </ul>
        </Section>

        <Section title="6. Tuyên bố từ chối trách nhiệm">
          <p>
            Ứng dụng được cung cấp "nguyên trạng" không có bảo hành dưới bất kỳ hình thức nào.
            FoxStudio không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc
            không thể sử dụng Ứng dụng, bao gồm mất dữ liệu hoặc gián đoạn dịch vụ.
          </p>
        </Section>

        <Section title="7. Giới hạn trách nhiệm pháp lý">
          <p>
            Trong phạm vi tối đa được pháp luật cho phép, FoxStudio không chịu trách nhiệm về bất
            kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào.
          </p>
        </Section>

        <Section title="8. Thay đổi điều khoản">
          <p>
            Chúng tôi có thể cập nhật các điều khoản này theo thời gian. Thay đổi đáng kể sẽ được
            thông báo qua Discord hoặc GitHub. Tiếp tục sử dụng sau khi thay đổi có hiệu lực đồng
            nghĩa bạn chấp nhận điều khoản mới.
          </p>
        </Section>

        <Section title="9. Dịch vụ bên thứ ba">
          <p>
            Ứng dụng tích hợp với một số dịch vụ bên thứ ba. Xem đầy đủ tại{' '}
            <Link href="/third-party" className="text-mars-400 hover:underline">
              trang Dịch vụ bên thứ ba
            </Link>.
          </p>
        </Section>

        <Section title="10. Luật áp dụng">
          <p>
            Các điều khoản này được điều chỉnh theo luật pháp Việt Nam. Mọi tranh chấp sẽ được giải
            quyết tại tòa án có thẩm quyền tại Việt Nam.
          </p>
        </Section>

        <Section title="11. Liên hệ">
          <p>Nếu bạn có câu hỏi về các điều khoản này, liên hệ qua:</p>
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
              GitHub Issues:{' '}
              <a
                href="https://github.com/foxstudio-201/VoxelXClient/issues"
                target="_blank"
                rel="noreferrer"
                className="text-mars-400 hover:underline"
              >
                github.com/foxstudio-201/VoxelXClient/issues
              </a>
            </Li>
          </ul>
        </Section>
      </section>
    </main>
  )
}
