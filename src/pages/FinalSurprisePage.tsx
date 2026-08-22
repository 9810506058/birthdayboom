import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles, Stars, Send, Flame, Play, Pause } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { PHOTOS } from '../data/photos';
import confetti from 'canvas-confetti';

interface FinalSurprisePageProps {
  onReplay: () => void;
}

export const FinalSurprisePage: React.FC<FinalSurprisePageProps> = ({ onReplay }) => {
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [autoFireworks, setAutoFireworks] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastHoverTime = useRef<number>(0);

  // Staggered reveal of tribute lines
  useEffect(() => {
    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < SITE_CONFIG.finalSurpriseLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Launch a multi-colored fireworks explosion
  const launchFirework = useCallback((x = Math.random() * 0.8 + 0.1, y = Math.random() * 0.5 + 0.2) => {
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#c084fc', '#38bdf8', '#fbbf24'];

    confetti({
      particleCount: 80,
      angle: 60 + Math.random() * 60,
      spread: 70,
      origin: { x, y },
      colors,
      disableForReducedMotion: false,
    });
  }, []);

  // Grand cannon celebration burst
  const handleGrandCelebration = useCallback(() => {
    // Left Cannon
    confetti({
      particleCount: 120,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#c084fc'],
    });
    // Right Cannon
    confetti({
      particleCount: 120,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#c084fc'],
    });
    // Center Starburst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff007f', '#ffe600', '#00f0ff', '#ff3366'],
      });
    }, 250);
  }, []);

  // Auto Fireworks loop when section is in view & active
  useEffect(() => {
    let interval: any = null;

    if (autoFireworks) {
      interval = setInterval(() => {
        // Random fireworks burst in the sky
        const randomX = Math.random() * 0.8 + 0.1;
        const randomY = Math.random() * 0.45 + 0.15;
        launchFirework(randomX, randomY);
      }, 1600);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoFireworks, launchFirework]);

  // Scroll detection: auto launch when she scrolls to this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAutoFireworks(true);
            handleGrandCelebration();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleGrandCelebration]);

  // Hover detection: moving cursor triggers trailing sparkles and fireworks
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const now = Date.now();
    // Throttle hover fireworks to once every 350ms
    if (now - lastHoverTime.current > 350) {
      lastHoverTime.current = now;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y: Math.max(0.1, y) },
        colors: ['#f43f5e', '#fb7185', '#fde047', '#a855f7'],
      });
    }
  };

  return (
    <section
      id="final"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={() => {
        if (!autoFireworks) setAutoFireworks(true);
      }}
      className="min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center bg-slate-950 text-white rounded-3xl my-8 mx-2 sm:mx-6 border border-rose-900/60 shadow-2xl overflow-hidden cursor-crosshair select-none"
    >
      {/* Cinematic Starfield Background Overlay */}
      <div className="absolute inset-0 bg-radial from-rose-950/50 via-slate-950/80 to-black pointer-events-none" />

      {/* Floating ambient glow orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Glowing badge with Auto Fireworks status */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold uppercase tracking-wider shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The Grand Finale</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </motion.div>

          <button
            onClick={() => setAutoFireworks(!autoFireworks)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              autoFireworks
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-white/10 text-slate-400 border-white/10'
            }`}
            title="Toggle Continuous Fireworks"
          >
            <Flame className={`w-3.5 h-3.5 ${autoFireworks ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
            <span>{autoFireworks ? 'Auto Fireworks: ON ✨' : 'Auto Fireworks: OFF'}</span>
          </button>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight"
        >
          To My Favorite Person ❤️
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          {[PHOTOS.firstMeet, PHOTOS.roadTripNap, PHOTOS.polaroidB].map((src) => (
            <div
              key={src}
              className="w-20 h-24 sm:w-28 sm:h-36 rounded-2xl overflow-hidden border-2 border-rose-300/40 shadow-lg shadow-rose-900/40"
            >
              <img src={src} alt="Us" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>

        {/* Line by line staggered animated lines */}
        <div className="space-y-4 py-6 min-h-[260px] flex flex-col justify-center">
          {SITE_CONFIG.finalSurpriseLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{
                opacity: idx <= revealedIndex ? 1 : 0,
                y: idx <= revealedIndex ? 0 : 15,
                scale: idx <= revealedIndex ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`leading-relaxed font-sans ${
                idx === SITE_CONFIG.finalSurpriseLines.length - 1
                  ? 'font-serif-title text-2xl sm:text-4xl font-bold text-rose-400 pt-4'
                  : 'text-base sm:text-xl text-slate-300'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Tip: Auto fireworks on hover notice */}
        <p className="text-[12px] text-rose-300/70 italic flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Move your cursor or touch anywhere to launch instant fireworks! 🎆</span>
        </p>

        {/* Big Birthday & Love Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 pt-4 border-t border-rose-900/60"
        >
          <h3 className="font-handwriting text-4xl sm:text-6xl text-rose-400 font-bold">
            Happy Birthday, My Love ❤️
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGrandCelebration}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-sm sm:text-base shadow-xl shadow-rose-500/40 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Launch Mega Fireworks 🎆</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReplay}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 flex items-center gap-2 backdrop-blur-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Our Story ↻</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
