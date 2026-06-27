function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl()

export const siteConfig = {
  name: 'Martian',
  shortName: 'Martian',
  product: 'VoxelXLauncher',
  title: 'Martian Launcher',
  description:
    'Martian là cổng tải chính thức cho VoxelXLauncher — trình khởi chạy Minecraft thế hệ mới. Quản lý hồ sơ, cài mod (Fabric, Forge, NeoForge, Quilt), tự động tải Java và chơi mọi phiên bản. Hỗ trợ Windows, macOS và Linux.',
  keywords: [
    'Martian',
    'VoxelXLauncher',
    'VoxelX',
    'Minecraft launcher',
    'trình khởi chạy Minecraft',
    'tải Minecraft launcher',
    'Minecraft mod',
    'Fabric',
    'Forge',
    'NeoForge',
    'Quilt',
    'Modrinth',
    'CurseForge',
    'launcher game',
    'FoxStudio',
  ],
  locale: 'vi_VN',
  author: 'FoxStudio',
  twitter: '@foxstudio',
}
