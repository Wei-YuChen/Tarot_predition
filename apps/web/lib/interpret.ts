import { TarotCard, CardDraw, Reading } from './types';

export function interpretCard(
  card: TarotCard,
  isReversed: boolean = false
): string {
  const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
  const orientation = isReversed ? 'Reversed' : 'Upright';

  return `${card.name} (${orientation}): ${meaning}`;
}

export function generateSpreadInterpretation(reading: Reading): string {
  const { cards, spread } = reading;

  if (spread.id === 'three-card-past-present-future') {
    return generateThreeCardInterpretation(cards);
  }

  // Default interpretation for other spreads
  return cards
    .map((cardDraw, index) => {
      const position = spread.positions[index];
      return `${position.name}: ${interpretCard(cardDraw.card, cardDraw.isReversed)}`;
    })
    .join('\n\n');
}

function generateThreeCardInterpretation(cards: CardDraw[]): string {
  const pastCard = cards.find((c) => c.position === 'past');
  const presentCard = cards.find((c) => c.position === 'present');
  const futureCard = cards.find((c) => c.position === 'future');

  if (!pastCard || !presentCard || !futureCard) {
    return 'Unable to generate interpretation - incomplete reading.';
  }

  const pastInterpretation = interpretCard(pastCard.card, pastCard.isReversed);
  const presentInterpretation = interpretCard(
    presentCard.card,
    presentCard.isReversed
  );
  const futureInterpretation = interpretCard(
    futureCard.card,
    futureCard.isReversed
  );

  const overallTheme = generateOverallTheme(cards);

  return `Your Past: ${pastInterpretation}

Your Present: ${presentInterpretation}

Your Future: ${futureInterpretation}

Overall Theme: ${overallTheme}`;
}

function generateOverallTheme(cards: CardDraw[]): string {
  const majorArcanaCount = cards.filter(
    (c) => c.card.arcanaType === 'Major'
  ).length;
  const reversedCount = cards.filter((c) => c.isReversed).length;

  let theme = '';

  if (majorArcanaCount === 3) {
    theme +=
      'This reading is dominated by Major Arcana cards, indicating powerful spiritual forces and significant life events are at play. ';
  } else if (majorArcanaCount === 2) {
    theme +=
      'With two Major Arcana cards, this reading suggests important life lessons and spiritual growth opportunities. ';
  } else if (majorArcanaCount === 1) {
    theme +=
      'One Major Arcana card suggests a key spiritual lesson or significant event influences this situation. ';
  } else {
    theme +=
      'The Minor Arcana cards suggest this reading focuses on everyday matters and practical concerns. ';
  }

  if (reversedCount === 3) {
    theme +=
      'All cards appearing reversed suggests a need for inner reflection and internal processing of these energies.';
  } else if (reversedCount === 2) {
    theme +=
      'Multiple reversed cards indicate some internal blockages or the need to look within for answers.';
  } else if (reversedCount === 1) {
    theme +=
      'One reversed card suggests a specific area where inner work or a different perspective may be needed.';
  } else {
    theme +=
      'All upright cards indicate clear, direct energy and external manifestation of these influences.';
  }

  return theme;
}
