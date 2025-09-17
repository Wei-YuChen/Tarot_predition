/**
 * Constants for Deep Reading output controller
 * Defines locale-specific conclusion prefixes and character/word bounds
 */

// Conclusion prefixes for different locales
export const CONCLUSION_PREFIXES = {
  // CJK locales use the same conclusion prefix
  zh: '綜合結論：',
  tw: '綜合結論：',
  ja: '綜合結論：',
  ko: '綜合結論：',

  // Non-CJK locales have specific prefixes
  en: 'Overall conclusion:',
  vi: 'Kết luận tổng quan:',
  th: 'สรุปภาพรวม:',
  id: 'Kesimpulan keseluruhan:',
  ms: 'Kesimpulan keseluruhan:',
} as const;

// Character bounds for CJK locales
export const CJK_BOUNDS = {
  minChars: 300,
  maxChars: 400,
} as const;

// Word bounds for non-CJK locales
export const NON_CJK_BOUNDS = {
  minWords: 120,
  maxWords: 170,
} as const;

// CJK locale identifiers
export const CJK_LOCALES = ['zh', 'tw', 'ja', 'ko'] as const;

export type SupportedLocale = keyof typeof CONCLUSION_PREFIXES;
export type CJKLocale = (typeof CJK_LOCALES)[number];
