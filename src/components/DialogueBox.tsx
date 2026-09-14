import React from 'react';
import { Character } from './Character';
import { GaneshaExpression } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';
import { soundService } from '../services/audioService';

interface DialogueBoxProps {
  speaker: 'ganesha' | 'narrator' | 'wisdom';
  expression?: GaneshaExpression;
  text: string;
  onNext?: () => void;
  nextLabel?: string;
  className?: string;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  expression = 'welcoming',
  text,
  onNext,
  nextLabel = 'Continue',
  className = ''
}) => {
  const handleNext = () => {
    soundService.playClick();
    if (onNext) onNext();
  };

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto bg-gradient-to-b from-stone-900/95 to-amber-950/95 border-2 border-amber-500/40 rounded-2xl p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md ${className}`}
    >
      {/* Decorative Ornate Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400 opacity-80" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400 opacity-80" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400 opacity-80" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400 opacity-80" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Speaker Avatar */}
        {speaker === 'ganesha' ? (
          <div className="shrink-0 flex flex-col items-center">
            <Character expression={expression} size="sm" showAura={false} />
            <span className="text-[11px] font-bold text-amber-300 font-cinzel mt-1 tracking-wide">
              Shree Ganesha
            </span>
          </div>
        ) : (
          <div className="shrink-0 w-14 h-14 rounded-full bg-amber-900/50 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
            {speaker === 'wisdom' ? '📜' : '🪔'}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400 font-cinzel">
              {speaker === 'ganesha' ? 'Divine Guidance' : speaker === 'wisdom' ? 'Sacred Wisdom' : 'The Chronicle'}
            </span>
          </div>

          <p className="text-stone-100 text-sm md:text-base leading-relaxed font-sans font-medium">
            "{text}"
          </p>

          {onNext && (
            <div className="mt-4 flex justify-end">
              <button
                id="dialogue-next-btn"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/30 active:scale-95 transition-all"
              >
                <span>{nextLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
