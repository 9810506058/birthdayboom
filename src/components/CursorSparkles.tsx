import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  char: string;
  color: string;
  rotation: number;
}

export const CursorSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const chars = ['✨', '💖', '🌸', '🤍', '⭐', '💫', '🌟', '💕'];
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#c084fc', '#fef08a'];

    const addSparkle = (clientX: number, clientY: number) => {
      const newSparkle: Sparkle = {
        id: ++idCounter,
        x: clientX,
        y: clientY,
        size: Math.random() * 8 + 12,
        char: chars[Math.floor(Math.random() * chars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 60 - 30,
      };

      setSparkles((prev) => [...prev.slice(-16), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 750);
    };

    let lastTime = 0;
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 35) return;
      lastTime = now;
      addSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const now = Date.now();
        if (now - lastTime < 45) return;
        lastTime = now;
        addSparkle(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0.95, scale: 0.4, x: s.x - 10, y: s.y - 10, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 1.25,
              y: s.y - 28 + (Math.random() * 12 - 6),
              x: s.x + (Math.random() * 24 - 12),
              rotate: s.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute select-none drop-shadow-[0_0_6px_rgba(251,113,133,0.6)]"
            style={{
              fontSize: `${s.size}px`,
              color: s.color,
            }}
          >
            {s.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};