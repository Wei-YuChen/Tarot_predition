'use client'

import { Card, DrawnCard } from '@/lib/types'
import { TarotCard } from './TarotCard'
import { motion } from 'framer-motion'

interface DeckProps {
  cards: Card[]
  onCardClick?: (card: Card) => void
  isShuffling?: boolean
}

export function Deck({ cards, onCardClick, isShuffling = false }: DeckProps) {
  const displayCards = cards.slice(0, 3) // Show only first 3 cards for preview

  return (
    <motion.div
      className="relative inline-block"
      animate={isShuffling ? { rotateY: 360 } : {}}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="relative">
        {/* Deck stack effect */}
        <div className="absolute inset-0 bg-slate-700 rounded-lg transform translate-x-2 translate-y-2 opacity-30"></div>
        <div className="absolute inset-0 bg-slate-600 rounded-lg transform translate-x-1 translate-y-1 opacity-50"></div>
        
        {/* Top card */}
        <TarotCard
          isRevealed={false}
          onClick={() => {}}
          disabled={isShuffling}
        />
      </div>
      
      <div className="text-center mt-4 text-sm text-slate-400">
        {cards.length} cards remaining
      </div>
    </motion.div>
  )
}