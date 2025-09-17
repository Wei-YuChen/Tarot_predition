'use client';

import { usePathname } from 'next/navigation';
import ClientThemeToggle from '@/components/ClientThemeToggle';
import SiteFooter from '@/components/SiteFooter';
import SiteFooterTW from '@/components/SiteFooterTW';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTW = pathname.startsWith('/tw');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-tarot-midnight dark:via-tarot-cosmic dark:to-tarot-midnight">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-tarot-midnight/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a
                href={isTW ? '/tw' : '/'}
                className="flex items-center space-x-2"
              >
                <span className="text-2xl" role="img" aria-label="crystal ball">
                  🔮
                </span>
                <span className="font-serif font-bold text-xl text-gray-900 dark:text-white">
                  {isTW ? '神秘塔羅' : 'Mystic Tarot'}
                </span>
              </a>
            </div>
            <nav className="flex items-center space-x-4">
              <a
                href={isTW ? '/tw' : '/'}
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
              >
                {isTW ? '首頁' : 'Home'}
              </a>
              <a
                href="/draw"
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
              >
                {isTW ? '抽牌' : 'Draw Cards'}
              </a>
              <a
                href={isTW ? '/' : '/tw'}
                className="text-gray-600 dark:text-gray-300 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors"
              >
                {isTW ? 'EN' : '中文'}
              </a>
              <ClientThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {isTW ? <SiteFooterTW /> : <SiteFooter />}
    </div>
  );
}
