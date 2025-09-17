'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { canDrawToday, getRemainingReadingsToday } from '@/lib/storage';
import AdBanner from '@/components/AdBanner';

export default function TraditionalChineseHomePage() {
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
            神秘塔羅
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            揭開過去、現在和未來的神秘面紗
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            體驗古老的塔羅牌占卜藝術，透過我們神秘的三張牌陣法。讓牌卡以傳承數世紀的智慧引導您踏上人生旅程。
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
              完整塔羅牌組
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              完整的78張牌組，包含傳統大阿爾卡納和小阿爾卡納牌義
            </p>
          </div>

          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              每日占卜
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              每天可進行3次免費占卜，指引您的心靈旅程
            </p>
          </div>

          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              詳細解讀
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              正位和逆位牌義的全面詳細解釋
            </p>
          </div>
        </motion.div>

        {/* Reading Status */}
        <motion.div variants={itemVariants} className="mb-8">
          {canDraw ? (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg p-4 mb-6">
              <p className="text-green-800 dark:text-green-300">
                ✨ 您今天還有 <strong>{remaining}</strong> 次占卜機會
              </p>
            </div>
          ) : (
            <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg p-4 mb-6">
              <p className="text-amber-800 dark:text-amber-300">
                🌅 您今天的占卜次數已用完。明天再來獲取新的洞察！
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
              開始您的占卜
            </motion.button>
          </Link>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            點擊抽取您的三張神秘塔羅牌
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
