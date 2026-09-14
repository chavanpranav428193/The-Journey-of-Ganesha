import React, { useEffect, useState } from 'react';
import { Award, Sparkles, CheckCircle2, ArrowRight, Zap, Star } from 'lucide-react';
import { GaneshaLogo } from './GaneshaLogo';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface LevelScoreScreenProps {
  levelId: number;
  levelTitle: string;
  gameplayScore: number;
  quizScore: number;
  bonusScore: number;
  totalScoreSoFar: number;
  onProceedToWisdom: () => void;
}

export const LevelScoreScreen: React.FC<LevelScoreScreenProps> = ({
  levelId,
  levelTitle,
  gameplayScore,
  quizScore,
  bonusScore,
  totalScoreSoFar,
  onProceedToWisdom
}) => {
  const levelTotal = gameplayScore + quizScore + bonusScore;
  const [displayedTotal, setDisplayedTotal] = useState(0);

  useEffect(() => {
    soundService.playLevelComplete();
    const duration = 1000;
    const steps = 30;
    const stepVal = Math.round(levelTotal / steps);
    let current = 0;

    const interval = setInterval(() => {
      current += stepVal;
      if (current >= levelTotal) {
        setDisplayedTotal(levelTotal);
        clearInterval(interval);
      } else {
        setDisplayedTotal(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [levelTotal]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <div className="w-full bg-stone-900/95 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-3">
          <GaneshaLogo size="md" />
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter {levelId} Complete</span>
        </div>

        <h2 className="text-2xl font-bold font-cinzel text-amber-100 mb-1">
          {levelTitle}
        </h2>
        <p className="text-xs text-stone-400">
          Wisdom acquired, duty fulfilled, knowledge verified!
        </p>

        {/* Big Total Counter */}
        <div className="my-6 py-4 px-6 rounded-2xl bg-gradient-to-b from-amber-950/40 to-stone-950/90 border border-amber-500/30 shadow-inner">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
            Chapter Score Earned
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-cinzel text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] my-1">
            +{displayedTotal.toLocaleString()}
          </div>
          <span className="text-xs text-stone-400">
            Journey Total So Far: <span className="font-bold text-amber-200">{(totalScoreSoFar + levelTotal).toLocaleString()} PTS</span>
          </span>
        </div>

        {/* Score Breakdown Table */}
        <div className="space-y-2 mb-6 text-left">
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-200 block">Interactive Gameplay</span>
                <span className="text-[10px] text-stone-400">Challenge execution & problem solving</span>
              </div>
            </div>
            <span className="text-sm font-bold font-cinzel text-amber-300">
              +{gameplayScore} / 700
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-200 block">Chapter Wisdom Quiz</span>
                <span className="text-[10px] text-stone-400">Traditional story & context accuracy</span>
              </div>
            </div>
            <span className="text-sm font-bold font-cinzel text-amber-300">
              +{quizScore} / 300
            </span>
          </div>

          {bonusScore > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950/70 border border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-yellow-200 block">Wisdom & Speed Bonuses</span>
                  <span className="text-[10px] text-stone-400">Flawless quiz, time efficiency & precision</span>
                </div>
              </div>
              <span className="text-sm font-bold font-cinzel text-yellow-300">
                +{bonusScore} PTS
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          id="reveal-wisdom-card-btn"
          onClick={onProceedToWisdom}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold font-cinzel text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Star className="w-4 h-4 fill-stone-950" />
          <span>Reveal Sacred Wisdom Card</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full mt-4">
        <Character
          expression="blessing"
          dialogue={`Congratulations on completing Chapter ${levelId}! You have upheld duty and gained sacred insights.`}
          mini
        />
      </div>
    </div>
  );
};
