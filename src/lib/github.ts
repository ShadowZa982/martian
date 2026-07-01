export type OsKey = 'windows' | 'mac' | 'linux'

export type Asset = {
  name: string
  url: string
  size: number
  label: string
  arch: string | null
}

export type ReleaseVersion = {
  tag: string
  name: string
  date: string
  prerelease: boolean
  notesUrl: string
  os: Record<OsKey, Asset[]>
}

export type AndroidRelease = {
  tag: string
  name: string
  date: string
  prerelease: boolean
  notesUrl: string
  apks: Asset[]
}

type GhAsset = {
  name: string
  browser_download_url: string
  size: number
}

type GhRelease = {
  tag_name: string
  name: string | null
  published_at: string
  prerelease: boolean
  draft: boolean
  html_url: string
  assets: GhAsset[]
}

const REPO = 'foxstudio-201/VoxelXClient'
const ANDROID_REPO = 'foxstudio-201/martianlauncher-adr'

function archOf(name: string): string | null {
  const n = name.toLowerCase()
  if (n.includes('arm64') || n.includes('aarch64')) return 'Apple Silicon'
  if (n.includes('x64') || n.includes('amd64') || n.includes('x86_64'))
    return 'Intel / x64'
  return null
}

function archOfApk(name: string): string | null {
  const n = name.toLowerCase()
  if (n.includes('arm64') || n.includes('aarch64') || n.includes('arm64-v8a')) return 'arm64-v8a'
  if (n.includes('armeabi') || n.includes('armv7') || n.includes('armeabi-v7a')) return 'armeabi-v7a'
  if (n.includes('x86_64')) return 'x86_64'
  if (n.includes('x86') && !n.includes('x86_64')) return 'x86'
  if (n.includes('universal') || n.includes('all')) return 'Universal'
  return null
}

function classify(a: GhAsset): { os: OsKey; label: string } | null {
  const n = a.name.toLowerCase()
  if (n.endsWith('.exe'))
    return {
      os: 'windows',
      label: n.includes('setup') ? 'Installer (.exe)' : 'Portable (.exe)',
    }
  if (n.endsWith('.msi')) return { os: 'windows', label: 'Installer (.msi)' }
  if (n.endsWith('.appimage')) return { os: 'linux', label: 'AppImage' }
  if (n.endsWith('.deb')) return { os: 'linux', label: 'Debian (.deb)' }
  if (n.endsWith('.rpm')) return { os: 'linux', label: 'RPM (.rpm)' }
  if (n.endsWith('.dmg')) return { os: 'mac', label: 'Disk image (.dmg)' }
  if (n.endsWith('.zip') && (n.includes('mac') || n.includes('darwin') || archOf(n)))
    return { os: 'mac', label: 'Archive (.zip)' }
  return null
}

async function ghFetch(url: string): Promise<GhRelease[]> {
  const token = process.env.GITHUB_TOKEN
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'martian-site',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 600 },
  })
  if (!res.ok) throw new Error(`GitHub ${res.status}`)
  return res.json() as Promise<GhRelease[]>
}

export async function fetchReleases(): Promise<ReleaseVersion[]> {
  const data = await ghFetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=30`
  )

  return data
    .filter((r) => !r.draft)
    .map((r) => {
      const os: Record<OsKey, Asset[]> = { windows: [], mac: [], linux: [] }
      for (const a of r.assets) {
        const c = classify(a)
        if (!c) continue
        os[c.os].push({
          name: a.name,
          url: a.browser_download_url,
          size: a.size,
          label: c.label,
          arch: archOf(a.name),
        })
      }
      return {
        tag: r.tag_name,
        name: r.name || r.tag_name,
        date: r.published_at,
        prerelease: r.prerelease,
        notesUrl: r.html_url,
        os,
      }
    })
    .filter(
      (r) => r.os.windows.length || r.os.mac.length || r.os.linux.length
    )
}

export async function fetchAndroidReleases(): Promise<AndroidRelease[]> {
  const data = await ghFetch(
    `https://api.github.com/repos/${ANDROID_REPO}/releases?per_page=30`
  )

  return data
    .filter((r) => !r.draft)
    .map((r) => {
      const apks: Asset[] = r.assets
        .filter((a) => a.name.toLowerCase().endsWith('.apk'))
        .map((a) => {
          const arch = archOfApk(a.name)
          return {
            name: a.name,
            url: a.browser_download_url,
            size: a.size,
            label: arch ? `APK (${arch})` : 'APK',
            arch,
          }
        })
      return {
        tag: r.tag_name,
        name: r.name || r.tag_name,
        date: r.published_at,
        prerelease: r.prerelease,
        notesUrl: r.html_url,
        apks,
      }
    })
    .filter((r) => r.apks.length > 0)
}
