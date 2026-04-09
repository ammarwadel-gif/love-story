// components/animations/FloatingHearts.tsx
'use client';

import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        size: Math.random() * 30 + 20,
        duration: Math.random() * 3 + 3,
      };
      setHearts(prev => [...prev.slice(-15), newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            position: 'fixed',
            bottom: 0,
            left: heart.x,
            fontSize: heart.size,
            pointerEvents: 'none',
            zIndex: 999,
            animation: `floatHeart ${heart.duration}s linear forwards`,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
}