'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingHearts } from '@/components/animations/FloatingHearts';

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    // تواريخ مهمة في علاقتكم
    const timelineEvents: TimelineEvent[] = [
      { id: 1, title: "💕 أول لقاء", date: "28 يوليو 2025", description: "اليوم اللي اتغير فيه كل حاجة", icon: "💖" },
      { id: 2, title: "😊 أول ضحكة", date: "1 أغسطس 2025", description: "ضحكتك كانت أحلى صوت سمعته", icon: "😊" },
      { id: 3, title: "🤗 أول حضن", date: "10 أغسطس 2025", description: "حسيت بالأمان لأول مرة", icon: "🤗" },
      { id: 4, title: "🌙 أول سهرة", date: "20 أغسطس 2025", description: "سهرة ما تنسيش على النيل", icon: "🌙" },
      { id: 5, title: "🎁 أول هدية", date: "1 سبتمبر 2025", description: "فرحتك كانت أجمل هدية", icon: "🎁" },
      { id: 6, title: "📸 أول صورة سوا", date: "15 سبتمبر 2025", description: "أجمل صورة في البوم حياتي", icon: "📸" },
      { id: 7, title: "🍽️ أول عشاء", date: "1 أكتوبر 2025", description: "عيشة لا تنسى مع أجمل شخص", icon: "🍽️" },
      { id: 8, title: "💍 وعد", date: "15 أكتوبر 2025", description: "وعدت إنك هتبقى دايمًا معايا", icon: "💍" },
      { id: 9, title: "🎄 أول عيد", date: "25 ديسمبر 2025", description: "أجمل عيد في حياتي", icon: "🎄" },
      { id: 10, title: "💕 حب للأبد", date: "1 يناير 2026", description: "بداية سنة جديدة مع حبي", icon: "💕" },
    ];
    setEvents(timelineEvents);
  }, []);

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            📅 حكايتنا الجميلة
          </h1>
          <p className="text-center text-white/60 mb-12">
            كل يوم معاك قصة حب جديدة
          </p>

          <div className="relative">
            {/* الخط العمودي */}
            <div className="absolute right-1/2 transform translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-pink-500 to-purple-500 hidden md:block" />

            {events.map((event, index) => (
              <div key={event.id} className={`relative flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* النقطة */}
                <div className="absolute right-1/2 transform translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full hidden md:block z-10" />
                
                {/* المحتوى */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <GlassCard className="hover:scale-105 transition-all duration-300">
                    <div className="text-4xl mb-2">{event.icon}</div>
                    <h3 className="text-xl font-bold text-pink-300">{event.title}</h3>
                    <p className="text-sm text-white/50 mb-2">{event.date}</p>
                    <p className="text-white/70">{event.description}</p>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}