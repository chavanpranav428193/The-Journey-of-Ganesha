export type GameScreen =
  | 'loading'
  | 'language_select'
  | 'menu'
  | 'player_name'
  | 'how_to_play'
  | 'level_select'
  | 'story_intro'
  | 'gameplay'
  | 'educational_insight'
  | 'level_quiz'
  | 'level_score'
  | 'wisdom_card'
  | 'final_score'
  | 'leaderboard'
  | 'certificate'
  | 'wisdom_collection'
  | 'verification';

export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn' | 'gu' | 'kn';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  sampleGreeting: string;
}

export type GaneshaExpression =
  | 'welcoming'
  | 'joyful'
  | 'wise'
  | 'meditating'
  | 'blessing'
  | 'thinking'
  | 'focused';

export interface PlayerProfile {
  name: string;
  currentLevel: number; // 1 to 5
  unlockedLevels: number[]; // e.g. [1, 2, 3]
  levelScores: Record<number, number>; // total combined level score
  gameplayScores: Record<number, number>; // gameplay portion (max 700)
  quizScores: Record<number, number>; // quiz portion (max 300)
  bonusScores: Record<number, number>; // bonus portion (max 200)
  quizPassed: Record<number, boolean>;
  totalQuizCorrect: number;
  totalQuizQuestions: number;
  totalScore: number;
  unlockedAchievements: string[];
  unlockedWisdomCards: number[];
  startTime: number;
  totalTimeElapsed: number;
  certificateId: string;
  completedDate: string | null;
  settings: GameSettings;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctExplanation: string;
}

export interface LevelQuiz {
  levelId: number;
  levelTitle: string;
  questions: QuizQuestion[];
}

export interface GameSettings {
  language: SupportedLanguage;
  music: boolean;
  sfx: boolean;
  reducedMotion: boolean;
}

export interface WisdomCardData {
  id: number;
  levelId: number;
  chapterTitle: string;
  theme: string;
  lesson: string;
  quote: string;
  symbol: string;
  culturalNote: string;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: 'story' | 'score' | 'speed' | 'culture';
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  baseScore: number;
  maxScore: number;
  storyIntro: {
    title: string;
    narrative: string[];
    ganeshaQuote: string;
  };
  educationalInsight: {
    title: string;
    summary: string;
    culturalContext: string;
    modernTakeaway: string;
  };
}

export interface LeaderboardEntry {
  id?: string;
  rank?: number;
  player_name: string;
  score: number;
  achievement_title: string;
  completed_at: string;
  certificate_id: string;
}
