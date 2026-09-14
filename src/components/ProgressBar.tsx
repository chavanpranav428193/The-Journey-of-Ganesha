import React from 'react';
import { Check, Lock } from 'lucide-react';
import { LEVELS } from '../data/gameData';

interface ProgressBarProps {
  currentLevel: number;
  unlockedLevels: number[];
  onSelectLevel?: (levelId: number) => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentLevel,
  unlockedLevels,
  onSelectLevel,
  className = ''
}) => {
  return (
    <div className={`w-full max-w-2xl mx-auto px-4 ${className}`}>
      <div className="relative flex items-center justify-between">
        {/* Connecting Track */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-amber-950/80 rounded-full overflow-hidden border border-amber-800/40">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 transition-all duration-500 ease-out"
            style={{
              width: `${((Math.max(...unlockedLevels) - 1) / (LEVELS.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* Step Nodes */}
        {LEVELS.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl.id);
          const isCurrent = currentLevel === lvl.id;
          const isCompleted = unlockedLevels.includes(lvl.id + 1) || (lvl.id === 5 && isUnlocked);

          return (
            <button
              key={lvl.id}
              id={`progress-node-${lvl.id}`}
              disabled={!isUnlocked || !onSelectLevel}
              onClick={() => onSelectLevel && isUnlocked && onSelectLevel(lvl.id)}
              className={`relative z-10 flex flex-col items-center group focus:outline-none ${
                !isUnlocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
              title={`Chapter ${lvl.id}: ${lvl.title}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'ring-4 ring-amber-400/50 bg-amber-500 text-stone-950 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                    : isCompleted
                    ? 'bg-amber-700/80 text-amber-100 border border-amber-400/60'
                    : isUnlocked
                    ? 'bg-amber-950 text-amber-300 border border-amber-600'
                    : 'bg-stone-900 text-stone-600 border border-stone-800'
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-4 h-4 text-amber-200 stroke-[3]" />
                ) : !isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 text-stone-500" />
                ) : (
                  <span>{lvl.id}</span>
                )}
              </div>
              <span
                className={`hidden md:block text-[11px] font-medium mt-1 whitespace-nowrap transition-colors ${
                  isCurrent ? 'text-amber-300 font-bold' : isUnlocked ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                Ch. {lvl.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
