'use client';

import { useState, useRef, useEffect } from 'react';

interface Song {
  name: string;
  file: string;
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist: Song[] = [
    { name: "🎵 Lyli", file: "/sounds/lyli.mp3" },
    { name: "🎵 Bahabak Ana", file: "/sounds/bahabak ana.mp3" },
    { name: "🎵 Bhebik", file: "/sounds/bhbk.mp3" },
    { name: "🎵 Btmm Alek", file: "/sounds/btm alek.mp3" },
  ];

  // تهيئة الصوت
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(playlist[currentSongIndex].file);
    audioRef.current.volume = volume;
    audioRef.current.loop = false;
    
    const handleEnded = () => {
      // تشغيل الأغنية التالية تلقائياً
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };
    
    audioRef.current.addEventListener('ended', handleEnded);
    
    if (isPlaying) {
      audioRef.current.play().catch(err => console.log('Audio play error:', err));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, [currentSongIndex]);

  // تحديث الصوت عند تغيير مستوى الصوت
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // تشغيل/إيقاف
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Play error:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // الأغنية التالية
  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  // الأغنية السابقة
  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  return (
    <>
      {/* زر الموسيقى */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {isPlaying ? (
          <div className="relative">
            <span className="text-2xl">🎵</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        ) : (
          <span className="text-2xl">🎵</span>
        )}
      </button>

      {/* لوحة التحكم */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 w-72 bg-gradient-to-br from-purple-900 to-pink-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* الهيدر */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 text-center">
            <h3 className="text-white font-bold">🎵 مشغل الحب</h3>
          </div>

          {/* اسم الأغنية */}
          <div className="p-4 text-center border-b border-white/10">
            <div className="text-4xl mb-2">🎤</div>
            <h4 className="text-white font-bold text-lg">{playlist[currentSongIndex].name}</h4>
            <p className="text-white/50 text-xs">من قلبي إليك ❤️</p>
          </div>

          {/* أزرار التحكم */}
          <div className="flex items-center justify-center gap-6 p-4">
            <button
              onClick={prevSong}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              ⏮️
            </button>
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-all"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button
              onClick={nextSong}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              ⏭️
            </button>
          </div>

          {/* التحكم في الصوت */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-sm">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* قائمة الأغاني */}
          <div className="border-t border-white/10 max-h-40 overflow-y-auto">
            {playlist.map((song, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                }}
                className={`w-full p-2 text-left hover:bg-white/10 transition-all flex items-center justify-between ${
                  currentSongIndex === index ? 'bg-white/10 border-r-4 border-pink-500' : ''
                }`}
              >
                <span className={`text-sm ${currentSongIndex === index ? 'text-pink-300 font-bold' : 'text-white/80'}`}>
                  {song.name}
                </span>
                {currentSongIndex === index && isPlaying && (
                  <span className="text-pink-400 text-xs">▶️ تشغيل</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}