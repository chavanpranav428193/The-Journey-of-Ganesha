import React, { useState } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { WisdomCardData } from '../types';
import { WISDOM_CARDS } from '../data/gameData';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface WisdomCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedCardIds: number[];
  initialCardId?: number;
}

export const WisdomCardModal: React.FC<WisdomCardModalProps> = ({
  isOpen,
  onClose,
  unlockedCardIds,
  initialCardId = 1
}) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const foundIdx = WISDOM_CARDS.findIndex((c) => c.id === initialCardId);
    return foundIdx !== -1 ? foundIdx : 0;
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCard = WISDOM_CARDS[activeIndex];
  const isUnlocked = unlockedCardIds.includes(currentCard.id);

  const handleNext = () => {
    soundService.playClick();
    setActiveIndex((prev) => (prev + 1) % WISDOM_CARDS.length);
  };

  const handlePrev = () => {
    soundService.playClick();
    setActiveIndex((prev) => (prev - 1 + WISDOM_CARDS.length) % WISDOM_CARDS.length);
  };

  const handleShare = () => {
    const text = `Wisdom of Ganesha - Chapter ${currentCard.id}: "${currentCard.lesson}" - ${currentCard.quote}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-950 border-2 border-amber-500/50 rounded-3xl p-6 shadow-[0_20px_50px_rgba(217,119,6,0.3)] text-stone-100 flex flex-col items-center">
        {/* Close Button */}
        <button
          id="close-wisdom-card-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/80 hover:bg-stone-800 transition-colors z-20"
          aria-label="Close Wisdom Card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center mb-3">
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel">
            Sacred Wisdom Collection
          </span>
          <h3 className="text-lg font-bold font-cinzel text-amber-100">
            Card {activeIndex + 1} of 5
          </h3>
        </div>

        {/* Card Body */}
        <div
          className={`relative w-full rounded-2xl p-6 border-2 transition-all duration-300 ${
            isUnlocked
              ? 'bg-gradient-to-b from-amber-950/80 via-stone-900 to-amber-950/90 border-amber-400/60 shadow-lg'
              : 'bg-stone-900/60 border-stone-800 opacity-70'
          }`}
        >
          {/* Traditional Ornate Corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/80" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/80" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/80" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/80" />

          {isUnlocked ? (
            <div className="flex flex-col items-center text-center">
              {/* Card Emblem / Character */}
              <div className="relative mb-2">
                <Character expression="wise" size="sm" showAura={true} />
              </div>

              {/* Chapter & Symbol */}
              <span className="text-[11px] font-bold text-amber-300 font-cinzel tracking-wider uppercase">
                {currentCard.symbol}
              </span>
              <h4 className="text-xl font-black font-cinzel text-amber-100 mt-1">
                {currentCard.chapterTitle}
              </h4>

              {/* Key Lesson */}
              <div className="my-3 px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-400/30 w-full">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                  Core Life Lesson
                </span>
                <p className="text-sm font-extrabold text-amber-100 font-sans mt-0.5">
                  "{currentCard.lesson}"
                </p>
              </div>

              {/* Quote */}
              <p className="text-xs text-stone-300 italic font-serif leading-relaxed px-2">
                "{currentCard.quote}"
              </p>

              {/* Cultural Context */}
              <div className="mt-3 pt-3 border-t border-amber-500/20 text-[11px] text-stone-400 leading-snug">
                {currentCard.culturalNote}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-3xl mb-3">
                🔒
              </div>
              <h4 className="text-base font-bold text-stone-300 font-cinzel">Card Locked</h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1">
                Complete Chapter {currentCard.id}: {currentCard.chapterTitle} to unveil this sacred wisdom card.
              </p>
            </div>
          )}
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between w-full mt-4">
          <button
            id="wisdom-card-prev"
            onClick={handlePrev}
            className="p-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Previous Card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {WISDOM_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => {
                  soundService.playClick();
                  setActiveIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'w-6 bg-amber-400'
                    : unlockedCardIds.includes(card.id)
                    ? 'w-2 bg-amber-700 hover:bg-amber-600'
                    : 'w-2 bg-stone-800'
                }`}
                aria-label={`Go to card ${card.id}`}
              />
            ))}
          </div>

          <button
            id="wisdom-card-next"
            onClick={handleNext}
            className="p-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Next Card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Share Button (if unlocked) */}
        {isUnlocked && (
          <button
            id="share-wisdom-card-btn"
            onClick={handleShare}
            className="mt-3 flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-200 transition-colors font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Wisdom Copied to Clipboard!' : 'Copy Sacred Wisdom'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
