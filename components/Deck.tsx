'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TarotCard as TarotCardType, CardDraw } from '@/lib/types';
import { shuffleDeck, FULL_DECK } from '@/lib/cards';
import TarotCard from './TarotCard';

interface DeckProps {
  onCardsDrawn: (cards: CardDraw[]) => void;
  disabled?: boolean;
}

export default function Deck({ onCardsDrawn, disabled = false }: DeckProps) {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardType[]>(FULL_DECK);
  const [isShuffling, setIsShuffling] = useState(false);
  const [drawnCards, setDrawnCards] = useState<CardDraw[]>([]);
  const [showDrawnCards, setShowDrawnCards] = useState(false);

  const handleShuffle = useCallback(() => {
    if (disabled) return;

    setIsShuffling(true);
    setTimeout(() => {
      setShuffledDeck(shuffleDeck());
      setIsShuffling(false);
    }, 1000);
  }, [disabled]);

  const handleDrawCards = useCallback(() => {
    if (disabled || drawnCards.length > 0) return;

    const cards = shuffledDeck.slice(0, 3);
    const positions: ('past' | 'present' | 'future')[] = [
      'past',
      'present',
      'future',
    ];

    const cardDraws: CardDraw[] = cards.map((card, index) => ({
      card,
      isReversed: Math.random() < 0.5, // 50% chance of reversed
      position: positions[index],
    }));

    setDrawnCards(cardDraws);
    setShowDrawnCards(true);
    onCardsDrawn(cardDraws);
  }, [shuffledDeck, disabled, drawnCards.length, onCardsDrawn]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (showDrawnCards && drawnCards.length > 0) {
    return (
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Your Cards Have Been Drawn
        </h2>
        <div className="flex justify-center gap-8 mb-8">
          {drawnCards.map((cardDraw, index) => (
            <motion.div
              key={cardDraw.card.id}
              variants={cardVariants}
              className="text-center"
            >
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {cardDraw.position}
                </span>
              </div>
              <TarotCard
                card={cardDraw.card}
                isFlipped={true}
                isReversed={cardDraw.isReversed}
                size="large"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800 dark:text-gray-200">
        The Mystic Deck
      </h2>

      {/* Deck Display */}
      <div className="flex justify-center mb-8">
        <motion.div
          className="relative"
          animate={{
            rotateY: isShuffling ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: isShuffling ? Infinity : 0,
          }}
        >
          {/* Stack of cards effect */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-24 h-36 card-back"
              style={{
                transform: `translateX(${i * 2}px) translateY(${i * -2}px)`,
                zIndex: 5 - i,
              }}
            />
          ))}
          <TarotCard
            isFlipped={false}
            size="medium"
            className="relative z-10"
          />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <motion.button
          onClick={handleShuffle}
          disabled={disabled || isShuffling}
          className="mystic-button disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
        </motion.button>

        <motion.button
          onClick={handleDrawCards}
          disabled={disabled || drawnCards.length > 0}
          className="mystic-button disabled:opacity-50 disabled:cursor-not-allowed block mx-auto"
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          Draw 3 Cards
        </motion.button>
      </div>

      {drawnCards.length > 0 && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Cards drawn! They will appear above once the animation completes.
        </p>
      )}
    </div>
  );
}
