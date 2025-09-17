'use client';

import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-gray-50 dark:bg-tarot-cosmic border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <span className="font-serif font-semibold">Mystic Tarot</span> -
            Your gateway to ancient wisdom
          </p>
          <p className="text-sm">
            Remember, tarot readings are for entertainment and self-reflection
            purposes only.
          </p>
          <p className="text-xs mt-4 text-gray-500 dark:text-gray-500">
            © 2024 Mystic Tarot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
