import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Modern E-Commerce Showcase | Quality Products & Reviews',
    template: '%s | Modern E-Commerce Showcase'
  },
  description: 'Discover quality products with authentic customer reviews. Browse our curated collection of premium items with detailed product information and real customer feedback.',
  keywords: ['e-commerce', 'products', 'shopping', 'reviews', 'quality products', 'online store'],
  authors: [{ name: 'Modern E-Commerce Showcase' }],
  creator: 'Modern E-Commerce Showcase',
  publisher: 'Modern E-Commerce Showcase',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Modern E-Commerce Showcase | Quality Products & Reviews',
    description: 'Discover quality products with authentic customer reviews. Browse our curated collection of premium items.',
    siteName: 'Modern E-Commerce Showcase',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern E-Commerce Showcase | Quality Products & Reviews',
    description: 'Discover quality products with authentic customer reviews. Browse our curated collection of premium items.',
    creator: '@ModernEcommerce',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </AuthProvider>
      </body>
    </html>
  )
}