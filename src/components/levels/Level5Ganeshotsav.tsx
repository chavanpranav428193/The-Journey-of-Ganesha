import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Shield, Heart, Users, Leaf, Music, Award, ArrowRight } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface FestivalInitiative {
  id: string;
  name: string;
  cost: number;
  icon: string;
  devotion: number;
  community: number;
  culture: number;
  safety: number;
  environment: number;
  desc: string;
  isEco: boolean;
  selected: boolean;
}

interface Level5GaneshotsavProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level5Ganeshotsav: React.FC<Level5GaneshotsavProps> = ({ onComplete }) => {
  const TOTAL_BUDGET = 10000;
  const [stage, setStage] = useState<'planning' | 'visarjan' | 'complete'>('planning');
  const [initiatives, setInitiatives] = useState<FestivalInitiative[]>([
    {
      id: 'eco_idol',
      name: 'Natural Clay (Shadu Mati) Idol with Seeds',
      cost: 2500,
      icon: '🌱',
      devotion: 25,
      community: 15,
      culture: 20,
      safety: 10,
      environment: 35,
      desc: 'Traditional clay dissolves gently in water, allowing seeds inside to sprout into flowering plants.',
      isEco: true,
      selected: false
    },
    {
      id: 'traditional_aarti',
      name: 'Sacred Aarti & Chanting Sessions',
      cost: 1200,
      icon: '🪔',
      devotion: 35,
      community: 20,
      culture: 25,
      safety: 10,
      environment: 10,
      desc: 'Daily communal prayer singing traditional hymns that uplift the spirit of all present.',
      isEco: true,
      selected: false
    },
    {
      id: 'flower_cloth_decor',
      name: 'Biodegradable Cloth & Fresh Flower Mandap',
      cost: 1500,
      icon: '🌺',
      devotion: 20,
      community: 15,
      culture: 30,
      safety: 15,
      environment: 25,
      desc: 'Hand-woven fabrics and marigold garlands that compose naturally without plastic debris.',
      isEco: true,
      selected: false
    },
    {
      id: 'safety_patrol',
      name: 'Volunteer Safety Patrol & Crowd Queue',
      cost: 1200,
      icon: '🛡️',
      devotion: 10,
      community: 25,
      culture: 10,
      safety: 40,
      environment: 15,
      desc: 'Organized barricades, first-aid help, and respectful lines for elderly and children.',
      isEco: false,
      selected: false
    },
    {
      id: 'acoustic_music',
      name: 'Decibel-Controlled Folk Music & Dhol Tasha',
      cost: 1000,
      icon: '🥁',
      devotion: 20,
      community: 25,
      culture: 35,
      safety: 20,
      environment: 20,
      desc: 'Traditional rhythmic drums kept at moderate sound levels to protect hospital zones and infants.',
      isEco: true,
      selected: false
    },
    {
      id: 'cleanliness_water',
      name: 'Free Drinking Water & Cleanliness Drive',
      cost: 1000,
      icon: '💧',
      devotion: 15,
      community: 35,
      culture: 10,
      safety: 25,
      environment: 30,
      desc: 'Waste segregation bins and clean hydration stations throughout the festival avenue.',
      isEco: true,
      selected: false
    },
    {
      id: 'classical_arts',
      name: 'Classical Dance & Cultural Discussions',
      cost: 800,
      icon: '🎭',
      devotion: 15,
      community: 25,
      culture: 35,
      safety: 10,
      environment: 15,
      desc: 'Tilak’s original vision: public forums where youth engage in music, arts, and social dialogue.',
      isEco: false,
      selected: false
    },
    {
      id: 'annadanam',
      name: 'Community Annadanam (Free Meals)',
      cost: 800,
      icon: '🍲',
      devotion: 30,
      community: 40,
      culture: 15,
      safety: 15,
      environment: 10,
      desc: 'Warm, nutritious prasad distributed freely to all neighbors and visitors regardless of status.',
      isEco: false,
      selected: false
    }
  ]);

  // Visarjan stage states
  const [visarjanStep, setVisarjanStep] = useState(0);

  // Budget calculations
  const spentBudget = initiatives
    .filter((i) => i.selected)
    .reduce((sum, curr) => sum + curr.cost, 0);
  const remainingBudget = TOTAL_BUDGET - spentBudget;

  // Aspect scores
  const selectedItems = initiatives.filter((i) => i.selected);
  const devotionScore = Math.min(100, selectedItems.reduce((acc, curr) => acc + curr.devotion, 0));
  const communityScore = Math.min(100, selectedItems.reduce((acc, curr) => acc + curr.community, 0));
  const cultureScore = Math.min(100, selectedItems.reduce((acc, curr) => acc + curr.culture, 0));
  const safetyScore = Math.min(100, selectedItems.reduce((acc, curr) => acc + curr.safety, 0));
  const environmentScore = Math.min(100, selectedItems.reduce((acc, curr) => acc + curr.environment, 0));

  const handleToggleInitiative = (item: FestivalInitiative) => {
    if (!item.selected && remainingBudget < item.cost) {
      soundService.playHint();
      return;
    }

    soundService.playClick();
    setInitiatives((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, selected: !i.selected } : i))
    );
  };

  const handleProceedToVisarjan = () => {
    soundService.playCorrect();
    setStage('visarjan');
  };

  const handleVisarjanStep = () => {
    soundService.playCollectSound();
    const nextStep = visarjanStep + 1;
    setVisarjanStep(nextStep);

    if (nextStep >= 3) {
      soundService.playLevelComplete();
      setTimeout(() => {
        // Compute final score up to 700 + bonuses
        const aspectAvg = (devotionScore + communityScore + cultureScore + safetyScore + environmentScore) / 5;
        const baseScore = Math.round((aspectAvg / 100) * 700);
        const ecoBonus = environmentScore >= 80 ? 100 : 50;
        const budgetBonus = remainingBudget >= 0 ? 50 : 0;
        onComplete(baseScore, ecoBonus + budgetBonus);
      }, 2000);
    }
  };

  if (stage === 'visarjan') {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none text-center">
        <div className="w-full bg-stone-900/95 border border-amber-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <GaneshaLogo size="md" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-cinzel font-bold mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>The Sacred Visarjan Farewell Ceremony</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100 mb-2">
            Form Returns to Formlessness
          </h2>

          <p className="text-xs text-stone-300 max-w-md mx-auto mb-6 leading-relaxed">
            Visarjan teaches that divine grace does not end with the festival. In modern celebrations, eco-friendly immersion in community water tubs ensures our rivers stay pure while nature thrives.
          </p>

          {/* Immersion Tub Visual */}
          <div className="h-44 rounded-2xl bg-gradient-to-b from-blue-950/60 to-stone-950 border border-cyan-500/40 p-4 mb-6 relative flex flex-col items-center justify-center overflow-hidden">
            <div className="text-4xl transition-all duration-700 transform" style={{
              transform: `translateY(${visarjanStep * 28}px) scale(${1 - visarjanStep * 0.2})`,
              opacity: 1 - visarjanStep * 0.25
            }}>
              🐘
            </div>

            <div className="absolute bottom-2 w-full px-4 flex items-center justify-center gap-2">
              <span className="text-xs font-bold font-cinzel text-cyan-300">
                {visarjanStep === 0 && 'Clay idol placed gently at the sacred water tub'}
                {visarjanStep === 1 && 'Chanting "Ganpati Bappa Morya! Pudhchya Varshi Lavkar Ya!"'}
                {visarjanStep === 2 && 'Natural clay dissolving gently into nourishing soil'}
                {visarjanStep >= 3 && '🌱 Clay sprouts into living plants! Eternal presence in nature.'}
              </span>
            </div>
          </div>

          <button
            id="visarjan-chant-btn"
            onClick={handleVisarjanStep}
            disabled={visarjanStep >= 3}
            className={`w-full py-3.5 px-6 rounded-xl font-bold font-cinzel text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
              visarjanStep >= 3
                ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950'
            }`}
          >
            {visarjanStep === 0 && <span>Begin Reverent Immersion</span>}
            {visarjanStep === 1 && <span>Chant: "Ganpati Bappa Morya!"</span>}
            {visarjanStep === 2 && <span>Chant: "Pudhchya Varshi Lavkar Ya!"</span>}
            {visarjanStep >= 3 && <span>Farewell Complete with Honor & Eco-Harmony</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Top Banner */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-3 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GaneshaLogo size="sm" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
              Level 5: From Tradition to Ganeshotsav
            </span>
            <h3 className="text-sm font-bold font-cinzel text-amber-100">
              Build a Responsible Ganeshotsav
            </h3>
          </div>
        </div>

        {/* Budget Counter */}
        <div className="px-3 py-1.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-right">
          <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-cinzel">
            Remaining Budget
          </span>
          <span className={`text-sm font-extrabold font-cinzel ${remainingBudget < 1000 ? 'text-orange-400' : 'text-amber-300'}`}>
            ₹{remainingBudget.toLocaleString()} / ₹10,000
          </span>
        </div>
      </div>

      {/* 5 Balance Pillars Meter */}
      <div className="w-full bg-stone-900/90 border border-amber-500/30 rounded-2xl p-3.5 mb-3 shadow-md">
        <div className="text-[11px] font-bold font-cinzel text-amber-300 mb-2 uppercase tracking-wider text-center">
          Balance The 5 Pillars of Ganeshotsav
        </div>
        <div className="grid grid-cols-5 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-300 mb-1">
              <span>🙏</span>
              <span className="hidden sm:inline">Devotion</span>
            </div>
            <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
              <div className="h-full bg-amber-400 transition-all" style={{ width: `${devotionScore}%` }} />
            </div>
            <span className="text-[10px] font-bold text-amber-200 mt-0.5 block">{devotionScore}%</span>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-300 mb-1">
              <span>👥</span>
              <span className="hidden sm:inline">Community</span>
            </div>
            <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
              <div className="h-full bg-blue-400 transition-all" style={{ width: `${communityScore}%` }} />
            </div>
            <span className="text-[10px] font-bold text-blue-200 mt-0.5 block">{communityScore}%</span>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-300 mb-1">
              <span>🎨</span>
              <span className="hidden sm:inline">Culture</span>
            </div>
            <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
              <div className="h-full bg-purple-400 transition-all" style={{ width: `${cultureScore}%` }} />
            </div>
            <span className="text-[10px] font-bold text-purple-200 mt-0.5 block">{cultureScore}%</span>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-300 mb-1">
              <span>🛡️</span>
              <span className="hidden sm:inline">Safety</span>
            </div>
            <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
              <div className="h-full bg-orange-400 transition-all" style={{ width: `${safetyScore}%` }} />
            </div>
            <span className="text-[10px] font-bold text-orange-200 mt-0.5 block">{safetyScore}%</span>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-300 mb-1">
              <span>♻️</span>
              <span className="hidden sm:inline">Eco</span>
            </div>
            <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
              <div className="h-full bg-emerald-400 transition-all" style={{ width: `${environmentScore}%` }} />
            </div>
            <span className="text-[10px] font-bold text-emerald-200 mt-0.5 block">{environmentScore}%</span>
          </div>
        </div>
      </div>

      {/* Initiatives Selection Grid */}
      <div className="w-full space-y-2 mb-4">
        {initiatives.map((item) => {
          const canAfford = item.selected || remainingBudget >= item.cost;
          return (
            <button
              key={item.id}
              id={`initiative-${item.id}`}
              onClick={() => handleToggleInitiative(item)}
              disabled={!canAfford && !item.selected}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 active:scale-98 ${
                item.selected
                  ? 'bg-amber-950/70 border-amber-400 text-amber-100 shadow-md ring-1 ring-amber-400/50'
                  : canAfford
                  ? 'bg-stone-900/80 border-stone-700 hover:border-amber-500/60 text-stone-200'
                  : 'opacity-40 border-stone-800 bg-stone-950/40 cursor-not-allowed text-stone-500'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-stone-950/80 border border-stone-800 flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-cinzel text-amber-100 truncate">
                      {item.name}
                    </span>
                    {item.isEco && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shrink-0">
                        Eco
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 block line-clamp-1 mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold font-cinzel text-amber-300 block">
                  ₹{item.cost.toLocaleString()}
                </span>
                <span className={`text-[10px] font-bold ${item.selected ? 'text-emerald-400' : 'text-stone-400'}`}>
                  {item.selected ? 'Selected ✓' : '+ Add'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Button to Visarjan */}
      <div className="w-full">
        <button
          id="proceed-to-visarjan-btn"
          onClick={handleProceedToVisarjan}
          disabled={selectedItems.length < 4}
          className={`w-full py-3.5 px-6 rounded-xl font-bold font-cinzel text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
            selectedItems.length >= 4
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
          }`}
        >
          <span>Conclude with Visarjan Ceremony ({selectedItems.length}/8 chosen)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
