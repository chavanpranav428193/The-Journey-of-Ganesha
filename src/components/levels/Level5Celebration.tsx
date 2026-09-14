import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Leaf, Heart, Bell } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface MandapElement {
  id: string;
  name: string;
  symbol: string;
  category: 'puja' | 'decoration' | 'eco';
  isEcoFriendly: boolean;
  placed: boolean;
  description: string;
}

interface Level5CelebrationProps {
  onComplete: (score: number, stats: { correct: number; speedBonus: number; isEco: boolean }) => void;
}

export const Level5Celebration: React.FC<Level5CelebrationProps> = ({ onComplete }) => {
  const [elements, setElements] = useState<MandapElement[]>([
    {
      id: 'clay_idol',
      name: 'Natural Clay (Shadu Mati) Idol',
      symbol: '🐘',
      category: 'eco',
      isEcoFriendly: true,
      placed: false,
      description: 'Biodegradable clay dissolves naturally without harming aquatic life.'
    },
    {
      id: 'diyas',
      name: 'Clay Oil Diyas',
      symbol: '🪔',
      category: 'puja',
      isEcoFriendly: true,
      placed: false,
      description: 'Warm, golden illumination symbolizing the light of wisdom.'
    },
    {
      id: 'modaks',
      name: 'Steamed Ukadiche Modaks',
      symbol: '🍬',
      category: 'puja',
      isEcoFriendly: true,
      placed: false,
      description: 'Coconut and jaggery delicacy offered with pure devotion.'
    },
    {
      id: 'durva_grass',
      name: '21 Blades of Sacred Durva',
      symbol: '🍃',
      category: 'puja',
      isEcoFriendly: true,
      placed: false,
      description: 'Humility and freshness honoring Ganesha’s gentle nature.'
    },
    {
      id: 'marigold_toran',
      name: 'Fresh Marigold Toran',
      symbol: '🌺',
      category: 'decoration',
      isEcoFriendly: true,
      placed: false,
      description: 'Natural flowers welcoming guests and family to the mandap.'
    },
    {
      id: 'dhol_tasha',
      name: 'Joyful Dhol Tasha Rhythms',
      symbol: '🥁',
      category: 'decoration',
      isEcoFriendly: true,
      placed: false,
      description: 'Traditional community music fostering communal celebration and unity.'
    },
    {
      id: 'eco_immersion',
      name: 'Home Garden Tub Visarjan',
      symbol: '🌱',
      category: 'eco',
      isEcoFriendly: true,
      placed: false,
      description: 'Ceremonial immersion in a home water tank; enriched water is given to plants.'
    }
  ]);

  const [score, setScore] = useState(1500); // Base score
  const [activeMessage, setActiveMessage] = useState<string>(
    'Select each festive element to arrange the sacred community mandap.'
  );

  const handlePlaceElement = (elem: MandapElement) => {
    if (elem.placed) return;

    soundService.playCollectSound();
    soundService.playTempleBell();
    setScore((prev) => prev + 300);

    setElements((prev) => {
      const nextList = prev.map((item) => (item.id === elem.id ? { ...item, placed: true } : item));
      setActiveMessage(`Arranged: ${elem.name} — ${elem.description}`);

      if (nextList.every((item) => item.placed)) {
        // Complete!
        setTimeout(() => {
          soundService.playLevelComplete();
          const ecoBonus = 250;
          const perfectBonus = 750;
          const finalScore = score + 300 + ecoBonus + perfectBonus;

          onComplete(finalScore, { correct: 7, speedBonus: 200, isEco: true });
        }, 1500);
      }
      return nextList;
    });
  };

  const placedCount = elements.filter((e) => e.placed).length;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Mandap Altar Display Stage */}
      <div className="relative w-full bg-gradient-to-b from-stone-900/90 to-amber-950/90 border-2 border-amber-500/50 rounded-3xl p-5 mb-4 shadow-2xl text-center overflow-hidden">
        {/* Decorative Hanging Toran & Lights */}
        <div className="flex justify-between items-center px-4 mb-3 text-amber-400">
          <span className="text-xl">🪔</span>
          <div className="flex-1 border-t-2 border-dashed border-amber-500/40 mx-4" />
          <span className="text-xs uppercase font-bold tracking-widest font-cinzel">
            The Festive Mandap
          </span>
          <div className="flex-1 border-t-2 border-dashed border-amber-500/40 mx-4" />
          <span className="text-xl">🪔</span>
        </div>

        {/* Central Shrine Area */}
        <div className="relative min-h-[160px] flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
          {/* If Clay Idol placed, honor Ganesha at the center of the Mandap */}
          {elements.find((e) => e.id === 'clay_idol')?.placed && (
            <div className="mb-3 animate-scale-in flex flex-col items-center">
              <GaneshaLogo size="lg" showGlow={true} animate={true} alt="Sacred Clay Ganesha Idol" />
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-cinzel mt-1">
                Eco-Friendly Shadu Mati Murti
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2">
            {elements.filter((e) => e.placed).length === 0 ? (
              <span className="text-xs text-stone-400 italic">
                Tap elements below to arrange the altar and prepare for prayer and celebration.
              </span>
            ) : (
              elements
                .filter((e) => e.placed && e.id !== 'clay_idol')
                .map((e) => (
                  <span
                    key={e.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-xs font-bold text-amber-200 shadow-sm animate-scale-in"
                  >
                    <span className="text-base">{e.symbol}</span>
                    <span>{e.name}</span>
                  </span>
                ))
            )}
          </div>
        </div>

        {/* Progress Counter */}
        <div className="mt-3 flex items-center justify-between text-xs font-semibold px-2">
          <span className="text-stone-300">Offerings & Festivities</span>
          <span className="text-amber-400">
            {placedCount} / {elements.length} Prepared
          </span>
        </div>
      </div>

      {/* Grid of Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-4">
        {elements.map((elem) => (
          <button
            key={elem.id}
            id={`mandap-elem-${elem.id}`}
            onClick={() => handlePlaceElement(elem)}
            disabled={elem.placed}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
              elem.placed
                ? 'bg-emerald-950/30 border-emerald-500/50 opacity-70'
                : 'bg-stone-900/80 border-amber-500/30 hover:border-amber-400 hover:bg-stone-900 hover:scale-102 active:scale-98 shadow'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
              {elem.symbol}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-amber-100 font-cinzel text-xs truncate">{elem.name}</h4>
                {elem.isEcoFriendly && (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <Leaf className="w-3 h-3" /> Eco
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5 leading-snug line-clamp-2">
                {elem.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Educational message */}
      <div className="w-full p-3 rounded-xl bg-amber-950/50 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="leading-relaxed">{activeMessage}</p>
      </div>
    </div>
  );
};
