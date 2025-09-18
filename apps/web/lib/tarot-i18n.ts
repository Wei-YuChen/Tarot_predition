import { Locale, getFallbackChain, DEFAULT_LOCALE } from './i18n/locales';

interface TarotCardLocale {
  name: string;
  meanings: {
    upright: string;
    reversed: string;
  };
}

type TarotDictionary = Record<string, TarotCardLocale>;

// Cache for loaded locales
const loadedLocales = new Map<Locale, TarotDictionary | null>();

/**
 * Load tarot dictionary for a specific locale
 */
async function loadTarotDictionary(
  locale: Locale
): Promise<TarotDictionary | null> {
  if (loadedLocales.has(locale)) {
    return loadedLocales.get(locale) || null;
  }

  try {
    const dictionary = await import(`../locales/${locale}/tarot.json`);
    const data = dictionary.default || dictionary;
    loadedLocales.set(locale, data);
    return data;
  } catch (error) {
    loadedLocales.set(locale, null);
    return null;
  }
}

/**
 * Get card display name with fallback support
 */
export async function cardDisplayName(
  locale: string,
  cardId: string
): Promise<string> {
  const fallbackChain = getFallbackChain(locale);

  for (const fallbackLocale of fallbackChain) {
    const dictionary = await loadTarotDictionary(fallbackLocale);
    if (dictionary && dictionary[cardId]) {
      return dictionary[cardId].name;
    }
  }

  // Ultimate fallback to card ID
  return cardId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Get localized meaning by orientation with fallback support
 */
export async function meaningByOrientationLocalized(
  locale: string,
  cardId: string,
  orientation: 'upright' | 'reversed'
): Promise<string> {
  const fallbackChain = getFallbackChain(locale);

  for (const fallbackLocale of fallbackChain) {
    const dictionary = await loadTarotDictionary(fallbackLocale);
    if (
      dictionary &&
      dictionary[cardId] &&
      dictionary[cardId].meanings[orientation]
    ) {
      return dictionary[cardId].meanings[orientation];
    }
  }

  // Ultimate fallback
  return `${orientation === 'upright' ? 'Upright' : 'Reversed'} meaning not available`;
}

/**
 * Get localized orientation labels
 */
export function getOrientationLabels(locale: string): {
  upright: string;
  reversed: string;
} {
  switch (locale) {
    case 'zh':
      return { upright: '正位', reversed: '逆位' };
    case 'tw':
      return { upright: '正位', reversed: '逆位' };
    case 'ja':
      return { upright: '正位置', reversed: '逆位置' };
    case 'ko':
      return { upright: '정위', reversed: '역위' };
    case 'vi':
      return { upright: 'Thuận chiều', reversed: 'Ngược chiều' };
    case 'th':
      return { upright: 'ตั้งตรง', reversed: 'กลับหัว' };
    case 'id':
      return { upright: 'Tegak', reversed: 'Terbalik' };
    case 'ms':
      return { upright: 'Tegak', reversed: 'Songsang' };
    default:
      return { upright: 'Upright', reversed: 'Reversed' };
  }
}

/**
 * Preload dictionaries for better performance
 */
export async function preloadTarotDictionaries(
  locales: Locale[]
): Promise<void> {
  await Promise.all(locales.map((locale) => loadTarotDictionary(locale)));
}
