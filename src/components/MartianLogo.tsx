import { cn } from '@/lib/cn'

export default function MartianLogo({
  className,
  size = 40,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn('text-mars-400', className)}
      aria-hidden
    >
      <defs>
        <clipPath id="mars-disc">
          <circle cx="30" cy="30" r="20" />
        </clipPath>
      </defs>

      <ellipse
        cx="32"
        cy="33"
        rx="29"
        ry="11"
        transform="rotate(-26 32 33)"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
        fill="none"
      />

      <circle cx="30" cy="30" r="20" fill="currentColor" opacity="0.25" />

      <g clipPath="url(#mars-disc)">
        <path
          d="M40 12c6 6 8 16 4 25-3 7-12 11-20 9 9 1 16-4 19-12 3-8 1-17-3-22Z"
          fill="currentColor"
          opacity="0.4"
        />
        <circle cx="22" cy="22" r="4.4" fill="currentColor" opacity="0.85" />
        <circle cx="35" cy="20" r="2.4" fill="currentColor" opacity="0.7" />
        <circle cx="34" cy="35" r="5.6" fill="currentColor" opacity="0.85" />
        <circle cx="20" cy="36" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="26" cy="29" r="1.7" fill="currentColor" opacity="0.6" />
      </g>

      <circle
        cx="30"
        cy="30"
        r="20"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.55"
        fill="none"
      />
    </svg>
  )
}
