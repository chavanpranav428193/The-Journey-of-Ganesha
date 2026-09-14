import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { getRankTier } from '../data/gameData';

interface ScoreDisplayProps {
  score: number;
  recentDelta?: number | null;
  className?: string;
  showTier?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  recentDelta = null,
  className = '',
  showTier = true
}) => {
  const [displayedScore, setDisplayedScore] = useState(score);
  const displayedScoreRef = useRef(displayedScore);
  displayedScoreRef.current = displayedScore;

  useEffect(() => {
    const start = displayedScoreRef.current;
    const end = score;
    if (start === end) return;

    const diff = end - start;
    const duration = 600; // ms
    const steps = 24;
    const stepTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const current = Math.round(start + (diff * (stepCount / steps)));
      setDisplayedScore(current);

      if (stepCount >= steps) {
        clearInterval(timer);
        setDisplayedScore(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const tier = getRankTier(score);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Main Score Capsule */}
      <div className="relative flex items-center gap-2 bg-gradient-to-r from-amber-950/90 to-stone-900/90 border border-amber-500/40 px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80 leading-none">
            Wisdom Score
          </span>
          <span className="text-lg font-extrabold text-amber-100 font-cinzel leading-none mt-0.5">
            {displayedScore.toLocaleString()}
          </span>
        </div>

        {/* Delta Pop */}
        {recentDelta && recentDelta > 0 && (
          <span className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black shadow animate-bounce">
            +{recentDelta}
          </span>
        )}
      </div>

      {/* Tier Badge */}
      {showTier && (
        <div className="hidden sm:flex items-center gap-1.5 bg-amber-950/70 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-200">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>{tier.title}</span>
        </div>
      )}
    </div>
  );
};
