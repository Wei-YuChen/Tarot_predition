export interface Card {
  id: string
  name: string
  arcanaType: 'Major' | 'Minor'
  suit?: 'Cups' | 'Wands' | 'Swords' | 'Pentacles'
  number?: number
  uprightMeaning: string
  reversedMeaning: string
  image: string
}

export interface SpreadPosition {
  id: 'past' | 'present' | 'future'
  name: string
  description: string
}

export interface DrawnCard {
  position: 'past' | 'present' | 'future'
  cardId: string
  reversed: boolean
}

export interface Reading {
  id: string
  timestamp: number
  cards: DrawnCard[]
}

export interface DailyStats {
  date: string
  count: number
}