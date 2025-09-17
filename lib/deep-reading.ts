/**
 * Deep Reading output controller utilities
 * Implements locale-specific length bounds and conclusion preservation
 */

import {
  CONCLUSION_PREFIXES,
  CJK_BOUNDS,
  NON_CJK_BOUNDS,
  CJK_LOCALES,
  type SupportedLocale,
} from './deep-reading-constants';

/**
 * Check if a locale is CJK (Chinese, Japanese, Korean)
 */
export function isCJKLocale(locale: string): boolean {
  return CJK_LOCALES.includes(locale as any);
}

/**
 * Get target bounds for a locale
 */
export function targetBoundsFor(locale: string) {
  if (isCJKLocale(locale)) {
    return {
      type: 'chars' as const,
      minChars: CJK_BOUNDS.minChars,
      maxChars: CJK_BOUNDS.maxChars,
    };
  }
  return {
    type: 'words' as const,
    minWords: NON_CJK_BOUNDS.minWords,
    maxWords: NON_CJK_BOUNDS.maxWords,
  };
}

/**
 * Measure text according to locale requirements
 */
export function measure(
  text: string,
  locale: string
): { chars: number; words: number } {
  const chars = text.length;
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return { chars, words };
}

/**
 * Split text into paragraphs, handling various line endings
 */
function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

/**
 * Join paragraphs with proper spacing
 */
function joinParagraphs(paragraphs: string[]): string {
  return paragraphs.join('\n\n');
}

/**
 * Check if a paragraph starts with the expected conclusion prefix
 */
function isConclusion(paragraph: string, locale: string): boolean {
  const prefix = CONCLUSION_PREFIXES[locale as SupportedLocale];
  if (!prefix) return false;

  return paragraph.trim().startsWith(prefix);
}

/**
 * Ensure the text has a proper final conclusion paragraph
 */
export function ensureFinalConclusion(locale: string, text: string): string {
  const prefix = CONCLUSION_PREFIXES[locale as SupportedLocale];
  if (!prefix) return text;

  const paragraphs = splitIntoParagraphs(text);
  if (paragraphs.length === 0) return text;

  const lastParagraph = paragraphs[paragraphs.length - 1];

  // If last paragraph already starts with conclusion prefix, keep it
  if (isConclusion(lastParagraph, locale)) {
    return text;
  }

  // Check if any paragraph is already a conclusion and move it to the end
  const conclusionIndex = paragraphs.findIndex((p) => isConclusion(p, locale));
  if (conclusionIndex !== -1) {
    const conclusionParagraph = paragraphs.splice(conclusionIndex, 1)[0];
    paragraphs.push(conclusionParagraph);
    return joinParagraphs(paragraphs);
  }

  // If no conclusion exists, create one from the last paragraph
  if (lastParagraph && !lastParagraph.startsWith(prefix)) {
    // Remove any existing conclusion-like text and replace with proper prefix
    const cleanedParagraph = lastParagraph
      .replace(
        /^(overall conclusion|conclusion|综合结论|結論|总结|總結)[：:]\s*/i,
        ''
      )
      .trim();

    paragraphs[paragraphs.length - 1] = `${prefix} ${cleanedParagraph}`;
  }

  return joinParagraphs(paragraphs);
}

/**
 * Gentle text compression - reduces length while preserving structure and conclusion
 */
export function gentleCompress(
  text: string,
  locale: string,
  targetBounds: ReturnType<typeof targetBoundsFor>
): string {
  const paragraphs = splitIntoParagraphs(text);
  if (paragraphs.length === 0) return text;

  // Never modify the conclusion paragraph (last paragraph)
  const conclusionParagraph = paragraphs[paragraphs.length - 1];
  const contentParagraphs = paragraphs.slice(0, -1);

  // Apply compression techniques to content paragraphs only
  const compressedContent = contentParagraphs
    .map((paragraph) => {
      let compressed = paragraph;

      // 1. Trim whitespace and collapse consecutive spaces
      compressed = compressed.replace(/\s+/g, ' ').trim();

      // 2. Remove redundant filler words and phrases
      compressed = compressed
        .replace(/\b(really|very|quite|rather|somewhat|fairly)\s+/gi, '')
        .replace(/\b(you know|I think|I believe|it seems|perhaps)\s*/gi, '')
        .replace(/!{2,}/g, '!')
        .replace(/\.{2,}/g, '...');

      // 3. Shorten parentheticals and asides
      compressed = compressed.replace(/\([^)]+\)/g, '');
      compressed = compressed.replace(/,\s*[^,]+,/g, ',');

      // 4. Abbreviate overly long sentences (keep first main clause)
      const sentences = compressed
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      if (sentences.length > 2) {
        // Keep first sentence and add ellipsis
        const firstSentence = sentences[0].trim();
        if (firstSentence.length > 80) {
          const mainClause = firstSentence.split(/[,;]/)[0];
          compressed = mainClause + '...';
        }
      }

      return compressed.trim();
    })
    .filter((p) => p.length > 0);

  // Reassemble with conclusion
  const result = [...compressedContent, conclusionParagraph];
  return joinParagraphs(result);
}

/**
 * Check if text meets the target bounds
 */
function meetsTargetBounds(
  text: string,
  locale: string,
  bounds: ReturnType<typeof targetBoundsFor>
): boolean {
  const measurement = measure(text, locale);

  if (bounds.type === 'chars') {
    return (
      measurement.chars >= bounds.minChars &&
      measurement.chars <= bounds.maxChars
    );
  } else {
    return (
      measurement.words >= bounds.minWords &&
      measurement.words <= bounds.maxWords
    );
  }
}

/**
 * Check if text exceeds maximum bounds
 */
function exceedsMaxBounds(
  text: string,
  locale: string,
  bounds: ReturnType<typeof targetBoundsFor>
): boolean {
  const measurement = measure(text, locale);

  if (bounds.type === 'chars') {
    return measurement.chars > bounds.maxChars;
  } else {
    return measurement.words > bounds.maxWords;
  }
}

/**
 * Clamp text to target bounds while preserving conclusion
 */
export function clampToBounds(text: string, locale: string): string {
  const bounds = targetBoundsFor(locale);

  // First ensure we have a proper conclusion
  let processedText = ensureFinalConclusion(locale, text);

  // Check if we're already within bounds
  if (meetsTargetBounds(processedText, locale, bounds)) {
    return processedText;
  }

  // If we exceed bounds, apply gentle compression
  if (exceedsMaxBounds(processedText, locale, bounds)) {
    let attempts = 0;
    const maxAttempts = 3;

    while (
      exceedsMaxBounds(processedText, locale, bounds) &&
      attempts < maxAttempts
    ) {
      processedText = gentleCompress(processedText, locale, bounds);
      attempts++;
    }

    // Last resort: trim earlier paragraphs if still over limit
    if (exceedsMaxBounds(processedText, locale, bounds)) {
      const paragraphs = splitIntoParagraphs(processedText);
      if (paragraphs.length > 1) {
        // Keep conclusion and gradually remove earlier paragraphs
        const conclusion = paragraphs[paragraphs.length - 1];
        const trimmedParagraphs = paragraphs.slice(0, -1);

        while (
          trimmedParagraphs.length > 0 &&
          exceedsMaxBounds(
            joinParagraphs([...trimmedParagraphs, conclusion]),
            locale,
            bounds
          )
        ) {
          trimmedParagraphs.pop();
        }

        processedText = joinParagraphs([...trimmedParagraphs, conclusion]);
      }
    }
  }

  return processedText;
}

/**
 * Main pipeline function for formatting deep reading content
 */
export function formatDeepReading(
  locale: string,
  content: string[] | string
): string {
  // Handle both array of paragraphs and string input
  const text = Array.isArray(content) ? content.join('\n\n') : content;

  // Apply the complete pipeline
  return clampToBounds(text, locale);
}
