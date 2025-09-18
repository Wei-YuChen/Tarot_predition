import type {
  AdmobRewardItem,
  BannerAdOptions,
} from '@capacitor-community/admob';

let admobModule: typeof import('@capacitor-community/admob') | null = null;
let initialized = false;

function isAppTarget() {
  return process.env.NEXT_PUBLIC_BUILD_TARGET === 'app';
}

function canUseAdmob() {
  if (!isAppTarget()) {
    return false;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  return true;
}

async function getAdmob() {
  if (!canUseAdmob()) {
    throw new Error(
      'AdMob is only available in app build target on the client.'
    );
  }

  if (!admobModule) {
    admobModule = await import('@capacitor-community/admob');
  }

  return admobModule;
}

export async function initAdmob(): Promise<boolean> {
  if (!canUseAdmob()) {
    return false;
  }

  if (initialized) {
    return true;
  }

  try {
    const { AdMob } = await getAdmob();
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    });
    initialized = true;
    return true;
  } catch (error) {
    console.error('[admob] initialize failed', error);
    return false;
  }
}

async function ensureInitialized() {
  if (!initialized) {
    await initAdmob();
  }
}

export async function showInterstitial(
  adId: string | undefined
): Promise<void> {
  if (!canUseAdmob()) {
    return;
  }

  if (!adId) {
    console.warn('[admob] Missing interstitial ad unit id, skip showing.');
    return;
  }

  try {
    const { AdMob } = await getAdmob();
    await ensureInitialized();
    await AdMob.prepareInterstitial({ adId });
    await AdMob.showInterstitial();
  } catch (error) {
    console.error('[admob] showInterstitial failed', error);
  }
}

export async function showRewarded(
  adId: string | undefined
): Promise<AdmobRewardItem | undefined> {
  if (!canUseAdmob()) {
    return undefined;
  }

  if (!adId) {
    console.warn('[admob] Missing rewarded ad unit id, skip showing.');
    return undefined;
  }

  try {
    const { AdMob } = await getAdmob();
    await ensureInitialized();
    await AdMob.prepareRewardVideoAd({ adId });
    const result = await AdMob.showRewardVideoAd();
    return result;
  } catch (error) {
    console.error('[admob] showRewarded failed', error);
    return undefined;
  }
}

export async function showBanner(
  adId: string | undefined,
  options: Partial<BannerAdOptions> = {}
): Promise<boolean> {
  if (!canUseAdmob()) {
    return false;
  }

  if (!adId) {
    console.warn('[admob] Missing banner ad unit id, skip showing.');
    return false;
  }

  try {
    const { AdMob, BannerAdPosition, BannerAdSize } = await getAdmob();
    await ensureInitialized();

    const bannerOptions: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      ...options,
    };

    await AdMob.showBanner(bannerOptions);
    return true;
  } catch (error) {
    console.error('[admob] showBanner failed', error);
    return false;
  }
}

export async function hideBanner(): Promise<boolean> {
  if (!canUseAdmob()) {
    return false;
  }

  try {
    const { AdMob } = await getAdmob();
    await AdMob.hideBanner();
    return true;
  } catch (error) {
    console.error('[admob] hideBanner failed', error);
    return false;
  }
}

export async function resumeBanner(): Promise<boolean> {
  if (!canUseAdmob()) {
    return false;
  }

  try {
    const { AdMob } = await getAdmob();
    await AdMob.resumeBanner();
    return true;
  } catch (error) {
    console.error('[admob] resumeBanner failed', error);
    return false;
  }
}
