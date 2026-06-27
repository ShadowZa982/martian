import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.4em] text-mars-400">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-mars-50">Lạc khỏi quỹ đạo</h1>
      <p className="mt-3 max-w-sm text-white/55">
        Trang bạn tìm không tồn tại trên sao Hỏa này.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-mars-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-mars-400"
      >
        Về trang chủ
      </Link>
    </div>
  )
}
