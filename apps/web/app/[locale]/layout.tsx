import type { Metadata } from 'next';
import { Suspense } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import ClientThemeToggle from '@/components/ClientThemeToggle';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { getHomeTexts } from '@/lib/localization';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

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

// Generate static params for all supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'tw' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'vi' },
    { locale: 'th' },
    { locale: 'id' },
    { locale: 'ms' },
  ];
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const t = getHomeTexts(locale);

  // This layout just wraps the children with locale-specific header and footer
  // The HTML/body structure is handled by the root layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-tarot-midnight dark:via-tarot-cosmic dark:to-tarot-midnight">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-tarot-midnight/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href={`/${locale}`} className="flex items-center space-x-2">
                <span className="text-2xl" role="img" aria-label="crystal ball">
                  🔮
                </span>
                <span className="font-serif font-bold text-xl text-gray-900 dark:text-white">
                  Mystic Tarot
                </span>
              </a>
            </div>
            <nav className="flex items-center space-x-4">
              <a
                href={`/${locale}`}
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
              >
                {t.nav.home}
              </a>
              <a
                href={`/${locale}/reading`}
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
              >
                {t.nav.reading}
              </a>
              <a
                href={`/${locale}/about`}
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors text-sm"
              >
                {locale === 'tw' ? '關於' : 'About'}
              </a>
              <a
                href={`/${locale}/faq`}
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors text-sm"
              >
                {locale === 'tw' ? '常見問題' : 'FAQ'}
              </a>
              <Suspense
                fallback={
                  <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                }
              >
                <LanguageSwitcher currentLocale={locale} />
              </Suspense>
              <ClientThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
