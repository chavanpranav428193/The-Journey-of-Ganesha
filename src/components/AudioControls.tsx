import React from 'react';
import { Volume2, VolumeX, Music, Bell } from 'lucide-react';
import { soundService } from '../services/audioService';

interface AudioControlsProps {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onToggleMusic: () => void;
  onToggleSfx: () => void;
  className?: string;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  musicEnabled,
  sfxEnabled,
  onToggleMusic,
  onToggleSfx,
  className = ''
}) => {
  const handleRingBell = () => {
    soundService.playTempleBell();
  };

  return (
    <div className={`flex items-center gap-2 bg-amber-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 shadow-lg ${className}`}>
      {/* Temple Bell interactive ring */}
      <button
        id="ring-temple-bell-btn"
        onClick={handleRingBell}
        title="Ring Temple Bell"
        className="p-1.5 rounded-full text-amber-300 hover:text-amber-100 hover:bg-amber-900/60 transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
        aria-label="Ring Temple Bell"
      >
        <Bell className="w-4 h-4" />
      </button>

      {/* Music Toggle */}
      <button
        id="toggle-music-btn"
        onClick={onToggleMusic}
        title={musicEnabled ? 'Mute Background Music' : 'Enable Background Music'}
        className={`p-1.5 rounded-full transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          musicEnabled ? 'text-amber-300 hover:bg-amber-900/60' : 'text-stone-400 hover:bg-stone-800/60'
        }`}
        aria-label={musicEnabled ? 'Music On' : 'Music Off'}
      >
        <Music className="w-4 h-4" />
      </button>

      {/* SFX Toggle */}
      <button
        id="toggle-sfx-btn"
        onClick={onToggleSfx}
        title={sfxEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        className={`p-1.5 rounded-full transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          sfxEnabled ? 'text-amber-300 hover:bg-amber-900/60' : 'text-stone-400 hover:bg-stone-800/60'
        }`}
        aria-label={sfxEnabled ? 'Sound Effects On' : 'Sound Effects Off'}
      >
        {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  );
};
