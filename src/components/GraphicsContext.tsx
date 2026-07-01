'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type GraphicsMode = 'lite' | 'quality'

type GraphicsCtx = {
  mode: GraphicsMode
  toggle: () => void
}

const GraphicsContext = createContext<GraphicsCtx>({
  mode: 'lite',
  toggle: () => {},
})

export function GraphicsProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<GraphicsMode>('lite')

  useEffect(() => {
    const saved = localStorage.getItem('mrt_gfx') as GraphicsMode | null
    if (saved === 'quality' || saved === 'lite') setMode(saved)
  }, [])

  const toggle = () => {
    setMode((prev) => {
      const next = prev === 'lite' ? 'quality' : 'lite'
      localStorage.setItem('mrt_gfx', next)
      return next
    })
  }

  return (
    <GraphicsContext.Provider value={{ mode, toggle }}>
      {children}
    </GraphicsContext.Provider>
  )
}

export const useGraphics = () => useContext(GraphicsContext)
