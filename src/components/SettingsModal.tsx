import React from 'react';
import { X, Volume2, Music, Sparkles, RotateCcw, ShieldCheck, Globe } from 'lucide-react';
import { GameSettings, SupportedLanguage } from '../types';
import { soundService } from '../services/audioService';
import { useI18n } from '../i18n/LanguageContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
  playerName: string;
  onOpenLanguageSelect?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetProgress,
  playerName,
  onOpenLanguageSelect
}) => {
  const { t, languages, language, setLanguage } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-settings-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold font-cinzel text-amber-100">
            {t.settings.title}
          </h3>
        </div>

        {/* Active Player Info */}
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-300/80 uppercase font-semibold">
              {t.common.pilgrim}
            </span>
            <p className="font-bold text-amber-100 text-sm mt-0.5">{playerName || 'Seeker'}</p>
          </div>
          <ShieldCheck className="w-6 h-6 text-amber-400" />
        </div>

        <div className="space-y-4">
          {/* Language Selection Row */}
          <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-sm text-stone-200">
                  {t.settings.language}
                </span>
              </div>
              {onOpenLanguageSelect && (
                <button
                  id="open-full-language-screen-btn"
                  onClick={() => {
                    soundService.playClick();
                    onOpenLanguageSelect();
                  }}
                  className="text-xs text-amber-300 hover:text-amber-200 underline"
                >
                  {t.settings.changeLanguage}
                </button>
              )}
            </div>

            {/* Quick Grid of 8 Languages */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`settings-lang-btn-${lang.code}`}
                    onClick={() => {
                      soundService.playClick();
                      setLanguage(lang.code);
                      onUpdateSettings({ language: lang.code });
                    }}
                    className={`py-1.5 px-1 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold ring-2 ring-amber-300 shadow-sm'
                        : 'bg-stone-900/80 hover:bg-stone-700/80 text-stone-300 border border-stone-700/50'
                    }`}
                  >
                    <span className="text-sm">{lang.flag}</span>
                    <span className="text-[11px] leading-tight truncate w-full px-0.5">
                      {lang.nativeName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/60 border border-stone-700/60">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-semibold text-sm">{t.settings.music}</p>
                <p className="text-xs text-stone-400">{t.settings.musicDesc}</p>
              </div>
            </div>
            <button
              id="settings-toggle-music"
              onClick={() => {
                const next = !settings.music;
                onUpdateSettings({ music: next });
                soundService.setMusicEnabled(next);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.music ? 'bg-amber-500 justify-end' : 'bg-stone-700 justify-start'
              }`}
              aria-label="Toggle Ambience"
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* SFX Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/60 border border-stone-700/60">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-semibold text-sm">{t.settings.sfx}</p>
                <p className="text-xs text-stone-400">{t.settings.sfxDesc}</p>
              </div>
            </div>
            <button
              id="settings-toggle-sfx"
              onClick={() => {
                const next = !settings.sfx;
                onUpdateSettings({ sfx: next });
                soundService.setSfxEnabled(next);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.sfx ? 'bg-amber-500 justify-end' : 'bg-stone-700 justify-start'
              }`}
              aria-label="Toggle Sound Effects"
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/60 border border-stone-700/60">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-semibold text-sm">{t.settings.reducedMotion}</p>
                <p className="text-xs text-stone-400">{t.settings.reducedMotionDesc}</p>
              </div>
            </div>
            <button
              id="settings-toggle-motion"
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.reducedMotion ? 'bg-amber-500 justify-end' : 'bg-stone-700 justify-start'
              }`}
              aria-label="Toggle Reduced Motion"
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

        {/* Reset Progress Section */}
        <div className="mt-6 pt-4 border-t border-stone-800">
          <button
            id="reset-game-progress-btn"
            onClick={() => {
              if (window.confirm(t.settings.resetConfirm)) {
                onResetProgress();
                onClose();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.settings.resetProgress}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
