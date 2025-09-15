'use client'

import { Reading } from '@/lib/types'
import { getCardById } from '@/lib/cards'
import { buildSpreadSummary, interpretCard } from '@/lib/interpret'
import { PAST_PRESENT_FUTURE } from '@/lib/spreads'

interface InterpretationProps {
  reading: Reading
}

export function Interpretation({ reading }: InterpretationProps) {
  const spreadSummary = buildSpreadSummary(reading)
  const readingDate = new Date(reading.timestamp)

  return (
    <div className="space-y-8">
      {/* Reading Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your Reading</h2>
        <p className="text-slate-400">
          {readingDate.toLocaleDateString()} at {readingDate.toLocaleTimeString()}
        </p>
      </div>

      {/* Overall Summary */}
      <div className="mystic-card">
        <h3 className="text-xl font-semibold mb-4 text-center">Reading Summary</h3>
        <p className="text-lg leading-relaxed text-center">
          {spreadSummary}
        </p>
      </div>

      {/* Individual Card Interpretations */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Card Meanings</h3>
        
        {reading.cards.map((drawnCard) => {
          const card = getCardById(drawnCard.cardId)
          const position = PAST_PRESENT_FUTURE.find(p => p.id === drawnCard.position)
          
          if (!card || !position) return null

          return (
            <div key={drawnCard.position} className="mystic-card">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 min-w-[120px]">
                  <div className="text-lg font-semibold text-mystic-400 mb-1">
                    {position.name}
                  </div>
                  <div className="text-sm text-slate-400">
                    {position.description}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2">
                    {card.name}
                    {drawnCard.reversed && (
                      <span className="text-red-400 ml-2 text-sm">(Reversed)</span>
                    )}
                  </h4>
                  
                  <div className="mb-3">
                    <span className="text-sm text-mystic-300 bg-mystic-900/30 px-2 py-1 rounded">
                      {card.arcanaType} Arcana
                      {card.suit && ` • ${card.suit}`}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed">
                    {interpretCard(card.id, drawnCard.reversed)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Guidance Note */}
      <div className="text-center text-sm text-slate-400 max-w-2xl mx-auto border-t border-slate-700/50 pt-6">
        ✨ Remember: Tarot offers guidance and reflection, but your choices shape your destiny. 
        Use these insights to navigate your path with wisdom and intention. ✨
      </div>
    </div>
  )
}