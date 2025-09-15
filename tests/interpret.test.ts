import { describe, it, expect } from 'vitest'
import { interpretCard, buildSpreadSummary } from '@/lib/interpret'
import { Reading } from '@/lib/types'

describe('Interpret Functions', () => {
  describe('interpretCard', () => {
    it('should return upright meaning when not reversed', () => {
      const result = interpretCard('fool', false)
      expect(result).toBe('New beginnings, innocence, spontaneity, and free spirit.')
    })

    it('should return reversed meaning when reversed', () => {
      const result = interpretCard('fool', true)
      expect(result).toBe('Recklessness, taken advantage of, inconsideration, and foolishness.')
    })

    it('should return fallback message for invalid card ID', () => {
      const result = interpretCard('invalid-card', false)
      expect(result).toBe('Card interpretation not available.')
    })
  })

  describe('buildSpreadSummary', () => {
    it('should return a summary for a valid 3-card reading', () => {
      const mockReading: Reading = {
        id: 'test-reading',
        timestamp: Date.now(),
        cards: [
          { position: 'past', cardId: 'fool', reversed: false },
          { position: 'present', cardId: 'magician', reversed: false },
          { position: 'future', cardId: 'star', reversed: false }
        ]
      }

      const summary = buildSpreadSummary(mockReading)
      expect(summary).toBeTruthy()
      expect(summary.length).toBeGreaterThan(0)
      expect(summary).toContain('transformation')
    })

    it('should return error message for incomplete reading', () => {
      const incompleteReading: Reading = {
        id: 'incomplete',
        timestamp: Date.now(),
        cards: [
          { position: 'past', cardId: 'fool', reversed: false }
        ]
      }

      const summary = buildSpreadSummary(incompleteReading)
      expect(summary).toBe('Unable to provide reading summary.')
    })

    it('should return error message for null reading', () => {
      const summary = buildSpreadSummary(null as any)
      expect(summary).toBe('Unable to provide reading summary.')
    })
  })
})