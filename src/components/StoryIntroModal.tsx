import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Play } from 'lucide-react';
import { LevelConfig } from '../types';
import { Character } from './Character';
import { soundService } from '../services/audioService';
import { useI18n } from '../i18n/LanguageContext';

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
  const { t, getLevelData } = useI18n();
  const localizedData = getLevelData(level.id);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center animate-fade-in text-stone-100">
      <div className="relative w-full bg-gradient-to-b from-stone-900/95 via-[#180e07] to-amber-950/95 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-8 shadow-2xl text-center">
        {/* Level Emoji & Title */}
        <div className="mb-2">
          <Character expression="wise" size="sm" showAura={true} />
        </div>

        <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel">
          {t.common.level} {level.id} • {localizedData.title}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-amber-100 mt-0.5">
          {localizedData.storyIntro.title}
        </h2>

        {/* Narrative Paragraphs */}
        <div className="my-4 space-y-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl mx-auto font-sans text-left bg-stone-950/70 p-4 rounded-2xl border border-amber-500/20">
          {localizedData.storyIntro.narrative.map((para, idx) => (
            <p key={idx} className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5 shrink-0">✦</span>
              <span>{para}</span>
            </p>
          ))}
        </div>

        {/* Ganesha Guide Quote */}
        <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-400/30 text-center max-w-xl mx-auto mb-5">
          <span className="text-[10px] uppercase font-bold text-amber-300 font-cinzel block">
            {t.storyIntro.ganeshaReflection}
          </span>
          <p className="text-xs sm:text-sm text-amber-100 italic font-serif mt-0.5 leading-snug">
            "{localizedData.storyIntro.ganeshaQuote}"
          </p>
        </div>

        {/* Dual Branching Pathways: STORY vs PLAY */}
        <div className="mb-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 font-cinzel">
            {t.storyIntro.chooseSacredEntry}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto mb-4">
          {/* Left Branch: STORY -> ✨ AI STORY GUIDE */}
          <div className="relative group p-4 rounded-2xl bg-gradient-to-b from-stone-950 to-amber-950/40 border-2 border-amber-500/40 hover:border-amber-400 transition-all text-left flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 font-cinzel bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {t.common.story}
                </span>
                <span className="text-sm">🪔</span>
              </div>
              <h3 className="font-bold text-sm text-amber-100 font-cinzel flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.storyIntro.aiStoryGuideTitle}</span>
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                {t.storyIntro.aiStoryGuideDesc}
              </p>
            </div>

            <button
              id="story-intro-open-ai-guide-btn"
              onClick={() => {
                soundService.playClick();
                onOpenAiLesson();
              }}
              className="mt-3.5 w-full py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.storyIntro.exploreAiStoryGuide}</span>
            </button>
          </div>

          {/* Right Branch: PLAY -> GAMEPLAY CHALLENGE */}
          <div className="relative group p-4 rounded-2xl bg-gradient-to-b from-stone-950 to-amber-950/40 border-2 border-amber-500/40 hover:border-amber-400 transition-all text-left flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 font-cinzel bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {t.common.play}
                </span>
                <span className="text-sm">⚡</span>
              </div>
              <h3 className="font-bold text-sm text-amber-100 font-cinzel flex items-center gap-1.5">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                <span>{t.storyIntro.gameplayChallengeTitle}</span>
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                {t.storyIntro.gameplayChallengeDesc}
              </p>
            </div>

            <button
              id="start-chapter-gameplay-btn"
              onClick={() => {
                soundService.playClick();
                onStartGameplay();
              }}
              className="mt-3.5 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-98"
            >
              <span>{t.storyIntro.beginGameplay}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Convergence Pathway Banner */}
        <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/25 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-300 text-xs">
          <div className="flex items-center gap-2 text-left">
            <span className="text-amber-400 text-sm">✦</span>
            <span>
              <strong className="text-amber-200">{t.common.learnByDoing}:</strong> {t.storyIntro.learnByDoingDesc}
            </span>
          </div>
          <span className="text-[11px] text-amber-400/80 font-mono shrink-0">
            {t.storyIntro.flowSummary}
          </span>
        </div>
      </div>
    </div>
  );
};
