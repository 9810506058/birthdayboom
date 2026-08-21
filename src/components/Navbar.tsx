import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Music,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  Image,
  Laugh,
  Mail,
  Gamepad2,
  ListCheck,
  Lock
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface NavbarProps {
  herName: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isNight: boolean;
  onToggleNight: () => void;
  onOpenInstructions: () => void;
  onLockApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  herName,
  activeSection,
  onNavigate,
  isNight,
  onToggleNight,
  onOpenInstructions,
  onLockApp,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  const navItems = [
    { id: 'welcome', label: 'Home', icon: Heart },
    { id: 'birthday', label: 'Birthday 🎂', icon: Sparkles },
    { id: 'timeline', label: 'Our Story', icon: Clock },
    { id: 'gallery', label: 'Memories', icon: Image },
    { id: 'funny', label: 'Funny Us', icon: Laugh },
    { id: 'letters', label: 'Letters', icon: Mail },
    { id: 'reasons', label: '20 Reasons', icon: Heart },
    { id: 'game', label: 'Couple Game', icon: Gamepad2 },
    { id: 'flips', label: 'Flip Cards', icon: Sparkles },
    { id: 'music', label: 'Our Song', icon: Music },
    { id: 'future', label: 'Future', icon: ListCheck },
    { id: 'secret', label: 'Secret', icon: Lock },
    { id: 'final', label: 'For You ❤️', icon: Heart },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 px-3 sm:px-6 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-5 py-2.5 rounded-full bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-rose-200/60 dark:border-rose-900/50 shadow-lg shadow-rose-500/10 max-w-5xl w-full">
          {/* Logo / Couple Name */}
          <button
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2 text-rose-500 dark:text-rose-400 font-serif-title font-bold text-base sm:text-lg hover:opacity-85 transition-opacity cursor-pointer shrink-0"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 animate-pulse" />
            <span className="truncate max-w-[120px] sm:max-w-none">For {herName} ❤️</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 no-scrollbar text-xs font-medium">
            {navItems.slice(0, 8).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-rose-500 text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls: Music, Day/Night, Customizer, Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Music Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => romanticAudio.toggle()}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20 animate-pulse'
                  : 'bg-rose-50 dark:bg-slate-800 border-rose-200 dark:border-rose-800 text-slate-700 dark:text-slate-300'
              }`}
              title={isPlaying ? 'Pause Background Melody' : 'Play Romantic Melody'}
            >
              {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Music ON' : 'Music OFF'}</span>
            </motion.button>

            {/* Day / Night Mode Toggle */}
            <button
              onClick={onToggleNight}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isNight ? 'Switch to Day with you ☀️' : 'Switch to Night with you 🌙'}
            >
              {isNight ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-rose-500" />}
            </button>

            {/* Customization guide helper */}
            <button
              onClick={onOpenInstructions}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="How to personalize & deploy"
            >
              <BookOpen className="w-4 h-4 text-rose-400" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-rose-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-3 top-20 z-50 p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-rose-200 dark:border-rose-800 shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-rose-800 mb-4">
              <span className="font-serif-title font-bold text-slate-900 dark:text-white">
                Chapters of Us 💕
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center gap-2 p-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                        : 'bg-rose-50/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:bg-rose-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-rose-100 dark:border-rose-800 flex justify-between items-center text-xs text-slate-500">
              <button
                onClick={onLockApp}
                className="text-rose-500 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" /> Re-lock with Secret Date
              </button>

              <button
                onClick={onOpenInstructions}
                className="text-slate-600 dark:text-slate-300 hover:underline cursor-pointer"
              >
                Customizer Guide
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
