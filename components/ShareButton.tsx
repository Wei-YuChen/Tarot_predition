'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reading } from '@/lib/types';

interface ShareButtonProps {
  reading: Reading;
  className?: string;
}

export default function ShareButton({
  reading,
  className = '',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateShareText = (): string => {
    const cards = reading.cards
      .map(
        (cardDraw) =>
          `${cardDraw.position}: ${cardDraw.card.name} ${cardDraw.isReversed ? '(Reversed)' : '(Upright)'}`
      )
      .join('\n');

    return `🔮 My Tarot Reading 🔮\n\n${cards}\n\nRead at: ${reading.timestamp.toLocaleDateString()}\n\n#TarotReading #Mysticism`;
  };

  const handleShare = async () => {
    const shareText = generateShareText();
    const shareUrl = window.location.href;

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Tarot Reading',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        // Fall back to clipboard if user cancels or error occurs
        console.log('Share cancelled or failed:', error);
      }
    }

    // Fallback to copying to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Final fallback - show alert with text to copy
      alert('Copy this text to share your reading:\n\n' + shareText);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    copied: { scale: 1.1 },
  };

  return (
    <motion.button
      onClick={handleShare}
      className={`mystic-button flex items-center gap-2 ${className}`}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      animate={copied ? 'copied' : 'idle'}
      aria-label="Share your tarot reading"
    >
      <span className="text-xl" role="img" aria-label="share">
        {copied ? '✅' : '📤'}
      </span>
      {copied ? 'Copied to Clipboard!' : 'Share Reading'}
    </motion.button>
  );
}
