import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Sparkles, Check, X, RotateCcw, Trophy, Heart } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import confetti from 'canvas-confetti';

export const CoupleQuizPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectChoice = (choice: 'A' | 'B') => {
    if (showExplanation) return;
    setSelectedChoice(choice);
    setShowExplanation(true);

    const isCorrect = choice === currentQ.correctChoice;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f43f5e', '#fb7185'],
      });
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choice,
    }));
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedChoice(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setSelectedChoice(null);
    setShowExplanation(false);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <section id="game" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Interactive Couple Quiz</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            How Well Do You Know Us? 👀
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans">
            Answer honestly! Let's see who remembers all our chaotic lore.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-rose-200 dark:border-rose-800 shadow-2xl relative overflow-hidden">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Question Progress & Score */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 pb-3 border-b border-rose-100 dark:border-rose-900/40">
                <span>
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-rose-500">Score: {score} pts 🏆</span>
              </div>

              {/* Question Title */}
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center py-2">
                {currentQ.question}
              </h3>

              {/* Choices */}
              <div className="space-y-3.5 pt-2">
                {(['A', 'B'] as const).map((choiceKey) => {
                  const choiceText = choiceKey === 'A' ? currentQ.choiceA : currentQ.choiceB;
                  const isSelected = selectedChoice === choiceKey;
                  const isCorrect = currentQ.correctChoice === choiceKey;

                  let buttonStyles =
                    'bg-rose-50/70 dark:bg-slate-800/70 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-200 hover:bg-rose-100 hover:border-rose-300';

                  if (showExplanation) {
                    if (isCorrect) {
                      buttonStyles = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold shadow-md';
                    } else if (isSelected && !isCorrect) {
                      buttonStyles = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-200';
                    } else {
                      buttonStyles = 'opacity-50 border-transparent bg-slate-100 dark:bg-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={choiceKey}
                      onClick={() => handleSelectChoice(choiceKey)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium transition-all flex items-center justify-between cursor-pointer ${buttonStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-xs font-bold shrink-0">
                          {choiceKey}
                        </span>
                        <span>{choiceText}</span>
                      </div>

                      {showExplanation && (
                        <div>
                          {isCorrect ? (
                            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : isSelected ? (
                            <X className="w-5 h-5 text-rose-500 shrink-0" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reaction & Explanation Drawer */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 space-y-2 text-center"
                  >
                    <p className="font-note text-2xl text-rose-600 dark:text-rose-300 font-bold">
                      {selectedChoice === 'A' ? currentQ.reactionA : currentQ.reactionB}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-3">
                      <button
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                      >
                        {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'See Final Result 🎉' : 'Next Question →'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Quiz Completed Final State */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-6 py-4"
            >
              <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-950 mx-auto flex items-center justify-center text-rose-500 shadow-inner">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="font-serif-title text-3xl font-bold text-slate-900 dark:text-white">
                Congratulations! You Know Us Pretty Well ❤️
              </h3>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-slate-800/80 border border-rose-200 dark:border-rose-900 max-w-sm mx-auto">
                <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 block font-mono">
                  {score} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {score >= 6
                    ? 'Expert Level: Certified Soulmate 👑'
                    : 'Not bad! Still my favorite person in the universe 💕'}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Whether you got 8/8 or 1/8, every single moment we have shared has been my absolute favorite story.
              </p>

              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
