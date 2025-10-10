import React from 'react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const footerLinks = [
    { href: '/about', label: locale === 'tw' ? '關於我們' : 'About' },
    { href: '/contact', label: locale === 'tw' ? '聯絡我們' : 'Contact' },
    { href: '/faq', label: locale === 'tw' ? '常見問題' : 'FAQ' },
    { href: '/terms', label: locale === 'tw' ? '使用條款' : 'Terms' },
    {
      href: `/${locale}/privacy`,
      label: locale === 'tw' ? '隱私政策' : 'Privacy',
    },
  ];

  return (
    <footer className="mt-16 bg-gray-50 dark:bg-tarot-cosmic border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl" role="img" aria-label="crystal ball">
                🔮
              </span>
              <span className="font-serif font-bold text-xl text-gray-900 dark:text-white">
                Mystic Tarot
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {locale === 'zh'
                ? '通往古老智慧的门户'
                : locale === 'tw'
                  ? '通往古老智慧的門戶'
                  : 'Your gateway to ancient wisdom'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {locale === 'tw' ? '快速連結' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {locale === 'tw' ? '資源' : 'Resources'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`/${locale}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors text-sm"
                >
                  {locale === 'tw' ? '首頁' : 'Home'}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/reading`}
                  className="text-gray-600 dark:text-gray-400 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors text-sm"
                >
                  {locale === 'tw' ? '開始占卜' : 'Start Reading'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm mb-2">
              {locale === 'zh'
                ? '请记住，塔罗牌阅读仅供娱乐和自我反思之用。'
                : locale === 'tw'
                  ? '請記住，塔羅牌閱讀僅供娛樂和自我反思之用。'
                  : 'Remember, tarot readings are for entertainment and self-reflection purposes only.'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © 2024 Mystic Tarot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
