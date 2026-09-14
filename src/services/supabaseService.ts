import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LeaderboardEntry } from '../types';
import { INITIAL_LEADERBOARD } from '../data/gameData';

const env = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env) || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
);

let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    supabase = null;
  }
}

const LOCAL_STORAGE_LEADERBOARD_KEY = 'ganesha_journey_leaderboard_v1';
const LOCAL_STORAGE_CERTIFICATES_KEY = 'ganesha_journey_certificates_v1';

// Initialize local leaderboard if empty
function getLocalLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

function saveLocalLeaderboard(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

// Fetch top leaderboard entries (descending by score)
export async function fetchLeaderboard(): Promise<{ data: LeaderboardEntry[]; isOnline: boolean; error?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('id, player_name, score, achievement_title, completed_at, certificate_id')
        .order('score', { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        const mapped = data.map((item, index) => ({
          ...item,
          rank: index + 1
        }));
        return { data: mapped, isOnline: true };
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local storage', e);
    }
  }

  // Fallback to local
  const local = getLocalLeaderboard();
  const sorted = [...local].sort((a, b) => b.score - a.score).slice(0, 10).map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));
  return { data: sorted, isOnline: isSupabaseConfigured };
}

// Submit score with anti-cheat validation
export async function submitScoreToLeaderboard(entry: {
  playerName: string;
  score: number;
  achievementTitle: string;
  certificateId: string;
}): Promise<{ success: boolean; isOnline: boolean; error?: string }> {
  const cleanName = entry.playerName.trim();

  // Basic anti-cheat & sanity validation
  if (!cleanName || cleanName.length < 2 || cleanName.length > 50) {
    return { success: false, isOnline: false, error: 'Please enter a valid player name (2-50 characters).' };
  }

  if (typeof entry.score !== 'number' || isNaN(entry.score) || entry.score < 0 || entry.score > 10000) {
    return { success: false, isOnline: false, error: 'Score verification failed.' };
  }

  const newEntry: LeaderboardEntry = {
    player_name: cleanName,
    score: Math.round(entry.score),
    achievement_title: entry.achievementTitle,
    completed_at: new Date().toISOString().split('T')[0],
    certificate_id: entry.certificateId
  };

  // Save to local storage first (always reliable)
  const local = getLocalLeaderboard();
  const updatedLocal = [...local, newEntry].sort((a, b) => b.score - a.score);
  saveLocalLeaderboard(updatedLocal);

  // Save certificate record locally for verification
  saveLocalCertificate({
    certificateId: entry.certificateId,
    playerName: cleanName,
    score: Math.round(entry.score),
    completedAt: newEntry.completed_at,
    status: 'VALID'
  });

  if (supabase) {
    try {
      const { error } = await supabase.from('leaderboard').insert([
        {
          player_name: newEntry.player_name,
          score: newEntry.score,
          achievement_title: newEntry.achievement_title,
          certificate_id: newEntry.certificate_id,
          completed_at: newEntry.completed_at
        }
      ]);

      if (error) {
        console.warn('Supabase insert failed:', error.message);
        return { success: true, isOnline: false, error: 'Saved to local leaderboard (Cloud sync failed).' };
      }
      return { success: true, isOnline: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      return { success: true, isOnline: false, error: `Saved locally. Cloud unavailable: ${errorMsg}` };
    }
  }

  return { success: true, isOnline: false };
}

export interface CertificateRecord {
  certificateId: string;
  playerName: string;
  score: number;
  completedAt: string;
  status: 'VALID' | 'REVOKED';
}

function saveLocalCertificate(record: CertificateRecord) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CERTIFICATES_KEY);
    const certs: Record<string, CertificateRecord> = raw ? JSON.parse(raw) : {};
    certs[record.certificateId] = record;
    localStorage.setItem(LOCAL_STORAGE_CERTIFICATES_KEY, JSON.stringify(certs));
  } catch (e) {
    console.error('Failed to store certificate locally', e);
  }
}

// Certificate verification
export async function verifyCertificateRecord(certificateId: string): Promise<CertificateRecord | null> {
  // Always check sample player or local certificates
  if (certificateId === 'GJ-2026-928471') {
    return {
      certificateId: 'GJ-2026-928471',
      playerName: 'Pranav Shahaji Chavan',
      score: 9250,
      completedAt: '2026-09-14',
      status: 'VALID'
    };
  }

  // Check local cache
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CERTIFICATES_KEY);
    if (raw) {
      const certs: Record<string, CertificateRecord> = JSON.parse(raw);
      if (certs[certificateId]) {
        return certs[certificateId];
      }
    }
  } catch {
    // ignore
  }

  // Check Supabase if active
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('player_name, score, completed_at, certificate_id')
        .eq('certificate_id', certificateId)
        .single();

      if (!error && data) {
        return {
          certificateId: data.certificate_id,
          playerName: data.player_name,
          score: data.score,
          completedAt: data.completed_at,
          status: 'VALID'
        };
      }
    } catch {
      // ignore
    }
  }

  return null;
}
