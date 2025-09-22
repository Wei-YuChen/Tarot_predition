/* eslint-disable @typescript-eslint/no-unused-vars */
// Local fallback for @capacitor-community/admob when the real plugin is unavailable.
// It exposes the same surface but only logs debug information.

export enum BannerAdSize {
  BANNER = 'BANNER',
  LARGE_BANNER = 'LARGE_BANNER',
  MEDIUM_RECTANGLE = 'MEDIUM_RECTANGLE',
  FULL_BANNER = 'FULL_BANNER',
  LEADERBOARD = 'LEADERBOARD',
  SMART_BANNER = 'SMART_BANNER',
  ADAPTIVE_BANNER = 'ADAPTIVE_BANNER',
}

export enum BannerAdPosition {
  TOP_CENTER = 'TOP_CENTER',
  CENTER = 'CENTER',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
}

export type AdmobRewardItem = {
  type?: string;
  amount?: number;
};

export type BannerAdOptions = {
  adId: string;
  adSize?: BannerAdSize;
  position?: BannerAdPosition;
  margin?: number;
  isTesting?: boolean;
};

export type InterstitialAdOptions = {
  adId: string;
};

export type RewardAdOptions = {
  adId: string;
};

const warn = (method: string) => {
  if (typeof console !== 'undefined') {
    console.warn(
      `[@capacitor-community/admob stub] ${method} called but plugin is not installed.`
    );
  }
};

export const isAdmobStub = true;

export const AdMob = {
  async initialize(_options?: {
    requestTrackingAuthorization?: boolean;
    initializeForTesting?: boolean;
  }) {
    warn('initialize');
  },
  async prepareInterstitial(_options: InterstitialAdOptions) {
    warn('prepareInterstitial');
  },
  async showInterstitial() {
    warn('showInterstitial');
  },
  async prepareRewardVideoAd(_options: RewardAdOptions) {
    warn('prepareRewardVideoAd');
  },
  async showRewardVideoAd(): Promise<AdmobRewardItem> {
    warn('showRewardVideoAd');
    return { type: 'STUB', amount: 1 };
  },
  async showBanner(_options: BannerAdOptions) {
    warn('showBanner');
  },
  async hideBanner() {
    warn('hideBanner');
  },
  async resumeBanner() {
    warn('resumeBanner');
  },
};

export type PluginListenerHandle = {
  remove: () => Promise<void>;
};

export const addListener = async (
  _event: string,
  _listener: (...args: unknown[]) => void
): Promise<PluginListenerHandle> => {
  warn('addListener');
  return {
    async remove() {
      warn('removeListener');
    },
  };
};

export default {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  addListener,
  isAdmobStub,
};
