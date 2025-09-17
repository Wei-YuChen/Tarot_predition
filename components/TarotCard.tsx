'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/lib/types';

interface TarotCardProps {
  card?: TarotCardType;
  isFlipped: boolean;
  isReversed?: boolean;
  onFlip?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function TarotCard({
  card,
  isFlipped,
  isReversed = false,
  onFlip,
  className = '',
  size = 'medium',
}: TarotCardProps) {
  const sizeClasses = {
    small: 'w-16 h-24',
    medium: 'w-24 h-36',
    large: 'w-32 h-48',
  };

  const cardBack = (
    <div
      className={`${sizeClasses[size]} card-back cursor-pointer relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-2 bg-gradient-to-br from-tarot-gold/20 to-tarot-purple/20 rounded border border-tarot-gold/30">
        <div className="absolute inset-2 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-tarot-gold rounded-full relative">
            <div className="absolute inset-1 bg-tarot-gold/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-tarot-gold rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const cardFront = card ? (
    <div
      className={`${sizeClasses[size]} card-frame cursor-pointer relative overflow-hidden bg-white dark:bg-gray-800 ${
        isReversed ? 'reversed-card' : ''
      } ${className}`}
    >
      <div className="absolute inset-2 flex flex-col">
        <div className="text-xs font-semibold text-center text-gray-800 dark:text-gray-200 mb-1 truncate">
          {card.name}
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded border">
          <div className="text-xs text-center p-1 text-gray-600 dark:text-gray-300">
            {card.arcanaType === 'Major' ? (
              <div className="font-bold">{card.number}</div>
            ) : (
              <div>
                <div className="text-[8px]">{card.suit}</div>
                <div className="font-bold">{card.number}</div>
              </div>
            )}
          </div>
        </div>
        {isReversed && (
          <div className="absolute top-0 right-0 text-red-500 text-xs">⤵</div>
        )}
      </div>
    </div>
  ) : (
    cardBack
  );

  const variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <motion.div
      className="relative preserve-3d cursor-pointer"
      initial={false}
      animate={isFlipped ? 'front' : 'back'}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onClick={onFlip}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: 'preserve-3d' }}
      role="button"
      tabIndex={0}
      aria-label={
        isFlipped
          ? `${card?.name || 'Card'} - ${isReversed ? 'Reversed' : 'Upright'}`
          : 'Hidden tarot card - click to reveal'
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip?.();
        }
      }}
    >
      <div
        className={`absolute inset-0 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
      >
        {cardFront}
      </div>
      <div
        className={`absolute inset-0 ${!isFlipped ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: 'rotateY(180deg)' }}
      >
        {cardBack}
      </div>
    </motion.div>
  );
}
