'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FloatingHearts } from '@/components/animations/FloatingHearts';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const startDate = new Date(2025, 6, 28);
    const today = new Date(2026, 3, 8);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('🌅 Good Morning, My Love');
    else if (hour >= 12 && hour < 17) setGreeting('☀️ Beautiful Afternoon, Habibti');
    else if (hour >= 17 && hour < 21) setGreeting('🌤️ Lovely Evening, My Everything');
    else setGreeting('🌙 Good Night, My Heart');
  }, []);

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 animate-gradient" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <GlassCard className="max-w-3xl w-full text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
              Our Love Story
            </h1>
            
            <p className="text-2xl text-white/90 mb-4">{greeting}</p>
            <p className="text-lg text-white/60 mb-8 italic">
              "Every love story is beautiful, but ours is my favorite..."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <Link href="/timeline" className="w-full">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 cursor-pointer">
                  📅 Our Timeline
                </button>
              </Link>
              <Link href="/gallery" className="w-full">
                <button className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  📸 Memory Gallery
                </button>
              </Link>
              <Link href="/letters" className="w-full">
                <button className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  💌 Secret Letters
                </button>
              </Link>
              <Link href="/game" className="w-full">
                <button className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  🎮 Play Game
                </button>
              </Link>
            </div>

            <div className="pt-8 border-t border-white/20">
              <div className="flex items-center justify-center gap-12 flex-wrap">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-300">{daysTogether}</div>
                  <div className="text-white/50 text-sm">Days Together</div>
                  <div className="text-white/30 text-xs mt-1">Since 28/7/2025</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-300">∞</div>
                  <div className="text-white/50 text-sm">Forever Love</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-300">❤️</div>
                  <div className="text-white/50 text-sm">Unlimited Love</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}