import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Stars, Music2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { PHOTOS } from '../data/photos';

interface HeroPageProps {
  onEnterStory: () => void;
}

export const HeroPage: React.FC<HeroPageProps> = ({ onEnterStory }) => {
  return (
    <section
      id="welcome"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Glowing Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold shadow-md shadow-rose-500/10"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>For the girl who has my whole heart</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </motion.div>

        {/* Main Big Headline */}
        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {SITE_CONFIG.heroHeadline}
        </h1>

        {/* Subtitle */}
        <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-rose-600 dark:text-rose-300 max-w-2xl mx-auto leading-relaxed">
          "{SITE_CONFIG.heroSubheadline}"
        </p>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
          I wanted to create a place that captures all our laughs, late-night talks, silly photos, and sweet moments in one timeless sanctuary.
        </p>

        <div className="flex items-end justify-center gap-3 sm:gap-5 pt-2">
          {[
            { src: PHOTOS.polaroidA, rotate: '-8deg', delay: 0.35 },
            { src: PHOTOS.firstMeet, rotate: '2deg', delay: 0.45 },
            { src: PHOTOS.heartFilter, rotate: '7deg', delay: 0.55 },
          ].map((shot) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shot.delay, duration: 0.6 }}
              className="w-24 h-32 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl shadow-rose-500/20"
              style={{ transform: `rotate(${shot.rotate})` }}
            >
              <img src={shot.src} alt="Us" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            id="enter-story-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnterStory}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-base sm:text-lg shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 flex items-center gap-3 transition-all cursor-pointer border border-white/20"
          >
            <span>Enter Our Story</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Romantic Decorative Stats / Pill */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-rose-100 dark:border-rose-900/40">
            <Stars className="w-4 h-4 text-amber-400" />
            <span>Dedicated to {SITE_CONFIG.herName}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-rose-100 dark:border-rose-900/40">
            <Music2 className="w-4 h-4 text-rose-400" />
            <span>Includes Audio & Memories</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
