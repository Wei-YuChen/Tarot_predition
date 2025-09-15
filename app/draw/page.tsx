'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TarotCard } from '@/components/TarotCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { shuffleDeck } from '@/lib/cards'
import { PAST_PRESENT_FUTURE } from '@/lib/spreads'
import { saveReading, canDrawToday, getTodayCount } from '@/lib/storage'
import { Card, DrawnCard } from '@/lib/types'

export default function DrawPage() {
  const router = useRouter()
  const [deck, setDeck] = useState<Card[]>([])
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealedPositions, setRevealedPositions] = useState<Set<string>>(new Set())
  const [isShuffling, setIsShuffling] = useState(false)
  const [canDraw, setCanDraw] = useState(true)
  const [todayCount, setTodayCount] = useState(0)
  const [allCardsRevealed, setAllCardsRevealed] = useState(false)

  useEffect(() => {
    // Initialize deck and check daily limit
    setDeck(shuffleDeck())
    setCanDraw(canDrawToday())
    setTodayCount(getTodayCount())
  }, [])

  useEffect(() => {
    // Check if all three cards are revealed
    if (revealedPositions.size === 3 && drawnCards.length === 3) {
      setAllCardsRevealed(true)
    }
  }, [revealedPositions, drawnCards])

  const handleShuffle = () => {
    if (drawnCards.length > 0) return // Don't shuffle if cards are already drawn
    
    setIsShuffling(true)
    setTimeout(() => {
      setDeck(shuffleDeck())
      setIsShuffling(false)
    }, 1000)
  }

  const handleDrawCards = () => {
    if (!canDraw || drawnCards.length > 0 || deck.length < 3) return

    const positions: ('past' | 'present' | 'future')[] = ['past', 'present', 'future']
    const newDrawnCards: DrawnCard[] = []

    positions.forEach((position, index) => {
      const card = deck[index]
      const isReversed = Math.random() < 0.5 // 50% chance of being reversed
      
      newDrawnCards.push({
        position,
        cardId: card.id,
        reversed: isReversed
      })
    })

    setDrawnCards(newDrawnCards)
  }

  const handleCardClick = (position: 'past' | 'present' | 'future') => {
    if (drawnCards.length === 0) return // Cards must be drawn first
    
    setRevealedPositions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(position)) {
        newSet.delete(position)
      } else {
        newSet.add(position)
      }
      return newSet
    })
  }

  const handleViewInterpretation = () => {
    if (drawnCards.length !== 3 || revealedPositions.size !== 3) return

    // Save the reading
    const reading = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      cards: drawnCards
    }

    saveReading(reading)
    router.push('/result')
  }

  const getCardForPosition = (position: 'past' | 'present' | 'future') => {
    const drawnCard = drawnCards.find(card => card.position === position)
    if (!drawnCard) return undefined
    
    return deck.find(card => card.id === drawnCard.cardId)
  }

  const isCardReversed = (position: 'past' | 'present' | 'future') => {
    const drawnCard = drawnCards.find(card => card.position === position)
    return drawnCard?.reversed || false
  }

  if (!canDraw) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-mystic-400 to-purple-400 bg-clip-text text-transparent">
            Mystic Tarot
          </Link>
          <ThemeToggle />
        </header>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-6">🌙</div>
            <h2 className="text-3xl font-bold mb-4">Daily Limit Reached</h2>
            <p className="text-slate-300 mb-6">
              You have drawn {todayCount} readings today. The universe suggests patience - return tomorrow for fresh insights.
            </p>
            <div className="space-y-4">
              <Link href="/result" className="inline-block mystic-button">
                View Latest Reading
              </Link>
              <div>
                <Link href="/" className="mystic-button-secondary">
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-mystic-400 to-purple-400 bg-clip-text text-transparent">
          Mystic Tarot
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Draw Your Cards</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Focus on your question and let the universe guide you. Draw three cards to explore your past, present, and future.
            </p>
          </div>

          {/* Deck and Controls */}
          {drawnCards.length === 0 && (
            <div className="text-center mb-12">
              <motion.div 
                className={`deck-container inline-block mb-8 ${isShuffling ? 'shuffled' : ''}`}
                animate={isShuffling ? { rotateY: 360 } : {}}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                <div className="relative">
                  {/* Deck stack effect */}
                  <div className="absolute inset-0 bg-slate-700 rounded-lg transform translate-x-1 translate-y-1"></div>
                  <div className="absolute inset-0 bg-slate-600 rounded-lg transform translate-x-0.5 translate-y-0.5"></div>
                  <TarotCard
                    isRevealed={false}
                    onClick={() => {}}
                    disabled={true}
                  />
                </div>
              </motion.div>

              <div className="space-x-4">
                <button
                  onClick={handleShuffle}
                  disabled={isShuffling}
                  className="mystic-button-secondary"
                >
                  {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
                </button>
                <button
                  onClick={handleDrawCards}
                  disabled={isShuffling || deck.length < 3}
                  className="mystic-button"
                >
                  Draw 3 Cards
                </button>
              </div>
            </div>
          )}

          {/* Spread Layout */}
          {drawnCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {PAST_PRESENT_FUTURE.map((position) => (
                <motion.div
                  key={position.id}
                  className="spread-position"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: position.id === 'past' ? 0 : position.id === 'present' ? 0.2 : 0.4 }}
                >
                  <div className="spread-position-label">
                    {position.name}
                  </div>
                  <TarotCard
                    card={getCardForPosition(position.id)}
                    isRevealed={revealedPositions.has(position.id)}
                    isReversed={isCardReversed(position.id)}
                    onClick={() => handleCardClick(position.id)}
                    position={position.id}
                  />
                  <p className="text-sm text-center text-slate-400 max-w-48">
                    {position.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Instructions or Next Step */}
          {drawnCards.length > 0 && (
            <div className="text-center">
              {revealedPositions.size < 3 ? (
                <p className="text-slate-300 mb-4">
                  Click on each card to reveal its meaning ({revealedPositions.size}/3 revealed)
                </p>
              ) : (
                <div>
                  <p className="text-slate-300 mb-6">
                    All cards revealed! Ready to discover your interpretation?
                  </p>
                  <button
                    onClick={handleViewInterpretation}
                    className="mystic-button text-lg px-8 py-4"
                    disabled={!allCardsRevealed}
                  >
                    View Interpretation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Daily Count Display */}
          <div className="text-center text-sm text-slate-400 mt-8">
            Readings today: {todayCount}/3
          </div>
        </div>
      </div>
    </div>
  )
}