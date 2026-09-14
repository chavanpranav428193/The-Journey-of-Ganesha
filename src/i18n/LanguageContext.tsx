import React, { createContext, useContext, useMemo } from 'react';
import { SupportedLanguage, LanguageOption, LevelQuiz } from '../types';
import { TranslationSchema, ResolvedTranslationSchema } from './types';
import { SUPPORTED_LANGUAGES, LOCALES, DEFAULT_LANGUAGE, getTranslation, getLocalizedQuiz } from './index';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: ResolvedTranslationSchema;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
  getLevelData: (levelId: number) => ResolvedTranslationSchema['levels'][1 | 2 | 3 | 4 | 5];
  getQuizData: (levelId: number) => LevelQuiz;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  language,
  onLanguageChange,
  children
}) => {
  const activeLanguage = useMemo<SupportedLanguage>(() => {
    return LOCALES[language] ? language : DEFAULT_LANGUAGE;
  }, [language]);

  const t = useMemo<ResolvedTranslationSchema>(() => {
    return getTranslation(activeLanguage);
  }, [activeLanguage]);

  const currentLanguageOption = useMemo<LanguageOption>(() => {
    return (
      SUPPORTED_LANGUAGES.find((item) => item.code === activeLanguage) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [activeLanguage]);

  const getLevelData = (levelId: number) => {
    const safeId = Math.max(1, Math.min(5, levelId)) as 1 | 2 | 3 | 4 | 5;
    return t.levels[safeId] || t.levels[1];
  };

  const getQuizData = (levelId: number) => {
    return getLocalizedQuiz(levelId, activeLanguage);
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language: activeLanguage,
    setLanguage: onLanguageChange,
    t,
    languages: SUPPORTED_LANGUAGES,
    currentLanguageOption,
    getLevelData,
    getQuizData
  }), [activeLanguage, onLanguageChange, t, currentLanguageOption]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useI18n(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation(): ResolvedTranslationSchema {
  return useI18n().t;
}
