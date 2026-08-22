import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Lock, Heart, Volume2, VolumeX } from 'lucide-react';
import { SITE_CONFIG } from './data/siteConfig';
import { romanticAudio } from './utils/audioSynth';

// Components
import { FloatingHearts } from './components/FloatingHearts';
import { CursorSparkles } from './components/CursorSparkles';
import { ScrollProgress } from './components/ScrollProgress';
import { EasterEggs } from './components/EasterEggs';
import { InstructionsModal } from './components/InstructionsModal';

// Pages / Sections
import { LoginPage } from './pages/LoginPage';
import { ReasonsPage } from './pages/ReasonsPage';
import { HeroPage } from './pages/HeroPage';
import { BirthdayPage } from './pages/BirthdayPage';
import { SpecialBirthdayCardsPage } from './pages/SpecialBirthdayCardsPage';
import { TimelinePage } from './pages/TimelinePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { LoveLettersPage } from './pages/LoveLettersPage';

import { FuturePage } from './pages/FuturePage';
import { SecretMessagePage } from './pages/SecretMessagePage';
import { FinalSurprisePage } from './pages/FinalSurprisePage';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('our_love_story_unlocked') === 'true';
  });

  const [isNight, setIsNight] = useState<boolean>(() => {
    return localStorage.getItem('our_story_night_mode') === 'true';
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  useEffect(() => {
    if (isNight) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('our_story_night_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('our_story_night_mode', 'false');
    }
  }, [isNight]);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return () => unsub();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      scrollToSection('welcome');
    }, 100);
  };

  const handleLockApp = () => {
    localStorage.removeItem('our_love_story_unlocked');
    setIsUnlocked(false);
  };

  const handleToggleMusic = () => {
    romanticAudio.toggle();
  };

  const handleReplay = () => {
    scrollToSection('welcome');
  };

  return (
    <div
      className={`min-h-screen font-sans-clean transition-colors duration-700 ${
        isNight
          ? 'dark bg-[#0f0d13] text-slate-100'
          : 'bg-gradient-to-b from-rose-50/80 via-pink-50/50 to-rose-100/60 text-slate-800'
      } selection:bg-rose-400 selection:text-white relative overflow-x-hidden`}
    >
      {/* Background Floating Hearts */}
      <FloatingHearts isNight={isNight} />

      {/* Cursor Sparkles Trail */}
      <CursorSparkles />

      {/* Easter Egg Clickables & Floating Modals */}
      <EasterEggs herName={SITE_CONFIG.herName} />

      {/* Helper Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      {!isUnlocked ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Top Romantic Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Minimal Floating Corner Utilities (Night mode, audio & lock, with NO navigation menu) */}
          <div className="fixed top-4 right-4 z-40 flex items-center gap-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-200/60 dark:border-rose-900/60 shadow-lg">
            <button
              onClick={handleToggleMusic}
              className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
              title={isPlayingMusic ? 'Mute romantic audio' : 'Play romantic music'}
            >
              {isPlayingMusic ? (
                <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsNight(!isNight)}
              className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
              title={isNight ? 'Switch to daylight theme' : 'Switch to night mode'}
            >
              {isNight ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            <button
              onClick={handleLockApp}
              className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Lock with secret passcode"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Continuous Romantic Journey */}
          <main className="relative z-10 pt-4 sm:pt-6">
            {/* Welcome / Hero */}
            <HeroPage onEnterStory={() => scrollToSection('birthday')} />

            {/* Birthday Surprise Celebration & Candle Blow */}
            <BirthdayPage onNextSection={() => scrollToSection('birthday-cards')} />

            {/* 9 Special Pop Birthday Cards */}
            <SpecialBirthdayCardsPage />

            {/* Our Timeline */}
            <TimelinePage />

            {/* Our Moments / Visual Love Story & Videos */}
            <MemoriesPage />

            {/* Love Letters */}
            <LoveLettersPage />

            {/* 20 Reasons Why I Love You */}
            <ReasonsPage />

            {/* Future With You */}
            <FuturePage />

            {/* Secret Message */}
            <SecretMessagePage onNext={() => scrollToSection('final')} />

            {/* Final Surprise & Auto Fireworks */}
            <FinalSurprisePage onReplay={handleReplay} />

            {/* Footer */}
            <footer className="py-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2 border-t border-rose-200/40 dark:border-rose-950">
              <p className="flex items-center justify-center gap-1">
                <span>Crafted forever for</span>
                <strong className="text-rose-500">{SITE_CONFIG.herName}</strong>
                <span>by</span>
                <strong className="text-rose-500">Your's Favorite</strong>
                <span>❤️</span>
              </p>
              <p className="text-[11px] opacity-75">
                Every laugh, every tear, every memory — entirely ours.
              </p>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}
