import React, { useState, useEffect, useCallback } from 'react';
import { GameScreen, PlayerProfile, AchievementData, GameSettings } from '../types';
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

import { Level1Birth } from './levels/Level1Birth';
import { Level2Guardian } from './levels/Level2Guardian';
import { Level3WisdomChallenge } from './levels/Level3WisdomChallenge';
import { Level4Celebration } from './levels/Level4Celebration';
import { Level5Ganeshotsav } from './levels/Level5Ganeshotsav';

import { soundService } from '../services/audioService';
import { submitScoreToLeaderboard } from '../services/supabaseService';

const STORAGE_KEY = 'ganesha_journey_profile_v1';

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
    reducedMotion: false
  }
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
  const [activeAchievement, setActiveAchievement] = useState<AchievementData | null>(null);
  const [verifyTargetId, setVerifyTargetId] = useState<string>('GJ-2026-928471');
  const [isAiStoryLessonOpen, setIsAiStoryLessonOpen] = useState(false);
  const [aiStoryLessonLevelId, setAiStoryLessonLevelId] = useState<number>(1);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  // Initial cinematic loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('menu');
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [profile]);

  // Sync settings with soundService
  useEffect(() => {
    soundService.setMusicEnabled(profile.settings.music);
    soundService.setSfxEnabled(profile.settings.sfx);
  }, [profile.settings.music, profile.settings.sfx]);

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
  }, []);

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
    if (!profile.name || profile.name === 'Pranav Shahaji Chavan') {
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

  // Called when player finishes the interactive gameplay section
  const handleLevelCompleted = (gameplayScore: number, bonusScore: number = 0) => {
    setCurrentGameplayScore(gameplayScore);
    setCurrentBonusScore(bonusScore);
    setRecentDelta(gameplayScore);
    setTimeout(() => setRecentDelta(null), 3000);

    // Transition to Educational Insight
    setScreen('educational_insight');
  };

  // Proceed from Educational Insight to mandatory 3-question quiz
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
      certificateId: generateCertId()
    };
    setProfile(fresh);
    setScreen('menu');
  };

  const currentLevelConfig = LEVELS.find((l) => l.id === selectedLevelId) || LEVELS[0];
  const currentWisdomCard = WISDOM_CARDS.find((w) => w.levelId === selectedLevelId) || WISDOM_CARDS[0];

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
                THE JOURNEY OF GANESHA
              </span>
              <span className="text-[10px] text-stone-400 font-mono hidden sm:block">
                Ganesh Chaturthi Learning Game
              </span>
            </div>
          </button>

          {/* Center Progress Bar (Visible during gameplay & level selection) */}
          {screen !== 'loading' && screen !== 'menu' && screen !== 'certificate' && (
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

          {/* Right Controls (Score & Audio) */}
          <div className="flex items-center gap-2.5">
            {screen !== 'loading' && (
              <ScoreDisplay score={profile.totalScore} recentDelta={recentDelta} />
            )}

            <AudioControls
              musicEnabled={profile.settings.music}
              sfxEnabled={profile.settings.sfx}
              onToggleMusic={() => {
                const next = !profile.settings.music;
                handleUpdateSettings({ music: next });
              }}
              onToggleSfx={() => {
                const next = !profile.settings.sfx;
                handleUpdateSettings({ sfx: next });
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

        {/* Main Landing Screen */}
        {screen === 'menu' && (
          <MainMenu
            onStart={handleStartFromMenu}
            onLeaderboard={() => setIsLeaderboardOpen(true)}
            onHowToPlay={() => setIsHowToPlayOpen(true)}
            onSettings={() => setIsSettingsOpen(true)}
            onVerify={() => setScreen('verification')}
            onAboutCreator={() => setIsCreatorModalOpen(true)}
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
                ← Map
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-cinzel text-amber-300">
                  Chapter {selectedLevelId}: {currentLevelConfig.title}
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
            levelTitle={currentLevelConfig.title}
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
            🐘 <strong>The Journey of Ganesha</strong> • Ganesh Chaturthi Game Design Contest
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
              How to Play
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveWisdomCardId(1);
                setIsWisdomModalOpen(true);
              }}
              className="hover:text-amber-300 transition-colors"
            >
              Wisdom Cards ({profile.unlockedWisdomCards.length}/5)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="hover:text-amber-300 transition-colors"
            >
              Leaderboard
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
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={profile.settings}
        onUpdateSettings={handleUpdateSettings}
        onResetProgress={handleResetProgress}
        playerName={profile.name}
      />

      <WisdomCardModal
        isOpen={isWisdomModalOpen}
        onClose={() => setIsWisdomModalOpen(false)}
        unlockedCardIds={profile.unlockedWisdomCards}
        initialCardId={activeWisdomCardId}
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
