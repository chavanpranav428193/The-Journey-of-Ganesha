import React from 'react';
import { Lock, Star, ChevronRight, Sparkles, Trophy } from 'lucide-react';
import { LEVELS } from '../data/gameData';
import { Character } from './Character';
import { GaneshaLogo } from './GaneshaLogo';
import { soundService } from '../services/audioService';

interface LevelSelectorProps {
  unlockedLevels: number[];
  levelScores: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
  onOpenAiLesson?: (levelId: number) => void;
  onBackToMenu: () => void;
  playerName: string;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  unlockedLevels,
  levelScores,
  onSelectLevel,
  onOpenAiLesson,
  onBackToMenu,
  playerName
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center animate-fade-in">
      {/* Top Header */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="mb-2">
          <GaneshaLogo size="md" showGlow={true} animate={true} alt="Lord Ganesha Guide" />
        </div>
        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-widest font-cinzel mb-1">
          <Sparkles className="w-4 h-4" />
          <span>The Sacred Odyssey</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-amber-100">
          Chapters of Wisdom
        </h2>
        <p className="text-xs text-stone-300 mt-1 max-w-md mx-auto">
          Welcome, {playerName || 'Pilgrim'}. Choose an unlocked chapter to explore the story, solve challenges, and gather divine wisdom.
        </p>
      </div>

      {/* Chapters Grid / Vertical Timeline */}
      <div className="w-full space-y-4 max-w-2xl">
        {LEVELS.map((lvl, index) => {
          const isUnlocked = unlockedLevels.includes(lvl.id);
          const isCompleted = unlockedLevels.includes(lvl.id + 1) || (lvl.id === 5 && isUnlocked && levelScores[5] > 0);
          const score = levelScores[lvl.id] || 0;

          return (
            <div
              key={lvl.id}
              className={`relative p-5 rounded-3xl border-2 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isUnlocked
                  ? 'bg-gradient-to-r from-stone-900/90 via-amber-950/70 to-stone-900/90 border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-101'
                  : 'bg-stone-900/50 border-stone-800 opacity-65'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-stone-800 text-stone-500'
                  }`}
                >
                  {isUnlocked ? lvl.emoji : <Lock className="w-6 h-6 text-stone-500" />}
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel">
                      Chapter {lvl.id}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                        Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-cinzel text-amber-100 mt-0.5">
                    {lvl.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5 font-sans">{lvl.subtitle}</p>

                  {score > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-1 font-semibold">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Best: {score.toLocaleString()} pts</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Action */}
              <div className="shrink-0 w-full sm:w-auto flex flex-col gap-2">
                <button
                  id={`select-chapter-${lvl.id}`}
                  disabled={!isUnlocked}
                  onClick={() => {
                    soundService.playClick();
                    onSelectLevel(lvl.id);
                  }}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-md active:scale-95'
                      : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <span>{isCompleted ? 'Replay Chapter' : isUnlocked ? 'Enter Chapter' : 'Locked'}</span>
                  {isUnlocked && <ChevronRight className="w-4 h-4" />}
                </button>

                {isUnlocked && onOpenAiLesson && (
                  <button
                    id={`open-ai-lesson-${lvl.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundService.playClick();
                      onOpenAiLesson(lvl.id);
                    }}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95"
                    title="Read the chapter story and sacred lore"
                  >
                    <span>📖 Story & Lore</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back to Home Button */}
      <div className="mt-8">
        <button
          id="back-to-main-menu-btn"
          onClick={() => {
            soundService.playClick();
            onBackToMenu();
          }}
          className="px-5 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          ← Return to Main Screen
        </button>
      </div>
    </div>
  );
};
