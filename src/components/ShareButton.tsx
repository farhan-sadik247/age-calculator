'use client';

import React, { useState } from 'react';
import { AgeResult } from '@/types';
import { formatAgeResult } from '@/utils/ageCalculator';

interface ShareButtonProps {
  ageResult: AgeResult;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ ageResult, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `I'm ${formatAgeResult(ageResult)}! That's ${ageResult.totalDays.toLocaleString()} days, ${ageResult.totalHours.toLocaleString()} hours, or ${ageResult.totalSeconds.toLocaleString()} seconds of life! 🎂 Calculate your age at`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleShare = async (platform: string) => {
    const fullShareText = `${shareText} ${shareUrl}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullShareText)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(fullShareText)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(fullShareText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Age Calculator Results',
              text: shareText,
              url: shareUrl,
            });
          } catch (err) {
            console.error('Error sharing: ', err);
          }
        }
        break;
    }
    
    setIsOpen(false);
  };

  const canUseNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <div className={`share-button ${className}`}>
      <button
        className="share-button__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Share your age calculation"
      >
        <span className="share-button__icon">📤</span>
        Share Results
      </button>

      {isOpen && (
        <div className="share-button__dropdown">
          <div className="share-button__dropdown-content">
            <h4 className="share-button__dropdown-title">Share Your Results</h4>
            
            <div className="share-button__options">
              {canUseNativeShare && (
                <button
                  className="share-button__option"
                  onClick={() => handleShare('native')}
                >
                  <span className="share-button__option-icon">📱</span>
                  Share
                </button>
              )}
              
              <button
                className="share-button__option"
                onClick={() => handleShare('twitter')}
              >
                <span className="share-button__option-icon">🐦</span>
                Twitter
              </button>
              
              <button
                className="share-button__option"
                onClick={() => handleShare('facebook')}
              >
                <span className="share-button__option-icon">📘</span>
                Facebook
              </button>
              
              <button
                className="share-button__option"
                onClick={() => handleShare('linkedin')}
              >
                <span className="share-button__option-icon">💼</span>
                LinkedIn
              </button>
              
              <button
                className="share-button__option"
                onClick={() => handleShare('whatsapp')}
              >
                <span className="share-button__option-icon">💬</span>
                WhatsApp
              </button>
              
              <button
                className={`share-button__option ${copied ? 'share-button__option--copied' : ''}`}
                onClick={() => handleShare('copy')}
              >
                <span className="share-button__option-icon">
                  {copied ? '✅' : '📋'}
                </span>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
          
          <div 
            className="share-button__backdrop"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ShareButton;
