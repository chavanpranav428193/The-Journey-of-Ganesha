import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { Character } from '../Character';

interface SacredSymbolPiece {
  id: string;
  name: string;
  sanskritName: string;
  icon: string;
  meaning: string;
  lesson: string;
  aligned: boolean;
}

interface Level3TransformationProps {
  onComplete: (score: number, stats: { correct: number; speedBonus: number }) => void;
}

export const Level3Transformation: React.FC<Level3TransformationProps> = ({ onComplete }) => {
  const [symbols, setSymbols] = useState<SacredSymbolPiece[]>([
    {
      id: 'ears',
      name: 'Expansive Ears',
      sanskritName: 'Shurpakarna',
      icon: '👂',
      meaning: 'Vast receptive ears to listen deeply and absorb knowledge before speaking.',
      lesson: 'True wisdom begins with active, compassionate listening.',
      aligned: false
    },
    {
      id: 'trunk',
      name: 'Curved Trunk',
      sanskritName: 'Vakratunda',
      icon: '🐘',
      meaning: 'Supreme discernment (Viveka) capable of uprooting giant trees or gently picking a needle.',
      lesson: 'Balance mighty strength with sensitive adaptability.',
      aligned: false
    },
    {
      id: 'tusk',
      name: 'Sacred Broken Tusk',
      sanskritName: 'Ekadanta',
      icon: '✨',
      meaning: 'Broken willfully to transcribe the great epic Mahabharata without pausing.',
      lesson: 'Willing sacrifice of ego in the noble pursuit of truth and learning.',
      aligned: false
    },
    {
      id: 'modak',
      name: 'Sweet Offering',
      sanskritName: 'Modaka',
      icon: '🍬',
      meaning: 'The eternal bliss of self-realization (Ananda) held close in hand.',
      lesson: 'The ultimate reward of a righteous life is pure spiritual joy.',
      aligned: false
    }
  ]);

  const [activeSymbol, setActiveSymbol] = useState<SacredSymbolPiece | null>(symbols[0]);
  const [transformationPhase, setTransformationPhase] = useState<'puzzle' | 'revealed'>('puzzle');
  const [score, setScore] = useState(1000); // Base score

  const handleAlign = (id: string) => {
    soundService.playCollectSound();
    setScore((prev) => prev + 50);

    setSymbols((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, aligned: true } : s));
      const unaligned = updated.find((s) => !s.aligned);
      setActiveSymbol(unaligned || null);

      if (updated.every((s) => s.aligned)) {
        // All symbols aligned!
        setTimeout(() => {
          setTransformationPhase('revealed');
          soundService.playLevelComplete();

          const speedBonus = 100;
          const perfectBonus = 400;
          const finalScore = score + 200 + speedBonus + perfectBonus;

          setTimeout(() => {
            onComplete(finalScore, { correct: 4, speedBonus });
          }, 2800);
        }, 800);
      }
      return updated;
    });
  };

  const alignedCount = symbols.filter((s) => s.aligned).length;

  if (transformationPhase === 'revealed') {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-10 px-6 bg-stone-950 border-2 border-amber-400 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.4)] flex flex-col items-center animate-fade-in">
        <div className="relative mb-4">
          <Character expression="blessing" size="lg" showAura={true} />
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel">
          The Auspicious Divine Manifestation
        </span>
        <h3 className="text-2xl font-black font-cinzel text-amber-100 mt-1">
          Vighnaharta — Lord of Wisdom & Beginnings
        </h3>
        <p className="text-xs text-stone-300 max-w-md mt-2 leading-relaxed">
          Through divine grace, Ganesha is honored across the worlds: not merely powerful, but the embodiment of supreme discernment, gentle intellect, and the auspicious remover of obstacles.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Header Info */}
      <div className="w-full bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 mb-4 shadow-lg text-center">
        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-widest font-cinzel mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Sacred Iconography Alignment</span>
        </div>
        <h3 className="text-lg font-bold font-cinzel text-amber-100">
          Reconstruct the 4 Divine Symbols of Ganesha
        </h3>
        <p className="text-xs text-stone-300 mt-1">
          Each sacred emblem carries a timeless philosophical virtue. Tap to align each symbol into divine harmony.
        </p>

        {/* Progress Dots */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {symbols.map((sym) => (
            <div
              key={sym.id}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                sym.aligned
                  ? 'bg-amber-500 text-stone-950 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                  : 'bg-stone-800 text-stone-500 border border-stone-700'
              }`}
            >
              {sym.aligned ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : sym.icon}
            </div>
          ))}
          <span className="text-xs font-semibold text-amber-300 ml-2">
            {alignedCount} / 4 Symbols Aligned
          </span>
        </div>
      </div>

      {/* Symbol Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-4">
        {symbols.map((symbol) => (
          <div
            key={symbol.id}
            onClick={() => !symbol.aligned && setActiveSymbol(symbol)}
            className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              symbol.aligned
                ? 'bg-emerald-950/30 border-emerald-500/60 shadow-md'
                : activeSymbol?.id === symbol.id
                ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-400/40 shadow-lg scale-102'
                : 'bg-stone-900/70 border-stone-800 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl filter drop-shadow">{symbol.icon}</span>
              {symbol.aligned ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Harmonized
                </span>
              ) : (
                <button
                  id={`align-btn-${symbol.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAlign(symbol.id);
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-xs hover:from-amber-400 hover:to-orange-400 active:scale-95 transition-all shadow"
                >
                  <RotateCw className="w-3.5 h-3.5" /> Align
                </button>
              )}
            </div>

            <h4 className="font-bold text-amber-100 font-cinzel text-sm">
              {symbol.name} <span className="text-xs font-normal text-amber-300">({symbol.sanskritName})</span>
            </h4>
            <p className="text-xs text-stone-300 mt-1 leading-snug">{symbol.meaning}</p>
            <div className="mt-2 pt-2 border-t border-amber-500/20 text-[11px] text-amber-200 font-medium italic">
              ✦ {symbol.lesson}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
