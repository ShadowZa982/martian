'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const SHOTS = [
  { file: 'create-profile.png', title: 'Tạo hồ sơ', desc: 'Chọn phiên bản & loader trực quan' },
  { file: 'profile.png', title: 'Hồ sơ', desc: 'Quản lý nhiều cấu hình song song' },
  { file: 'mod-and-ressouce.png', title: 'Mod & tài nguyên', desc: 'Duyệt và cài mod ngay trong app' },
  { file: 'account.png', title: 'Tài khoản', desc: 'Đăng nhập Microsoft an toàn' },
  { file: 'homepage.png', title: 'Trang chủ', desc: 'Tin tức nổi bật & khởi chạy nhanh' },
]

export default function Gallery() {
  const [active, setActive] = useState(SHOTS.length - 1)

  return (
    <section id="gallery" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Giao diện"
        title="Thiết kế tinh tế đến từng pixel"
        subtitle="Di chuột qua từng ảnh để xem chi tiết — tối giản, tối màu và mượt mà."
      />

      <Reveal className="mt-14">
        <div className="flex h-[360px] gap-2.5 sm:h-[480px] sm:gap-3">
          {SHOTS.map((s, i) => {
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
                  priority={i === SHOTS.length - 1}
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
                    isActive
                      ? 'translate-y-[148px] sm:translate-y-[208px]'
                      : '-translate-y-1/2'
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
      </Reveal>
    </section>
  )
}
