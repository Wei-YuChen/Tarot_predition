'use client';

import { useEffect, useState } from 'react';
import { initAdmob, showBanner, hideBanner } from '@shared-lib/admob';

type MobileAdMobProps = {
  className?: string;
  bannerId?: string;
};

type BannerStatus = 'idle' | 'loading' | 'loaded' | 'error';

const isAppTarget = process.env.NEXT_PUBLIC_BUILD_TARGET === 'app';

export default function MobileAdMob({ className, bannerId }: MobileAdMobProps) {
  const [status, setStatus] = useState<BannerStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resolvedBannerId = bannerId ?? process.env.NEXT_PUBLIC_ADMOB_BANNER_ID;
  const baseClass =
    'w-full min-h-[60px] flex items-center justify-center text-xs text-gray-400';
  const containerClassName = className
    ? `${baseClass} ${className}`
    : baseClass;

  useEffect(() => {
    if (!isAppTarget) {
      return;
    }

    if (!resolvedBannerId) {
      setStatus('error');
      setErrorMessage('缺少 AdMob Banner 廣告 ID');
      return;
    }

    let cancelled = false;

    const setupBanner = async () => {
      setStatus('loading');
      const initialized = await initAdmob();

      if (!initialized) {
        if (!cancelled) {
          setStatus('error');
          setErrorMessage('AdMob 初始化失敗');
        }
        return;
      }

      const success = await showBanner(resolvedBannerId);

      if (cancelled) {
        return;
      }

      if (success) {
        setStatus('loaded');
        setErrorMessage(null);
      } else {
        setStatus('error');
        setErrorMessage('AdMob Banner 顯示失敗');
      }
    };

    setupBanner();

    return () => {
      cancelled = true;
      hideBanner().catch((error) => {
        console.error('[admob] failed to hide banner on cleanup', error);
      });
    };
  }, [resolvedBannerId]);

  if (!isAppTarget) {
    return null;
  }

  return (
    <div className={containerClassName}>
      {status === 'loaded' ? null : errorMessage || '廣告載入中…'}
    </div>
  );
}
