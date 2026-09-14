import React, { useState } from 'react';
import { Shield, CheckCircle2, HelpCircle, Sparkles, Star } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface GuardianEncounter {
  id: number;
  visitor: string;
  avatar: string;
  context: string;
  dialogue: string;
  options: {
    id: string;
    text: string;
    isRightDuty: boolean;
    feedback: string;
  }[];
}

const ENCOUNTERS: GuardianEncounter[] = [
  {
    id: 1,
    visitor: 'A Wandering Devotee',
    avatar: '🧘',
    context: 'A traveler approaches seeking immediate entry while Goddess Parvati is performing sacred rituals.',
    dialogue: '"Young boy, step aside right now! My prayers cannot wait another moment."',
    options: [
      {
        id: 'opt1',
        text: 'Politely and gently request him to wait in the courtyard until mother completes her sacred rites.',
        isRightDuty: true,
        feedback: 'Righteous decision! Ganesha upholds his duty with serene grace and patience.'
      },
      {
        id: 'opt2',
        text: 'Abandon the post and let the visitor wander inside freely.',
        isRightDuty: false,
        feedback: 'Abandoning the post breaks the sacred promise given to Goddess Parvati.'
      },
      {
        id: 'opt3',
        text: 'Shout angrily and chase the devotee away into the wilderness.',
        isRightDuty: false,
        feedback: 'Anger is unbecoming of a divine guardian. Calm firmness is the path of dharma.'
      }
    ]
  },
  {
    id: 2,
    visitor: 'Nandi, Shiva’s Loyal Companion',
    avatar: '🐂',
    context: 'Nandi approaches the cave threshold bearing greetings from Kailash.',
    dialogue: '"Little guardian, I am Nandi of Mount Kailash! You must step aside immediately."',
    options: [
      {
        id: 'opt1',
        text: 'Yield instantly out of fear of Nandi’s grand celestial stature.',
        isRightDuty: false,
        feedback: 'Duty is not governed by fear or flattery; a solemn promise must remain steadfast.'
      },
      {
        id: 'opt2',
        text: 'Respectfully acknowledge Nandi, but explain with humility that Mother Parvati has entrusted this entrance.',
        isRightDuty: true,
        feedback: 'Honorable! Ganesha demonstrates deep respect for celestial elders while maintaining his duty.'
      },
      {
        id: 'opt3',
        text: 'Challenge Nandi to a noisy duel of words.',
        isRightDuty: false,
        feedback: 'A guardian’s purpose is preservation and protection, not seeking idle quarrels.'
      }
    ]
  },
  {
    id: 3,
    visitor: 'The Assembly of Ganas',
    avatar: '✨',
    context: 'The celestial ganas arrive, testing whether the young boy’s resolve can be broken by numbers.',
    dialogue: '"We come in the name of the heavens! Step away from the threshold, young one!"',
    options: [
      {
        id: 'opt1',
        text: 'Stand steadfast at the portal with quiet moral resolve, refusing to compromise his mother’s trust.',
        isRightDuty: true,
        feedback: 'Symbol of pure loyalty! Ganesha exemplifies unwavering fidelity to dharma.'
      },
      {
        id: 'opt2',
        text: 'Run away and hide behind the mountain rocks.',
        isRightDuty: false,
        feedback: 'Flight is not the way of the devoted protector.'
      },
      {
        id: 'opt3',
        text: 'Offer to trade entry in exchange for gold and jewels.',
        isRightDuty: false,
        feedback: 'Integrity and devotion cannot be traded for material wealth.'
      }
    ]
  },
  {
    id: 4,
    visitor: 'Lord Shiva Arrives at Kailash',
    avatar: '🔱',
    context: 'Lord Shiva returns to Mount Kailash. Young Ganesha, not knowing his identity, stands faithfully by Parvati’s instruction.',
    dialogue: '"I am Shiva, lord of this sacred mountain. Let me enter my abode."',
    options: [
      {
        id: 'opt1',
        text: 'Bow with deep reverence, but explain steadfastly that Mother Parvati ordered no one to enter while she bathes.',
        isRightDuty: true,
        feedback: 'A profound test of duty! Ganesha honors his promise with unwavering courage, even before the greatest presence.'
      },
      {
        id: 'opt2',
        text: 'Mock Shiva and throw rocks at his trident.',
        isRightDuty: false,
        feedback: 'Disrespect is contrary to the virtues of wisdom and dharma.'
      },
      {
        id: 'opt3',
        text: 'Abandon Parvati’s sanctuary and run down the mountain slope.',
        isRightDuty: false,
        feedback: 'A true guardian never leaves their post through fear.'
      }
    ]
  }
];

interface Level2GuardianProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level2Guardian: React.FC<Level2GuardianProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [divineTransformation, setDivineTransformation] = useState(false);

  const encounter = ENCOUNTERS[currentStep];

  const handleChoose = (opt: GuardianEncounter['options'][0]) => {
    if (selectedOption) return;
    setSelectedOption(opt.id);
    setFeedback(opt.feedback);

    const isCorrect = opt.isRightDuty;
    if (isCorrect) {
      soundService.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      soundService.playHint();
    }

    setTimeout(() => {
      if (currentStep < ENCOUNTERS.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        // Bright divine transformation scene (no violence or severed heads)
        setDivineTransformation(true);
        soundService.playLevelComplete();

        const finalCorrect = correctCount + (isCorrect ? 1 : 0);
        // 700 max gameplay score (175 per encounter)
        const baseScore = finalCorrect * 175;
        const bonusScore = finalCorrect === 4 ? 150 : 50;

        setTimeout(() => {
          onComplete(baseScore, bonusScore);
        }, 4000);
      }
    }, 1800);
  };

  if (divineTransformation) {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-10 px-6 bg-stone-900/95 border-2 border-amber-500/60 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none" />

        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(245,158,11,0.7)] animate-pulse mb-4">
          🐘
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-cinzel font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Divine Transformation</span>
        </div>

        <h3 className="text-2xl font-bold font-cinzel text-amber-100 mb-2">
          The Sacred Elephant Head
        </h3>

        <p className="text-xs text-stone-200 max-w-md mt-1 leading-relaxed">
          Through a radiant divine convergence, Lord Shiva recognizes the boy’s steadfast duty and profound valor. Ganesha is blessed with the sacred elephant head — a timeless symbol of <span className="text-amber-300 font-bold">wisdom, intelligence, strength, and calm discernment</span>.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-sm">
          <div className="p-2.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="text-xl block">👂</span>
            <span className="text-[11px] font-bold text-amber-300 block mt-1">Deep Listening</span>
            <span className="text-[9px] text-stone-400">Large ears to absorb knowledge</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="text-xl block">🧠</span>
            <span className="text-[11px] font-bold text-amber-300 block mt-1">Vast Intellect</span>
            <span className="text-[9px] text-stone-400">Expansive, serene wisdom</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="text-xl block">🐘</span>
            <span className="text-[11px] font-bold text-amber-300 block mt-1">Noble Strength</span>
            <span className="text-[9px] text-stone-400">Gentle power guided by dharma</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Header Info */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GaneshaLogo size="sm" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
              Level 2: The Guardian
            </span>
            <h3 className="text-sm font-bold font-cinzel text-amber-100">
              Steadfast Duty & Responsibility
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ENCOUNTERS.map((_, idx) => (
            <div
              key={idx}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                idx === currentStep
                  ? 'bg-amber-500 text-stone-950 scale-110 ring-2 ring-amber-400/50'
                  : idx < currentStep
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-800 text-stone-500 border border-stone-700'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Dialogue Bubble */}
      <div className="w-full bg-gradient-to-r from-amber-950/40 to-stone-900/90 border border-amber-500/30 rounded-2xl p-4 mb-4 flex items-center gap-4 shadow-md">
        <div className="w-14 h-14 rounded-2xl bg-amber-900/60 border border-amber-400/50 flex items-center justify-center text-3xl shrink-0 shadow-inner">
          {encounter.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-cinzel">
              {encounter.visitor}
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              Encounter {currentStep + 1} of {ENCOUNTERS.length}
            </span>
          </div>
          <p className="text-sm font-semibold text-amber-100 italic font-serif mt-0.5 leading-snug">
            {encounter.dialogue}
          </p>
          <span className="text-[10px] text-stone-400 block mt-1">
            {encounter.context}
          </span>
        </div>
      </div>

      {/* Choices */}
      <div className="w-full space-y-3 mb-4">
        {encounter.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          let btnStyle = 'bg-stone-900/80 border-stone-700 hover:border-amber-400 text-stone-200';

          if (selectedOption) {
            if (opt.isRightDuty) {
              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400';
            } else if (isSelected) {
              btnStyle = 'bg-red-950/60 border-red-500 text-red-200';
            } else {
              btnStyle = 'opacity-40 border-stone-800 text-stone-500';
            }
          }

          return (
            <button
              key={opt.id}
              id={`choice-${opt.id}`}
              onClick={() => handleChoose(opt)}
              disabled={Boolean(selectedOption)}
              className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 flex items-start gap-3 active:scale-98 ${btnStyle}`}
            >
              <div className="mt-0.5 shrink-0">
                {selectedOption && opt.isRightDuty ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-400/70" />
                )}
              </div>
              <span className="leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className="w-full p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 flex items-center gap-2 animate-fade-in shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};
