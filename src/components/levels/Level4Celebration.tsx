import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Heart, Users, Music, Bell } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface CelebrationElement {
  id: string;
  name: string;
  category: 'puja' | 'decoration' | 'sweets' | 'community';
  symbol: string;
  placed: boolean;
  desc: string;
  significance: string;
}

interface Level4CelebrationProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level4Celebration: React.FC<Level4CelebrationProps> = ({ onComplete }) => {
  const [elements, setElements] = useState<CelebrationElement[]>([
    {
      id: 'diyas',
      name: 'Clay Oil Diyas',
      category: 'puja',
      symbol: '🪔',
      placed: false,
      desc: 'Golden light of wisdom removing ignorance.',
      significance: 'Traditional illumination symbolizing spiritual clarity.'
    },
    {
      id: 'flowers',
      name: 'Red Hibiscus & Marigold Garlands',
      category: 'decoration',
      symbol: '🌺',
      placed: false,
      desc: 'Fragrant floral offerings of pure devotion.',
      significance: 'Fresh natural flowers welcoming the divine guest.'
    },
    {
      id: 'durva',
      name: '21 Blades of Sacred Durva',
      category: 'puja',
      symbol: '🍃',
      placed: false,
      desc: 'Humility and cooling grace honoring Ganesha.',
      significance: 'The essential herb prescribed in traditional Ganesh Puja.'
    },
    {
      id: 'modak',
      name: 'Steamed Ukadiche Modaks',
      category: 'sweets',
      symbol: '🍬',
      placed: false,
      desc: 'Sweet coconut and jaggery delicacy.',
      significance: 'Symbol of bliss (Ananda) and the sweet fruit of knowledge.'
    },
    {
      id: 'puja_setup',
      name: 'Sacred Kalash & Puja Thali',
      category: 'puja',
      symbol: '🏺',
      placed: false,
      desc: 'Auspicious copper kalash with coconut and mango leaves.',
      significance: 'Consecration of the sacred space for Prana Pratishtha.'
    },
    {
      id: 'decoration',
      name: 'Eco-Friendly Floral Mandap',
      category: 'decoration',
      symbol: '🎋',
      placed: false,
      desc: 'Handcrafted bamboo and cloth backdrop.',
      significance: 'Creating a beautiful, eco-conscious sanctuary for Ganesha.'
    },
    {
      id: 'cultural_activity',
      name: 'Traditional Aarti & Bhajan Circle',
      category: 'community',
      symbol: '🎵',
      placed: false,
      desc: 'Singing "Sukhakarta Dukhaharta" and traditional hymns.',
      significance: 'Uplifting community songs and classical music.'
    },
    {
      id: 'community_area',
      name: 'Community Seating & Prasadam Distribution',
      category: 'community',
      symbol: '👥',
      placed: false,
      desc: 'Welcoming neighbors, families, and travelers of all backgrounds.',
      significance: 'Fostering unity, hospitality, and shared fellowship.'
    }
  ]);

  const [message, setMessage] = useState('Arrange each of the 8 traditional elements to prepare a vibrant community celebration.');
  const placedCount = elements.filter((e) => e.placed).length;
  const isAllPlaced = placedCount === elements.length;

  const handlePlaceElement = (elem: CelebrationElement) => {
    if (elem.placed) return;

    soundService.playCollectSound();
    setElements((prev) =>
      prev.map((e) => (e.id === elem.id ? { ...e, placed: true } : e))
    );
    setMessage(`Arranged: ${elem.name} — ${elem.significance}`);

    const newPlaced = placedCount + 1;
    if (newPlaced === elements.length) {
      soundService.playCorrect();
      setTimeout(() => {
        soundService.playLevelComplete();
        const baseScore = 700; // max gameplay score
        const bonusScore = 150; // speed & completion bonus
        onComplete(baseScore, bonusScore);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Top Banner */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GaneshaLogo size="sm" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
              Level 4: Why We Celebrate Ganesh Chaturthi
            </span>
            <h3 className="text-sm font-bold font-cinzel text-amber-100">
              Build Your Ganpati Celebration
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-bold font-cinzel">{placedCount} / 8 Elements</span>
        </div>
      </div>

      {/* Main Celebration Stage / Pandal View */}
      <div className="w-full bg-gradient-to-b from-stone-900/95 to-stone-950/95 border border-amber-500/40 rounded-3xl p-5 mb-4 shadow-xl text-center relative overflow-hidden">
        <div className="flex items-center justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.5)]">
            <GaneshaLogo size="md" />
          </div>
        </div>

        <h4 className="text-base font-bold font-cinzel text-amber-100">
          The Sacred Pandal Altar
        </h4>
        <p className="text-xs text-stone-300 max-w-md mx-auto mb-4">
          {message}
        </p>

        {/* 8 Elements Grid Overview */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-w-xl mx-auto">
          {elements.map((elem) => (
            <div
              key={elem.id}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center min-h-[64px] transition-all duration-300 ${
                elem.placed
                  ? 'bg-amber-950/60 border-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-105'
                  : 'bg-stone-950/50 border-dashed border-stone-800 text-stone-600'
              }`}
            >
              <span className="text-xl">{elem.placed ? elem.symbol : '⚪'}</span>
              <span className="text-[8px] font-cinzel font-bold text-amber-200 mt-1 truncate max-w-full">
                {elem.name.split(' ')[0]}
              </span>
              {elem.placed && <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5" />}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Selection List */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider">
            Tap Items to Arrange Your Celebration
          </span>
          <span className="text-xs text-stone-400">
            {elements.length - placedCount} remaining
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {elements.map((elem) => (
            <button
              key={elem.id}
              id={`celebration-elem-${elem.id}`}
              onClick={() => handlePlaceElement(elem)}
              disabled={elem.placed}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 active:scale-98 ${
                elem.placed
                  ? 'opacity-40 border-stone-800 bg-stone-950/40 cursor-not-allowed'
                  : 'bg-stone-900/80 border-stone-700 hover:border-amber-400 hover:bg-stone-800/90 shadow-md'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-stone-950/80 border border-stone-800 flex items-center justify-center text-xl shrink-0">
                {elem.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-amber-100 block truncate font-cinzel">
                  {elem.name}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5 leading-snug">
                  {elem.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
