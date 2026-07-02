'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Monitor, DeviceMobile, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/cn'
import Reveal from './Reveal'

const SHOTS = [
  { file: 'homepage.png', title: 'Trang chủ', desc: 'Tin tức nổi bật & khởi chạy nhanh' },
  { file: 'create-profile.png', title: 'Tạo hồ sơ', desc: 'Chọn phiên bản & loader trực quan' },
  { file: 'profile.png', title: 'Hồ sơ', desc: 'Quản lý nhiều cấu hình song song' },
  { file: 'mod-and-ressouce.png', title: 'Mod & tài nguyên', desc: 'Duyệt và cài mod ngay trong app' },
  { file: 'account.png', title: 'Tài khoản', desc: 'Đăng nhập Microsoft an toàn' },
]

const ANDROID_SHOTS = [
  { file: 'android-home.png', title: 'Trang chủ', desc: 'Màn hình chính gọn nhẹ, khởi chạy nhanh' },
  { file: 'android-profile.png', title: 'Hồ sơ', desc: 'Tạo và quản lý nhiều hồ sơ game' },
  { file: 'android-profile-view.png', title: 'Chi tiết hồ sơ', desc: 'Xem đầy đủ loader, mod và cài đặt' },
  { file: 'android-modpack.png', title: 'Modpack', desc: 'Cài modpack từ CurseForge & Modrinth' },
  { file: 'android-account.png', title: 'Tài khoản', desc: 'Đăng nhập Microsoft ngay trên điện thoại' },
]

type Tab = 'pc' | 'android'

function GalleryViewer({
  shots,
  isAndroid,
  priority,
}: {
  shots: typeof SHOTS
  isAndroid?: boolean
  priority?: boolean
}) {
  const [active, setActive] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const prev = () => setActive((i) => (i - 1 + shots.length) % shots.length)
  const next = () => setActive((i) => (i + 1) % shots.length)

  return (
    <div className="flex flex-col gap-5">
      {/* Featured */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {/* aspect ratio wrapper */}
        <div className={cn('relative w-full', isAndroid ? 'aspect-[9/16] max-h-[520px]' : 'aspect-[16/9]')}>
          {shots.map((s, i) => (
            <div
              key={s.file}
              className={cn(
                'absolute inset-0 transition-opacity duration-500',
                active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <Image
                src={`/previews/${s.file}`}
                alt={s.title}
                fill
                sizes={isAndroid ? '400px' : '1200px'}
                className="object-contain"
                priority={priority && i === 0}
              />
            </div>
          ))}

          {/* gradient overlay bottom */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />

          {/* caption */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-mars-400">
              {active + 1} / {shots.length}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">{shots[active].title}</p>
            <p className="text-sm text-white/55">{shots[active].desc}</p>
          </div>

          {/* nav arrows */}
          <button
            onClick={prev}
            aria-label="Ảnh trước"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 backdrop-blur-md transition hover:border-mars-400/50 hover:bg-black/70 hover:text-white"
          >
            <CaretLeft weight="bold" className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Ảnh tiếp theo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 backdrop-blur-md transition hover:border-mars-400/50 hover:bg-black/70 hover:text-white"
          >
            <CaretRight weight="bold" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbsRef}
        className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {shots.map((s, i) => (
          <button
            key={s.file}
            onClick={() => setActive(i)}
            aria-label={s.title}
            className={cn(
              'relative shrink-0 overflow-hidden rounded-xl border transition-all duration-300',
              isAndroid ? 'h-20 w-12' : 'h-16 w-28 sm:h-20 sm:w-36',
              active === i
                ? 'border-mars-400/70 ring-1 ring-mars-400/40 scale-[1.04]'
                : 'border-white/10 opacity-50 hover:opacity-80'
            )}
          >
            <Image
              src={`/previews/${s.file}`}
              alt={s.title}
              fill
              sizes={isAndroid ? '48px' : '144px'}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [tab, setTab] = useState<Tab>('pc')

  return (
    <section id="gallery" className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6">
      {/* Tab switcher */}
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

      {/* Heading */}
      <Reveal className="mx-auto mb-10 mt-10 max-w-2xl text-center">
        {tab === 'pc' ? (
          <>
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-mars-400">Desktop</span>
            <p className="mt-4 text-balance text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
              Thiết kế tinh tế đến từng pixel
            </p>
            <p className="mt-4 text-balance text-lg text-white/55">
              Tối giản, tối màu và mượt mà — trải nghiệm giao diện được chăm chút kỹ lưỡng.
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
      </Reveal>

      {/* Viewer */}
      <Reveal>
        {tab === 'pc' && (
          <GalleryViewer shots={SHOTS} priority />
        )}
        {tab === 'android' && (
          <div className="mx-auto max-w-sm">
            <GalleryViewer shots={ANDROID_SHOTS} isAndroid />
          </div>
        )}
      </Reveal>
    </section>
  )
}
