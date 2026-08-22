import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Calendar, Sparkles, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../data/siteConfig';
import { PHOTOS } from '../data/photos';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const PLAYFUL_ERROR_MESSAGES = [
  "Really? 😭 Try again, my love...",
  "That's not our special date 👀",
  "Girl... you forgot already? 😂❤️",
  "Hmm... check your calendar! Not that one 💕",
  "Close... maybe? But nope! Try once more 🥹",
  "Are you guessing? 😂 Think back to our favorite moment!"
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      setErrorMessage('Please pick our special date first 💕');
      return;
    }

    // Compare with SITE_CONFIG.specialDate
    if (selectedDate === SITE_CONFIG.specialDate) {
      setIsSuccess(true);
      setErrorMessage('');
      localStorage.setItem('our_love_story_unlocked', 'true');

      // Trigger grand celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#fed7aa'],
      });

      setTimeout(() => {
        onLoginSuccess();
      }, 2200);
    } else {
      setErrorCount((prev) => prev + 1);
      const randomMsg =
        PLAYFUL_ERROR_MESSAGES[errorCount % PLAYFUL_ERROR_MESSAGES.length];
      setErrorMessage(randomMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-7 sm:p-10 border border-rose-200/70 dark:border-rose-900/50 shadow-2xl shadow-rose-500/10 text-center relative overflow-hidden"
      >
        {/* Top ambient badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Private Digital World</span>
        </div>

        {/* Polaroid of us */}
        <div className="relative w-28 h-36 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg shadow-rose-500/25 rotate-[-3deg]">
          <img src={PHOTOS.firstMeet} alt="Us" className="w-full h-full object-cover" />
          <div className="absolute bottom-1.5 right-1.5 p-1.5 rounded-full bg-rose-500 text-white shadow-md">
            <Heart className="w-3.5 h-3.5 fill-white" />
          </div>
        </div>

        <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Hey You ❤️
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans leading-relaxed mb-6">
          I made something special for you...
        </p>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 space-y-3"
          >
            <span className="text-4xl">🥹❤️✨</span>
            <h3 className="font-serif-title text-2xl font-bold text-rose-600 dark:text-rose-400">
              I knew you'd remember!
            </h3>
            <p className="text-slate-500 dark:text-slate-300 text-sm">
              Unlocking our world of memories...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left space-y-1.5">
              <label
                htmlFor="special-date-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                <span>Enter the date that means the most to us 💕</span>
              </label>

              <div className="relative">
  <input
    id="special-date-input"
    type="text"
    inputMode="numeric"
    placeholder="YYYY/MM/DD"
    value={selectedDate}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, '');

      let formatted = value;

      if (value.length > 4) {
        formatted = value.slice(0, 4) + '/' + value.slice(4);
      }

      if (value.length > 6) {
        formatted =
          value.slice(0, 4) +
          '/' +
          value.slice(4, 6) +
          '/' +
          value.slice(6, 8);
      }

      setSelectedDate(formatted);
      setErrorMessage('');
    }}
    maxLength={10}
    className="w-full px-4 py-3.5 rounded-2xl bg-rose-50/60 dark:bg-slate-800/80 border border-rose-200 dark:border-rose-800/80 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
  />
</div>
            </div>

            {/* Error feedback banner */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-rose-100/90 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium text-left"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <span>Unlock Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Hint toggler */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-rose-500 dark:text-rose-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide hint' : 'Need a little hint?'}</span>
              </button>

              {showHint && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-slate-500 dark:text-slate-400 mt-2 bg-rose-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/30"
                >
                  {SITE_CONFIG.specialDateHint}
                </motion.p>
              )}
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
