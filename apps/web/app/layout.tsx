import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from '@/lib/theme-context';
import StructuredData from '@/components/StructuredData';
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
        <meta
          name="google-adsense-account"
          content={
            process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
            'ca-pub-8388475297920969'
          }
        />
        <StructuredData type="website" data={{}} />
        <StructuredData type="organization" data={{}} />
        <StructuredData
          type="service"
          data={{
            description:
              'Free online tarot card readings with traditional three-card spreads. Get insights into your past, present, and future through our mystical platform.',
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google AdSense verification script */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
            process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
            'ca-pub-8388475297920969'
          }`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
