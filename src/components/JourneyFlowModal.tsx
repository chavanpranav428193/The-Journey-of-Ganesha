import React from 'react';
import { X, Sparkles, BookOpen, Play, CheckCircle2, RotateCcw, Award, ShieldCheck, Trophy, ArrowDown, ChevronRight, Star } from 'lucide-react';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface JourneyFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevelId: number;
  unlockedLevelsCount: number;
  wisdomCardsCount: number;
  achievementsCount: number;
  hasCompletedJourney: boolean;
  onSelectLevel?: (levelId: number) => void;
  onOpenAiGuide?: () => void;
  onViewWisdom?: () => void;
  onViewCertificate?: () => void;
  onViewLeaderboard?: () => void;
}

export const JourneyFlowModal: React.FC<JourneyFlowModalProps> = ({
  isOpen,
  onClose,
  currentLevelId,
  unlockedLevelsCount,
  wisdomCardsCount,
  achievementsCount,
  hasCompletedJourney,
  onSelectLevel,
  onOpenAiGuide,
  onViewWisdom,
  onViewCertificate,
  onViewLeaderboard
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-stone-900 via-[#180e07] to-[#120703] border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl text-stone-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-journey-flow-modal-btn"
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors z-20"
          aria-label="Close Architecture Map"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <span className="text-2xl mb-1">🪷</span>
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel">
            The Sacred Progression Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-amber-100 mt-1">
            THE JOURNEY OF GANESHA
          </h2>
          <p className="text-xs text-amber-200/80 italic font-serif mt-1">
            "Experience sacred wisdom through storytelling, divine action, and virtue testing."
          </p>
        </div>

        {/* Visual Progression Map / Architecture Flow */}
        <div className="flex flex-col items-center space-y-3 font-sans text-xs">
          {/* ROOT: THE JOURNEY OF GANESHA */}
          <div className="w-full max-w-md p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-amber-500/20 border-2 border-amber-400/60 text-center shadow-lg">
            <span className="font-extrabold font-cinzel text-amber-100 text-sm tracking-wider uppercase flex items-center justify-center gap-2">
              <span>🪷</span>
              <span>The Journey of Ganesha</span>
              <span>🪷</span>
            </span>
            <span className="text-[10px] text-stone-300 block mt-0.5">
              Current Progress: Chapter {currentLevelId} of 5 ({unlockedLevelsCount}/5 unlocked)
            </span>
          </div>

          {/* Central Stem Down */}
          <div className="w-0.5 h-5 bg-amber-400/60" />

          {/* DUAL BRANCH: STORY vs PLAY */}
          <div className="relative w-full max-w-lg">
            {/* Top Branching Line */}
            <div className="hidden sm:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-amber-400/60" />
            <div className="hidden sm:block absolute top-0 left-1/4 w-0.5 h-3 bg-amber-400/60" />
            <div className="hidden sm:block absolute top-0 right-1/4 w-0.5 h-3 bg-amber-400/60" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Left Branch: STORY -> AI STORY GUIDE */}
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-amber-500/40 text-center flex flex-col justify-between shadow-md">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block mb-1">
                    Branch A
                  </span>
                  <h4 className="font-black text-amber-100 font-cinzel text-sm flex items-center justify-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>STORY</span>
                  </h4>
                  <div className="w-0.5 h-3 bg-amber-400/40 mx-auto my-1.5" />
                  <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-stone-200">
                    <strong className="text-amber-300 block font-cinzel text-xs mb-0.5">
                      ✨ AI STORY GUIDE
                    </strong>
                    Sacred lore, character symbolism, chronological timeline & Q&A
                  </div>
                </div>

                {onOpenAiGuide && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onClose();
                      onOpenAiGuide();
                    }}
                    className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Open Story Guide
                  </button>
                )}
              </div>

              {/* Right Branch: PLAY -> GAMEPLAY CHALLENGE */}
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-amber-500/40 text-center flex flex-col justify-between shadow-md">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block mb-1">
                    Branch B
                  </span>
                  <h4 className="font-black text-amber-100 font-cinzel text-sm flex items-center justify-center gap-1.5">
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                    <span>PLAY</span>
                  </h4>
                  <div className="w-0.5 h-3 bg-amber-400/40 mx-auto my-1.5" />
                  <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-stone-200">
                    <strong className="text-amber-300 block font-cinzel text-xs mb-0.5">
                      GAMEPLAY CHALLENGE
                    </strong>
                    Interactive challenge: Sculpting, Guarding, Wisdom circuit, Visarjan
                  </div>
                </div>

                {onSelectLevel && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onClose();
                      onSelectLevel(currentLevelId);
                    }}
                    className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Play Chapter {currentLevelId}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Convergence Stem */}
          <div className="w-0.5 h-5 bg-amber-400/60" />

          {/* CONVERGENCE: LEARN BY DOING */}
          <div className="w-full max-w-sm p-2.5 rounded-xl bg-amber-950/50 border border-amber-400/40 text-center">
            <span className="font-bold text-amber-200 font-cinzel text-xs uppercase tracking-wider block">
              ✦ LEARN BY DOING ✦
            </span>
            <span className="text-[10px] text-stone-300">
              Actions reinforce virtue, respect for parents, and cultural purpose
            </span>
          </div>

          <div className="w-0.5 h-4 bg-amber-400/60" />

          {/* QUIZ STEP */}
          <div className="w-full max-w-sm p-3 rounded-2xl bg-stone-950/90 border-2 border-amber-500/50 text-center shadow-md">
            <span className="font-black text-amber-100 font-cinzel text-sm uppercase tracking-wider flex items-center justify-center gap-1.5">
              <span>📖</span>
              <span>CHAPTER QUIZ</span>
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5">
              3 Questions testing story recall, wisdom meaning, and virtue
            </span>

            {/* Sub-branches: PASS vs RETRY */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-amber-500/20">
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                <span className="font-bold text-[11px] block text-emerald-300">PASS (2/3+)</span>
                <span className="text-[10px] text-stone-300">Unlocks Rewards</span>
              </div>
              <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                <span className="font-bold text-[11px] block text-rose-300">RETRY (&lt;2/3)</span>
                <span className="text-[10px] text-stone-300">Review & Retake</span>
              </div>
            </div>
          </div>

          <div className="w-0.5 h-4 bg-amber-400/60" />

          {/* REWARDS: SCORE + XP */}
          <div className="w-full max-w-sm p-2.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="font-bold text-amber-300 font-cinzel text-xs uppercase tracking-wider">
              SCORE + XP (+1,000 PTS & BONUSES)
            </span>
          </div>

          <div className="w-0.5 h-4 bg-amber-400/60" />

          {/* WISDOM CARD */}
          <div className="w-full max-w-sm p-2.5 rounded-xl bg-amber-950/50 border border-amber-400/50 text-center flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-amber-100 font-cinzel text-xs">
                SACRED WISDOM CARD
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono">
              {wisdomCardsCount} / 5 Collected
            </span>
          </div>

          <div className="w-0.5 h-4 bg-amber-400/60" />

          {/* NEXT LEVEL */}
          <div className="w-full max-w-sm p-2 rounded-lg bg-stone-900 border border-stone-700 text-center text-[11px] text-stone-300">
            <span>NEXT LEVEL (Chapters 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5)</span>
          </div>

          <div className="w-0.5 h-4 bg-amber-400/60" />

          {/* LEVEL 5 COMPLETE CLIMAX */}
          <div className="w-full max-w-md p-4 rounded-2xl bg-gradient-to-b from-amber-950/70 via-stone-900 to-amber-950/90 border-2 border-amber-400/70 text-center shadow-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>🎉</span>
              <span>LEVEL 5 COMPLETE</span>
            </div>

            {/* Sequential Climax Progression */}
            <div className="space-y-1.5 mt-1">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-950/70 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-200 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>🏆 ACHIEVEMENTS</span>
                </span>
                <span className="text-[10px] text-stone-400">{achievementsCount} Unlocked</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-950/70 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CERTIFICATE</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {hasCompletedJourney ? 'Certified' : 'At Chapter 5'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-950/70 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>LEADERBOARD</span>
                </span>
                <span className="text-[10px] text-stone-400">Global & Local</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-950/70 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-200 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                  <span>PLAY AGAIN</span>
                </span>
                <span className="text-[10px] text-stone-400">Replay for Higher Mastery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
          <span className="text-[11px] text-stone-400 font-serif italic">
            "Duty, Wisdom, and Devotion guide the pilgrim."
          </span>
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
          >
            Continue Game
          </button>
        </div>
      </div>
    </div>
  );
};
