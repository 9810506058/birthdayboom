import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from './data/siteConfig';

// Components
import { FloatingHearts } from './components/FloatingHearts';
import { CursorSparkles } from './components/CursorSparkles';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { EasterEggs } from './components/EasterEggs';
import { InstructionsModal } from './components/InstructionsModal';

// Pages / Sections
import { LoginPage } from './pages/LoginPage';
import { HeroPage } from './pages/HeroPage';
import { BirthdayPage } from './pages/BirthdayPage';
import { TimelinePage } from './pages/TimelinePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { LoveLettersPage } from './pages/LoveLettersPage';
import { ReasonsPage } from './pages/ReasonsPage';
import { CoupleQuizPage } from './pages/CoupleQuizPage';
import { FlipCardsPage } from './pages/FlipCardsPage';
import { OurSongPage } from './pages/OurSongPage';
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

  const [activeSection, setActiveSection] = useState<string>('welcome');
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

  // Observer to update active section on scroll
  useEffect(() => {
    if (!isUnlocked) return;

    const sections = [
      'welcome',
      'birthday',
      'timeline',
      'gallery',
      'funny',
      'letters',
      'reasons',
      'game',
      'flips',
      'music',
      'future',
      'secret',
      'final',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked]);

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

      {/* Boyfriend Customization Helper Modal */}
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

          {/* Navigation Bar */}
          <Navbar
            herName={SITE_CONFIG.herName}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            isNight={isNight}
            onToggleNight={() => setIsNight(!isNight)}
            onOpenInstructions={() => setShowInstructions(true)}
            onLockApp={handleLockApp}
          />

          {/* Main Continuous Romantic Journey */}
          <main className="relative z-10 pt-16 sm:pt-20">
            {/* Page 2: Welcome / Hero */}
            <HeroPage onEnterStory={() => scrollToSection('birthday')} />

            {/* Page 3: Birthday Surprise */}
            <BirthdayPage onNextSection={() => scrollToSection('timeline')} />

            {/* Page 4: Our Timeline */}
            <TimelinePage />

            {/* Page 5: Our Moments / Gallery */}
            <MemoriesPage />
            {/* Page 7: Love Letters */}
            <LoveLettersPage />

            {/* Page 8: 20 Reasons Why I Love You */}
            <ReasonsPage />

            {/* Page 9: "This or That" Couple Quiz */}
            <CoupleQuizPage />

            {/* Page 10: Memory Flip Cards */}
            <FlipCardsPage />

            {/* Page 11: Our Song */}
            <OurSongPage />

            {/* Page 12: Future With You */}
            <FuturePage />

            {/* Page 13: Secret Message */}
            <SecretMessagePage onNext={() => scrollToSection('final')} />

            {/* Page 14: Final Surprise */}
            <FinalSurprisePage onReplay={handleReplay} />

            {/* Footer */}
            <footer className="py-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2 border-t border-rose-200/40 dark:border-rose-950">
              <p className="flex items-center justify-center gap-1">
                <span>Crafted forever for</span>
                <strong className="text-rose-500">{SITE_CONFIG.herName}</strong>
                <span>by</span>
                <strong className="text-rose-500">{SITE_CONFIG.myName}</strong>
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
