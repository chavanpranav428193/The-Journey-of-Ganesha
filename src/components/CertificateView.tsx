import React, { useRef } from 'react';
import { Character } from './Character';
import { GaneshaLogo } from './GaneshaLogo';
import { Printer, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { soundService } from '../services/audioService';
import { useI18n } from '../i18n/LanguageContext';

import { PlayerProfile } from '../types';

interface CertificateViewProps {
  profile?: PlayerProfile;
  playerName?: string;
  finalScore?: number;
  completedDate?: string;
  certificateId?: string;
  onBack?: () => void;
  onBackToMenu?: () => void;
  onVerifyDirect?: (certId: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  playerName,
  finalScore,
  completedDate,
  certificateId,
  onBack,
  onBackToMenu,
  onVerifyDirect
}) => {
  const { t } = useI18n();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    soundService.playClick();
    window.print();
  };

  const resolvedName = profile?.name || playerName || 'PRANAV SHAHAJI CHAVAN';
  const resolvedScore = profile ? profile.totalScore : (finalScore ?? 0);
  const resolvedDate = profile?.completedDate || completedDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const resolvedId = profile?.certificateId || certificateId || 'GJ-2026-928471';
  const handleBackAction = onBack || onBackToMenu || (() => {});

  const displayName = resolvedName.trim() ? resolvedName.toUpperCase() : 'PRANAV SHAHAJI CHAVAN';
  const displayScore = resolvedScore > 0 ? resolvedScore.toLocaleString() : '9,250';
  const displayDate = resolvedDate;
  const displayId = resolvedId;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center animate-fade-in">
      {/* Top Action Bar (hidden during printing) */}
      <div className="w-full flex items-center justify-between gap-3 mb-6 print:hidden">
        <button
          id="certificate-back-btn"
          onClick={handleBackAction}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.certificate.backToSummary}</span>
        </button>

        <div className="flex items-center gap-3">
          {onVerifyDirect && (
            <button
              id="certificate-verify-btn"
              onClick={() => onVerifyDirect(displayId)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 border border-amber-500/40 hover:bg-stone-800 text-amber-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.certificate.verifyOnline}</span>
            </button>
          )}

          <button
            id="certificate-print-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{t.certificate.printSave}</span>
          </button>
        </div>
      </div>

      {/* Ornate Indian Certificate Container */}
      <div
        ref={certificateRef}
        className="relative w-full bg-[#0f0904] text-stone-100 p-8 sm:p-12 rounded-3xl border-4 border-amber-500/80 shadow-[0_20px_60px_rgba(245,158,11,0.25)] print:border-amber-700 print:shadow-none overflow-hidden"
      >
        {/* Ornate Concentric Borders */}
        <div className="absolute inset-3 border-2 border-amber-500/30 rounded-2xl pointer-events-none" />
        <div className="absolute inset-5 border border-dashed border-amber-500/20 rounded-xl pointer-events-none" />

        {/* Traditional Corner Motifs */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-amber-400 pointer-events-none" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-amber-400 pointer-events-none" />

        {/* Certificate Watermark / Header Icon */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="mb-2">
            <Character expression="blessing" size="md" showAura={true} />
          </div>

          <div className="flex items-center justify-center gap-3 text-amber-400 text-xs font-black uppercase tracking-[0.25em] font-cinzel mb-1">
            <span>🪔</span>
            <span>Ganesh Chaturthi Cultural Game Design Contest</span>
            <span>🪔</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-cinzel text-amber-300 tracking-wider mt-1 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
            {t.certificate.title}
          </h1>

          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-4" />

          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2 font-cinzel">
            {t.certificate.certifiesThat}
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cinzel text-amber-100 tracking-wide border-b-2 border-amber-500/40 pb-2 px-6">
            {displayName}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-xl text-center leading-relaxed mt-4 font-sans">
            {t.certificate.completionBody}
          </p>

          {/* Certificate Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-8 pt-6 border-t border-amber-500/30 text-center">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                {t.certificate.finalScore}
              </span>
              <span className="text-lg font-black font-cinzel text-amber-200">
                {displayScore}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                {t.certificate.chapters}
              </span>
              <span className="text-lg font-black font-cinzel text-amber-200">
                5 / 5 {t.common.completed}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                {t.certificate.dateCompleted}
              </span>
              <span className="text-xs font-bold font-sans text-stone-200 mt-1 block">
                {displayDate}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                {t.certificate.certificateId}
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                {displayId}
              </span>
            </div>
          </div>

          {/* Bottom QR & Verification Area */}
          <div className="w-full max-w-2xl mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left QR Code representation */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1.5 rounded-xl flex items-center justify-center text-stone-950 shadow">
                <svg viewBox="0 0 24 24" className="w-full h-full text-stone-900 fill-current">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h2v4h-2v-4zm-4-2h2v2h-2v-2zm2 0h2v2h-2v-2zm2 0h2v2h-2v-2zm-6 2h2v4h-2v-4zm2 2h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticity Verified
                </span>
                <span className="text-[10px] text-stone-400 font-mono block">
                  Scan to verify pilgrim ID online
                </span>
              </div>
            </div>

            {/* Right Seal & Motto */}
            <div className="flex items-center gap-3 text-center sm:text-right">
              <div>
                <span className="text-xs font-serif italic text-amber-300 block">
                  "Vakratunda Mahakaya Suryakoti Samaprabha"
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  Devotion • Wisdom • Environmental Harmony
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 bg-amber-500/20 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)] shrink-0">
                <GaneshaLogo size="xs" showGlow={false} alt="Official Seal of Lord Ganesha" />
              </div>
            </div>
          </div>

          {/* Required Cultural & Educational Disclaimer */}
          <div className="mt-8 pt-4 border-t border-stone-800 text-center">
            <p className="text-[10px] text-stone-500 max-w-xl mx-auto leading-relaxed">
              * Notice: This is an interactive cultural game completion certificate issued for participation in The Journey of Ganesha browser experience. It is not an official academic degree or governmental credential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
