'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  drawCards,
  DrawnCard,
  meaningByOrientation,
  getCardDisplayName,
  POSITIONS,
  POSITIONS_ZH,
  POSITIONS_TW,
  POSITIONS_JA,
  POSITIONS_KO,
  POSITIONS_VI,
  POSITIONS_TH,
  POSITIONS_ID,
  POSITIONS_MS,
} from '@/lib/tarot';
import {
  cardDisplayName,
  meaningByOrientationLocalized,
  getOrientationLabels,
} from '@/lib/tarot-i18n';

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
    basicInterpretation: 'Basic Interpretation',
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
    basicInterpretation: '基础解析',
    positions: POSITIONS_ZH,
    deepAnalysisTitle: '深度分析',
    errorAnalysis: '抱歉，获取深度分析时出现错误。请重试。',
    retryAnalysis: '重试',
  },
  tw: {
    title: '你的塔羅牌閱讀',
    noQuestion: '未找到問題。請返回並提出問題。',
    backToHome: '返回首頁',
    deepAnalysis: '獲取深度解析',
    loadingAnalysis: '正在解析你的牌卡...',
    cardPosition: '位置',
    cardMeaning: '含義',
    basicInterpretation: '基礎解析',
    positions: POSITIONS_TW,
    deepAnalysisTitle: '深度解析',
    errorAnalysis: '抱歉，獲取深度解析時出現錯誤。請重試。',
    retryAnalysis: '重試',
  },
  ja: {
    title: 'あなたのタロット占い',
    noQuestion: '質問が見つかりません。戻って質問をしてください。',
    backToHome: 'ホームに戻る',
    deepAnalysis: '深い分析を取得',
    loadingAnalysis: 'カードを分析中...',
    cardPosition: 'ポジション',
    cardMeaning: '意味',
    basicInterpretation: '基本的な解釈',
    positions: POSITIONS_JA,
    deepAnalysisTitle: '深い分析',
    errorAnalysis:
      '申し訳ありませんが、深い分析の取得中にエラーが発生しました。もう一度お試しください。',
    retryAnalysis: '再試行',
  },
  ko: {
    title: '당신의 타로 리딩',
    noQuestion: '질문을 찾을 수 없습니다. 돌아가서 질문을 해주세요.',
    backToHome: '홈으로 돌아가기',
    deepAnalysis: '심층 분석 받기',
    loadingAnalysis: '카드를 분석 중...',
    cardPosition: '위치',
    cardMeaning: '의미',
    basicInterpretation: '기본 해석',
    positions: POSITIONS_KO,
    deepAnalysisTitle: '심층 분석',
    errorAnalysis:
      '죄송합니다. 심층 분석을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.',
    retryAnalysis: '다시 시도',
  },
  vi: {
    title: 'Bài Tarot Của Bạn',
    noQuestion: 'Không tìm thấy câu hỏi. Vui lòng quay lại và đặt câu hỏi.',
    backToHome: 'Về Trang Chủ',
    deepAnalysis: 'Nhận Phân Tích Sâu',
    loadingAnalysis: 'Đang phân tích thẻ bài của bạn...',
    cardPosition: 'Vị trí',
    cardMeaning: 'Ý nghĩa',
    basicInterpretation: 'Giải thích cơ bản',
    positions: POSITIONS_VI,
    deepAnalysisTitle: 'Phân Tích Sâu',
    errorAnalysis:
      'Xin lỗi, đã có lỗi xảy ra khi lấy phân tích sâu. Vui lòng thử lại.',
    retryAnalysis: 'Thử Lại',
  },
  th: {
    title: 'การอ่านไพ่ทาโรต์ของคุณ',
    noQuestion: 'ไม่พบคำถาม กรุณากลับไปและถามคำถาม',
    backToHome: 'กลับสู่หน้าแรก',
    deepAnalysis: 'รับการวิเคราะห์เชิงลึก',
    loadingAnalysis: 'กำลังวิเคราะห์ไพ่ของคุณ...',
    cardPosition: 'ตำแหน่ง',
    cardMeaning: 'ความหมาย',
    basicInterpretation: 'การตีความพื้นฐาน',
    positions: POSITIONS_TH,
    deepAnalysisTitle: 'การวิเคราะห์เชิงลึก',
    errorAnalysis:
      'ขออภัย เกิดข้อผิดพลาดในการรับการวิเคราะห์เชิงลึก กรุณาลองใหม่',
    retryAnalysis: 'ลองใหม่',
  },
  id: {
    title: 'Pembacaan Tarot Anda',
    noQuestion:
      'Tidak ada pertanyaan yang ditemukan. Silakan kembali dan ajukan pertanyaan.',
    backToHome: 'Kembali ke Beranda',
    deepAnalysis: 'Dapatkan Analisis Mendalam',
    loadingAnalysis: 'Menganalisis kartu Anda...',
    cardPosition: 'Posisi',
    cardMeaning: 'Makna',
    basicInterpretation: 'Interpretasi Dasar',
    positions: POSITIONS_ID,
    deepAnalysisTitle: 'Analisis Mendalam',
    errorAnalysis:
      'Maaf, terjadi kesalahan saat mendapatkan analisis mendalam. Silakan coba lagi.',
    retryAnalysis: 'Coba Lagi',
  },
  ms: {
    title: 'Bacaan Tarot Anda',
    noQuestion: 'Tiada soalan ditemui. Sila kembali dan tanya soalan.',
    backToHome: 'Kembali ke Laman Utama',
    deepAnalysis: 'Dapatkan Analisis Mendalam',
    loadingAnalysis: 'Menganalisis kad anda...',
    cardPosition: 'Kedudukan',
    cardMeaning: 'Makna',
    basicInterpretation: 'Tafsiran Asas',
    positions: POSITIONS_MS,
    deepAnalysisTitle: 'Analisis Mendalam',
    errorAnalysis:
      'Maaf, terdapat ralat semasa mendapatkan analisis mendalam. Sila cuba lagi.',
    retryAnalysis: 'Cuba Lagi',
  },
};

// Component that uses useSearchParams - wrapped in Suspense
function ReadingContent({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const question = searchParams.get('q');
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [localizedCards, setLocalizedCards] = useState<
    { name: string; meaning: string }[]
  >([]);
  const [deepAnalysis, setDeepAnalysis] = useState<string>('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState(false);

  const t = texts[locale as keyof typeof texts] || texts.en;
  const orientationLabels = getOrientationLabels(locale);

  useEffect(() => {
    const loadCardData = async () => {
      if (question) {
        const drawnCards = drawCards(question, 3);
        setCards(drawnCards);

        // Load localized card names and meanings
        const localizedData = await Promise.all(
          drawnCards.map(async (card) => ({
            name: await cardDisplayName(locale, card.card.id),
            meaning: await meaningByOrientationLocalized(
              locale,
              card.card.id,
              card.isReversed ? 'reversed' : 'upright'
            ),
          }))
        );
        setLocalizedCards(localizedData);
      }
    };

    loadCardData();
  }, [question, locale]);

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
          cards: await Promise.all(
            cards.map(async (card, index) => ({
              name:
                localizedCards[index]?.name ||
                (await cardDisplayName(locale, card.card.id)),
              meaning:
                localizedCards[index]?.meaning ||
                (await meaningByOrientationLocalized(
                  locale,
                  card.card.id,
                  card.isReversed ? 'reversed' : 'upright'
                )),
              isReversed: card.isReversed,
              position: card.position,
            }))
          ),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDeepAnalysis(data.analysis);
      } else {
        setAnalysisError(true);
      }
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

  // If no question is provided, show error message
  if (!question) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
            {t.noQuestion}
          </h1>
          <a href={`/${locale}`} className="mystic-button inline-block">
            {t.backToHome}
          </a>
        </motion.div>
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
              "{decodeURIComponent(question)}"
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
                  {localizedCards[index]?.name || drawnCard.card.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {drawnCard.isReversed
                    ? locale === 'zh' || locale === 'tw'
                      ? `（${orientationLabels.reversed}）`
                      : `(${orientationLabels.reversed})`
                    : locale === 'zh' || locale === 'tw'
                      ? `（${orientationLabels.upright}）`
                      : `(${orientationLabels.upright})`}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {t.basicInterpretation}:
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {localizedCards[index]?.meaning ||
                    meaningByOrientation(drawnCard.card, drawnCard.isReversed)}
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
                <div className="bg-gradient-to-r from-tarot-purple/5 to-tarot-gold/5 dark:from-tarot-purple/10 dark:to-tarot-gold/10 rounded-lg p-6">
                  <div className="deep-reading text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {deepAnalysis}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={itemVariants} className="text-center">
          <a href={`/${locale}`} className="mystic-button inline-block">
            {t.backToHome}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ReadingPage({ params }: ReadingPageProps) {
  const { locale } = params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🔮</div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Loading your reading...
            </p>
          </div>
        </div>
      }
    >
      <ReadingContent locale={locale} />
    </Suspense>
  );
}

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
