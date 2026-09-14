import React from 'react';
import { X, Trophy, CheckCircle2, Lock, Sparkles, Star } from 'lucide-react';
import { AchievementData } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/gameData';
import { soundService } from '../services/audioService';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedAchievementIds: string[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  unlockedAchievementIds
}) => {
  if (!isOpen) return null;

  const unlockedCount = unlockedAchievementIds.length;
  const totalCount = INITIAL_ACHIEVEMENTS.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-stone-900 via-[#180e07] to-amber-950 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-achievements-modal-btn"
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors z-20"
          aria-label="Close Achievements"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-2xl mb-2 shadow-inner">
            🏆
          </div>
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel block">
            Sacred Pilgrimage Badges
          </span>
          <h2 className="text-2xl font-black font-cinzel text-amber-100 mt-0.5">
            🏆 ACHIEVEMENTS & HONORS
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Unlocked: <strong className="text-amber-300">{unlockedCount}</strong> of <strong>{totalCount}</strong> Badges ({percentage}%)
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-stone-950/80 rounded-full h-2.5 mt-3 border border-amber-500/20 overflow-hidden max-w-sm mx-auto">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievementIds.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-950/60 to-stone-950/80 border-amber-400/50 shadow-md'
                    : 'bg-stone-950/50 border-stone-800/80 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                    isUnlocked
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                      : 'bg-stone-900 border-stone-800 text-stone-600'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-4 h-4 text-stone-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-bold font-cinzel truncate ${
                        isUnlocked ? 'text-amber-100' : 'text-stone-400'
                      }`}
                    >
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close action */}
        <div className="mt-5 pt-3 border-t border-amber-500/20 flex justify-center">
          <button
            id="achievements-close-btn"
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close Badges
          </button>
        </div>
      </div>
    </div>
  );
};
