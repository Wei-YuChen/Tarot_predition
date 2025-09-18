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
      return;
    }

    if (!adRef.current) {
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (error) {
      console.error('[adsense] Failed to render slot', error);
    }
  }, [clientId, resolvedSlotId]);

  if (!clientId || !resolvedSlotId) {
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
