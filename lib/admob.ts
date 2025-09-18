/**
 * Capacitor AdMob 封裝。Phase 0 先提供無操作的預設實作，
 * 之後會在行動版正式導入 @capacitor-community/admob。 
 */
export async function initAdmob(): Promise<void> {
  if (process.env.NEXT_PUBLIC_BUILD_TARGET !== 'app') {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  if (!(window as typeof window & { Capacitor?: unknown }).Capacitor) {
    console.warn('[admob] Capacitor runtime not detected, skipping initialization.');
  }
}

export async function showInterstitial(_adId: string): Promise<void> {
  if (process.env.NEXT_PUBLIC_BUILD_TARGET !== 'app') {
    return;
  }

  console.warn('[admob] showInterstitial is a placeholder in Phase 0.');
}

export async function showRewarded(_adId: string): Promise<{ type?: string; amount?: number }> {
  if (process.env.NEXT_PUBLIC_BUILD_TARGET !== 'app') {
    return {};
  }

  console.warn('[admob] showRewarded is a placeholder in Phase 0.');
  return {};
}
