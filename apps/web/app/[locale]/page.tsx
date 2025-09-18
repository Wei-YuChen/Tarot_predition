'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getHomeTexts, type HomeTexts } from '@/lib/localization';

interface LocalePageProps {
  params: { locale: string };
}

export default function LocalePage({ params }: LocalePageProps) {
  const { locale } = params;
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  const t = getHomeTexts(locale);

  const handleStartReading = () => {
    setShowQuestionDialog(true);
  };

  const handleDrawCards = () => {
    if (question.trim()) {
      const encodedQuestion = encodeURIComponent(question.trim());
      router.push(`/${locale}/reading?q=${encodedQuestion}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-tarot-purple via-tarot-gold to-tarot-purple bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            {t.subtitle}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Mystical Elements */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-8 mb-12"
        >
          <div className="text-4xl opacity-70">🌙</div>
          <div className="text-6xl">🔮</div>
          <div className="text-4xl opacity-70">⭐</div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">🎴</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              {t.features.deck.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.features.deck.desc}
            </p>
          </div>

          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              {t.features.daily.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.features.daily.desc}
            </p>
          </div>

          <div className="card-frame p-6 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              {t.features.detailed.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.features.detailed.desc}
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.button
            onClick={handleStartReading}
            className="mystic-button text-xl px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔮 {t.drawCards}
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p className="leading-relaxed">{t.disclaimer}</p>
        </motion.div>
      </div>

      {/* Question Dialog Modal */}
      {showQuestionDialog && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-tarot-cosmic rounded-lg p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-2xl font-serif font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
              {t.questionTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
              {t.questionHelper}
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.questionPlaceholder}
              className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-tarot-midnight text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tarot-purple"
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowQuestionDialog(false)}
                className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                {locale === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleDrawCards}
                disabled={!question.trim()}
                className="flex-1 mystic-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.drawCards}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Force dynamic rendering for this page since it uses useRouter
export const dynamic = 'force-dynamic';
