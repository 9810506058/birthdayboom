import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  char: string;
}

export const CursorSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch screen
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    let idCounter = 0;
    const chars = ['✨', '💖', '🌸', '🤍', '·'];

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle sparkle creation
      if (Math.random() > 0.35) return;

      const newSparkle: Sparkle = {
        id: ++idCounter,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 10,
        char: chars[Math.floor(Math.random() * chars.length)],
      };

      setSparkles((prev) => [...prev.slice(-12), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0.9, scale: 0.5, x: s.x - 8, y: s.y - 8 }}
            animate={{
              opacity: 0,
              scale: 1.3,
              y: s.y - 25 + Math.random() * 10,
              x: s.x + (Math.random() * 20 - 10),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute select-none"
            style={{ fontSize: `${s.size}px` }}
          >
            {s.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
