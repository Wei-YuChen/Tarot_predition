'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function ClientThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300 dark:bg-gray-600">
        <div className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg flex items-center justify-center ml-1">
          <span className="text-sm">🌙</span>
        </div>
      </div>
    );
  }

  return <ThemeToggle />;
}
