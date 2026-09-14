import React from 'react';
import { Play, Trophy, HelpCircle, Settings, Sparkles, BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface MainMenuProps {
  onStart: () => void;
  onLeaderboard: () => void;
  onHowToPlay: () => void;
  onSettings: () => void;
  onVerify: () => void;
  onAboutCreator?: () => void;
  playerName: string;
  hasExistingProgress: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStart,
  onLeaderboard,
  onHowToPlay,
  onSettings,
  onVerify,
  onAboutCreator,
  playerName,
  hasExistingProgress
}) => {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center animate-fade-in">
      {/* Decorative Floating Sparkles / Diya Ambience in Background */}
      <div className="absolute top-10 left-10 text-2xl animate-bounce opacity-50 select-none pointer-events-none" style={{ animationDuration: '4s' }}>
        🪔
      </div>
      <div className="absolute top-16 right-12 text-2xl animate-float opacity-50 select-none pointer-events-none">
        🌺
      </div>
      <div className="absolute bottom-16 left-12 text-2xl animate-float opacity-40 select-none pointer-events-none" style={{ animationDelay: '1.5s' }}>
        🍃
      </div>
      <div className="absolute bottom-12 right-10 text-2xl animate-bounce opacity-40 select-none pointer-events-none" style={{ animationDuration: '5s' }}>
        🪔
      </div>

      {/* Main Hero Card */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        {/* Festive Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest font-cinzel mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ganesh Chaturthi Special Adventure</span>
        </div>

        {/* Character Mascot */}
        <div className="mb-2 relative cursor-pointer" onClick={() => soundService.playTempleBell()} title="Tap for Temple Blessing">
          <Character expression="welcoming" size="xl" showAura={true} />
        </div>

        {/* Cinematic Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel text-amber-100 tracking-wider drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)] leading-tight">
          THE JOURNEY OF GANESHA
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-amber-200/90 font-serif italic mt-2 max-w-lg">
          "Discover the stories. Experience the wisdom. Celebrate the spirit."
        </p>

        {/* Feature Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-stone-300 uppercase tracking-wider font-cinzel bg-stone-900/60 border border-amber-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
          <span>5 Chapters</span>
          <span className="text-amber-500">•</span>
          <span>Interactive Story</span>
          <span className="text-amber-500">•</span>
          <span>Challenges</span>
          <span className="text-amber-500">•</span>
          <span>Wisdom Cards & Certificate</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
          <button
            id="main-start-journey-btn"
            onClick={() => {
              soundService.playClick();
              soundService.playTempleBell();
              onStart();
            }}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{hasExistingProgress ? 'CONTINUE JOURNEY' : 'START JOURNEY'}</span>
          </button>
        </div>

        {/* Secondary Buttons Row */}
        <div className="mt-3.5 grid grid-cols-3 gap-2.5 w-full max-w-md">
          <button
            id="main-leaderboard-btn"
            onClick={() => {
              soundService.playClick();
              onLeaderboard();
            }}
            className="py-2.5 px-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-amber-200 text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
          </button>

          <button
            id="main-how-to-play-btn"
            onClick={() => {
              soundService.playClick();
              onHowToPlay();
            }}
            className="py-2.5 px-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-amber-200 text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>How To Play</span>
          </button>

          <button
            id="main-settings-btn"
            onClick={() => {
              soundService.playClick();
              onSettings();
            }}
            className="py-2.5 px-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-amber-200 text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Settings</span>
          </button>
        </div>

        {/* Verify Certificate Link & Creator Note */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            id="main-verify-cert-btn"
            onClick={() => {
              soundService.playClick();
              onVerify();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-300 transition-colors font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verify Existing Certificate ID</span>
          </button>

          {onAboutCreator && (
            <>
              <span className="text-stone-600 hidden sm:inline">•</span>
              <button
                id="main-creator-story-btn"
                onClick={() => {
                  soundService.playClick();
                  onAboutCreator();
                }}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 hover:text-amber-200 transition-colors font-medium"
              >
                <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                <span>Behind the Journey • Creator's Note</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
