import { SupportedLanguage, QuizQuestion, WisdomCardData, LevelConfig } from '../types';

export interface LocalizedLevelInfo {
  title: string;
  subtitle: string;
  objective: string;
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
  quizTitle: string;
  questions: QuizQuestion[];
  wisdomCard: {
    chapterTitle: string;
    theme: string;
    lesson: string;
    quote: string;
    culturalNote: string;
  };
}

/**
 * Base Translation Schema implemented by locale files.
 * Core keys are required, supplementary UI keys have fallbacks.
 */
export interface TranslationSchema {
  meta: {
    code: SupportedLanguage;
    name: string;
    nativeName: string;
    flag: string;
  };
  languageSelection: {
    gameTitle: string;
    chooseLanguageTitle: string;
    chooseLanguageNative: string;
    subtitle: string;
    continueButton: string;
    selectedBadge: string;
  };
  common: {
    continue: string;
    back: string;
    close: string;
    retry: string;
    start: string;
    loading: string;
    submit: string;
    cancel: string;
    level: string;
    score: string;
    accuracy: string;
    completed: string;
    locked: string;
    unlocked: string;
    pts: string;
    sec: string;
    objective: string;
    success: string;
    warning: string;
    info: string;
    welcome?: string;
    pilgrim?: string;
    story?: string;
    play?: string;
    learnByDoing?: string;
    badges?: string;
  };
  mainMenu: {
    title?: string;
    gameTitle?: string;
    startJourney: string;
    continueJourney: string;
    howToPlay: string;
    leaderboard: string;
    wisdomCards: string;
    achievements: string;
    journeyFlow: string;
    settings: string;
    certificate: string;
    subtitle: string;
    tagline: string;
    ganeshaQuote: string;
    languageLabel: string;
    verifyCertificate?: string;
    creatorDedication?: string;
  };
  howToPlay: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    viewJourneyMap: string;
    closeBtn: string;
  };
  levelMap: {
    title: string;
    subtitle: string;
    lockedNotice: string;
    currentLevel: string;
    playLevel: string;
    replayLevel: string;
  };
  storyIntro?: {
    ganeshaReflection: string;
    chooseSacredEntry: string;
    aiStoryGuideTitle: string;
    aiStoryGuideDesc: string;
    exploreAiStoryGuide: string;
    gameplayChallengeTitle: string;
    gameplayChallengeDesc: string;
    beginGameplay: string;
    learnByDoingDesc: string;
    flowSummary: string;
  };
  educationalInsight?: {
    badge: string;
    traditionalUnderstanding: string;
    culturalContext: string;
    livingValue: string;
    proceedToQuiz: string;
  };
  aiStoryGuide: {
    buttonLabel: string;
    buttonSub: string;
    title: string;
    subtitle: string;
    askAiTab: string;
    exploreMuseumTab: string;
    placeholder: string;
    askButton: string;
    thinking: string;
    suggestedQuestionsLabel: string;
    offlineNotice: string;
    groundedKnowledgeBadge: string;
    storySummaryLabel: string;
    symbolismLabel: string;
    culturalContextLabel: string;
    didYouKnowLabel: string;
    whyThisMattersLabel: string;
    continueToQuiz: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    questionNumber: string;
    passMessage: string;
    retryMessage: string;
    explanationLabel: string;
    nextQuestion: string;
    finishQuiz: string;
    retryQuiz: string;
    passThresholdNotice: string;
    passedTitle?: string;
    retryTitle?: string;
    scoreLabel?: string;
    quizScoreEarned?: string;
    flawlessBonus?: string;
    flawlessMsg?: string;
    passedDesc?: string;
    retryDesc?: string;
    viewScoreRewards?: string;
    reviewStory?: string;
    tryAgain?: string;
    questionCount?: string;
    correctFeedback?: string;
    insightToRemember?: string;
    completeQuiz?: string;
  };
  progression: {
    levelScoreTitle: string;
    baseScoreLabel: string;
    bonusScoreLabel: string;
    quizScoreLabel: string;
    totalScoreLabel: string;
    viewWisdomCard: string;
    wisdomCardBadge: string;
    claimWisdomCard: string;
    nextLevelButton: string;
    finalScoreTitle: string;
    finalScoreCongratulation: string;
    downloadCertificate: string;
    returnToMenu: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    unlockedLabel: string;
    lockedLabel: string;
  };
  wisdomCards?: {
    title: string;
    lessonLabel: string;
    lockedNotice: string;
    shareCard: string;
  };
  finalScore?: {
    title: string;
    sacredAccomplishment: string;
    cumulativeScore: string;
    chaptersCompleted: string;
    wisdomCardsCollected: string;
    achievementsBadge: string;
    pilgrimageTime: string;
    viewBadges: string;
    generateCertificate: string;
    viewLeaderboard: string;
    replayJourney: string;
  };
  leaderboard: {
    title: string;
    rank: string;
    player: string;
    score: string;
    accuracy: string;
    levelsCompleted: string;
    close: string;
    emptyNotice: string;
  };
  certificate: {
    title: string;
    presentedTo: string;
    bodyText: string;
    scoreLabel: string;
    accuracyLabel: string;
    dateLabel: string;
    idLabel: string;
    certifiedBy: string;
    verifiedBadge: string;
    printOrSave: string;
    verifyOnline: string;
    backToSummary?: string;
    printSave?: string;
    certifiesThat?: string;
    completionBody?: string;
    finalScore?: string;
    chapters?: string;
    dateCompleted?: string;
    certificateId?: string;
  };
  settings: {
    title: string;
    language: string;
    soundSfx: string;
    backgroundMusic: string;
    reducedMotion: string;
    resetProgress: string;
    resetConfirm: string;
    changeLanguage?: string;
    music?: string;
    musicDesc?: string;
    sfx?: string;
    sfxDesc?: string;
    reducedMotionDesc?: string;
  };
  errors: {
    loading: string;
    networkError: string;
    aiUnavailable: string;
    leaderboardUnavailable: string;
    certificateUnavailable: string;
    retry: string;
    back: string;
  };
  levels: Record<number, LocalizedLevelInfo>;
}

/**
 * Fully resolved schema with all fallbacks populated
 */
export interface ResolvedTranslationSchema extends Omit<TranslationSchema, 'common' | 'mainMenu' | 'quiz' | 'settings' | 'certificate' | 'storyIntro' | 'educationalInsight' | 'wisdomCards' | 'finalScore'> {
  common: {
    continue: string;
    back: string;
    close: string;
    retry: string;
    start: string;
    loading: string;
    submit: string;
    cancel: string;
    level: string;
    score: string;
    accuracy: string;
    completed: string;
    locked: string;
    unlocked: string;
    pts: string;
    sec: string;
    objective: string;
    success: string;
    warning: string;
    info: string;
    welcome: string;
    pilgrim: string;
    story: string;
    play: string;
    learnByDoing: string;
    badges: string;
  };
  mainMenu: {
    title: string;
    gameTitle: string;
    startJourney: string;
    continueJourney: string;
    howToPlay: string;
    leaderboard: string;
    wisdomCards: string;
    achievements: string;
    journeyFlow: string;
    settings: string;
    certificate: string;
    subtitle: string;
    tagline: string;
    ganeshaQuote: string;
    languageLabel: string;
    verifyCertificate: string;
    creatorDedication: string;
  };
  storyIntro: {
    ganeshaReflection: string;
    chooseSacredEntry: string;
    aiStoryGuideTitle: string;
    aiStoryGuideDesc: string;
    exploreAiStoryGuide: string;
    gameplayChallengeTitle: string;
    gameplayChallengeDesc: string;
    beginGameplay: string;
    learnByDoingDesc: string;
    flowSummary: string;
  };
  educationalInsight: {
    badge: string;
    traditionalUnderstanding: string;
    culturalContext: string;
    livingValue: string;
    proceedToQuiz: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    questionNumber: string;
    passMessage: string;
    retryMessage: string;
    explanationLabel: string;
    nextQuestion: string;
    finishQuiz: string;
    retryQuiz: string;
    passThresholdNotice: string;
    passedTitle: string;
    retryTitle: string;
    scoreLabel: string;
    quizScoreEarned: string;
    flawlessBonus: string;
    flawlessMsg: string;
    passedDesc: string;
    retryDesc: string;
    viewScoreRewards: string;
    reviewStory: string;
    tryAgain: string;
    questionCount: string;
    correctFeedback: string;
    insightToRemember: string;
    completeQuiz: string;
  };
  wisdomCards: {
    title: string;
    lessonLabel: string;
    lockedNotice: string;
    shareCard: string;
  };
  finalScore: {
    title: string;
    sacredAccomplishment: string;
    cumulativeScore: string;
    chaptersCompleted: string;
    wisdomCardsCollected: string;
    achievementsBadge: string;
    pilgrimageTime: string;
    viewBadges: string;
    generateCertificate: string;
    viewLeaderboard: string;
    replayJourney: string;
  };
  certificate: {
    title: string;
    presentedTo: string;
    bodyText: string;
    scoreLabel: string;
    accuracyLabel: string;
    dateLabel: string;
    idLabel: string;
    certifiedBy: string;
    verifiedBadge: string;
    printOrSave: string;
    verifyOnline: string;
    backToSummary: string;
    printSave: string;
    certifiesThat: string;
    completionBody: string;
    finalScore: string;
    chapters: string;
    dateCompleted: string;
    certificateId: string;
  };
  settings: {
    title: string;
    language: string;
    soundSfx: string;
    backgroundMusic: string;
    reducedMotion: string;
    resetProgress: string;
    resetConfirm: string;
    changeLanguage: string;
    music: string;
    musicDesc: string;
    sfx: string;
    sfxDesc: string;
    reducedMotionDesc: string;
  };
}
