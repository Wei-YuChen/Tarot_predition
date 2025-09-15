'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TarotCard } from '@/components/TarotCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ShareButton } from '@/components/ShareButton'
import { getLatestReading } from '@/lib/storage'
import { getCardById } from '@/lib/cards'
import { PAST_PRESENT_FUTURE } from '@/lib/spreads'
import { buildSpreadSummary, interpretCard } from '@/lib/interpret'
import { Reading } from '@/lib/types'

export default function ResultPage() {
  const [reading, setReading] = useState<Reading | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const latestReading = getLatestReading()
    setReading(latestReading)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔮</div>
          <div className="text-xl">Loading your reading...</div>
        </div>
      </div>
    )
  }

  if (!reading) {
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
            <div className="text-6xl mb-6">🃏</div>
            <h2 className="text-3xl font-bold mb-4">No Reading Found</h2>
            <p className="text-slate-300 mb-6">
              You haven't drawn any cards yet. Start your mystical journey by drawing your first reading.
            </p>
            <Link href="/draw" className="inline-block mystic-button">
              Draw Your Cards
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const readingDate = new Date(reading.timestamp)
  const spreadSummary = buildSpreadSummary(reading)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-mystic-400 to-purple-400 bg-clip-text text-transparent">
          Mystic Tarot
        </Link>
        <div className="flex items-center space-x-4">
          <ShareButton />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Your Reading</h1>
            <p className="text-slate-300">
              Reading from {readingDate.toLocaleDateString()} at {readingDate.toLocaleTimeString()}
            </p>
          </div>

          {/* Cards Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {PAST_PRESENT_FUTURE.map((position) => {
              const drawnCard = reading.cards.find(card => card.position === position.id)
              const card = drawnCard ? getCardById(drawnCard.cardId) : undefined
              
              if (!card || !drawnCard) return null

              return (
                <motion.div
                  key={position.id}
                  className="spread-position"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: position.id === 'past' ? 0 : position.id === 'present' ? 0.2 : 0.4 }}
                >
                  <div className="spread-position-label mb-4">
                    {position.name}
                  </div>
                  <TarotCard
                    card={card}
                    isRevealed={true}
                    isReversed={drawnCard.reversed}
                    onClick={() => {}}
                    position={position.id}
                    disabled={true}
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      {card.name}
                      {drawnCard.reversed && <span className="text-red-400 ml-2">(Reversed)</span>}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {interpretCard(card.id, drawnCard.reversed)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Reading Summary */}
          <motion.div
            className="mystic-card max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Reading Summary</h2>
            <p className="text-lg leading-relaxed text-center">
              {spreadSummary}
            </p>
          </motion.div>

          {/* Individual Card Meanings */}
          <motion.div
            className="space-y-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Detailed Meanings</h2>
            
            {reading.cards.map((drawnCard, index) => {
              const card = getCardById(drawnCard.cardId)
              const position = PAST_PRESENT_FUTURE.find(p => p.id === drawnCard.position)
              
              if (!card || !position) return null

              return (
                <div key={drawnCard.position} className="mystic-card">
                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex-shrink-0">
                      <div className="text-lg font-semibold text-mystic-400 mb-2">
                        {position.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {position.description}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {card.name}
                        {drawnCard.reversed && (
                          <span className="text-red-400 ml-2 text-sm">(Reversed)</span>
                        )}
                      </h3>
                      
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
          </motion.div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <div className="space-x-4">
              <Link href="/draw" className="mystic-button">
                New Reading
              </Link>
              <Link href="/" className="mystic-button-secondary">
                Home
              </Link>
            </div>
            
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              ✨ Remember: Tarot offers guidance and reflection, but your choices shape your destiny. Use these insights to navigate your path with wisdom and intention. ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}