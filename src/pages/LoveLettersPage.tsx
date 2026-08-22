import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Heart, Sparkles, X, Feather, ChevronLeft, ChevronRight } from 'lucide-react';
import { LOVE_LETTERS_DATA } from '../data/lettersData';
import { LoveLetter } from '../types';
import confetti from 'canvas-confetti';

export const LoveLettersPage: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);

  const handleOpenLetter = (letter: LoveLetter) => {
    setSelectedLetter(letter);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbcfe8'],
    });
  };

  const handleNextLetter = () => {
    if (!selectedLetter) return;
    const currentIndex = LOVE_LETTERS_DATA.findIndex((l) => l.id === selectedLetter.id);
    const nextIndex = (currentIndex + 1) % LOVE_LETTERS_DATA.length;
    setSelectedLetter(LOVE_LETTERS_DATA[nextIndex]);
  };

  const handlePrevLetter = () => {
    if (!selectedLetter) return;
    const currentIndex = LOVE_LETTERS_DATA.findIndex((l) => l.id === selectedLetter.id);
    const prevIndex = (currentIndex - 1 + LOVE_LETTERS_DATA.length) % LOVE_LETTERS_DATA.length;
    setSelectedLetter(LOVE_LETTERS_DATA[prevIndex]);
  };

  return (
    <section id="letters" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Digital Envelopes</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Letters I Never Get Tired of Writing ❤️
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Choose an envelope based on whatever your heart needs right now. Every word is handwritten from my soul to yours.
          </p>
        </div>

        {/* Envelope Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LOVE_LETTERS_DATA.map((letter, idx) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleOpenLetter(letter)}
              className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-rose-200 dark:border-rose-800 shadow-xl shadow-rose-500/5 hover:shadow-rose-500/20 cursor-pointer relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Envelope flap aesthetic top */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 opacity-80" />

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>

                <h3 className="font-serif-title text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {letter.envelopeTitle}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-sans line-clamp-2">
                  {letter.previewSnippet}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-rose-100 dark:border-rose-900/40 flex items-center justify-between text-xs text-rose-500 font-medium">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <span>Open letter</span>
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{letter.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Letter Reading Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="bg-[#fffdf7] dark:bg-[#1c1822] max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] rounded-3xl shadow-2xl border-2 border-rose-300 dark:border-rose-800/80 relative text-slate-900 dark:text-rose-50 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pinned Letter Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-rose-200/80 dark:border-rose-900/60 bg-[#fffdf7]/95 dark:bg-[#1c1822]/95 backdrop-blur-sm shrink-0 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-500">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif-title text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {selectedLetter.envelopeTitle}
                    </h4>
                    <span className="text-[11px] font-mono text-rose-500 dark:text-rose-400">
                      {selectedLetter.date}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="p-2 rounded-full bg-rose-100/70 dark:bg-rose-900/50 text-slate-700 dark:text-slate-200 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors cursor-pointer"
                  title="Close Letter"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Letter Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 paper-lines custom-scroll">
                {/* Salutation */}
                <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-600 dark:text-rose-300 font-bold">
                  {selectedLetter.salutation}
                </h3>

                {/* Letter Body Paragraphs */}
                <div className="space-y-4 font-note text-2xl sm:text-3xl text-slate-800 dark:text-rose-100 leading-relaxed">
                  {selectedLetter.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Closing & Signature */}
                <div className="pt-6 border-t border-rose-200/80 dark:border-rose-900/40 text-right space-y-1">
                  <p className="font-handwriting text-2xl text-slate-600 dark:text-slate-300">
                    {selectedLetter.closing}
                  </p>
                  <p className="font-handwriting text-3xl sm:text-4xl font-bold text-rose-600 dark:text-rose-300">
                    {selectedLetter.signature}
                  </p>
                </div>

                {/* Postscript if any */}
                {selectedLetter.postscript && (
                  <div className="pt-4 text-left font-note text-xl sm:text-2xl text-rose-600 dark:text-rose-400 italic bg-rose-50/60 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200/60 dark:border-rose-900/40">
                    {selectedLetter.postscript}
                  </div>
                )}
              </div>

              {/* Bottom Sticky Letter Navigation Bar */}
              <div className="p-3 sm:p-4 border-t border-rose-200/80 dark:border-rose-900/60 bg-[#fffdf7]/95 dark:bg-[#1c1822]/95 backdrop-blur-sm flex items-center justify-between shrink-0 text-xs">
                <button
                  onClick={handlePrevLetter}
                  className="px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 hover:bg-rose-200 dark:hover:bg-rose-900 text-slate-700 dark:text-slate-200 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Letter</span>
                </button>

                <div className="flex items-center gap-1 text-rose-500 font-medium text-[11px] sm:text-xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>From My Heart</span>
                </div>

                <button
                  onClick={handleNextLetter}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium flex items-center gap-1 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Next Letter</span>
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
