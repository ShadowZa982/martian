import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0605',
    theme_color: '#0a0605',
    icons: [
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23ff6a3d'/%3E%3Ccircle cx='24' cy='25' r='6' fill='%23bb2d18'/%3E%3Ccircle cx='41' cy='39' r='8' fill='%23bb2d18'/%3E%3Ccircle cx='44' cy='20' r='3.5' fill='%23bb2d18'/%3E%3C/svg%3E",
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
