'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface LocalePageProps {
  params: { locale: string };
}

const texts = {
  en: {
    title: 'Mystic Tarot',
    subtitle: 'Unlock the mysteries of your past, present, and future',
    description:
      "Experience the ancient art of tarot reading with our mystical three-card spread. Let the cards guide you through life's journey with wisdom passed down through centuries.",
    questionTitle: 'Ask Your Question',
    questionPlaceholder: 'What guidance do you seek from the cards today?',
    questionHelper:
      "Think of a specific situation, decision, or area of your life you'd like insight into.",
    drawCards: 'Draw My Cards',
    disclaimer:
      'Our tarot readings are designed for entertainment and self-reflection purposes. While the cards can offer insights and guidance, remember that you hold the power to shape your own destiny.',
    features: {
      deck: {
        title: 'Complete Tarot Deck',
        desc: 'Full 78-card deck with traditional Major and Minor Arcana meanings',
      },
      daily: {
        title: 'Daily Readings',
        desc: 'Unlimited readings to guide your spiritual journey',
      },
      detailed: {
        title: 'Detailed Interpretations',
        desc: 'Comprehensive meanings for both upright and reversed card positions',
      },
    },
  },
  zh: {
    title: '神秘塔罗',
    subtitle: '揭开你过去、现在和未来的神秘面纱',
    description:
      '体验古老的塔罗牌占卜艺术，用我们神秘的三牌展开。让牌卡以世代传承的智慧指引你的人生旅程。',
    questionTitle: '提出你的问题',
    questionPlaceholder: '今天你想从牌卡中寻求什么指引？',
    questionHelper: '想想你希望获得洞察的具体情况、决定或生活领域。',
    drawCards: '抽取我的牌卡',
    disclaimer:
      '我们的塔罗牌阅读是为娱乐和自我反思而设计的。虽然牌卡可以提供洞察和指导，但请记住，你拥有塑造自己命运的力量。',
    features: {
      deck: {
        title: '完整塔罗牌组',
        desc: '完整的78张牌，包含传统的大阿尔卡纳和小阿尔卡纳含义',
      },
      daily: {
        title: '每日阅读',
        desc: '无限次阅读，指引你的精神旅程',
      },
      detailed: {
        title: '详细解释',
        desc: '正位和逆位牌卡的全面含义',
      },
    },
  },
  tw: {
    title: '神秘塔羅',
    subtitle: '揭開你過去、現在和未來的神秘面紗',
    description:
      '體驗古老的塔羅牌占卜藝術，用我們神秘的三牌展開。讓牌卡以世代傳承的智慧指引你的人生旅程。',
    questionTitle: '提出你的問題',
    questionPlaceholder: '今天你想從牌卡中尋求什麼指引？',
    questionHelper: '想想你希望獲得洞察的具體情況、決定或生活領域。',
    drawCards: '抽取我的牌卡',
    disclaimer:
      '我們的塔羅牌閱讀是為娛樂和自我反思而設計的。雖然牌卡可以提供洞察和指導，但請記住，你擁有塑造自己命運的力量。',
    features: {
      deck: {
        title: '完整塔羅牌組',
        desc: '完整的78張牌，包含傳統的大阿爾卡納和小阿爾卡納含義',
      },
      daily: {
        title: '每日閱讀',
        desc: '無限次閱讀，指引你的精神旅程',
      },
      detailed: {
        title: '詳細解釋',
        desc: '正位和逆位牌卡的全面含義',
      },
    },
  },
};

export default function LocalePage({ params }: LocalePageProps) {
  const { locale } = params;
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  const t = texts[locale as keyof typeof texts] || texts.en;

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
