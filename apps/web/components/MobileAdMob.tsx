'use client';

import React from 'react';
import type { CSSProperties } from 'react';

type MobileAdMobProps = {
  className?: string;
  style?: CSSProperties;
};

export default function MobileAdMob({
  className = '',
  style = {},
}: MobileAdMobProps) {
  // For now, this is a stub implementation for web builds
  // In actual mobile deployment, this would integrate with Capacitor AdMob
  console.log('[admob] MobileAdMob component rendered (stub)');

  return (
    <div
      className={`${className} bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center`}
      style={{
        minHeight: '120px',
        width: '100%',
        ...style,
      }}
      role="banner"
      aria-label="Mobile advertisement placeholder"
    >
      <div className="text-center">
        <div className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
          AdMob Banner
        </div>
        <div className="text-xs opacity-75 text-gray-500 dark:text-gray-500">
          Mobile Ad Placeholder
        </div>
      </div>
    </div>
  );
}
