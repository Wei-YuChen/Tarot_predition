'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getRandomCards } from '@/lib/cards';
import { pastPresentFutureSpread } from '@/lib/spreads';
import { canDrawCards, incrementDrawCount, saveReading, getDailyLimits } from '@/lib/storage';
import { InterstitialAd, useInterstitialAd } from '@/components/InterstitialAd';
import type { Card, DrawnCard, Reading } from '@/lib/types';

export default function DrawPage() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { isOpen: adIsOpen, showAd, hideAd } = useInterstitialAd();

  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [canDraw, setCanDraw] = useState(true);
  const [dailyLimits, setDailyLimits] = useState({ drawCount: 0, maxDraws: 3 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const limits = getDailyLimits();
    setDailyLimits(limits);
    setCanDraw(canDrawCards());
  }, []);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
    }, 2000);
  };

  const handleDrawCards = () => {
    if (!canDraw || isDrawing) return;
    
    setIsDrawing(true);
    showAd();
  };

  const handleAdClose = () => {
    hideAd();
    performCardDraw();
  };

  const performCardDraw = () => {
    const cards = getRandomCards(3);
    const drawn: DrawnCard[] = cards.map((card, index) => ({
      card,
      position: pastPresentFutureSpread[index],
      isReversed: Math.random() < 0.5, // 50% chance of being reversed
    }));

    setSelectedCards(cards);
    setDrawnCards(drawn);
    setRevealedCards([false, false, false]);
    
    const newLimits = incrementDrawCount();
    setDailyLimits(newLimits);
    setCanDraw(canDrawCards());
    setIsDrawing(false);
  };

  const handleCardFlip = (index: number) => {
    const newRevealed = [...revealedCards];
    newRevealed[index] = true;
    setRevealedCards(newRevealed);
  };

  const handleViewInterpretation = () => {
    if (drawnCards.length === 0) return;

    // Save the reading
    const reading: Reading = {
      id: Date.now().toString(),
      timestamp: new Date(),
      spread: drawnCards,
    };

    saveReading(reading);
    router.push(`/${locale}/result`);
  };

  const allCardsRevealed = revealedCards.every(Boolean);

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
            {t('draw.title')}
          </h1>
          <p className="text-lg text-white/80 mb-6">
            {t('draw.subtitle')}
          </p>
          
          {/* Daily limits display */}
          <div className="bg-white/10 rounded-lg p-4 inline-block">
            {canDraw ? (
              <p className="text-white/80">
                {t('draw.remainingDraws', { count: dailyLimits.maxDraws - dailyLimits.drawCount })}
              </p>
            ) : (
              <div className="text-center">
                <p className="text-red-400 font-semibold mb-2">{t('draw.dailyLimit')}</p>
                <p className="text-white/60 text-sm">
                  {t('draw.dailyLimitMessage', { count: dailyLimits.maxDraws })}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Deck and Controls */}
        {selectedCards.length === 0 && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Deck visualization */}
            <div className="relative inline-block mb-8">
              <motion.div
                className="w-32 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl card-back"
                animate={isShuffling ? { 
                  rotateY: [0, 180, 360],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {isShuffling && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-sm font-semibold">Shuffling...</div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <motion.button
                onClick={handleShuffle}
                disabled={isShuffling || !canDraw}
                className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
                whileHover={{ scale: canDraw && !isShuffling ? 1.05 : 1 }}
                whileTap={{ scale: canDraw && !isShuffling ? 0.95 : 1 }}
              >
                {t('draw.shuffleButton')}
              </motion.button>

              <motion.button
                onClick={handleDrawCards}
                disabled={!canDraw || isDrawing}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-300"
                whileHover={{ scale: canDraw && !isDrawing ? 1.05 : 1 }}
                whileTap={{ scale: canDraw && !isDrawing ? 0.95 : 1 }}
              >
                {isDrawing ? t('common.loading') : t('draw.drawButton')}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Drawn Cards */}
        {selectedCards.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {drawnCards.map((drawnCard, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Position label */}
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {drawnCard.position.nameTranslations?.[locale] || drawnCard.position.name}
                </h3>

                {/* Card */}
                <motion.div
                  className="relative w-48 h-72 mx-auto cursor-pointer"
                  onClick={() => handleCardFlip(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {!revealedCards[index] ? (
                      <motion.div
                        key="back"
                        className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl card-back flex items-center justify-center"
                        initial={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white text-sm font-semibold">
                          {t('draw.flipCard')}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="front"
                        className={`absolute inset-0 bg-white rounded-lg shadow-2xl p-4 flex flex-col items-center justify-center text-gray-800 ${
                          drawnCard.isReversed ? 'rotate-180' : ''
                        }`}
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center">
                          <h4 className="font-bold text-lg mb-2">
                            {drawnCard.card.nameTranslations?.[locale] || drawnCard.card.name}
                          </h4>
                          <p className="text-sm mb-2">
                            {drawnCard.isReversed ? t('result.cardStates.reversed') : t('result.cardStates.upright')}
                          </p>
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {drawnCard.card.type === 'major' ? 'M' : drawnCard.card.suit?.[0].toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Card description */}
                {revealedCards[index] && (
                  <motion.p
                    className="text-sm text-white/70 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {drawnCard.position.descriptionTranslations?.[locale] || drawnCard.position.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View Interpretation Button */}
        {allCardsRevealed && selectedCards.length > 0 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={handleViewInterpretation}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('draw.viewInterpretation')}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Interstitial Ad */}
      <InterstitialAd isOpen={adIsOpen} onClose={handleAdClose} duration={3} />
    </div>
  );
}