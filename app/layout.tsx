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
  // Console warning for development when AdSense client ID is not set
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  ) {
    console.warn(
      'AdSense: NEXT_PUBLIC_ADSENSE_CLIENT_ID is not set. AdSense script will not render in production.'
    );
  }

  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {/* Google AdSense verification script with client parameter in URL */}
        {process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            strategy="beforeInteractive"
            crossOrigin="anonymous"
          />
        ) : null}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
