import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, ArrowRight, Mic, Wind, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../data/siteConfig';
import { PHOTOS } from '../data/photos';

interface BirthdayPageProps {
  onNextSection: () => void;
}

export const BirthdayPage: React.FC<BirthdayPageProps> = ({ onNextSection }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [micActive, setMicActive] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setIsBlowing(true);

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);

      // Trigger massive celebration fireworks & confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#a855f7'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f43f5e', '#ec4899', '#fbcfe8'],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f43f5e', '#ec4899', '#fbcfe8'],
        });
      }, 350);
    }, 400);
  };

  // Optional microphone interaction for realistic blowing
  const startMicBlowing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicActive(true);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        if (!candlesLit) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // If audio volume spikes (user blowing into mic)
        if (average > 45) {
          handleBlowCandles();
          stream.getTracks().forEach((track) => track.stop());
          setMicActive(false);
          return;
        }
        requestAnimationFrame(checkAudio);
      };

      checkAudio();
    } catch (err) {
      console.log('Mic access not available, click fallback is active');
      setMicActive(false);
    }
  };

  const handleRelight = () => {
    setCandlesLit(true);
  };

  return (
    <section id="birthday" className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative z-10">
      <div className="max-w-3xl w-full mx-auto text-center space-y-8">
        {/* Subtitle pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold uppercase tracking-wider"
        >
          <Gift className="w-4 h-4 text-rose-500" />
          <span>Special Birthday Celebration</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white"
        >
          Happy Birthday, My Love 🎂❤️
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-36 h-44 sm:w-44 sm:h-52 mx-auto rounded-[1.75rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-rose-500/20 rotate-2"
        >
          <img src={PHOTOS.heartFilter} alt={SITE_CONFIG.herName} className="w-full h-full object-cover" />
        </motion.div>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          {candlesLit
            ? 'Make the biggest, most magical wish and blow out your candles... ✨'
            : 'Your wish has been sent to the universe ✨'}
        </p>

        {/* Animated 3-Tier Birthday Cake with Glowing Candles */}
        <div className="relative py-8 flex flex-col items-center justify-center select-none">
          {/* Glowing Aura */}
          <div
            className={`absolute w-72 h-72 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
              candlesLit ? 'bg-amber-400/25 opacity-100' : 'bg-rose-400/10 opacity-40'
            }`}
          />

          {/* Candles Container */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] relative z-20">
            {[1, 2, 3].map((candleIndex) => (
              <div key={candleIndex} className="relative flex flex-col items-center">
                {/* Flame */}
                {candlesLit && (
                  <div
                    className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white candle-flame absolute -top-7 left-1/2 -translate-x-1/2 cursor-pointer"
                    onClick={handleBlowCandles}
                    title="Click to blow out!"
                  />
                )}
                {/* Wick */}
                <div className="w-0.5 h-2 bg-slate-800 dark:bg-slate-300" />
                {/* Candle Stick */}
                <div className="w-3.5 h-12 rounded-t-md bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 border border-rose-300/40 shadow-md" />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-44 sm:w-52 h-14 rounded-2xl bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 dark:from-rose-900/90 dark:via-rose-800/80 dark:to-rose-900/90 border-2 border-rose-300 dark:border-rose-700 shadow-md relative z-10 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 flex justify-around">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-5 h-4 bg-white dark:bg-rose-950/90 rounded-b-full shadow-inner" />
              ))}
            </div>
            <span className="font-handwriting text-xl text-rose-500 dark:text-rose-200 font-bold relative z-10 pt-2">
              For {SITE_CONFIG.herName}
            </span>
          </div>

          {/* Cake Middle Tier */}
          <div className="w-56 sm:w-68 h-16 rounded-2xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 dark:from-rose-950 dark:via-rose-900 dark:to-rose-950 border-2 border-rose-300 dark:border-rose-700 shadow-lg relative -mt-2 flex items-center justify-center">
            {/* Strawberries / Hearts on middle tier */}
            <div className="flex gap-4 text-rose-500 dark:text-rose-400 text-sm">
              <span>🍓</span>
              <span>❤️</span>
              <span>🍓</span>
              <span>❤️</span>
              <span>🍓</span>
            </div>
          </div>

          {/* Cake Base Tier */}
          <div className="w-68 sm:w-80 h-16 rounded-2xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 dark:from-rose-900 dark:via-rose-800 dark:to-rose-900 border-2 border-rose-400 dark:border-rose-600 shadow-xl relative -mt-2 flex items-center justify-center">
            <span className="font-serif-title text-sm tracking-widest uppercase font-bold text-rose-700 dark:text-rose-200">
              Queen of My Heart
            </span>
          </div>

          {/* Cake Stand */}
          <div className="w-76 sm:w-92 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-2xl relative -mt-1" />
        </div>

        {/* Action Controls for Blowing */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {candlesLit ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandles}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 flex items-center gap-2 text-sm cursor-pointer"
              >
                <Wind className="w-4 h-4" />
                <span>Click to Blow Out Candles 💨</span>
              </motion.button>

              <button
                onClick={startMicBlowing}
                className={`px-4 py-3 rounded-full border text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  micActive
                    ? 'bg-emerald-500 text-white border-emerald-500 animate-pulse'
                    : 'bg-white/80 dark:bg-slate-800/80 border-rose-200 dark:border-rose-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50'
                }`}
              >
                <Mic className="w-4 h-4 text-rose-500" />
                <span>{micActive ? 'Blow into microphone now!' : 'Use Microphone to Blow'}</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleRelight}
              className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-1.5 shadow-sm hover:bg-rose-50 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Relight Candles 🕯️</span>
            </button>
          )}
        </div>

        {/* Revealed Heartfelt Birthday Message */}
        <AnimatePresence>
          {!candlesLit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-rose-200 dark:border-rose-800/80 shadow-2xl space-y-6 max-w-xl mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 mx-auto flex items-center justify-center text-rose-500">
                <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
              </div>

              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Happy Birthday to My World
              </h3>

              <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 dark:text-rose-300 leading-snug">
                "{SITE_CONFIG.mainBirthdayMessage}"
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                May all your biggest dreams, little wishes, and secret hopes come true this year. I am so lucky to be the one holding your hand through it all.
              </p>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNextSection}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-sm sm:text-base shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <span>There's More ❤️</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
