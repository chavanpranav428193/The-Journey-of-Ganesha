import React, { useState } from 'react';
import { Heart, Users, Shield, Sparkles, CheckCircle2, AlertCircle, Award, Scale, HelpCircle } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { Character } from '../Character';
import { LevelHeader } from './LevelHeader';
import { MetricBar } from './MetricBar';
import { GentleFeedback } from './GentleFeedback';
import { GaneshaExpression } from '../../types';

interface StrategyOption {
  id: string;
  title: string;
  actionText: string;
  devotionDelta: number;
  communityDelta: number;
  responsibilityDelta: number;
  explanation: string;
  isHarmonious: boolean;
}

interface CommunityScenario {
  id: number;
  topic: string;
  context: string;
  prompt: string;
  icon: string;
  options: StrategyOption[];
}

const SCENARIOS: CommunityScenario[] = [
  {
    id: 1,
    topic: 'Historical Public Unity (The 1890s Legacy)',
    context: 'Ganesh Chaturthi has ancient roots. In the 1890s, Lokmanya Tilak and social reformers expanded the festival into a public community platform (Sarvajanik Ganeshotsav) to bring diverse citizens together for worship, culture, and national unity.',
    prompt: 'How will you structure the founding community pandal?',
    icon: '🏛️',
    options: [
      {
        id: 'unity_open',
        title: 'Inclusive Open Mandap & Cultural Arts',
        actionText: 'Welcome people of all backgrounds with classical music, civic education lectures, and communal prasad.',
        devotionDelta: 25,
        communityDelta: 25,
        responsibilityDelta: 20,
        explanation: 'Fulfills Tilak’s vision! The festival becomes an open, dignified platform uniting community in spiritual devotion.',
        isHarmonious: true
      },
      {
        id: 'unity_vip',
        title: 'Exclusive High-Priced VIP Enclosure',
        actionText: 'Restrict access to wealthy patrons and shut the gates to local working families to maximize revenue.',
        devotionDelta: -10,
        communityDelta: -30,
        responsibilityDelta: -20,
        explanation: 'Exclusion breaks the soul of Sarvajanik Ganeshotsav, breeding inequality and alienating neighbors.',
        isHarmonious: false
      },
      {
        id: 'unity_partisan',
        title: 'Factional Divisive Rally',
        actionText: 'Use the holy altar for inflammatory political arguments and neighborhood rivalries.',
        devotionDelta: -25,
        communityDelta: -25,
        responsibilityDelta: -20,
        explanation: 'Injecting discord desecrates the sanctum and damages community solidarity.',
        isHarmonious: false
      }
    ]
  },
  {
    id: 2,
    topic: 'Sacred Murti & Artisan Livelihoods',
    context: 'Selecting the community idol sets the ethical and environmental tone for the entire neighborhood.',
    prompt: 'Which idol will you consecrate on the altar?',
    icon: '🌱',
    options: [
      {
        id: 'murti_clay',
        title: 'Handcrafted Shadu Clay with Natural Pigments',
        actionText: 'Commission local traditional potters using river silt, unbaked clay, and plant-based dyes.',
        devotionDelta: 20,
        communityDelta: 20,
        responsibilityDelta: 25,
        explanation: 'Honors ancient tradition, supports heritage artisan livelihoods, and safeguards rivers from chemical toxicity.',
        isHarmonious: true
      },
      {
        id: 'murti_pop',
        title: 'Massive Chemical Plaster of Paris (POP) Idol',
        actionText: 'Import a 35-foot synthetic chemical idol coated in non-biodegradable synthetic lead paints.',
        devotionDelta: 5,
        communityDelta: -10,
        responsibilityDelta: -35,
        explanation: 'Flashy exterior, but Plaster of Paris poisons lakes, chokes water bodies, and violates the principle of harmony with nature.',
        isHarmonious: false
      },
      {
        id: 'murti_seed',
        title: 'Biodegradable Seed-Embedded Clay Idol',
        actionText: 'Sculpt an idol filled with organic soil and native tree seeds that bloom into flowering plants after puja.',
        devotionDelta: 20,
        communityDelta: 20,
        responsibilityDelta: 30,
        explanation: 'Innovative and auspicious! Visarjan gives birth to new living trees, embodying the eternal cycle of creation.',
        isHarmonious: true
      }
    ]
  },
  {
    id: 3,
    topic: 'Soundscape & Acoustic Mindfulness',
    context: 'Processions and aartis bring immense joy, but sound levels affect elderly residents, students, hospitals, and animals.',
    prompt: 'How will you manage music and sound amplification?',
    icon: '🥁',
    options: [
      {
        id: 'sound_dhol',
        title: 'Traditional Dhol-Tasha Troupe with 10 PM Decibel Limit',
        actionText: 'Promote traditional rhythmic drumming by youth troupes, strictly respecting night silence zones near hospitals.',
        devotionDelta: 25,
        communityDelta: 25,
        responsibilityDelta: 20,
        explanation: 'Preserves cherished cultural drumming arts while showing civic empathy to vulnerable community members.',
        isHarmonious: true
      },
      {
        id: 'sound_dj',
        title: 'Deafening Midnight High-Decibel DJ Wall',
        actionText: 'Blast 10,000-watt commercial bass speakers through the night regardless of complaints.',
        devotionDelta: -10,
        communityDelta: -30,
        responsibilityDelta: -35,
        explanation: 'Causes acute acoustic distress to infants, hospital patients, and stray animals. True devotion needs no noise violations.',
        isHarmonious: false
      },
      {
        id: 'sound_ban',
        title: 'Total Silence and Ban on All Instruments',
        actionText: 'Prohibit all bells, conch shells, traditional chants, and communal aartis completely.',
        devotionDelta: -25,
        communityDelta: -20,
        responsibilityDelta: 10,
        explanation: 'Excessive suppression drains the festive joy and devotional spirit of collective worship.',
        isHarmonious: false
      }
    ]
  },
  {
    id: 4,
    topic: 'Accessibility, Safety & Civic Order',
    context: 'Tens of thousands of pilgrims line up for darshan. Managing queues, elderly comfort, and waste is paramount.',
    prompt: 'How will you manage the crowds and sanitation?',
    icon: '👥',
    options: [
      {
        id: 'access_universal',
        title: 'Wheelchair Ramps, Clean Drinking Water & Waste Segregation',
        actionText: 'Organize youth volunteer squads for universal access, free hydration, and zero-plastic composting.',
        devotionDelta: 20,
        communityDelta: 30,
        responsibilityDelta: 25,
        explanation: 'Stupendous stewardship! Devotees feel cherished, vulnerable citizens are respected, and the premises remain pristine.',
        isHarmonious: true
      },
      {
        id: 'access_paid',
        title: 'Extortionate Fast-Track Paid Corridors',
        actionText: 'Give privilege only to those who pay steep entry fees, forcing elderly pilgrims to stand 6 hours without water.',
        devotionDelta: -15,
        communityDelta: -30,
        responsibilityDelta: -20,
        explanation: 'Corrupts spiritual equality before Ganesha and causes heat exhaustion among waiting pilgrims.',
        isHarmonious: false
      }
    ]
  },
  {
    id: 5,
    topic: 'Sacred Visarjan (Immersion & Environmental Farewell)',
    context: 'Visarjan marks the divine departure with heartfelt chants of "Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya". It symbolizes returning form back to formless nature.',
    prompt: 'How will your mandap perform the ceremonial immersion?',
    icon: '🌊',
    options: [
      {
        id: 'visarjan_tank',
        title: 'Municipal Eco-Friendly Artificial Immersion Tanks',
        actionText: 'Immerse the clay murti in dedicated community water tanks, reusing the sacred silt for municipal gardens.',
        devotionDelta: 25,
        communityDelta: 25,
        responsibilityDelta: 30,
        explanation: 'Perfect balance! Deeply honors the spiritual cycle of Visarjan while protecting natural rivers, fish, and drinking water.',
        isHarmonious: true
      },
      {
        id: 'visarjan_dump',
        title: 'Discarding Plaster Idols & Plastic in Natural Lakes',
        actionText: 'Dump non-dissolving idols, plastic garlands, and trash directly into public drinking reservoirs.',
        devotionDelta: -20,
        communityDelta: -25,
        responsibilityDelta: -45,
        explanation: 'Causes severe ecological devastation and pollutes the drinking water of future generations.',
        isHarmonious: false
      },
      {
        id: 'visarjan_home',
        title: 'Courtyard Water Drum Immersion & Garden Blessing',
        actionText: 'Immerse clay Ganesha in a clean drum at the pandal courtyard, pouring the sanctified water on Tulsi plants.',
        devotionDelta: 20,
        communityDelta: 20,
        responsibilityDelta: 25,
        explanation: 'Intimate, reverent, and gentle on the earth. Returns Ganesha’s blessings straight to the soil.',
        isHarmonious: true
      }
    ]
  }
];

interface Level5GaneshotsavProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level5Ganeshotsav: React.FC<Level5GaneshotsavProps> = ({ onComplete }) => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // The 3 Mandated Meters: Devotion, Community, Responsibility
  const [devotionMeter, setDevotionMeter] = useState(50);
  const [communityMeter, setCommunityMeter] = useState(50);
  const [responsibilityMeter, setResponsibilityMeter] = useState(50);

  const [devotionDelta, setDevotionDelta] = useState<number | null>(null);
  const [communityDelta, setCommunityDelta] = useState<number | null>(null);
  const [responsibilityDelta, setResponsibilityDelta] = useState<number | null>(null);

  const [ganeshaExpr, setGaneshaExpr] = useState<GaneshaExpression>('focused');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>({
    message: 'Lead your Sarvajanik Ganeshotsav community! Balance Devotion, Community, and Responsibility across all decisions.',
    type: 'info'
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const scenario = SCENARIOS[currentScenarioIdx];

  const handleSelectOption = (opt: StrategyOption) => {
    if (selectedOptionId || isCompleted) return;
    setSelectedOptionId(opt.id);

    // Apply deltas
    setDevotionDelta(opt.devotionDelta);
    setCommunityDelta(opt.communityDelta);
    setResponsibilityDelta(opt.responsibilityDelta);

    const nextDev = Math.min(Math.max(devotionMeter + opt.devotionDelta, 10), 100);
    const nextCom = Math.min(Math.max(communityMeter + opt.communityDelta, 10), 100);
    const nextRes = Math.min(Math.max(responsibilityMeter + opt.responsibilityDelta, 10), 100);

    setDevotionMeter(nextDev);
    setCommunityMeter(nextCom);
    setResponsibilityMeter(nextRes);

    if (opt.isHarmonious) {
      soundService.playCorrect();
      setGaneshaExpr('joyful');
      setFeedback({
        message: opt.explanation,
        type: 'success'
      });
    } else {
      soundService.playHint();
      setGaneshaExpr('thinking');
      setFeedback({
        message: `${opt.explanation} Notice how skewed decisions undermine community harmony.`,
        type: 'warning'
      });
    }

    setTimeout(() => {
      if (currentScenarioIdx < SCENARIOS.length - 1) {
        setCurrentScenarioIdx((prev) => prev + 1);
        setSelectedOptionId(null);
        setDevotionDelta(null);
        setCommunityDelta(null);
        setResponsibilityDelta(null);
      } else {
        // Complete Level 5
        setIsCompleted(true);
        soundService.playLevelComplete();

        const baseScore = 700;
        // Balanced performance bonus
        const isHarmoniousTrio = nextDev >= 60 && nextCom >= 60 && nextRes >= 60;
        const balanceBonus = isHarmoniousTrio ? 200 : 100;

        setTimeout(() => {
          onComplete(baseScore, balanceBonus);
        }, 2800);
      }
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none text-stone-100">
      {/* Reusable Level Header */}
      <LevelHeader
        levelNumber={5}
        title="Responsible Ganeshotsav"
        subtitle="Strategy, Civic Harmony & Sacred Farewell"
        objective="Guide Sarvajanik Ganeshotsav to harmony by balancing Devotion, Community, and Responsibility."
        badgeIcon={<Scale className="w-3.5 h-3.5 text-amber-400" />}
        rightElement={
          <div className="flex items-center gap-1.5">
            {SCENARIOS.map((_, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  idx === currentScenarioIdx
                    ? 'bg-amber-500 text-stone-950 scale-110 ring-2 ring-amber-400/50'
                    : idx < currentScenarioIdx
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

      {/* The 3 Required Balance Meters */}
      <div className="w-full grid grid-cols-3 gap-2.5 mb-4">
        <div className="p-3 rounded-2xl bg-stone-900/90 border border-amber-500/30 shadow-md">
          <MetricBar
            label="Devotion"
            value={devotionMeter}
            max={100}
            icon={<Heart className="w-3.5 h-3.5 text-amber-400" />}
            variant="amber"
            delta={devotionDelta}
            size="md"
          />
        </div>
        <div className="p-3 rounded-2xl bg-stone-900/90 border border-blue-500/30 shadow-md">
          <MetricBar
            label="Community"
            value={communityMeter}
            max={100}
            icon={<Users className="w-3.5 h-3.5 text-cyan-400" />}
            variant="blue"
            delta={communityDelta}
            size="md"
          />
        </div>
        <div className="p-3 rounded-2xl bg-stone-900/90 border border-emerald-500/30 shadow-md">
          <MetricBar
            label="Responsibility"
            value={responsibilityMeter}
            max={100}
            icon={<Shield className="w-3.5 h-3.5 text-emerald-400" />}
            variant="emerald"
            delta={responsibilityDelta}
            size="md"
          />
        </div>
      </div>

      {/* Main Strategy Stage */}
      <div className="w-full bg-gradient-to-b from-stone-900/90 via-[#180e07] to-stone-950/95 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden mb-4">
        {/* Character Stage */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <Character expression={ganeshaExpr} size="sm" showAura={true} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block">
                Festival Committee Steward
              </span>
              <h4 className="text-sm font-bold text-amber-100 font-cinzel">
                Harmonious Ganeshotsav
              </h4>
              <span className="text-xs text-stone-300 font-medium">
                Balancing Spiritual Devotion & Civic Care
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-cinzel block">Scenario</span>
            <span className="text-sm font-bold text-amber-300 font-mono">
              {currentScenarioIdx + 1} / {SCENARIOS.length}
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

        {/* Current Scenario Card */}
        {scenario && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-stone-950/80 border border-amber-400/50 flex items-start gap-3.5 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {scenario.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-400 font-cinzel tracking-wider block">
                  Scenario {scenario.id} of {SCENARIOS.length}
                </span>
                <h4 className="text-sm font-bold font-cinzel text-amber-100 mt-0.5">
                  {scenario.topic}
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {scenario.context}
                </p>
              </div>
            </div>

            {/* Prompt & Strategic Choices */}
            <div>
              <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider block mb-2">
                {scenario.prompt}
              </span>
              <div className="space-y-2.5">
                {scenario.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      id={`strategy-opt-${opt.id}`}
                      onClick={() => handleSelectOption(opt)}
                      disabled={!!selectedOptionId}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? opt.isHarmonious
                            ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/40'
                            : 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400/40'
                          : 'bg-stone-900/80 hover:bg-stone-800 border-amber-500/30 hover:border-amber-400 text-stone-200 active:scale-98'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold font-cinzel text-amber-100">
                            {opt.title}
                          </h5>
                          <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                            {opt.actionText}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="shrink-0 mt-0.5">
                            {opt.isHarmonious ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-400" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Projected Meter Impacts */}
                      <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center gap-3 text-[10px] font-mono">
                        <span className={opt.devotionDelta >= 0 ? 'text-amber-300' : 'text-stone-500'}>
                          Devotion: {opt.devotionDelta >= 0 ? `+${opt.devotionDelta}` : opt.devotionDelta}
                        </span>
                        <span className={opt.communityDelta >= 0 ? 'text-cyan-300' : 'text-stone-500'}>
                          Community: {opt.communityDelta >= 0 ? `+${opt.communityDelta}` : opt.communityDelta}
                        </span>
                        <span className={opt.responsibilityDelta >= 0 ? 'text-emerald-300' : 'text-stone-500'}>
                          Responsibility: {opt.responsibilityDelta >= 0 ? `+${opt.responsibilityDelta}` : opt.responsibilityDelta}
                        </span>
                      </div>
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
