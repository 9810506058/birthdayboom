import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, CheckCircle2, Lock, Eye, Trophy } from 'lucide-react';
import { REASONS_DATA } from '../data/reasonsData';
import confetti from 'canvas-confetti';

export const ReasonsPage: React.FC = () => {
  const [unlockedIds, setUnlockedIds] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const discoveredCount = Object.keys(unlockedIds).length;
  const totalCount = REASONS_DATA.length;
  const progressPercent = Math.round((discoveredCount / totalCount) * 100);

  const handleCardClick = (id: number) => {
    if (!unlockedIds[id]) {
      const updated = { ...unlockedIds, [id]: true };
      setUnlockedIds(updated);

      if (Object.keys(updated).length === totalCount) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899'],
        });
      }
    }
  };

  const unlockAll = () => {
    const all: Record<number, boolean> = {};
    REASONS_DATA.forEach((r) => {
      all[r.id] = true;
    });
    setUnlockedIds(all);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  return (
    <section id="reasons" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Countless Reasons</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Reasons Why I Love You ❤️
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Tap each numbered tile to reveal a piece of why my heart chose you.
          </p>

          {/* Progress Box */}
          <div className="max-w-md mx-auto p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-rose-200 dark:border-rose-900/40 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1.5 text-rose-500">
                <Sparkles className="w-4 h-4" />
                {discoveredCount} / {totalCount} reasons discovered
              </span>
              <span>{progressPercent}%</span>
            </div>

            <div className="h-2.5 w-full bg-rose-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {discoveredCount < totalCount && (
              <button
                onClick={unlockAll}
                className="text-[11px] text-rose-500 hover:underline pt-1 cursor-pointer"
              >
                Reveal all 20 reasons at once ✨
              </button>
            )}
            {discoveredCount === totalCount && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> All 20 reasons unlocked! And there are millions more.
              </p>
            )}
          </div>
        </div>

        {/* 20 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {REASONS_DATA.map((reason) => {
            const isUnlocked = !!unlockedIds[reason.id];

            return (
              <motion.div
                key={reason.id}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(reason.id)}
                className={`rounded-3xl p-6 border transition-all duration-300 cursor-pointer min-h-[190px] flex flex-col justify-between select-none relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-white/95 dark:bg-slate-900/95 border-rose-200 dark:border-rose-800 shadow-lg shadow-rose-500/5'
                    : 'bg-rose-50/70 dark:bg-slate-800/50 border-dashed border-rose-300 dark:border-slate-700 hover:border-rose-400'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                    #{reason.number}
                  </span>

                  {isUnlocked ? (
                    <span className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                      {reason.tag}
                    </span>
                  ) : (
                    <span className="text-xs text-rose-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Tap to reveal
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="py-2">
                  {isUnlocked ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-2"
                    >
                      <h4 className="font-serif-title font-bold text-lg text-slate-900 dark:text-white leading-snug">
                        {reason.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                        {reason.description}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="text-center py-4 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-slate-700 mx-auto flex items-center justify-center text-rose-400">
                        <Heart className="w-5 h-5 fill-rose-200 dark:fill-slate-600" />
                      </div>
                      <span className="font-serif-title text-sm text-slate-400 font-semibold block">
                        Reason #{reason.number}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom marker */}
                <div className="pt-2 border-t border-rose-100 dark:border-rose-900/30 flex justify-end">
                  {isUnlocked ? (
                    <span className="text-[11px] text-rose-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" /> Discovered
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Click to open
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
