import { Spread, SpreadPosition } from './types';

export const THREE_CARD_SPREAD: Spread = {
  id: 'three-card-past-present-future',
  name: 'Past, Present, Future',
  positions: [
    {
      id: 'past',
      name: 'Past',
      description:
        'Events and influences from your past that affect your current situation',
    },
    {
      id: 'present',
      name: 'Present',
      description:
        'Your current situation and the energies surrounding you now',
    },
    {
      id: 'future',
      name: 'Future',
      description:
        'Potential outcomes and what the future may hold based on current path',
    },
  ],
};

export const AVAILABLE_SPREADS: Spread[] = [THREE_CARD_SPREAD];

export function getSpreadById(id: string): Spread | undefined {
  return AVAILABLE_SPREADS.find((spread) => spread.id === id);
}

export function getDefaultSpread(): Spread {
  return THREE_CARD_SPREAD;
}
