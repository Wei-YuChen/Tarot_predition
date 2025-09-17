import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme-context';
import ClientThemeToggle from '@/components/ClientThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Suspense } from 'react';
import '@/styles/globals.css';

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
  return [{ locale: 'en' }, { locale: 'zh' }, { locale: 'tw' }];
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  return (
    <html lang={locale} className="dark">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-tarot-midnight dark:via-tarot-cosmic dark:to-tarot-midnight">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-tarot-midnight/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <a
                      href={`/${locale}`}
                      className="flex items-center space-x-2"
                    >
                      <span
                        className="text-2xl"
                        role="img"
                        aria-label="crystal ball"
                      >
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
                      {locale === 'zh'
                        ? '首页'
                        : locale === 'tw'
                          ? '首頁'
                          : 'Home'}
                    </a>
                    <a
                      href={`/${locale}/reading`}
                      className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
                    >
                      {locale === 'zh'
                        ? '抽牌'
                        : locale === 'tw'
                          ? '抽牌'
                          : 'Reading'}
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

            <footer className="mt-16 bg-gray-50 dark:bg-tarot-cosmic border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    <span className="font-serif font-semibold">
                      Mystic Tarot
                    </span>{' '}
                    -{' '}
                    {locale === 'zh'
                      ? '通往古老智慧的门户'
                      : locale === 'tw'
                        ? '通往古老智慧的門戶'
                        : 'Your gateway to ancient wisdom'}
                  </p>
                  <p className="text-sm">
                    {locale === 'zh'
                      ? '请记住，塔罗牌阅读仅供娱乐和自我反思之用。'
                      : locale === 'tw'
                        ? '請記住，塔羅牌閱讀僅供娛樂和自我反思之用。'
                        : 'Remember, tarot readings are for entertainment and self-reflection purposes only.'}
                  </p>
                  <p className="text-xs mt-4 text-gray-500 dark:text-gray-500">
                    © 2024 Mystic Tarot. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
