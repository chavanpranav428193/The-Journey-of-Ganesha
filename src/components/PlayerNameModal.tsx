import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface PlayerNameModalProps {
  initialName: string;
  onConfirm: (name: string) => void;
  onCancel?: () => void;
}

export const PlayerNameModal: React.FC<PlayerNameModalProps> = ({
  initialName,
  onConfirm,
  onCancel
}) => {
  const [name, setName] = useState(initialName || 'Pranav Shahaji Chavan');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) {
      setError('Please enter your name to begin the journey.');
      return;
    }
    if (clean.length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    soundService.playClick();
    soundService.playTempleBell();
    onConfirm(clean);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in text-stone-100">
      <div className="relative w-full max-w-md bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Top Avatar */}
        <div className="mb-3">
          <Character expression="welcoming" size="sm" showAura={true} />
        </div>

        <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel">
          The Sacred Inscription
        </span>
        <h2 className="text-2xl font-black font-cinzel text-amber-100 mt-0.5">
          Before We Begin Your Journey...
        </h2>
        <p className="text-xs text-stone-300 mt-1 max-w-xs mx-auto">
          Please enter your name as you wish it to appear on your sacred Wisdom Certificate & Leaderboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 text-left">
          <label
            htmlFor="player-name-input"
            className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-cinzel"
          >
            Your Full Name
          </label>
          <input
            id="player-name-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. Pranav Shahaji Chavan"
            maxLength={50}
            autoFocus
            className="w-full bg-stone-950 border border-amber-500/40 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
          />

          {error && (
            <p className="text-xs text-red-400 mt-1.5 font-medium">{error}</p>
          )}

          <div className="mt-6 flex gap-3">
            {onCancel && (
              <button
                type="button"
                id="cancel-name-btn"
                onClick={onCancel}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Back
              </button>
            )}

            <button
              type="submit"
              id="submit-player-name-btn"
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>BEGIN JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
