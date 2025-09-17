'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文（简体）' },
  { code: 'tw', label: '中文（繁體）' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
];

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie for future visits
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

    // Preserve query parameters
    const queryString = searchParams.toString();
    const fullPath = `/${newLocale}${pathWithoutLocale}${queryString ? `?${queryString}` : ''}`;

    // Navigate to new locale
    router.push(fullPath);
  };

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-white dark:bg-tarot-midnight border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-tarot-purple focus:border-transparent"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
