import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, BookOpen, ArrowRight, Award, HelpCircle } from 'lucide-react';
import { LEVEL_QUIZZES } from '../data/gameData';
import { soundService } from '../services/audioService';
import { Character } from './Character';
import { GaneshaLogo } from './GaneshaLogo';

interface LevelQuizScreenProps {
  levelId: number;
  onQuizPassed: (quizScore: number, correctCount: number, isFlawless: boolean) => void;
  onReviewStory: () => void;
}

export const LevelQuizScreen: React.FC<LevelQuizScreenProps> = ({
  levelId,
  onQuizPassed,
  onReviewStory
}) => {
  const quizData = LEVEL_QUIZZES.find((q) => q.levelId === levelId) || LEVEL_QUIZZES[0];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { selectedId: string; isCorrect: boolean }>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (hasAnsweredCurrent) return;

    setSelectedOptionId(optionId);
    setHasAnsweredCurrent(true);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: { selectedId: optionId, isCorrect }
    }));

    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playHint();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnsweredCurrent(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      const answerList = Object.values(answers) as { selectedId: string; isCorrect: boolean }[];
      const correctCount = answerList.filter((a) => a.isCorrect).length;
      if (correctCount >= 2) {
        soundService.playLevelComplete();
      } else {
        soundService.playHint();
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
    setAnswers({});
    setQuizFinished(false);
  };

  // Compute final stats
  const answerList = Object.values(answers) as { selectedId: string; isCorrect: boolean }[];
  const correctCount = answerList.filter((a) => a.isCorrect).length;
  const passed = correctCount >= 2;
  const isFlawless = correctCount === 3;
  const quizScore = correctCount * 100; // 100 points per question (up to 300)

  if (quizFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Top Card */}
        <div className="w-full bg-stone-900/95 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="flex justify-center mb-3">
            <GaneshaLogo size="md" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Chapter {levelId} Knowledge Check</span>
          </div>

          <h2 className="text-2xl font-bold font-cinzel text-amber-100">
            {passed ? 'Wisdom Verified!' : 'Continue Learning'}
          </h2>

          <div className="my-5 p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-around">
            <div className="text-center">
              <span className="text-xs text-stone-400 uppercase tracking-wider block">Questions Correct</span>
              <span className={`text-3xl font-extrabold font-cinzel ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {correctCount} / {totalQuestions}
              </span>
            </div>
            <div className="h-10 w-px bg-stone-800" />
            <div className="text-center">
              <span className="text-xs text-stone-400 uppercase tracking-wider block">Quiz Score</span>
              <span className="text-3xl font-extrabold font-cinzel text-amber-300">
                +{quizScore} <span className="text-xs text-amber-400/80">PTS</span>
              </span>
            </div>
            {isFlawless && (
              <>
                <div className="h-10 w-px bg-stone-800" />
                <div className="text-center">
                  <span className="text-xs text-stone-400 uppercase tracking-wider block">Flawless Bonus</span>
                  <span className="text-xl font-extrabold font-cinzel text-yellow-300">
                    +50 <span className="text-xs">PTS</span>
                  </span>
                </div>
              </>
            )}
          </div>

          {passed ? (
            <div className="space-y-4">
              <p className="text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
                {isFlawless
                  ? 'Exemplary understanding! You answered all 3 questions with complete accuracy and deep insight.'
                  : 'Well done! You have demonstrated a clear grasp of this sacred chapter’s traditional narrative and values.'}
              </p>

              <button
                id="proceed-to-level-score"
                onClick={() => onQuizPassed(quizScore, correctCount, isFlawless)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold font-cinzel text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 mx-auto active:scale-98"
              >
                <span>View Level Score & Rewards</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-amber-200/90 leading-relaxed max-w-md mx-auto">
                A score of at least 2 out of 3 is required to pass this chapter's wisdom check. Review the story narrative and try again to reinforce your learning!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  id="review-story-button"
                  onClick={onReviewStory}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 font-bold font-cinzel text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Review Story & Lessons</span>
                </button>

                <button
                  id="retry-quiz-button"
                  onClick={handleRetryQuiz}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-cinzel text-xs flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Quiz Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentQuestionIndex];
  const isSelectedCorrect = selectedAnswer?.isCorrect;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top Header Card */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GaneshaLogo size="sm" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel">
              Chapter {levelId} Quiz
            </span>
            <h3 className="text-sm font-bold text-amber-100 font-cinzel">
              {quizData.levelTitle}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {quizData.questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                idx === currentQuestionIndex
                  ? 'bg-amber-500 text-stone-950 scale-110 ring-2 ring-amber-400/50'
                  : answers[idx] !== undefined
                  ? answers[idx].isCorrect
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-700 text-white'
                  : 'bg-stone-800 text-stone-500 border border-stone-700'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full bg-stone-900/95 border border-amber-500/40 rounded-3xl p-6 mb-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400/90 text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>

        <h2 className="text-lg md:text-xl font-bold font-cinzel text-amber-100 leading-snug mb-5">
          {currentQuestion.question}
        </h2>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let btnClasses = 'bg-stone-950/80 border-stone-800 hover:border-amber-400/70 text-stone-200';

            if (hasAnsweredCurrent) {
              if (opt.isCorrect) {
                btnClasses = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400';
              } else if (isSelected && !opt.isCorrect) {
                btnClasses = 'bg-red-950/70 border-red-500 text-red-200';
              } else {
                btnClasses = 'opacity-50 border-stone-900 text-stone-500';
              }
            }

            return (
              <button
                key={opt.id}
                id={`quiz-option-${opt.id}`}
                onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                disabled={hasAnsweredCurrent}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-start gap-3 active:scale-98 ${btnClasses}`}
              >
                <div className="w-6 h-6 rounded-lg bg-stone-800/80 border border-stone-700 flex items-center justify-center text-xs font-bold font-cinzel text-amber-300 shrink-0 mt-0.5">
                  {opt.id.toUpperCase()}
                </div>
                <div className="flex-1 text-sm leading-relaxed">
                  {opt.text}
                </div>
                {hasAnsweredCurrent && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {hasAnsweredCurrent && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {hasAnsweredCurrent && (
          <div className="mt-5 pt-4 border-t border-stone-800 animate-fade-in">
            <div className={`p-4 rounded-xl border flex items-start gap-3 mb-4 ${
              isSelectedCorrect
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/50 border-amber-500/40 text-amber-200'
            }`}>
              <Sparkles className={`w-5 h-5 shrink-0 mt-0.5 ${isSelectedCorrect ? 'text-emerald-400' : 'text-amber-400'}`} />
              <div className="text-xs leading-relaxed">
                <p className="font-bold mb-1">
                  {isSelectedCorrect ? '✨ Correct! +100 Points' : 'Insight to Remember:'}
                </p>
                <p>{currentQuestion.correctExplanation}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                id="next-question-button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold font-cinzel text-xs flex items-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mascot Guidance */}
      <div className="w-full">
        <Character
          expression={hasAnsweredCurrent ? (isSelectedCorrect ? 'joyful' : 'wise') : 'thinking'}
          dialogue={
            hasAnsweredCurrent
              ? isSelectedCorrect
                ? 'Wonderful! True learning comes from understanding the deeper meaning behind every traditional tale.'
                : 'Every thoughtful question brings us closer to clarity. Review the explanation with an open mind.'
              : 'Take your time to reflect upon what you have discovered in this chapter before choosing your answer.'
          }
          mini
        />
      </div>
    </div>
  );
};
