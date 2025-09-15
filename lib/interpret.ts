import { Card, DrawnCard, Reading } from './types'
import { getCardById } from './cards'

export function interpretCard(cardId: string, reversed: boolean): string {
  const card = getCardById(cardId)
  if (!card) return 'Card interpretation not available.'
  
  return reversed ? card.reversedMeaning : card.uprightMeaning
}

export function buildSpreadSummary(reading: Reading): string {
  if (!reading || reading.cards.length !== 3) {
    return 'Unable to provide reading summary.'
  }

  const pastCard = reading.cards.find(c => c.position === 'past')
  const presentCard = reading.cards.find(c => c.position === 'present')
  const futureCard = reading.cards.find(c => c.position === 'future')

  if (!pastCard || !presentCard || !futureCard) {
    return 'Incomplete reading - unable to provide summary.'
  }

  // Simple heuristic based on card types and meanings
  const summaryElements = []

  // Analyze the flow of the reading
  const pastInterpretation = interpretCard(pastCard.cardId, pastCard.reversed)
  const presentInterpretation = interpretCard(presentCard.cardId, presentCard.reversed)
  const futureInterpretation = interpretCard(futureCard.cardId, futureCard.reversed)

  // Determine overall reading tone
  const hasPositiveOutlook = futureInterpretation.toLowerCase().includes('success') ||
    futureInterpretation.toLowerCase().includes('joy') ||
    futureInterpretation.toLowerCase().includes('hope') ||
    futureInterpretation.toLowerCase().includes('growth')

  const hasChallenges = presentInterpretation.toLowerCase().includes('conflict') ||
    presentInterpretation.toLowerCase().includes('struggle') ||
    presentInterpretation.toLowerCase().includes('difficulty')

  // Build contextual summary
  summaryElements.push('Your reading reveals a journey of transformation.')

  if (hasChallenges) {
    summaryElements.push('While the present moment may bring challenges, these experiences are shaping your path forward.')
  } else {
    summaryElements.push('The current energies are supporting your growth and development.')
  }

  if (hasPositiveOutlook) {
    summaryElements.push('The future holds promise and potential for positive change.')
  } else {
    summaryElements.push('The future invites introspection and careful consideration of your choices.')
  }

  summaryElements.push('Remember that the cards offer guidance, but your actions ultimately shape your destiny.')

  return summaryElements.join(' ')
}

export function getCardDescription(card: Card, reversed: boolean): string {
  const orientation = reversed ? 'reversed' : 'upright'
  const meaning = reversed ? card.reversedMeaning : card.uprightMeaning
  
  return `${card.name} (${orientation}): ${meaning}`
}