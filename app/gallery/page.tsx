'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingHearts } from '@/components/animations/FloatingHearts';

interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    { id: 1, title: "أول لقاء", description: "لحظة ما تنسيش 💕", imageUrl: "/images/first-meet.jpeg", date: "July 28, 2025" },
    { id: 2, title: "أول لمسة", description: "إيديك كانت دافية 🤍", imageUrl: "/images/first-touch.jpeg", date: "July 28, 2025" },
    { id: 3, title: "أول حضن", description: "أحلى إحساس في الدنيا 🤗", imageUrl: "/images/first-hug.jpeg", date: "July 28, 2025" },
    { id: 4, title: "أحلى ضحكة", description: "ضحكتك بتغير اليوم 😊", imageUrl: "/images/smile.jpeg", date: "August 1, 2025" },
    { id: 5, title: "عيدنا الحلو", description: "أجمل عيد في حياتي 🎉", imageUrl: "/images/eid.jpeg", date: "August 10, 2025" },
    { id: 6, title: "سعادة لا توصف", description: "ساعات بحس إني بحلم ✨", imageUrl: "/images/happy.jpeg", date: "August 15, 2025" },
    { id: 7, title: "سهرة على النيل", description: "النيل كان جميل 🌙", imageUrl: "/images/nile.jpeg", date: "August 20, 2025" },
    { id: 8, title: "قمر العشاق", description: "القمر نور والدنيا حلوة 🌕", imageUrl: "/images/moon.jpeg", date: "September 1, 2025" },
    { id: 9, title: "جمال طبيعي", description: "جمالك مش محتاج أي حاجة 😍", imageUrl: "/images/beauty.jpeg", date: "September 5, 2025" },
    { id: 10, title: "أجمل حاجة", description: "كل يوم باكتشف جمال جديد 💖", imageUrl: "/images/beautiful.jpeg", date: "September 10, 2025" },
    { id: 11, title: "أحلى ماما", description: "قلبك كبير وحبك لا ينتهي 🤱", imageUrl: "/images/mommy.jpeg", date: "September 15, 2025" },
    { id: 12, title: "بنوتي الصغيرة", description: "بتخليني أحس إن الدنيا لسة فيها حلاوة 🎀", imageUrl: "/images/banoty.jpeg", date: "September 20, 2025" },
    { id: 13, title: "فستان الأحلام", description: "أجمل فستان شفته في حياتي 👗", imageUrl: "/images/dress.jpeg", date: "October 1, 2025" },
    { id: 14, title: "رائعة", description: "مفيش كلمات توصف قد إيه انتِ رائعة 💫", imageUrl: "/images/fantastic.jpeg", date: "October 5, 2025" },
    { id: 15, title: "فراشة قلبي", description: "خفة ظلك وجمال روحك 🦋", imageUrl: "/images/butter.jpeg", date: "October 10, 2025" },
    { id: 16, title: "تألقي الدائم", description: "نورك بيضيلي الدنيا ✨", imageUrl: "/images/shine.jpeg", date: "October 15, 2025" },
    { id: 17, title: "خطوتنا الأولى", description: "كل خطوة بنخطيها مع بعض 👠", imageUrl: "/images/shoes.jpeg", date: "October 20, 2025" },
    { id: 18, title: "حبيبين للأبد", description: "إنتِ نصي التاني 👩‍❤️‍👨", imageUrl: "/images/couple.jpeg", date: "November 1, 2025" },
    { id: 19, title: "مع بعض للأبد", description: "مش عارف أتخيل حياتي من غيرك ♾️", imageUrl: "/images/forever-ever.jpeg", date: "November 10, 2025" },
    { id: 20, title: "فاتنة بجمالها", description: "كل ما بشوفك بفتن فيكي أكتر 😍", imageUrl: "/images/gorgeous.jpeg", date: "November 15, 2025" },
  ];

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            📸 معرض الذكريات
          </h1>
          <p className="text-center text-white/60 mb-12">
            كل صورة تحكي قصة حبنا الجميلة
          </p>

          {/* شبكة الصور - مقاسات متساوية */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {photos.map((photo) => (
              <GlassCard
                key={photo.id}
                className="cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden p-0 group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/id/20/400/400';
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm md:text-base font-semibold text-pink-300 truncate">{photo.title}</h3>
                  <p className="text-xs text-white/50">{photo.date}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-8 text-white/40 text-sm">
            📸 {photos.length} ذكريات جميلة
          </div>
        </div>
      </div>

      {/* Popup - مقاس أكبر للصورة */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-4xl w-full bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video">
              <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} className="w-full h-full object-contain bg-black/50" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-pink-300">{selectedPhoto.title}</h2>
              <p className="text-white/50 mb-2">{selectedPhoto.date}</p>
              <p className="text-white/80 text-lg">{selectedPhoto.description}</p>
              <button onClick={() => setSelectedPhoto(null)} className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all">إغلاق ❤️</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}