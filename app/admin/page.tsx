'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingHearts } from '@/components/animations/FloatingHearts';
import { storage, db } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('image');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage('Please fill all fields and select a file');
      return;
    }

    setUploading(true);
    setMessage('Uploading... 💕');

    try {
      // رفع الملف إلى Firebase Storage
      const fileRef = ref(storage, `memories/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // حفظ البيانات في Firestore
      await addDoc(collection(db, 'memories'), {
        title,
        description,
        date: date || new Date().toLocaleDateString(),
        type,
        imageUrl: fileUrl,
        createdAt: new Date().toISOString()
      });

      setMessage('✅ Memory added successfully!');
      
      // مسح الفورم
      setTitle('');
      setDescription('');
      setDate('');
      setFile(null);
      
      // مسح الـ input file
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading:', error);
      setMessage('❌ Error uploading. Try again!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <FloatingHearts />
      
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            👑 Admin Panel
          </h1>
          <p className="text-center text-white/60 mb-8">
            Add new memories, photos, and videos
          </p>

          <GlassCard>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white/80 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-pink-500"
                  placeholder="e.g., Our First Date"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/80 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-pink-500"
                  rows={3}
                  placeholder="Describe this beautiful moment..."
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-white/80 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-white/80 mb-2">Media Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-pink-500"
                >
                  <option value="image">📸 Image</option>
                  <option value="video">🎥 Video</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white/80 mb-2">Upload File</label>
                <input
                  id="fileInput"
                  type="file"
                  accept={type === 'image' ? 'image/*' : 'video/*'}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 cursor-pointer"
                />
              </div>

              {/* Message */}
              {message && (
                <div className={`text-center p-3 rounded-lg ${message.includes('✅') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {message}
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading... 💫' : '✨ Add Memory ✨'}
              </button>
            </div>
          </GlassCard>

          {/* Instructions */}
          <div className="mt-8 text-center text-white/40 text-sm">
            <p>🔐 This is an admin page. Keep it private!</p>
            <p>💡 Tip: You can upload both images and videos</p>
          </div>
        </div>
      </div>
    </>
  );
}