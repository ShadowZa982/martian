'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MartianLogo from './MartianLogo'

export default function LoadingScreen({
  sessionId,
  onDone,
}: {
  sessionId: string
  onDone: () => void
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const tick = setInterval(() => {
      p += Math.random() * 14 + 6
      if (p >= 100) {
        p = 100
        clearInterval(tick)
        setTimeout(onDone, 520)
      }
      setProgress(Math.min(100, p))
    }, 130)
    return () => clearInterval(tick)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-liquid-ignore
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0605]"
    >
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_50%_40%,rgba(255,90,45,0.18),transparent_60%)]" />

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute inset-0 blur-2xl mars-glow rounded-full" />
          <MartianLogo size={84} className="relative drop-shadow-[0_0_24px_rgba(255,90,45,0.5)]" />
        </motion.div>

        <h1 className="mt-7 text-3xl font-semibold tracking-[0.3em] text-mars-50">
          MARTIAN
        </h1>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.42em] text-mars-300/70">
          VoxelX Launcher
        </p>

        <div className="mt-10 h-[3px] w-64 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-mars-600 via-mars-400 to-ember"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-mars-200/55">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mars-400" />
          <span>ID · {sessionId || '············'}</span>
        </div>
      </div>
    </motion.div>
  )
}
