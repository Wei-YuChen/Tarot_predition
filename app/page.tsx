'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { canDrawToday, getRemainingReadingsToday } from '@/lib/storage';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  const canDraw = canDrawToday();
  const remaining = getRemainingReadingsToday();

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

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-tarot-purple via-tarot-gold to-tarot-purple bg-clip-text text-transparent">
            Mystic Tarot
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            Unlock the mysteries of your past, present, and future
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience the ancient art of tarot reading with our mystical
            three-card spread. Let the cards guide you through life's journey
            with wisdom passed down through centuries.
          </p>
        </motion.div>

        {/* Mystical Elements */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-8 mb-12"
        >
          {['🌙', '⭐', '🔮', '✨', '🌟'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-4xl"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">🎴</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              Complete Tarot Deck
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Full 78-card deck with traditional Major and Minor Arcana meanings
            </p>
          </div>

          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              Daily Readings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Up to 3 free readings per day to guide your spiritual journey
            </p>
          </div>

          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              Detailed Interpretations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comprehensive meanings for both upright and reversed card
              positions
            </p>
          </div>
        </motion.div>

        {/* Reading Status */}
        <motion.div variants={itemVariants} className="mb-8">
          {canDraw ? (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg p-4 mb-6">
              <p className="text-green-800 dark:text-green-300">
                ✨ You have <strong>{remaining}</strong> reading
                {remaining !== 1 ? 's' : ''} remaining today
              </p>
            </div>
          ) : (
            <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg p-4 mb-6">
              <p className="text-amber-800 dark:text-amber-300">
                🌅 You've used all your readings for today. Return tomorrow for
                fresh insights!
              </p>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Link href="/draw">
            <motion.button
              className={`mystic-button text-xl px-8 py-4 ${
                !canDraw ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={canDraw ? { scale: 1.05 } : {}}
              whileTap={canDraw ? { scale: 0.95 } : {}}
              disabled={!canDraw}
            >
              Begin Your Reading
            </motion.button>
          </Link>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Click to draw your three mystical cards
          </p>
        </motion.div>

        {/* Ad Banner */}
        <motion.div variants={itemVariants} className="mt-12">
          <AdBanner position="bottom" />
        </motion.div>
      </div>
    </motion.div>
  );
}
