import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildReadingSignature,
  createAppReadingKey,
  loadAppReadingState,
  markAppRewardUnlocked,
  storeAppDeepAnalysis,
  upsertAppReadingState,
  purgeStaleAppReadingStates,
} from '../lib/app-reading-storage';

type MutableWindow = {
  localStorage?: Storage;
};

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  get length(): number {
    return this.store.size;
  }
}

const STORAGE_KEY = 'tarot_app_reading_sessions_v1';
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

const getStorage = () => (globalThis as MutableWindow).localStorage as Storage;

describe('app-reading-storage', () => {
  beforeEach(() => {
    const storage = new MemoryStorage();
    (globalThis as MutableWindow).localStorage = storage as Storage;
    (globalThis as { window?: MutableWindow }).window = {
      localStorage: storage as Storage,
    };
  });

  afterEach(() => {
    delete (globalThis as MutableWindow).localStorage;
    delete (globalThis as { window?: MutableWindow }).window;
  });

  it('normalizes question when creating session key', () => {
    const signature = buildReadingSignature([
      { id: 'foo', isReversed: false, index: 0 },
      { id: 'bar', isReversed: true, index: 1 },
    ]);

    const key = createAppReadingKey('  Love   Life  ', signature);

    assert.equal(key, 'love life::0:foo:U|1:bar:R');
  });

  it('persists reward unlock and deep analysis payloads', () => {
    const signature = buildReadingSignature([
      { id: 'sun', isReversed: false, index: 0 },
      { id: 'moon', isReversed: true, index: 1 },
      { id: 'star', isReversed: false, index: 2 },
    ]);

    const base = {
      key: createAppReadingKey('insight', signature),
      question: 'insight',
      signature,
    };

    const initial = upsertAppReadingState(base);
    assert.equal(initial.hasUnlockedReward, false);

    const unlocked = markAppRewardUnlocked(base);
    assert.equal(unlocked.hasUnlockedReward, true);

    const storedAnalysis = storeAppDeepAnalysis(base, 'Deep guidance');
    assert.equal(storedAnalysis.deepAnalysis, 'Deep guidance');

    const loaded = loadAppReadingState(base.key);
    assert.notEqual(loaded, null);
    assert.equal(loaded?.deepAnalysis, 'Deep guidance');
    assert.equal(loaded?.hasUnlockedReward, true);
  });

  it('purges sessions older than TTL', () => {
    const signature = buildReadingSignature([
      { id: 'justice', isReversed: false, index: 0 },
    ]);

    const base = {
      key: createAppReadingKey('stale', signature),
      question: 'stale',
      signature,
    };

    const saved = upsertAppReadingState(base, {
      hasUnlockedReward: true,
    });

    const storedRaw = getStorage().getItem(STORAGE_KEY);
    assert.notEqual(storedRaw, null);

    const parsed = JSON.parse(storedRaw as string) as typeof saved[];
    parsed[0].updatedAt = new Date(Date.now() - TTL_MS - 1).toISOString();
    getStorage().setItem(STORAGE_KEY, JSON.stringify(parsed));

    purgeStaleAppReadingStates();

    const after = getStorage().getItem(STORAGE_KEY);
    assert.equal(after, '[]');
    const loaded = loadAppReadingState(base.key);
    assert.equal(loaded, null);
  });
});
