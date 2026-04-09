'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function SecretPage() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    if (password === 'forever' || password === 'habibti') {
      setIsUnlocked(true);
    } else {
      alert('Wrong password! Try "forever" 💕');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 animate-gradient">
        <GlassCard className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">🔐 Secret Garden</h1>
          <p className="text-white/70 mb-6">Enter the password to enter our special place...</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            placeholder="Enter secret code..."
            className="w-full px-4 py-2 bg-white/10 rounded-lg mb-4 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={handleUnlock}
            className="w-full px-6 py-2 bg-linear-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold"
          >
            Unlock ❤️
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-gradient">
      <GlassCard className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">💕 Forever Us 💕</h1>
        <div className="text-8xl my-6">👩‍❤️‍👨</div>
        <p className="text-xl leading-relaxed text-white/80">
          You are my everything. Every day with you feels like a beautiful dream.
          Thank you for being my love, my best friend, and my home.
        </p>
        <div className="mt-6 text-pink-300 text-lg">
          I love you more than words can express. ❤️
        </div>
      </GlassCard>
    </div>
  );
}