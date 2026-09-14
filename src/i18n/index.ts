import { SupportedLanguage, LanguageOption, LevelQuiz } from '../types';
import { TranslationSchema, ResolvedTranslationSchema } from './types';
import { en } from './locales/en';
import { hi } from './locales/hi';
import { mr } from './locales/mr';
import { ta } from './locales/ta';
import { te } from './locales/te';
import { bn } from './locales/bn';
import { gu } from './locales/gu';
import { kn } from './locales/kn';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    sampleGreeting: 'Welcome to the sacred journey'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    sampleGreeting: 'गणेश चतुर्थी की पावन यात्रा'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    sampleGreeting: 'गणपती बाप्पा मोरया'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    sampleGreeting: 'விநாயகர் சதுர்த்தி நல்வாழ்த்துகள்'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    sampleGreeting: 'వినాయక చవితి శుభాకాంక్షలు'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    sampleGreeting: 'শ্রী শ্রী গণেশায় নমঃ'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    sampleGreeting: 'જય શ્રી ગણેશ'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    sampleGreeting: 'ಗಣೇಶ ಚತುರ್ಥಿಯ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು'
  }
];

export const LOCALES: Record<SupportedLanguage, TranslationSchema> = {
  en,
  hi,
  mr,
  ta,
  te,
  bn,
  gu,
  kn
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function getTranslation(lang: SupportedLanguage = DEFAULT_LANGUAGE): ResolvedTranslationSchema {
  const target = LOCALES[lang] || LOCALES[DEFAULT_LANGUAGE];
  if (lang === DEFAULT_LANGUAGE) return en as ResolvedTranslationSchema;

  return {
    ...en,
    ...target,
    common: { ...en.common, ...target.common },
    mainMenu: { ...en.mainMenu, ...target.mainMenu },
    howToPlay: { ...en.howToPlay, ...target.howToPlay },
    levelMap: { ...en.levelMap, ...target.levelMap },
    storyIntro: target.storyIntro ? { ...en.storyIntro, ...target.storyIntro } : en.storyIntro,
    educationalInsight: target.educationalInsight ? { ...en.educationalInsight, ...target.educationalInsight } : en.educationalInsight,
    aiStoryGuide: { ...en.aiStoryGuide, ...target.aiStoryGuide },
    quiz: { ...en.quiz, ...target.quiz },
    progression: { ...en.progression, ...target.progression },
    achievements: { ...en.achievements, ...target.achievements },
    wisdomCards: target.wisdomCards ? { ...en.wisdomCards, ...target.wisdomCards } : en.wisdomCards,
    finalScore: target.finalScore ? { ...en.finalScore, ...target.finalScore } : en.finalScore,
    leaderboard: { ...en.leaderboard, ...target.leaderboard },
    certificate: { ...en.certificate, ...target.certificate },
    settings: { ...en.settings, ...target.settings },
    errors: { ...en.errors, ...target.errors },
    levels: { ...en.levels, ...target.levels }
  } as ResolvedTranslationSchema;
}

/**
 * Helper to get localized quiz for a given level in the active language
 */
export function getLocalizedQuiz(levelId: number, lang: SupportedLanguage): LevelQuiz {
  const t = getTranslation(lang);
  const lvl = t.levels[levelId as 1 | 2 | 3 | 4 | 5] || t.levels[1];
  return {
    levelId,
    levelTitle: lvl.quizTitle,
    questions: lvl.questions
  };
}

export * from './types';
