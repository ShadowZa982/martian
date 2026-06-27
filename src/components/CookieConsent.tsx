'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from '@phosphor-icons/react'

export default function CookieConsent({
  show,
  onAccept,
  onReject,
}: {
  show: boolean
  onAccept: () => void
  onReject: () => void
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6"
          role="dialog"
          aria-label="Thông báo cookie"
        >
          <div className="glass mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <Cookie weight="duotone" className="h-6 w-6 shrink-0 text-mars-300" />
              <p className="text-sm leading-relaxed text-white/70">
                Chúng tôi dùng cookie để ghi nhớ phiên truy cập và thống kê lượt
                tải, giúp cải thiện trải nghiệm. Bạn có thể chấp nhận hoặc từ chối.
              </p>
            </div>
            <div className="flex shrink-0 gap-2.5">
              <button
                onClick={onReject}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/75 transition hover:border-white/30 hover:text-white"
              >
                Từ chối
              </button>
              <button
                onClick={onAccept}
                className="rounded-full bg-gradient-to-r from-mars-600 to-mars-500 px-5 py-2.5 text-sm font-medium text-white transition hover:from-mars-500 hover:to-mars-400"
              >
                Chấp nhận
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
