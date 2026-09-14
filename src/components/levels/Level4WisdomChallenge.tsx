import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, Award, Heart, Globe2 } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface Level4WisdomChallengeProps {
  onComplete: (score: number, stats: { correct: number; speedBonus: number }) => void;
}

export const Level4WisdomChallenge: React.FC<Level4WisdomChallengeProps> = ({ onComplete }) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [kartikeyaProgress, setKartikeyaProgress] = useState(0); // 0 to 100%
  const [ganeshaPradakshinaStep, setGaneshaPradakshinaStep] = useState(0); // 0 to 3
  const [score, setScore] = useState(1250); // Base score
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [reflectionSelected, setReflectionSelected] = useState<string | null>(null);

  // Stage 1: The Race Commences - Watch Kartikeya's physical flight vs Ganesha's contemplation
  const handleInspectKartikeya = () => {
    soundService.playClick();
    if (kartikeyaProgress < 100) {
      setKartikeyaProgress((prev) => Math.min(prev + 35, 100));
    }
  };

  // Stage 2: Perform Ganesha's Sacred Pradakshina (Circumambulating Parents)
  const handlePradakshinaStep = () => {
    soundService.playCollectSound();
    setScore((prev) => prev + 100);
    setGaneshaPradakshinaStep((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        soundService.playCorrect();
        setTimeout(() => setActiveStage(3), 1000);
      }
      return next;
    });
  };

  // Stage 3: The philosophical reflection
  const handleReflectionChoice = (choiceId: string, isCorrect: boolean) => {
    setReflectionSelected(choiceId);
    if (isCorrect) {
      soundService.playCorrect();
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 250);

      const speedBonus = 150;
      const perfectBonus = 500;
      const finalScore = score + 250 + speedBonus + perfectBonus;

      setTimeout(() => {
        soundService.playLevelComplete();
        onComplete(finalScore, { correct: 2, speedBonus });
      }, 2000);
    } else {
      soundService.playHint();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg text-center">
        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-widest font-cinzel mb-1">
          <Compass className="w-4 h-4" />
          <span>The Cosmic Wisdom Challenge</span>
        </div>
        <h3 className="text-lg font-bold font-cinzel text-amber-100">
          "Circle the Entire Cosmos to Claim the Fruit of Knowledge"
        </h3>
        <p className="text-xs text-stone-300 mt-1 max-w-lg mx-auto">
          Sage Narada presents the divine fruit (Jnana Pazham). Will physical speed or profound wisdom triumph?
        </p>

        {/* Stage Pills */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              activeStage === 1
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-800 text-stone-400'
            }`}
          >
            1. Physical Speed
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              activeStage === 2
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-800 text-stone-400'
            }`}
          >
            2. The Inner Universe
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              activeStage === 3
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-800 text-stone-400'
            }`}
          >
            3. The Cosmic Lesson
          </span>
        </div>
      </div>

      {/* STAGE 1: Kartikeya's Physical Journey */}
      {activeStage === 1 && (
        <div className="w-full bg-stone-900/80 border border-amber-500/30 rounded-2xl p-5 mb-4 text-center">
          <div className="w-16 h-16 rounded-full bg-sky-950/60 border border-sky-400/50 mx-auto flex items-center justify-center text-3xl mb-2">
            🦚
          </div>
          <h4 className="font-bold text-sky-200 font-cinzel text-base">
            Kartikeya Takes Flight on the Peacock
          </h4>
          <p className="text-xs text-stone-300 max-w-md mx-auto mt-1 leading-relaxed">
            Swift and fearless, Kartikeya soars over seven oceans, snow-capped Himalayas, and distant continents.
          </p>

          {/* Race track progress bar */}
          <div className="w-full max-w-md mx-auto my-4">
            <div className="flex justify-between text-[11px] text-stone-400 font-mono mb-1">
              <span>Mount Kailash</span>
              <span>Across the Global Oceans</span>
            </div>
            <div className="h-3 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-700">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${kartikeyaProgress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <button
              id="power-kartikeya-btn"
              onClick={handleInspectKartikeya}
              disabled={kartikeyaProgress >= 100}
              className="px-4 py-2 rounded-xl bg-sky-900 hover:bg-sky-800 text-sky-100 text-xs font-bold transition-all"
            >
              {kartikeyaProgress >= 100 ? '✓ Physical Race Traversed' : '⚡ Track Kartikeya’s Speed'}
            </button>

            <button
              id="switch-to-ganesha-path-btn"
              onClick={() => {
                soundService.playClick();
                setActiveStage(2);
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Discover Ganesha’s Path →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: Ganesha's Pradakshina */}
      {activeStage === 2 && (
        <div className="w-full bg-stone-900/80 border border-amber-500/30 rounded-2xl p-5 mb-4 text-center">
          <div className="relative w-44 h-44 mx-auto mb-3 flex items-center justify-center">
            {/* Shiva & Parvati Center Emblem */}
            <div className="w-20 h-20 rounded-full bg-amber-900/80 border-2 border-amber-400 flex flex-col items-center justify-center text-2xl shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10">
              <span>🔱 🌺</span>
              <span className="text-[9px] font-bold text-amber-200 font-cinzel">Parents</span>
            </div>

            {/* Orbit Circle */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 animate-spin" style={{ animationDuration: '20s' }} />

            {/* Ganesha marker moving on orbit */}
            <div
              className="absolute w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-500 z-20"
              style={{
                transform: `rotate(${ganeshaPradakshinaStep * 120}deg) translate(72px) rotate(-${
                  ganeshaPradakshinaStep * 120
                }deg)`
              }}
            >
              <GaneshaLogo size="xs" showGlow={true} alt="Ganesha Pradakshina" />
            </div>
          </div>

          <h4 className="font-bold text-amber-200 font-cinzel text-base">
            Circumambulating the Source of Existence
          </h4>
          <p className="text-xs text-stone-300 max-w-md mx-auto mt-1 leading-relaxed">
            Ganesha folds his hands and walks with deep reverence around Lord Shiva and Goddess Parvati, declaring: <em>"My parents embody the whole universe."</em>
          </p>

          <div className="mt-4">
            <button
              id="pradakshina-step-btn"
              onClick={handlePradakshinaStep}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              <span>Perform Sacred Pradakshina ({ganeshaPradakshinaStep} / 3)</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: The Traditional Lesson */}
      {activeStage === 3 && (
        <div className="w-full bg-stone-900/90 border-2 border-amber-500/50 rounded-2xl p-5 mb-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 mx-auto flex items-center justify-center text-2xl mb-1">
              🍎
            </div>
            <h4 className="font-bold text-amber-100 font-cinzel text-base">
              Sage Narada Awards the Divine Fruit
            </h4>
            <p className="text-xs text-stone-300 max-w-md mx-auto mt-1">
              Why did Sage Narada and the divine court recognize Ganesha’s victory?
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'opt1',
                text: 'Because Ganesha demonstrated that deep reverence, gratitude for parents, and inner discernment transcend mere physical exertion.',
                correct: true
              },
              {
                id: 'opt2',
                text: 'Because Ganesha was too lazy to run around the physical earth.',
                correct: false
              },
              {
                id: 'opt3',
                text: 'Because Kartikeya took a wrong turn during his flight.',
                correct: false
              }
            ].map((choice) => (
              <button
                key={choice.id}
                id={`wisdom-choice-${choice.id}`}
                onClick={() => handleReflectionChoice(choice.id, choice.correct)}
                disabled={Boolean(reflectionSelected)}
                className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-semibold transition-all flex items-start gap-2.5 ${
                  reflectionSelected === choice.id
                    ? choice.correct
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                      : 'bg-red-950/60 border-red-500 text-red-200'
                    : 'bg-stone-900/80 border-stone-700 hover:border-amber-400 text-stone-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {reflectionSelected === choice.id && choice.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <span className="leading-relaxed">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
