import { TarotCard } from './types';
import { FULL_DECK } from './cards';
import { hashString, seededShuffle, SeededRNG } from './seed';

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: string;
}

// Reading positions
export const POSITIONS = [
  'Past/Present',
  'Obstacle/Lesson',
  'Advice/Direction',
];

export const POSITIONS_ZH = ['过去/现在', '障碍/课题', '建议/方向'];

export const POSITIONS_TW = ['過去/現在', '障礙/課題', '建議/方向'];

export const POSITIONS_JA = ['過去/現在', '障害/レッスン', '助言/方向'];

export const POSITIONS_KO = ['과거/현재', '장애/교훈', '조언/방향'];

export const POSITIONS_VI = [
  'Quá khứ/Hiện tại',
  'Cản trở/Bài học',
  'Lời khuyên/Hướng đi',
];

export const POSITIONS_TH = [
  'อดีต/ปัจจุบัน',
  'อุปสรรค/บทเรียน',
  'คำแนะนำ/ทิศทาง',
];

export const POSITIONS_ID = [
  'Masa Lalu/Sekarang',
  'Hambatan/Pelajaran',
  'Saran/Arah',
];

export const POSITIONS_MS = [
  'Masa Lalu/Sekarang',
  'Halangan/Pelajaran',
  'Nasihat/Arah',
];

/**
 * Build the complete 78-card tarot deck
 */
export function buildDeck(): TarotCard[] {
  return [...FULL_DECK];
}

/**
 * Draw cards based on a question (deterministic)
 */
export function drawCards(question: string, count: number = 3): DrawnCard[] {
  const seed = hashString(question);
  const deck = buildDeck();

  // Shuffle deck with seed
  const shuffledDeck = seededShuffle(deck, seed);

  // Create RNG for orientation
  const rng = new SeededRNG(seed);

  // Draw cards and assign positions
  const drawnCards: DrawnCard[] = [];

  for (let i = 0; i < Math.min(count, shuffledDeck.length); i++) {
    drawnCards.push({
      card: shuffledDeck[i],
      isReversed: rng.nextBoolean(),
      position: POSITIONS[i] || `Position ${i + 1}`,
    });
  }

  return drawnCards;
}

/**
 * Get meaning based on orientation
 */
export function meaningByOrientation(
  card: TarotCard,
  isReversed: boolean
): string {
  return isReversed ? card.reversedMeaning : card.uprightMeaning;
}

/**
 * Get card display name with orientation
 */
export function getCardDisplayName(
  card: TarotCard,
  isReversed: boolean
): string {
  return isReversed ? `${card.name} (Reversed)` : card.name;
}

/**
 * Validate if we have the complete 78-card deck
 */
export function validateDeckCompleteness(): {
  isComplete: boolean;
  count: number;
  missing?: string[];
} {
  const deck = buildDeck();
  const majorArcana = deck.filter((card) => card.arcanaType === 'Major');
  const minorArcana = deck.filter((card) => card.arcanaType === 'Minor');

  const suits = ['Cups', 'Pentacles', 'Swords', 'Wands'];
  const missing: string[] = [];

  // Check Major Arcana (should be 22 cards, 0-21)
  if (majorArcana.length !== 22) {
    missing.push(`Major Arcana: expected 22, got ${majorArcana.length}`);
  }

  // Check Minor Arcana (should be 56 cards, 14 per suit)
  suits.forEach((suit) => {
    const suitCards = minorArcana.filter((card) => card.suit === suit);
    if (suitCards.length !== 14) {
      missing.push(`${suit}: expected 14, got ${suitCards.length}`);
    }
  });

  return {
    isComplete: deck.length === 78 && missing.length === 0,
    count: deck.length,
    missing: missing.length > 0 ? missing : undefined,
  };
}
