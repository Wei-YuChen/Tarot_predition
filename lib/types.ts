export interface Card {
  id: string;
  name: string;
  nameTranslations?: Record<string, string>;
  suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
  number?: number;
  type: 'major' | 'minor';
  meaning: string;
  meaningReversed: string;
  imagePath: string;
}

export interface SpreadPosition {
  id: string;
  name: string;
  nameTranslations?: Record<string, string>;
  description: string;
  descriptionTranslations?: Record<string, string>;
}

export interface DrawnCard {
  card: Card;
  position: SpreadPosition;
  isReversed: boolean;
}

export interface Reading {
  id: string;
  timestamp: Date;
  question?: string;
  spread: DrawnCard[];
  aiInterpretation?: string;
}

export interface DailyLimits {
  date: string;
  drawCount: number;
  maxDraws: number;
}