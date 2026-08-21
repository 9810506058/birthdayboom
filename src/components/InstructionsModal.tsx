import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Key, Image, Music, FileText, Globe, Terminal, Sparkles, Check } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-10 border border-rose-200 dark:border-rose-800 shadow-2xl relative my-8 max-h-[88vh] overflow-y-auto text-slate-800 dark:text-slate-200 space-y-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 border-b border-rose-100 dark:border-rose-900/50 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Boyfriend's Customization Guide</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              How to Personalize & Deploy This Website 💝
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              All relationship information is cleanly separated inside the <code className="text-rose-500 font-mono">/src/data/</code> folder so you can customize every single detail in seconds.
            </p>
          </div>

          {/* Guide Sections */}
          <div className="space-y-6 text-sm">
            {/* 1. Master Config */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-800/60 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
              <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <Key className="w-4 h-4" /> 1. Changing Names & Secret Login Date
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Open <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono text-rose-500">src/data/siteConfig.ts</code>:
              </p>
              <pre className="p-3 rounded-xl bg-slate-950 text-rose-200 text-xs font-mono overflow-x-auto">
{`export const SITE_CONFIG = {
  myName: 'Alex',
  herName: 'Maya',
  specialDate: '2023-10-14', // YYYY-MM-DD for secret login
  specialDateHint: 'Hint: The evening by the lake ✨',
  birthdayDate: 'August 18',
  ...
};`}
              </pre>
            </div>

            {/* 2. Photos */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-800/60 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
              <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <Image className="w-4 h-4" /> 2. Replacing Photos & Memories
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Put your real photos into <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono text-rose-500">public/photos/</code> or use direct image URLs, then update:
              </p>
              <ul className="text-xs list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li><code className="text-rose-500 font-mono">src/data/memoriesData.ts</code> (Photo gallery, dates, locations, Polaroid captions)</li>
                <li><code className="text-rose-500 font-mono">src/data/timelineData.ts</code> (Milestone stories & dates)</li>
                <li><code className="text-rose-500 font-mono">src/data/funnyMomentsData.ts</code> (Silly photos & inside jokes)</li>
              </ul>
            </div>

            {/* 3. Letters & Reasons */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-800/60 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
              <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> 3. Love Letters & 20 Reasons
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Customize your letters in <code className="text-rose-500 font-mono">src/data/lettersData.ts</code> and reasons in <code className="text-rose-500 font-mono">src/data/reasonsData.ts</code>.
              </p>
            </div>

            {/* 4. Music */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-800/60 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
              <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <Music className="w-4 h-4" /> 4. Custom Music & Songs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                The website includes a built-in soothing romantic synthesizer so gentle audio always plays out-of-the-box! To add your real song MP3s, edit <code className="text-rose-500 font-mono">src/data/songsData.ts</code> and provide an <code className="text-rose-500 font-mono">audioUrl</code> or local file path (e.g. <code className="text-rose-500 font-mono">/music/our-song.mp3</code>).
              </p>
            </div>

            {/* 5. Deployment */}
            <div className="p-4 rounded-2xl bg-slate-950 text-white border border-rose-800 space-y-2">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <Globe className="w-4 h-4" /> 5. Free 1-Click Deployment (Vercel / Netlify)
              </h3>
              <div className="text-xs space-y-1 font-mono text-slate-300">
                <p>1. Push your repository to GitHub</p>
                <p>2. Go to <strong>vercel.com</strong> or <strong>netlify.com</strong></p>
                <p>3. Import the GitHub repo and click <strong>Deploy</strong></p>
                <p>4. Send the romantic link to your girlfriend! 💌</p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:shadow-lg cursor-pointer"
            >
              Got It, Let's Return to Our Story ❤️
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
