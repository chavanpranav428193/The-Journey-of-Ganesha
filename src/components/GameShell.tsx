import React, { useState, useEffect, useCallback } from 'react';
import { GameScreen, PlayerProfile, AchievementData, GameSettings, SupportedLanguage } from '../types';
import { LEVELS, WISDOM_CARDS, INITIAL_ACHIEVEMENTS } from '../data/gameData';
import { MainMenu } from './MainMenu';
import { PlayerNameModal } from './PlayerNameModal';
import { LevelSelector } from './LevelSelector';
import { StoryIntroModal } from './StoryIntroModal';
import { EducationalInsightModal } from './EducationalInsightModal';
import { LevelQuizScreen } from './LevelQuizScreen';
import { LevelScoreScreen } from './LevelScoreScreen';
import { WisdomCardModal } from './WisdomCardModal';
import { FinalScoreScreen } from './FinalScoreScreen';
import { CertificateView } from './CertificateView';
import { CertificateVerification } from './CertificateVerification';
import { LeaderboardModal } from './LeaderboardModal';
import { HowToPlayModal } from './HowToPlayModal';
import { SettingsModal } from './SettingsModal';
import { AchievementsModal } from './AchievementsModal';
import { AchievementToast } from './AchievementToast';
import { AudioControls } from './AudioControls';
import { ScoreDisplay } from './ScoreDisplay';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { Character } from './Character';
import { GaneshaLogo } from './GaneshaLogo';
import { AiStoryLessonModal } from './AiStoryLessonModal';
import { AiStoryLessonButton } from './AiStoryLessonButton';
import { CreatorStoryModal } from './CreatorStoryModal';
import { JourneyFlowModal } from './JourneyFlowModal';
import { LanguageSelectionScreen } from './LanguageSelectionScreen';

import { Level1Birth } from './levels/Level1Birth';
import { Level2Guardian } from './levels/Level2Guardian';
import { Level3WisdomChallenge } from './levels/Level3WisdomChallenge';
import { Level4Celebration } from './levels/Level4Celebration';
import { Level5Ganeshotsav } from './levels/Level5Ganeshotsav';

import { soundService } from '../services/audioService';
import { submitScoreToLeaderboard } from '../services/supabaseService';
import { LanguageProvider, useI18n } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

const STORAGE_KEY = 'ganesha_journey_profile_v1';
const LANGUAGE_CHOSEN_KEY = 'ganesha_journey_language_chosen';

function generateCertId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `GJ-2026-${num}`;
}

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Pranav Shahaji Chavan',
  currentLevel: 1,
  unlockedLevels: [1],
  levelScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  gameplayScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  quizScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  bonusScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  quizPassed: { 1: false, 2: false, 3: false, 4: false, 5: false },
  totalQuizCorrect: 0,
  totalQuizQuestions: 0,
  totalScore: 0,
  unlockedAchievements: [],
  unlockedWisdomCards: [],
  startTime: Date.now(),
  totalTimeElapsed: 0,
  certificateId: 'GJ-2026-928471',
  completedDate: null,
  settings: {
    music: false,
    sfx: true,
    reducedMotion: false,
    language: 'en'
  }
};

interface GameShellContentProps {
  profile: PlayerProfile;
  setProfile: React.Dispatch<React.SetStateAction<PlayerProfile>>;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
}

const GameShellContent: React.FC<GameShellContentProps> = ({
  profile,
  setProfile,
  onUpdateSettings,
  onResetProgress
}) => {
  const { t, currentLanguageOption, getLevelData } = useI18n();

  const [screen, setScreen] = useState<GameScreen>('loading');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [currentGameplayScore, setCurrentGameplayScore] = useState<number>(0);
  const [currentBonusScore, setCurrentBonusScore] = useState<number>(0);
  const [currentQuizScore, setCurrentQuizScore] = useState<number>(0);
  const [recentDelta, setRecentDelta] = useState<number | null>(null);

  // Modals state
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWisdomModalOpen, setIsWisdomModalOpen] = useState(false);
  const [activeWisdomCardId, setActiveWisdomCardId] = useState<number>(1);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [activeAchievement, setActiveAchievement] = useState<AchievementData | null>(null);
  const [verifyTargetId, setVerifyTargetId] = useState<string>('GJ-2026-928471');
  const [isAiStoryLessonOpen, setIsAiStoryLessonOpen] = useState(false);
  const [aiStoryLessonLevelId, setAiStoryLessonLevelId] = useState<number>(1);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isJourneyFlowOpen, setIsJourneyFlowOpen] = useState(false);

  // Initial cinematic loading & first-launch language screen logic
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const hasChosenLanguage = localStorage.getItem(LANGUAGE_CHOSEN_KEY);
        if (!hasChosenLanguage) {
          setScreen('language_select');
        } else {
          setScreen('menu');
        }
      } catch {
        setScreen('menu');
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Hash route detector (e.g. #verify/GJ-2026-928471)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#verify/')) {
        const id = hash.replace('#verify/', '');
        setVerifyTargetId(id);
        setScreen('verification');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    setProfile((prev) => ({ ...prev, totalTimeElapsed: prev.totalTimeElapsed + 1 }));
  }, [setProfile]);

  const triggerAchievement = (id: string) => {
    if (profile.unlockedAchievements.includes(id)) return;
    const ach = INITIAL_ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;

    soundService.playCorrect();
    setProfile((prev) => ({
      ...prev,
      unlockedAchievements: [...prev.unlockedAchievements, id]
    }));
    setActiveAchievement(ach);
    setTimeout(() => {
      setActiveAchievement(null);
    }, 4500);
  };

  const handleStartFromMenu = () => {
    if (!profile.name || profile.name.trim() === '' || profile.name === DEFAULT_PROFILE.name) {
      setScreen('player_name');
    } else {
      setScreen('level_select');
    }
  };

  const handleConfirmPlayerName = (name: string) => {
    setProfile((prev) => ({ ...prev, name }));
    setScreen('level_select');
  };

  const handleSelectLevel = (levelId: number) => {
    setSelectedLevelId(levelId);
    setScreen('story_intro');
  };

  const handleStartGameplay = () => {
    setScreen('gameplay');
  };

  // Called by mini-game when interactive gameplay challenge is completed
  const handleLevelCompleted = (score: number, bonus: number = 0) => {
    soundService.playLevelComplete();
    setCurrentGameplayScore(score);
    setCurrentBonusScore(bonus);
    setRecentDelta(score + bonus);
    setTimeout(() => setRecentDelta(null), 3000);

    setScreen('educational_insight');
  };

  const handleProceedToQuiz = () => {
    setScreen('level_quiz');
  };

  // Called when player passes the quiz (>= 2/3 correct)
  const handleQuizPassed = (quizScore: number, correctCount: number, isFlawless: boolean) => {
    const totalBonus = currentBonusScore + (isFlawless ? 50 : 0);
    const combinedLevelScore = currentGameplayScore + quizScore + totalBonus;

    setCurrentQuizScore(quizScore);
    setCurrentBonusScore(totalBonus);
    setRecentDelta(quizScore + (isFlawless ? 50 : 0));
    setTimeout(() => setRecentDelta(null), 3000);

    setProfile((prev) => {
      const existingScore = prev.levelScores[selectedLevelId] || 0;
      const newScore = Math.max(existingScore, combinedLevelScore);
      const updatedLevelScores = { ...prev.levelScores, [selectedLevelId]: newScore };
      const newTotal = Object.values(updatedLevelScores).reduce((acc: number, curr: number) => acc + curr, 0);

      const nextLevel = selectedLevelId + 1;
      const updatedUnlocked = nextLevel <= 5 && !prev.unlockedLevels.includes(nextLevel)
        ? [...prev.unlockedLevels, nextLevel]
        : prev.unlockedLevels;

      const updatedWisdom = !prev.unlockedWisdomCards.includes(selectedLevelId)
        ? [...prev.unlockedWisdomCards, selectedLevelId]
        : prev.unlockedWisdomCards;

      const updatedQuizScores = { ...prev.quizScores, [selectedLevelId]: quizScore };
      const updatedGameplayScores = { ...prev.gameplayScores, [selectedLevelId]: currentGameplayScore };
      const updatedBonusScores = { ...prev.bonusScores, [selectedLevelId]: totalBonus };
      const updatedQuizPassed = { ...prev.quizPassed, [selectedLevelId]: true };

      return {
        ...prev,
        levelScores: updatedLevelScores,
        gameplayScores: updatedGameplayScores,
        quizScores: updatedQuizScores,
        bonusScores: updatedBonusScores,
        quizPassed: updatedQuizPassed,
        totalQuizCorrect: (prev.totalQuizCorrect || 0) + correctCount,
        totalQuizQuestions: (prev.totalQuizQuestions || 0) + 3,
        totalScore: newTotal,
        unlockedLevels: updatedUnlocked,
        unlockedWisdomCards: updatedWisdom
      };
    });

    // Check achievement triggers
    if (selectedLevelId === 1) triggerAchievement('first_step');
    if (selectedLevelId === 2) triggerAchievement('loyal_guardian');
    if (selectedLevelId === 3) triggerAchievement('wisdom_seeker');
    if (selectedLevelId === 4) triggerAchievement('festival_explorer');
    if (selectedLevelId === 5) {
      triggerAchievement('master_scholar');
      triggerAchievement('eco_warrior');
    }
    if (isFlawless) {
      triggerAchievement('quiz_scholar');
    }

    setScreen('level_score');
  };

  const handleReviewStory = () => {
    setScreen('educational_insight');
  };

  const handleProceedToWisdomCard = () => {
    setActiveWisdomCardId(selectedLevelId);
    setIsWisdomModalOpen(true);

    if (selectedLevelId < 5) {
      setScreen('level_select');
    } else {
      // Completed full 5 chapters!
      const finalDate = new Date().toISOString().split('T')[0];
      setProfile((prev) => {
        const completedProfile = {
          ...prev,
          completedDate: finalDate
        };

        // Submit to global/local leaderboard
        submitScoreToLeaderboard({
          playerName: completedProfile.name || 'Pranav Shahaji Chavan',
          score: completedProfile.totalScore,
          achievementTitle: completedProfile.totalScore >= 4500 ? '🌟 Ganesha Wisdom Master' : '🐘 Wisdom Seeker',
          certificateId: completedProfile.certificateId
        });

        return completedProfile;
      });

      if (profile.totalScore >= 4500) {
        triggerAchievement('perfect_journey');
      }

      setScreen('final_score');
    }
  };

  const currentLevelConfig = LEVELS.find((l) => l.id === selectedLevelId) || LEVELS[0];
  const currentWisdomCard = WISDOM_CARDS.find((w) => w.levelId === selectedLevelId) || WISDOM_CARDS[0];
  const localizedCurrentLevel = getLevelData(selectedLevelId);

  return (
    <div
      className={`min-h-screen bg-[#0c0602] text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-white ${
        profile.settings.reducedMotion ? 'reduced-motion' : ''
      }`}
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-stone-950/80 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo / Home Button */}
          <button
            id="brand-header-btn"
            onClick={() => {
              soundService.playClick();
              setScreen('menu');
            }}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <GaneshaLogo size="sm" showGlow={true} alt="The Journey of Ganesha Logo" />
            <div>
              <span className="font-bold text-xs tracking-wider text-amber-200 font-cinzel block group-hover:text-amber-100 transition-colors">
                {t.mainMenu.title}
              </span>
              <span className="text-[10px] text-stone-400 font-mono hidden sm:block">
                Ganesh Chaturthi Learning Game
              </span>
            </div>
          </button>

          {/* Center Progress Bar (Visible during gameplay & level selection) */}
          {screen !== 'loading' && screen !== 'language_select' && screen !== 'menu' && screen !== 'certificate' && (
            <div className="hidden lg:block flex-1 max-w-md mx-4">
              <ProgressBar
                currentLevel={selectedLevelId}
                unlockedLevels={profile.unlockedLevels}
                onSelectLevel={(lvlId) => {
                  soundService.playClick();
                  handleSelectLevel(lvlId);
                }}
              />
            </div>
          )}

          {/* Right Controls (Language Switcher, Score & Audio) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Language Switcher Button */}
            {screen !== 'loading' && (
              <button
                id="header-language-btn"
                onClick={() => {
                  soundService.playClick();
                  setScreen('language_select');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 text-xs font-medium transition-all active:scale-95"
                title="Change Language / भाषा बदलें"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold font-sans hidden xs:inline">{currentLanguageOption.nativeName}</span>
              </button>
            )}

            {screen !== 'loading' && screen !== 'language_select' && (
              <ScoreDisplay score={profile.totalScore} recentDelta={recentDelta} />
            )}

            <AudioControls
              musicEnabled={profile.settings.music}
              sfxEnabled={profile.settings.sfx}
              onToggleMusic={() => {
                const next = !profile.settings.music;
                onUpdateSettings({ music: next });
              }}
              onToggleSfx={() => {
                const next = !profile.settings.sfx;
                onUpdateSettings({ sfx: next });
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-2 sm:px-4 py-4 sm:py-6">
        {/* Loading Screen */}
        {screen === 'loading' && (
          <div className="py-16 flex flex-col items-center text-center animate-fade-in">
            <div className="relative mb-4">
              <Character expression="welcoming" size="lg" showAura={true} />
              <div className="absolute -top-4 -left-4 text-2xl animate-float">🌺</div>
              <div className="absolute -bottom-2 -right-4 text-2xl animate-bounce">🪔</div>
            </div>
            <h2 className="text-xl font-bold font-cinzel text-amber-200 mt-2">
              Preparing your sacred journey...
            </h2>
            <p className="text-xs text-stone-400 font-mono mt-1">
              Blessings • Traditional Lore • Auspicious Beginnings
            </p>
          </div>
        )}

        {/* First-Launch / Switcher Language Selection Screen */}
        {screen === 'language_select' && (
          <LanguageSelectionScreen
            currentLanguage={profile.settings.language || 'en'}
            onSelectLanguage={(lang) => {
              onUpdateSettings({ language: lang });
            }}
            onConfirm={() => {
              try {
                localStorage.setItem(LANGUAGE_CHOSEN_KEY, 'true');
              } catch {
                // ignore
              }
              setScreen('menu');
            }}
            canCancel={profile.unlockedLevels.length > 1 || profile.totalScore > 0}
            onCancel={() => setScreen('menu')}
          />
        )}

        {/* Main Landing Screen */}
        {screen === 'menu' && (
          <MainMenu
            onStart={handleStartFromMenu}
            onLeaderboard={() => setIsLeaderboardOpen(true)}
            onHowToPlay={() => setIsHowToPlayOpen(true)}
            onSettings={() => setIsSettingsOpen(true)}
            onVerify={() => setScreen('verification')}
            onAboutCreator={() => setIsCreatorModalOpen(true)}
            onProgressionMap={() => setIsJourneyFlowOpen(true)}
            onOpenLanguage={() => setScreen('language_select')}
            playerName={profile.name}
            hasExistingProgress={profile.unlockedLevels.length > 1 || profile.totalScore > 0}
          />
        )}

        {/* Player Name Input */}
        {screen === 'player_name' && (
          <PlayerNameModal
            initialName={profile.name}
            onConfirm={handleConfirmPlayerName}
            onCancel={() => setScreen('menu')}
          />
        )}

        {/* Level Map Selector */}
        {screen === 'level_select' && (
          <LevelSelector
            unlockedLevels={profile.unlockedLevels}
            levelScores={profile.levelScores}
            onSelectLevel={handleSelectLevel}
            onOpenAiLesson={(lvlId) => {
              setAiStoryLessonLevelId(lvlId);
              setIsAiStoryLessonOpen(true);
            }}
            onBackToMenu={() => setScreen('menu')}
            playerName={profile.name}
          />
        )}

        {/* Story Intro */}
        {screen === 'story_intro' && (
          <StoryIntroModal
            level={currentLevelConfig}
            onStartGameplay={handleStartGameplay}
            onOpenAiLesson={() => {
              setAiStoryLessonLevelId(selectedLevelId);
              setIsAiStoryLessonOpen(true);
            }}
          />
        )}

        {/* Active Level Gameplay */}
        {screen === 'gameplay' && (
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            {/* Level Sub-Header */}
            <div className="w-full max-w-2xl flex flex-wrap sm:flex-nowrap items-center justify-between px-2 mb-3 gap-2">
              <button
                id="back-to-map-during-game-btn"
                onClick={() => {
                  soundService.playClick();
                  setScreen('level_select');
                }}
                className="text-xs font-semibold text-stone-400 hover:text-amber-300 transition-colors"
              >
                ← {t.common.back}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-cinzel text-amber-300">
                  {t.common.level} {selectedLevelId}: {localizedCurrentLevel.title}
                </span>
                <AiStoryLessonButton
                  variant="compact"
                  onClick={() => {
                    setAiStoryLessonLevelId(selectedLevelId);
                    setIsAiStoryLessonOpen(true);
                  }}
                />
              </div>

              <Timer
                isActive={screen === 'gameplay'}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>

            {/* Level Components */}
            {selectedLevelId === 1 && (
              <Level1Birth onComplete={(score, bonus) => handleLevelCompleted(score, bonus)} />
            )}
            {selectedLevelId === 2 && (
              <Level2Guardian onComplete={(score, bonus) => handleLevelCompleted(score, bonus)} />
            )}
            {selectedLevelId === 3 && (
              <Level3WisdomChallenge onComplete={(score, bonus) => handleLevelCompleted(score, bonus)} />
            )}
            {selectedLevelId === 4 && (
              <Level4Celebration onComplete={(score, bonus) => handleLevelCompleted(score, bonus)} />
            )}
            {selectedLevelId === 5 && (
              <Level5Ganeshotsav onComplete={(score, bonus) => handleLevelCompleted(score, bonus)} />
            )}
          </div>
        )}

        {/* Educational Insight Screen */}
        {screen === 'educational_insight' && (
          <EducationalInsightModal
            level={currentLevelConfig}
            wisdomCard={currentWisdomCard}
            earnedScore={currentGameplayScore}
            onProceedToQuiz={handleProceedToQuiz}
            onOpenAiLesson={() => {
              setAiStoryLessonLevelId(selectedLevelId);
              setIsAiStoryLessonOpen(true);
            }}
          />
        )}

        {/* Level Quiz Screen */}
        {screen === 'level_quiz' && (
          <LevelQuizScreen
            levelId={selectedLevelId}
            onQuizPassed={handleQuizPassed}
            onReviewStory={handleReviewStory}
          />
        )}

        {/* Level Score Screen */}
        {screen === 'level_score' && (
          <LevelScoreScreen
            levelId={selectedLevelId}
            levelTitle={localizedCurrentLevel.title}
            gameplayScore={currentGameplayScore}
            quizScore={currentQuizScore}
            bonusScore={currentBonusScore}
            totalScoreSoFar={profile.totalScore}
            onProceedToWisdom={handleProceedToWisdomCard}
          />
        )}

        {/* Final Score Completion Screen */}
        {screen === 'final_score' && (
          <FinalScoreScreen
            playerName={profile.name}
            totalScore={profile.totalScore}
            totalTimeElapsed={profile.totalTimeElapsed}
            unlockedAchievementsCount={profile.unlockedAchievements.length}
            unlockedWisdomCardsCount={profile.unlockedWisdomCards.length}
            onViewAchievements={() => setIsAchievementsOpen(true)}
            onViewCertificate={() => setScreen('certificate')}
            onViewWisdomCollection={() => {
              setActiveWisdomCardId(1);
              setIsWisdomModalOpen(true);
            }}
            onViewLeaderboard={() => setIsLeaderboardOpen(true)}
            onReplay={() => {
              setSelectedLevelId(1);
              setScreen('level_select');
            }}
          />
        )}

        {/* Official Certificate View Screen */}
        {screen === 'certificate' && (
          <CertificateView
            profile={profile}
            onBackToMenu={() => setScreen('menu')}
            onVerifyDirect={(certId) => {
              setVerifyTargetId(certId);
              setScreen('verification');
            }}
          />
        )}

        {/* Certificate Verification Screen */}
        {screen === 'verification' && (
          <CertificateVerification
            initialCertId={verifyTargetId}
            onBack={() => setScreen('menu')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-stone-950/90 border-t border-stone-800/80 px-4 py-3 text-center text-stone-400 text-xs print:hidden">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            🐘 <strong>{t.mainMenu.title}</strong> • Ganesh Chaturthi Game Design Contest
          </span>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsCreatorModalOpen(true)}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-200/90"
            >
              <span>Behind the Journey</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsHowToPlayOpen(true)}
              className="hover:text-amber-300 transition-colors"
            >
              {t.mainMenu.howToPlay}
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveWisdomCardId(1);
                setIsWisdomModalOpen(true);
              }}
              className="hover:text-amber-300 transition-colors"
            >
              {t.wisdomCards.title} ({profile.unlockedWisdomCards.length}/5)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="hover:text-amber-300 transition-colors"
            >
              {t.mainMenu.leaderboard}
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentPlayerName={profile.name}
        currentPlayerScore={profile.totalScore}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        onStartJourney={() => {
          setIsHowToPlayOpen(false);
          handleStartFromMenu();
        }}
        onViewProgressionMap={() => {
          setIsHowToPlayOpen(false);
          setIsJourneyFlowOpen(true);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={profile.settings}
        onUpdateSettings={onUpdateSettings}
        onResetProgress={onResetProgress}
        playerName={profile.name}
      />

      <WisdomCardModal
        isOpen={isWisdomModalOpen}
        onClose={() => setIsWisdomModalOpen(false)}
        unlockedCardIds={profile.unlockedWisdomCards}
        initialCardId={activeWisdomCardId}
      />

      {/* Badges & Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        unlockedAchievementIds={profile.unlockedAchievements}
      />

      {/* Sacred Progression Architecture Flow Modal */}
      <JourneyFlowModal
        isOpen={isJourneyFlowOpen}
        onClose={() => setIsJourneyFlowOpen(false)}
        currentLevelId={selectedLevelId}
        unlockedLevelsCount={profile.unlockedLevels.length}
        wisdomCardsCount={profile.unlockedWisdomCards.length}
        achievementsCount={profile.unlockedAchievements.length}
        hasCompletedJourney={!!profile.completedDate || profile.unlockedLevels.length >= 5}
        onSelectLevel={(lvlId) => {
          setSelectedLevelId(lvlId);
          setScreen('story_intro');
        }}
        onOpenAiGuide={() => {
          setAiStoryLessonLevelId(selectedLevelId);
          setIsAiStoryLessonOpen(true);
        }}
        onViewWisdom={() => {
          setActiveWisdomCardId(selectedLevelId);
          setIsWisdomModalOpen(true);
        }}
        onViewCertificate={() => setScreen('certificate')}
        onViewLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Achievement Unlock Toast */}
      <AchievementToast
        achievement={activeAchievement}
        onClose={() => setActiveAchievement(null)}
      />

      {/* Interactive AI Story Lesson Modal */}
      <AiStoryLessonModal
        isOpen={isAiStoryLessonOpen}
        levelId={aiStoryLessonLevelId}
        onClose={() => setIsAiStoryLessonOpen(false)}
        onContinueLevel={() => {
          setIsAiStoryLessonOpen(false);
          if (screen === 'story_intro') {
            handleStartGameplay();
          }
        }}
      />

      {/* Behind the Journey Creator's Dedication Modal */}
      <CreatorStoryModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        onExploreChapters={() => {
          setIsCreatorModalOpen(false);
          setScreen('level_select');
        }}
      />
    </div>
  );
};

export const GameShell: React.FC = () => {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  });

  // Save profile to localStorage whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save profile to localStorage', e);
    }
  }, [profile]);

  // Sync audio settings with soundService
  useEffect(() => {
    soundService.setMusicEnabled(profile.settings.music);
    soundService.setSfxEnabled(profile.settings.sfx);
  }, [profile.settings.music, profile.settings.sfx]);

  const handleUpdateSettings = (newSettings: Partial<GameSettings>) => {
    setProfile((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const handleResetProgress = () => {
    const fresh: PlayerProfile = {
      ...DEFAULT_PROFILE,
      name: profile.name,
      certificateId: generateCertId(),
      settings: {
        ...DEFAULT_PROFILE.settings,
        language: profile.settings.language
      }
    };
    setProfile(fresh);
  };

  const activeLanguage = profile.settings.language || 'en';

  return (
    <LanguageProvider
      language={activeLanguage}
      onLanguageChange={(newLang) => handleUpdateSettings({ language: newLang })}
    >
      <GameShellContent
        profile={profile}
        setProfile={setProfile}
        onUpdateSettings={handleUpdateSettings}
        onResetProgress={handleResetProgress}
      />
    </LanguageProvider>
  );
};
