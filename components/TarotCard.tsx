'use client'

import { Card } from '@/lib/types'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface TarotCardProps {
  card?: Card
  isRevealed: boolean
  isReversed?: boolean
  onClick: () => void
  position?: 'past' | 'present' | 'future'
  disabled?: boolean
}

export function TarotCard({ 
  card, 
  isRevealed, 
  isReversed = false, 
  onClick, 
  position,
  disabled = false 
}: TarotCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }

  const cardVariants = {
    hidden: { rotateY: 0 },
    revealed: { rotateY: 180 }
  }

  const reducedMotionVariants = {
    hidden: { opacity: 0.8 },
    revealed: { opacity: 1 }
  }

  const ariaLabel = card 
    ? `${isRevealed ? 'Flip' : 'Reveal'} ${card.name}${isReversed ? ' (reversed)' : ''}`
    : 'Card back'

  return (
    <div className="card-container">
      <motion.div
        className={`card-flip ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        data-flipped={isRevealed}
        variants={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? reducedMotionVariants : cardVariants}
        animate={isRevealed ? 'revealed' : 'hidden'}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        {/* Card Back */}
        <div className="card-face-back">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔮</div>
              <div className="text-xs text-mystic-300 font-medium">
                {position && position.charAt(0).toUpperCase() + position.slice(1)}
              </div>
            </div>
          </div>
          
          {/* Mystical border pattern */}
          <div className="absolute inset-2 border-2 border-mystic-400/30 rounded-md">
            <div className="absolute inset-2 border border-mystic-300/20 rounded-sm"></div>
          </div>
        </div>

        {/* Card Front */}
        <div className={`card-face-front ${isReversed ? 'card-reversed' : ''}`}>
          {card ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-2">
              {/* Card image placeholder */}
              <div className="flex-1 flex items-center justify-center mb-2">
                <div className="w-16 h-16 bg-gradient-to-br from-mystic-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {card.arcanaType === 'Major' ? '✨' : card.suit?.charAt(0) || '?'}
                </div>
              </div>
              
              {/* Card name */}
              <div className="text-xs text-center font-semibold text-slate-200 dark:text-slate-800 leading-tight">
                {card.name}
              </div>
              
              {/* Arcana type indicator */}
              <div className="text-xs text-mystic-400 dark:text-mystic-600 mt-1">
                {card.arcanaType}
                {card.suit && ` • ${card.suit}`}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-slate-400">Empty</div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}