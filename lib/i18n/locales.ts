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

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const FALLBACK_CHAIN: Record<Locale, Locale[]> = {
  en: ['en'],
  zh: ['zh', 'en'],
  tw: ['tw', 'zh', 'en'],
  ja: ['ja', 'en'],
  ko: ['ko', 'en'],
  vi: ['vi', 'en'],
  th: ['th', 'en'],
  id: ['id', 'ms', 'en'],
  ms: ['ms', 'en'],
};

export const DEFAULT_LOCALE: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export function getFallbackChain(locale: string): Locale[] {
  if (!isValidLocale(locale)) {
    return FALLBACK_CHAIN[DEFAULT_LOCALE];
  }
  return FALLBACK_CHAIN[locale];
}
