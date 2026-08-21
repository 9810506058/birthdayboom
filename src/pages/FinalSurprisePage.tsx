import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles, Stars, Send } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { PHOTOS } from '../data/photos';
import confetti from 'canvas-confetti';

interface FinalSurprisePageProps {
  onReplay: () => void;
}

export const FinalSurprisePage: React.FC<FinalSurprisePageProps> = ({ onReplay }) => {
  const [revealedIndex, setRevealedIndex] = useState(0);

  useEffect(() => {
    // Staggered reveal of tribute lines
    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < SITE_CONFIG.finalSurpriseLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  const handleCelebrate = () => {
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#c084fc'],
    });
  };

  return (
    <section
      id="final"
      className="min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center bg-slate-950 text-white rounded-3xl my-8 mx-2 sm:mx-6 border border-rose-900/60 shadow-2xl overflow-hidden"
    >
      {/* Cinematic Starfield Background Overlay */}
      <div className="absolute inset-0 bg-radial from-rose-950/40 via-slate-950/80 to-black pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Glowing badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold uppercase tracking-wider shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>The Grand Finale</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </motion.div>

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
        <div className="space-y-4 py-6 min-h-[300px] flex flex-col justify-center">
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

        {/* Big Birthday & Love Greeting */}
        {revealedIndex >= SITE_CONFIG.finalSurpriseLines.length && (
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
                onClick={handleCelebrate}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-sm sm:text-base shadow-xl shadow-rose-500/40 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Send Fireworks 🎆</span>
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
        )}
      </div>
    </section>
  );
};
