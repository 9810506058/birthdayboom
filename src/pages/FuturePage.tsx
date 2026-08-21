import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ListCheck, Sparkles, CheckSquare, Square, Heart, Plus, Trophy } from 'lucide-react';
import { FUTURE_BUCKET_DATA } from '../data/futureBucketData';
import { BucketListItem } from '../types';
import confetti from 'canvas-confetti';

export const FuturePage: React.FC = () => {
  const [items, setItems] = useState<BucketListItem[]>(FUTURE_BUCKET_DATA);
  const [newDream, setNewDream] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  const handleToggle = (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#f43f5e', '#fb7185', '#fda4af'],
          });
        }
        return { ...item, completed: nextState };
      }
      return item;
    });
    setItems(updated);
  };

  const handleAddDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDream.trim()) return;

    const newItem: BucketListItem = {
      id: `custom-${Date.now()}`,
      title: newDream.trim(),
      category: 'fun',
      icon: 'Sparkles',
      completed: false,
      notes: 'Added with love 💕',
    };

    setItems([...items, newItem]);
    setNewDream('');
    setShowAddForm(false);
  };

  return (
    <section id="future" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <ListCheck className="w-3.5 h-3.5" />
            <span>Forever Bucket List</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Things I Still Want To Do With You ✨
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            A lifetime isn't nearly long enough, but let's start with checking these off together.
          </p>

          {/* Progress Box */}
          <div className="max-w-md mx-auto p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-rose-200 dark:border-rose-900/40 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1 text-rose-500">
                <Trophy className="w-4 h-4" />
                {completedCount} / {items.length} Dreams Checked Off
              </span>
              <span>{percentage}%</span>
            </div>

            <div className="h-2 w-full bg-rose-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Bucket List Items */}
        <div className="space-y-3.5">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleToggle(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                item.completed
                  ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 shadow-sm'
                  : 'bg-white/90 dark:bg-slate-900/90 border-rose-200/70 dark:border-slate-800 hover:border-rose-300'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                type="button"
                className="pt-0.5 text-rose-500 focus:outline-none shrink-0"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 fill-rose-500 text-white" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 dark:text-slate-600 hover:text-rose-400" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <p
                  className={`text-sm sm:text-base font-medium leading-snug ${
                    item.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {item.title}
                </p>

                {item.notes && (
                  <p className="font-note text-lg text-rose-600 dark:text-rose-300">
                    {item.notes}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add New Dream Section */}
        <div className="text-center pt-4">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-5 py-2.5 rounded-full border border-dashed border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold hover:bg-rose-50 dark:hover:bg-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add a dream to our bucket list
            </button>
          ) : (
            <form onSubmit={handleAddDream} className="max-w-md mx-auto flex gap-2">
              <input
                type="text"
                value={newDream}
                onChange={(e) => setNewDream(e.target.value)}
                placeholder="What should we do together next? ✨"
                className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-rose-500 text-white text-xs font-semibold shadow hover:bg-rose-600 cursor-pointer"
              >
                Add ❤️
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
