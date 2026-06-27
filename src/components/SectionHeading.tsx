import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-mars-400">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-mars-50 sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-lg text-white/55">{subtitle}</p>
      )}
    </Reveal>
  )
}
