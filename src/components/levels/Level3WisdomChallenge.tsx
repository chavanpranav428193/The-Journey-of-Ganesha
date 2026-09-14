import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, Heart, Globe2, ArrowRight, RotateCw, Award, Zap } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { Character } from '../Character';
import { LevelHeader } from './LevelHeader';
import { MetricBar } from './MetricBar';
import { GentleFeedback } from './GentleFeedback';
import { GaneshaExpression } from '../../types';

interface Level3WisdomChallengeProps {
  onComplete: (gameplayScore: number, bonusScore: number) => void;
}

export const Level3WisdomChallenge: React.FC<Level3WisdomChallengeProps> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState<'choice' | 'physical' | 'wisdom' | 'reveal'>('choice');
  const [ganeshaExpr, setGaneshaExpr] = useState<GaneshaExpression>('thinking');

  // Physical Route State (Kartikeya's Flight)
  const [flightDistance, setFlightDistance] = useState(0); // km
  const [peacockStamina, setPeacockStamina] = useState(100);
  const [flightLaps, setFlightLaps] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // Wisdom Route State (Ganesha's Sacred Cosmic Pradakshina Puzzle)
  const [pradakshinaStep, setPradakshinaStep] = useState(0); // 0, 1, 2, 3
  const [alignedPetals, setAlignedPetals] = useState<{ mother: boolean; father: boolean; cosmos: boolean }>({
    mother: false,
    father: false,
    cosmos: false
  });

  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>({
    message: 'Sage Narada brings the divine Golden Fruit of Wisdom. The challenge: Encircle the entire universe three times!',
    type: 'info'
  });

  // Physical flight tap action
  const handleFlyStep = () => {
    soundService.playClick();
    setIsNavigating(true);

    const addedDistance = 25000;
    const newDistance = flightDistance + addedDistance;
    const newStamina = Math.max(peacockStamina - 15, 10);
    setFlightDistance(newDistance);
    setPeacockStamina(newStamina);

    if (newDistance >= 75000 && flightLaps === 0) {
      setFlightLaps(1);
      soundService.playCorrect();
      setFeedback({
        message: 'Lap 1 finished! Continents and oceans stretch endlessly. Peacock is weary. Is physical speed the only path?',
        type: 'warning'
      });
    } else {
      setFeedback({
        message: `Navigated ${addedDistance.toLocaleString()} km across oceans and mountain ranges! Stamina decreasing.`,
        type: 'info'
      });
    }

    setTimeout(() => setIsNavigating(false), 300);
  };

  // Wisdom route: Aligning understanding
  const handleAlignWisdom = (type: 'mother' | 'father' | 'cosmos') => {
    if (alignedPetals[type]) return;

    soundService.playCollectSound();
    const updated = { ...alignedPetals, [type]: true };
    setAlignedPetals(updated);

    const descriptions = {
      mother: 'Mother Parvati is Prakriti — the divine mother and source of all worldly creation.',
      father: 'Lord Shiva is Purusha — the supreme consciousness and protector of all beings.',
      cosmos: 'Devoted parents encompass the entire universe: Matru Devo Bhava, Pitru Devo Bhava.'
    };

    setFeedback({
      message: `Sacred Insight Realized: ${descriptions[type]}`,
      type: 'success'
    });
    setGaneshaExpr('focused');

    if (updated.mother && updated.father && updated.cosmos) {
      soundService.playCorrect();
      setFeedback({
        message: 'All three cosmic principles realized! Now perform the 3 sacred Pradakshinas around your loving parents.',
        type: 'success'
      });
    }
  };

  // Wisdom route: Sacred circumambulation step
  const handleCircumambulate = () => {
    if (pradakshinaStep >= 3) return;

    soundService.playTempleBell();
    const nextStep = pradakshinaStep + 1;
    setPradakshinaStep(nextStep);
    setGaneshaExpr('joyful');

    const stepMeanings = [
      '',
      'First Pradakshina completed: Honoring the source of all life and motherly grace.',
      'Second Pradakshina completed: Honoring spiritual wisdom and fatherly shelter.',
      'Third Pradakshina completed: Encompassing the entire living cosmos within loving parents!'
    ];

    setFeedback({
      message: stepMeanings[nextStep],
      type: 'success'
    });

    if (nextStep === 3) {
      soundService.playCorrect();
      setTimeout(() => {
        setActiveTab('reveal');
        soundService.playLevelComplete();
        setGaneshaExpr('joyful');
      }, 1500);
    }
  };

  // Final completion trigger
  const handleFinishLevel = () => {
    const baseScore = 700;
    const bonusScore = 150;
    onComplete(baseScore, bonusScore);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none text-stone-100">
      {/* Reusable Level Header */}
      <LevelHeader
        levelNumber={3}
        title="The Wisdom Challenge"
        subtitle="Speed vs Wisdom: The Cosmic Pradakshina"
        objective="Decide between physical worldly travel and the contemplative path of wisdom to encircle the cosmos."
        badgeIcon={<Compass className="w-3.5 h-3.5 text-amber-400" />}
        rightElement={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-cinzel text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2.5 py-1 rounded-xl">
              {activeTab === 'physical' ? 'Physical Route' : activeTab === 'wisdom' ? 'Wisdom Route' : activeTab === 'reveal' ? 'Divine Fruit' : 'Choose Path'}
            </span>
          </div>
        }
      />

      {/* Main Container */}
      <div className="w-full bg-gradient-to-b from-stone-900/90 via-[#180e07] to-stone-950/95 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden mb-4">
        {/* Character Stage & Narrative */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <Character expression={ganeshaExpr} size="sm" showAura={true} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block">
                The Divine Challenge
              </span>
              <h4 className="text-sm font-bold text-amber-100 font-cinzel">
                Encircle the Universe 3 Times
              </h4>
              <span className="text-xs text-stone-300 font-medium">
                Who shall receive the sacred fruit of wisdom?
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl">🥭</span>
            <span className="text-[10px] text-amber-300 font-cinzel font-bold block">
              Fruit of Knowledge
            </span>
          </div>
        </div>

        {/* Feedback Display */}
        <div className="mb-4">
          <GentleFeedback
            message={feedback?.message || null}
            type={feedback?.type || 'info'}
          />
        </div>

        {/* 1. ROUTE SELECTION STAGE */}
        {activeTab === 'choice' && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-stone-300 leading-relaxed text-center max-w-md mx-auto">
              Kartikeya mounts his swift celestial peacock to race around galaxies. Ganesha pauses in profound contemplation. How will you approach the challenge?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {/* Physical Route Card */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-blue-500/30 hover:border-blue-400 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🦚</span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400 font-cinzel block">
                        Physical Route
                      </span>
                      <h5 className="text-sm font-bold text-stone-100 font-cinzel">
                        Kartikeya’s Peacock Flight
                      </h5>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Test your physical stamina and speed by navigating through endless oceans, mountains, and celestial spheres.
                  </p>
                </div>
                <button
                  id="choose-physical-route-btn"
                  onClick={() => {
                    soundService.playClick();
                    setActiveTab('physical');
                    setFeedback({
                      message: 'You have chosen the Physical Route! Steer the swift peacock across continents and oceans.',
                      type: 'info'
                    });
                  }}
                  className="mt-4 py-2.5 px-3 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-cyan-200 text-xs font-bold font-cinzel flex items-center justify-center gap-2 active:scale-98 transition-colors"
                >
                  <span>Fly with Peacock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Wisdom Route Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/60 to-stone-900/90 border-2 border-amber-400/60 hover:border-amber-300 flex flex-col justify-between shadow-lg transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🪷</span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 font-cinzel block">
                        Contemplative Route
                      </span>
                      <h5 className="text-sm font-bold text-amber-100 font-cinzel">
                        Ganesha’s Sacred Wisdom
                      </h5>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Reflect upon the nature of the cosmos. Where does the true universe reside? Solve the sacred riddle through understanding.
                  </p>
                </div>
                <button
                  id="choose-wisdom-route-btn"
                  onClick={() => {
                    soundService.playClick();
                    setActiveTab('wisdom');
                    setFeedback({
                      message: 'You have chosen the Wisdom Route! Reflect on where the universe truly resides.',
                      type: 'info'
                    });
                    setGaneshaExpr('focused');
                  }}
                  className="mt-4 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black font-cinzel flex items-center justify-center gap-2 active:scale-98 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Embrace Path of Wisdom</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. PHYSICAL NAVIGATION ROUTE (KARTIKEYA'S FLIGHT) */}
        {activeTab === 'physical' && (
          <div className="space-y-4 animate-fade-in">
            {/* Flight Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-blue-500/30">
                <MetricBar
                  label="Peacock Stamina"
                  value={peacockStamina}
                  max={100}
                  icon="⚡"
                  variant="blue"
                  size="sm"
                />
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-right flex flex-col justify-center">
                <span className="text-[10px] text-stone-400 uppercase font-cinzel block">Distance Traveled</span>
                <span className="text-sm font-bold font-mono text-cyan-300">
                  {flightDistance.toLocaleString()} km
                </span>
              </div>
            </div>

            {/* Flight Arena */}
            <div className="h-36 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 border border-blue-500/40 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />

              {/* Celestial Waypoints & Clouds */}
              <div className="absolute left-6 top-6 text-xl opacity-70">☁️</div>
              <div className="absolute right-12 top-4 text-xl opacity-70">🪐</div>
              <div className="absolute left-1/3 bottom-4 text-xl opacity-50">🌊</div>

              {/* Animated Peacock Ship */}
              <div
                className={`flex flex-col items-center transition-transform duration-300 ${
                  isNavigating ? 'scale-110 -translate-y-2' : ''
                }`}
              >
                <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                  🦚
                </span>
                <span className="text-[10px] font-bold text-cyan-200 bg-stone-900/90 px-2 py-0.5 rounded-full border border-cyan-500/40 mt-1">
                  Speed: Mach 10 ({flightLaps} / 3 Laps)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                id="navigate-flight-btn"
                onClick={handleFlyStep}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-cinzel text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-lg"
              >
                <Globe2 className="w-4 h-4" />
                <span>Steer Swift Peacock ({flightDistance} km)</span>
              </button>

              <button
                id="switch-to-wisdom-btn"
                onClick={() => {
                  soundService.playClick();
                  setActiveTab('wisdom');
                  setFeedback({
                    message: 'Reflecting on the exhaustion of endless outward striving, Ganesha seeks a deeper understanding.',
                    type: 'info'
                  });
                  setGaneshaExpr('focused');
                }}
                className="py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 font-bold font-cinzel text-xs active:scale-98 transition-colors"
              >
                Switch to Wisdom Route 🪷
              </button>
            </div>
          </div>
        )}

        {/* 3. WISDOM PUZZLE ROUTE (GANESHA'S SACRED PRADAKSHINA) */}
        {activeTab === 'wisdom' && (
          <div className="space-y-4 animate-fade-in">
            {/* Step 1: Aligning Understanding */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-center">
              <span className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider block mb-2">
                1. Contemplate the Three Sacred Cosmic Truths
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="align-mother-btn"
                  onClick={() => handleAlignWisdom('mother')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    alignedPetals.mother
                      ? 'bg-amber-950/70 border-amber-400 text-amber-100'
                      : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-xl block mb-1">🌸</span>
                  <span className="text-[10px] font-bold block font-cinzel">Mother Parvati</span>
                  <span className="text-[9px] text-stone-400">Prakriti (Source)</span>
                </button>

                <button
                  id="align-father-btn"
                  onClick={() => handleAlignWisdom('father')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    alignedPetals.father
                      ? 'bg-amber-950/70 border-amber-400 text-amber-100'
                      : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-xl block mb-1">🔱</span>
                  <span className="text-[10px] font-bold block font-cinzel">Lord Shiva</span>
                  <span className="text-[9px] text-stone-400">Purusha (Consciousness)</span>
                </button>

                <button
                  id="align-cosmos-btn"
                  onClick={() => handleAlignWisdom('cosmos')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    alignedPetals.cosmos
                      ? 'bg-amber-950/70 border-amber-400 text-amber-100'
                      : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-xl block mb-1">🌌</span>
                  <span className="text-[10px] font-bold block font-cinzel">Living Cosmos</span>
                  <span className="text-[9px] text-stone-400">Encompassed in Parents</span>
                </button>
              </div>
            </div>

            {/* Step 2: The Cosmic Pradakshina Circle */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/40 to-stone-950/90 border border-amber-400/50 flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-amber-400 font-cinzel tracking-wider block mb-2">
                2. Circumambulate Lord Shiva & Goddess Parvati ({pradakshinaStep} / 3 Completed)
              </span>

              {/* Visual Parents in Divine Center */}
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-400/70 flex items-center justify-center relative my-2 bg-stone-900/80 shadow-inner">
                <div className="flex items-center gap-1 text-2xl">
                  <span>🔱</span>
                  <Heart className="w-4 h-4 text-rose-400 animate-pulse fill-rose-500" />
                  <span>🌸</span>
                </div>

                {/* Orbiting Ganesha Marker */}
                <div
                  className="absolute w-8 h-8 rounded-full bg-amber-500 border border-amber-300 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-all duration-700 ease-out"
                  style={{
                    transform: `rotate(${pradakshinaStep * 120}deg) translate(50px) rotate(-${pradakshinaStep * 120}deg)`
                  }}
                >
                  🐘
                </div>
              </div>

              {/* Circumambulate Button */}
              <button
                id="perform-pradakshina-btn"
                disabled={!(alignedPetals.mother && alignedPetals.father && alignedPetals.cosmos) || pradakshinaStep >= 3}
                onClick={handleCircumambulate}
                className={`mt-2 py-2.5 px-6 rounded-xl font-bold font-cinzel text-xs flex items-center gap-2 transition-all ${
                  alignedPetals.mother && alignedPetals.father && alignedPetals.cosmos && pradakshinaStep < 3
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 hover:scale-105 active:scale-98 shadow-lg'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                <RotateCw className="w-4 h-4" />
                <span>
                  {pradakshinaStep === 0
                    ? 'Perform 1st Sacred Pradakshina'
                    : pradakshinaStep === 1
                    ? 'Perform 2nd Sacred Pradakshina'
                    : pradakshinaStep === 2
                    ? 'Perform 3rd Sacred Pradakshina'
                    : 'All 3 Pradakshinas Completed!'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 4. THE SATISFYING REVEAL */}
        {activeTab === 'reveal' && (
          <div className="text-center py-4 space-y-4 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(245,158,11,0.8)] animate-pulse">
              🥭
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-cinzel">
              <Award className="w-3.5 h-3.5" />
              <span>Victory of Divine Wisdom</span>
            </div>

            <h3 className="text-xl font-black font-cinzel text-amber-100">
              The Divine Fruit Bestowed Upon Ganesha
            </h3>

            <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 max-w-md mx-auto text-left space-y-2 text-xs leading-relaxed">
              <p className="text-amber-200 italic">
                "Whoever honors and circumambulates their parents with pure devotion has circumambulated the entire universe. For in one's loving parents lies the origin, sanctuary, and essence of all creation."
              </p>
              <p className="text-stone-300 pt-2 border-t border-stone-800">
                Kartikeya returns on his peacock, listens to Ganesha’s words, and bows in admiration: <em className="text-amber-300 font-semibold">"Brother, your wisdom sees what speed could never touch."</em>
              </p>
            </div>

            <button
              id="claim-wisdom-victory-btn"
              onClick={handleFinishLevel}
              className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-stone-950 font-black text-xs uppercase tracking-widest font-cinzel shadow-xl active:scale-95 transition-all"
            >
              Continue to Educational Insight
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
