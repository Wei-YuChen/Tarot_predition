'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

type WebAdsenseProps = {
  className?: string;
  slotId?: string;
  style?: CSSProperties;
};

export default function WebAdsense({
  className,
  slotId,
  style,
}: WebAdsenseProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const resolvedSlotId = slotId ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!clientId || !resolvedSlotId) {
      console.warn('[adsense] Missing required configuration:', {
        clientId: clientId ? 'present' : 'missing',
        slotId: resolvedSlotId ? 'present' : 'missing',
      });
      return;
    }

    if (!adRef.current) {
      console.warn('[adsense] Ad container ref not available');
      return;
    }

    try {
      console.log('[adsense] Attempting to render ad slot:', {
        clientId,
        slotId: resolvedSlotId,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
      console.log('[adsense] Ad slot rendered successfully');
    } catch (error) {
      console.error('[adsense] Failed to render slot', error);
    }
  }, [clientId, resolvedSlotId]);

  if (!clientId || !resolvedSlotId) {
    console.warn('[adsense] Missing required configuration:', {
      clientId: clientId ? 'present' : 'missing',
      slotId: resolvedSlotId ? 'present' : 'missing'
    });
    return (
      <div
        className={className}
        role="presentation"
        aria-hidden="true"
        style={{ minHeight: '120px', ...style }}
      />
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{
          display: 'block',
          minHeight: '120px',
          width: '100%',
          ...style,
        }}
        data-ad-client={clientId}
        data-ad-slot={resolvedSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
