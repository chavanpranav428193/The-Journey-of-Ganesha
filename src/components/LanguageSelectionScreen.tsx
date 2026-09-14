import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../i18n';
import { GaneshaLogo } from './GaneshaLogo';
import { soundService } from '../services/audioService';

interface LanguageSelectionScreenProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onConfirm: () => void;
  canCancel?: boolean;
  onCancel?: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  currentLanguage,
  onSelectLanguage,
  onConfirm,
  canCancel = false,
  onCancel
}) => {
  const [selected, setSelected] = useState<SupportedLanguage>(currentLanguage);

  const activeTranslation = getTranslation(selected);

  const handleCardClick = (code: SupportedLanguage) => {
    soundService.playClick();
    setSelected(code);
    onSelectLanguage(code);
  };

  const handleProceed = () => {
    soundService.playCorrect();
    onConfirm();
  };

  return (
    <div
      id="language-selection-screen"
      className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-center animate-fade-in"
    >
      {/* Sacred Top Emblem */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-3">
          <GaneshaLogo size="lg" showGlow={true} alt="The Journey of Ganesha Emblem" />
          <span className="absolute -top-3 -right-3 text-2xl animate-float">🪷</span>
          <span className="absolute -bottom-2 -left-2 text-xl animate-bounce">🪔</span>
        </div>

        <span className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-1">
          Ganesh Chaturthi Learning Game
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow">
          THE JOURNEY OF GANESHA
        </h1>

        <div className="mt-2 space-y-1">
          <h2 className="text-lg sm:text-xl font-semibold text-stone-200">
            {activeTranslation.languageSelection.chooseLanguageTitle}
          </h2>
          <p className="text-sm font-medium text-amber-300/90 font-sans">
            अपनी भाषा चुनें • உங்கள் மொழியைத் தேர்ந்தெடுக்கவும் • మీ భాషను ఎంచుకోండి
          </p>
          <p className="text-xs text-stone-400 max-w-lg mx-auto">
            {activeTranslation.languageSelection.subtitle}
          </p>
        </div>
      </div>

      {/* 8 Language Cards Grid */}
      <div
        role="radiogroup"
        aria-label="Language selection options"
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mb-8"
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selected === lang.code;

          return (
            <button
              key={lang.code}
              id={`lang-card-${lang.code}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleCardClick(lang.code)}
              className={`relative p-4 rounded-xl text-left transition-all duration-200 flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-950/80 to-stone-900 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-[1.02]'
                  : 'bg-stone-900/70 hover:bg-stone-800/80 border border-stone-800/80 hover:border-amber-500/40 text-stone-300'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950 flex items-center gap-1 shadow">
                  ✓ {activeTranslation.languageSelection.selectedBadge}
                </span>
              )}

              {/* Flag & Names */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl drop-shadow-sm">{lang.flag}</span>
                  <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                    {lang.name}
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
                  {lang.nativeName}
                </div>
              </div>

              {/* Sample cultural greeting */}
              <div className="mt-3 pt-2.5 border-t border-stone-800/60 text-[11px] text-stone-400 group-hover:text-stone-300 transition-colors italic line-clamp-1">
                "{lang.sampleGreeting}"
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        {canCancel && onCancel && (
          <button
            type="button"
            id="lang-cancel-btn"
            onClick={() => {
              soundService.playClick();
              onCancel();
            }}
            className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-300 font-medium text-sm transition-all focus:outline-none"
          >
            {activeTranslation.common.cancel}
          </button>
        )}

        <button
          type="button"
          id="lang-continue-btn"
          onClick={handleProceed}
          className="w-full flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-bold text-base shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <span>{activeTranslation.languageSelection.continueButton}</span>
        </button>
      </div>

      {/* Cultural Footnote */}
      <p className="mt-6 text-[11px] text-stone-400 text-center font-mono">
        💡 You can switch language anytime in the game Settings or top header bar.
      </p>
    </div>
  );
};
