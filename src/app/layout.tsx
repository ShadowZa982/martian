import type { Metadata, Viewport } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import GlassFilter from '@/components/GlassFilter'
import { GraphicsProvider } from '@/components/GraphicsContext'
import { siteConfig, siteUrl } from '@/lib/site'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cellipse cx='32' cy='33' rx='29' ry='11' transform='rotate(-26 32 33)' fill='none' stroke='%23ff8a4c' stroke-width='2.6'/%3E%3Ccircle cx='30' cy='30' r='20' fill='%23ff6a3d'/%3E%3Ccircle cx='22' cy='22' r='4.4' fill='%23bb2d18'/%3E%3Ccircle cx='35' cy='20' r='2.4' fill='%23bb2d18'/%3E%3Ccircle cx='34' cy='35' r='5.6' fill='%23bb2d18'/%3E%3Ccircle cx='20' cy='36' r='3' fill='%23bb2d18'/%3E%3C/svg%3E"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: { canonical: '/' },
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: [{ url: favicon }] },
}

export const viewport: Viewport = {
  themeColor: '#0a0605',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'vi-VN',
      publisher: { '@id': `${siteUrl}/#org` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#org`,
      name: siteConfig.author,
      url: siteUrl,
      sameAs: [
        'https://github.com/foxstudio-201/VoxelXClient',
        'https://join.foxstudio.site',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: siteConfig.product,
      operatingSystem: 'Windows, macOS, Linux',
      applicationCategory: 'GameApplication',
      description: siteConfig.description,
      downloadUrl: `${siteUrl}/#download`,
      softwareVersion: 'latest',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${siteUrl}/#org` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${sora.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GlassFilter />
        <GraphicsProvider>
          {children}
        </GraphicsProvider>
      </body>
    </html>
  )
}
