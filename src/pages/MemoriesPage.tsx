import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Heart, MapPin, Calendar, Maximize2, Sparkles, Filter } from 'lucide-react';
import { MEMORIES_DATA } from '../data/memoriesData';
import { MemoryPhoto } from '../types';
import { PhotoLightbox } from '../components/PhotoLightbox';

export const MemoriesPage: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPhotos =
    activeCategory === 'all'
      ? MEMORIES_DATA
      : MEMORIES_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Love Story</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Little Pieces of Us 📸
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Snapshots of sunsets, spontaneous laughs, coffee dates, and quiet moments that mean the world to me.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Moments ✨' },
              { id: 'romantic', label: 'Romantic 🌹' },
              { id: 'date-night', label: 'Date Nights 🍷' },
              { id: 'cute', label: 'Cute & Silly 🧸' },
              { id: 'travel', label: 'Adventures ⛰️' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-rose-200/50 dark:border-rose-900/50 hover:bg-rose-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Polaroid / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.35) }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-xl shadow-rose-500/5 border border-rose-200/60 dark:border-rose-900/40 cursor-pointer group relative flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-slate-800">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-3 rounded-full bg-black/50 backdrop-blur-sm">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Date tag badge */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[11px] font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{photo.date}</span>
                </div>
              </div>

              {/* Polaroid Bottom Note */}
              <div className="pt-3.5 px-1 space-y-1">
                <h4 className="font-serif-title font-bold text-base text-slate-900 dark:text-white truncate">
                  {photo.title}
                </h4>

                {photo.polaroidNote && (
                  <p className="font-note text-lg text-rose-600 dark:text-rose-400 truncate">
                    {photo.polaroidNote}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-rose-100 dark:border-rose-900/30">
                  {photo.location ? (
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      {photo.location}
                    </span>
                  ) : (
                    <span>Tap to view</span>
                  )}

                  <span className="flex items-center gap-1 text-rose-500">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    {photo.heartsCount}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
};
