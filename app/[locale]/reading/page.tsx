'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  drawCards,
  DrawnCard,
  meaningByOrientation,
  getCardDisplayName,
  POSITIONS,
  POSITIONS_ZH,
} from '@/lib/tarot';

interface ReadingPageProps {
  params: { locale: string };
}

const texts = {
  en: {
    title: 'Your Tarot Reading',
    noQuestion: 'No question found. Please go back and ask a question.',
    backToHome: 'Back to Home',
    deepAnalysis: 'Get Deep Analysis',
    loadingAnalysis: 'Analyzing your cards...',
    cardPosition: 'Position',
    cardMeaning: 'Meaning',
    orientation: {
      upright: 'Upright',
      reversed: 'Reversed',
    },
    positions: POSITIONS,
    deepAnalysisTitle: 'Deep Analysis',
    errorAnalysis:
      'Sorry, there was an error getting your deep analysis. Please try again.',
    retryAnalysis: 'Try Again',
  },
  zh: {
    title: '你的塔罗牌阅读',
    noQuestion: '未找到问题。请返回并提出问题。',
    backToHome: '返回首页',
    deepAnalysis: '获取深度分析',
    loadingAnalysis: '正在分析你的牌卡...',
    cardPosition: '位置',
    cardMeaning: '含义',
    orientation: {
      upright: '正位',
      reversed: '逆位',
    },
    positions: POSITIONS_ZH,
    deepAnalysisTitle: '深度分析',
    errorAnalysis: '抱歉，获取深度分析时出现错误。请重试。',
    retryAnalysis: '重试',
  },
};

export default function ReadingPage({ params }: ReadingPageProps) {
  const { locale } = params;
  const searchParams = useSearchParams();
  const question = searchParams.get('q');
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [deepAnalysis, setDeepAnalysis] = useState<string>('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState(false);

  const t = texts[locale as keyof typeof texts] || texts.en;

  useEffect(() => {
    if (question) {
      const drawnCards = drawCards(question, 3);
      setCards(drawnCards);
    }
  }, [question]);

  const handleDeepAnalysis = async () => {
    if (!question || cards.length === 0) return;

    setIsLoadingAnalysis(true);
    setAnalysisError(false);

    try {
      const response = await fetch('/api/deep-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locale,
          question,
          cards: cards.map(({ card, isReversed, position }) => ({
            name: card.name,
            meaning: meaningByOrientation(card, isReversed),
            isReversed,
            position,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get analysis');
      }

      const data = await response.json();
      setDeepAnalysis(data.analysis);
    } catch (error) {
      console.error('Deep analysis error:', error);
      setAnalysisError(true);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

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

  if (!question) {
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
              {t.noQuestion}
            </h1>
            <a href={`/${locale}`} className="mystic-button inline-block">
              {t.backToHome}
            </a>
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
            {t.title}
          </h1>
          <div className="bg-tarot-purple/10 dark:bg-tarot-purple/20 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              <span className="text-tarot-purple dark:text-tarot-gold">"</span>
              {decodeURIComponent(question)}
              <span className="text-tarot-purple dark:text-tarot-gold">"</span>
            </p>
          </div>
        </motion.div>

        {/* Cards Display */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {cards.map((drawnCard, index) => (
            <motion.div
              key={drawnCard.card.id}
              className="card-frame p-6"
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-sm font-medium text-tarot-purple dark:text-tarot-gold mb-2">
                  {t.positions[index]}
                </h3>
                <div className="w-32 h-48 bg-gradient-to-br from-tarot-purple to-tarot-gold rounded-lg flex items-center justify-center mx-auto mb-4 text-white text-4xl">
                  🃏
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {getCardDisplayName(drawnCard.card, drawnCard.isReversed)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {drawnCard.isReversed
                    ? t.orientation.reversed
                    : t.orientation.upright}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {t.cardMeaning}:
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {meaningByOrientation(drawnCard.card, drawnCard.isReversed)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Deep Analysis Section */}
        <motion.div variants={itemVariants} className="card-frame p-6 mb-8">
          <div className="text-center">
            {!deepAnalysis && !isLoadingAnalysis && (
              <button
                onClick={handleDeepAnalysis}
                disabled={isLoadingAnalysis}
                className="mystic-button mb-4"
              >
                ✨ {t.deepAnalysis}
              </button>
            )}

            {isLoadingAnalysis && (
              <div className="text-center py-8">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  🔮
                </motion.div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t.loadingAnalysis}
                </p>
              </div>
            )}

            {analysisError && (
              <div className="text-center py-4">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  {t.errorAnalysis}
                </p>
                <button onClick={handleDeepAnalysis} className="mystic-button">
                  {t.retryAnalysis}
                </button>
              </div>
            )}

            {deepAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
                  {t.deepAnalysisTitle}
                </h3>
                <div className="prose prose-lg dark:prose-invert max-w-none text-left">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {deepAnalysis}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={itemVariants} className="text-center">
          <a
            href={`/${locale}`}
            className="text-gray-600 dark:text-gray-400 hover:text-tarot-purple dark:hover:text-tarot-gold transition-colors underline"
          >
            ← {t.backToHome}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
