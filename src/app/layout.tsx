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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
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
