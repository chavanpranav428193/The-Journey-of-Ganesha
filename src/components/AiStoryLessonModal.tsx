import React, { useState } from 'react';
import {
  Sparkles,
  X,
  BookOpen,
  HelpCircle,
  History,
  Users,
  Lightbulb,
  Heart,
  ChevronDown,
  ChevronUp,
  Send,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AI_STORY_LESSONS, answerStoryLessonQuery } from '../data/aiStoryLessons';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface AiStoryLessonModalProps {
  isOpen: boolean;
  levelId: number;
  onClose: () => void;
  onContinueLevel?: () => void;
}

export const AiStoryLessonModal: React.FC<AiStoryLessonModalProps> = ({
  isOpen,
  levelId,
  onClose,
  onContinueLevel
}) => {
  const lesson = AI_STORY_LESSONS[levelId] || AI_STORY_LESSONS[1];

  const [activeTab, setActiveTab] = useState<'museum' | 'ask'>('museum');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customQuery, setCustomQuery] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ q: string; a: string; time: string }>>([
    {
      q: lesson.suggestedQuestions[0]?.question || 'What is this story about?',
      a: lesson.suggestedQuestions[0]?.answer || lesson.storySummary,
      time: 'Just now'
    }
  ]);
  const [isAnswering, setIsAnswering] = useState(false);

  if (!isOpen) return null;

  const handleSelectSuggestedQuestion = (q: string, a: string) => {
    soundService.playClick();
    setSelectedQuestion(q);
    // Add to chat log if not already there
    setChatLog((prev) => [
      ...prev,
      {
        q,
        a,
        time: 'Just now'
      }
    ]);
    setActiveTab('ask');
  };

  const handleAskCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    soundService.playClick();
    const query = customQuery.trim();
    setCustomQuery('');
    setIsAnswering(true);

    setTimeout(() => {
      const answer = answerStoryLessonQuery(levelId, query);
      setChatLog((prev) => [
        ...prev,
        {
          q: query,
          a: answer,
          time: 'Just now'
        }
      ]);
      setIsAnswering(false);
      soundService.playCorrect();
    }, 400);
  };

  const handleContinue = () => {
    soundService.playClick();
    onClose();
    if (onContinueLevel) {
      onContinueLevel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-stone-900 via-stone-950 to-[#120803] border-2 border-amber-500/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Subtle Ambient Light particles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 bg-stone-950/90 border-b border-amber-500/30 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel">
                  {lesson.chapterBadge} • {lesson.levelTitle}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 font-serif">
                  Sacred Lore & Heritage
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black font-cinzel text-amber-100 flex items-center gap-2">
                Storybook & Meaning
              </h2>
            </div>
          </div>

          {/* Close / Back to Game Button */}
          <button
            id="close-ai-story-lesson-btn"
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Close Story Lesson"
          >
            <span className="hidden sm:inline">Back to Game</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Tab Selector */}
        <div className="relative z-10 px-4 sm:px-6 pt-3 pb-2 bg-stone-950/60 border-b border-amber-500/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              id="ai-lesson-tab-museum-btn"
              onClick={() => {
                soundService.playClick();
                setActiveTab('museum');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'museum'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Illustrated Storybook</span>
            </button>
            <button
              id="ai-lesson-tab-ask-btn"
              onClick={() => {
                soundService.playClick();
                setActiveTab('ask');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'ask'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask About Lore & Symbols</span>
              {chatLog.length > 1 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-stone-950/60 text-amber-200 rounded-full">
                  {chatLog.length}
                </span>
              )}
            </button>
          </div>

          <span className="text-[11px] text-amber-300/80 font-serif italic hidden md:block">
            "Discover the deep wisdom behind this chapter"
          </span>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-stone-200">
          {/* Animated Welcoming Character & Hook */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900/80 to-amber-950/60 border border-amber-500/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="shrink-0 animate-bounce">
              <Character expression="wise" size="md" showAura={true} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel">
                Sacred Lore & Heritage Exploration
              </span>
              <h3 className="text-base sm:text-lg font-bold font-cinzel text-amber-100 mt-0.5">
                {lesson.hookQuestion}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {lesson.storySummary}
              </p>
            </div>
          </div>

          {activeTab === 'museum' ? (
            <>
              {/* 1. The Story */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-amber-300">
                    1. The Sacred Narrative
                  </h4>
                </div>
                <div className="space-y-3 bg-stone-950/70 p-4 sm:p-5 rounded-2xl border border-amber-500/20 text-xs sm:text-sm leading-relaxed">
                  {lesson.storyNarrative.map((p, idx) => (
                    <p key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold mt-0.5">✦</span>
                      <span>{p}</span>
                    </p>
                  ))}
                </div>
              </section>

              {/* 2. What Happened? (Timeline) */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <History className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-amber-300">
                    2. What Happened? (Key Sequence)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.timeline.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-900/80 border border-amber-500/25 flex items-start gap-3 hover:border-amber-400/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-base shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-amber-400">
                            STEP {item.step}
                          </span>
                          <span className="text-xs font-bold text-amber-100">{item.title}</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-stone-300 mt-1 leading-snug">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Who Are the Characters? */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-amber-300">
                    3. Characters & Key Figures
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {lesson.characters.map((char, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-900/80 border border-amber-500/25 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-2xl mb-1.5">{char.symbol}</div>
                        <h5 className="text-xs sm:text-sm font-bold text-amber-200">{char.name}</h5>
                        <span className="text-[10px] text-amber-400 font-mono block">
                          {char.role}
                        </span>
                        <p className="text-[11px] text-stone-300 mt-1.5 leading-relaxed">
                          {char.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Meaning & Symbolism */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-amber-300">
                    4. Sacred Meaning & Symbolism
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {lesson.symbolism.map((sym, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex flex-col"
                    >
                      <span className="text-xs font-bold text-amber-200">{sym.symbol}</span>
                      <span className="text-[10px] text-amber-400 font-semibold mt-0.5">
                        → {sym.meaning}
                      </span>
                      <p className="text-[11px] text-stone-300 mt-1.5 leading-relaxed">
                        {sym.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Cultural / Historical Context */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-emerald-300">
                    5. Cultural & Historical Context
                  </h4>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 space-y-2 text-xs sm:text-sm text-stone-200">
                  <p className="leading-relaxed">
                    <strong className="text-emerald-300">Puranic Tradition & History:</strong>{' '}
                    {lesson.culturalContext.traditionVsHistory}
                  </p>
                  <div className="p-2.5 rounded-xl bg-stone-900/80 border border-emerald-500/20 text-[11px] text-emerald-200/90 italic font-mono">
                    ℹ️ {lesson.culturalContext.regionalVariationsNote}
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed">
                    {lesson.culturalContext.details}
                  </p>
                </div>
              </section>

              {/* 6. Did You Know? */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-amber-300">
                    6. Did You Know?
                  </h4>
                </div>
                <div className="space-y-2">
                  {lesson.didYouKnow.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-900/60 border border-amber-500/20 flex items-start gap-2.5 text-xs text-stone-200"
                    >
                      <span className="text-amber-400 text-sm">💡</span>
                      <span className="leading-relaxed">{fact}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Why This Matters */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-1.5">
                  <Heart className="w-4 h-4 text-orange-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider font-cinzel text-orange-300">
                    7. Why This Matters Today
                  </h4>
                </div>
                <div className="p-4 rounded-2xl bg-orange-950/30 border border-orange-500/30 space-y-1.5">
                  <p className="text-xs sm:text-sm font-bold text-amber-100">
                    {lesson.whyThisMatters.keyMessage}
                  </p>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {lesson.whyThisMatters.modernApplication}
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Interactive Q&A Area */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-amber-500/30">
                <span className="text-xs font-bold text-amber-300 block mb-2 font-cinzel">
                  💡 Suggested Questions (Click to read verified answer):
                </span>
                <div className="flex flex-wrap gap-2">
                  {lesson.suggestedQuestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSuggestedQuestion(item.question, item.answer)}
                      className="text-left text-xs px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 hover:border-amber-400 text-amber-200 transition-all active:scale-95"
                    >
                      ✦ {item.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Log */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto p-2">
                {chatLog.map((entry, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {/* Player Query */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] px-3.5 py-2 rounded-2xl bg-amber-500 text-stone-950 text-xs font-semibold shadow-md">
                        {entry.q}
                      </div>
                    </div>

                    {/* AI Verified Answer */}
                    <div className="flex justify-start items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-sm">
                        🪔
                      </div>
                      <div className="max-w-[88%] px-4 py-3 rounded-2xl bg-stone-900/90 border border-amber-500/25 text-xs text-stone-200 leading-relaxed space-y-1.5">
                        <p>{entry.a}</p>
                        <span className="text-[10px] text-amber-300/70 block font-serif italic">
                          From Chapter {levelId} traditional lore & teachings
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isAnswering && (
                  <div className="flex items-center gap-2 text-xs text-amber-300 animate-pulse px-2">
                    <span>🪔</span>
                    <span className="font-serif italic">Gathering wisdom from the chapter chronicles...</span>
                  </div>
                )}
              </div>

              {/* Custom Input Form */}
              <form onSubmit={handleAskCustomQuery} className="pt-2">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-950 border border-amber-500/40">
                  <input
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Ask a question about this story, sacred symbols, or history..."
                    className="flex-1 bg-transparent px-3 py-2 text-xs text-stone-100 placeholder-stone-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!customQuery.trim() || isAnswering}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Ask</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-amber-200/70 mt-1.5 px-2 font-serif italic">
                  Answers reflect traditional puranic lore, cultural history, and spiritual symbolism.
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer: Continue Journey Action */}
        <div className="relative z-10 bg-stone-950/95 border-t border-amber-500/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-amber-200 block font-cinzel">
              Ready to continue your journey?
            </span>
            <span className="text-[11px] text-stone-400">
              Apply what you've learned in the interactive gameplay and quiz!
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
            >
              Back to Game
            </button>
            <button
              id="ai-lesson-continue-level-btn"
              onClick={handleContinue}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Continue Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
