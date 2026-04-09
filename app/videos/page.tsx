'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingHearts } from '@/components/animations/FloatingHearts';
import { db } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface Video {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  type: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const snapshot = await getDocs(collection(db, 'memories'));
    const videoData = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Video))
      .filter(item => item.type === 'video');
    setVideos(videoData);
  };

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎥 Our Video Memories
          </h1>
          <p className="text-center text-white/60 mb-12">
            Watch our beautiful moments come to life
          </p>

          {videos.length === 0 ? (
            <div className="text-center text-white/60">
              <p>No videos yet. Upload some from the admin panel! 🎬</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <GlassCard
                  key={video.id}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden p-0"
                  onClick={() => setSelectedVideo(video)}
                >
                  <video src={video.imageUrl} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-pink-300">{video.title}</h3>
                    <p className="text-sm text-white/50">{video.date}</p>
                    <p className="text-white/70 mt-2">{video.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="max-w-4xl w-full bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo.imageUrl}
              controls
              autoPlay
              className="w-full"
            />
            <div className="p-6 bg-gradient-to-r from-purple-900 to-pink-900">
              <h2 className="text-2xl font-bold text-pink-300">{selectedVideo.title}</h2>
              <p className="text-white/80 mt-2">{selectedVideo.description}</p>
              <button
                onClick={() => setSelectedVideo(null)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold"
              >
                Close ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}