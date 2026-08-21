import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCw, Heart, Calendar, HelpCircle } from 'lucide-react';
import { FLIP_CARDS_DATA } from '../data/flipCardsData';

export const FlipCardsPage: React.FC = () => {
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});

  const handleCardClick = (id: string) => {
    setFlippedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flipAll = () => {
    const nextState: Record<string, boolean> = {};
    FLIP_CARDS_DATA.forEach((card) => {
      nextState[card.id] = true;
    });
    setFlippedMap(nextState);
  };

  return (
    <section id="flips" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive Cards</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Memory Flip Cards ✨
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Click each card to flip and unveil the memory hidden on the other side.
          </p>

          <button
            onClick={flipAll}
            className="text-xs text-rose-500 hover:underline flex items-center gap-1 mx-auto cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" /> Flip all cards
          </button>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLIP_CARDS_DATA.map((item, idx) => {
            const isFlipped = !!flippedMap[item.id];

            return (
              <div
                key={item.id}
                className="h-64 sm:h-72 perspective-1000 cursor-pointer select-none"
                onClick={() => handleCardClick(item.id)}
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 border border-rose-200/80 dark:border-rose-900/60 p-6 flex flex-col items-center justify-between shadow-xl shadow-rose-500/5 hover:border-rose-400 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                      {item.frontBadge}
                    </span>

                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-rose-500/10 dark:bg-rose-500/20 mx-auto flex items-center justify-center text-rose-500">
                        <Heart className="w-8 h-8 fill-rose-500/20 text-rose-500 animate-pulse" />
                      </div>
                      <h3 className="font-serif-title text-2xl font-bold text-slate-900 dark:text-white">
                        {item.frontTitle}
                      </h3>
                    </div>

                    <div className="text-xs text-rose-400 flex items-center gap-1">
                      <RotateCw className="w-3 h-3" />
                      <span>Click to flip memory</span>
                    </div>
                  </div>

                  {/* Back of Card (Flipped) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white p-6 flex flex-col justify-between shadow-2xl border border-white/20 text-center">
                    <div className="flex items-center justify-between text-xs text-rose-100 pb-2 border-b border-white/20">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.backDate}
                      </span>
                      <span>❤️</span>
                    </div>

                    <div className="space-y-2 py-2">
                      <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-sans">
                        {item.backMemory}
                      </p>
                      <p className="font-handwriting text-xl text-rose-100 pt-1">
                        {item.backQuote}
                      </p>
                    </div>

                    <div className="text-[11px] text-white/75 flex items-center justify-center gap-1 pt-1 border-t border-white/20">
                      <RotateCw className="w-3 h-3" />
                      <span>Click to flip back</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
