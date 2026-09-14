import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, BookOpen, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import { Character } from './Character';
import { getRankTier } from '../data/gameData';
import { soundService } from '../services/audioService';
import { useI18n } from '../i18n/LanguageContext';

interface FinalScoreScreenProps {
  playerName: string;
  totalScore: number;
  totalTimeElapsed: number;
  unlockedAchievementsCount: number;
  unlockedWisdomCardsCount: number;
  onViewAchievements: () => void;
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
  onViewAchievements,
  onViewCertificate,
  onViewWisdomCollection,
  onViewLeaderboard,
  onReplay
}) => {
  const { t } = useI18n();

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
          <span>{t.finalScore.sacredAccomplishment}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-cinzel text-amber-100 tracking-wide">
          🎉 {t.finalScore.title}
        </h1>

        <p className="text-sm text-stone-300 mt-1 font-medium">
          {t.common.pilgrim}: <strong className="text-amber-300 font-cinzel">{playerName || 'Pranav Shahaji Chavan'}</strong>
        </p>

        {/* Big Score Card */}
        <div className="my-6 p-6 rounded-2xl bg-stone-950/80 border-2 border-amber-500/50 max-w-md mx-auto shadow-inner">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel block">
            {t.finalScore.cumulativeScore}
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
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">{t.finalScore.chaptersCompleted}</span>
            <span className="text-base font-bold text-amber-100 font-cinzel">5 / 5 {t.common.completed}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">{t.finalScore.wisdomCardsCollected}</span>
            <span className="text-base font-bold text-amber-100 font-cinzel">{unlockedWisdomCardsCount} / 5</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">{t.finalScore.achievementsBadge}</span>
            <span className="text-base font-bold text-amber-100 font-cinzel">{unlockedAchievementsCount} {t.common.badges}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">{t.finalScore.pilgrimageTime}</span>
            <span className="text-base font-bold text-amber-100 font-mono">{timeFormatted}</span>
          </div>
        </div>

        {/* Primary Call to Actions: ACHIEVEMENTS -> CERTIFICATE -> LEADERBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mx-auto">
          <button
            id="final-view-achievements-btn"
            onClick={() => {
              soundService.playClick();
              onViewAchievements();
            }}
            className="py-3 px-4 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>🏆 {t.finalScore.viewBadges}</span>
          </button>

          <button
            id="final-generate-certificate-btn"
            onClick={() => {
              soundService.playClick();
              onViewCertificate();
            }}
            className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t.finalScore.generateCertificate}</span>
          </button>

          <button
            id="final-view-leaderboard-btn"
            onClick={() => {
              soundService.playClick();
              onViewLeaderboard();
            }}
            className="py-3 px-4 rounded-2xl bg-stone-900 border border-amber-500/40 hover:bg-stone-800 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t.finalScore.viewLeaderboard}</span>
          </button>
        </div>

        {/* Companion Collection Link */}
        <div className="mt-4 flex items-center justify-center">
          <button
            id="final-view-wisdom-btn"
            onClick={() => {
              soundService.playClick();
              onViewWisdomCollection();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-200 transition-colors font-medium"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.wisdomCards.title} (5/5)</span>
          </button>
        </div>

        {/* Replay Option: PLAY AGAIN */}
        <div className="mt-5 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-400">
            Journey Completed • All Chapters Unlocked
          </span>
          <button
            id="replay-journey-btn"
            onClick={() => {
              soundService.playClick();
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-xs font-bold text-amber-200 hover:text-white transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.finalScore.replayJourney}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
