import React from 'react';
import { Award, X } from 'lucide-react';
import { AchievementData } from '../types';

interface AchievementToastProps {
  achievement: AchievementData | null;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-400 p-4 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] animate-slide-in-down flex items-start gap-3">
      <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
        {achievement.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider font-cinzel">
          <Award className="w-3.5 h-3.5" />
          <span>Achievement Unlocked!</span>
        </div>
        <h4 className="text-white font-bold text-sm truncate mt-0.5">{achievement.title}</h4>
        <p className="text-stone-300 text-xs mt-0.5 leading-snug">{achievement.description}</p>
      </div>
      <button
        onClick={onClose}
        className="text-stone-400 hover:text-white p-1 rounded-lg"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
