import { cn } from '@/lib/cn'

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
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-3xl',
        strong ? 'glass-strong' : 'glass',
        hover && 'glass-hover',
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
