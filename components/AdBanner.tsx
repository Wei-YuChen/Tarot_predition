'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdBanner({
  position = 'bottom',
  className = '',
}: AdBannerProps) {
  const sizeClasses = {
    top: 'h-20 w-full',
    bottom: 'h-20 w-full',
    sidebar: 'h-64 w-48',
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  return (
    <motion.div
      className={`${sizeClasses[position]} ${className} 
        bg-gradient-to-r from-gray-100 to-gray-200 
        dark:from-gray-800 dark:to-gray-700 
        border border-gray-300 dark:border-gray-600 
        rounded-lg flex items-center justify-center 
        text-gray-500 dark:text-gray-400`}
      variants={variants}
      initial="hidden"
      animate="visible"
      role="banner"
      aria-label="Advertisement placeholder"
    >
      <div className="text-center">
        <div className="text-sm font-medium mb-1">Advertisement</div>
        <div className="text-xs opacity-75">
          {position === 'sidebar' ? 'Sidebar Ad' : 'Banner Ad'}
        </div>
      </div>
    </motion.div>
  );
}
