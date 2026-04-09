'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingHearts } from '@/components/animations/FloatingHearts';

interface Heart {
  id: number;
  x: number;
  y: number;
}

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // تحميل أعلى نتيجة
    const saved = localStorage.getItem('loveGameHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsPlaying(true);
    setHearts([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    // توليد قلوب جديدة
    const interval = setInterval(() => {
      if (timeLeft > 0 && hearts.length < 15) {
        const newHeart: Heart = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 100) + 50,
          y: Math.random() * (window.innerHeight - 200) + 100,
        };
        setHearts(prev => [...prev, newHeart]);
        
        // إزالة القلب بعد 3 ثواني
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 3000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, hearts.length]);

  useEffect(() => {
    if (!isPlaying) return;
    
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('loveGameHighScore', score.toString());
      }
    }
  }, [timeLeft, isPlaying, score, highScore]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const catchHeart = (id: number) => {
    setScore(prev => prev + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
  };

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎮 إجمع القلوب
          </h1>
          <p className="text-center text-white/60 mb-8">
            اضغط على القلوب الطايرة قبل ما تختفي!
          </p>

          {/* بطاقة النتيجة */}
          <GlassCard className="text-center mb-8">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white/50 text-sm">النتيجة</p>
                <p className="text-3xl font-bold text-pink-300">{score}</p>
              </div>
              <div>
                <p className="text-white/50 text-sm">الوقت</p>
                <p className={`text-3xl font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-green-400'}`}>
                  {timeLeft}s
                </p>
              </div>
              <div>
                <p className="text-white/50 text-sm">أعلى نتيجة</p>
                <p className="text-3xl font-bold text-yellow-400">{highScore}</p>
              </div>
            </div>
          </GlassCard>

          {/* زر البداية */}
          {!isPlaying && !gameOver && (
            <div className="text-center">
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                🎮 إبدأ اللعبة
              </button>
            </div>
          )}

          {/* شاشة النهاية */}
          {gameOver && (
            <div className="text-center">
              <GlassCard>
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold mb-2">انتهت اللعبة!</h2>
                <p className="text-xl mb-4">جمعتي {score} قلب ❤️</p>
                {score === highScore && score > 0 && (
                  <p className="text-yellow-400 mb-4">🎉 رقم قياسي جديد! 🎉</p>
                )}
                <p className="text-white/70 mb-6">
                  {score >= 30 ? "💪 خارقة! أنتِ ملكة جمع القلوب!" :
                   score >= 20 ? "🌟 رائعة! أنتِ محظوظة!" :
                   score >= 10 ? "👍 جميل! جربي تاني تحسني الرقم!" :
                   "💪 حاولي تاني تجمعي أكتر!"}
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all"
                >
                  🎮 العبي تاني
                </button>
              </GlassCard>
            </div>
          )}
        </div>
      </div>

      {/* القلوب الطايرة */}
      {isPlaying && hearts.map(heart => (
        <div
          key={heart.id}
          onClick={() => catchHeart(heart.id)}
          className="fixed cursor-pointer animate-bounce-slow"
          style={{ left: heart.x, top: heart.y, zIndex: 50 }}
        >
          <div className="text-4xl hover:scale-125 transition-transform duration-200">
            ❤️
          </div>
        </div>
      ))}
    </>
  );
}