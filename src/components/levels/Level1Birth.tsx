import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Clock, Zap, Star } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { GaneshaLogo } from '../GaneshaLogo';

interface PrepItem {
  id: string;
  name: string;
  category: 'flowers' | 'diya' | 'durva' | 'decoration';
  symbol: string;
  desc: string;
  isSacred: boolean;
  collected: boolean;
}

interface Level1BirthProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level1Birth: React.FC<Level1BirthProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [combo, setCombo] = useState(1);
  const [placedCount, setPlacedCount] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
  const [items, setItems] = useState<PrepItem[]>([
    {
      id: 'red_flowers',
      name: 'Fresh Red Hibiscus & Lotus',
      category: 'flowers',
      symbol: '🌺',
      desc: 'Beloved flowers symbolizing devotion, purity, and sacred reverence.',
      isSacred: true,
      collected: false
    },
    {
      id: 'sacred_diya',
      name: 'Auspicious Clay Diya',
      category: 'diya',
      symbol: '🪔',
      desc: 'Golden flame illuminating the threshold to remove all darkness.',
      isSacred: true,
      collected: false
    },
    {
      id: 'durva_grass',
      name: 'Sacred Durva Grass',
      category: 'durva',
      symbol: '🍃',
      desc: 'Traditional cooling grass offering associated with humility.',
      isSacred: true,
      collected: false
    },
    {
      id: 'toran_rangoli',
      name: 'Decorative Mango Leaf Toran',
      category: 'decoration',
      symbol: '🌿',
      desc: 'Traditional threshold toran inviting auspicious energy and protection.',
      isSacred: true,
      collected: false
    },
    {
      id: 'pebble',
      name: 'Cold Mountain Gravel',
      category: 'decoration',
      symbol: '🪨',
      desc: 'Ordinary rubble; not an auspicious entrance offering.',
      isSacred: false,
      collected: false
    },
    {
      id: 'thorn',
      name: 'Wild Mountain Thorn',
      category: 'flowers',
      symbol: '🌵',
      desc: 'Discordant element unsuitable for the sacred sanctum.',
      isSacred: false,
      collected: false
    }
  ]);

  const [message, setMessage] = useState<string>('Select and arrange the 4 sacred elements to prepare the sanctum entrance.');
  const [isFinished, setIsFinished] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      handleTimeExpire();
    }
  }, [timeLeft, isFinished]);

  const handleTimeExpire = () => {
    // Graceful finish if time runs out
    finalizeScore(placedCount);
  };

  const handleItemClick = (item: PrepItem, e: React.MouseEvent) => {
    if (item.collected || isFinished) return;

    // Trigger floating particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      char: item.isSacred ? '✨' : '💨'
    };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);

    if (item.isSacred) {
      soundService.playCollectSound();
      const nextPlaced = placedCount + 1;
      const nextCombo = combo + 1;
      setPlacedCount(nextPlaced);
      setCombo(nextCombo);

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, collected: true } : i))
      );
      setMessage(`Auspicious element arranged: ${item.name} (${item.desc})`);

      if (nextPlaced === 4) {
        setIsFinished(true);
        soundService.playCorrect();
        setTimeout(() => {
          finalizeScore(4);
        }, 1200);
      }
    } else {
      soundService.playHint();
      setCombo(1); // combo reset
      setMessage(`Be mindful: ${item.name} is not a sacred sanctum offering.`);
    }
  };

  const finalizeScore = (sacredPlaced: number) => {
    // 700 max gameplay score (175 per item)
    const baseGameplayScore = sacredPlaced * 175;
    const speedBonus = timeLeft >= 25 ? 50 : timeLeft >= 10 ? 30 : 10;
    const comboBonus = combo >= 4 ? 100 : 50;

    const totalBonus = speedBonus + (sacredPlaced === 4 ? comboBonus : 0);
    onComplete(baseGameplayScore, totalBonus);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Top Status Banner */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GaneshaLogo size="sm" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
              Mount Kailash Entrance
            </span>
            <h3 className="text-sm font-bold text-amber-100 font-cinzel">
              The Arrival of Ganesha
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Combo Meter */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-cinzel font-bold">Combo {combo}x</span>
          </div>

          {/* Time Limit */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-cinzel font-bold ${
            timeLeft <= 10
              ? 'bg-red-950/70 border-red-500/60 text-red-300 animate-pulse'
              : 'bg-stone-950/70 border-stone-700 text-stone-300'
          }`}>
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Sanctum Altar Preview */}
      <div className="w-full bg-gradient-to-b from-stone-900/90 to-stone-950/95 border border-amber-500/30 rounded-3xl p-5 mb-4 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-2 right-3 text-[10px] text-amber-400/70 font-cinzel uppercase tracking-wider">
          Sacred Duty: 4 Offerings Required
        </div>

        <h4 className="text-base font-bold font-cinzel text-amber-100 mb-1">
          Kailash Sanctum Threshold
        </h4>
        <p className="text-xs text-stone-300 max-w-md mx-auto mb-4">
          {message}
        </p>

        {/* 4 Sacred Slots Display */}
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {items.filter((i) => i.isSacred).map((sacredItem) => (
            <div
              key={sacredItem.id}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center min-h-[90px] transition-all duration-300 ${
                sacredItem.collected
                  ? 'bg-amber-950/60 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105'
                  : 'bg-stone-950/60 border-dashed border-stone-700 text-stone-600'
              }`}
            >
              {sacredItem.collected ? (
                <>
                  <span className="text-3xl animate-bounce">{sacredItem.symbol}</span>
                  <span className="text-[10px] font-bold text-amber-200 mt-1 truncate max-w-full">
                    {sacredItem.name.split(' ')[0]}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                </>
              ) : (
                <>
                  <div className="w-7 h-7 rounded-full border border-stone-700 flex items-center justify-center text-xs font-cinzel text-stone-500">
                    ?
                  </div>
                  <span className="text-[9px] text-stone-500 mt-1 capitalize font-cinzel">
                    {sacredItem.category}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Offerings Selection Grid */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Auspicious Items</span>
          </span>
          <span className="text-xs text-amber-400/80 font-semibold">
            {placedCount} / 4 Placed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item) => {
            return (
              <button
                key={item.id}
                id={`item-btn-${item.id}`}
                onClick={(e) => handleItemClick(item, e)}
                disabled={item.collected || isFinished}
                className={`relative p-3.5 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-3 active:scale-95 overflow-hidden ${
                  item.collected
                    ? 'opacity-40 border-stone-800 bg-stone-950/40 cursor-not-allowed'
                    : 'bg-stone-900/80 border-stone-700 hover:border-amber-400 hover:bg-stone-800/90 shadow-md'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  {item.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-amber-100 block truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-stone-400 line-clamp-2 mt-0.5 leading-snug">
                    {item.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="fixed pointer-events-none text-xl animate-ping"
          style={{ left: p.x, top: p.y }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
