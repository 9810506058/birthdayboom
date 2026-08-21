import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Heart, Sparkles, Stars, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { PHOTOS } from '../data/photos';
import confetti from 'canvas-confetti';

interface SecretMessagePageProps {
  onNext: () => void;
}

export const SecretMessagePage: React.FC<SecretMessagePageProps> = ({ onNext }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#ffffff'],
    });
  };

  return (
    <section id="secret" className="min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Almost at the End...</span>
        </div>

        <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
          Wait... There's One More Thing 👀
        </h2>

        {!isUnlocked ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-rose-200 dark:border-rose-800 shadow-2xl space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-full overflow-hidden mx-auto shadow-xl shadow-rose-500/30 relative border-4 border-rose-200 dark:border-rose-800"
            >
              <img src={PHOTOS.polaroidD} alt="Us" className="w-full h-full object-cover" />
              <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-white dark:bg-slate-800 text-rose-500 shadow-md">
                <Lock className="w-4 h-4" />
              </div>
            </motion.div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans">
              I locked this secret thought away until you reached this very spot.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnlock}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-base shadow-lg shadow-rose-500/30 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock ❤️</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-500 via-pink-600 to-rose-700 text-white shadow-2xl border border-white/20 space-y-8 relative overflow-hidden"
          >
            {/* Background glowing particles */}
            <div className="absolute inset-0 bg-radial from-white/15 to-transparent pointer-events-none" />

            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center text-white backdrop-blur-sm">
              <Heart className="w-8 h-8 fill-white animate-pulse" />
            </div>

            <div className="space-y-4">
              <p className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed whitespace-pre-line">
                {SITE_CONFIG.secretFinalMessage}
              </p>
            </div>

            <div className="pt-4 border-t border-white/20">
              <span className="font-handwriting text-4xl sm:text-5xl block font-bold text-rose-100">
                I love you. ❤️
              </span>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-white text-rose-600 font-semibold text-sm shadow-xl flex items-center gap-2 mx-auto hover:bg-rose-50 cursor-pointer"
              >
                <span>Final Surprise ✨</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
