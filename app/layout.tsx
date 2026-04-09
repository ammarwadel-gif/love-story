import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MusicPlayer } from '@/components/ui/MusicPlayer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Our Love Story',
  description: 'A beautiful interactive love experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}