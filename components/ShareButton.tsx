'use client'

import { useState } from 'react'

export function ShareButton() {
  const [showCopied, setShowCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const title = 'My Mystic Tarot Reading'
    const text = 'I just drew my tarot cards and discovered fascinating insights about my past, present, and future!'

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (error) {
        // User cancelled or error occurred, fallback to copy
        await copyToClipboard(url)
      }
    } else {
      // Fallback to copy to clipboard
      await copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mystic-400/50"
        aria-label="Share this reading"
      >
        <svg 
          className="w-5 h-5 text-mystic-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" 
          />
        </svg>
      </button>

      {showCopied && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Link copied!
        </div>
      )}
    </div>
  )
}