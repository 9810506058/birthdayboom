import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { SONGS_DATA } from '../data/songsData';
import { romanticAudio } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30);

  const track = SONGS_DATA[currentTrackIndex];

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (track.audioUrl) {
      if (isPlaying) {
        romanticAudio.pause();
      } else {
        romanticAudio.playCustomUrl(track.audioUrl);
      }
    } else {
      romanticAudio.toggle();
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % SONGS_DATA.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying && SONGS_DATA[nextIdx].audioUrl) {
      romanticAudio.playCustomUrl(SONGS_DATA[nextIdx].audioUrl!);
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + SONGS_DATA.length) % SONGS_DATA.length;
    setCurrentTrackIndex(prevIdx);
    if (isPlaying && SONGS_DATA[prevIdx].audioUrl) {
      romanticAudio.playCustomUrl(SONGS_DATA[prevIdx].audioUrl!);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      romanticAudio.setVolume(0.4);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-rose-200/60 dark:border-rose-900/40 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
        {/* Album Artwork / Spinning Vinyl */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 group">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full rounded-full shadow-xl overflow-hidden border-4 border-slate-900/80 dark:border-slate-700/80 relative flex items-center justify-center p-1 bg-slate-950"
          >
            <img
              src={track.coverImage}
              alt={track.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full opacity-85"
            />
            {/* Center spindle hole */}
            <div className="absolute w-7 h-7 rounded-full bg-slate-900 border-2 border-rose-300 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            </div>
          </motion.div>

          {/* Vinyl arm / badge */}
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-rose-500 text-white shadow-lg">
            <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
        </div>

        {/* Track info and controls */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5" /> Track #{currentTrackIndex + 1}
            </span>
            
            {/* Audio Visualizer Bars */}
            <div className="flex items-end gap-1 h-4">
              {[60, 100, 40, 80, 50, 90, 70].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: isPlaying ? [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] : '20%',
                  }}
                  transition={{
                    duration: 0.6 + i * 0.1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="w-1 bg-rose-400 rounded-full"
                />
              ))}
            </div>
          </div>

          <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
            {track.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">
            {track.artist}
          </p>

          {/* Progress bar */}
          <div className="w-full space-y-1 mb-4">
            <div
              className="h-1.5 w-full bg-rose-100 dark:bg-slate-800 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0:{Math.floor((progress * 2.5) / 10).toString().padStart(2, '0')}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <button
              onClick={handlePrev}
              className="p-2 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.06 }}
              onClick={handleTogglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
            </motion.button>

            <button
              onClick={handleNext}
              className="p-2 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={handleMuteToggle}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-auto cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Romantic Lyrics / Personal Note Card */}
      <div className="mt-6 pt-5 border-t border-rose-100 dark:border-rose-900/40">
        <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why this song is ours:</span>
        </div>
        <p className="font-handwriting text-xl text-slate-700 dark:text-rose-100 leading-snug">
          {track.lyricsSnippet}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
          "{track.personalNote}"
        </p>
      </div>
    </div>
  );
};
