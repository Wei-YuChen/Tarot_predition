import type {
  AdmobRewardItem,
  BannerAdOptions,
} from '@capacitor-community/admob';

let admobModule: typeof import('@capacitor-community/admob') | null = null;
let initialized = false;

type SupportedPlatform = 'ios' | 'android' | 'web';
type AdUnitKind = 'banner' | 'interstitial' | 'rewarded';

let cachedPlatform: SupportedPlatform | undefined;

function normalizePlatform(value?: string | null): SupportedPlatform | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();

  if (normalized === 'ios' || normalized === 'android' || normalized === 'web') {
    return normalized;
  }

  return undefined;
}

function detectPlatformFromEnv(): SupportedPlatform | undefined {
  return normalizePlatform(process.env.NEXT_PUBLIC_ADMOB_PLATFORM ?? undefined);
}

function detectPlatformFromCapacitor(): SupportedPlatform | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const maybeCapacitor = (window as typeof window & {
    Capacitor?: { getPlatform?: () => string };
  }).Capacitor;

  if (!maybeCapacitor?.getPlatform) {
    return undefined;
  }

  return normalizePlatform(maybeCapacitor.getPlatform());
}

function detectPlatformFromNavigator(): SupportedPlatform | undefined {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const ua = navigator.userAgent || '';

  if (/android/i.test(ua)) {
    return 'android';
  }

  if (/iphone|ipad|ipod/i.test(ua)) {
    return 'ios';
  }

  return undefined;
}

export function detectAdPlatform(): SupportedPlatform {
  if (cachedPlatform) {
    return cachedPlatform;
  }

  cachedPlatform =
    detectPlatformFromEnv() ??
    detectPlatformFromCapacitor() ??
    detectPlatformFromNavigator() ??
    'web';

  return cachedPlatform;
}

const AD_UNIT_ENV_KEYS: Record<'shared' | SupportedPlatform, Record<AdUnitKind, string>> = {
    shared: {
      banner: 'NEXT_PUBLIC_ADMOB_BANNER_ID',
      interstitial: 'NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID',
      rewarded: 'NEXT_PUBLIC_ADMOB_REWARDED_ID',
    },
    ios: {
      banner: 'NEXT_PUBLIC_ADMOB_IOS_BANNER_ID',
      interstitial: 'NEXT_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID',
      rewarded: 'NEXT_PUBLIC_ADMOB_IOS_REWARDED_ID',
    },
    android: {
      banner: 'NEXT_PUBLIC_ADMOB_ANDROID_BANNER_ID',
      interstitial: 'NEXT_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID',
      rewarded: 'NEXT_PUBLIC_ADMOB_ANDROID_REWARDED_ID',
    },
    web: {
      banner: 'NEXT_PUBLIC_ADMOB_BANNER_ID',
      interstitial: 'NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID',
      rewarded: 'NEXT_PUBLIC_ADMOB_REWARDED_ID',
    },
  };

export function getAdmobAdUnitId(
  kind: AdUnitKind,
  explicit?: string
): string | undefined {
  if (explicit) {
    return explicit;
  }

  const platform = detectAdPlatform();
  const env = process.env as Record<string, string | undefined>;
  const platformKey = AD_UNIT_ENV_KEYS[platform]?.[kind];
  const fallbackKey = AD_UNIT_ENV_KEYS.shared[kind];

  return env[platformKey] ?? env[fallbackKey];
}

export function __resetAdmobPlatformCacheForTests() {
  cachedPlatform = undefined;
}

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
