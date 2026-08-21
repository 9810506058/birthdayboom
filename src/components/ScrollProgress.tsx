import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-rose-200/20 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 transition-all duration-150 ease-out relative"
        style={{ width: `${scrollPercentage}%` }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-rose-500 drop-shadow-md">
          <Heart className="w-3.5 h-3.5 fill-rose-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
