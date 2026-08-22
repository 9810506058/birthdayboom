import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TIMELINE_DATA } from '../data/timelineData';

export const TimelinePage: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'timeline-1': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="timeline"
      className="py-24 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Chapter By Chapter</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Our Story ❤️
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            From the first shy hello to all the late-night memories we'll
            cherish forever.
          </p>
        </div>

        {/* Timeline Vertical Track */}
        <div className="relative border-l-2 border-rose-200 dark:border-rose-900/60 ml-4 sm:ml-32 space-y-12 sm:space-y-16 pl-6 sm:pl-10">

          {TIMELINE_DATA.map((event, idx) => {
            const isExpanded = !!expandedIds[event.id];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: true,
                  margin: '-50px',
                }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                }}
                className="relative group"
              >

                {/* Timeline Node Icon */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 border-4 border-rose-50 dark:border-slate-950 text-xs font-bold select-none">
                  {event.accentEmoji || '❤️'}
                </div>

                {/* Left Date Label - Desktop */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                  <span className="font-mono text-xs font-bold text-rose-500 uppercase block">
                    {event.number}
                  </span>

                  <span className="text-xs text-slate-400 font-medium leading-tight block">
                    {event.date}
                  </span>
                </div>

                {/* Timeline Card */}
                <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-rose-200/70 dark:border-rose-900/50 shadow-xl shadow-rose-500/5 hover:shadow-rose-500/10 transition-all duration-300">

                  {/* Tag + Mobile Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">

                    <span className="inline-block px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-medium border border-rose-200/50 dark:border-rose-900/30">
                      {event.tag}
                    </span>

                    <span className="sm:hidden text-xs text-slate-400 font-medium">
                      {event.date}
                    </span>

                  </div>

                  {/* Title */}
                  <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {event.title}
                  </h3>

                  {/* Caption */}
                  <p className="font-handwriting text-xl sm:text-2xl text-rose-600 dark:text-rose-300 mb-4">
                    "{event.caption}"
                  </p>

                  {/* Photo */}
                  <div className="relative w-full flex justify-center mb-5">

                    <div className="relative w-fit max-w-full rounded-2xl overflow-hidden group-hover:shadow-md transition-shadow">

                      <img
                        src={event.image}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        className="
                          block
                          w-auto
                          max-w-full
                          h-auto
                          max-h-72
                          sm:max-h-80
                          object-contain
                          rounded-2xl
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />

                      {/* Location */}
                      {event.location && (
                        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md text-xs flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{event.location}</span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Expandable Story */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="pt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans border-t border-rose-100 dark:border-rose-900/30"
                      >
                        {event.description}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleExpand(event.id)}
                    className="mt-3 text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer pt-2"
                  >
                    <span>
                      {isExpanded
                        ? 'Show less'
                        : 'Read our memory'}
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};