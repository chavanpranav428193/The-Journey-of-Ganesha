import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LevelConfig } from '../types';
import { Character } from './Character';
import { AiStoryLessonButton } from './AiStoryLessonButton';
import { soundService } from '../services/audioService';

interface StoryIntroModalProps {
  level: LevelConfig;
  onStartGameplay: () => void;
  onOpenAiLesson: () => void;
}

export const StoryIntroModal: React.FC<StoryIntroModalProps> = ({
  level,
  onStartGameplay,
  onOpenAiLesson
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center animate-fade-in text-stone-100">
      <div className="relative w-full bg-gradient-to-b from-stone-900/95 to-amber-950/95 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Level Emoji & Title */}
        <div className="mb-3">
          <Character expression="wise" size="sm" showAura={true} />
        </div>

        <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel">
          Chapter {level.id} • {level.title}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-amber-100 mt-1">
          {level.storyIntro.title}
        </h2>

        {/* Narrative Paragraphs */}
        <div className="my-5 space-y-3 text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl mx-auto font-sans text-left bg-stone-950/60 p-4 rounded-2xl border border-amber-500/20">
          {level.storyIntro.narrative.map((para, idx) => (
            <p key={idx} className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5 shrink-0">✦</span>
              <span>{para}</span>
            </p>
          ))}
        </div>

        {/* Ganesha Guide Quote */}
        <div className="p-3.5 rounded-2xl bg-amber-950/50 border border-amber-400/40 text-center max-w-lg mx-auto mb-5">
          <span className="text-[10px] uppercase font-bold text-amber-300 font-cinzel block">
            Ganesha’s Reflection
          </span>
          <p className="text-xs sm:text-sm text-amber-100 italic font-serif mt-1 leading-snug">
            "{level.storyIntro.ganeshaQuote}"
          </p>
        </div>

        {/* Prominent AI Story Lesson Feature Card Button */}
        <div className="my-3">
          <AiStoryLessonButton onClick={onOpenAiLesson} />
        </div>

        {/* Start Gameplay Action */}
        <div className="mt-5 flex justify-center">
          <button
            id="start-chapter-gameplay-btn"
            onClick={() => {
              soundService.playClick();
              onStartGameplay();
            }}
            className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 active:scale-95 transition-all"
          >
            <span>Begin Chapter Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
