import React from 'react';
import { motion } from 'motion/react';
import { Music, Disc3, Sparkles, Heart } from 'lucide-react';
import { MusicPlayer } from '../components/MusicPlayer';

export const OurSongPage: React.FC = () => {
  return (
    <section id="music" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Music className="w-3.5 h-3.5" />
            <span>Our Melodies</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Press Play... This One Reminds Me of You 🎵
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Certain songs will forever hold the sound of your laugh and the feeling of your hand in mine.
          </p>
        </div>

        {/* Music Player Component */}
        <MusicPlayer />
      </div>
    </section>
  );
};
