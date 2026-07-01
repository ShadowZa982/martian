import type { OsKey } from './github'

export const OS_META: Record<
  OsKey,
  { label: string; icon: string; tagline: string }
> = {
  windows: { label: 'Windows', icon: 'windows', tagline: 'Windows 10 · 11 (64-bit)' },
  mac: { label: 'macOS', icon: 'apple', tagline: 'Apple Silicon · Intel' },
  linux: { label: 'Linux', icon: 'linux', tagline: 'AppImage · .deb · AUR' },
}

export const ANDROID_META = {
  label: 'Android',
  tagline: 'Android 8.0+ (APK)',
  minSdk: 'Android 8.0 (API 26)+',
}

export function detectOs(): OsKey {
  if (typeof navigator === 'undefined') return 'windows'
  const ua = navigator.userAgent.toLowerCase()
  const platform = (navigator.platform || '').toLowerCase()
  if (ua.includes('win') || platform.includes('win')) return 'windows'
  if (
    ua.includes('mac') ||
    platform.includes('mac') ||
    ua.includes('iphone') ||
    ua.includes('ipad')
  )
    return 'mac'
  return 'linux'
}

export function formatBytes(bytes: number): string {
  if (!bytes) return '—'
  const mb = bytes / (1024 * 1024)
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`
}
