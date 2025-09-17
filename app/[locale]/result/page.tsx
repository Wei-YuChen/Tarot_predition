'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { getLatestReading, updateReadingWithAI } from '@/lib/storage';
import { buildSpreadSummary, interpretCard, getCardName, getPositionName } from '@/lib/interpret';
import { InterstitialAd, useInterstitialAd } from '@/components/InterstitialAd';
import type { Reading } from '@/lib/types';

export default function ResultPage() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { isOpen: adIsOpen, showAd, hideAd } = useInterstitialAd();

  const [reading, setReading] = useState<Reading | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const latestReading = getLatestReading();
    setReading(latestReading);
    setIsLoading(false);
  }, []);

  const handleDeepAnalysis = async () => {
    if (!reading || isLoadingAI) return;
    
    showAd();
  };

  const handleAdClose = async () => {
    hideAd();
    await performAIAnalysis();
  };

  const performAIAnalysis = async () => {
    if (!reading) return;

    setIsLoadingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai-interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: reading.question,
          spread: reading.spread,
          locale,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI analysis');
      }

      const data = await response.json();
      const interpretation = data.interpretation;

      // Update the reading with AI interpretation
      updateReadingWithAI(reading.id, interpretation);
      
      // Update local state
      setReading({
        ...reading,
        aiInterpretation: interpretation,
      });

    } catch (error) {
      console.error('AI analysis error:', error);
      setAiError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleShare = async () => {
    if (!reading) return;

    const shareText = `${t('common.appName')}\n\n${buildSpreadSummary(reading.spread, locale)}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t('common.appName'),
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard');
    }).catch(() => {
      console.error('Failed to copy to clipboard');
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!reading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            {t('result.noReading')}
          </h1>
          <p className="text-white/80 mb-8">
            {t('result.noReadingMessage')}
          </p>
          <Link href={`/${locale}/draw`}>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('result.goToDraw')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t('result.title')}
          </h1>
          <p className="text-white/60 text-sm">
            {t('result.timestamp', { 
              date: reading.timestamp.toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            })}
          </p>
        </motion.div>

        {/* Cards Display */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {reading.spread.map((drawnCard, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">
                {getPositionName(drawnCard.position, locale)}
              </h3>

              {/* Card representation */}
              <div className={`relative w-32 h-48 mx-auto mb-4 bg-white rounded-lg shadow-lg flex items-center justify-center ${
                drawnCard.isReversed ? 'rotate-180' : ''
              }`}>
                <div className="text-center text-gray-800">
                  <h4 className="font-bold text-sm mb-2">
                    {getCardName(drawnCard.card, locale)}
                  </h4>
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {drawnCard.card.type === 'major' ? 'M' : drawnCard.card.suit?.[0].toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/80 mb-2">
                {drawnCard.isReversed ? t('result.cardStates.reversed') : t('result.cardStates.upright')}
              </p>

              <p className="text-sm text-white/70">
                {interpretCard(drawnCard.card, drawnCard.isReversed, locale)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Base Interpretation */}
        <motion.div
          className="bg-white/5 rounded-lg p-6 mb-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            {t('result.baseInterpretation')}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed whitespace-pre-line">
              {buildSpreadSummary(reading.spread, locale)}
            </p>
          </div>
        </motion.div>

        {/* AI Analysis Section */}
        <motion.div
          className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 mb-8 backdrop-blur-sm border border-purple-500/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            {t('result.deepAnalysis')}
          </h2>

          {!reading.aiInterpretation && !isLoadingAI && (
            <div className="text-center">
              <p className="text-white/80 mb-6">
                Get a deeper, personalized interpretation of your cards from our AI Tarot master.
              </p>
              <motion.button
                onClick={handleDeepAnalysis}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('result.deepAnalysis')}
              </motion.button>
            </div>
          )}

          {isLoadingAI && (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/80">{t('result.analyzing')}</p>
            </div>
          )}

          {aiError && (
            <div className="text-center">
              <p className="text-red-400 mb-4">{t('result.analysisError')}</p>
              <p className="text-sm text-white/60">{aiError}</p>
              <motion.button
                onClick={handleDeepAnalysis}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('common.retry')}
              </motion.button>
            </div>
          )}

          {reading.aiInterpretation && (
            <motion.div
              className="prose prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                {t('result.aiAnalysis')}
              </h3>
              <p className="text-white/90 leading-relaxed whitespace-pre-line">
                {reading.aiInterpretation}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={handleShare}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('result.shareReading')}
          </motion.button>

          <Link href={`/${locale}/draw`}>
            <motion.button
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('result.goToDraw')}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Interstitial Ad */}
      <InterstitialAd isOpen={adIsOpen} onClose={handleAdClose} duration={4} />
    </div>
  );
}