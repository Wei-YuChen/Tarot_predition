'use client';

import React from 'react';

export default function SiteFooterTW() {
  return (
    <footer className="mt-16 bg-gray-50 dark:bg-tarot-cosmic border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <span className="font-serif font-semibold">神秘塔羅</span> -
            您通往古老智慧的門戶
          </p>
          <p className="text-sm">請記住，塔羅占卜僅供娛樂和自我反思之用。</p>
          <p className="text-xs mt-4 text-gray-500 dark:text-gray-500">
            © 2024 神秘塔羅. 版權所有。
          </p>
        </div>
      </div>
    </footer>
  );
}
