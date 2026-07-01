'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { DownloadContext } from './DownloadContext'
import type { DownloadTarget } from './DownloadContext'
import { detectOs } from '@/lib/os'
import { getCookie, setCookie, deleteCookie } from '@/lib/cookies'
import MarsBackground from './MarsBackground'
import CookieConsent from './CookieConsent'
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
  const [cookieId, setCookieId] = useState('')
  const [total, setTotal] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [target, setTarget] = useState<DownloadTarget>('windows')
  const [consent, setConsent] = useState<'accepted' | 'rejected' | null>(null)

  useEffect(() => {
    fetch('/api/session')
      .then((r) => r.json())
      .then((d) => d.id && setSessionId(d.id))
      .catch(() => {})

    const saved = getCookie('mrt_consent')
    if (saved === 'accepted') {
      let cid = getCookie('mrt_cid')
      if (!cid) {
        cid = crypto.randomUUID()
        setCookie('mrt_cid', cid)
      }
      setCookieId(cid)
      setConsent('accepted')
    } else if (saved === 'rejected') {
      setConsent('rejected')
    }
  }, [])

  const acceptCookies = useCallback(() => {
    setCookie('mrt_consent', 'accepted')
    const cid = getCookie('mrt_cid') || crypto.randomUUID()
    setCookie('mrt_cid', cid)
    setCookieId(cid)
    setConsent('accepted')
  }, [])

  const rejectCookies = useCallback(() => {
    setCookie('mrt_consent', 'rejected')
    deleteCookie('mrt_cid')
    setCookieId('')
    setConsent('rejected')
  }, [])

  useEffect(() => {
    let stop = false
    const refresh = () => {
      if (document.hidden) return
      fetch('/api/stats')
        .then((r) => r.json())
        .then((d) => {
          if (!stop && typeof d.total === 'number') setTotal(d.total)
        })
        .catch(() => {})
    }
    refresh()
    const id = setInterval(refresh, 15000)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      stop = true
      clearInterval(id)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  const open = useCallback((t?: DownloadTarget) => {
    setTarget(t ?? detectOs())
    setModalOpen(true)
  }, [])

  return (
    <DownloadContext.Provider value={{ total, sessionId, cookieId, open }}>
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
        target={target}
        onClose={() => setModalOpen(false)}
        onCounted={setTotal}
      />

      <CookieConsent
        show={ready && consent === null}
        onAccept={acceptCookies}
        onReject={rejectCookies}
      />
    </DownloadContext.Provider>
  )
}
