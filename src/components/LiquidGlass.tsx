'use client'

import { cn } from '@/lib/cn'
import { useGraphics } from './GraphicsContext'

type Props = {
  children: React.ReactNode
  className?: string
  strong?: boolean
  hover?: boolean
  as?: 'div' | 'section' | 'article'
}

export default function LiquidGlass({
  children,
  className,
  strong,
  hover,
  as: Tag = 'div',
}: Props) {
  const { mode } = useGraphics()

  const liteClass = strong
    ? 'bg-white/[0.06] backdrop-blur-md border border-white/12'
    : 'bg-white/[0.04] backdrop-blur-sm border border-white/10'

  const qualityClass = cn(
    strong ? 'glass-strong' : 'glass',
    hover && 'glass-hover'
  )

  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-3xl',
        mode === 'lite' ? liteClass : qualityClass,
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-px left-6 right-6 z-[2] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
      {children}
    </Tag>
  )
}
