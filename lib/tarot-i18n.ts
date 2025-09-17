import {
  SupportedLocale,
  getFallbackChain,
  isValidLocale,
} from './i18n/locales';

export interface TarotCardI18n {
  name: string;
  meanings: {
    upright: string;
    reversed: string;
  };
}

export interface TarotDeckI18n {
  [cardId: string]: TarotCardI18n;
}

// Cache for loaded locale data
const localeCache = new Map<SupportedLocale, TarotDeckI18n>();

/**
 * Load tarot translations for a specific locale
 */
async function loadTarotLocale(
  locale: SupportedLocale
): Promise<TarotDeckI18n | null> {
  if (localeCache.has(locale)) {
    return localeCache.get(locale)!;
  }

  try {
    const data = await import(`../locales/${locale}/tarot.json`);
    const tarotData = data.default || data;
    localeCache.set(locale, tarotData);
    return tarotData;
  } catch (error) {
    console.warn(`Failed to load tarot locale ${locale}:`, error);
    return null;
  }
}

/**
 * Get localized card display name with fallback chain
 */
export async function cardDisplayName(
  locale: string,
  cardId: string
): Promise<string> {
  if (!isValidLocale(locale)) {
    locale = 'en';
  }

  const fallbackChain = getFallbackChain(locale as SupportedLocale);

  for (const fallbackLocale of fallbackChain) {
    const localeData = await loadTarotLocale(fallbackLocale);
    if (localeData && localeData[cardId]?.name) {
      return localeData[cardId].name;
    }
  }

  // Final fallback: return the card ID formatted
  return cardId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get localized meaning by orientation with fallback chain
 */
export async function meaningByOrientationLocalized(
  locale: string,
  cardId: string,
  orientation: 'upright' | 'reversed'
): Promise<string> {
  if (!isValidLocale(locale)) {
    locale = 'en';
  }

  const fallbackChain = getFallbackChain(locale as SupportedLocale);

  for (const fallbackLocale of fallbackChain) {
    const localeData = await loadTarotLocale(fallbackLocale);
    if (localeData && localeData[cardId]?.meanings?.[orientation]) {
      return localeData[cardId].meanings[orientation];
    }
  }

  // Final fallback: return a default message
  return orientation === 'upright' ? 'Upright meaning' : 'Reversed meaning';
}

/**
 * Get localized orientation label
 */
export function getOrientationLabel(
  locale: string,
  orientation: 'upright' | 'reversed'
): string {
  const orientationLabels: Record<
    string,
    { upright: string; reversed: string }
  > = {
    en: { upright: 'Upright', reversed: 'Reversed' },
    zh: { upright: '正位', reversed: '逆位' },
    tw: { upright: '正位', reversed: '逆位' },
    ja: { upright: '正位', reversed: '逆位' },
    ko: { upright: '정위', reversed: '역위' },
    vi: { upright: 'Thuận', reversed: 'Nghịch' },
    th: { upright: 'ตรง', reversed: 'กลับ' },
    id: { upright: 'Tegak', reversed: 'Terbalik' },
    ms: { upright: 'Tegak', reversed: 'Terbalik' },
  };

  return (
    orientationLabels[locale]?.[orientation] ||
    orientationLabels.en[orientation]
  );
}

/**
 * Get parentheses style for locale
 */
export function getOrientationParentheses(locale: string): [string, string] {
  // Chinese and Japanese use full-width parentheses
  if (['zh', 'tw', 'ja'].includes(locale)) {
    return ['（', '）'];
  }
  return ['(', ')'];
}
