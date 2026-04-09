'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export function RealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // استماع للتغييرات في الوقت الحقيقي
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(5));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      
      // التحقق من الإشعارات الجديدة
      if (notifications.length > 0 && newNotifications[0]?.id !== notifications[0]?.id) {
        setCurrentNotification(newNotifications[0]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
      
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Notification Popup */}
      {showNotification && currentNotification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-4 shadow-2xl max-w-sm">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💌</div>
              <div>
                <h4 className="font-bold text-white">{currentNotification.title}</h4>
                <p className="text-white/80 text-sm">{currentNotification.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}