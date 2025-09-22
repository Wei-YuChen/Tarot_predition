import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  getAdmobAdUnitId,
  detectAdPlatform,
  __resetAdmobPlatformCacheForTests,
} from '../lib/admob';

type MutableGlobal = typeof globalThis & {
  window?: {
    Capacitor?: {
      getPlatform?: () => string;
    };
  };
  navigator?: {
    userAgent: string;
  };
};

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) {
      delete process.env[key];
    }
  }

  Object.assign(process.env, ORIGINAL_ENV);
}

function resetPlatformDetection() {
  __resetAdmobPlatformCacheForTests();
  delete (globalThis as MutableGlobal).window;
  delete (globalThis as MutableGlobal).navigator;
}

describe('admob ad unit resolution', () => {
  beforeEach(() => {
    resetEnv();
    resetPlatformDetection();
  });

  afterEach(() => {
    resetEnv();
    resetPlatformDetection();
  });

  it('falls back to shared ids when no platform-specific value is present', () => {
    process.env.NEXT_PUBLIC_ADMOB_BANNER_ID = 'shared-banner';

    const resolved = getAdmobAdUnitId('banner');

    assert.equal(resolved, 'shared-banner');
  });

  it('prefers iOS-specific ids when Capacitor reports iOS', () => {
    process.env.NEXT_PUBLIC_ADMOB_REWARDED_ID = 'shared-reward';
    process.env.NEXT_PUBLIC_ADMOB_IOS_REWARDED_ID = 'ios-reward';

    (globalThis as MutableGlobal).window = {
      Capacitor: {
        getPlatform: () => 'ios',
      },
    };

    const platform = detectAdPlatform();
    const resolved = getAdmobAdUnitId('rewarded');

    assert.equal(platform, 'ios');
    assert.equal(resolved, 'ios-reward');
  });

  it('respects explicit ad unit overrides', () => {
    process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID = 'shared-interstitial';

    const resolved = getAdmobAdUnitId('interstitial', 'explicit-id');

    assert.equal(resolved, 'explicit-id');
  });

  it('can be forced via NEXT_PUBLIC_ADMOB_PLATFORM override', () => {
    process.env.NEXT_PUBLIC_ADMOB_PLATFORM = 'android';
    process.env.NEXT_PUBLIC_ADMOB_ANDROID_BANNER_ID = 'android-banner';

    const platform = detectAdPlatform();
    const resolved = getAdmobAdUnitId('banner');

    assert.equal(platform, 'android');
    assert.equal(resolved, 'android-banner');
  });
});
