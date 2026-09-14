import React, { useEffect, useState } from 'react';
import { X, Trophy, Sparkles, RefreshCw, Cloud, Database } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { fetchLeaderboard, isSupabaseConfigured } from '../services/supabaseService';
import { soundService } from '../services/audioService';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlayerName: string;
  currentPlayerScore?: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentPlayerName,
  currentPlayerScore = 0
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadScores = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetchLeaderboard();
      setEntries(res.data);
      setIsOnline(res.isOnline);
      if (res.error) {
        setErrorMsg(res.error);
      }
    } catch {
      setErrorMsg('Leaderboard temporarily unavailable. Your local score has been saved.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadScores();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-stone-950 border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl text-stone-100 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          id="close-leaderboard-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/80 hover:bg-stone-800 transition-colors"
          aria-label="Close Leaderboard"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-2xl font-black font-cinzel text-amber-100">
              Global Pilgrims Leaderboard
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Celebrating the wisest minds on the sacred journey of Lord Ganesha.
          </p>

          {/* Cloud Status Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-stone-900 border border-amber-500/30">
            {isOnline ? (
              <>
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Supabase Cloud Sync Active</span>
              </>
            ) : (
              <>
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300">
                  {isSupabaseConfigured ? 'Offline Cache' : 'Local Verified Leaderboard'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Error notice if any */}
        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 text-center">
            {errorMsg}
          </div>
        )}

        {/* Leaderboard Table / List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {loading ? (
            <div className="py-12 text-center text-stone-400 text-sm flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
              <span>Retrieving pilgrim records...</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-sm">
              No pilgrim scores recorded yet. Be the first to complete the journey!
            </div>
          ) : (
            entries.map((item, index) => {
              const isCurrent =
                currentPlayerName &&
                item.player_name.trim().toLowerCase() === currentPlayerName.trim().toLowerCase();

              const getMedal = (rank: number) => {
                if (rank === 1) return '🥇';
                if (rank === 2) return '🥈';
                if (rank === 3) return '🥉';
                return `#${rank}`;
              };

              return (
                <div
                  key={item.id || index}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-950/90 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                      : index < 3
                      ? 'bg-stone-900/90 border-amber-500/30'
                      : 'bg-stone-900/50 border-stone-800'
                  }`}
                >
                  {/* Left: Rank & Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 text-center font-cinzel font-black text-sm text-amber-300">
                      {getMedal(item.rank || index + 1)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm truncate ${
                            isCurrent ? 'text-amber-200' : 'text-stone-100'
                          }`}
                        >
                          {item.player_name}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] tracking-wide uppercase">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400 block truncate">
                        {item.achievement_title || 'Pilgrim of Wisdom'} • {item.completed_at || 'Recent'}
                      </span>
                    </div>
                  </div>

                  {/* Right: Score */}
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-cinzel font-black text-base text-amber-300 block">
                      {item.score.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400 tracking-wider uppercase">pts</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            id="refresh-leaderboard-btn"
            onClick={() => {
              soundService.playClick();
              loadScores();
            }}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            id="close-leaderboard-bottom-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Return to Journey
          </button>
        </div>
      </div>
    </div>
  );
};
