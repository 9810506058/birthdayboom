import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Heart, Sparkles, X, Feather } from 'lucide-react';
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotate: 2 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#fffbf0] dark:bg-[#1e1a24] max-w-2xl w-full rounded-3xl p-6 sm:p-12 shadow-2xl border border-rose-300/60 dark:border-rose-800/80 relative text-slate-900 dark:text-rose-50 paper-lines my-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-rose-200/50 dark:bg-rose-900/50 text-slate-700 dark:text-slate-200 hover:bg-rose-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/60 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider">
                  <Feather className="w-4 h-4" />
                  <span>{selectedLetter.date}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
              </div>

              {/* Salutation */}
              <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-600 dark:text-rose-300 mb-6 font-bold">
                {selectedLetter.salutation}
              </h3>

              {/* Letter Body Paragraphs */}
              <div className="space-y-4 font-note text-2xl sm:text-3xl text-slate-800 dark:text-rose-100 leading-relaxed">
                {selectedLetter.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Closing & Signature */}
              <div className="mt-8 pt-6 border-t border-rose-200 dark:border-rose-900/40 text-right space-y-1">
                <p className="font-handwriting text-2xl text-slate-600 dark:text-slate-300">
                  {selectedLetter.closing}
                </p>
                <p className="font-handwriting text-3xl font-bold text-rose-600 dark:text-rose-300">
                  {selectedLetter.signature}
                </p>
              </div>

              {/* Postscript if any */}
              {selectedLetter.postscript && (
                <div className="mt-6 pt-4 text-left font-note text-xl text-rose-600 dark:text-rose-400 italic">
                  {selectedLetter.postscript}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
