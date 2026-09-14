import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { soundService } from '../services/audioService';

interface AiStoryLessonButtonProps {
  onClick: () => void;
  variant?: 'card' | 'compact';
  className?: string;
}

export const AiStoryLessonButton: React.FC<AiStoryLessonButtonProps> = ({
  onClick,
  variant = 'card',
  className = ''
}) => {
  const handleClick = () => {
    soundService.playClick();
    onClick();
  };

  if (variant === 'compact') {
    return (
      <button
        id="ai-story-lesson-compact-btn"
        onClick={handleClick}
        className={`relative group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-400/50 hover:border-amber-300 text-amber-200 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 ${className}`}
        title="Explore sacred story, meaning & heritage"
      >
        <span className="text-amber-400">📖</span>
        <span className="font-cinzel tracking-wide text-[11px]">Story & Meaning</span>
      </button>
    );
  }

  return (
    <button
      id="ai-story-lesson-card-btn"
      onClick={handleClick}
      className={`w-full max-w-md mx-auto group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#201007] via-[#2d170a] to-[#201007] border-2 border-amber-400/60 hover:border-amber-300 p-3.5 sm:p-4 text-center shadow-lg transition-all duration-300 hover:shadow-amber-500/20 hover:scale-[1.01] active:scale-98 min-h-[48px] flex flex-col items-center justify-center cursor-pointer ${className}`}
    >
      {/* Warm ambient inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-amber-500/5 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Title with human touch */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className="text-amber-400 text-sm">🪔</span>
        <span className="font-bold text-xs sm:text-sm tracking-widest text-amber-100 font-cinzel group-hover:text-amber-200 transition-colors uppercase">
          Story, Meaning & Sacred Lore
        </span>
        <span className="text-amber-400 text-sm">🪔</span>
      </div>

      <p className="relative z-10 text-[11px] sm:text-xs text-amber-200/80 font-serif italic mt-0.5 transition-colors">
        Read the rich narrative, timeline, character symbols & cultural history
      </p>

      {/* Interactive cue */}
      <div className="relative z-10 mt-1.5 flex items-center gap-1.5 text-[10px] text-amber-400/90 font-mono">
        <span>Open Illustrated Storybook & Knowledge Guide</span>
        <span>→</span>
      </div>
    </button>
  );
};
