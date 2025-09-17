'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reading } from '@/lib/types';
import { getLatestReading } from '@/lib/storage';
import { generateSpreadInterpretation } from '@/lib/interpret';
import TarotCard from '@/components/TarotCard';
import Interpretation from '@/components/Interpretation';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

export default function ResultPage() {
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latestReading = getLatestReading();
    setReading(latestReading);
    setLoading(false);
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">🔮</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Interpreting your cards...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!reading) {
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
            <div className="text-6xl mb-4">🃏</div>
            <h1 className="text-3xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
              No Reading Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              You haven't drawn any cards yet. Start your mystical journey by
              drawing your first set of cards.
            </p>
            <Link href="/draw">
              <motion.button
                className="mystic-button mr-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Draw Cards
              </motion.button>
            </Link>
            <Link href="/">
              <motion.button
                className="text-gray-600 dark:text-gray-400 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors underline"
                whileHover={{ scale: 1.05 }}
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
            Your Tarot Reading
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {reading.spread.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Read on {reading.timestamp.toLocaleDateString()} at{' '}
            {reading.timestamp.toLocaleTimeString()}
          </p>
        </motion.div>

        {/* Cards Display */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {reading.cards.map((cardDraw, index) => (
              <motion.div
                key={cardDraw.card.id}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 capitalize mb-2">
                    {cardDraw.position}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {
                      reading.spread.positions.find(
                        (p) => p.id === cardDraw.position
                      )?.description
                    }
                  </p>
                </div>

                <div className="flex justify-center mb-4">
                  <TarotCard
                    card={cardDraw.card}
                    isFlipped={true}
                    isReversed={cardDraw.isReversed}
                    size="large"
                  />
                </div>

                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {cardDraw.card.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cardDraw.isReversed ? 'Reversed' : 'Upright'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interpretation */}
        <motion.div variants={itemVariants} className="mb-12">
          <Interpretation reading={reading} />
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
        >
          <ShareButton reading={reading} />
          <Link href="/draw">
            <motion.button
              className="mystic-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Draw New Cards
            </motion.button>
          </Link>
        </motion.div>

        {/* Ad Banner */}
        <motion.div variants={itemVariants} className="mb-8">
          <AdBanner position="bottom" />
        </motion.div>

        {/* Navigation */}
        <motion.div variants={itemVariants} className="text-center">
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
