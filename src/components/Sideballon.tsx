import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface BalloonItem {
  id: number;
  side: 'left' | 'right';
  xPercent: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  colorGrad: {
    start: string;
    end: string;
    highlight: string;
  };
  swayAmount: number;
}

export const SideBalloons: React.FC<{ isNight?: boolean }> = ({ isNight = false }) => {
  const balloons = useMemo<BalloonItem[]>(() => {
    const palette = isNight
      ? [
          { start: '#f43f5e', end: '#be123c', highlight: '#fda4af' },
          { start: '#c084fc', end: '#7e22ce', highlight: '#f3e8ff' },
          { start: '#fb7185', end: '#e11d48', highlight: '#ffe4e6' },
          { start: '#38bdf8', end: '#0284c7', highlight: '#e0f2fe' },
          { start: '#f59e0b', end: '#b45309', highlight: '#fef3c7' },
        ]
      : [
          { start: '#fda4af', end: '#fb7185', highlight: '#ffffff' },
          { start: '#fbcfe8', end: '#f472b6', highlight: '#ffffff' },
          { start: '#e9d5ff', end: '#c084fc', highlight: '#ffffff' },
          { start: '#fed7aa', end: '#fb923c', highlight: '#ffffff' },
          { start: '#bae6fd', end: '#38bdf8', highlight: '#ffffff' },
          { start: '#fef08a', end: '#facc15', highlight: '#ffffff' },
        ];

    const leftBalloons: BalloonItem[] = Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      side: 'left',
      xPercent: Math.random() * 8 + 1,
      size: Math.random() * 18 + 32,
      duration: Math.random() * 10 + 16,
      delay: i * 2.5 + Math.random() * 2,
      opacity: Math.random() * 0.18 + (isNight ? 0.22 : 0.28),
      colorGrad: palette[i % palette.length],
      swayAmount: Math.random() * 16 + 10,
    }));

    const rightBalloons: BalloonItem[] = Array.from({ length: 7 }).map((_, i) => ({
      id: i + 10,
      side: 'right',
      xPercent: Math.random() * 8 + 1,
      size: Math.random() * 18 + 32,
      duration: Math.random() * 10 + 16,
      delay: i * 2.4 + 1.2 + Math.random() * 2,
      opacity: Math.random() * 0.18 + (isNight ? 0.22 : 0.28),
      colorGrad: palette[(i + 2) % palette.length],
      swayAmount: Math.random() * 16 + 10,
    }));

    return [...leftBalloons, ...rightBalloons];
  }, [isNight]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {balloons.map((b) => {
        const stylePosition =
          b.side === 'left' ? { left: `${b.xPercent}%` } : { right: `${b.xPercent}%` };

        return (
          <motion.div
            key={b.id}
            className="absolute select-none"
            style={{
              ...stylePosition,
              top: '-140px',
              width: `${b.size}px`,
              opacity: b.opacity,
            }}
            animate={{
              y: ['0vh', '118vh'],
              x: [0, b.swayAmount, -b.swayAmount, 0],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              y: {
                duration: b.duration,
                repeat: Infinity,
                delay: b.delay,
                ease: 'linear',
              },
              x: {
                duration: b.duration / 3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
              rotate: {
                duration: b.duration / 2.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
          >
            <svg
              viewBox="0 0 50 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-sm"
            >
              <defs>
                <linearGradient id={`balloon-grad-${b.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={b.colorGrad.start} />
                  <stop offset="100%" stopColor={b.colorGrad.end} />
                </linearGradient>
                <radialGradient id={`balloon-light-${b.id}`} cx="30%" cy="30%" r="60%">
                  <stop offset="0%" stopColor={b.colorGrad.highlight} stopOpacity="0.85" />
                  <stop offset="60%" stopColor={b.colorGrad.highlight} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={b.colorGrad.highlight} stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                d="M 25,5 C 38,5 47,16 47,30 C 47,44 34,54 27,57 L 27,60 L 23,60 L 23,57 C 16,54 3,44 3,30 C 3,16 12,5 25,5 Z"
                fill={`url(#balloon-grad-${b.id})`}
              />

              <ellipse
                cx="18"
                cy="18"
                rx="8"
                ry="12"
                fill={`url(#balloon-light-${b.id})`}
                transform="rotate(-25 18 18)"
              />

              <polygon
                points="21,59 29,59 27,63 23,63"
                fill={b.colorGrad.end}
              />

              <path
                d="M 25,63 Q 28,70 23,76 T 26,84"
                stroke={isNight ? 'rgba(255,255,255,0.45)' : 'rgba(100,100,100,0.35)'}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};