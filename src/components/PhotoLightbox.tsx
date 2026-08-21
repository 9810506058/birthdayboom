import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, MapPin, Calendar, ZoomIn, ZoomOut } from 'lucide-react';
import { MemoryPhoto } from '../types';
import confetti from 'canvas-confetti';

interface LightboxProps {
  photo: MemoryPhoto | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<LightboxProps> = ({ photo, onClose }) => {
  const [likes, setLikes] = useState<number>(photo?.heartsCount || 100);
  const [hasLiked, setHasLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!photo) return null;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#f43f5e', '#fb7185', '#fda4af']
      });
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-rose-200/30 flex flex-col md:flex-row max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo container */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-[280px] md:min-h-[480px] overflow-hidden group">
            <img
              src={photo.image}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain max-h-[60vh] md:max-h-[85vh] transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white/80 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
          </div>

          {/* Details side/bottom */}
          <div className="w-full md:w-80 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-l border-rose-100 dark:border-rose-900/40 overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
              </div>

              <h3 className="font-serif-title text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {photo.title}
              </h3>

              {photo.location && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{photo.location}</span>
                </div>
              )}

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {photo.caption}
              </p>

              {photo.polaroidNote && (
                <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200/50 dark:border-rose-900/30">
                  <span className="font-note text-lg text-rose-700 dark:text-rose-300 block">
                    {photo.polaroidNote}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-rose-100 dark:border-rose-900/30 flex items-center justify-between">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'fill-rose-500'}`} />
                <span className="text-xs font-semibold">{likes}</span>
              </button>

              <span className="text-xs text-slate-400">
                A cherished memory ❤️
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
