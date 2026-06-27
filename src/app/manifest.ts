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
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cellipse cx='32' cy='33' rx='29' ry='11' transform='rotate(-26 32 33)' fill='none' stroke='%23ff8a4c' stroke-width='2.6'/%3E%3Ccircle cx='30' cy='30' r='20' fill='%23ff6a3d'/%3E%3Ccircle cx='22' cy='22' r='4.4' fill='%23bb2d18'/%3E%3Ccircle cx='35' cy='20' r='2.4' fill='%23bb2d18'/%3E%3Ccircle cx='34' cy='35' r='5.6' fill='%23bb2d18'/%3E%3Ccircle cx='20' cy='36' r='3' fill='%23bb2d18'/%3E%3C/svg%3E",
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
