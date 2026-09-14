import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, CheckCircle2, Clock, Zap, Heart, AlertCircle } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { Character } from '../Character';
import { LevelHeader } from './LevelHeader';
import { MetricBar } from './MetricBar';
import { GentleFeedback } from './GentleFeedback';
import { GaneshaExpression } from '../../types';

interface PrepItem {
  id: string;
  name: string;
  symbol: string;
  desc: string;
  isSacred: boolean;
  placed: boolean;
}

interface GuardianSituation {
  id: number;
  visitor: string;
  avatar: string;
  description: string;
  prompt: string;
  actions: {
    id: string;
    text: string;
    isRightDuty: boolean;
    explanation: string;
    expression: GaneshaExpression;
  }[];
}

const SANCTUM_ITEMS: PrepItem[] = [
  {
    id: 'flowers',
    name: 'Red Hibiscus & Lotus',
    symbol: '🌺',
    desc: 'Devotional floral garland honoring Mother Parvati.',
    isSacred: true,
    placed: false
  },
  {
    id: 'diya',
    name: 'Auspicious Clay Diya',
    symbol: '🪔',
    desc: 'Sacred golden flame dispelling shadows from the entrance.',
    isSacred: true,
    placed: false
  },
  {
    id: 'durva',
    name: 'Sacred Durva Grass',
    symbol: '🍃',
    desc: 'Cooling herb representing humility and pure devotion.',
    isSacred: true,
    placed: false
  },
  {
    id: 'toran',
    name: 'Mango Leaf Toran & Rangoli',
    symbol: '🌿',
    desc: 'Threshold boundary warding off discord.',
    isSacred: true,
    placed: false
  },
  {
    id: 'rubble',
    name: 'Mountain Gravel',
    symbol: '🪨',
    desc: 'Cold mountain rubble; not a sacred entrance offering.',
    isSacred: false,
    placed: false
  },
  {
    id: 'thorn',
    name: 'Wild Thorns',
    symbol: '🌵',
    desc: 'Discordant weeds unsuited for the divine sanctum.',
    isSacred: false,
    placed: false
  }
];

const GUARDIAN_SITUATIONS: GuardianSituation[] = [
  {
    id: 1,
    visitor: 'Gentle Himalayan Fawn',
    avatar: '🦌',
    description: 'An innocent, thirsty forest fawn wanders cautiously toward the sanctum entrance.',
    prompt: 'How does Guardian Ganesha respond?',
    actions: [
      {
        id: 'fawn_guide',
        text: 'Gently guide the gentle fawn with sweet grass to the nearby crystal mountain spring.',
        isRightDuty: true,
        explanation: 'Wise compassion! A true guardian protects all gentle life while keeping the threshold secure.',
        expression: 'joyful'
      },
      {
        id: 'fawn_scare',
        text: 'Throw sharp stones to frighten the innocent animal away.',
        isRightDuty: false,
        explanation: 'Harshness is contrary to dharma; divine guardians protect with gentle wisdom.',
        expression: 'thinking'
      },
      {
        id: 'fawn_abandon',
        text: 'Leave your post and follow the fawn deep into the forest.',
        isRightDuty: false,
        explanation: 'A guardian must never abandon their assigned post, no matter how playful the distraction.',
        expression: 'thinking'
      }
    ]
  },
  {
    id: 2,
    visitor: 'Mountain Breeze & Flickering Flame',
    avatar: '💨',
    description: 'A sudden Himalayan gust rushes down the slope, threatening to blow out the sacred clay diya.',
    prompt: 'How does Guardian Ganesha preserve the sacred light?',
    actions: [
      {
        id: 'flame_shield',
        text: 'Shield the flame with your hands and place a protective brass bell cover over the diya.',
        isRightDuty: true,
        explanation: 'Vigilant devotion! Ganesha preserves the holy flame without leaving his sacred post.',
        expression: 'focused'
      },
      {
        id: 'flame_ignore',
        text: 'Ignore the wind and let the holy threshold diya be extinguished.',
        isRightDuty: false,
        explanation: 'Allowing the sanctum light to go out is an omission of mindful vigilance.',
        expression: 'thinking'
      },
      {
        id: 'flame_run',
        text: 'Run inside the cave to hide from the cold breeze.',
        isRightDuty: false,
        explanation: 'Stepping inside breaks the solemn promise given to Mother Parvati.',
        expression: 'thinking'
      }
    ]
  },
  {
    id: 3,
    visitor: 'Elder Wandering Devotee',
    avatar: '🧘',
    description: 'A pious elder traveler arrives carrying sacred offerings, seeking immediate blessings from Mother Parvati.',
    prompt: 'How does Guardian Ganesha balance respect for elders with duty?',
    actions: [
      {
        id: 'elder_respect',
        text: 'Bow respectfully, explain that Mother is meditating, and invite him to rest in the courtyard.',
        isRightDuty: true,
        explanation: 'Exemplary conduct! Ganesha honors the elder with warm hospitality while steadfastly guarding the sanctum.',
        expression: 'welcoming'
      },
      {
        id: 'elder_admit',
        text: 'Let him walk directly into Mother Parvati’s private meditation chamber.',
        isRightDuty: false,
        explanation: 'Breaking a sacred promise violates the primary duty of guardianship.',
        expression: 'thinking'
      },
      {
        id: 'elder_rude',
        text: 'Slam the gate loudly and order the elder to leave immediately.',
        isRightDuty: false,
        explanation: 'Rudeness to travelers and elders is contrary to sacred hospitality.',
        expression: 'thinking'
      }
    ]
  },
  {
    id: 4,
    visitor: 'Impatient Celestial Herald',
    avatar: '⚡',
    description: 'An urgent courier in ornate armor arrives, insisting he has the right to rush past without delay.',
    prompt: 'How does Guardian Ganesha stand firm at the threshold?',
    actions: [
      {
        id: 'herald_firm',
        text: 'Stand steadfast with peaceful dignity: "None may cross this threshold until Mother permits."',
        isRightDuty: true,
        explanation: 'Unyielding fidelity! Ganesha exemplifies courage, integrity, and absolute devotion to duty.',
        expression: 'focused'
      },
      {
        id: 'herald_yield',
        text: 'Step aside out of fear of the herald’s loud voice and sharp armor.',
        isRightDuty: false,
        explanation: 'True duty cannot be swayed by fear, pride, or intimidating words.',
        expression: 'thinking'
      },
      {
        id: 'herald_bribe',
        text: 'Offer to let him enter if he gives you celestial gold and jewels.',
        isRightDuty: false,
        explanation: 'Divine guardianship cannot be compromised by worldly riches or bribes.',
        expression: 'thinking'
      }
    ]
  }
];

interface Level1BirthProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level1Birth: React.FC<Level1BirthProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'prep' | 'guard'>('prep');
  const [items, setItems] = useState<PrepItem[]>(SANCTUM_ITEMS);
  const [placedItems, setPlacedItems] = useState<string[]>([]);
  const [currentSituationIdx, setCurrentSituationIdx] = useState(0);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [guardianMeter, setGuardianMeter] = useState(15);
  const [meterDelta, setMeterDelta] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>({
    message: 'Mother Parvati has entrusted you to sanctify the Kailash threshold. Arrange the 4 sacred offerings.',
    type: 'info'
  });
  const [ganeshaExpr, setGaneshaExpr] = useState<GaneshaExpression>('welcoming');
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  // Phase 1: Handle offering clicks
  const handleItemClick = (item: PrepItem) => {
    if (item.placed || isCompleted || phase !== 'prep') return;

    if (item.isSacred) {
      soundService.playCollectSound();
      const nextPlaced = [...placedItems, item.id];
      setPlacedItems(nextPlaced);

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, placed: true } : i))
      );

      const delta = 15;
      setMeterDelta(delta);
      setGuardianMeter((prev) => Math.min(prev + delta, 60));
      setGaneshaExpr('joyful');
      setCombo((prev) => prev + 1);

      setFeedback({
        message: `Auspicious offering consecrated: ${item.name} (${item.desc})`,
        type: 'success'
      });

      if (nextPlaced.length === 4) {
        soundService.playCorrect();
        setTimeout(() => {
          setPhase('guard');
          setFeedback({
            message: 'Threshold sanctified! Mother Parvati enters meditation. Stand vigilant as Guardian of the Entrance.',
            type: 'info'
          });
          setGaneshaExpr('focused');
        }, 1200);
      }
    } else {
      soundService.playHint();
      setCombo(1);
      setGaneshaExpr('thinking');
      setFeedback({
        message: `Be mindful: ${item.name} is discordant. Choose sacred offerings to sanctify the sanctum.`,
        type: 'warning'
      });
    }
  };

  // Phase 2: Handle situation choices
  const handleGuardianAction = (action: GuardianSituation['actions'][0]) => {
    if (selectedActionId || isCompleted) return;
    setSelectedActionId(action.id);
    setGaneshaExpr(action.expression);

    if (action.isRightDuty) {
      soundService.playCorrect();
      const delta = 10;
      setMeterDelta(delta);
      const nextMeter = Math.min(guardianMeter + delta, 100);
      setGuardianMeter(nextMeter);
      setCombo((prev) => prev + 1);

      setFeedback({
        message: action.explanation,
        type: 'success'
      });

      setTimeout(() => {
        if (currentSituationIdx < GUARDIAN_SITUATIONS.length - 1) {
          setCurrentSituationIdx((prev) => prev + 1);
          setSelectedActionId(null);
        } else {
          // Success: Complete Guardian Challenge
          setIsCompleted(true);
          setGuardianMeter(100);
          soundService.playLevelComplete();

          const baseScore = 700;
          const speedBonus = timeLeft >= 30 ? 100 : timeLeft >= 15 ? 60 : 30;
          const comboBonus = combo >= 5 ? 100 : 50;

          setTimeout(() => {
            onComplete(baseScore, speedBonus + comboBonus);
          }, 2200);
        }
      }, 1600);
    } else {
      soundService.playHint();
      setCombo(1);
      setMeterDelta(-5);
      setGuardianMeter((prev) => Math.max(prev - 5, 20));

      setFeedback({
        message: `${action.explanation} Try again with mindful discernment.`,
        type: 'warning'
      });

      setTimeout(() => {
        setSelectedActionId(null);
      }, 1800);
    }
  };

  const currentSituation = GUARDIAN_SITUATIONS[currentSituationIdx];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none text-stone-100">
      {/* Reusable Level Header */}
      <LevelHeader
        levelNumber={1}
        title="The Guardian's Beginning"
        subtitle="Responsibility, Protection & Purpose"
        objective={
          phase === 'prep'
            ? 'Arrange the 4 sacred offerings to consecrate the sanctum entrance.'
            : 'Stand guard at the entrance and respond to incoming visitors with wisdom and fidelity.'
        }
        badgeIcon={<Shield className="w-3.5 h-3.5 text-amber-400" />}
        rightElement={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-bold font-cinzel">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>{combo}x</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-950/80 border border-stone-700 text-stone-300 text-xs font-bold font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{timeLeft}s</span>
            </div>
          </div>
        }
      />

      {/* Dynamic Guardian Meter */}
      <div className="w-full mb-4 bg-stone-900/80 border border-amber-500/30 rounded-2xl p-3 shadow-md">
        <MetricBar
          label="Guardian Meter"
          value={guardianMeter}
          max={100}
          icon={<Shield className="w-4 h-4 text-amber-400" />}
          variant="gold"
          delta={meterDelta}
          size="md"
        />
      </div>

      {/* Main Gameplay Arena */}
      <div className="w-full bg-gradient-to-b from-stone-900/90 via-[#180e07] to-stone-950/95 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden mb-4">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Character Reaction Stage */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <Character expression={ganeshaExpr} size="sm" showAura={true} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block">
                Young Ganesha
              </span>
              <h4 className="text-sm font-bold text-amber-100 font-cinzel">
                Sentinel of Mount Kailash
              </h4>
              <span className="text-xs text-stone-300 font-medium">
                {phase === 'prep' ? 'Consecrating the Sacred Threshold' : 'Fulfilling Mother Parvati’s Sacred Trust'}
              </span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-right">
            <span className="text-[10px] text-stone-400 uppercase font-cinzel block">Phase</span>
            <span className="text-xs font-bold text-amber-300 font-cinzel">
              {phase === 'prep' ? '1: Preparation' : '2: Guardianship'}
            </span>
          </div>
        </div>

        {/* Feedback Message */}
        <div className="mb-4">
          <GentleFeedback
            message={feedback?.message || null}
            type={feedback?.type || 'info'}
          />
        </div>

        {/* PHASE 1: Preparation Slots & Offerings */}
        {phase === 'prep' && (
          <div className="space-y-4">
            {/* Threshold Consecration Altar */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/30 text-center">
              <span className="text-xs font-bold font-cinzel text-amber-200 block mb-2">
                Sanctum Threshold Offerings ({placedItems.length} / 4)
              </span>
              <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto">
                {SANCTUM_ITEMS.filter((i) => i.isSacred).map((item) => {
                  const isPlaced = placedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center min-h-[85px] transition-all duration-300 ${
                        isPlaced
                          ? 'bg-amber-950/60 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105'
                          : 'bg-stone-900/60 border-dashed border-stone-700 text-stone-600'
                      }`}
                    >
                      {isPlaced ? (
                        <>
                          <span className="text-2xl animate-bounce">{item.symbol}</span>
                          <span className="text-[10px] font-bold text-amber-200 mt-1 truncate max-w-full">
                            {item.name.split(' ')[0]}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-full border border-stone-700 flex items-center justify-center text-[10px] font-cinzel text-stone-500">
                            ?
                          </div>
                          <span className="text-[9px] text-stone-500 mt-1 truncate">
                            {item.name.split(' ')[0]}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Offerings to Select */}
            <div>
              <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider block mb-2">
                Select Sacred Offerings to Consecrate Threshold
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {items.map((item) => (
                  <button
                    key={item.id}
                    id={`prep-item-${item.id}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.placed}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                      item.placed
                        ? 'bg-stone-950/40 border-stone-800 opacity-40 cursor-not-allowed'
                        : 'bg-stone-900/80 hover:bg-stone-800 border-amber-500/30 hover:border-amber-400 hover:scale-[1.02] active:scale-98 shadow-md'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-stone-950/80 border border-amber-500/20">
                      {item.symbol}
                    </span>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold font-cinzel text-amber-100 truncate">
                        {item.name}
                      </h5>
                      <p className="text-[10px] text-stone-400 line-clamp-2 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: Active Threshold Guardianship */}
        {phase === 'guard' && currentSituation && (
          <div className="space-y-4 animate-fade-in">
            {/* Situation Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-stone-950/80 border border-amber-400/50 flex items-start gap-3.5 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {currentSituation.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider font-cinzel">
                    Encounter {currentSituationIdx + 1} of {GUARDIAN_SITUATIONS.length}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    Situation {currentSituationIdx + 1}/4
                  </span>
                </div>
                <h4 className="text-sm font-bold font-cinzel text-amber-100 mt-0.5">
                  {currentSituation.visitor}
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {currentSituation.description}
                </p>
              </div>
            </div>

            {/* Prompt & Decision Buttons */}
            <div>
              <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider block mb-2">
                {currentSituation.prompt}
              </span>
              <div className="space-y-2.5">
                {currentSituation.actions.map((act) => {
                  const isSelected = selectedActionId === act.id;
                  return (
                    <button
                      key={act.id}
                      id={`guardian-act-${act.id}`}
                      onClick={() => handleGuardianAction(act)}
                      disabled={!!selectedActionId}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 text-xs font-medium ${
                        isSelected
                          ? act.isRightDuty
                            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/40'
                            : 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/40'
                          : 'bg-stone-900/80 hover:bg-stone-800 border-amber-500/30 hover:border-amber-400 text-stone-200 active:scale-98'
                      }`}
                    >
                      <span className="leading-relaxed flex-1">{act.text}</span>
                      {isSelected && (
                        <span className="shrink-0">
                          {act.isRightDuty ? (
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
        )}
      </div>
    </div>
  );
};
