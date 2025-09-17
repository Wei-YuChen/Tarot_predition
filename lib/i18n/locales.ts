// Supported locales and fallback chain configuration
export const SUPPORTED_LOCALES = [
  'en',
  'zh',
  'tw',
  'ja',
  'ko',
  'vi',
  'th',
  'id',
  'ms',
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Fallback chain: if a translation is missing, try the next locale in the chain
export const FALLBACK_CHAIN: Record<SupportedLocale, SupportedLocale[]> = {
  en: [], // English is the base, no fallback
  zh: ['en'], // Simplified Chinese -> English
  tw: ['zh', 'en'], // Traditional Chinese -> Simplified Chinese -> English
  ja: ['en'], // Japanese -> English
  ko: ['en'], // Korean -> English
  vi: ['en'], // Vietnamese -> English
  th: ['en'], // Thai -> English
  id: ['ms', 'en'], // Indonesian -> Malay -> English
  ms: ['id', 'en'], // Malay -> Indonesian -> English
};

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function getFallbackChain(locale: SupportedLocale): SupportedLocale[] {
  return [locale, ...FALLBACK_CHAIN[locale]];
}
