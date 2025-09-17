'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // seconds
}

export function InterstitialAd({ isOpen, onClose, duration = 5 }: InterstitialAdProps) {
  const t = useTranslations('ads');
  const [countdown, setCountdown] = useState(duration);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(duration);
      setCanSkip(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, duration]);

  const handleSkip = () => {
    if (canSkip) {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-gradient-to-br from-purple-800 to-blue-800 rounded-lg p-8 max-w-md w-full mx-4 text-center relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t('title')}
              </h2>

              {/* Simulated ad content */}
              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-3"></div>
                  <div className="h-4 bg-white/20 rounded mb-3"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
                </div>
                <p className="text-white/70 mt-4 text-sm">
                  {t('loading')}
                </p>
              </div>

              {/* Countdown and skip button */}
              <div className="flex flex-col items-center space-y-4">
                {!canSkip ? (
                  <p className="text-white/80 text-sm">
                    {t('countdown', { seconds: countdown })}
                  </p>
                ) : (
                  <motion.button
                    className="bg-white text-purple-800 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                    onClick={handleSkip}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    {t('skipAd')}
                  </motion.button>
                )}

                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="bg-white h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((duration - countdown) / duration) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing interstitial ads
export function useInterstitialAd() {
  const [isOpen, setIsOpen] = useState(false);

  const showAd = () => setIsOpen(true);
  const hideAd = () => setIsOpen(false);

  return {
    isOpen,
    showAd,
    hideAd,
  };
}