import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertCircle, ArrowLeft, Search, CheckCircle, RefreshCw } from 'lucide-react';
import { verifyCertificateRecord, CertificateRecord } from '../services/supabaseService';
import { Character } from './Character';
import { GaneshaLogo } from './GaneshaLogo';

interface CertificateVerificationProps {
  initialCertId?: string;
  onBack: () => void;
}

export const CertificateVerification: React.FC<CertificateVerificationProps> = ({
  initialCertId = '',
  onBack
}) => {
  const [queryId, setQueryId] = useState(initialCertId || 'GJ-2026-928471');
  const [record, setRecord] = useState<CertificateRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const runVerification = async (idToVerify: string) => {
    const clean = idToVerify.trim();
    if (!clean) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await verifyCertificateRecord(clean);
      setRecord(res);
    } catch {
      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCertId) {
      runVerification(initialCertId);
    } else {
      runVerification('GJ-2026-928471'); // sample player check
    }
  }, [initialCertId]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center animate-fade-in text-stone-100">
      <button
        id="verify-back-btn"
        onClick={onBack}
        className="self-start flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Game</span>
      </button>

      <div className="w-full bg-stone-900/90 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        <div className="mb-3 flex justify-center">
          <GaneshaLogo size="md" showGlow={true} alt="Registry Seal" />
        </div>

        <h2 className="text-2xl font-black font-cinzel text-amber-100">
          Certificate Registry Verification
        </h2>
        <p className="text-xs text-stone-300 mt-1 max-w-md mx-auto">
          Verify authentic completion records for participants of The Journey of Ganesha.
        </p>

        {/* Input Form */}
        <div className="flex items-center gap-2 mt-6 mb-6">
          <input
            id="certificate-search-input"
            type="text"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value.toUpperCase())}
            placeholder="e.g. GJ-2026-928471"
            className="flex-1 bg-stone-950 border border-amber-500/40 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-200 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            id="run-verification-btn"
            onClick={() => runVerification(queryId)}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Verify</span>
          </button>
        </div>

        {/* Result Area */}
        {loading ? (
          <div className="py-8 flex flex-col items-center gap-2 text-stone-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
            <span>Consulting pilgrim registry database...</span>
          </div>
        ) : searched && record ? (
          <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/60 to-stone-950 border-2 border-emerald-500/60 text-left shadow-lg">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-cinzel">
                <CheckCircle className="w-4 h-4" />
                <span>Status: VALID & AUTHENTIC</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300">
                {record.certificateId}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Certified Pilgrim
                </span>
                <span className="text-base font-black font-cinzel text-amber-100">
                  {record.playerName}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                    Final Score
                  </span>
                  <span className="text-sm font-black font-cinzel text-amber-300">
                    {record.score.toLocaleString()} points
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                    Completion Date
                  </span>
                  <span className="text-xs font-bold text-stone-200">
                    {record.completedAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : searched && !record ? (
          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 text-center text-xs text-red-300">
            <AlertCircle className="w-6 h-6 mx-auto mb-1.5 text-red-400" />
            <p className="font-bold">Certificate not found.</p>
            <p className="text-[11px] text-stone-400 mt-1">
              Please ensure the certificate ID is entered accurately (e.g. GJ-2026-928471).
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
