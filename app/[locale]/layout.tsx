import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme-context';
import ClientThemeToggle from '@/components/ClientThemeToggle';
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
                      {locale === 'zh' ? '首页' : 'Home'}
                    </a>
                    <a
                      href={`/${locale}/reading`}
                      className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
                    >
                      {locale === 'zh' ? '抽牌' : 'Reading'}
                    </a>
                    <div className="flex items-center space-x-2">
                      <a
                        href="/en"
                        className={`text-sm px-2 py-1 rounded ${locale === 'en' ? 'bg-tarot-purple text-white' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        EN
                      </a>
                      <a
                        href="/zh"
                        className={`text-sm px-2 py-1 rounded ${locale === 'zh' ? 'bg-tarot-purple text-white' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        中文
                      </a>
                    </div>
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
                      : 'Your gateway to ancient wisdom'}
                  </p>
                  <p className="text-sm">
                    {locale === 'zh'
                      ? '请记住，塔罗牌阅读仅供娱乐和自我反思之用。'
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
