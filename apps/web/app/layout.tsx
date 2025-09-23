import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from '@/lib/theme-context';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Mystic Tarot - Free Online Tarot Card Readings',
  description:
    'Get your free daily tarot reading with our mystical three-card spread. Discover insights about your past, present, and future with traditional tarot wisdom.',
  keywords:
    'tarot, tarot cards, tarot reading, divination, spirituality, mystic, fortune telling, card reading',
  authors: [{ name: 'Mystic Tarot' }],
  creator: 'Mystic Tarot',
  publisher: 'Mystic Tarot',
  robots: 'index, follow',
  openGraph: {
    title: 'Mystic Tarot - Free Online Tarot Card Readings',
    description:
      'Get your free daily tarot reading with our mystical three-card spread. Discover insights about your past, present, and future.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mystic Tarot - Free Online Tarot Card Readings',
    description:
      'Get your free daily tarot reading with our mystical three-card spread.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google AdSense verification meta tag */}
        <meta name="google-adsense-account" content="ca-pub-8388475297920969" />
      </head>
      <body className="bg-white dark:bg-tarot-midnight text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans antialiased">
        {/* Google AdSense verification script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client={
            process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
            'ca-pub-XXXXXXXXXXXXXXXX'
          }
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
