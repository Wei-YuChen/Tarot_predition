import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mystic Tarot - Discover Your Path',
  description: 'A mystical Tarot Card reading web application. Draw three cards to explore your past, present, and future through ancient divination wisdom.',
  keywords: ['tarot', 'divination', 'spirituality', 'fortune telling', 'cards', 'mystic'],
  authors: [{ name: 'Tarot Prediction' }],
  creator: 'Tarot Prediction',
  publisher: 'Tarot Prediction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Mystic Tarot - Discover Your Path',
    description: 'Draw three cards to explore your past, present, and future through ancient Tarot wisdom.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mystic Tarot - Discover Your Path',
    description: 'Draw three cards to explore your past, present, and future through ancient Tarot wisdom.',
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
    google: 'google-site-verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}