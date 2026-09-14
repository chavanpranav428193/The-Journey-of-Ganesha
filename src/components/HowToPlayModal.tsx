import React from 'react';
import { X, Play, BookOpen, Trophy, Award, CheckCircle2 } from 'lucide-react';
import { soundService } from '../services/audioService';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartJourney?: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose, onStartJourney }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-stone-900 to-amber-950 border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-how-to-play-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors"
          aria-label="Close Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-400 font-cinzel">
            Quick Pilgrim Guide
          </span>
          <h3 className="text-2xl font-black font-cinzel text-amber-100 mt-1">
            How to Experience the Journey
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            A 30-second guide to sacred learning, interactive challenges, and rewards.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="space-y-3.5">
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-900/30 border border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-amber-400" /> Interactive Gameplay
              </h4>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                Tap and interact with sacred objects, solve sequence puzzles, make righteous decisions, and prepare the Ganesh Chaturthi mandap.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-900/30 border border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Learn True Cultural Lore
              </h4>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                Discover why Ganesha has an elephant head, how wisdom overcomes physical speed, and the deep symbolism behind eco-friendly Visarjan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-900/30 border border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Collect Wisdom Cards
              </h4>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                Unlock 5 timeless wisdom cards with life lessons on purpose, duty, intellect, gratitude, and community harmony.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-900/30 border border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Earn Your Certificate
              </h4>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                Complete all 5 chapters to unlock your official Game Completion Certificate with dynamic ID, verification code, and global leaderboard placement!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex gap-3">
          <button
            id="close-guide-btn"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close Guide
          </button>
          {onStartJourney && (
            <button
              id="guide-start-journey-btn"
              onClick={() => {
                soundService.playClick();
                onClose();
                onStartJourney();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span>Begin Journey</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
