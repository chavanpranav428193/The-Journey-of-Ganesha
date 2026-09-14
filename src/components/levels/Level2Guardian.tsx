import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2, AlertCircle, Eye, LogOut, Heart } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { Character } from '../Character';
import { LevelHeader } from './LevelHeader';
import { MetricBar } from './MetricBar';
import { GentleFeedback } from './GentleFeedback';
import { GaneshaExpression } from '../../types';

interface EncounterStep {
  id: number;
  visitorName: string;
  visitorTitle: string;
  avatar: string;
  situation: string;
  dialogue: string;
  options: {
    id: 'duty' | 'leave' | 'ignore';
    label: string;
    actionText: string;
    isRightDuty: boolean;
    consequenceText: string;
    expression: GaneshaExpression;
  }[];
}

const ENCOUNTERS: EncounterStep[] = [
  {
    id: 1,
    visitorName: 'A Wandering Ascetic',
    visitorTitle: 'Proud Traveler from the Valley',
    avatar: '🧘',
    situation: 'A haughty traveler approaches seeking immediate entry while Goddess Parvati is performing sacred rites.',
    dialogue: '"Young boy, step aside right now! My prayers cannot wait another moment."',
    options: [
      {
        id: 'duty',
        label: 'Follow your responsibility',
        actionText: 'Politely and firmly request him to wait in the courtyard until Mother completes her sacred rites.',
        isRightDuty: true,
        consequenceText: 'Righteous decision! Ganesha upholds his duty with serene grace, courtesy, and quiet strength.',
        expression: 'focused'
      },
      {
        id: 'leave',
        label: 'Leave your post',
        actionText: 'Step aside and let the stranger wander into Mother Parvati’s private sanctum.',
        isRightDuty: false,
        consequenceText: 'Abandoning your post breaks the solemn promise given to Goddess Parvati.',
        expression: 'thinking'
      },
      {
        id: 'ignore',
        label: 'Ignore the situation',
        actionText: 'Turn your back and pretend not to notice the traveler pushing past the threshold.',
        isRightDuty: false,
        consequenceText: 'Passive neglect allows the sanctum to be breached. A guardian must be actively attentive.',
        expression: 'thinking'
      }
    ]
  },
  {
    id: 2,
    visitorName: 'Nandi the Celestial Bull',
    visitorTitle: 'Shiva’s Loyal Guardian & Companion',
    avatar: '🐂',
    situation: 'Nandi approaches Mount Kailash bearing urgent greetings, insisting that no one may question his right to enter.',
    dialogue: '"Little guardian, I am Nandi of Mount Kailash! You must step aside immediately."',
    options: [
      {
        id: 'duty',
        label: 'Follow your responsibility',
        actionText: 'Bow with deep reverence to elder Nandi, but explain with humility that Mother Parvati has entrusted this entrance.',
        isRightDuty: true,
        consequenceText: 'Honorable conduct! Ganesha respects the elders of Kailash while remaining steadfast in his sacred duty.',
        expression: 'welcoming'
      },
      {
        id: 'leave',
        label: 'Leave your post',
        actionText: 'Yield instantly out of fear of Nandi’s grand celestial stature.',
        isRightDuty: false,
        consequenceText: 'True duty cannot be swayed by fear or flattery. A promise must remain unshakeable.',
        expression: 'thinking'
      },
      {
        id: 'ignore',
        label: 'Ignore the situation',
        actionText: 'Challenge Nandi to an aggressive, angry quarrel of words.',
        isRightDuty: false,
        consequenceText: 'Anger is contrary to dharma. A guardian protects with calm resolve, not hostility.',
        expression: 'thinking'
      }
    ]
  },
  {
    id: 3,
    visitorName: 'The Assembly of Ganas',
    visitorTitle: 'The Celestial Hosts of Kailash',
    avatar: '✨',
    situation: 'The celestial ganas arrive in great numbers, testing whether the young boy’s resolve can be swayed by peer pressure.',
    dialogue: '"We come in the name of the heavens! Step away from the threshold, young one!"',
    options: [
      {
        id: 'duty',
        label: 'Follow your responsibility',
        actionText: 'Stand steadfast at the portal with quiet moral resolve, refusing to compromise his mother’s trust.',
        isRightDuty: true,
        consequenceText: 'Symbol of pure loyalty! Ganesha exemplifies unwavering fidelity to dharma even against great numbers.',
        expression: 'focused'
      },
      {
        id: 'leave',
        label: 'Leave your post',
        actionText: 'Flee into the mountain caves and hide behind the boulders.',
        isRightDuty: false,
        consequenceText: 'Flight under pressure abandons the trust bestowed upon you.',
        expression: 'thinking'
      },
      {
        id: 'ignore',
        label: 'Ignore the situation',
        actionText: 'Offer to let them enter in exchange for celestial gold and jewels.',
        isRightDuty: false,
        consequenceText: 'Integrity and filial devotion cannot be bartered for material gain.',
        expression: 'thinking'
      }
    ]
  },
  {
    id: 4,
    visitorName: 'Lord Shiva Arrives at Kailash',
    visitorTitle: 'Supreme Lord of Mount Kailash',
    avatar: '🔱',
    situation: 'Lord Shiva returns to Mount Kailash. Young Ganesha, not knowing his identity, stands faithfully by Parvati’s instruction.',
    dialogue: '"I am Shiva, lord of this sacred mountain. Let me enter my abode."',
    options: [
      {
        id: 'duty',
        label: 'Follow your responsibility',
        actionText: 'Bow with supreme reverence, but explain steadfastly that Mother Parvati ordered no one to enter while she bathes.',
        isRightDuty: true,
        consequenceText: 'A profound test of character! Ganesha honors his word with supreme courage, even before the greatest presence.',
        expression: 'focused'
      },
      {
        id: 'leave',
        label: 'Leave your post',
        actionText: 'Run away down the mountain slopes in panic.',
        isRightDuty: false,
        consequenceText: 'Stepping down from duty without completing the mandate violates the sacred vow.',
        expression: 'thinking'
      },
      {
        id: 'ignore',
        label: 'Ignore the situation',
        actionText: 'Mock Shiva and throw rocks at his sacred trident.',
        isRightDuty: false,
        consequenceText: 'Disrespect is contrary to the sacred virtues of wisdom and devotion.',
        expression: 'thinking'
      }
    ]
  }
];

interface Level2GuardianProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level2Guardian: React.FC<Level2GuardianProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);
  const [dutyMeter, setDutyMeter] = useState(25);
  const [meterDelta, setMeterDelta] = useState<number | null>(null);
  const [ganeshaExpr, setGaneshaExpr] = useState<GaneshaExpression>('focused');
  const [isDivineTransformation, setIsDivineTransformation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const encounter = ENCOUNTERS[currentStep];

  const handleChooseOption = (opt: EncounterStep['options'][0]) => {
    if (selectedOptionId) return;
    setSelectedOptionId(opt.id);
    setGaneshaExpr(opt.expression);

    if (opt.isRightDuty) {
      soundService.playCorrect();
      setCorrectCount((prev) => prev + 1);
      setMeterDelta(25);
      setDutyMeter((prev) => Math.min(prev + 25, 100));

      setFeedback({
        message: opt.consequenceText,
        type: 'success'
      });

      setTimeout(() => {
        if (currentStep < ENCOUNTERS.length - 1) {
          setCurrentStep((prev) => prev + 1);
          setSelectedOptionId(null);
          setFeedback(null);
          setGaneshaExpr('focused');
        } else {
          // Success: Lord Shiva recognizes the boy's supreme valor & fidelity
          setIsDivineTransformation(true);
          soundService.playLevelComplete();

          const baseScore = 700;
          const bonusScore = 150;

          setTimeout(() => {
            onComplete(baseScore, bonusScore);
          }, 4500);
        }
      }, 1800);
    } else {
      soundService.playHint();
      setMeterDelta(-10);
      setDutyMeter((prev) => Math.max(prev - 10, 15));

      setFeedback({
        message: `${opt.consequenceText} Reflect upon your responsibility and choose the righteous path.`,
        type: 'warning'
      });

      setTimeout(() => {
        setSelectedOptionId(null);
      }, 2000);
    }
  };

  // Divine Transformation Screen (Respectful, symbolic, peaceful)
  if (isDivineTransformation) {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-8 px-6 bg-gradient-to-b from-stone-900 via-amber-950 to-stone-950 border-2 border-amber-400 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in text-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none" />

        {/* Sacred Divine Glow */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(245,158,11,0.8)] animate-pulse mb-3">
          🐘
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-cinzel font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Divine Transformation</span>
        </div>

        <h3 className="text-2xl font-black font-cinzel text-amber-100 mb-2">
          The Sacred Elephant Head (Gajamukha)
        </h3>

        <p className="text-xs text-stone-200 max-w-md mt-1 leading-relaxed">
          Beholding the boy’s unyielding valor, devotion, and purity of heart, Lord Shiva embraces Ganesha as his divine son. Ganesha is blessed with the sacred elephant head — an eternal symbol of supreme <span className="text-amber-300 font-bold">wisdom, deep listening, noble strength, and tranquil discernment</span>.
        </p>

        {/* 3 Sacred Virtues Grid */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 w-full max-w-md">
          <div className="p-3 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="text-2xl block">👂</span>
            <span className="text-[11px] font-bold text-amber-300 font-cinzel block mt-1">Deep Listening</span>
            <span className="text-[9px] text-stone-400 leading-tight block mt-0.5">Large ears to absorb knowledge</span>
          </div>
          <div className="p-3 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="text-2xl block">🧠</span>
            <span className="text-[11px] font-bold text-amber-300 font-cinzel block mt-1">Vast Intellect</span>
            <span className="text-[9px] text-stone-400 leading-tight block mt-0.5">Expansive spiritual clarity</span>
          </div>
          <div className="p-3 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-center">
            <span className="text-2xl block">🐘</span>
            <span className="text-[11px] font-bold text-amber-300 font-cinzel block mt-1">Noble Strength</span>
            <span className="text-[9px] text-stone-400 leading-tight block mt-0.5">Gentle power guided by dharma</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none text-stone-100">
      {/* Reusable Level Header */}
      <LevelHeader
        levelNumber={2}
        title="The Guardian's Choice"
        subtitle="Steadfast Duty & Consequence"
        objective="Hold your sacred post with steadfast duty and moral courage as tests arrive at the threshold."
        badgeIcon={<Shield className="w-3.5 h-3.5 text-amber-400" />}
        rightElement={
          <div className="flex items-center gap-1.5">
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
        }
      />

      {/* Duty Meter */}
      <div className="w-full mb-4 bg-stone-900/80 border border-amber-500/30 rounded-2xl p-3 shadow-md">
        <MetricBar
          label="Duty & Resolve Meter"
          value={dutyMeter}
          max={100}
          icon={<Shield className="w-4 h-4 text-amber-400" />}
          variant="gold"
          delta={meterDelta}
          size="md"
        />
      </div>

      {/* Main Encounter Stage */}
      <div className="w-full bg-gradient-to-b from-stone-900/90 via-[#180e07] to-stone-950/95 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden mb-4">
        {/* Character Stage */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <Character expression={ganeshaExpr} size="sm" showAura={true} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block">
                Ganesha at the Threshold
              </span>
              <h4 className="text-sm font-bold text-amber-100 font-cinzel">
                Faithful Guardian
              </h4>
              <span className="text-xs text-stone-300 font-medium">
                Testing Sincerity & Duty
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-cinzel block">Encounter</span>
            <span className="text-sm font-bold text-amber-300 font-mono">
              {currentStep + 1} / {ENCOUNTERS.length}
            </span>
          </div>
        </div>

        {/* Feedback Display */}
        <div className="mb-4">
          <GentleFeedback
            message={feedback?.message || null}
            type={feedback?.type || 'info'}
          />
        </div>

        {/* Visitor Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-stone-950/80 border border-amber-400/50 flex items-start gap-3.5 shadow-lg mb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            {encounter.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider font-cinzel block">
              {encounter.visitorTitle}
            </span>
            <h4 className="text-base font-bold font-cinzel text-amber-100 mt-0.5">
              {encounter.visitorName}
            </h4>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {encounter.situation}
            </p>
            <div className="mt-2.5 p-2 rounded-xl bg-stone-950/80 border border-stone-800 text-xs text-amber-200/90 italic">
              {encounter.dialogue}
            </div>
          </div>
        </div>

        {/* The 3 Actions: Follow Duty, Leave Post, Ignore Situation */}
        <div>
          <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider block mb-2">
            Choose Ganesha's Action
          </span>
          <div className="space-y-2.5">
            {encounter.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const iconMap = {
                duty: <Shield className="w-4 h-4 text-amber-400" />,
                leave: <LogOut className="w-4 h-4 text-rose-400" />,
                ignore: <Eye className="w-4 h-4 text-yellow-400" />
              };

              return (
                <button
                  key={opt.id}
                  id={`choice-btn-${opt.id}`}
                  onClick={() => handleChooseOption(opt)}
                  disabled={!!selectedOptionId}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? opt.isRightDuty
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/40'
                        : 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/40'
                      : 'bg-stone-900/80 hover:bg-stone-800 border-amber-500/30 hover:border-amber-400 text-stone-200 active:scale-98'
                  }`}
                >
                  <span className="p-1 rounded-lg bg-stone-950 border border-stone-800 mt-0.5 shrink-0">
                    {iconMap[opt.id]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold font-cinzel text-amber-300 block">
                      {opt.label}
                    </span>
                    <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                      {opt.actionText}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="shrink-0 mt-1">
                      {opt.isRightDuty ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
