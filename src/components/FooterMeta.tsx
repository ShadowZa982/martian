'use client'

import { useDownload } from './DownloadContext'

export default function FooterMeta() {
  const { sessionId, cookieId } = useDownload()

  return (
    <div className="mt-10 flex flex-col items-center gap-1.5 border-t border-white/5 pt-6 text-center font-mono text-[11px] text-white/30">
      <span className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mars-400/70" />
        RAY ID · {sessionId || '············'}
      </span>
      <span className="break-all">
        COOKIE · {cookieId || 'chưa cấp phép'}
      </span>
    </div>
  )
}
