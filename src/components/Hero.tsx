'use client'

import { motion } from 'framer-motion'
import {
  DownloadSimple,
  GithubLogo,
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
  AndroidLogo,
} from '@phosphor-icons/react'
import LiquidGlass from './LiquidGlass'
import { useDownload } from './DownloadContext'

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Hero() {
  const { total } = useDownload()

  return (
    <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-36 pb-20 text-center sm:px-6 sm:pt-44">
      <motion.span
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="inline-flex items-center gap-2 rounded-full border border-mars-500/30 bg-mars-500/10 px-4 py-1.5 text-xs font-medium text-mars-200"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-mars-400" />
        Trình khởi chạy Minecraft thế hệ mới
      </motion.span>

      <motion.h1
        custom={1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-mars-50 sm:text-7xl"
      >
        Chơi mọi phiên bản.
        <br />
        <span className="bg-gradient-to-r from-ember via-mars-400 to-mars-600 bg-clip-text text-transparent mars-text-glow">
          Một cú chạm.
        </span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-6 max-w-xl text-balance text-lg text-white/65"
      >
        Quản lý hồ sơ, cài mod, tự động tải Java và khởi chạy bất kỳ phiên bản
        Minecraft nào — tất cả trong một ứng dụng gọn nhẹ, đẹp mắt.
      </motion.p>

      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href="#download"
          className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-mars-600 to-mars-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-mars-900/50 transition hover:from-mars-500 hover:to-mars-400 hover:shadow-mars-700/50"
        >
          <DownloadSimple weight="bold" className="h-5 w-5 transition group-hover:-translate-y-0.5" />
          Tải Martian miễn phí
        </a>
        <a
          href="https://github.com/foxstudio-201/VoxelXClient"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-base text-white/80 transition hover:border-white/30 hover:text-white"
        >
          <GithubLogo weight="duotone" className="h-5 w-5" />
          Mã nguồn
        </a>
      </motion.div>

      <motion.div
        custom={4}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-6 flex items-center gap-5 text-white/45"
      >
        <span className="flex items-center gap-1.5 text-sm">
          <WindowsLogo weight="duotone" className="h-4 w-4 text-[#00adef]" /> Windows
        </span>
        <span className="flex items-center gap-1.5 text-sm">
          <AppleLogo weight="duotone" className="h-4 w-4 text-[#a8b2be]" /> macOS
        </span>
        <span className="flex items-center gap-1.5 text-sm">
          <LinuxLogo weight="duotone" className="h-4 w-4 text-[#f5a623]" /> Linux
        </span>
        <span className="flex items-center gap-1.5 text-sm">
          <AndroidLogo weight="duotone" className="h-4 w-4 text-[#3ddc84]" /> Android
        </span>
      </motion.div>

      <motion.div
        custom={5}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-16 w-full"
      >
        <LiquidGlass className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-white/10">
          <Stat value={total.toLocaleString('vi-VN')} label="Lượt tải" live />
          <Stat value="17+" label="Phiên bản" />
          <Stat value="9" label="Loader" />
        </LiquidGlass>
      </motion.div>
    </section>
  )
}

function Stat({ value, label, live }: { value: string; label: string; live?: boolean }) {
  return (
    <div className="px-4 py-7 text-center">
      <div className="flex items-center justify-center gap-2">
        {live && <span className="h-2 w-2 animate-pulse rounded-full bg-mars-300" />}
        <span className="text-3xl font-semibold tabular-nums text-mars-50 sm:text-4xl">
          {value}
        </span>
      </div>
      <div className="mt-1.5 text-sm text-white/55">{label}</div>
    </div>
  )
}
