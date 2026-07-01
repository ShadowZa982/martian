'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Monitor, DeviceMobile } from '@phosphor-icons/react'
import { cn } from '@/lib/cn'
import Reveal from './Reveal'

const SHOTS = [
  { file: 'create-profile.png', title: 'Tạo hồ sơ', desc: 'Chọn phiên bản & loader trực quan' },
  { file: 'profile.png', title: 'Hồ sơ', desc: 'Quản lý nhiều cấu hình song song' },
  { file: 'mod-and-ressouce.png', title: 'Mod & tài nguyên', desc: 'Duyệt và cài mod ngay trong app' },
  { file: 'account.png', title: 'Tài khoản', desc: 'Đăng nhập Microsoft an toàn' },
  { file: 'homepage.png', title: 'Trang chủ', desc: 'Tin tức nổi bật & khởi chạy nhanh' },
]

const ANDROID_SHOTS = [
  { file: 'android-home.png', title: 'Trang chủ', desc: 'Màn hình chính gọn nhẹ, khởi chạy nhanh' },
  { file: 'android-profile.png', title: 'Hồ sơ', desc: 'Tạo và quản lý nhiều hồ sơ game' },
  { file: 'android-profile-view.png', title: 'Chi tiết hồ sơ', desc: 'Xem đầy đủ loader, mod và cài đặt' },
  { file: 'android-modpack.png', title: 'Modpack', desc: 'Cài modpack từ CurseForge & Modrinth' },
  { file: 'android-account.png', title: 'Tài khoản', desc: 'Đăng nhập Microsoft ngay trên điện thoại' },
]

type Tab = 'pc' | 'android'

function GalleryStrip({ shots, priority }: { shots: typeof SHOTS; priority?: boolean }) {
  const [active, setActive] = useState(shots.length - 1)

  return (
    <div className="flex h-[360px] gap-2.5 sm:h-[480px] sm:gap-3">
      {shots.map((s, i) => {
        const isActive = active === i
        return (
          <button
            key={s.file}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={s.title}
            className="group relative h-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-black/60 transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
          >
            <Image
              src={`/previews/${s.file}`}
              alt={s.title}
              fill
              sizes={isActive ? '760px' : '180px'}
              className={cn(
                'transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive ? 'object-contain' : 'scale-105 object-cover'
              )}
              priority={priority && i === shots.length - 1}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset transition-colors duration-700',
                isActive ? 'ring-mars-400/45' : 'ring-transparent'
              )}
            />
            <div
              className={cn(
                'pointer-events-none absolute inset-x-0 top-1/2 flex justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive ? 'translate-y-[148px] sm:translate-y-[208px]' : '-translate-y-1/2'
              )}
            >
              <span
                className="block whitespace-nowrap text-base font-semibold leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-lg"
                style={{ transform: isActive ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              >
                {s.title}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default function Gallery() {
  const [tab, setTab] = useState<Tab>('pc')

  return (
    <section id="gallery" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1 gap-1">
          <button
            onClick={() => setTab('pc')}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300',
              tab === 'pc'
                ? 'bg-mars-500/20 text-mars-200 shadow-inner'
                : 'text-white/50 hover:text-white/80'
            )}
          >
            <Monitor weight="duotone" className="h-4 w-4" />
            PC
          </button>
          <button
            onClick={() => setTab('android')}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300',
              tab === 'android'
                ? 'bg-mars-500/20 text-mars-200 shadow-inner'
                : 'text-white/50 hover:text-white/80'
            )}
          >
            <DeviceMobile weight="duotone" className="h-4 w-4" />
            Android
          </button>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          {tab === 'pc' ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-mars-400">Desktop</span>
              <p className="mt-4 text-balance text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
                Thiết kế tinh tế đến từng pixel
              </p>
              <p className="mt-4 text-balance text-lg text-white/55">
                Di chuột qua từng ảnh để xem chi tiết — tối giản, tối màu và mượt mà.
              </p>
            </>
          ) : (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-mars-400">Android</span>
              <p className="mt-4 text-balance text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
                Mang Minecraft vào lòng bàn tay
              </p>
              <p className="mt-4 text-balance text-lg text-white/55">
                Giao diện cảm ứng tối ưu, hỗ trợ Fabric · Forge · NeoForge ngay trên điện thoại Android 8.0+.
              </p>
            </>
          )}
        </div>

        {tab === 'pc' && <GalleryStrip shots={SHOTS} priority />}
        {tab === 'android' && <GalleryStrip shots={ANDROID_SHOTS} />}
      </Reveal>
    </section>
  )
}
