import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, X, ChevronRight, ChevronLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPECIAL_BIRTHDAY_CARDS, BirthdayCard } from '../data/birthdayCardsData';
import { SITE_CONFIG } from '../data/siteConfig';

export const SpecialBirthdayCardsPage: React.FC = () => {
  const [openedCards, setOpenedCards] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('opened_birthday_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeModalCard, setActiveModalCard] = useState<BirthdayCard | null>(null);

  const handleCardClick = (card: BirthdayCard) => {
    // Pop confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#c084fc'],
    });

    if (!openedCards.includes(card.id)) {
      const updated = [...openedCards, card.id];
      setOpenedCards(updated);
      localStorage.setItem('opened_birthday_cards', JSON.stringify(updated));

      // Extra celebration if all 9 unlocked
      if (updated.length === 9) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#ff007f', '#ffdf00', '#00f0ff', '#ff4d6d'],
          });
        }, 500);
      }
    }

    setActiveModalCard(card);
  };

  const handleResetCards = () => {
    setOpenedCards([]);
    localStorage.removeItem('opened_birthday_cards');
  };

  const handleNextCard = () => {
    if (!activeModalCard) return;
    const nextIdx = (activeModalCard.id % SPECIAL_BIRTHDAY_CARDS.length);
    const nextCard = SPECIAL_BIRTHDAY_CARDS[nextIdx];
    handleCardClick(nextCard);
  };

  const handlePrevCard = () => {
    if (!activeModalCard) return;
    const prevIdx = (activeModalCard.id - 2 + SPECIAL_BIRTHDAY_CARDS.length) % SPECIAL_BIRTHDAY_CARDS.length;
    const prevCard = SPECIAL_BIRTHDAY_CARDS[prevIdx];
    handleCardClick(prevCard);
  };

  return (
    <section id="birthday-cards" className="py-6 px-2 sm:px-5 relative z-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}

        {/* 9 Interactive Cards Grid (3x3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIAL_BIRTHDAY_CARDS.map((card, idx) => {
            const isOpened = openedCards.includes(card.id);

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(card)}
                className={`relative rounded-3xl p-6 cursor-pointer border transition-all duration-300 select-none flex flex-col justify-between min-h-[220px] shadow-lg group overflow-hidden ${
                  isOpened
                    ? 'bg-white/95 dark:bg-slate-900/95 border-rose-300 dark:border-rose-800 shadow-rose-500/10'
                    : 'bg-gradient-to-br from-rose-50 via-white to-pink-100/70 dark:from-slate-900 dark:via-slate-800 dark:to-rose-950/40 border-rose-200/80 dark:border-rose-900/50 hover:border-rose-400 dark:hover:border-rose-700 shadow-rose-500/5'
                }`}
              >
                {/* Decorative Ribbon & Bow Effect for Unopened Cards */}
                {!isOpened && (
                  <>
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-0 right-8 w-6 h-full bg-rose-200/20 dark:bg-rose-500/10 pointer-events-none" />
                  </>
                )}

                {/* Top Row: Badge & Status */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {card.cardNumber}
                  </span>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 transition-colors ${
                      isOpened
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 group-hover:bg-rose-500 group-hover:text-white'
                    }`}
                  >
                    {isOpened ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-rose-500" />
                        <span>Read</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>Tap to Pop!</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Card Center Content */}
                <div className="space-y-2 py-4 relative z-10 text-center">
                  <div className="text-4xl filter drop-shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-serif-title text-xl font-bold text-slate-900 dark:text-white">
                    {card.envelopeTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans line-clamp-2">
                    {isOpened ? card.sweetMessage : card.teaser}
                  </p>
                </div>

                {/* Bottom CTA bar */}
                <div className="pt-2 border-t border-rose-100 dark:border-rose-900/40 flex items-center justify-between text-xs text-rose-500 dark:text-rose-400 relative z-10 font-medium">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>For {SITE_CONFIG.herName}</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {isOpened ? 'Read again →' : 'Pop open 🎁'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All 9 Unlocked Special Banner */}
      
      </div>

      {/* Pop-Up Modal Card View */}
      <AnimatePresence>
        {activeModalCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3 bg-black/70 backdrop-blur-md overflow-hidden"
            onClick={() => setActiveModalCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              className="relative w-full max-w-lg max-h-[92vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border-2 border-rose-300 dark:border-rose-700/80 p-5 sm:p-7 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient glow */}
              <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />

              {/* Close button */}
              <button
                onClick={() => setActiveModalCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-rose-100 dark:hover:bg-rose-950 transition-colors cursor-pointer z-10"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header inside modal */}
              <div className="flex items-center gap-3 mb-4 shrink-0 pr-8">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white font-bold text-sm flex items-center justify-center shadow-lg shrink-0">
                  {activeModalCard.cardNumber}
                </span>
                <div>
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-wider">
                    Birthday Surprise Card
                  </div>
                  <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {activeModalCard.envelopeTitle}
                  </h3>
                </div>
              </div>

              {/* Card Body - Sweet Message (Scrollable if necessary on small screens) */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 space-y-4 my-2 text-center relative custom-scroll">
                <div className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                  {activeModalCard.icon}
                </div>

                <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 dark:text-rose-300 leading-snug">
                  "{activeModalCard.sweetMessage}"
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans italic pt-2 border-t border-rose-200/50 dark:border-rose-900/40">
                  {activeModalCard.subNote}
                </p>
              </div>

              {/* Navigation Arrows for Browsing All 9 */}
              <div className="flex items-center justify-between pt-4 mt-1 border-t border-slate-100 dark:border-slate-800 shrink-0">
                <button
                  onClick={handlePrevCard}
                  className="px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <span>{activeModalCard.id}</span>
                  <span>/</span>
                  <span>9</span>
                </div>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-medium flex items-center gap-1 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
