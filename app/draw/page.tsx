'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CardDraw, Reading } from '@/lib/types';
import {
  canDrawToday,
  saveReading,
  getRemainingReadingsToday,
} from '@/lib/storage';
import { getDefaultSpread } from '@/lib/spreads';
import Deck from '@/components/Deck';
import Link from 'next/link';

export default function DrawPage() {
  const router = useRouter();
  const [drawnCards, setDrawnCards] = useState<CardDraw[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const canDraw = canDrawToday();
  const remaining = getRemainingReadingsToday();

  const handleCardsDrawn = useCallback((cards: CardDraw[]) => {
    setDrawnCards(cards);
  }, []);

  const handleViewReading = useCallback(async () => {
    if (drawnCards.length !== 3) return;

    setIsProcessing(true);

    try {
      const reading: Reading = {
        id: Date.now().toString(),
        timestamp: new Date(),
        spread: getDefaultSpread(),
        cards: drawnCards,
      };

      saveReading(reading);
      router.push('/result');
    } catch (error) {
      console.error('Error saving reading:', error);
      alert('There was an error saving your reading. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [drawnCards, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  if (!canDraw) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="card-frame p-8 mb-8"
          >
            <div className="text-6xl mb-4">🌅</div>
            <h1 className="text-3xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
              Daily Limit Reached
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              You've used all 3 of your daily readings. The mystical energies
              need time to recharge.
            </p>
            <p className="text-gray-500 dark:text-gray-500 mb-8">
              Return tomorrow at dawn for fresh insights from the cards.
            </p>
            <Link href="/">
              <motion.button
                className="mystic-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
            Draw Your Cards
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Three-Card Spread: Past, Present, Future
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            You have <strong>{remaining}</strong> reading
            {remaining !== 1 ? 's' : ''} remaining today
          </p>
        </motion.div>

        {/* Instructions */}
        {drawnCards.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="card-frame p-6 mb-8 text-center"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 text-gray-800 dark:text-gray-200">
              How to Draw Your Cards
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Step 1: Shuffle
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click "Shuffle Deck" to randomize the mystical energies and
                  prepare the cards for your reading.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Step 2: Draw
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click "Draw 3 Cards" to select your cards. Each card will be
                  assigned to Past, Present, or Future.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Deck Component */}
        <motion.div variants={itemVariants} className="mb-8">
          <Deck onCardsDrawn={handleCardsDrawn} disabled={isProcessing} />
        </motion.div>

        {/* Action Button */}
        {drawnCards.length === 3 && (
          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              onClick={handleViewReading}
              disabled={isProcessing}
              className="mystic-button text-xl px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isProcessing ? { scale: 1.05 } : {}}
              whileTap={!isProcessing ? { scale: 0.95 } : {}}
            >
              {isProcessing ? 'Processing...' : 'View Your Interpretation'}
            </motion.button>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Your cards have been drawn. Click to see your detailed reading.
            </p>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link href="/">
            <motion.button
              className="text-gray-600 dark:text-gray-400 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors underline"
              whileHover={{ scale: 1.05 }}
            >
              ← Return Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
