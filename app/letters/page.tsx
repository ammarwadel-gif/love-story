'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingHearts } from '@/components/animations/FloatingHearts';

const secretMessages = [
  { id: 1, text: "كل يوم بحبك أكتر من اللي قبله 💕", emoji: "💖" },
  { id: 2, text: "أنتِ سبب سعادتي في الدنيا ✨", emoji: "😊" },
  { id: 3, text: "دنيا من غيرك مش كاملة 🌍", emoji: "🌍" },
  { id: 4, text: "ضحكتك بتغير يومي كله 😊", emoji: "😄" },
  { id: 5, text: "أنتِ أجمل حاجة في حياتي ❤️", emoji: "❤️" },
  { id: 6, text: "كل ثانية معاك بتسوى الدنيا كلها ⏰", emoji: "⏰" },
  { id: 7, text: "عينيك بيحكوا قصص حب ما بتنتهيش 👀", emoji: "👀" },
  { id: 8, text: "أنتِ الحلم اللي مكنتش عارف إني محتاجه 🌙", emoji: "🌙" },
  { id: 9, text: "حضنك هو بيتي الحقيقي 🏠", emoji: "🏠" },
  { id: 10, text: "شكرًا إنك موجودة في حياتي 🙏", emoji: "🙏" },
];

export default function LettersPage() {
  const [selectedMessage, setSelectedMessage] = useState<{ text: string; emoji: string } | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const openRandomMessage = () => {
    const random = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    setSelectedMessage(random);
    setIsOpened(true);
    
    // إغلاق تلقائي بعد 5 ثواني
    setTimeout(() => {
      setIsOpened(false);
    }, 5000);
  };

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            💌 رسائل سرية
          </h1>
          <p className="text-center text-white/60 mb-12">
            اضغط على الظرف عشان تفتحي رسالة من قلبي
          </p>

          {/* الظرف */}
          <div onClick={openRandomMessage} className="cursor-pointer transform hover:scale-105 transition-all duration-300">
            <GlassCard className="py-12 hover:shadow-2xl">
              <div className="text-8xl mb-4 animate-bounce">✉️</div>
              <p className="text-white/70 text-lg">اضغط هنا</p>
              <p className="text-white/40 text-sm mt-2">هتوصلك رسالة حب 💕</p>
            </GlassCard>
          </div>

          {/* النافذة المنبثقة */}
          {isOpened && selectedMessage && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 text-center animate-scale-in">
                <div className="text-6xl mb-4">{selectedMessage.emoji}</div>
                <p className="text-2xl text-white/90 mb-6 leading-relaxed">
                  {selectedMessage.text}
                </p>
                <p className="text-pink-300 text-sm">- من قلبى إليك ❤️ -</p>
                <button
                  onClick={() => setIsOpened(false)}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          )}

          {/* عدد الرسائل */}
          <div className="mt-8 text-white/30 text-sm">
            📮 {secretMessages.length} رسالة حب في انتظارك
          </div>
        </div>
      </div>
    </>
  );
}