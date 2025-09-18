const STORAGE_KEY = 'tarot_app_reading_sessions_v1';
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export type AppReadingState = {
  key: string;
  question: string;
  signature: string;
  hasUnlockedReward: boolean;
  deepAnalysis?: string;
  updatedAt: string;
};

export type AppReadingSessionInput = {
  key: string;
  question: string;
  signature: string;
};

function getStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  if (typeof globalThis !== 'undefined') {
    try {
      const candidate = (globalThis as typeof globalThis & {
        localStorage?: Storage;
      }).localStorage;
      if (candidate) {
        return candidate;
      }
    } catch (error) {
      console.warn('[app-reading-storage] unable to access global localStorage', error);
    }
  }

  return null;
}

function nowISO() {
  return new Date().toISOString();
}

function normalizeQuestion(question: string): string {
  return question.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function createAppReadingKey(
  question: string,
  signature: string
): string {
  return `${normalizeQuestion(question)}::${signature}`;
}

export type CardSignatureInput = {
  id: string;
  isReversed: boolean;
  index: number;
};

export function buildReadingSignature(cards: CardSignatureInput[]): string {
  return cards
    .map((card) =>
      [card.index, card.id, card.isReversed ? 'R' : 'U'].join(':')
    )
    .join('|');
}

function readSessions(storage: Storage): AppReadingState[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry): entry is AppReadingState => {
      if (!entry || typeof entry !== 'object') {
        return false;
      }

      const candidate = entry as Partial<AppReadingState>;
      return (
        typeof candidate.key === 'string' &&
        typeof candidate.question === 'string' &&
        typeof candidate.signature === 'string' &&
        typeof candidate.updatedAt === 'string'
      );
    });
  } catch (error) {
    console.warn('[app-reading-storage] failed to read sessions', error);
    return [];
  }
}

function writeSessions(storage: Storage, sessions: AppReadingState[]) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.warn('[app-reading-storage] failed to write sessions', error);
  }
}

function pruneExpired(sessions: AppReadingState[]): {
  sessions: AppReadingState[];
  changed: boolean;
} {
  const now = Date.now();
  const freshSessions = sessions.filter((session) => {
    const updated = new Date(session.updatedAt).getTime();
    if (Number.isNaN(updated)) {
      return false;
    }

    return now - updated <= TTL_MS;
  });

  return {
    sessions: freshSessions,
    changed: freshSessions.length !== sessions.length,
  };
}

function ensureSession(
  base: AppReadingSessionInput,
  existing: AppReadingState | undefined
): AppReadingState {
  const defaultState: AppReadingState = {
    key: base.key,
    question: base.question,
    signature: base.signature,
    hasUnlockedReward: false,
    updatedAt: nowISO(),
  };

  if (!existing) {
    return defaultState;
  }

  return {
    ...existing,
    key: base.key,
    question: base.question,
    signature: base.signature,
  };
}

export function purgeStaleAppReadingStates(): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  const { sessions, changed } = pruneExpired(readSessions(storage));
  if (changed) {
    writeSessions(storage, sessions);
  }
}

export function loadAppReadingState(
  key: string
): AppReadingState | null {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const { sessions, changed } = pruneExpired(readSessions(storage));
  if (changed) {
    writeSessions(storage, sessions);
  }

  return sessions.find((session) => session.key === key) ?? null;
}

export function upsertAppReadingState(
  base: AppReadingSessionInput,
  patch: Partial<Pick<AppReadingState, 'hasUnlockedReward' | 'deepAnalysis'>> = {}
): AppReadingState {
  const storage = getStorage();
  if (!storage) {
    const updatedAt = nowISO();
    return {
      key: base.key,
      question: base.question,
      signature: base.signature,
      hasUnlockedReward: patch.hasUnlockedReward ?? false,
      deepAnalysis: patch.deepAnalysis,
      updatedAt,
    };
  }

  const { sessions, changed } = pruneExpired(readSessions(storage));
  let didChange = changed;
  const index = sessions.findIndex((session) => session.key === base.key);
  const existing = index >= 0 ? sessions[index] : undefined;
  const entry = ensureSession(base, existing);
  const next: AppReadingState = {
    ...entry,
    hasUnlockedReward:
      patch.hasUnlockedReward ?? entry.hasUnlockedReward ?? false,
    deepAnalysis:
      Object.prototype.hasOwnProperty.call(patch, 'deepAnalysis')
        ? patch.deepAnalysis
        : entry.deepAnalysis,
    updatedAt: nowISO(),
  };

  if (index >= 0) {
    if (
      next.hasUnlockedReward !== sessions[index].hasUnlockedReward ||
      next.deepAnalysis !== sessions[index].deepAnalysis ||
      next.question !== sessions[index].question ||
      next.signature !== sessions[index].signature ||
      next.updatedAt !== sessions[index].updatedAt
    ) {
      sessions[index] = next;
      didChange = true;
    }
  } else {
    sessions.push(next);
    didChange = true;
  }

  if (didChange) {
    writeSessions(storage, sessions);
  }

  return next;
}

export function markAppRewardUnlocked(
  base: AppReadingSessionInput
): AppReadingState {
  return upsertAppReadingState(base, { hasUnlockedReward: true });
}

export function storeAppDeepAnalysis(
  base: AppReadingSessionInput,
  deepAnalysis: string
): AppReadingState {
  return upsertAppReadingState(base, {
    hasUnlockedReward: true,
    deepAnalysis,
  });
}

export function clearAppReadingState(key: string): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  const { sessions, changed } = pruneExpired(readSessions(storage));
  const nextSessions = sessions.filter((session) => session.key !== key);
  if (nextSessions.length !== sessions.length || changed) {
    writeSessions(storage, nextSessions);
  }
}
