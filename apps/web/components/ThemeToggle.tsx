'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const springConfig = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 items-center rounded-full 
        bg-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 
        focus:ring-tarot-purple focus:ring-offset-2 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      <motion.div
        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 32 : 4,
        }}
        transition={springConfig}
      >
        <motion.span
          className="text-sm"
          animate={{
            rotate: theme === 'dark' ? 360 : 0,
          }}
          transition={springConfig}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </motion.span>
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span className="text-sm opacity-50">☀️</span>
        <span className="text-sm opacity-50">🌙</span>
      </div>
    </motion.button>
  );
}
