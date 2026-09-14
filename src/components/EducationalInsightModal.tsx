import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Award } from 'lucide-react';
import { LevelConfig, WisdomCardData } from '../types';
import { Character } from './Character';
import { AiStoryLessonButton } from './AiStoryLessonButton';
import { soundService } from '../services/audioService';

interface EducationalInsightModalProps {
  level: LevelConfig;
  wisdomCard: WisdomCardData;
  earnedScore: number;
  onProceedToQuiz: () => void;
  onOpenAiLesson?: () => void;
}

export const EducationalInsightModal: React.FC<EducationalInsightModalProps> = ({
  level,
  wisdomCard,
  earnedScore,
  onProceedToQuiz,
  onOpenAiLesson
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center animate-fade-in text-stone-100">
      <div className="relative w-full bg-gradient-to-b from-stone-900/95 to-amber-950/95 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest font-cinzel mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Challenge Completed (+{earnedScore.toLocaleString()} pts)</span>
        </div>

        <div className="mb-3">
          <Character expression="joyful" size="sm" showAura={true} />
        </div>

        <h2 className="text-2xl font-black font-cinzel text-amber-100">
          {level.educationalInsight.title}
        </h2>

        {/* Core Educational Summary */}
        <div className="my-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-left">
          <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
            Traditional Understanding
          </span>
          <p className="text-sm font-semibold text-amber-100 mt-1 leading-relaxed">
            "{level.educationalInsight.summary}"
          </p>
        </div>

        {/* Cultural Lore & Modern Takeaway */}
        <div className="space-y-2 text-xs text-stone-300 text-left bg-stone-950/60 p-4 rounded-2xl border border-stone-800 mb-4">
          <p className="leading-relaxed">
            <strong className="text-amber-300 font-cinzel">Cultural Context: </strong>
            {level.educationalInsight.culturalContext}
          </p>
          <p className="leading-relaxed pt-2 border-t border-stone-800">
            <strong className="text-emerald-300 font-cinzel">Living Value: </strong>
            {level.educationalInsight.modernTakeaway}
          </p>
        </div>

        {/* AI Story Lesson Exploration Button */}
        {onOpenAiLesson && (
          <div className="my-3">
            <AiStoryLessonButton onClick={onOpenAiLesson} />
          </div>
        )}

        {/* Next Button: Proceed to Quiz */}
        <div className="mt-5 flex justify-center">
          <button
            id="proceed-to-quiz-btn"
            onClick={() => {
              soundService.playClick();
              onProceedToQuiz();
            }}
            className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 active:scale-95 transition-all"
          >
            <span>Take Chapter Knowledge Check (3 Questions)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
