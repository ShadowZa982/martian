'use client'

import { createContext, useContext } from 'react'
import type { OsKey } from '@/lib/github'

export type DownloadCtx = {
  total: number
  sessionId: string
  open: (os?: OsKey) => void
}

export const DownloadContext = createContext<DownloadCtx>({
  total: 0,
  sessionId: '',
  open: () => {},
})

export const useDownload = () => useContext(DownloadContext)
