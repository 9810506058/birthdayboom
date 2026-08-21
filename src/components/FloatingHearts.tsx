import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  char: string;
}

export const FloatingHearts: React.FC<{ isNight?: boolean }> = ({ isNight = false }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const chars = ['❤️', '💖', '✨', '🌸', '💕', '✨', '🤍', '🌙'];
    const colors = isNight
      ? ['#fda4af', '#f43f5e', '#e0e7ff', '#c084fc', '#fbcfe8']
      : ['#fb7185', '#f43f5e', '#ec4899', '#f472b6', '#fed7aa'];

    const items: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 14 + 12,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      char: chars[Math.floor(Math.random() * chars.length)],
    }));

    setParticles(items);
  }, [isNight]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none font-sans"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            color: p.color,
            textShadow: isNight ? '0 0 12px rgba(244,63,94,0.6)' : '0 0 8px rgba(251,113,133,0.3)',
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`, `${p.x + (Math.random() * 16 - 8)}%`],
            rotate: [0, Math.random() * 60 - 30, Math.random() * 120 - 60],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
};
