import React from 'react';
import { GaneshaLogo } from '../GaneshaLogo';
import { Sparkles, Shield, Compass, Heart, Award } from 'lucide-react';

interface LevelHeaderProps {
  levelNumber: number;
  title: string;
  subtitle: string;
  objective: string;
  badgeIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const LevelHeader: React.FC<LevelHeaderProps> = ({
  levelNumber,
  title,
  subtitle,
  objective,
  badgeIcon,
  rightElement
}) => {
  return (
    <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-3.5 sm:p-4 mb-4 shadow-lg backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Ganesha Logo and Titles */}
        <div className="flex items-center gap-3">
          <GaneshaLogo size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel">
                Level {levelNumber}
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-[10px] text-stone-400 truncate max-w-[200px] sm:max-w-none">
                {subtitle}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black font-cinzel text-amber-100 tracking-wide">
              {title}
            </h3>
          </div>
        </div>

        {/* Right Element (Scores, timer, combo, etc.) */}
        {rightElement && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            {rightElement}
          </div>
        )}
      </div>

      {/* Objective Strip */}
      <div className="mt-2.5 pt-2 border-t border-amber-500/20 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-stone-300">
          <span className="text-amber-400 font-bold uppercase font-cinzel text-[10px] tracking-wider flex items-center gap-1">
            {badgeIcon || <Sparkles className="w-3 h-3 text-amber-400" />}
            <span>Objective:</span>
          </span>
          <span className="text-stone-300 text-xs font-medium truncate">
            {objective}
          </span>
        </div>
      </div>
    </div>
  );
};
