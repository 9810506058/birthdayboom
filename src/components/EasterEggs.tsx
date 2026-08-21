import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, AlertCircle, RefreshCw, X, MessageCircleHeart, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const NICE_THINGS = [
  "You make the whole room softer just by walking into it.",
  "Your laugh is my absolute favorite sound in the world.",
  "I am so endlessly proud of the person you are.",
  "Even on your messiest days, you are effortlessly breathtaking.",
  "Meeting you was the luckiest thing that will ever happen to me.",
  "You give the warmest, safest hugs in the universe.",
  "I love the way your mind works and how deeply you care.",
  "My day instantly gets 100x better the moment I see your text.",
  "You're not just my girlfriend, you are my favorite best friend.",
  "I'd choose you in every lifetime, without a single second thought."
];

export const EasterEggs: React.FC<{ herName: string }> = ({ herName }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showNiceModal, setShowNiceModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [niceMessage, setNiceMessage] = useState(NICE_THINGS[0]);
  const [moodStep, setMoodStep] = useState(0);

  const handleSecretHeartClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setShowSecretModal(true);
      setClickCount(0);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24']
      });
    }
  };

  const handleRandomNice = () => {
    const randomItem = NICE_THINGS[Math.floor(Math.random() * NICE_THINGS.length)];
    setNiceMessage(randomItem);
    setShowNiceModal(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fbcfe8']
    });
  };

  const handleMoodCheck = () => {
    setMoodStep(0);
    setShowMoodModal(true);
    setTimeout(() => setMoodStep(1), 800);
    setTimeout(() => setMoodStep(2), 1900);
  };

  return (
    <>
      {/* Floating Widget Bar on bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* Tiny Secret Easter Egg Clickable Heart */}
        <button
          id="secret-heart-easter-egg"
          onClick={handleSecretHeartClick}
          title={clickCount > 0 ? `${5 - clickCount} clicks to secret...` : "A tiny secret?"}
          className="w-8 h-8 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-rose-200/50 dark:border-rose-900/40 flex items-center justify-center text-rose-400 hover:text-rose-600 transition-transform active:scale-90 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${clickCount > 0 ? 'fill-rose-400 animate-bounce' : ''}`} />
        </button>

        {/* Tell me something nice button */}
        <motion.button
          id="btn-tell-me-something-nice"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRandomNice}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 border border-white/20 cursor-pointer"
        >
          <MessageCircleHeart className="w-4 h-4" />
          <span>Tell me something nice ✨</span>
        </motion.button>

        {/* How much do you love me button */}
        <motion.button
          id="btn-how-much-love"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMoodCheck}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-medium shadow-md border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-slate-800 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-rose-500" />
          <span>How much do you love me? 🥹</span>
        </motion.button>
      </div>

      {/* Secret Egg Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
            >
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 mx-auto flex items-center justify-center text-rose-500 mb-4 animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>

              <h3 className="font-serif-title text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Okay okay... you found the secret! 😂❤️
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                You were curious enough to tap that tiny heart 5 times! That curiosity is just one of the 10,000 things I adore about you. 
                <br /><br />
                <strong>Special Secret Fact:</strong> I still get butterflies every single time your name pops up on my phone screen.
              </p>

              <button
                onClick={() => setShowSecretModal(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                I knew it! 🥹❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tell Me Something Nice Modal */}
      <AnimatePresence>
        {showNiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
            >
              <button
                onClick={() => setShowNiceModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-950/60 mx-auto flex items-center justify-center text-pink-500 mb-4">
                <Heart className="w-7 h-7 fill-pink-500 animate-pulse" />
              </div>

              <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 dark:text-rose-400">
                A Little Reminder for {herName}
              </span>

              <p className="font-handwriting text-2xl sm:text-3xl text-slate-800 dark:text-rose-100 my-6 leading-snug px-2">
                "{niceMessage}"
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleRandomNice}
                  className="flex-1 py-2.5 rounded-xl border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Another one
                </button>
                <button
                  onClick={() => setShowNiceModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium shadow cursor-pointer"
                >
                  Love you too ❤️
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mood Check: "How much do you love me?" Modal */}
      <AnimatePresence>
        {showMoodModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
            >
              <button
                onClick={() => setShowMoodModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {moodStep === 0 && (
                <div className="py-8 space-y-4">
                  <RefreshCw className="w-10 h-10 text-rose-500 animate-spin mx-auto" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    Calculating love capacity in Petabytes... ⏳
                  </p>
                </div>
              )}

              {moodStep === 1 && (
                <div className="py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center animate-pulse">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold">
                    Warning: Memory overflow detected! System heating up 🔥
                  </p>
                </div>
              )}

              {moodStep === 2 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4 py-2"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold">
                    SYSTEM EXCEPTION 404
                  </div>

                  <h4 className="font-serif-title text-2xl font-bold text-slate-900 dark:text-white">
                    Error 404: Love Not Quantifiable 📈❤️
                  </h4>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    There isn't enough server storage, cloud servers, or numbers in the universe to calculate how much I love you. It is strictly infinite.
                  </p>

                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200/60 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 font-mono">
                    love_level: ∞ + 100000000%
                  </div>

                  <button
                    onClick={() => setShowMoodModal(false)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Accept Infinite Love ❤️
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
