import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, Award, Heart, Globe2, ArrowRight } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface Level3WisdomChallengeProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level3WisdomChallenge: React.FC<Level3WisdomChallengeProps> = ({ onComplete }) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [kartikeyaProgress, setKartikeyaProgress] = useState(0); // 0 to 100%
  const [ganeshaPradakshinaStep, setGaneshaPradakshinaStep] = useState(0); // 0 to 3
  const [reflectionSelected, setReflectionSelected] = useState<string | null>(null);

  // Stage 1: Inspect Kartikeya's flight across galaxies
  const handleInspectKartikeya = () => {
    soundService.playClick();
    if (kartikeyaProgress < 100) {
      setKartikeyaProgress((prev) => Math.min(prev + 35, 100));
    }
  };

  // Stage 2: Perform Ganesha's Sacred Pradakshina (Circumambulating Parents)
  const handlePradakshinaStep = () => {
    soundService.playCollectSound();
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
      const baseScore = 700;
      const speedBonus = 100;
      setTimeout(() => {
        soundService.playLevelComplete();
        onComplete(baseScore, speedBonus);
      }, 1800);
    } else {
      soundService.playHint();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Top Header Card */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GaneshaLogo size="sm" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
              Level 3: The Wisdom Challenge
            </span>
            <h3 className="text-sm font-bold font-cinzel text-amber-100">
              The Cosmic Race of Wisdom
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((stg) => (
            <div
              key={stg}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                activeStage === stg
                  ? 'bg-amber-500 text-stone-950 scale-110 ring-2 ring-amber-400/50'
                  : activeStage > stg
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-800 text-stone-500 border border-stone-700'
              }`}
            >
              {stg}
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Dual Cosmic Arena */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Left Side: Kartikeya's Flight */}
        <div className="p-4 rounded-2xl bg-stone-900/80 border border-amber-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-cinzel text-amber-300 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Kartikeya’s Swift Flight</span>
              </span>
              <span className="text-[10px] font-bold text-stone-400">
                {kartikeyaProgress}% Explored
              </span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
              Riding his swift peacock, Kartikeya circles the celestial cosmos at breathtaking lightning speed.
            </p>

            {/* Peacock Flight Animation Visual */}
            <div className="h-28 rounded-xl bg-stone-950/80 border border-stone-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
              <div
                className="absolute transition-all duration-700 ease-out flex flex-col items-center"
                style={{
                  left: `${Math.min(kartikeyaProgress, 85)}%`,
                  top: '25%'
                }}
              >
                <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">🦚</span>
                <span className="text-[9px] font-bold text-cyan-300 bg-stone-900/90 px-1.5 py-0.5 rounded border border-cyan-500/40">
                  Kartikeya
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <button
              id="inspect-kartikeya-btn"
              onClick={handleInspectKartikeya}
              className="w-full py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-cinzel text-stone-300 transition-all border border-stone-700 active:scale-98"
            >
              Follow Peacock’s Flight ({kartikeyaProgress}%)
            </button>
          </div>
        </div>

        {/* Right Side: Ganesha's Cosmic Pradakshina */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/40 to-stone-900/90 border border-amber-500/40 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-cinzel text-amber-300 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Ganesha’s Cosmic Pradakshina</span>
              </span>
              <span className="text-[10px] font-bold text-amber-300">
                {ganeshaPradakshinaStep} / 3 Rounds
              </span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
              Recognizing that loving parents embody the entire universe, Ganesha circumambulates Shiva and Parvati.
            </p>

            {/* Sacred Pradakshina Circle */}
            <div className="h-28 rounded-xl bg-stone-950/80 border border-amber-500/30 relative flex items-center justify-center">
              {/* Parents Center */}
              <div className="flex flex-col items-center">
                <span className="text-2xl drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">🔱 🌺</span>
                <span className="text-[9px] font-bold text-amber-200 mt-0.5 font-cinzel">
                  Shiva & Parvati
                </span>
              </div>

              {/* Ganesha Moving Around Ring */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  transform: `rotate(${ganeshaPradakshinaStep * 120}deg) translate(46px) rotate(-${ganeshaPradakshinaStep * 120}deg)`
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">🐘</span>
                  <span className="text-[8px] font-bold text-amber-300 bg-stone-900/90 px-1 rounded border border-amber-500/40">
                    Ganesha
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <button
              id="pradakshina-step-btn"
              onClick={handlePradakshinaStep}
              disabled={ganeshaPradakshinaStep >= 3}
              className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold font-cinzel transition-all flex items-center justify-center gap-1.5 active:scale-98 ${
                ganeshaPradakshinaStep >= 3
                  ? 'bg-emerald-900/50 text-emerald-200 border border-emerald-500/50'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
              }`}
            >
              {ganeshaPradakshinaStep >= 3 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pradakshina Complete!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Perform Pradakshina (Round {ganeshaPradakshinaStep + 1} of 3)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stage 3: Reflection & The Divine Fruit of Wisdom */}
      {activeStage === 3 && (
        <div className="w-full p-5 rounded-2xl bg-stone-900/95 border-2 border-amber-500/50 shadow-xl animate-fade-in mb-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-cinzel uppercase mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Sage Narada's Divine Inquiry</span>
          </div>

          <h4 className="text-base font-bold font-cinzel text-amber-100 mb-2">
            Why was Ganesha awarded the sacred Fruit of Wisdom (Jnana Pazham)?
          </h4>

          <div className="space-y-2.5">
            {[
              {
                id: 'choice_a',
                text: 'Because he proved that for a devoted child, parents and spiritual foundations encompass the entire universe.',
                isCorrect: true
              },
              {
                id: 'choice_b',
                text: 'Because his mouse ran faster than Kartikeya’s peacock.',
                isCorrect: false
              },
              {
                id: 'choice_c',
                text: 'Because Kartikeya forgot where Mount Kailash was located.',
                isCorrect: false
              }
            ].map((choice) => {
              const isSelected = reflectionSelected === choice.id;
              let btnStyle = 'bg-stone-950/80 border-stone-800 hover:border-amber-400/80 text-stone-200';

              if (reflectionSelected) {
                if (choice.isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400';
                } else if (isSelected) {
                  btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                } else {
                  btnStyle = 'opacity-40 border-stone-900 text-stone-600';
                }
              }

              return (
                <button
                  key={choice.id}
                  id={`reflection-${choice.id}`}
                  onClick={() => handleReflectionChoice(choice.id, choice.isCorrect)}
                  disabled={Boolean(reflectionSelected)}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-medium transition-all flex items-start gap-2.5 active:scale-98 ${btnStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {reflectionSelected && choice.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-600 flex items-center justify-center text-[10px]">
                        •
                      </div>
                    )}
                  </div>
                  <span className="leading-relaxed">{choice.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
