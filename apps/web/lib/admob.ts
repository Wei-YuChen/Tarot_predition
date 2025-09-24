/**
 * AdMob wrapper with graceful fallbacks for web builds
 */

let admobModule: any = null;

async function getAdmobModule() {
  if (admobModule) {
    return admobModule;
  }

  try {
    admobModule = await import('@capacitor-community/admob');
    return admobModule;
  } catch (error) {
    console.warn(
      '[admob] AdMob plugin not available, using stub implementation'
    );
    // Return stub implementation for web builds
    return {
      AdMob: {
        initialize: () => Promise.resolve(),
        showBanner: () => Promise.resolve(),
        hideBanner: () => Promise.resolve(),
        showInterstitial: () => Promise.resolve(),
        prepareInterstitial: () => Promise.resolve(),
        showRewardVideoAd: () => Promise.resolve(),
        prepareRewardVideoAd: () => Promise.resolve(),
      },
      BannerAdPosition: { BOTTOM_CENTER: 'BOTTOM_CENTER' },
      BannerAdSize: { BANNER: 'BANNER' },
    };
  }
}

export async function initAdmob(): Promise<boolean> {
  try {
    const { AdMob } = await getAdmobModule();
    await AdMob.initialize();
    console.log('[admob] AdMob initialized successfully');
    return true;
  } catch (error) {
    console.error('[admob] Failed to initialize AdMob:', error);
    return false;
  }
}

export async function showBanner(adId: string): Promise<boolean> {
  try {
    const { AdMob, BannerAdPosition, BannerAdSize } = await getAdmobModule();
    await AdMob.showBanner({
      adId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
    });
    console.log('[admob] Banner shown successfully');
    return true;
  } catch (error) {
    console.error('[admob] Failed to show banner:', error);
    return false;
  }
}

export async function hideBanner(): Promise<boolean> {
  try {
    const { AdMob } = await getAdmobModule();
    await AdMob.hideBanner();
    console.log('[admob] Banner hidden successfully');
    return true;
  } catch (error) {
    console.error('[admob] Failed to hide banner:', error);
    return false;
  }
}

export async function showInterstitial(adId?: string): Promise<boolean> {
  if (!adId) {
    console.warn('[admob] Missing interstitial ad ID');
    return false;
  }

  try {
    const { AdMob } = await getAdmobModule();
    await AdMob.prepareInterstitial({ adId });
    await AdMob.showInterstitial();
    console.log('[admob] Interstitial shown successfully');
    return true;
  } catch (error) {
    console.error('[admob] Failed to show interstitial:', error);
    return false;
  }
}

export async function showRewarded(adId?: string): Promise<any> {
  if (!adId) {
    console.warn('[admob] Missing rewarded ad ID');
    return null;
  }

  try {
    const { AdMob } = await getAdmobModule();
    await AdMob.prepareRewardVideoAd({ adId });
    const result = await AdMob.showRewardVideoAd();
    console.log('[admob] Rewarded ad shown successfully');
    return result;
  } catch (error) {
    console.error('[admob] Failed to show rewarded ad:', error);
    return null;
  }
}
