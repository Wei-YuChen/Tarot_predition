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

        {/* Additional Content Section for SEO */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto mt-16 space-y-8"
        >
          <div className="bg-white dark:bg-tarot-cosmic rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'tw'
                ? '探索塔羅的神秘世界'
                : 'Explore the Mystical World of Tarot'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {locale === 'tw'
                ? '塔羅牌是一種古老而深刻的占卜工具，已經流傳了數百年。每張牌都承載著豐富的象徵意義和深層的智慧，反映了人類經驗的各個面向。在神秘塔羅，我們致力於將這門古老的藝術帶入現代世界，讓每個人都能輕鬆獲得塔羅牌的指引與洞察。我們的平台結合了傳統塔羅智慧與現代科技，為您提供真實而有意義的占卜體驗。'
                : 'Tarot cards are an ancient and profound divination tool that has been passed down for hundreds of years. Each card carries rich symbolic meanings and deep wisdom, reflecting various aspects of human experience. At Mystic Tarot, we are committed to bringing this ancient art into the modern world, making tarot guidance and insights accessible to everyone. Our platform combines traditional tarot wisdom with modern technology to provide you with authentic and meaningful divination experiences.'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {locale === 'tw'
                ? '我們的三牌展開法是塔羅占卜中最經典且受歡迎的牌陣之一。第一張牌代表過去，揭示了影響您當前狀況的歷史因素和背景；第二張牌象徵現在，展現您目前所處的情境和當下的能量；第三張牌指向未來，顯示基於當前路徑的可能結果。這個牌陣提供了一個完整的時間線視角，幫助您理解事件的發展脈絡，並為未來的選擇提供參考。無論您是塔羅初學者還是經驗豐富的占卜愛好者，這個簡單而強大的牌陣都能為您帶來清晰的洞察。'
                : 'Our three-card spread is one of the most classic and popular layouts in tarot divination. The first card represents the past, revealing historical factors and background that have influenced your current situation; the second card symbolizes the present, showing your current circumstances and energies; the third card points to the future, displaying potential outcomes based on your current path. This spread provides a complete timeline perspective, helping you understand the development context of events and offering guidance for future choices. Whether you are a tarot beginner or an experienced divination enthusiast, this simple yet powerful spread can bring you clear insights.'}
            </p>
          </div>

          <div className="bg-white dark:bg-tarot-cosmic rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'tw'
                ? '為什麼選擇神秘塔羅？'
                : 'Why Choose Mystic Tarot?'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {locale === 'tw'
                ? '神秘塔羅不僅僅是一個簡單的線上占卜網站，它是一個完整的靈性探索平台。我們使用完整的78張塔羅牌組，包括22張大阿爾克那牌和56張小阿爾克那牌，每張牌都附有詳細的正位和逆位解釋。我們的解釋基於傳統塔羅智慧，同時融入現代心理學觀點，為您提供既有深度又實用的指引。我們相信，塔羅牌不僅是預測未來的工具，更是自我反思和個人成長的媒介。'
                : 'Mystic Tarot is not just a simple online divination website, it is a complete spiritual exploration platform. We use a full 78-card tarot deck, including 22 Major Arcana cards and 56 Minor Arcana cards, each with detailed upright and reversed interpretations. Our interpretations are based on traditional tarot wisdom while incorporating modern psychological perspectives, providing you with guidance that is both profound and practical. We believe that tarot cards are not only tools for predicting the future, but also mediums for self-reflection and personal growth.'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {locale === 'tw'
                ? '我們的平台支援多種語言，包括繁體中文、簡體中文、英文、日文、韓文等，確保全球用戶都能以自己熟悉的語言進行占卜。我們重視使用者隱私，所有的占卜問題和結果都儲存在您的設備本地，不會上傳到我們的伺服器。這意味著您的靈性探索完全私密，只有您自己能夠查看。此外，我們提供了明暗兩種主題模式，讓您可以根據個人喜好和環境選擇最舒適的閱讀體驗。'
                : 'Our platform supports multiple languages, including Traditional Chinese, Simplified Chinese, English, Japanese, Korean, and more, ensuring that users worldwide can perform divination in their familiar language. We value user privacy, and all divination questions and results are stored locally on your device, not uploaded to our servers. This means your spiritual exploration is completely private, visible only to you. Additionally, we provide both light and dark theme modes, allowing you to choose the most comfortable reading experience based on your personal preferences and environment.'}
            </p>
          </div>

          <div className="bg-white dark:bg-tarot-cosmic rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'tw'
                ? '如何開始您的塔羅之旅'
                : 'How to Start Your Tarot Journey'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {locale === 'tw'
                ? '開始使用神秘塔羅非常簡單。首先，花一點時間靜下心來，思考您想要尋求指引的問題或情況。這個問題可以是關於愛情、事業、人際關係、個人成長，或任何您關心的領域。將問題清晰地表述出來，這有助於您獲得更精確的解讀。然後點擊「抽取我的牌卡」按鈕，輸入您的問題，系統將為您抽取三張牌。每張牌都有其獨特的含義，結合起來將為您提供關於過去、現在和未來的完整圖景。'
                : 'Getting started with Mystic Tarot is very simple. First, take a moment to calm your mind and think about the question or situation for which you seek guidance. This question can be about love, career, relationships, personal growth, or any area you care about. Clearly articulate your question, as this helps you get more accurate readings. Then click the "Draw My Cards" button, enter your question, and the system will draw three cards for you. Each card has its unique meaning, and together they will provide you with a complete picture of your past, present, and future.'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {locale === 'tw'
                ? '請記住，塔羅牌是一種自我反思的工具，而非命運的絕對預言。牌卡顯示的是基於當前能量和路徑的可能性，而您始終擁有選擇和改變的力量。我們建議您以開放的心態接受牌卡的訊息，將其作為思考的起點，而不是行動的唯一依據。對於重要的人生決策，請務必結合理性思考和專業建議。開始您的第一次占卜，讓古老的智慧照亮您的道路！'
                : "Remember, tarot is a tool for self-reflection, not an absolute prophecy of fate. The cards show possibilities based on current energies and paths, and you always have the power to choose and change. We recommend approaching the cards' messages with an open mind, using them as a starting point for reflection rather than the sole basis for action. For important life decisions, be sure to combine rational thinking with professional advice. Start your first divination and let ancient wisdom illuminate your path!"}
            </p>
          </div>
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
