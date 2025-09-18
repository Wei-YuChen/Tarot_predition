export interface TarotCard {
  id: string;
  name: string;
  arcanaType: 'Major' | 'Minor';
  suit: 'Cups' | 'Pentacles' | 'Swords' | 'Wands' | null;
  number: number;
  uprightMeaning: string;
  reversedMeaning: string;
  image: string;
}

export interface CardDraw {
  card: TarotCard;
  isReversed: boolean;
  position: 'past' | 'present' | 'future';
}

export interface Spread {
  id: string;
  name: string;
  positions: SpreadPosition[];
}

export interface SpreadPosition {
  id: string;
  name: string;
  description: string;
}

export interface Reading {
  id: string;
  timestamp: Date;
  spread: Spread;
  cards: CardDraw[];
  interpretation?: string;
}

export interface StoredReading {
  id: string;
  timestamp: string;
  spread: Spread;
  cards: CardDraw[];
  interpretation?: string;
}
