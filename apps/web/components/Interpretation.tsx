'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Reading } from '@/lib/types';
import { generateSpreadInterpretation } from '@/lib/interpret';

interface InterpretationProps {
  reading: Reading;
  className?: string;
}

export default function Interpretation({
  reading,
  className = '',
}: InterpretationProps) {
  const interpretation = generateSpreadInterpretation(reading);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`card-frame p-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Your Reading Interpretation
      </h2>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        {interpretation.split('\n\n').map((paragraph, index) => (
          <motion.p
            key={index}
            className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {paragraph.includes(':') ? (
              <>
                <span className="font-semibold text-tarot-purple dark:text-tarot-gold">
                  {paragraph.split(':')[0]}:
                </span>
                <span className="ml-1">
                  {paragraph.split(':').slice(1).join(':')}
                </span>
              </>
            ) : (
              paragraph
            )}
          </motion.p>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
          This interpretation is based on traditional tarot meanings. Trust your
          intuition and personal insights as you reflect on these messages.
        </p>
      </div>
    </motion.div>
  );
}
