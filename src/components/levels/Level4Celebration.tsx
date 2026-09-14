import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Heart, Users, Shield, Coins, Award } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { Character } from '../Character';
import { LevelHeader } from './LevelHeader';
import { MetricBar } from './MetricBar';
import { GentleFeedback } from './GentleFeedback';
import { GaneshaExpression } from '../../types';

interface BuildingOption {
  id: string;
  name: string;
  cost: number;
  celebrationDelta: number;
  communityDelta: number;
  traditionDelta: number;
  responsibilityDelta: number;
  icon: string;
  desc: string;
  rationale: string;
  isRecommended: boolean;
}

interface BuildingCategory {
  id: string;
  title: string;
  categoryLabel: string;
  prompt: string;
  options: BuildingOption[];
}

const CATEGORIES: BuildingCategory[] = [
  {
    id: 'murti',
    title: 'Ganesha Murti (The Idol)',
    categoryLabel: 'Divine Form',
    prompt: 'Choose the sacred murti for Prana Pratishtha installation:',
    options: [
      {
        id: 'shadu_murti',
        name: 'Hand-Sculpted Natural Shadu Clay Murti',
        cost: 1200,
        celebrationDelta: 20,
        communityDelta: 15,
        traditionDelta: 25,
        responsibilityDelta: 25,
        icon: '🌱',
        desc: 'Traditional unbaked clay with turmeric and vegetable dyes that dissolves peacefully in water.',
        rationale: 'Deeply honors ancient tradition and protects aquatic life from chemical poisoning.',
        isRecommended: true
      },
      {
        id: 'pop_murti',
        name: 'Plaster of Paris (POP) Chemical Idol',
        cost: 500,
        celebrationDelta: 10,
        communityDelta: 5,
        traditionDelta: -10,
        responsibilityDelta: -25,
        icon: '🏭',
        desc: 'Cheap insoluble plaster painted with synthetic chemical heavy metals.',
        rationale: 'Saves budget initially, but toxic insoluble plaster chokes lakes and violates sacred purity.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'flowers',
    title: 'Floral Garlands & Foliage',
    categoryLabel: 'Fragrant Offerings',
    prompt: 'Select garlands to adorn the sacred mandap:',
    options: [
      {
        id: 'fresh_flowers',
        name: 'Fresh Red Hibiscus & Marigold Garlands',
        cost: 400,
        celebrationDelta: 15,
        communityDelta: 10,
        traditionDelta: 20,
        responsibilityDelta: 15,
        icon: '🌺',
        desc: 'Freshly woven blooms sourced from local farmers, 100% biodegradable.',
        rationale: 'Red hibiscus is Ganesha’s beloved flower; natural petals can be composted into sacred soil.',
        isRecommended: true
      },
      {
        id: 'plastic_flowers',
        name: 'Single-Use Plastic Garlands',
        cost: 150,
        celebrationDelta: 5,
        communityDelta: 0,
        traditionDelta: -10,
        responsibilityDelta: -15,
        icon: '🗑️',
        desc: 'Synthetic petrochemical garlands that do not decompose.',
        rationale: 'Cheap convenience, but lacks living prana and generates permanent plastic landfill waste.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'durva',
    title: 'Sacred Durva Grass',
    categoryLabel: 'Essential Puja Offering',
    prompt: 'Prepare the sacred 21 blades of Durva:',
    options: [
      {
        id: 'durva_fresh',
        name: '21 Sprigs of Fresh Sacred Durva Grass',
        cost: 250,
        celebrationDelta: 15,
        communityDelta: 10,
        traditionDelta: 25,
        responsibilityDelta: 15,
        icon: '🍃',
        desc: 'Traditional three-leaf sprigs of cooling grass, tied in auspicious bunches of 21.',
        rationale: 'Essential offering symbolizing humility; ancient scriptures prescribe Durva above gold.',
        isRecommended: true
      },
      {
        id: 'durva_omit',
        name: 'Skip Durva to Cut Costs',
        cost: 0,
        celebrationDelta: 0,
        communityDelta: 0,
        traditionDelta: -20,
        responsibilityDelta: -5,
        icon: '❌',
        desc: 'Omitting this foundational element to conserve budget.',
        rationale: 'Sacrifices a vital traditional ritual for minor financial savings.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'diyas',
    title: 'Sacred Illumination (Diyas)',
    categoryLabel: 'Light & Warmth',
    prompt: 'Choose the lighting to dispel darkness from the altar:',
    options: [
      {
        id: 'clay_diyas',
        name: 'Earthen Clay Diyas with Cotton Wicks',
        cost: 350,
        celebrationDelta: 15,
        communityDelta: 10,
        traditionDelta: 20,
        responsibilityDelta: 15,
        icon: '🪔',
        desc: 'Handmade terracotta lamps fueled with pure sesame oil and cotton wicks.',
        rationale: 'Creates serene meditative light, supports local potters, and generates zero electronic waste.',
        isRecommended: true
      },
      {
        id: 'strobe_lights',
        name: 'Harsh Commercial Strobe Lighting',
        cost: 700,
        celebrationDelta: 10,
        communityDelta: -5,
        traditionDelta: -15,
        responsibilityDelta: -15,
        icon: '💡',
        desc: 'High-wattage flashing strobe projectors with massive power consumption.',
        rationale: 'Distracting and disorienting for elders and children; wastes energy unnecessarily.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'modaks',
    title: 'Prasad (Sweet Offerings)',
    categoryLabel: 'Devotional Food',
    prompt: 'Prepare sweet prasadam for Ganesha and community:',
    options: [
      {
        id: 'steamed_modak',
        name: 'Traditional Steamed Ukadiche Modaks',
        cost: 600,
        celebrationDelta: 20,
        communityDelta: 25,
        traditionDelta: 25,
        responsibilityDelta: 20,
        icon: '🥟',
        desc: 'Rice flour dumplings filled with fresh grated coconut, cardamom, and jaggery.',
        rationale: 'Symbol of supreme spiritual bliss (Ananda) and cherished cultural hospitality.',
        isRecommended: true
      },
      {
        id: 'artificial_sweets',
        name: 'Mass-Produced Preserved Confectionery',
        cost: 250,
        celebrationDelta: 5,
        communityDelta: 5,
        traditionDelta: -15,
        responsibilityDelta: -10,
        icon: '🍬',
        desc: 'Cheap sugary sweets made with artificial dyes and preservatives.',
        rationale: 'Lacks the devotional purity and wholesome community tradition of handcrafted modaks.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'rangoli',
    title: 'Threshold Art (Rangoli & Toran)',
    categoryLabel: 'Auspicious Welcome',
    prompt: 'Decorate the entryway to welcome guests:',
    options: [
      {
        id: 'rice_rangoli',
        name: 'Natural Rice-Flour Rangoli & Mango Leaf Toran',
        cost: 300,
        celebrationDelta: 15,
        communityDelta: 15,
        traditionDelta: 20,
        responsibilityDelta: 15,
        icon: '🌸',
        desc: 'Intricate threshold patterns made with rice powder, turmeric, and fresh mango leaves.',
        rationale: 'Traditional art form inviting auspiciousness; feeds small ants and birds outside the door.',
        isRecommended: true
      },
      {
        id: 'sticker_rangoli',
        name: 'Plastic Adhesive Floor Stickers',
        cost: 150,
        celebrationDelta: 5,
        communityDelta: 0,
        traditionDelta: -10,
        responsibilityDelta: -10,
        icon: '🏷️',
        desc: 'Peel-and-stick vinyl decals leaving sticky toxic adhesive on floors.',
        rationale: 'Lacks the meditative craft of traditional rangoli and generates unrecyclable PVC waste.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'mandap',
    title: 'Mandap (Altar Canopy)',
    categoryLabel: 'Sanctuary Architecture',
    prompt: 'Construct the canopy shelter for the celebration:',
    options: [
      {
        id: 'bamboo_mandap',
        name: 'Artisanal Bamboo & Organic Cotton Canopy',
        cost: 900,
        celebrationDelta: 20,
        communityDelta: 20,
        traditionDelta: 20,
        responsibilityDelta: 20,
        icon: '🎋',
        desc: 'Eco-friendly bamboo pillars draped with khadi cloth and banana stems.',
        rationale: 'Supports rural artisans, creates a serene organic aesthetic, and leaves zero microplastic footprint.',
        isRecommended: true
      },
      {
        id: 'thermocol_mandap',
        name: 'Expanded Polystyrene (Thermocol) Backdrop',
        cost: 400,
        celebrationDelta: 10,
        communityDelta: 5,
        traditionDelta: -10,
        responsibilityDelta: -25,
        icon: '📦',
        desc: 'Cheap painted styrofoam cutouts that crumble into non-degradable fragments.',
        rationale: 'Major pollutant banned in many municipalities due to environmental devastation.',
        isRecommended: false
      }
    ]
  },
  {
    id: 'community',
    title: 'Community & Cultural Fellowship',
    categoryLabel: 'Shared Harmony',
    prompt: 'Organize community participation for neighbors and travelers:',
    options: [
      {
        id: 'bhajan_circle',
        name: 'Live Bhajan Mandal, Hydration & Elderly Lane',
        cost: 600,
        celebrationDelta: 20,
        communityDelta: 30,
        traditionDelta: 20,
        responsibilityDelta: 25,
        icon: '🥁',
        desc: 'Traditional chanting of Sukhkarta Dukhharta, free clean water, and accessible darshan.',
        rationale: 'Fulfills the core purpose of Ganesh Chaturthi: bringing people together in harmony and mutual care.',
        isRecommended: true
      },
      {
        id: 'blaring_dj',
        name: 'High-Decibel DJ Sound Wall Exceeding Limits',
        cost: 800,
        celebrationDelta: 15,
        communityDelta: -20,
        traditionDelta: -15,
        responsibilityDelta: -25,
        icon: '📢',
        desc: 'Deafening amplified bass speakers disturbing nearby hospital zones and infant rest.',
        rationale: 'Causes severe noise pollution, frightens animals, and damages community harmony.',
        isRecommended: false
      }
    ]
  }
];

interface Level4CelebrationProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level4Celebration: React.FC<Level4CelebrationProps> = ({ onComplete }) => {
  const INITIAL_BUDGET = 5000;
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, BuildingOption>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Dynamic 4 Core Balance Meters
  const [celebrationMeter, setCelebrationMeter] = useState(10);
  const [communityMeter, setCommunityMeter] = useState(10);
  const [traditionMeter, setTraditionMeter] = useState(10);
  const [responsibilityMeter, setResponsibilityMeter] = useState(10);

  const [ganeshaExpr, setGaneshaExpr] = useState<GaneshaExpression>('welcoming');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>({
    message: 'Welcome to the Festival Ground! You have ₹5,000 to thoughtfully build your Ganesh Chaturthi mandap.',
    type: 'info'
  });

  const currentCategory = CATEGORIES[currentCatIndex];

  const handleSelectOption = (opt: BuildingOption) => {
    if (selectedOptionId) return;

    if (budget < opt.cost) {
      soundService.playHint();
      setFeedback({
        message: `Insufficient Celebration Budget! You need ₹${opt.cost.toLocaleString()}, but only have ₹${budget.toLocaleString()} remaining.`,
        type: 'warning'
      });
      return;
    }

    setSelectedOptionId(opt.id);
    const newBudget = budget - opt.cost;
    setBudget(newBudget);

    // Update choices
    const updatedChoices = { ...selectedChoices, [currentCategory.id]: opt };
    setSelectedChoices(updatedChoices);

    // Update meters
    setCelebrationMeter((prev) => Math.min(Math.max(prev + opt.celebrationDelta, 0), 100));
    setCommunityMeter((prev) => Math.min(Math.max(prev + opt.communityDelta, 0), 100));
    setTraditionMeter((prev) => Math.min(Math.max(prev + opt.traditionDelta, 0), 100));
    setResponsibilityMeter((prev) => Math.min(Math.max(prev + opt.responsibilityDelta, 0), 100));

    if (opt.isRecommended) {
      soundService.playCorrect();
      setGaneshaExpr('joyful');
      setFeedback({
        message: `Harmonious choice: ${opt.name}! ${opt.rationale}`,
        type: 'success'
      });
    } else {
      soundService.playHint();
      setGaneshaExpr('thinking');
      setFeedback({
        message: `Mindful reflection: ${opt.name}. ${opt.rationale}`,
        type: 'warning'
      });
    }

    setTimeout(() => {
      if (currentCatIndex < CATEGORIES.length - 1) {
        setCurrentCatIndex((prev) => prev + 1);
        setSelectedOptionId(null);
      } else {
        // Complete Festival Building
        soundService.playLevelComplete();
        const baseScore = 700;
        const budgetBonus = Math.min(Math.round(newBudget / 10), 100);
        const responsibilityBonus = opt.isRecommended ? 50 : 20;

        setTimeout(() => {
          onComplete(baseScore, budgetBonus + responsibilityBonus);
        }, 2500);
      }
    }, 1800);
  };

  const isMandapCompleted = Object.keys(selectedChoices).length === CATEGORIES.length;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none text-stone-100">
      {/* Reusable Level Header */}
      <LevelHeader
        levelNumber={4}
        title="Build Ganesh Chaturthi"
        subtitle="Festival-Building & Resource Stewardship"
        objective="Design and consecrate the celebration mandap balancing Tradition, Community, and Responsibility within budget."
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
        rightElement={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold shadow-inner">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span>₹{budget.toLocaleString()} left</span>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              {currentCatIndex + 1}/{CATEGORIES.length}
            </span>
          </div>
        }
      />

      {/* 4 Dynamic Balance Meters Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800">
          <MetricBar
            label="Celebration"
            value={celebrationMeter}
            max={100}
            icon="🎉"
            variant="amber"
            size="sm"
          />
        </div>
        <div className="p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800">
          <MetricBar
            label="Community"
            value={communityMeter}
            max={100}
            icon="👥"
            variant="blue"
            size="sm"
          />
        </div>
        <div className="p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800">
          <MetricBar
            label="Tradition"
            value={traditionMeter}
            max={100}
            icon="🪔"
            variant="purple"
            size="sm"
          />
        </div>
        <div className="p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800">
          <MetricBar
            label="Responsibility"
            value={responsibilityMeter}
            max={100}
            icon="🌱"
            variant="emerald"
            size="sm"
          />
        </div>
      </div>

      {/* Main Building Stage */}
      <div className="w-full bg-gradient-to-b from-stone-900/90 via-[#180e07] to-stone-950/95 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden mb-4">
        {/* Visual Transforming Mandap Altar Preview */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/30 to-stone-950/90 border border-amber-500/40 mb-4 text-center relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-amber-400 font-cinzel tracking-wider block mb-1">
            Mandap Transformation Altar
          </span>

          {/* Dynamic Visual Stage with Placed Elements */}
          <div className="h-36 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-around relative overflow-hidden px-4">
            {/* Background Bamboo Canopy */}
            <div className={`absolute inset-x-0 top-0 h-8 transition-opacity duration-500 flex justify-between px-3 text-lg ${
              selectedChoices.mandap ? 'opacity-100' : 'opacity-20'
            }`}>
              <span>🎋</span>
              <span className="text-xs text-amber-300 font-cinzel font-bold">
                {selectedChoices.mandap ? selectedChoices.mandap.name.split(' ')[0] : 'Empty Canopy'}
              </span>
              <span>🎋</span>
            </div>

            {/* Left Offerings (Flowers & Diyas) */}
            <div className="flex flex-col items-center gap-1 z-10">
              <span className={`text-2xl transition-all duration-300 ${selectedChoices.flowers ? 'scale-110' : 'opacity-20'}`}>
                {selectedChoices.flowers ? selectedChoices.flowers.icon : '🌺'}
              </span>
              <span className={`text-2xl transition-all duration-300 ${selectedChoices.diyas ? 'scale-110 drop-shadow-[0_0_8px_gold]' : 'opacity-20'}`}>
                {selectedChoices.diyas ? selectedChoices.diyas.icon : '🪔'}
              </span>
            </div>

            {/* Center: Ganesha Murti on Sacred Throne */}
            <div className="flex flex-col items-center justify-center z-10">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                {selectedChoices.murti ? (
                  <span className="animate-pulse">{selectedChoices.murti.icon === '🌱' ? '🐘' : '🗿'}</span>
                ) : (
                  <span className="text-stone-600 text-sm font-cinzel">Throne</span>
                )}
              </div>
              <span className="text-[10px] font-bold text-amber-200 mt-1 font-cinzel">
                {selectedChoices.murti ? selectedChoices.murti.name.split(' ')[0] : 'Awaiting Murti'}
              </span>
            </div>

            {/* Right Offerings (Modak & Durva) */}
            <div className="flex flex-col items-center gap-1 z-10">
              <span className={`text-2xl transition-all duration-300 ${selectedChoices.modaks ? 'scale-110' : 'opacity-20'}`}>
                {selectedChoices.modaks ? selectedChoices.modaks.icon : '🥟'}
              </span>
              <span className={`text-2xl transition-all duration-300 ${selectedChoices.durva ? 'scale-110' : 'opacity-20'}`}>
                {selectedChoices.durva ? selectedChoices.durva.icon : '🍃'}
              </span>
            </div>

            {/* Bottom Floor (Rangoli & Community) */}
            <div className={`absolute inset-x-0 bottom-1 flex justify-between px-6 text-xs transition-opacity duration-500 ${
              selectedChoices.rangoli || selectedChoices.community ? 'opacity-100' : 'opacity-20'
            }`}>
              <span>{selectedChoices.rangoli ? selectedChoices.rangoli.icon : '🌸'}</span>
              <span className="text-[9px] text-stone-400 font-cinzel">
                {selectedChoices.community ? selectedChoices.community.name.split(' ')[0] : 'Community Space'}
              </span>
              <span>{selectedChoices.community ? selectedChoices.community.icon : '👥'}</span>
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        <div className="mb-4">
          <GentleFeedback
            message={feedback?.message || null}
            type={feedback?.type || 'info'}
          />
        </div>

        {/* Current Category Selection */}
        {!isMandapCompleted && currentCategory && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 font-cinzel block">
                  Category {currentCatIndex + 1} of {CATEGORIES.length}: {currentCategory.categoryLabel}
                </span>
                <h4 className="text-sm font-bold font-cinzel text-amber-100">
                  {currentCategory.title}
                </h4>
              </div>
              <span className="text-xs text-stone-400">
                {currentCategory.prompt}
              </span>
            </div>

            {/* 2 Competing Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {currentCategory.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const canAfford = budget >= opt.cost;

                return (
                  <button
                    key={opt.id}
                    id={`build-opt-${opt.id}`}
                    onClick={() => handleSelectOption(opt)}
                    disabled={!!selectedOptionId || !canAfford}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? opt.isRecommended
                          ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/40'
                          : 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400/40'
                        : canAfford
                        ? 'bg-stone-900/80 hover:bg-stone-800 border-amber-500/30 hover:border-amber-400 text-stone-200 active:scale-98'
                        : 'bg-stone-950/40 border-stone-800 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-2xl p-1.5 rounded-xl bg-stone-950 border border-stone-800 shrink-0">
                          {opt.icon}
                        </span>
                        <div className="flex items-center gap-1 font-mono font-bold text-xs text-amber-300 bg-stone-950/80 px-2 py-0.5 rounded-lg border border-amber-500/30">
                          <Coins className="w-3 h-3 text-yellow-400" />
                          <span>₹{opt.cost.toLocaleString()}</span>
                        </div>
                      </div>

                      <h5 className="text-xs font-bold font-cinzel text-amber-100 leading-snug">
                        {opt.name}
                      </h5>
                      <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>

                    {/* Impact Tags */}
                    <div className="mt-3 pt-2 border-t border-stone-800 flex flex-wrap gap-1.5 text-[9px] font-bold uppercase">
                      {opt.traditionDelta > 0 && (
                        <span className="text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded">
                          +{opt.traditionDelta} Tradition
                        </span>
                      )}
                      {opt.responsibilityDelta > 0 ? (
                        <span className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          +{opt.responsibilityDelta} Eco
                        </span>
                      ) : opt.responsibilityDelta < 0 ? (
                        <span className="text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded">
                          {opt.responsibilityDelta} Eco
                        </span>
                      ) : null}
                      {opt.communityDelta > 0 && (
                        <span className="text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">
                          +{opt.communityDelta} Community
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
