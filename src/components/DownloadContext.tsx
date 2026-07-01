'use client'

import { createContext, useContext } from 'react'
import type { OsKey } from '@/lib/github'

export type DownloadTarget = OsKey | 'android'

export type DownloadCtx = {
  total: number
  sessionId: string
  cookieId: string
  open: (target?: DownloadTarget) => void
}

export const DownloadContext = createContext<DownloadCtx>({
  total: 0,
  sessionId: '',
  cookieId: '',
  open: () => {},
})

export const useDownload = () => useContext(DownloadContext)
