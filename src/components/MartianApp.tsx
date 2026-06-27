'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { DownloadContext } from './DownloadContext'
import { detectOs } from '@/lib/os'
import type { OsKey } from '@/lib/github'
import MarsBackground from './MarsBackground'
import LoadingScreen from './LoadingScreen'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import Loaders from './Loaders'
import Gallery from './Gallery'
import DownloadSection from './DownloadSection'
import Footer from './Footer'
import DownloadModal from './DownloadModal'

export default function MartianApp() {
  const [ready, setReady] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [total, setTotal] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [targetOs, setTargetOs] = useState<OsKey>('windows')

  useEffect(() => {
    fetch('/api/session')
      .then((r) => r.json())
      .then((d) => d.id && setSessionId(d.id))
      .catch(() => {})
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d) => typeof d.total === 'number' && setTotal(d.total))
      .catch(() => {})
  }, [])

  const open = useCallback((os?: OsKey) => {
    setTargetOs(os ?? detectOs())
    setModalOpen(true)
  }, [])

  return (
    <DownloadContext.Provider value={{ total, sessionId, open }}>
      <AnimatePresence>
        {!ready && (
          <LoadingScreen sessionId={sessionId} onDone={() => setReady(true)} />
        )}
      </AnimatePresence>

      <MarsBackground />

      <div className="grain relative">
        <Header />
        <main>
          <Hero />
          <Features />
          <Loaders />
          <Gallery />
          <DownloadSection />
        </main>
        <Footer />
      </div>

      <DownloadModal
        open={modalOpen}
        os={targetOs}
        onClose={() => setModalOpen(false)}
        onCounted={setTotal}
      />
    </DownloadContext.Provider>
  )
}
