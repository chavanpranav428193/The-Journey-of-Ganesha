import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, BookOpen, RotateCcw, Sparkles, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { Character } from './Character';
import { getRankTier } from '../data/gameData';
import { soundService } from '../services/audioService';

interface FinalScoreScreenProps {
  playerName: string;
  totalScore: number;
  totalTimeElapsed: number;
  unlockedAchievementsCount: number;
  unlockedWisdomCardsCount: number;
  onViewCertificate: () => void;
  onViewWisdomCollection: () => void;
  onViewLeaderboard: () => void;
  onReplay: () => void;
}

export const FinalScoreScreen: React.FC<FinalScoreScreenProps> = ({
  playerName,
  totalScore,
  totalTimeElapsed,
  unlockedAchievementsCount,
  unlockedWisdomCardsCount,
  onViewCertificate,
  onViewWisdomCollection,
  onViewLeaderboard,
  onReplay
}) => {
  useEffect(() => {
    soundService.playLevelComplete();

    // Trigger celebratory confetti burst!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f97316', '#ef4444', '#10b981']
      });
    } catch {
      // ignore
    }
  }, []);

  const tier = getRankTier(totalScore);
  const mins = Math.floor(totalTimeElapsed / 60);
  const secs = totalTimeElapsed % 60;
  const timeFormatted = `${mins}m ${secs}s`;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center animate-fade-in text-stone-100">
      {/* Central Hero Shrine */}
      <div className="relative w-full bg-gradient-to-b from-amber-950/80 via-stone-900/95 to-amber-950/90 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(245,158,11,0.3)] text-center">
        {/* Divine Character Blessing */}
        <div className="mb-4">
          <Character expression="joyful" size="md" showAura={true} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest font-cinzel mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sacred Pilgrimage Accomplished</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-cinzel text-amber-100 tracking-wide">
          🎉 JOURNEY COMPLETED!
        </h1>

        <p className="text-sm text-stone-300 mt-1 font-medium">
          Pilgrim: <strong className="text-amber-300 font-cinzel">{playerName || 'Pranav Shahaji Chavan'}</strong>
        </p>

        {/* Big Score Card */}
        <div className="my-6 p-6 rounded-2xl bg-stone-950/80 border-2 border-amber-500/50 max-w-md mx-auto shadow-inner">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel block">
            Cumulative Wisdom Score
          </span>
          <div className="text-4xl sm:text-5xl font-black font-cinzel text-amber-200 mt-1">
            {totalScore.toLocaleString()} <span className="text-base text-stone-400 font-normal">/ 10,000</span>
          </div>

          {/* Performance Classification Badge */}
          <div className="mt-3 pt-3 border-t border-amber-500/30 flex items-center justify-center gap-2">
            <span className="text-2xl">{tier.emoji}</span>
            <span className="text-base font-extrabold font-cinzel text-amber-300">
              {tier.title}
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">{tier.desc}</p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mx-auto text-left mb-6">
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Chapters</span>
            <span className="text-base font-bold text-amber-100 font-cinzel">5 / 5 Complete</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Wisdom Cards</span>
            <span className="text-base font-bold text-amber-100 font-cinzel">{unlockedWisdomCardsCount} / 5 Collected</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Achievements</span>
            <span className="text-base font-bold text-amber-100 font-cinzel">{unlockedAchievementsCount} Badges</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Pilgrimage Time</span>
            <span className="text-base font-bold text-amber-100 font-mono">{timeFormatted}</span>
          </div>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto">
          <button
            id="final-generate-certificate-btn"
            onClick={() => {
              soundService.playClick();
              onViewCertificate();
            }}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Generate Certificate</span>
          </button>

          <button
            id="final-view-wisdom-btn"
            onClick={() => {
              soundService.playClick();
              onViewWisdomCollection();
            }}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-stone-900 border border-amber-500/40 hover:bg-stone-800 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Wisdom Cards</span>
          </button>

          <button
            id="final-view-leaderboard-btn"
            onClick={() => {
              soundService.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-stone-900 border border-amber-500/40 hover:bg-stone-800 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
          </button>
        </div>

        {/* Replay Option */}
        <div className="mt-6 pt-4 border-t border-amber-500/20">
          <button
            id="replay-journey-btn"
            onClick={() => {
              soundService.playClick();
              onReplay();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Journey Again to Perfect Score</span>
          </button>
        </div>
      </div>
    </div>
  );
};
